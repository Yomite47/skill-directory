import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { getAllSectorSlugs, getSectorBySlug } from '../../utils/dataLoader';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ResourceCard from '../../components/ResourceCard';

export async function getStaticPaths() {
  const paths = getAllSectorSlugs();
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const sector = getSectorBySlug(params.slug);
  return { props: { sector } };
}

export default function SectorPage({ sector }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login?callbackUrl=' + encodeURIComponent(router.asPath));
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{fontSize: '1.2rem', color: 'var(--primary)'}}>Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{sector.title} | Skill Directory</title>
      </Head>

      <Header />

      <main className="skill-page-wrapper">
        {/* Hero Section */}
        <section className="sector-hero">
          <div className="container">
            <Link href="/" className="back-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Dashboard
            </Link>
            <div className="hero-content">
              <h1 className="sector-title">{sector.title}</h1>
              <p className="sector-intro">{sector.intro}</p>
              <div className="sector-meta">
                <span className="resource-badge">
                  📚 {sector.resources?.length || 0} Resources
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <div className="container main-content">
          <section className="resources-section">
            <div className="section-header">
              <h2 className="section-heading">
                {sector.resourcesHeading || "Curated Resources"}
              </h2>
              <p className="section-subheading">
                {sector.resourcesIntro || "Hand-picked videos, articles, and guides to help you master this skill."}
              </p>
            </div>
            
            <div className="grid resources-grid">
              {sector.resources?.map((r, i) => (
                <ResourceCard
                  key={i}
                  title={r.title}
                  link={r.link}
                  description={r.description}
                  type={r.type}
                  logo={r.logo}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
