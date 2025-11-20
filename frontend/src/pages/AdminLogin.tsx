import React, { useState } from 'react';
import { login } from '../services/auth';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.user.role !== 'admin') {
        setError('Not an admin account');
        return;
      }
      window.location.reload();
    } catch (err: any) {
      setError(err.message || 'Error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.background}>
        <div style={styles.blob1}></div>
        <div style={styles.blob2}></div>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.header}>
          <div style={styles.icon}>🔐</div>
          <h1 style={styles.title}>Admin Portal</h1>
          <p style={styles.subtitle}>Restricted Access</p>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Admin Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
            placeholder="admin@example.com"
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={styles.input}
            placeholder="••••••••"
          />
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? '⏳ Logging in...' : '✓ Admin Login'}
        </button>
        <button
          type="button"
          style={styles.customerBtn}
          onClick={() => (window.location.hash = '#/login')}
        >
          👤 Customer Login
        </button>
      </form>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)',
    padding: '1rem',
    position: 'relative',
    overflow: 'hidden'
  },
  background: {
    position: 'absolute',
    inset: 0,
    zIndex: 0
  },
  blob1: {
    position: 'absolute',
    width: 350,
    height: 350,
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '50%',
    top: '-150px',
    right: '-100px'
  },
  blob2: {
    position: 'absolute',
    width: 300,
    height: 300,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: '50%',
    bottom: '-100px',
    left: '-80px'
  },
  form: {
    width: '100%',
    maxWidth: 420,
    background: '#fff',
    padding: '2.5rem 2rem',
    borderRadius: 20,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    zIndex: 10,
    position: 'relative'
  },
  header: { textAlign: 'center', marginBottom: '0.5rem' },
  icon: { fontSize: '2.5rem', marginBottom: '0.5rem' },
  title: {
    margin: 0,
    fontSize: '1.8rem',
    background: 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700
  },
  subtitle: { margin: '0.3rem 0 0 0', fontSize: '0.85rem', color: '#999' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.8rem', fontWeight: 600, color: '#333', textTransform: 'uppercase' },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '0.95rem',
    border: '2px solid #e0e0e0',
    borderRadius: 10,
    outline: 'none',
    fontFamily: 'inherit'
  },
  button: {
    padding: '0.9rem 1.2rem',
    fontSize: '1rem',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #2e3192 0%, #1bffff 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(46, 49, 146, 0.4)',
    transition: 'all 0.3s ease',
    marginTop: '0.5rem'
  },
  customerBtn: {
    padding: '0.7rem 1rem',
    background: '#fff3e0',
    color: '#ff9800',
    border: '2px solid #ff9800',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s ease'
  },
  error: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)',
    color: '#fff',
    padding: '0.8rem 1rem',
    fontSize: '0.85rem',
    borderRadius: 10,
    fontWeight: 500
  }
};