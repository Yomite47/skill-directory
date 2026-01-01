import Head from 'next/head';
import Link from 'next/link';
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

function typeIcon(t) {
  switch (t) {
    case 'youtube': return '▶️';
    case 'twitter': return '🐦';
    case 'website': return '🔗';
    default: return '📚';
  }
}

export default function SectorPage({ sector }) {
  return (
    <>
      <Head>
        <title>{sector.title} — Sectors</title>
      </Head>

      <Header />

      <main className="container skill-page">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
          <div>
            <h1 className="skill-title">{sector.title}</h1>
            <p className="intro-text">{sector.intro}</p>
          </div>
          <div>
            <Link href="/">
              <button className="btn">Back</button>
            </Link>
          </div>
        </div>

        <section className="section">
          <h2>Top AI Channels & Tutorials</h2>
          <p className="intro-text" style={{marginBottom:12}}>
            These are some of the best YouTube channels and tutorial videos for learning AI and AI automation. Each entry includes a concise description and a direct link — use the "Watch" button where available to view videos inline.
          </p>
          <div className="resource-grid">
            {sector.resources.map((r, i) => (
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
      </main>

      <Footer />
    </>
  );
}
