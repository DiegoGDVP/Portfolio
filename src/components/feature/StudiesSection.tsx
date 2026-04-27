import { studiesData } from '../../mocks/portfolioData';
import AnimatedSection from '../base/AnimatedSection';
import { useThemeContext } from '../../hooks/useThemeContext';

export default function StudiesSection() {
  const { theme } = useThemeContext();
  const isLight = theme === 'light';

  return (
    <section id="estudios" className={`py-20 md:py-28 ${isLight ? 'bg-slate-50' : 'bg-dark-900'}`}>
      <div className="w-full px-4 md:px-8 lg:px-12">
        <AnimatedSection className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center">
              <i className="ri-graduation-cap-line text-accent-green text-xl" />
            </div>
            <span className="text-accent-green font-mono text-sm">02. Formación</span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Estudios <span className="text-accent-green">&</span> Educación
          </h2>
          <p className={`mt-4 max-w-xl ${isLight ? 'text-slate-500' : 'text-text-secondary'}`}>
            Formación académica sólida en ingeniería informática y ciberseguridad, complementada con certificaciones profesionales.
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto relative">
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px ${isLight ? 'bg-slate-200' : 'bg-dark-600'}`} />

          {studiesData.map((study, index) => (
            <AnimatedSection
              key={study.id}
              delay={index * 150}
              className={`relative flex items-start gap-6 md:gap-0 mb-12 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-accent-green border-4 md:-translate-x-1.5 translate-y-2 z-10 ${isLight ? 'border-slate-50' : 'border-dark-900'}`} />

              <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <span className="text-accent-green font-mono text-lg font-semibold">{study.year}</span>
              </div>

              <div className={`ml-10 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className={`border rounded-xl p-6 transition-all duration-300 group ${
                  isLight
                    ? 'bg-white border-slate-200 hover:border-accent-green/40'
                    : 'bg-dark-800 border-dark-600 hover:border-accent-green/30'
                }`}>
                  <span className={`md:hidden font-mono text-sm font-semibold block mb-2 text-accent-green`}>
                    {study.year}
                  </span>
                  <h3 className={`font-bold text-lg md:text-xl mb-1 group-hover:text-accent-green transition-colors ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {study.degree}
                  </h3>
                  <p className="text-accent-green-light font-medium text-sm mb-3">{study.institution}</p>
                  <p className={`text-sm leading-relaxed ${isLight ? 'text-slate-500' : 'text-text-muted'}`}>{study.description}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}