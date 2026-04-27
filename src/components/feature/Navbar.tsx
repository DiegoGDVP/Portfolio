import { useState, useEffect } from 'react';
import { useThemeContext } from '../../hooks/useThemeContext';

const navItems = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Estudios', href: '#estudios' },
  { label: 'Habilidades', href: '#habilidades' },
  { label: 'Certificados', href: '#certificados' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const { theme, toggleTheme } = useThemeContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((item) => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileOpen(false);
  };

  const isLight = theme === 'light';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isLight
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200'
            : 'bg-dark-900/95 backdrop-blur-md border-b border-dark-600'
          : 'bg-transparent'
      }`}
    >
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="https://public.readdy.ai/ai/img_res/daea7e95-33c5-4276-9cd3-9589a99e9c75.png"
              alt="Logo Portfolio"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <span className={`font-bold text-lg md:text-xl tracking-tight hidden sm:block ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Diego Galindo
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-accent-green bg-accent-green/10'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-text-secondary hover:text-white hover:bg-dark-600'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Cambiar tema"
              className={`ml-2 w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer ${
                isLight
                  ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  : 'text-text-secondary hover:bg-dark-600 hover:text-white'
              }`}
            >
              <i className={`text-lg ${isLight ? 'ri-moon-line' : 'ri-sun-line'}`} />
            </button>
          </div>

          {/* Mobile right: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={toggleTheme}
              aria-label="Cambiar tema"
              className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all cursor-pointer ${
                isLight ? 'text-slate-600' : 'text-text-secondary'
              }`}
            >
              <i className={`text-xl ${isLight ? 'ri-moon-line' : 'ri-sun-line'}`} />
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`w-10 h-10 flex items-center justify-center cursor-pointer ${isLight ? 'text-slate-900' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-2xl`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`md:hidden backdrop-blur-md border-t ${isLight ? 'bg-white/98 border-slate-200' : 'bg-dark-900/98 border-dark-600'}`}>
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-accent-green bg-accent-green/10'
                    : isLight
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    : 'text-text-secondary hover:text-white hover:bg-dark-600'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}