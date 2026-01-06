import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import SkillCard from '../components/SkillCard';
import SectorCard from '../components/SectorCard';
import Footer from '../components/Footer';
import ResourceCard from '../components/ResourceCard';
import skillsData from '../data/skills.json';
import sectorsData from '../data/sectors.json';
import { Rocket, ArrowUp } from 'lucide-react';

export default function Directory() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [showTop, setShowTop] = useState(false);
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('idle');

  // Initialize query from URL if present
  useEffect(() => {
    if (router.query.q) {
      setQuery(router.query.q);
    }
  }, [router.query]);

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
    let ticking = false;
    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShowTop(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="page-wrapper">
      <Head>
        <title>Browse Skills | Skill Directory</title>
        <meta name="description" content="Explore our curated collection of skills and learning resources." />
      </Head>

      <Header />
      
      <main className="container" style={{ paddingTop: '2rem' }}>
        <section id="skills" className="skills-grid">
          <div className="skills-header">
            <div>
              <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Explore Skills</h1>
              <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem' }}>
                Find the perfect skill to master next.
              </p>
            </div>
          </div>

          <div className="skills-controls">
            <input
              type="text"
              className="search-input"
              placeholder="Search for a specific skill..."
              id="skills-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
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
              Showing {filteredItems.length} results
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
          
          {filteredItems.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-light)' }}>
              <h3>No skills found matching "{query}"</h3>
              <p>Try searching for something else or browse all skills.</p>
              <button 
                className="btn btn-secondary" 
                style={{ marginTop: '1rem' }}
                onClick={() => { setQuery(''); setFilter('all'); }}
              >
                Clear Filters
              </button>
            </div>
          )}
        </section>

        <section className="skills-grid" style={{ marginTop: '4rem' }}>
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.8rem' }}>This week's top recommended course</h2>
          <div className="grid">
            <ResourceCard
              title="Machine Learning Crash Course"
              link="https://developers.google.com/machine-learning/crash-course"
              description="Google's fast-paced, practical introduction to machine learning."
              type="free"
            />
          </div>
        </section>

        <section className="newsletter-section">
          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Get weekly skill recommendations</h2>
          <p style={{ color: 'var(--text-light)' }}>Join our newsletter to get the latest resources delivered to your inbox.</p>
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
            <p style={{color: 'var(--secondary)', marginTop: '1rem', fontWeight: 'bold'}}>
              Thanks for subscribing! Check your inbox soon. <Rocket size={16} style={{display:'inline', verticalAlign:'text-bottom'}} />
            </p>
          )}
          {subscribeStatus === 'error' && (
            <p style={{color: '#ef4444', marginTop: '1rem'}}>
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
    </div>
  );
}