import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  const router = useRouter();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="page-wrapper">
      <Head>
        <title>Skill Directory - Discover the Best Resources</title>
        <meta name="description" content="A curated directory of videos, blogs, and PDFs, organized so you can focus on learning instead of searching everywhere." />
      </Head>

      <Header />
      
      <main>
        {/* 1. Hero Section */}
        <section className="hero">
          <h1>Discover the Best Resources to <span className="highlight">Learn Any Skill</span></h1>
          <p className="subtitle">
            A curated directory of videos, blogs, and PDFs, organized so you can focus on learning instead of searching everywhere.
          </p>
          
          <div className="hero-actions">
            <Link href="/directory" className="btn btn-primary">
              Browse Skills
            </Link>
          </div>
        </section>

        {/* 2. Problem to Solution Section */}
        <section className="problem-solution">
          <div className="container">
            <div className="problem-solution-content">
              <div className="problem-solution-text">
                <h2>Stop Searching, <span className="highlight">Start Learning</span></h2>
                <p>
                  Learning a new skill often feels overwhelming. You spend hours filtering through low-quality tutorials, outdated articles, and confusing roadmaps.
                </p>
                <p>
                  <strong>Skill Directory solves this.</strong> We collect and curate high-quality learning materials in one place, so you can skip the noise and get straight to mastering your next skill.
                </p>
              </div>
              <div className="problem-solution-image">
                <div className="solution-card">
                  <div className="check-item">✅ Curated Content</div>
                  <div className="check-item">✅ No Fluff</div>
                  <div className="check-item">✅ Direct Links</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. Features / How it Works */}
        <section className="features-section">
          <div className="container">
            <h2 className="section-title">How It Works</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">📂</div>
                <h3>Browse by Category</h3>
                <p>Easily find skills organized by relevant topics and industries.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">�</div>
                <h3>Diverse Resources</h3>
                <p>Access curated videos from YouTube, insightful blogs, and detailed PDFs.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">�</div>
                <h3>Short Descriptions</h3>
                <p>Get a quick summary of each resource so you know exactly what you're clicking.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔗</div>
                <h3>Direct Links</h3>
                <p>No paywalls or signups here. Just direct links to the original high-quality sources.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔄</div>
                <h3>Updated Regularly</h3>
                <p>Our library is constantly refreshed with the latest and best learning materials.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Web & Mobile Friendly</h3>
                <p>Learn on the go with a fully responsive design that works on any device.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Why This Directory Matters */}
        <section className="why-matters">
          <div className="container">
            <div className="why-matters-content">
              <h2>Why This Directory Matters</h2>
              <div className="reasons-grid">
                <div className="reason-item">
                  <h3>🎯 Quality Over Quantity</h3>
                  <p>We don't list everything. We only list the best resources that actually help you learn.</p>
                </div>
                <div className="reason-item">
                  <h3>⏱️ Save Valuable Time</h3>
                  <p>Skip the endless Google searches. Find what you need in seconds.</p>
                </div>
                <div className="reason-item">
                  <h3>🧠 Built for Learners</h3>
                  <p>Designed to reduce confusion and help you focus on what matters: gaining new skills.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Final Call to Action */}
        <section className="final-cta">
          <div className="container">
            <h2>Ready to start learning?</h2>
            <div className="cta-buttons">
              <Link href="/directory" className="btn btn-primary">
                Browse Skills
              </Link>
            </div>
          </div>
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
