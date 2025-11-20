import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: send to backend endpoint /api/support/contact
    setSubmitted(true);
  }

  return (
    <div style={wrap}>
      <h1>Contact Us</h1>
      <section style={sec}>
        <h2>Support Channels</h2>
        <ul>
          <li>Email: support@hydroponics.local</li>
          <li>Phone: +1-555-0101</li>
          <li>MQTT: diagnostic topic for advanced users</li>
        </ul>
      </section>
      <section style={sec}>
        <h2>Send a Message</h2>
        {submitted ? (
          <div style={ok}>Message submitted. We will reply shortly.</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required style={inp}/>
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required style={inp}/>
            <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required rows={5} style={inp}/>
            <button type="submit" style={btn}>Send</button>
          </form>
        )}
      </section>
    </div>
  );
}

const wrap: React.CSSProperties = { padding:'1.5rem', maxWidth:900, margin:'0 auto' };
const sec: React.CSSProperties = { marginBottom:'1.5rem', background:'#fff', padding:'1rem', borderRadius:8, boxShadow:'0 1px 4px rgba(0,0,0,0.06)' };
const inp: React.CSSProperties = { padding:'0.6rem 0.7rem', border:'1px solid #cdd5df', borderRadius:6, font:'inherit' };
const btn: React.CSSProperties = { padding:'0.65rem', background:'#1565c0', color:'#fff', border:'none', borderRadius:6, cursor:'pointer' };
const ok: React.CSSProperties = { padding:'0.75rem', background:'#e3f7e9', borderRadius:6, color:'#1b5e20' };