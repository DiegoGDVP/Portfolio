import { useState, useEffect, useRef, useCallback, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
export const studiesData = [
  {
    id: 1,
    year: '2024 - 2025',
    degree: 'Máster en Dirección de Ciberseguridad, Seguridad Ofensiva y Hacking Ético',
    institution: 'Formación Superior Especializada',
    description: 'Especialización avanzada en dirección estratégica de ciberseguridad, técnicas de seguridad ofensiva, hacking ético y gestión de incidentes. Proyecto final: análisis y planificación de la ciberseguridad de un aeropuerto comprometido.',
  },
  {
    id: 2,
    year: '2022 - 2024',
    degree: 'Grado Superior en Desarrollo de Aplicaciones Multiplataforma',
    institution: 'Formación Profesional',
    description: 'Formación en desarrollo de software multiplataforma, bases de datos, programación orientada a objetos y desarrollo de aplicaciones. Proyecto final: desarrollo de un videojuego 2D completo.',
  },
  {
    id: 3,
    year: '2020 - 2022',
    degree: 'Grado Medio en Sistemas Microinformáticos y Redes',
    institution: 'Formación Profesional',
    description: 'Fundamentos de redes, administración de sistemas, mantenimiento de equipos informáticos y configuración de infraestructuras de red.',
  },
];

export const skillsData = [
  { id: 1, category: 'Hacking Ético & Pentesting', icon: 'ri-shield-keyhole-line', technologies: ['Kali Linux', 'Metasploit', 'Burp Suite', 'Nmap', 'Wireshark'] },
  { id: 2, category: 'Análisis & Monitorización', icon: 'ri-bar-chart-line', technologies: ['Splunk', 'SIEM', 'Log Analysis', 'Threat Hunting', 'IDS/IPS'] },
  { id: 3, category: 'Bases de Datos', icon: 'ri-database-2-line', technologies: ['MySQL', 'SQL', 'Gestión de BBDD', 'Consultas avanzadas', 'Modelado de datos'] },
  { id: 4, category: 'Desarrollo de Software', icon: 'ri-code-s-slash-line', technologies: ['Java', 'Python', 'Desarrollo 2D', 'POO', 'Multiplataforma'] },
  { id: 5, category: 'Redes & Sistemas', icon: 'ri-router-line', technologies: ['TCP/IP', 'Configuración de redes', 'Administración de sistemas', 'Linux', 'Windows Server'] },
  { id: 6, category: 'Seguridad Defensiva', icon: 'ri-lock-password-line', technologies: ['Análisis forense', 'Respuesta a incidentes', 'Hardening', 'Normativa ISO 27001', 'OSINT'] },
];

export const certificatesData = [
  { id: 1, name: 'IT Specialist - Network Security', institution: 'Certiport', date: '2025', logo: 'ri-shield-check-line' },
  { id: 2, name: 'Leadership', institution: 'Harvard Business Impact', date: '2025', logo: 'ri-award-line' },
];

export const projectsData = [
  {
    id: 1,
    name: 'TFM - Plan de Ciberseguridad Aeroportuaria',
    category: 'Ciberseguridad',
    description: 'Análisis forense de un aeropuerto comprometido: identificación de vectores de ataque, evaluación del impacto en sistemas OT/IT y propuesta de plan integral de ciberseguridad con hardening, segmentación de redes e ISO 27001.',
    stack: ['Análisis Forense', 'Splunk', 'Gestión de Riesgos', 'ISO 27001'],
    image: 'https://readdy.ai/api/search-image?query=Dark%20airport%20cybersecurity%20control%20room%20with%20green%20network%20monitoring%20screens%20showing%20security%20dashboards%20and%20threat%20maps%20on%20black%20background%20minimalist%20professional%20design&width=600&height=400&seq=11&orientation=landscape',
  },
  {
    id: 2,
    name: 'TFG - Videojuego 2D',
    category: 'Desarrollo',
    description: 'Trabajo Fin de Grado Superior: desarrollo completo de un videojuego 2D desde cero. Diseño de mecánicas, programación de la lógica del juego, gestión de assets, colisiones, niveles y sistema de puntuación.',
    stack: ['Java', 'MySQL', 'POO', 'Diseño de niveles'],
    image: 'https://readdy.ai/api/search-image?query=Dark%20minimalist%202D%20game%20development%20interface%20with%20green%20pixel%20art%20elements%20and%20code%20editor%20on%20black%20background%20professional%20software%20development%20scene&width=600&height=400&seq=12&orientation=landscape',
  },
];

/* ─────────────────────────────────────────────
   THEME
───────────────────────────────────────────── */
export type Theme = 'dark' | 'light';

interface ThemeCtx { theme: Theme; toggleTheme: () => void; }
const ThemeContext = createContext<ThemeCtx>({ theme: 'dark', toggleTheme: () => {} });
export const useThemeCtx = () => useContext(ThemeContext);

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark'); root.classList.remove('light');
      document.body.style.backgroundColor = '#0D0D0D';
      document.body.style.color = '#FFFFFF';
    } else {
      root.classList.remove('dark'); root.classList.add('light');
      document.body.style.backgroundColor = '#F8FAFC';
      document.body.style.color = '#0F172A';
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = useCallback(() => setTheme(p => p === 'dark' ? 'light' : 'dark'), []);
  return { theme, toggleTheme };
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

/* ─────────────────────────────────────────────
   SCROLL ANIMATION
───────────────────────────────────────────── */
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); obs.unobserve(el); }
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, isVisible };
}

