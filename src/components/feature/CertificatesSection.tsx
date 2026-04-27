import { certificatesData } from '../../mocks/portfolioData';
import AnimatedSection from '../base/AnimatedSection';
import { useThemeContext } from '../../hooks/useThemeContext';

export default function CertificatesSection() {
  const { theme } = useThemeContext();
  const isLight = theme === 'light';

  return (
    <section id="certificados" className={`py-20 md:py-28 ${isLight ? 'bg-slate-50' : 'bg-dark-900'}`}>
      <div className="w-full px-4 md:px-8 lg:px-12">
        <AnimatedSection className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center">
              <i className="ri-award-line text-accent-green text-xl" />
            </div>
            <span className="text-accent-green font-mono text-sm">04. Credenciales</span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Certificados <span className="text-accent-green">Profesionales</span>
          </h2>
          <p className={`mt-4 max-w-xl ${isLight ? 'text-slate-500' : 'text-text-secondary'}`}>
            Certificaciones reconocidas internacionalmente que validan conocimientos en ciberseguridad, cloud y desarrollo.
          </p>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certificatesData.map((cert, index) => (
            <AnimatedSection key={cert.id} delay={index * 100}>
              <div className={`border rounded-xl p-6 transition-all duration-300 group relative overflow-hidden h-full ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-accent-green/40'
                  : 'bg-dark-800 border-dark-600 hover:border-accent-green/40'
              }`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-green to-accent-emerald" />

                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center">
                    <i className={`${cert.logo} text-accent-green text-xl`} />
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-accent-green/10 rounded-md">
                    <i className="ri-shield-check-line text-accent-green text-xs" />
                    <span className="text-accent-green text-xs font-medium">Verificado</span>
                  </div>
                </div>

                <h3 className={`font-bold text-lg mb-2 group-hover:text-accent-green transition-colors leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {cert.name}
                </h3>
                <p className={`text-sm mb-3 ${isLight ? 'text-slate-500' : 'text-text-secondary'}`}>{cert.institution}</p>

                <div className={`flex items-center gap-2 text-xs ${isLight ? 'text-slate-400' : 'text-text-muted'}`}>
                  <i className="ri-calendar-line" />
                  <span className="font-mono">{cert.date}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}