import React, { useState } from 'react';
import { getToken, getRole, logout } from '../services/auth';

export default function NavBar() {
  const token = getToken();
  const role = getRole();
  const [mobileOpen, setMobileOpen] = useState(false);

  function nav(to: string) {
    window.location.hash = to;
    setMobileOpen(false);
  }

  return (
    <nav style={styles.bar}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <span style={styles.logo}>🌱</span>
          <span style={styles.brandText}>HydroHub</span>
        </div>

        <div style={{ ...styles.menu, display: mobileOpen ? 'flex' : 'none' }}>
          {token && (
            <>
              <button style={styles.navLink} onClick={() => nav('#/')}>Dashboard</button>
              <button style={styles.navLink} onClick={() => nav('#/services')}>Services</button>
              <button style={styles.navLink} onClick={() => nav('#/about')}>About</button>
              <button style={styles.navLink} onClick={() => nav('#/contact')}>Contact</button>
              {role === 'admin' && <button style={styles.navLinkAdmin} onClick={() => nav('#/admin-panel')}>Admin</button>}
            </>
          )}
        </div>

        <div style={styles.right}>
          {!token && (
            <>
              <button style={styles.btnOutline} onClick={() => nav('#/login')}>Sign In</button>
              <button style={styles.btnPrimary} onClick={() => nav('#/signup')}>Sign Up</button>
            </>
          )}
          {token && (
            <>
              <span style={styles.userBadge}>{role === 'admin' ? '👨‍💼 Admin' : '👤 Customer'}</span>
              <button style={styles.btnDanger} onClick={() => { logout(); window.location.hash = '#/login'; window.location.reload(); }}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles: Record<string, React.CSSProperties> = {
  bar: {
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  container: {
    maxWidth: 1400,
    margin: '0 auto',
    padding: '0 1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    cursor: 'pointer'
  },
  logo: { fontSize: '1.5rem' },
  brandText: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: '#1f2937',
    letterSpacing: '-0.5px'
  },
  menu: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center'
  },
  navLink: {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    borderRadius: 6,
    transition: 'all 0.2s ease'
  },
  navLinkAdmin: {
    background: 'rgba(59, 130, 246, 0.1)',
    border: '1px solid rgba(59, 130, 246, 0.3)',
    color: '#3b82f6',
    fontSize: '0.95rem',
    fontWeight: 600,
    cursor: 'pointer',
    padding: '0.5rem 1rem',
    borderRadius: 6,
    transition: 'all 0.2s ease'
  },
  right: {
    display: 'flex',
    gap: '0.8rem',
    alignItems: 'center'
  },
  btnOutline: {
    background: 'none',
    border: '1.5px solid #d1d5db',
    color: '#1f2937',
    padding: '0.5rem 1.1rem',
    borderRadius: 8,
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  btnPrimary: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    border: 'none',
    color: '#fff',
    padding: '0.6rem 1.2rem',
    borderRadius: 8,
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    transition: 'all 0.2s ease'
  },
  btnDanger: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    border: 'none',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: 8,
    fontSize: '0.9rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  userBadge: {
    background: '#f3f4f6',
    color: '#374151',
    padding: '0.5rem 0.8rem',
    borderRadius: 6,
    fontSize: '0.85rem',
    fontWeight: 500
  }
};