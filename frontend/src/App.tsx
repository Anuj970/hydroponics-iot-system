import React, { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Signup from './pages/Signup';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import NavBar from './components/NavBar';
import { getToken, getRole } from './services/auth';

function AdminPanel() {
  return (
    <div style={{ padding:'1rem' }}>
      <h1>Admin Control Panel</h1>
      <p>Manage relays, sensors, users.</p>
    </div>
  );
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash || '#/login');
  const token = getToken();
  const role = getRole();

  useEffect(() => {
    const fn = () => setHash(window.location.hash || '#/login');
    window.addEventListener('hashchange', fn);
    return () => window.removeEventListener('hashchange', fn);
  }, []);

  // Guard: unauthenticated users only allowed on login / signup / admin
  if (!token) {
    const allowed = ['#/login', '#/signup', '#/admin'];
    if (!allowed.includes(hash)) {
      window.location.hash = '#/login';
      return null;
    }
    if (hash === '#/signup') return <Signup />;
    if (hash === '#/admin') return <AdminLogin />;
    return <Login />;
  }

  // Authenticated: full site
  return (
    <>
      <NavBar />
      {hash === '#/' && <Dashboard />}
      {hash === '#/about' && <About />}
      {hash === '#/services' && <Services />}
      {hash === '#/contact' && <Contact />}
      {role === 'admin' && hash === '#/admin-panel' && <AdminPanel />}
      {!['#/', '#/about', '#/services', '#/contact', '#/admin-panel'].includes(hash) && <Dashboard />}
    </>
  );
}