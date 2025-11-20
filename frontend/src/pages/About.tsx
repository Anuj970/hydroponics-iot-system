import React from 'react';

export default function About() {
  return (
    <div style={wrap}>
      <h1>About Hydroponics IoT System</h1>
      <section style={sec}>
        <h2>Mission</h2>
        <p>Deliver precise, data‑driven hydroponic cultivation through affordable IoT.</p>
      </section>
      <section style={sec}>
        <h2>Technology Stack</h2>
        <ul>
          <li>Firmware: Arduino (ESP based)</li>
          <li>Messaging: MQTT topics for sensor + relay control</li>
          <li>Backend: Node.js TypeScript services</li>
          <li>Frontend: React + Vite</li>
        </ul>
      </section>
      <section style={sec}>
        <h2>Core Features</h2>
        <ul>
          <li>Real‑time sensor telemetry</li>
          <li>Relay automation rules</li>
          <li>Role based access (admin / customer)</li>
        </ul>
      </section>
      <section style={sec}>
        <h2>Future Roadmap</h2>
        <p>Analytics, predictive irrigation, mobile app, multi‑farm tenancy.</p>
      </section>
    </div>
  );
}

const wrap: React.CSSProperties = { padding: '1.5rem', maxWidth: 900, margin: '0 auto' };
const sec: React.CSSProperties = { marginBottom: '1.5rem', background:'#fff', padding:'1rem', borderRadius:8, boxShadow:'0 1px 4px rgba(0,0,0,0.06)' };