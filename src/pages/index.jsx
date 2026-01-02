import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import Header from '../components/Header';
import SkillCard from '../components/SkillCard';
import SectorCard from '../components/SectorCard';
import AnimatedCharacter from '../components/AnimatedCharacter';
import Footer from '../components/Footer';
import ResourceCard from '../components/ResourceCard';
import WelcomePage from '../components/WelcomePage';
import skillsData from '../data/skills.json';
import sectorsData from '../data/sectors.json';

export default function Home() {
  const { data: session, status } = useSession();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showTop, setShowTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('idle');

  const popularSlugs = useMemo(() => ['ai-automation', 'video-editing', 'animation'], []);
  const techSlugs = useMemo(() => ['ai-automation', 'technical-analysis'], []);
  const creativeSlugs = useMemo(() => ['video-editing', 'animation', 'content-creation-writing'], []);

  const allItems = useMemo(() => {
    const skills = (skillsData.skills || []).map(s => ({
      type: 'skill',
      slug: s.slug,
      title: s.skillTitle,
      intro: s.skillIntro
    }));
    const sectors = (sectorsData.sectors || []).map(s => ({
      type: 'sector',
      slug: s.slug,
      title: s.title,
      intro: s.intro
    }));
    return [...skills, ...sectors];
  }, []);

  const filteredItems = useMemo(() => {
    let items = allItems;
    if (filter === 'popular') items = items.filter(i => popularSlugs.includes(i.slug));
    if (filter === 'tech') items = items.filter(i => techSlugs.includes(i.slug));
    if (filter === 'creative') items = items.filter(i => creativeSlugs.includes(i.slug));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter(i => i.title.toLowerCase().includes(q) || (i.intro || '').toLowerCase().includes(q));
    }
    return items;
  }, [allItems, filter, query, popularSlugs, techSlugs, creativeSlugs]);

  const featuredItems = useMemo(() => {
    return allItems.filter(i => popularSlugs.includes(i.slug)).slice(0, 4);
  }, [allItems, popularSlugs]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setSubscribeStatus('error');
      return;
    }
    setSubscribeStatus('loading');
    
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setSubscribeStatus('success');
        setEmail('');
      } else {
        setSubscribeStatus('error');
      }
    } catch (error) {
      console.error('Failed to subscribe:', error);
      setSubscribeStatus('error');
    }
  };

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (status === 'loading') {
    return <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>;
  }

  if (!session) {
    return <WelcomePage />;
  }

  return (
    <>
      <Head>
        <title>Dashboard - Skill Directory</title>
        <meta name="description" content="Find the best resources to learn any skill" />
      </Head>
      
      <Header />
      
      <main className="container">
        <section className="hero">
          <AnimatedCharacter />
          <h1>Master Any Skill with Expert-Curated Resources</h1>
          <p className="subtitle">
            Find the best courses, guides, and learning paths for every skill
          </p>
          <div className="hero-actions">
            <a href="#skills" className="btn btn-primary">Browse All Skills</a>
          </div>
        </section>
        


        <section id="skills" className="skills-grid">
          <div className="skills-controls">
            <input
              type="text"
              className="search-input"
              placeholder="Search for a specific skill..."
              id="skills-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="filter-buttons" role="tablist" aria-label="Filter skills">
              <button
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Skills
              </button>
              <button
                className={`filter-btn ${filter === 'popular' ? 'active' : ''}`}
                onClick={() => setFilter('popular')}
              >
                Popular
              </button>
              <button
                className={`filter-btn ${filter === 'tech' ? 'active' : ''}`}
                onClick={() => setFilter('tech')}
              >
                Tech
              </button>
              <button
                className={`filter-btn ${filter === 'creative' ? 'active' : ''}`}
                onClick={() => setFilter('creative')}
              >
                Creative
              </button>
            </div>
            <div className="skills-count">
              Showing {filteredItems.length} of 50+ skills
            </div>
          </div>
          <div className="grid">
            {filteredItems.map((item) => {
              if (item.type === 'skill') {
                const skill = {
                  slug: item.slug,
                  skillTitle: item.title,
                  skillIntro: item.intro
                };
                return <SkillCard key={`skill-${item.slug}`} skill={skill} />;
              }
              const sector = {
                slug: item.slug,
                title: item.title,
                intro: item.intro
              };
              return <SectorCard key={`sector-${item.slug}`} sector={sector} />;
            })}
          </div>
        </section>

        <section className="skills-grid">
          <h2>This week's top recommended course</h2>
          <div className="grid">
            <ResourceCard
              title="Machine Learning Crash Course"
              link="https://developers.google.com/machine-learning/crash-course"
              description="Google's fast-paced, practical introduction to machine learning."
              type="free"
            />
          </div>
        </section>

        <section className="skills-grid">
          <h2>What learners say about Skill Directory</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>"Found exactly what I needed without wasting hours. The curation is spot on."</p>
              <div className="testimonial-meta">— Ada, Product Designer</div>
            </div>
            <div className="testimonial-card">
              <p>"The filters and featured picks helped me start fast. Highly recommend."</p>
              <div className="testimonial-meta">— Ben, Content Creator</div>
            </div>
            <div className="testimonial-card">
              <p>"Clear paths and quality resources. I leveled up my skills in weeks."</p>
              <div className="testimonial-meta">— Tayo, Developer</div>
            </div>
          </div>
        </section>

        <section className="skills-grid">
          <h2>Get weekly skill recommendations</h2>
          <form className="newsletter" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              className="newsletter-input" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (subscribeStatus === 'error') setSubscribeStatus('idle');
              }}
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              required
            />
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
            >
              {subscribeStatus === 'loading' ? 'Subscribing...' : 
               subscribeStatus === 'success' ? 'Subscribed!' : 'Subscribe'}
            </button>
          </form>
          {subscribeStatus === 'success' && (
            <p style={{color: 'var(--secondary)', marginTop: '0.5rem', fontWeight: 'bold'}}>
              Thanks for subscribing! Check your inbox soon. 🚀
            </p>
          )}
          {subscribeStatus === 'error' && (
            <p style={{color: '#ef4444', marginTop: '0.5rem'}}>
              Please enter a valid email address.
            </p>
          )}
        </section>

        <button
          className="back-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{display: showTop ? 'flex' : 'none'}}
          aria-label="Back to top"
        >
          ↑
        </button>
      </main>
      
      <Footer />
    </>
  );
}
