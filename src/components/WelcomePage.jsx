import Link from 'next/link';
import Header from './Header';
import Footer from './Footer';

export default function WelcomePage() {
  return (
    <div className="welcome-container">
      <Header />
      
      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Unlock Your <span className="gradient-text">Potential</span>
          </h1>
          <p className="hero-subtitle">
            Join our exclusive community of learners and master high-income skills. 
            Access curated resources, expert roadmaps, and a network of ambitious individuals.
          </p>
          <div className="cta-group">
            <Link href="/auth/signup" className="btn btn-primary btn-lg">
              Get Started
            </Link>
          </div>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Rocket size={40} color="#4f46e5" /></div>
            <h3>Curated Paths</h3>
            <p>Step-by-step guides to master complex skills.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Gem size={40} color="#ec4899" /></div>
            <h3>Premium Resources</h3>
            <p>Hand-picked tools and assets for your journey.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><Handshake size={40} color="#8b5cf6" /></div>
            <h3>Community</h3>
            <p>Connect with like-minded learners.</p>
          </div>
        </div>
      </main>

      <Footer />

      <style jsx>{`
        .welcome-container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .hero-section {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 4rem 1rem;
          text-align: center;
          background: radial-gradient(circle at top right, rgba(79, 70, 229, 0.1), transparent 40%),
                      radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.1), transparent 40%);
        }
        .hero-content {
          max-width: 800px;
          margin-bottom: 4rem;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }
        .gradient-text {
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.25rem;
          color: var(--text-light);
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        .cta-group {
          display: flex;
          gap: 1rem;
          justify-content: center;
        }
        .btn-lg {
          padding: 1rem 2rem;
          font-size: 1.1rem;
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          width: 100%;
          max-width: 1000px;
          padding: 0 1rem;
        }
        .feature-card {
          background: var(--primary-contrast);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: var(--card-shadow);
          transition: transform 0.3s ease;
          border: 1px solid var(--border);
        }
        .feature-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
        }
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        .feature-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
        }
        .feature-card p {
          color: var(--text-light);
        }
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          .cta-group {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
