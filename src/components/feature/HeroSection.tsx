import { useEffect, useRef } from 'react';
import { useThemeContext } from '../../hooks/useThemeContext';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useThemeContext();
  const isLight = theme === 'light';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number; y: number; speed: number;
      char: string; opacity: number; size: number;
    }> = [];

    const chars = '01';
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createParticles = () => {
      particles = [];
      const count = Math.floor(canvas.width / 20);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: i * 20 + Math.random() * 10,
          y: Math.random() * canvas.height,
          speed: 0.5 + Math.random() * 1.5,
          char: chars[Math.floor(Math.random() * chars.length)],
          opacity: 0.08 + Math.random() * 0.2,
          size: 10 + Math.random() * 6,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.font = `${p.size}px 'Fira Code', monospace`;
        ctx.fillStyle = `rgba(34, 197, 94, ${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);
        p.y += p.speed;
        if (p.y > canvas.height) {
          p.y = -20;
          p.char = chars[Math.floor(Math.random() * chars.length)];
        }
      });
      animationId = requestAnimationFrame(animate);
    };

    resize();
    createParticles();
    animate();

    const onResize = () => { resize(); createParticles(); };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const target = document.querySelector(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="inicio"
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${isLight ? 'bg-slate-50' : 'bg-dark-900'}`}
    >
      {/* Matrix rain */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: isLight ? 0.15 : 0.4 }} />

      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${isLight ? 'bg-gradient-to-b from-slate-50/60 via-slate-50/40 to-slate-50' : 'bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900'}`} />

      {/* Content */}
      <div className="relative z-10 w-full px-4 md:px-8 lg:px-12 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/10 border border-accent-green/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-accent-green text-sm font-medium font-mono">
              Disponible para proyectos
            </span>
          </div>

          {/* Main title */}
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Diego Galindo
            <br />
            <span className="text-accent-green">Pentester</span>{' '}
            <span className={isLight ? 'text-slate-500' : 'text-text-secondary'}>&</span>{' '}
            <span className="text-accent-green-light">Ethical Hacker</span>
          </h1>

          {/* Subtitle */}
          <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${isLight ? 'text-slate-600' : 'text-text-secondary'}`}>
            Especialista en ciberseguridad ofensiva, hacking ético y desarrollo de software.
            Apasionado por identificar vulnerabilidades y construir sistemas más seguros.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => handleScrollTo('#proyectos')}
              className="w-full sm:w-auto px-8 py-4 bg-accent-green text-dark-900 font-semibold rounded-lg hover:bg-accent-green-light transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
            >
              <i className="ri-folder-open-line" />
              Ver Proyectos
            </button>
            <button
              onClick={() => handleScrollTo('#contacto')}
              className={`w-full sm:w-auto px-8 py-4 border-2 font-semibold rounded-lg transition-all duration-300 cursor-pointer whitespace-nowrap flex items-center justify-center gap-2 ${
                isLight
                  ? 'border-slate-300 text-slate-700 hover:border-accent-green hover:text-accent-green'
                  : 'border-dark-500 text-white hover:border-accent-green hover:text-accent-green'
              }`}
            >
              <i className="ri-mail-line" />
              Contactar
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-16 max-w-lg mx-auto">
            {[
              { value: '3', label: 'Titulaciones' },
              { value: '2', label: 'Proyectos' },
              { value: '2', label: 'Certificados' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent-green font-mono">{stat.value}</div>
                <div className={`text-xs md:text-sm mt-1 ${isLight ? 'text-slate-500' : 'text-text-muted'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className={`text-xs font-mono ${isLight ? 'text-slate-400' : 'text-text-muted'}`}>Scroll</span>
        <div className={`w-5 h-8 border-2 rounded-full flex justify-center pt-1 ${isLight ? 'border-slate-300' : 'border-dark-500'}`}>
          <div className="w-1 h-2 bg-accent-green rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}