import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (session?.user) {
      setName(session.user.name || '');
      setEmail(session.user.email || '');
    }
  }, [session, status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Note: In a real app, you would have an API endpoint to update the user
    // For this demo, we'll simulate a success
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="page-wrapper">
      <Head>
        <title>Edit Profile | Skill Directory</title>
      </Head>
      <Header />
      
      <main className="container profile-container">
        
        <div className="profile-card">
          <h1 className="page-title">Edit Profile</h1>
          <div className="profile-header">
            <div className="avatar-large">
              {name ? name[0].toUpperCase() : 'U'}
            </div>
            <div className="profile-info">
              <h2>{name}</h2>
              <p>{email}</p>
            </div>
          </div>

          {message && <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>{message}</div>}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                disabled
                className="form-input disabled"
              />
              <small className="form-hint">Email cannot be changed</small>
            </div>

            <div className="form-group">
              <label htmlFor="password">New Password <span className="optional">(leave blank to keep current)</span></label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </main>
      <Footer />

      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: radial-gradient(circle at top right, rgba(79, 70, 229, 0.1), transparent 40%),
                      radial-gradient(circle at bottom left, rgba(236, 72, 153, 0.1), transparent 40%);
        }
        .profile-container {
          padding: 4rem 1rem;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .page-title {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: var(--text);
          text-align: center;
          font-weight: 800;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .profile-card {
          background: var(--glass);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          padding: 3rem;
          border-radius: 2rem;
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1);
          border: 1px solid var(--border);
          width: 100%;
          max-width: 600px;
          position: relative;
          overflow: hidden;
        }
        .profile-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 6px;
          background: linear-gradient(90deg, var(--primary), var(--secondary));
        }
        .profile-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
          text-align: center;
        }
        .avatar-large {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 3rem;
          font-weight: 700;
          color: white;
          box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
          border: 4px solid var(--bg);
        }
        .profile-info h2 {
          margin: 0;
          font-size: 1.5rem;
          color: var(--text);
          font-weight: 700;
        }
        .profile-info p {
          margin: 0.25rem 0 0;
          color: var(--text-light);
          font-size: 0.95rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: var(--text);
          font-size: 0.95rem;
        }
        .optional {
          font-weight: 400;
          color: var(--text-light);
          font-size: 0.85rem;
        }
        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          border: 2px solid var(--border);
          border-radius: 0.75rem;
          background: rgba(255, 255, 255, 0.5);
          color: var(--text);
          font-size: 1rem;
          transition: all 0.2s;
        }
        :global(html.dark) .form-input {
          background: rgba(15, 23, 42, 0.5);
        }
        .form-input:focus {
          border-color: var(--primary);
          outline: none;
          background: var(--bg);
          box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);
        }
        .form-input.disabled {
          opacity: 0.7;
          cursor: not-allowed;
          background: var(--bg-soft);
        }
        .form-hint {
          display: block;
          margin-top: 0.5rem;
          color: var(--text-light);
          font-size: 0.85rem;
        }
        .btn-primary {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          border: none;
          border-radius: 0.75rem;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25);
          margin-top: 1rem;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(79, 70, 229, 0.3);
          filter: brightness(1.1);
        }
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        .alert {
          padding: 1rem;
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
          text-align: center;
          font-weight: 500;
          animation: slide-up 0.3s ease-out;
        }
        .alert-success {
          background: rgba(220, 252, 231, 0.8);
          color: #166534;
          border: 1px solid #bbf7d0;
        }
        .alert-error {
          background: rgba(254, 226, 226, 0.8);
          color: #991b1b;
          border: 1px solid #fecaca;
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
