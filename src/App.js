import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Mail, Download, Send, Menu, X, ArrowRight, Shield, Globe, Zap, ExternalLink } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] } })
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({ opacity: 1, scale: 1, transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] } })
};

function AnimSection({ children, className = '', id, style }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section id={id} ref={ref} initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={stagger} className={className} style={style}>
      {children}
    </motion.section>
  );
}

function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, duration: Math.random() * 8 + 6, delay: Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: 'rgba(217,4,41,0.25)' }}
          animate={{ y: [-15, 15, -15], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function StatCard({ value, label, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} custom={delay} variants={fadeUp} className="text-center">
      <motion.div className="text-4xl font-bold mb-2" style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", color }}
        initial={{ opacity: 0, scale: 0.5 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: delay * 0.15 + 0.3, duration: 0.5, type: 'spring', stiffness: 200 }}
      >{value}</motion.div>
      <div className="text-sm font-medium leading-tight" style={{ color: '#64748b' }}>{label}</div>
    </motion.div>
  );
}

export default function CrimsonWingsWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [state, handleFormspreeSubmit] = useForm('meorbypg');
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onScroll = () => {
      const sections = ['home', 'overview', 'vision', 'gallery', 'team', 'contact'];
      const found = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 100 && r.bottom >= 100;
      });
      if (found) setActiveSection(found);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMobileMenuOpen(false); };
  const downloadTeaser = () => { const a = document.createElement('a'); a.href = '/investment-teaser-v2.pdf'; a.download = 'CrimsonWings_Investor_Teaser.pdf'; a.click(); };

  const navItems = [
    { id: 'home', label: 'Home' }, { id: 'overview', label: 'Overview' }, { id: 'vision', label: 'Vision' },
    { id: 'gallery', label: 'Gallery' }, { id: 'team', label: 'Team' }, { id: 'contact', label: 'Contact' },
  ];

  const teamMembers = [
    { name: 'Dr. Michael Naiyeju', title: 'CEO', bio: "Seasoned Physician-Executive with 15+ years' experience in clinical services and healthcare leadership. Expert in international healthcare management, operations, and strategic business growth across multiple ventures.", image: '/team/micheal-naiyeju.jpg' },
    { name: 'Mr. Deniyi TOBUN', title: 'COO', bio: "Accomplished healthcare executive with 25+ years' leadership across UK and GCC health systems. Expert in surgical operations, service management, and healthcare business optimization driving excellence and efficiency.", image: '/team/deniyi-tobun.png' },
    { name: 'Mr. Clement C. Iwuchukwu', title: 'CTO', bio: "Innovative Executive with 17+ years' experience in software engineering, cybersecurity, and smart logistics. Expert in cloud systems, automation, and drone-enabled cold-chain technology for healthcare operations.", image: '/team/clement-iwuchukwu.jpg' },
    { name: 'Prof. Alani S. Akanmu', title: 'CMO', bio: "Professor of Hematology with 30+ years' clinical, academic, and global research leadership in transfusion medicine, HIV care, and hematologic disorders; leading programs, policy, and over 200 peer-reviewed publications.", image: '/team/alani-akanmu.jpg' },
  ];

  const visionPillars = [
    { icon: Shield, title: 'Strategic Independence', desc: "Eliminating Africa's 100% reliance on imported plasma products through world-class local manufacturing.", iconGrad: 'linear-gradient(135deg,#d90429,#ef4444)', glow: 'rgba(217,4,41,0.18)', borderColor: 'rgba(217,4,41,0.2)' },
    { icon: Zap, title: 'Quality Therapeutics', desc: 'Delivering WHO-compliant, life-saving plasma medicines that meet and exceed international standards.', iconGrad: 'linear-gradient(135deg,#0077b6,#0096c7)', glow: 'rgba(0,119,182,0.18)', borderColor: 'rgba(0,119,182,0.2)' },
    { icon: Globe, title: 'Continental Impact', desc: 'Creating sustainable healthcare solutions serving 300+ million people across West Africa and beyond.', iconGrad: 'linear-gradient(135deg,#f59e0b,#fbbf24)', glow: 'rgba(245,158,11,0.18)', borderColor: 'rgba(245,158,11,0.2)' },
  ];

  const DS = { fontDisplay: "'Cormorant Garamond',Georgia,serif", crimson: '#d90429', ocean: '#0077b6', slate500: '#64748b', slate900: '#0f172a' };

  return (
    <div style={{ fontFamily: "'DM Sans',system-ui,sans-serif", background: '#fafafc', color: '#1e293b', overflowX: 'hidden' }}>

      {/* ── NAV: always solid white ─────────────────── */}
      <motion.header
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: '#ffffff', borderBottom: '1px solid #f1f5f9', boxShadow: '0 1px 20px rgba(0,0,0,0.07)' }}
        initial={{ y: -80 }} animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1280px', margin: '0 auto', padding: '12px 24px' }}>
          <motion.button onClick={() => scrollTo('home')} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <img src="/logo-crimson.png" alt="CrimsonWings" style={{ width: 40, height: 40, objectFit: 'contain' }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontFamily: DS.fontDisplay, fontWeight: 700, fontSize: 19, background: 'linear-gradient(90deg,#d90429,#ef4444,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CrimsonWings</span>
              <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: DS.ocean, marginTop: 2 }}>Plasma Biologics</span>
            </div>
          </motion.button>

          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 28 }}>
            {navItems.map((item, i) => (
              <motion.button key={item.id} onClick={() => scrollTo(item.id)}
                style={{ position: 'relative', fontSize: 13, fontWeight: 500, color: activeSection === item.id ? DS.crimson : '#64748b', background: 'none', border: 'none', cursor: 'pointer', paddingBottom: 4 }}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 + 0.4 }}
                whileHover={{ color: DS.crimson }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div layoutId="nav-indicator"
                    style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: DS.crimson, borderRadius: 2 }}
                  />
                )}
              </motion.button>
            ))}
            <motion.button onClick={downloadTeaser}
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg,#d90429,#b8031e)', border: 'none', borderRadius: 10, padding: '8px 16px', cursor: 'pointer' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: '0 8px 24px rgba(217,4,41,0.4)' }} whileTap={{ scale: 0.97 }}
            >
              <Download size={13} /> Investor Teaser
            </motion.button>
          </div>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(v => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151', padding: 6 }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div style={{ background: '#fff', borderTop: '1px solid #f1f5f9' }}
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            >
              <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {navItems.map(item => (
                  <button key={item.id} onClick={() => scrollTo(item.id)}
                    style={{ textAlign: 'left', fontSize: 14, fontWeight: 500, color: activeSection === item.id ? DS.crimson : '#64748b', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0' }}
                  >{item.label}</button>
                ))}
                <button onClick={() => { downloadTeaser(); setMobileMenuOpen(false); }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg,#d90429,#b8031e)', border: 'none', borderRadius: 12, padding: '12px 0', cursor: 'pointer', marginTop: 4 }}
                >
                  <Download size={14} /> Download Investor Teaser
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── HERO ─────────────────────────────────── */}
      <section id="home" ref={heroRef} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', paddingTop: 72 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#06091a 0%,#0d1526 50%,#160813 100%)' }} />
        <motion.div style={{ position: 'absolute', inset: 0, y: heroY }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%,rgba(217,4,41,0.22),transparent)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: 384, height: 384, borderRadius: '50%', background: 'rgba(0,119,182,0.08)', filter: 'blur(80px)' }} />
          <div style={{ position: 'absolute', top: '33%', left: -80, width: 320, height: 320, borderRadius: '50%', background: 'rgba(217,4,41,0.06)', filter: 'blur(80px)' }} />
        </motion.div>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.4) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
        <Particles />

        <motion.div style={{ position: 'relative', zIndex: 10, maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center', opacity: heroOpacity }}>
          <motion.div variants={fadeUp} custom={0} initial="hidden" animate="visible"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 999, border: '1px solid rgba(217,4,41,0.4)', background: 'rgba(217,4,41,0.1)', color: '#f87171', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 32 }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d90429', animation: 'pulse 2s infinite' }} />
            West Africa's First Plasma Fractionation Plant
          </motion.div>

          <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible"
            style={{ fontFamily: DS.fontDisplay, fontSize: 'clamp(2.6rem,8vw,5.2rem)', fontWeight: 700, color: '#fff', lineHeight: 1.05, marginBottom: 24 }}
          >
            Pioneering Africa's{' '}
            <span style={{ background: 'linear-gradient(90deg,#d90429,#ef4444,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Independence</span>
            <br />in Plasma Medicine
          </motion.h1>

          <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible"
            style={{ fontSize: 18, fontWeight: 300, color: '#94a3b8', marginBottom: 16, letterSpacing: '0.02em' }}
          >CrimsonWings Plasma Biologics Ltd</motion.p>

          <motion.p variants={fadeUp} custom={3} initial="hidden" animate="visible"
            style={{ fontSize: 15, color: '#64748b', marginBottom: 48, maxWidth: 600, margin: '0 auto 48px', lineHeight: 1.7 }}
          >
            Building West Africa's first indigenous plasma fractionation facility to deliver life-saving therapeutics — immunoglobulins, albumin, clotting factors — to millions across the continent.
          </motion.p>

          <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible" style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <motion.button onClick={downloadTeaser}
              style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg,#d90429,#b8031e)', border: 'none', borderRadius: 12, padding: '14px 32px', cursor: 'pointer', boxShadow: '0 8px 32px rgba(217,4,41,0.35)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 20px 48px rgba(217,4,41,0.5)' }} whileTap={{ scale: 0.97 }}
            ><Download size={18} /> Download Investor Teaser</motion.button>
            <motion.button onClick={() => scrollTo('overview')}
              style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.75)', background: 'none', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 12, padding: '14px 32px', cursor: 'pointer' }}
              whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }} whileTap={{ scale: 0.97 }}
            >Learn More <ArrowRight size={16} /></motion.button>
          </motion.div>

          <motion.button onClick={() => scrollTo('overview')}
            style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', cursor: 'pointer' }}
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
            whileHover={{ color: 'rgba(255,255,255,0.7)' }}
          ><ChevronDown size={28} /></motion.button>
        </motion.div>
      </section>

      {/* ── OVERVIEW ─────────────────────────── */}
      <AnimSection id="overview" style={{ padding: '112px 0', background: '#fafafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <motion.div variants={fadeUp} custom={0} style={{ textAlign: 'center', marginBottom: 80 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: DS.crimson, background: 'rgba(217,4,41,0.08)', padding: '6px 16px', borderRadius: 999 }}>Company Overview</span>
            <h2 style={{ fontFamily: DS.fontDisplay, fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: DS.slate900, marginTop: 16, lineHeight: 1.2 }}>
              Africa's <span style={{ background: 'linear-gradient(90deg,#d90429,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Plasma Revolution</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 64, alignItems: 'center' }}>
            <motion.div variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                <><strong style={{ color: DS.crimson }}>CrimsonWings Plasma Biologics Ltd</strong>, a subsidiary of CrimsonWings Blood Logistics Ltd, is pioneering West Africa's first Plasma Fractionation Plant to manufacture life-saving plasma-derived therapeutics.</>,
                <>Our state-of-the-art facility will produce essential medications including immunoglobulins, albumin, and clotting factors, addressing the critical shortage of these therapies across Africa.</>,
                <>By establishing local manufacturing capabilities, we're reducing Africa's dependence on imported plasma products while creating a sustainable, ethical supply chain that benefits patients, healthcare systems, and communities.</>
              ].map((text, i) => (
                <motion.p key={i} variants={fadeUp} custom={i} style={{ fontSize: 15, lineHeight: 1.75, color: '#475569' }}>{text}</motion.p>
              ))}
              <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, paddingTop: 32, borderTop: '1px solid #f1f5f9' }}>
                <StatCard value="1st" label="Indigenous Plant in West Africa" color={DS.crimson} delay={0} />
                <StatCard value="8+" label="Life-Saving Products" color={DS.ocean} delay={1} />
                <StatCard value="300M" label="People Served Across Africa" color={DS.crimson} delay={2} />
              </motion.div>
            </motion.div>

            <motion.div variants={scaleIn} custom={0} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: -16, background: 'linear-gradient(135deg,rgba(217,4,41,0.07),rgba(0,119,182,0.07))', borderRadius: 24, filter: 'blur(24px)' }} />
              <div style={{ position: 'relative', backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.7)', borderRadius: 20, padding: 12, boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                <img src="/fractionation-tech.png" alt="Plasma Fractionation Technology" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
                  <div style={{ backdropFilter: 'blur(12px)', background: 'rgba(255,255,255,0.88)', borderRadius: 12, padding: '10px 16px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                    <p style={{ fontSize: 12, fontWeight: 600, color: '#334155' }}>Advanced Plasma Fractionation Technology</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimSection>

      {/* ── VISION ───────────────────────────── */}
      <AnimSection id="vision" style={{ padding: '112px 0', position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg,#06091a 0%,#0d1526 40%,#130a1a 100%)' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: 0, left: '25%', width: 384, height: 384, borderRadius: '50%', background: 'rgba(217,4,41,0.06)', filter: 'blur(100px)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: '25%', width: 320, height: 320, borderRadius: '50%', background: 'rgba(0,119,182,0.06)', filter: 'blur(100px)' }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.6) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <motion.div variants={fadeUp} custom={0} style={{ textAlign: 'center', marginBottom: 64 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f87171', background: 'rgba(217,4,41,0.15)', border: '1px solid rgba(217,4,41,0.2)', padding: '6px 16px', borderRadius: 999 }}>Our Vision</span>
            <h2 style={{ fontFamily: DS.fontDisplay, fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: '#fff', marginTop: 16, lineHeight: 1.2 }}>
              Built to <span style={{ background: 'linear-gradient(90deg,#d90429,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Transform</span> Africa
            </h2>
          </motion.div>

          {/* Quote card: rich dark glass, no flat grey */}
          <motion.div variants={scaleIn} custom={0} style={{ marginBottom: 56 }}>
            <div style={{ borderRadius: 20, padding: '40px 48px', background: 'linear-gradient(135deg,rgba(255,255,255,0.07) 0%,rgba(255,255,255,0.03) 100%)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', boxShadow: '0 32px 64px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', gap: 20, marginBottom: 24 }}>
                <div style={{ width: 3, minHeight: '100%', flexShrink: 0, borderRadius: 2, background: 'linear-gradient(180deg,#d90429,#f59e0b)' }} />
                <p style={{ fontFamily: DS.fontDisplay, fontSize: 'clamp(1rem,2.5vw,1.25rem)', fontWeight: 400, fontStyle: 'italic', color: 'rgba(255,255,255,0.92)', lineHeight: 1.75, margin: 0 }}>
                  "To build Africa's first fully indigenous plasma therapeutics powerhouse, ensuring access to affordable, high-quality plasma-derived medicines while creating a sustainable ecosystem that empowers local healthcare systems."
                </p>
              </div>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.50)', lineHeight: 1.7, margin: 0 }}>
                We envision a future where African patients no longer face critical shortages of immunoglobulins, albumin, and clotting factors. Through innovation, ethical practices, and world-class manufacturing, we're transforming healthcare delivery across the continent.
              </p>
            </div>
          </motion.div>

          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 24 }}>
            {visionPillars.map((p, i) => (
              <motion.div key={i} variants={scaleIn} custom={i}
                style={{ borderRadius: 20, padding: 28, background: 'rgba(255,255,255,0.04)', border: `1px solid ${p.borderColor}`, backdropFilter: 'blur(12px)', cursor: 'default' }}
                whileHover={{ y: -8, boxShadow: `0 24px 48px ${p.glow}`, background: 'rgba(255,255,255,0.07)' }} transition={{ duration: 0.3 }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: p.iconGrad, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
                  <p.icon size={22} color="#fff" />
                </div>
                <h3 style={{ fontFamily: DS.fontDisplay, fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{p.title}</h3>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.52)', lineHeight: 1.7 }}>{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimSection>

      {/* ── GALLERY ──────────────────────────── */}
      <AnimSection id="gallery" style={{ padding: '112px 0', background: '#fafafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <motion.div variants={fadeUp} custom={0} style={{ textAlign: 'center', marginBottom: 80 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: DS.ocean, background: 'rgba(0,119,182,0.08)', padding: '6px 16px', borderRadius: 999 }}>Project Gallery</span>
            <h2 style={{ fontFamily: DS.fontDisplay, fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: DS.slate900, marginTop: 16, lineHeight: 1.2 }}>
              The <span style={{ background: 'linear-gradient(90deg,#0077b6,#0096c7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Facility &amp; Operations</span>
            </h2>
          </motion.div>

          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 24, marginBottom: 32 }}>
            {[
              { src: '/plant-interior.jpg', title: 'Inside Our Plasma Fractionation Plant', desc: 'State-of-the-art facility with advanced purification and quality control systems' },
              { src: '/logistics-flow.jpg', title: 'From Collection to Delivery', desc: 'CrimsonWings Blood Logistics Chain: drones, vans, and bikes ensuring timely delivery' },
            ].map((item, i) => (
              <motion.div key={i} variants={scaleIn} custom={i}
                style={{ position: 'relative', overflow: 'hidden', borderRadius: 20, aspectRatio: '4/3', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
                whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}
                className="group"
              >
                <img src={item.src} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.7s' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.08)'} onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(6,9,26,0.88) 0%,transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 24 }}>
                  <h3 style={{ fontFamily: DS.fontDisplay, fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{item.title}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={scaleIn} custom={2} style={{ borderRadius: 20, padding: 32, background: 'linear-gradient(135deg,#06091a,#0d1526)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(120px,1fr))', gap: 32, textAlign: 'center' }}>
              {[
                { value: 'GMP', label: 'Certified Manufacturing', color: DS.ocean },
                { value: '24/7', label: 'Cold Chain Monitoring', color: DS.crimson },
                { value: 'ISO', label: 'Quality Compliance', color: DS.ocean },
                { value: 'WHO', label: 'Prequalified Standards', color: '#f59e0b' },
              ].map((s, i) => (
                <motion.div key={i} whileHover={{ scale: 1.08 }} transition={{ duration: 0.2 }}>
                  <div style={{ fontFamily: DS.fontDisplay, fontSize: 30, fontWeight: 700, color: s.color, marginBottom: 8 }}>{s.value}</div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8' }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </AnimSection>

      {/* ── TEAM ─────────────────────────────── */}
      <AnimSection id="team" style={{ padding: '112px 0', background: 'linear-gradient(160deg,#f8fafc 0%,#eff6ff 100%)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <motion.div variants={fadeUp} custom={0} style={{ textAlign: 'center', marginBottom: 24 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: DS.crimson, background: 'rgba(217,4,41,0.08)', padding: '6px 16px', borderRadius: 999 }}>Leadership</span>
            <h2 style={{ fontFamily: DS.fontDisplay, fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: DS.slate900, marginTop: 16, lineHeight: 1.2 }}>
              Our <span style={{ background: 'linear-gradient(90deg,#d90429,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>World-Class</span> Team
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} custom={1} style={{ textAlign: 'center', fontSize: 15, color: DS.slate500, marginBottom: 64, maxWidth: 480, margin: '0 auto 64px' }}>
            A distinguished team of experts driving Africa's plasma therapeutics revolution
          </motion.p>

          <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 24 }}>
            {teamMembers.map((member, i) => (
              <motion.div key={i} variants={scaleIn} custom={i}
                style={{ background: '#fff', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
                whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.13)' }} transition={{ duration: 0.35 }}
              >
                <div style={{ height: 96, background: 'linear-gradient(135deg,#06091a,#1e2a4a)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at top,rgba(217,4,41,0.35),transparent)' }} />
                </div>
                <div style={{ padding: '0 20px 24px', marginTop: -48 }}>
                  <div style={{ position: 'relative', marginBottom: 16 }}>
                    <img src={member.image} alt={member.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', boxShadow: '0 4px 16px rgba(0,0,0,0.15)', display: 'block', margin: '0 auto' }} />
                    <div style={{ position: 'absolute', bottom: -4, left: '50%', transform: 'translateX(-50%)', background: DS.crimson, color: '#fff', fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 999, letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{member.title}</div>
                  </div>
                  <h3 style={{ fontFamily: DS.fontDisplay, fontSize: 16, fontWeight: 700, textAlign: 'center', color: DS.slate900, marginBottom: 12, marginTop: 8 }}>{member.name}</h3>
                  <p style={{ fontSize: 12, textAlign: 'center', color: DS.slate500, lineHeight: 1.7 }}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} custom={5} style={{ marginTop: 64 }}>
            <div style={{ maxWidth: 800, margin: '0 auto', padding: 32, borderRadius: 20, background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', textAlign: 'center' }}>
              <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.75, marginBottom: 16 }}>
                Beyond our core leadership team, we're supported by a distinguished advisory board comprising CEOs and Managing Directors of top-tier private hospitals, representatives from the Lagos State Blood Transfusion Service (LSBTS) and the Lagos Ministry of Health (LMoH), as well as drone technology partners from Aerial-Robotix.
              </p>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#1e293b', lineHeight: 1.7 }}>
                Together, we combine science, strategy, and scalability — backed by leaders across healthcare, policy, and innovation.
              </p>
            </div>
          </motion.div>
        </div>
      </AnimSection>

      {/* ── CONTACT ──────────────────────────── */}
      <AnimSection id="contact" style={{ padding: '112px 0', background: '#fafafc' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <motion.div variants={fadeUp} custom={0} style={{ textAlign: 'center', marginBottom: 24 }}>
            <span style={{ display: 'inline-block', fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: DS.crimson, background: 'rgba(217,4,41,0.08)', padding: '6px 16px', borderRadius: 999 }}>Get In Touch</span>
            <h2 style={{ fontFamily: DS.fontDisplay, fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 700, color: DS.slate900, marginTop: 16, lineHeight: 1.2 }}>
              Ready to <span style={{ background: 'linear-gradient(90deg,#d90429,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Invest</span> in Africa's Future?
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} custom={1} style={{ textAlign: 'center', fontSize: 15, color: DS.slate500, marginBottom: 64, maxWidth: 440, margin: '0 auto 64px' }}>
            Interested in investing or partnering? We'd love to hear from you.
          </motion.p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 48, maxWidth: 960, margin: '0 auto' }}>
            <motion.div variants={stagger} style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
              <motion.h3 variants={fadeUp} style={{ fontFamily: DS.fontDisplay, fontSize: 24, fontWeight: 700, color: DS.slate900 }}>Contact Information</motion.h3>
              {[
                { icon: Mail, label: 'General Inquiries', email: 'infodeskcwpbl@crimsonwingsbiologics.com', iconColor: DS.ocean, iconBg: 'rgba(0,119,182,0.1)' },
                { icon: Mail, label: 'Investor Relations', email: 'investorrelations@crimsonwingsbiologics.com', iconColor: DS.crimson, iconBg: 'rgba(217,4,41,0.1)' },
              ].map((c, i) => (
                <motion.div key={i} variants={fadeUp} custom={i + 1} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: c.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <c.icon size={18} style={{ color: c.iconColor }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: DS.slate900, marginBottom: 4 }}>{c.label}</p>
                    <a href={`mailto:${c.email}`} style={{ fontSize: 13, color: c.iconColor, wordBreak: 'break-all', textDecoration: 'none' }}
                      onMouseEnter={e => e.target.style.textDecoration = 'underline'} onMouseLeave={e => e.target.style.textDecoration = 'none'}
                    >{c.email}</a>
                  </div>
                </motion.div>
              ))}
              <motion.div variants={fadeUp} custom={3} style={{ paddingTop: 24, borderTop: '1px solid #f1f5f9' }}>
                <motion.a href="https://crimsonwings-logistics.com" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}
                  whileHover={{ x: 4, color: DS.crimson }}
                >Visit CrimsonWings Logistics <ExternalLink size={13} /></motion.a>
                <p style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>Our parent company</p>
              </motion.div>
            </motion.div>

            <motion.div variants={scaleIn} custom={0}>
              {state.succeeded ? (
                <div style={{ padding: 40, borderRadius: 20, background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)', textAlign: 'center' }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}
                    style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: 32 }}
                  >✅</motion.div>
                  <h3 style={{ fontFamily: DS.fontDisplay, fontSize: 24, fontWeight: 700, color: DS.slate900, marginBottom: 8 }}>Thank You!</h3>
                  <p style={{ fontSize: 14, color: DS.slate500 }}>Your message has been sent. We'll be in touch soon!</p>
                </div>
              ) : (
                <div style={{ padding: 28, borderRadius: 20, background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
                  <form onSubmit={handleFormspreeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {[{ id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' }, { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' }].map(field => (
                      <div key={field.id}>
                        <label htmlFor={field.id} style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: DS.slate500, marginBottom: 6 }}>{field.label}</label>
                        <input id={field.id} type={field.type} name={field.id} required placeholder={field.placeholder}
                          style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #e2e8f0', background: 'rgba(255,255,255,0.9)', fontSize: 14, color: '#1e293b', outline: 'none', boxSizing: 'border-box' }}
                          onFocus={e => { e.target.style.borderColor = DS.crimson; e.target.style.boxShadow = '0 0 0 3px rgba(217,4,41,0.1)'; }}
                          onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                        />
                        <ValidationError prefix={field.label} field={field.id} errors={state.errors} style={{ fontSize: 12, color: DS.crimson, marginTop: 4 }} />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="message" style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: DS.slate500, marginBottom: 6 }}>Message</label>
                      <textarea id="message" name="message" required rows="4" placeholder="Tell us about your interest..."
                        style={{ width: '100%', padding: '12px 16px', borderRadius: 12, border: '1.5px solid #e2e8f0', background: 'rgba(255,255,255,0.9)', fontSize: 14, color: '#1e293b', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                        onFocus={e => { e.target.style.borderColor = DS.crimson; e.target.style.boxShadow = '0 0 0 3px rgba(217,4,41,0.1)'; }}
                        onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                      />
                      <ValidationError prefix="Message" field="message" errors={state.errors} style={{ fontSize: 12, color: DS.crimson, marginTop: 4 }} />
                    </div>
                    <motion.button type="submit" disabled={state.submitting}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px 0', borderRadius: 12, border: 'none', fontSize: 14, fontWeight: 600, color: '#fff', background: 'linear-gradient(135deg,#d90429,#b8031e)', cursor: state.submitting ? 'not-allowed' : 'pointer', opacity: state.submitting ? 0.6 : 1 }}
                      whileHover={!state.submitting ? { scale: 1.02, boxShadow: '0 12px 32px rgba(217,4,41,0.35)' } : {}}
                      whileTap={!state.submitting ? { scale: 0.97 } : {}}
                    ><Send size={15} />{state.submitting ? 'Sending...' : 'Send Message'}</motion.button>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </AnimSection>

      {/* ── FOOTER ───────────────────────────── */}
      <footer style={{ padding: '56px 0', background: '#050810' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <img src="/logo-crimson.png" alt="CrimsonWings" style={{ width: 44, height: 44, objectFit: 'contain' }} />
              <div>
                <div style={{ fontFamily: DS.fontDisplay, fontWeight: 700, fontSize: 20, background: 'linear-gradient(90deg,#d90429,#f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>CrimsonWings</div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#475569', marginTop: 2 }}>Plasma Biologics Ltd</div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
              {navItems.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#475569', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = '#475569'}
                >{item.label}</button>
              ))}
            </div>
            <div style={{ textAlign: 'right', fontSize: 12, lineHeight: 1.8 }}>
              <p style={{ color: '#94a3b8', fontWeight: 500 }}>Pioneering Africa's Independence</p>
              <p style={{ color: '#475569' }}>in Plasma Medicine</p>
              <p style={{ color: '#334155', marginTop: 4 }}>A subsidiary of CrimsonWings Blood Logistics Ltd</p>
            </div>
          </div>
          <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #0f172a', textAlign: 'center', fontSize: 12, color: '#334155' }}>
            © 2026 CrimsonWings Plasma Biologics Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
