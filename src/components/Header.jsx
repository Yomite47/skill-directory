import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header ref={headerRef} className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo-section">
          <Link href="/" aria-label="Skill Directory Home">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="site-logo">
              <rect width="40" height="40" rx="12" fill="url(#logo-gradient)" />
              <path d="M20 10C14.48 10 10 14.48 10 20C10 25.52 14.48 30 20 30C25.52 30 30 25.52 30 20" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <path d="M26 14L14 26" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563eb"/>
                  <stop offset="1" stopColor="#f59e0b"/>
                </linearGradient>
              </defs>
            </svg>
          </Link>
        </div>
        
        <div className="actions-section">
          <div className="animated-cta">
            Let's Learn Together! 📚
          </div>
        </div>
      </div>
      <style jsx>{`
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 100%;
        }
        .actions-section {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .animated-cta {
          font-weight: 800;
          font-size: 1.2rem;
          background: linear-gradient(90deg, #4f46e5, #ec4899, #8b5cf6, #4f46e5);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-move 3s linear infinite, float 3s ease-in-out infinite;
          white-space: nowrap;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          background-color: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(4px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .nav-link {
          text-decoration: none;
          color: var(--text);
          font-weight: 600;
          font-size: 0.95rem;
          transition: color 0.2s;
          display: none;
        }
        .nav-link:hover {
          color: var(--primary);
        }
        @media (min-width: 640px) {
          .nav-link {
            display: block;
          }
        }
        .btn-text {
          background: none;
          border: none;
          color: var(--text);
          font-weight: 600;
          cursor: pointer;
          font-size: 0.9rem;
          padding: 0.5rem;
          transition: color 0.2s;
        }
        .btn-text:hover {
          color: var(--primary);
        }
        .profile-menu-container {
          position: relative;
        }
        .profile-btn {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          border-radius: 50%;
          transition: transform 0.2s;
        }
        .profile-btn:hover {
          transform: scale(1.05);
        }
        .avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          border: 2px solid var(--bg);
          box-shadow: 0 0 0 2px var(--border);
        }
        .dropdown-menu {
          position: absolute;
          top: 130%;
          right: 0;
          width: 240px;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid var(--border);
          border-radius: 1rem;
          box-shadow: 0 10px 40px -10px rgba(0,0,0,0.15);
          overflow: hidden;
          animation: slide-down 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 100;
          transform-origin: top right;
        }
        :global(html.dark) .dropdown-menu {
          background: rgba(15, 23, 42, 0.8);
          border-color: rgba(255,255,255,0.1);
        }
        .dropdown-header {
          padding: 1.25rem 1rem;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.1), rgba(236, 72, 153, 0.1));
          border-bottom: 1px solid var(--border);
        }
        .user-name {
          font-weight: 700;
          color: var(--text);
          font-size: 0.95rem;
          margin-bottom: 0.1rem;
        }
        .user-email {
          font-size: 0.8rem;
          color: var(--text-light);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .dropdown-content {
          padding: 0.5rem;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem 1rem;
          text-align: left;
          background: none;
          border: none;
          color: var(--text);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          border-radius: 0.5rem;
          text-decoration: none;
          transition: all 0.2s;
          margin-bottom: 0.25rem;
        }
        .dropdown-item:last-child {
          margin-bottom: 0;
        }
        .dropdown-item:hover {
          background: var(--bg-soft);
          color: var(--primary);
          transform: translateX(2px);
        }
        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-light);
          transition: color 0.2s;
        }
        .dropdown-item:hover .icon {
          color: var(--primary);
        }
        .logout-btn {
          color: #ef4444;
        }
        .logout-btn .icon {
          color: #ef4444;
        }
        .logout-btn:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #dc2626;
        }
        .logout-btn:hover .icon {
          color: #dc2626;
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-8px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </header>
  );
}