export function AnimatedSection({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(2rem)',
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Estudios', href: '#estudios' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Certificados', href: '#certificados' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const { theme, toggleTheme } = useThemeCtx();
  const isLight = theme === 'light';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map(i => i.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const navBg = scrolled
    ? isLight ? 'rgba(255,255,255,0.95)' : 'rgba(13,13,13,0.95)'
    : 'transparent';
  const navBorder = scrolled
    ? isLight ? '1px solid #E2E8F0' : '1px solid #262626'
    : '1px solid transparent';

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: navBg, borderBottom: navBorder,
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ width: '100%', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
          <a href="#inicio" onClick={e => handleNavClick(e, '#inicio')} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', textDecoration: 'none' }}>
            <img src="https://public.readdy.ai/ai/img_res/daea7e95-33c5-4276-9cd3-9589a99e9c75.png" alt="Logo" style={{ width: 44, height: 44, objectFit: 'contain' }} />
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: isLight ? '#0F172A' : '#FFFFFF', letterSpacing: '-0.02em' }}>Diego Galindo</span>
          </a>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="hidden-mobile">
            {navItems.map(item => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <a key={item.href} href={item.href} onClick={e => handleNavClick(e, item.href)} style={{
                  padding: '8px 16px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 500,
                  textDecoration: 'none', whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 0.2s',
                  color: isActive ? '#22C55E' : isLight ? '#475569' : '#A3A3A3',
                  background: isActive ? 'rgba(34,197,94,0.1)' : 'transparent',
                }}>
                  {item.label}
                </a>
              );
            })}
            <button onClick={toggleTheme} aria-label="Cambiar tema" style={{
              marginLeft: '8px', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer',
              color: isLight ? '#475569' : '#A3A3A3', fontSize: '1.1rem', transition: 'all 0.2s',
            }}>
              <i className={isLight ? 'ri-moon-line' : 'ri-sun-line'} />
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="show-mobile">
            <button onClick={toggleTheme} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', color: isLight ? '#475569' : '#A3A3A3', fontSize: '1.2rem' }}>
              <i className={isLight ? 'ri-moon-line' : 'ri-sun-line'} />
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer', color: isLight ? '#0F172A' : '#FFFFFF', fontSize: '1.4rem' }}>
              <i className={mobileOpen ? 'ri-close-line' : 'ri-menu-line'} />
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ background: isLight ? 'rgba(255,255,255,0.98)' : 'rgba(13,13,13,0.98)', borderTop: isLight ? '1px solid #E2E8F0' : '1px solid #262626', backdropFilter: 'blur(12px)', padding: '12px 16px' }}>
          {navItems.map(item => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a key={item.href} href={item.href} onClick={e => handleNavClick(e, item.href)} style={{
                display: 'block', padding: '12px 16px', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 500,
                textDecoration: 'none', cursor: 'pointer', marginBottom: '4px', transition: 'all 0.2s',
                color: isActive ? '#22C55E' : isLight ? '#475569' : '#A3A3A3',
                background: isActive ? 'rgba(34,197,94,0.1)' : 'transparent',
              }}>
                {item.label}
              </a>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────────── */
export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useThemeCtx();
  const isLight = theme === 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let particles: { x: number; y: number; speed: number; char: string; opacity: number; size: number }[] = [];
    const chars = '01';
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    const createParticles = () => {
      particles = [];
      const count = Math.floor(canvas.width / 20);
      for (let i = 0; i < count; i++) {
        particles.push({ x: i * 20 + Math.random() * 10, y: Math.random() * canvas.height, speed: 0.5 + Math.random() * 1.5, char: chars[Math.floor(Math.random() * chars.length)], opacity: 0.08 + Math.random() * 0.2, size: 10 + Math.random() * 6 });
      }
    };
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.font = `${p.size}px 'Fira Code', monospace`;
        ctx.fillStyle = `rgba(34,197,94,${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);
        p.y += p.speed;
        if (p.y > canvas.height) { p.y = -20; p.char = chars[Math.floor(Math.random() * chars.length)]; }
      });
      animId = requestAnimationFrame(animate);
    };
    resize(); createParticles(); animate();
    const onResize = () => { resize(); createParticles(); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  const scrollTo = (id: string) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <section id="inicio" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: isLight ? '#F8FAFC' : '#0D0D0D' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: isLight ? 0.15 : 0.4 }} />
      <div style={{ position: 'absolute', inset: 0, background: isLight ? 'linear-gradient(to bottom, rgba(248,250,252,0.6), rgba(248,250,252,0.4), rgba(248,250,252,1))' : 'linear-gradient(to bottom, rgba(13,13,13,0.6), rgba(13,13,13,0.4), rgba(13,13,13,1))' }} />

      <div style={{ position: 'relative', zIndex: 10, width: '100%', padding: '80px 2rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '9999px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', marginBottom: '2rem' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} className="animate-pulse" />
            <span style={{ color: '#22C55E', fontSize: '0.875rem', fontWeight: 500, fontFamily: "'Fira Code', monospace" }}>Disponible para proyectos</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', color: isLight ? '#0F172A' : '#FFFFFF' }}>
            Diego Galindo<br />
            <span style={{ color: '#22C55E' }}>Pentester</span>{' '}
            <span style={{ color: isLight ? '#94A3B8' : '#A3A3A3' }}>&amp;</span>{' '}
            <span style={{ color: '#4ADE80' }}>Ethical Hacker</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: isLight ? '#475569' : '#A3A3A3', maxWidth: '36rem', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Especialista en ciberseguridad ofensiva, hacking ético y desarrollo de software. Apasionado por identificar vulnerabilidades y construir sistemas más seguros.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            <button onClick={() => scrollTo('#proyectos')} style={{ padding: '14px 32px', background: '#22C55E', color: '#0D0D0D', fontWeight: 600, borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', fontSize: '0.95rem', transition: 'all 0.3s' }}>
              <i className="ri-folder-open-line" /> Ver Proyectos
            </button>
            <button onClick={() => scrollTo('#contacto')} style={{ padding: '14px 32px', background: 'transparent', color: isLight ? '#334155' : '#FFFFFF', fontWeight: 600, borderRadius: '8px', border: isLight ? '2px solid #CBD5E1' : '2px solid #404040', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', fontSize: '0.95rem', transition: 'all 0.3s' }}>
              <i className="ri-mail-line" /> Contactar
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginTop: '4rem', maxWidth: '28rem', marginLeft: 'auto', marginRight: 'auto' }}>
            {[{ value: '3', label: 'Titulaciones' }, { value: '2', label: 'Proyectos' }, { value: '2', label: 'Certificados' }].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: '#22C55E', fontFamily: "'Fira Code', monospace" }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: isLight ? '#94A3B8' : '#737373', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '0.75rem', fontFamily: "'Fira Code', monospace", color: isLight ? '#94A3B8' : '#737373' }}>Scroll</span>
        <div style={{ width: 20, height: 32, border: isLight ? '2px solid #CBD5E1' : '2px solid #404040', borderRadius: '9999px', display: 'flex', justifyContent: 'center', paddingTop: '4px' }}>
          <div style={{ width: 4, height: 8, background: '#22C55E', borderRadius: '9999px' }} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STUDIES SECTION
───────────────────────────────────────────── */
export function StudiesSection() {
  const { theme } = useThemeCtx();
  const isLight = theme === 'light';
  const bg = isLight ? '#F8FAFC' : '#0D0D0D';
  const cardBg = isLight ? '#FFFFFF' : '#141414';
  const cardBorder = isLight ? '#E2E8F0' : '#262626';
  const textPrimary = isLight ? '#0F172A' : '#FFFFFF';
  const textSecondary = isLight ? '#64748B' : '#A3A3A3';
  const textMuted = isLight ? '#94A3B8' : '#737373';
  const lineBg = isLight ? '#E2E8F0' : '#262626';

  return (
    <section id="estudios" style={{ padding: '5rem 0', background: bg }}>
      <div style={{ width: '100%', padding: '0 2rem' }}>
        <AnimatedSection style={{ maxWidth: '72rem', margin: '0 auto 4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '8px', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="ri-graduation-cap-line" style={{ color: '#22C55E', fontSize: '1.25rem' }} />
            </div>
            <span style={{ color: '#22C55E', fontFamily: "'Fira Code', monospace", fontSize: '0.875rem' }}>02. Formación</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: textPrimary }}>
            Estudios <span style={{ color: '#22C55E' }}>&amp;</span> Educación
          </h2>
          <p style={{ marginTop: '1rem', maxWidth: '36rem', color: textSecondary }}>
            Formación académica sólida en ingeniería informática y ciberseguridad, complementada con certificaciones profesionales.
          </p>
        </AnimatedSection>

        <div style={{ maxWidth: '56rem', margin: '0 auto', position: 'relative' }}>
          <div style={{ position: 'absolute', left: '1rem', top: 0, bottom: 0, width: 1, background: lineBg }} />

          {studiesData.map((study, index) => (
            <AnimatedSection key={study.id} delay={index * 150} style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ position: 'absolute', left: '1rem', width: 12, height: 12, borderRadius: '50%', background: '#22C55E', border: isLight ? '4px solid #F8FAFC' : '4px solid #0D0D0D', transform: 'translate(-50%, 8px)', zIndex: 1 }} />
              <div style={{ marginLeft: '2.5rem', flex: 1 }}>
                <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '12px', padding: '1.5rem', transition: 'border-color 0.3s' }}>
                  <span style={{ fontFamily: "'Fira Code', monospace", fontSize: '0.875rem', fontWeight: 600, color: '#22C55E', display: 'block', marginBottom: '0.5rem' }}>{study.year}</span>
                  <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: textPrimary, marginBottom: '0.25rem' }}>{study.degree}</h3>
                  <p style={{ color: '#4ADE80', fontWeight: 500, fontSize: '0.875rem', marginBottom: '0.75rem' }}>{study.institution}</p>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: textMuted }}>{study.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   SKILLS SECTION
───────────────────────────────────────────── */
export function SkillsSection() {
  const { theme } = useThemeCtx();
  const isLight = theme === 'light';
  const bg = isLight ? '#FFFFFF' : '#141414';
  const cardBg = isLight ? '#F8FAFC' : '#1A1A1A';
  const cardBorder = isLight ? '#E2E8F0' : '#262626';
  const textPrimary = isLight ? '#0F172A' : '#FFFFFF';
  const textSecondary = isLight ? '#64748B' : '#A3A3A3';
  const tagBg = isLight ? '#E2E8F0' : '#262626';
  const tagColor = isLight ? '#475569' : '#A3A3A3';

  return (
    <section id="habilidades" style={{ padding: '5rem 0', background: bg }}>
      <div style={{ width: '100%', padding: '0 2rem' }}>
        <AnimatedSection style={{ maxWidth: '72rem', margin: '0 auto 4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '8px', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="ri-tools-line" style={{ color: '#22C55E', fontSize: '1.25rem' }} />
            </div>
            <span style={{ color: '#22C55E', fontFamily: "'Fira Code', monospace", fontSize: '0.875rem' }}>03. Competencias</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: textPrimary }}>
            Habilidades <span style={{ color: '#22C55E' }}>Técnicas</span>
          </h2>
          <p style={{ marginTop: '1rem', maxWidth: '36rem', color: textSecondary }}>
            Stack tecnológico versátil que abarca desarrollo full-stack, seguridad ofensiva y operaciones cloud.
          </p>
        </AnimatedSection>

        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {skillsData.map((skill, index) => (
            <AnimatedSection key={skill.id} delay={index * 100}>
              <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '12px', padding: '1.5rem', height: '100%', transition: 'all 0.3s' }}>
                <div style={{ width: 48, height: 48, borderRadius: '8px', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <i className={skill.icon} style={{ color: '#22C55E', fontSize: '1.25rem' }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: textPrimary, marginBottom: '0.75rem' }}>{skill.category}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {skill.technologies.map(tech => (
                    <span key={tech} style={{ padding: '4px 10px', background: tagBg, color: tagColor, borderRadius: '6px', fontSize: '0.75rem', fontFamily: "'Fira Code', monospace" }}>{tech}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CERTIFICATES SECTION
───────────────────────────────────────────── */
export function CertificatesSection() {
  const { theme } = useThemeCtx();
  const isLight = theme === 'light';
  const bg = isLight ? '#F8FAFC' : '#0D0D0D';
  const cardBg = isLight ? '#FFFFFF' : '#141414';
  const cardBorder = isLight ? '#E2E8F0' : '#262626';
  const textPrimary = isLight ? '#0F172A' : '#FFFFFF';
  const textSecondary = isLight ? '#64748B' : '#A3A3A3';
  const textMuted = isLight ? '#94A3B8' : '#737373';

  return (
    <section id="certificados" style={{ padding: '5rem 0', background: bg }}>
      <div style={{ width: '100%', padding: '0 2rem' }}>
        <AnimatedSection style={{ maxWidth: '72rem', margin: '0 auto 4rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '8px', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="ri-award-line" style={{ color: '#22C55E', fontSize: '1.25rem' }} />
            </div>
            <span style={{ color: '#22C55E', fontFamily: "'Fira Code', monospace", fontSize: '0.875rem' }}>04. Credenciales</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: textPrimary }}>
            Certificados <span style={{ color: '#22C55E' }}>Profesionales</span>
          </h2>
          <p style={{ marginTop: '1rem', maxWidth: '36rem', color: textSecondary }}>
            Certificaciones reconocidas internacionalmente que validan conocimientos en ciberseguridad, cloud y desarrollo.
          </p>
        </AnimatedSection>

        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {certificatesData.map((cert, index) => (
            <AnimatedSection key={cert.id} delay={index * 100}>
              <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '12px', padding: '1.5rem', position: 'relative', overflow: 'hidden', height: '100%', transition: 'all 0.3s' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, #22C55E, #10B981)' }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '8px', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <i className={cert.logo} style={{ color: '#22C55E', fontSize: '1.25rem' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', background: 'rgba(34,197,94,0.1)', borderRadius: '6px' }}>
                    <i className="ri-shield-check-line" style={{ color: '#22C55E', fontSize: '0.75rem' }} />
                    <span style={{ color: '#22C55E', fontSize: '0.75rem', fontWeight: 500 }}>Verificado</span>
                  </div>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: textPrimary, marginBottom: '0.5rem', lineHeight: 1.3 }}>{cert.name}</h3>
                <p style={{ fontSize: '0.875rem', color: textSecondary, marginBottom: '0.75rem' }}>{cert.institution}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: textMuted }}>
                  <i className="ri-calendar-line" />
                  <span style={{ fontFamily: "'Fira Code', monospace" }}>{cert.date}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS SECTION
───────────────────────────────────────────── */
export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const { theme } = useThemeCtx();
  const isLight = theme === 'light';
  const bg = isLight ? '#FFFFFF' : '#141414';
  const cardBg = isLight ? '#F8FAFC' : '#1A1A1A';
  const cardBorder = isLight ? '#E2E8F0' : '#262626';
  const textPrimary = isLight ? '#0F172A' : '#FFFFFF';
  const textSecondary = isLight ? '#64748B' : '#A3A3A3';
  const tagBg = isLight ? '#E2E8F0' : '#262626';
  const tagColor = isLight ? '#475569' : '#737373';
  const filterBg = isLight ? '#F1F5F9' : '#1A1A1A';
  const filterColor = isLight ? '#475569' : '#A3A3A3';

  const categories = ['Todos', ...Array.from(new Set(projectsData.map(p => p.category)))];
  const filtered = activeFilter === 'Todos' ? projectsData : projectsData.filter(p => p.category === activeFilter);

  return (
    <section id="proyectos" style={{ padding: '5rem 0', background: bg }}>
      <div style={{ width: '100%', padding: '0 2rem' }}>
        <AnimatedSection style={{ maxWidth: '72rem', margin: '0 auto 3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: '8px', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <i className="ri-folder-open-line" style={{ color: '#22C55E', fontSize: '1.25rem' }} />
            </div>
            <span style={{ color: '#22C55E', fontFamily: "'Fira Code', monospace", fontSize: '0.875rem' }}>05. Portfolio</span>
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: textPrimary }}>
            Proyectos <span style={{ color: '#22C55E' }}>Destacados</span>
          </h2>
          <p style={{ marginTop: '1rem', maxWidth: '36rem', color: textSecondary }}>
            Una selección de proyectos que demuestran experiencia en desarrollo de software y ciberseguridad.
          </p>
        </AnimatedSection>

        <AnimatedSection style={{ maxWidth: '72rem', margin: '0 auto 2.5rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} style={{
                padding: '8px 16px', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 500,
                border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                background: activeFilter === cat ? '#22C55E' : filterBg,
                color: activeFilter === cat ? '#0D0D0D' : filterColor,
              }}>
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
          {filtered.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 100}>
              <div style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'all 0.3s' }}>
                <div style={{ position: 'relative', height: '12rem', overflow: 'hidden' }}>
                  <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.5s' }} />
                  <div style={{ position: 'absolute', inset: 0, background: isLight ? 'linear-gradient(to top, rgba(248,250,252,0.8), transparent)' : 'linear-gradient(to top, rgba(26,26,26,0.8), transparent)' }} />
                  <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', padding: '4px 10px', background: '#22C55E', color: '#0D0D0D', fontSize: '0.75rem', fontWeight: 600, borderRadius: '6px' }}>{project.category}</span>
                </div>
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: textPrimary, marginBottom: '0.5rem' }}>{project.name}</h3>
                  <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: textSecondary, marginBottom: '1rem', flex: 1 }}>{project.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {project.stack.map(tech => (
                      <span key={tech} style={{ padding: '3px 8px', background: tagBg, color: tagColor, borderRadius: '4px', fontSize: '0.75rem', fontFamily: "'Fira Code', monospace" }}>{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CONTACT SECTION
───────────────────────────────────────────── */
export function ContactSection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const { theme } = useThemeCtx();
  const isLight = theme === 'light';
  const bg = isLight ? '#F8FAFC' : '#0D0D0D';
  const cardBg = isLight ? '#FFFFFF' : '#141414';
  const cardBorder = isLight ? '#E2E8F0' : '#262626';
  const textPrimary = isLight ? '#0F172A' : '#FFFFFF';
  const textSecondary = isLight ? '#64748B' : '#A3A3A3';
  const textMuted = isLight ? '#94A3B8' : '#737373';
  const inputBg = isLight ? '#F8FAFC' : '#1A1A1A';
  const inputBorder = isLight ? '#E2E8F0' : '#262626';
  const iconBg = isLight ? '#F1F5F9' : '#1A1A1A';
  const socialBg = isLight ? '#F1F5F9' : '#1A1A1A';
  const socialColor = isLight ? '#475569' : '#A3A3A3';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    try {
      const params = new URLSearchParams();
      params.append('name', formData.name);
      params.append('email', formData.email);
      params.append('subject', formData.subject);
      params.append('message', formData.message);
      const res = await fetch('https://readdy.ai/api/form/d7n8dgtnkhlbktri3fdg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
      if (res.ok) { setFormStatus('success'); setFormData({ name: '', email: '', subject: '', message: '' }); }
      else setFormStatus('error');
    } catch { setFormStatus('error'); }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 16px', background: inputBg, border: `1px solid ${inputBorder}`,
    borderRadius: '8px', color: textPrimary, fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.2s',
    fontFamily: 'inherit',
  };

  return (
    <section id="contacto" style={{ padding: '5rem 0', background: bg }}>
      <div style={{ width: '100%', padding: '0 2rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <AnimatedSection style={{ marginBottom: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ width: 48, height: 48, borderRadius: '8px', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="ri-mail-send-line" style={{ color: '#22C55E', fontSize: '1.25rem' }} />
              </div>
              <span style={{ color: '#22C55E', fontFamily: "'Fira Code', monospace", fontSize: '0.875rem' }}>06. Contacto</span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: textPrimary }}>
              ¿Hablamos? <span style={{ color: '#22C55E' }}>Colaboremos</span>
            </h2>
            <p style={{ marginTop: '1rem', maxWidth: '36rem', color: textSecondary }}>
              ¿Tienes un proyecto en mente o quieres discutir oportunidades? Estoy abierto a colaboraciones, freelance y roles permanentes.
            </p>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            <AnimatedSection delay={100}>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: textPrimary, marginBottom: '1.5rem' }}>Información de contacto</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {[
                  { icon: 'ri-mail-line', label: 'Email', value: 'diegogalindolahuerta@gmail.com', href: 'mailto:diegogalindolahuerta@gmail.com' },
                  { icon: 'ri-map-pin-line', label: 'Ubicación', value: 'España', href: null },
                  { icon: 'ri-time-line', label: 'Disponibilidad', value: 'Full-time / Freelance', href: null },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '8px', background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <i className={item.icon} style={{ color: '#22C55E' }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.75rem', color: textMuted }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} style={{ fontSize: '0.875rem', color: textPrimary, textDecoration: 'none' }}>{item.value}</a>
                        : <p style={{ fontSize: '0.875rem', color: textPrimary }}>{item.value}</p>
                      }
                    </div>
                  </div>
                ))}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: textPrimary, marginBottom: '1rem' }}>Redes sociales</h3>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                {[
                  { icon: 'ri-linkedin-fill', label: 'LinkedIn', href: 'https://www.linkedin.com/in/diegogalindodvlp' },
                  { icon: 'ri-github-fill', label: 'GitHub', href: 'https://github.com/wbpingu49' },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{ width: 44, height: 44, borderRadius: '8px', background: socialBg, color: socialColor, display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', fontSize: '1.1rem', transition: 'all 0.3s' }}>
                    <i className={s.icon} />
                  </a>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200} style={{ gridColumn: 'span 2' }}>
              <form id="contacto-portfolio" data-readdy-form onSubmit={handleSubmit} style={{ background: cardBg, border: `1px solid ${cardBorder}`, borderRadius: '12px', padding: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label htmlFor="name" style={{ display: 'block', fontSize: '0.875rem', color: textSecondary, marginBottom: '0.5rem' }}>Nombre</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={inputStyle} placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label htmlFor="email" style={{ display: 'block', fontSize: '0.875rem', color: textSecondary, marginBottom: '0.5rem' }}>Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} placeholder="tu@email.com" />
                  </div>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                  <label htmlFor="subject" style={{ display: 'block', fontSize: '0.875rem', color: textSecondary, marginBottom: '0.5rem' }}>Asunto</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' as const }}>
                    <option value="" disabled>Selecciona un asunto</option>
                    <option value="proyecto">Propuesta de proyecto</option>
                    <option value="empleo">Oportunidad laboral</option>
                    <option value="colaboracion">Colaboración</option>
                    <option value="consulta">Consulta general</option>
                  </select>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label htmlFor="message" style={{ display: 'block', fontSize: '0.875rem', color: textSecondary, marginBottom: '0.5rem' }}>Mensaje</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} required maxLength={500} rows={5} style={{ ...inputStyle, resize: 'none' }} placeholder="Cuéntame sobre tu proyecto o consulta..." />
                  <p style={{ fontSize: '0.75rem', color: textMuted, textAlign: 'right', marginTop: '4px' }}>{formData.message.length}/500</p>
                </div>
                <button type="submit" disabled={formStatus === 'submitting'} style={{ width: '100%', padding: '14px', background: '#22C55E', color: '#0D0D0D', fontWeight: 600, borderRadius: '8px', border: 'none', cursor: formStatus === 'submitting' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.95rem', opacity: formStatus === 'submitting' ? 0.5 : 1, transition: 'all 0.3s', whiteSpace: 'nowrap' }}>
                  {formStatus === 'submitting'
                    ? <><i className="ri-loader-4-line animate-spin" />Enviando...</>
                    : <><i className="ri-send-plane-line" />Enviar mensaje</>
                  }
                </button>
                {formStatus === 'success' && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <i className="ri-checkbox-circle-line" style={{ color: '#22C55E', fontSize: '1.25rem' }} />
                    <p style={{ color: '#22C55E', fontSize: '0.875rem' }}>¡Mensaje enviado correctamente! Te responderé pronto.</p>
                  </div>
                )}
                {formStatus === 'error' && (
                  <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <i className="ri-alert-line" style={{ color: '#F87171', fontSize: '1.25rem' }} />
                    <p style={{ color: '#F87171', fontSize: '0.875rem' }}>Hubo un error al enviar. Por favor, inténtalo de nuevo.</p>
                  </div>
                )}
              </form>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
export function Footer() {
  const { theme } = useThemeCtx();
  const isLight = theme === 'light';
  return (
    <footer style={{ borderTop: isLight ? '1px solid #E2E8F0' : '1px solid #262626', padding: '2rem 0', background: isLight ? '#FFFFFF' : '#0D0D0D' }}>
      <div style={{ width: '100%', padding: '0 2rem' }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="https://public.readdy.ai/ai/img_res/daea7e95-33c5-4276-9cd3-9589a99e9c75.png" alt="Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
            <span style={{ fontSize: '0.875rem', color: isLight ? '#94A3B8' : '#737373' }}>© 2025 Diego Galindo Lahuerta. Todos los derechos reservados.</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Política de Privacidad', 'Términos de Uso'].map(link => (
              <a key={link} href="#" style={{ fontSize: '0.875rem', color: isLight ? '#94A3B8' : '#737373', textDecoration: 'none' }}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
export function Home() {
  const { theme } = useThemeCtx();
  return (
    <div style={{ minHeight: '100vh', background: theme === 'light' ? '#F8FAFC' : '#0D0D0D' }}>
      <Navbar />
      <HeroSection />
      <StudiesSection />
      <SkillsSection />
      <CertificatesSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────
   NOT FOUND
───────────────────────────────────────────── */
export function NotFound() {
  const location = useLocation();
  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: 'center', padding: '0 1rem' }}>
      <h1 style={{ position: 'absolute', bottom: 0, fontSize: 'clamp(6rem, 20vw, 12rem)', fontWeight: 900, color: '#F1F5F9', userSelect: 'none', pointerEvents: 'none', zIndex: 0 }}>404</h1>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginTop: '1.5rem' }}>This page has not been generated</h1>
        <p style={{ marginTop: '0.5rem', color: '#9CA3AF', fontFamily: "'Fira Code', monospace" }}>{location.pathname}</p>
        <p style={{ marginTop: '1rem', fontSize: '1.1rem', color: '#6B7280' }}>Tell me more about this page, so I can generate it</p>
      </div>
    </div>
  );
}
