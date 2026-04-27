import { useThemeContext } from '../../hooks/useThemeContext';

export default function Footer() {
  const { theme } = useThemeContext();
  const isLight = theme === 'light';

  return (
    <footer className={`border-t py-8 ${isLight ? 'bg-white border-slate-200' : 'bg-dark-900 border-dark-600'}`}>
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://public.readdy.ai/ai/img_res/daea7e95-33c5-4276-9cd3-9589a99e9c75.png"
              alt="Logo"
              className="w-8 h-8 object-contain"
            />
            <span className={`text-sm ${isLight ? 'text-slate-500' : 'text-text-muted'}`}>
              © 2025 Diego Galindo Lahuerta. Todos los derechos reservados.
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className={`text-sm hover:text-accent-green transition-colors ${isLight ? 'text-slate-500' : 'text-text-muted'}`}>
              Política de Privacidad
            </a>
            <a href="#" className={`text-sm hover:text-accent-green transition-colors ${isLight ? 'text-slate-500' : 'text-text-muted'}`}>
              Términos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}