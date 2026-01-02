import { useState } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AdminNotify() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [result, setResult] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setResult(null);

    try {
      const res = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        setResult(data);
        setSubject('');
        setMessage('');
      } else {
        setStatus('error');
        setResult(data);
      }
    } catch (error) {
      console.error('Failed to send notifications:', error);
      setStatus('error');
      setResult({ message: 'Failed to connect to server' });
    }
  };

  return (
    <>
      <Head>
        <title>Send Updates - Skill Directory</title>
      </Head>
      <Header />
      <main className="container" style={{ padding: '4rem 0', maxWidth: '600px' }}>
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Send Update to Subscribers</h1>
        
        <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Subject</label>
            <input 
              type="text" 
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="search-input"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)' }}
              placeholder="e.g., New AI Courses Added!"
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Message</label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontFamily: 'inherit' }}
              placeholder="Write your update here..."
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={status === 'loading'}
            style={{ alignSelf: 'flex-start' }}
          >
            {status === 'loading' ? 'Sending...' : 'Send Broadcast'}
          </button>
        </form>

        {status === 'success' && (
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#dcfce7', borderRadius: '0.5rem', color: '#166534' }}>
            <p><strong>Success!</strong> {result?.message}</p>
            {result?.previewUrl && (
              <p style={{ marginTop: '0.5rem' }}>
                <a href={result.previewUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                  View Email Preview (Ethereal)
                </a>
              </p>
            )}
          </div>
        )}

        {status === 'error' && (
          <div style={{ marginTop: '2rem', padding: '1rem', background: '#fee2e2', borderRadius: '0.5rem', color: '#991b1b' }}>
            <p><strong>Error:</strong> {result?.message}</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
