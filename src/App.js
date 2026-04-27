import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Mail, Download, Send, Menu, X, ArrowRight, Shield, Globe, Zap, ChevronRight } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

/* ─────────────────────────────────────────
   ANIMATION VARIANTS
───────────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  })
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: (i = 0) => ({
    opacity: 1, scale: 1,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
};

/* ─────────────────────────────────────────
   ANIMATED SECTION WRAPPER
───────────────────────────────────────── */
function AnimSection({ children, className = '', id, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─────────────────────────────────────────
   PARTICLE FIELD
───────────────────────────────────────── */
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-crimson/20"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [-15, 15, -15], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   STAT COUNTER
───────────────────────────────────────── */
function StatCard({ value, label, color, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      custom={delay}
      variants={fadeUp}
      className="text-center"
    >
      <motion.div
        className={`text-4xl font-display font-bold ${color}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: delay * 0.15 + 0.3, duration: 0.5, type: 'spring', stiffness: 200 }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-slate-500 mt-2 font-medium leading-tight">{label}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   GLASS CARD
───────────────────────────────────────── */
function GlassCard({ children, className = '', hover = true }) {
  return (
    <motion.div
      className={`backdrop-blur-md bg-white/70 border border-white/60 rounded-2xl shadow-glass ${className}`}
      whileHover={hover ? { y: -6, boxShadow: '0 24px 48px -12px rgba(217,4,41,0.18)' } : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function CrimsonWingsWebsite() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [state, handleFormspreeSubmit] = useForm('meorbypg');
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'overview', label: 'Overview' },
    { id: 'vision', label: 'Vision' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
  ];

  const teamMembers = [
    {
      name: 'Dr. Michael Naiyeju',
      title: 'CEO',
      bio: 'Seasoned Physician-Executive with 15+ years\' experience in clinical services and healthcare leadership. Expert in international healthcare management, operations, and strategic business growth across multiple ventures.',
      image: '/team/micheal-naiyeju.jpg'
    },
    {
      name: 'Mr. Deniyi TOBUN',
      title: 'COO',
      bio: 'Accomplished healthcare executive with 25+ years\' leadership across UK and GCC health systems. Expert in surgical operations, service management, and healthcare business optimization driving excellence and efficiency.',
      image: '/team/deniyi-tobun.png'
    },
    {
      name: 'Mr. Clement C. Iwuchukwu',
      title: 'CTO',
      bio: 'Innovative Executive with 17+ years\' experience in software engineering, cybersecurity, and smart logistics. Expert in cloud systems, automation, and drone-enabled cold-chain technology for healthcare operations.',
      image: '/team/clement-iwuchukwu.jpg'
    },
    {
      name: 'Prof. Titi A. Adeyemo',
      title: 'CMO',
      bio: 'Distinguished Hematologist with 15+ years\' clinical and research leadership. Expert in hemoglobinopathies, hemophilia, and translational research advancing sickle cell and bleeding disorder care systems.',
      image: '/team/titi-adeyemo.jpg'
    }
  ];

  const visionPillars = [
    {
      icon: Shield,
      title: 'Strategic Independence',
      desc: 'Eliminating Africa\'s 100% reliance on imported plasma products through world-class local manufacturing.',
      accent: 'from-crimson to-red-400',
      border: 'border-crimson/30'
    },
    {
      icon: Zap,
      title: 'Quality Therapeutics',
      desc: 'Delivering WHO-compliant, life-saving plasma medicines that meet and exceed international standards.',
      accent: 'from-ocean to-blue-400',
      border: 'border-ocean/30'
    },
    {
      icon: Globe,
      title: 'Continental Impact',
      desc: 'Creating sustainable healthcare solutions serving 300+ million people across West Africa and beyond.',
      accent: 'from-crimson to-amber-500',
      border: 'border-amber-400/30'
    },
  ];

  return (
    <div className="font-body text-slate-800 bg-pearl overflow-x-hidden">

      {/* ── NAV ─────────────────────────────── */}
      <motion.header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl shadow-nav' : 'bg-transparent'}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="container mx-auto px-6 py-4 flex items-center justify-between max-w-7xl">
          <motion.button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
          >
            <img src="/logo-crimson.png" alt="CrimsonWings" className="w-12 h-12 object-contain" />
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-xl bg-gradient-to-r from-crimson via-red-500 to-amber-500 bg-clip-text text-transparent">
                CrimsonWings
              </span>
              <span className="text-[10px] font-medium text-ocean tracking-widest uppercase">Plasma Biologics</span>
            </div>
          </motion.button>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-sm font-medium tracking-wide transition-colors relative pb-1 ${
                  activeSection === item.id ? 'text-crimson' : 'text-slate-600 hover:text-crimson'
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.4 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-crimson rounded-full"
                  />
                )}
              </motion.button>
            ))}
            <motion.button
              onClick={() => {
                const a = document.createElement('a');
                a.href = '/investment-teaser-v2.pdf';
                a.download = 'CrimsonWings_Investor_Teaser.pdf';
                a.click();
              }}
              className="btn-primary flex items-center gap-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={14} />
              Investor Teaser
            </motion.button>
          </div>

          <button className="md:hidden text-slate-700 p-1" onClick={() => setMobileMenuOpen(v => !v)}>
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="container mx-auto px-6 py-5 flex flex-col gap-4">
                {navItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`text-left text-sm font-medium py-1 ${activeSection === item.id ? 'text-crimson' : 'text-slate-600'}`}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  onClick={() => { const a = document.createElement('a'); a.href = '/investment-teaser-v2.pdf'; a.download = 'CrimsonWings_Investor_Teaser.pdf'; a.click(); }}
                  className="btn-primary flex items-center gap-2 text-sm w-full justify-center mt-2"
                >
                  <Download size={14} /> Download Investor Teaser
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* ── HERO ─────────────────────────────── */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,4,41,0.25),transparent)]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-ocean/10 rounded-full filter blur-3xl" />
          <div className="absolute top-1/3 left-0 w-80 h-80 bg-crimson/8 rounded-full filter blur-3xl" />
        </motion.div>

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }}
        />
        <Particles />

        <motion.div
          className="relative z-10 container mx-auto px-6 text-center max-w-5xl"
          style={{ opacity: heroOpacity }}
        >
          {/* Tag */}
          <motion.div
            variants={fadeUp}
            custom={0}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-crimson/40 bg-crimson/10 text-crimson text-xs font-semibold tracking-widest uppercase mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-pulse" />
            West Africa's First Plasma Fractionation Plant
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl sm:text-6xl md:text-8xl font-bold text-white leading-[1.05] mb-6"
          >
            Pioneering Africa's{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-crimson via-red-400 to-amber-400 bg-clip-text text-transparent">
                Independence
              </span>
            </span>
            <br />
            in Plasma Medicine
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-slate-300 font-light mb-4 tracking-wide"
          >
            CrimsonWings Plasma Biologics Ltd
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={3}
            initial="hidden"
            animate="visible"
            className="text-base text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Building West Africa's first indigenous plasma fractionation facility to deliver life-saving therapeutics — immunoglobulins, albumin, clotting factors — to millions across the continent.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={4}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              onClick={() => { const a = document.createElement('a'); a.href = '/investment-teaser-v2.pdf'; a.download = 'CrimsonWings_Investor_Teaser.pdf'; a.click(); }}
              className="btn-primary flex items-center justify-center gap-2.5 text-base px-8 py-4"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(217,4,41,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Download size={18} />
              Download Investor Teaser
            </motion.button>
            <motion.button
              onClick={() => scrollTo('overview')}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white/80 hover:text-white hover:border-white/40 transition-all text-base font-medium"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Learn More <ArrowRight size={16} />
            </motion.button>
          </motion.div>

          {/* Scroll cue */}
          <motion.button
            onClick={() => scrollTo('overview')}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={28} />
          </motion.button>
        </motion.div>
      </section>

      {/* ── OVERVIEW ─────────────────────────── */}
      <AnimSection id="overview" className="py-28 bg-pearl">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-20">
            <span className="section-tag">Company Overview</span>
            <h2 className="section-title mt-4">
              Africa's <span className="text-gradient">Plasma Revolution</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={stagger} className="space-y-6">
              {[
                <><strong className="text-crimson">CrimsonWings Plasma Biologics Ltd</strong>, a subsidiary of CrimsonWings Blood Logistics Ltd, is pioneering West Africa's first Plasma Fractionation Plant to manufacture life-saving plasma-derived therapeutics.</>,
                <>Our state-of-the-art facility will produce essential medications including immunoglobulins, albumin, and clotting factors, addressing the critical shortage of these therapies across Africa.</>,
                <>By establishing local manufacturing capabilities, we're reducing Africa's dependence on imported plasma products while creating a sustainable, ethical supply chain that benefits patients, healthcare systems, and communities.</>
              ].map((text, i) => (
                <motion.p key={i} variants={fadeUp} custom={i} className="text-base text-slate-600 leading-relaxed">
                  {text}
                </motion.p>
              ))}

              <motion.div variants={stagger} className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-100">
                <StatCard value="1st" label="Indigenous Plant in West Africa" color="text-crimson" delay={0} />
                <StatCard value="8+" label="Life-Saving Products" color="text-ocean" delay={1} />
                <StatCard value="300M" label="People Served Across Africa" color="text-crimson" delay={2} />
              </motion.div>
            </motion.div>

            <motion.div variants={scaleIn} custom={0} className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-crimson/10 to-ocean/10 rounded-3xl blur-xl" />
              <GlassCard className="relative overflow-hidden p-3" hover={false}>
                <img
                  src="/fractionation-tech.png"
                  alt="Advanced Plasma Fractionation Technology"
                  className="w-full rounded-xl object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="backdrop-blur-md bg-white/80 rounded-xl px-4 py-3 shadow-glass">
                    <p className="text-xs font-semibold text-slate-700 text-center">Advanced Plasma Fractionation Technology</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </AnimSection>

      {/* ── VISION ───────────────────────────── */}
      <AnimSection id="vision" className="py-28 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_100%,rgba(217,4,41,0.12),transparent)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="section-tag-dark">Our Vision</span>
            <h2 className="section-title text-white mt-4">
              Built to <span className="bg-gradient-to-r from-crimson to-amber-400 bg-clip-text text-transparent">Transform</span> Africa
            </h2>
          </motion.div>

          <motion.div variants={scaleIn} custom={0}>
            <GlassCard className="bg-white/5 border-white/10 p-8 md:p-12 mb-12" hover={false}>
              <p className="text-xl text-white/90 leading-relaxed mb-5 font-light font-display italic">
                "To build Africa's first fully indigenous plasma therapeutics powerhouse, ensuring access to affordable, high-quality plasma-derived medicines while creating a sustainable ecosystem that empowers local healthcare systems."
              </p>
              <p className="text-base text-white/60 leading-relaxed">
                We envision a future where African patients no longer face critical shortages of immunoglobulins, albumin, and clotting factors. Through innovation, ethical practices, and world-class manufacturing, we're transforming healthcare delivery across the continent.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div variants={stagger} className="grid md:grid-cols-3 gap-6">
            {visionPillars.map((pillar, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i}
                className={`relative bg-white/5 border ${pillar.border} backdrop-blur-sm rounded-2xl p-7 group`}
                whileHover={{ y: -8, backgroundColor: 'rgba(255,255,255,0.08)' }}
                transition={{ duration: 0.3 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pillar.accent} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <pillar.icon size={22} className="text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-white mb-3">{pillar.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{pillar.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimSection>

      {/* ── GALLERY ──────────────────────────── */}
      <AnimSection id="gallery" className="py-28 bg-pearl">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-20">
            <span className="section-tag">Project Gallery</span>
            <h2 className="section-title mt-4">
              The <span className="text-gradient">Facility & Operations</span>
            </h2>
          </motion.div>

          <motion.div variants={stagger} className="grid md:grid-cols-2 gap-6 mb-10">
            {[
              {
                src: '/plant-interior.jpg',
                title: 'Inside Our Plasma Fractionation Plant',
                desc: 'State-of-the-art facility with advanced purification and quality control systems'
              },
              {
                src: '/logistics-flow.jpg',
                title: 'From Collection to Delivery',
                desc: 'CrimsonWings Blood Logistics Chain: drones, vans, and bikes ensuring timely delivery'
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i}
                className="group relative overflow-hidden rounded-2xl shadow-xl aspect-[4/3]"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <img src={item.src} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 p-6"
                  initial={{ y: 10, opacity: 0.7 }}
                  whileHover={{ y: 0, opacity: 1 }}
                >
                  <h3 className="text-white font-display font-bold text-xl mb-1">{item.title}</h3>
                  <p className="text-white/75 text-sm">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Standards bar */}
          <motion.div
            variants={scaleIn}
            custom={2}
            className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: 'GMP', label: 'Certified Manufacturing', color: 'text-ocean' },
                { value: '24/7', label: 'Cold Chain Monitoring', color: 'text-crimson' },
                { value: 'ISO', label: 'Quality Compliance', color: 'text-ocean' },
                { value: 'WHO', label: 'Prequalified Standards', color: 'text-amber-400' },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`text-3xl font-display font-bold ${s.color} mb-2`}>{s.value}</div>
                  <div className="text-xs text-slate-400 font-medium">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </AnimSection>

      {/* ── TEAM ─────────────────────────────── */}
      <AnimSection id="team" className="py-28 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-6">
            <span className="section-tag">Leadership</span>
            <h2 className="section-title mt-4">
              Our <span className="text-gradient">World-Class</span> Team
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} custom={1} className="text-center text-slate-500 mb-16 max-w-xl mx-auto">
            A distinguished team of experts driving Africa's plasma therapeutics revolution
          </motion.p>

          <motion.div variants={stagger} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                custom={i}
                className="group bg-white rounded-2xl overflow-hidden shadow-card border border-slate-100"
                whileHover={{ y: -8, boxShadow: '0 24px 48px -12px rgba(0,0,0,0.15)' }}
                transition={{ duration: 0.35 }}
              >
                {/* Header gradient */}
                <div className="h-24 bg-gradient-to-br from-slate-800 to-slate-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,4,41,0.4),transparent)]" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-crimson/30 to-ocean/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                </div>

                <div className="px-5 pb-6 -mt-12">
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-20 h-20 rounded-full mx-auto object-cover ring-4 ring-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-crimson text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider">
                      {member.title}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-base text-center text-slate-900 mb-3 mt-2">{member.name}</h3>
                  <p className="text-xs text-slate-500 text-center leading-relaxed">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} custom={5} className="mt-16">
            <GlassCard className="max-w-4xl mx-auto p-8 text-center" hover={false}>
              <p className="text-base text-slate-700 leading-relaxed mb-4">
                Beyond our core leadership team, we're supported by a distinguished advisory board comprising CEOs and Managing Directors of top-tier private hospitals, representatives from the Lagos State Blood Transfusion Service (LSBTS) and the Lagos Ministry of Health (LMoH), as well as drone technology partners from Aerial-Robotix.
              </p>
              <p className="text-base font-semibold text-slate-800 leading-relaxed">
                Together, we combine science, strategy, and scalability — backed by leaders across healthcare, policy, and innovation.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </AnimSection>

      {/* ── CONTACT ──────────────────────────── */}
      <AnimSection id="contact" className="py-28 bg-pearl">
        <div className="container mx-auto px-6 max-w-7xl">
          <motion.div variants={fadeUp} custom={0} className="text-center mb-6">
            <span className="section-tag">Get In Touch</span>
            <h2 className="section-title mt-4">
              Ready to <span className="text-gradient">Invest</span> in Africa's Future?
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} custom={1} className="text-center text-slate-500 mb-16">
            Interested in investing or partnering? We'd love to hear from you.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Info */}
            <motion.div variants={stagger} className="space-y-8">
              <motion.h3 variants={fadeUp} className="font-display font-bold text-2xl text-slate-900">Contact Information</motion.h3>

              {[
                {
                  icon: Mail,
                  label: 'General Inquiries',
                  email: 'infodeskcwpbl@crimsonwingsbiologics.com',
                  color: 'text-ocean',
                  bg: 'bg-ocean/10'
                },
                {
                  icon: Mail,
                  label: 'Investor Relations',
                  email: 'investorrelations@crimsonwingsbiologics.com',
                  color: 'text-crimson',
                  bg: 'bg-crimson/10'
                }
              ].map((contact, i) => (
                <motion.div key={i} variants={fadeUp} custom={i + 1} className="flex items-start gap-4">
                  <div className={`w-11 h-11 ${contact.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <contact.icon className={contact.color} size={18} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{contact.label}</p>
                    <a href={`mailto:${contact.email}`} className={`${contact.color} hover:underline text-sm break-all`}>
                      {contact.email}
                    </a>
                  </div>
                </motion.div>
              ))}

              <motion.div variants={fadeUp} custom={3} className="pt-6 border-t border-slate-100">
                <motion.a
                  href="https://crimsonwings-logistics.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-crimson transition-colors"
                  whileHover={{ x: 4 }}
                >
                  Visit CrimsonWings Logistics
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
                <p className="text-xs text-slate-400 mt-1">Our parent company</p>
              </motion.div>
            </motion.div>

            {/* Form */}
            <motion.div variants={scaleIn} custom={0}>
              {state.succeeded ? (
                <GlassCard className="p-10 text-center" hover={false}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <span className="text-3xl">✅</span>
                  </motion.div>
                  <h3 className="font-display font-bold text-2xl text-slate-900 mb-2">Thank You!</h3>
                  <p className="text-slate-600 text-sm">Your message has been sent. We'll be in touch soon!</p>
                </GlassCard>
              ) : (
                <GlassCard className="p-7" hover={false}>
                  <form onSubmit={handleFormspreeSubmit} className="space-y-5">
                    {[
                      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
                      { id: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
                    ].map(field => (
                      <div key={field.id}>
                        <label htmlFor={field.id} className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">{field.label}</label>
                        <input
                          id={field.id}
                          type={field.type}
                          name={field.id}
                          required
                          placeholder={field.placeholder}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:ring-2 focus:ring-crimson/30 focus:border-crimson outline-none text-sm transition-all"
                        />
                        <ValidationError prefix={field.label} field={field.id} errors={state.errors} className="text-crimson text-xs mt-1" />
                      </div>
                    ))}
                    <div>
                      <label htmlFor="message" className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows="4"
                        placeholder="Tell us about your interest..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 focus:ring-2 focus:ring-crimson/30 focus:border-crimson outline-none text-sm transition-all resize-none"
                      />
                      <ValidationError prefix="Message" field="message" errors={state.errors} className="text-crimson text-xs mt-1" />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={state.submitting}
                      className="btn-primary w-full flex items-center justify-center gap-2.5 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={!state.submitting ? { scale: 1.02 } : {}}
                      whileTap={!state.submitting ? { scale: 0.97 } : {}}
                    >
                      <Send size={16} />
                      {state.submitting ? 'Sending...' : 'Send Message'}
                    </motion.button>
                  </form>
                </GlassCard>
              )}
            </motion.div>
          </div>
        </div>
      </AnimSection>

      {/* ── FOOTER ───────────────────────────── */}
      <footer className="bg-slate-950 text-white py-14">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <img src="/logo-crimson.png" alt="CrimsonWings" className="w-12 h-12 object-contain" />
              <div>
                <div className="font-display font-bold text-xl bg-gradient-to-r from-crimson to-amber-400 bg-clip-text text-transparent">CrimsonWings</div>
                <div className="text-[10px] text-slate-400 tracking-widest uppercase">Plasma Biologics Ltd</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-xs text-slate-400 hover:text-white transition-colors tracking-wide uppercase font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="text-right text-xs text-slate-500 leading-relaxed">
              <p className="text-slate-300 font-medium mb-0.5">Pioneering Africa's Independence</p>
              <p>in Plasma Medicine</p>
              <p className="mt-1">A subsidiary of CrimsonWings Blood Logistics Ltd</p>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-10 pt-6 text-center text-xs text-slate-600">
            © 2025 CrimsonWings Plasma Biologics Ltd. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
