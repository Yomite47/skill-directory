import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import ThemeToggle from './ThemeToggle';
import { useRouter } from 'next/router';

export default function Header() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuOpen && !event.target.closest('.profile-menu-container')) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  function focusSearch() {
    const el = document.getElementById('skills-search');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus();
    } else {
      const target = document.getElementById('skills');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else if (router.pathname !== '/') {
        router.push('/#skills');
      }
    }
  }

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
          {session && (
            <button className="icon-btn search-btn" aria-label="Search" onClick={focusSearch}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 001.57-4.23C15.99 6.01 13 3 9.5 3S3 6.01 3 9.5 6.01 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
          )}
          
          <ThemeToggle />

          {session ? (
            <div className="profile-menu-container">
              <button 
                className="profile-btn" 
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-haspopup="true"
              >
                <div className="avatar">
                  {session.user.name ? session.user.name[0].toUpperCase() : 'U'}
                </div>
              </button>
              
              {menuOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-header">
                    <div className="user-info">
                      <div className="user-name">{session.user.name}</div>
                      <div className="user-email">{session.user.email}</div>
                    </div>
                  </div>
                  
                  <div className="dropdown-content">
                    <Link href="/profile" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                      <span className="icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                      </span>
                      <span>Edit Profile</span>
                    </Link>
                    
                    <button onClick={() => signOut()} className="dropdown-item logout-btn">
                      <span className="icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                      </span>
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
             <Link href="/auth/login" className="btn-text">
               Login
             </Link>
          )}
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
