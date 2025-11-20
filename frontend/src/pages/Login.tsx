import React, { useState } from 'react';
import { login } from '../services/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
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
        <div style={styles.blob3}></div>
      </div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.header}>
          <div style={styles.icon}>🌱</div>
          <h1 style={styles.title}>Hydroponics</h1>
          <p style={styles.subtitle}>Customer Portal</p>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={styles.input}
            placeholder="you@example.com"
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
          {loading ? '⏳ Logging in...' : '✓ Login'}
        </button>
        <div style={styles.divider}>or</div>
        <div style={styles.links}>
          <button
            type="button"
            style={styles.linkBtn}
            onClick={() => (window.location.hash = '#/signup')}
          >
            📝 Create Account
          </button>
          <button
            type="button"
            style={styles.linkBtnAlt}
            onClick={() => (window.location.hash = '#/admin')}
          >
            🔐 Admin Login
          </button>
        </div>
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
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
    width: 300,
    height: 300,
    background: 'rgba(255, 200, 87, 0.3)',
    borderRadius: '50%',
    top: '-100px',
    left: '-100px',
    animation: 'float 6s ease-in-out infinite'
  },
  blob2: {
    position: 'absolute',
    width: 250,
    height: 250,
    background: 'rgba(76, 175, 80, 0.2)',
    borderRadius: '50%',
    bottom: '-80px',
    right: '-80px',
    animation: 'float 7s ease-in-out infinite'
  },
  blob3: {
    position: 'absolute',
    width: 200,
    height: 200,
    background: 'rgba(33, 150, 243, 0.15)',
    borderRadius: '50%',
    top: '50%',
    right: '10%',
    animation: 'float 8s ease-in-out infinite'
  },
  form: {
    width: '100%',
    maxWidth: 420,
    background: '#ffffff',
    padding: '2.5rem 2rem',
    borderRadius: 20,
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
    zIndex: 10,
    position: 'relative',
    backdropFilter: 'blur(10px)'
  },
  header: {
    textAlign: 'center',
    marginBottom: '0.5rem'
  },
  icon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem'
  },
  title: {
    margin: '0.3rem 0 0 0',
    fontSize: '1.8rem',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontWeight: 700
  },
  subtitle: {
    margin: '0.3rem 0',
    fontSize: '0.85rem',
    color: '#999'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem'
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: '#333',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '0.95rem',
    border: '2px solid #e0e0e0',
    borderRadius: 10,
    transition: 'all 0.3s ease',
    outline: 'none',
    fontFamily: 'inherit'
  },
  button: {
    padding: '0.9rem 1.2rem',
    fontSize: '1rem',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    marginTop: '0.5rem'
  },
  divider: {
    textAlign: 'center',
    color: '#bbb',
    fontSize: '0.8rem',
    margin: '0.5rem 0'
  },
  links: {
    display: 'flex',
    gap: '0.8rem',
    flexDirection: 'column'
  },
  linkBtn: {
    padding: '0.7rem 1rem',
    background: '#f0f4ff',
    color: '#667eea',
    border: '2px solid #667eea',
    borderRadius: 10,
    cursor: 'pointer',
    fontWeight: 600,
    transition: 'all 0.3s ease'
  },
  linkBtnAlt: {
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
    fontWeight: 500,
    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
  }
};