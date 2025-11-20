import React from 'react';

export default function Services() {
  return (
    <div style={wrap}>
      <h1>Services</h1>
      <section style={sec}>
        <h2>Monitoring</h2>
        <p>Live moisture, pH, temperature readings with historical chart storage (planned).</p>
      </section>
      <section style={sec}>
        <h2>Automation</h2>
        <p>Relay control for pumps / lights via rules and manual override.</p>
      </section>
      <section style={sec}>
        <h2>Alerts</h2>
        <p>Threshold based notifications (email / push roadmap).</p>
      </section>
      <section style={sec}>
        <h2>Analytics</h2>
        <p>Growth trend analysis and resource optimization (upcoming).</p>
      </section>
      <section style={sec}>
        <h2>Account Management</h2>
        <p>Role based access for customers and admins.</p>
      </section>
    </div>
  );
}

const wrap: React.CSSProperties = { padding: '1.5rem', maxWidth: 900, margin: '0 auto' };
const sec: React.CSSProperties = { marginBottom: '1.5rem', background:'#fff', padding:'1rem', borderRadius:8, boxShadow:'0 1px 4px rgba(0,0,0,0.06)' };