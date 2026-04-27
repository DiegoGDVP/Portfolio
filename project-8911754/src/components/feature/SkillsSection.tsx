import { skillsData } from '../../mocks/portfolioData';
import AnimatedSection from '../base/AnimatedSection';
import { useThemeContext } from '../../hooks/useThemeContext';

export default function SkillsSection() {
  const { theme } = useThemeContext();
  const isLight = theme === 'light';

  return (
    <section id="habilidades" className={`py-20 md:py-28 ${isLight ? 'bg-white' : 'bg-dark-800'}`}>
      <div className="w-full px-4 md:px-8 lg:px-12">
        <AnimatedSection className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center">
              <i className="ri-tools-line text-accent-green text-xl" />
            </div>
            <span className="text-accent-green font-mono text-sm">03. Competencias</span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Habilidades <span className="text-accent-green">Técnicas</span>
          </h2>
          <p className={`mt-4 max-w-xl ${isLight ? 'text-slate-500' : 'text-text-secondary'}`}>
            Stack tecnológico versatil que abarca desarrollo full-stack, seguridad ofensiva y operaciones cloud.
          </p>
        </AnimatedSection>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillsData.map((skill, index) => (
            <AnimatedSection key={skill.id} delay={index * 100}>
              <div className={`border rounded-xl p-6 hover:-translate-y-1 transition-all duration-300 group h-full ${
                isLight
                  ? 'bg-slate-50 border-slate-200 hover:border-accent-green/40'
                  : 'bg-dark-700 border-dark-600 hover:border-accent-green/40'
              }`}>
                <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center mb-4 group-hover:bg-accent-green/20 transition-colors">
                  <i className={`${skill.icon} text-accent-green text-xl`} />
                </div>
                <h3 className={`font-bold text-lg mb-3 group-hover:text-accent-green transition-colors ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {skill.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 text-xs rounded-md font-mono ${
                        isLight ? 'bg-slate-200 text-slate-600' : 'bg-dark-600 text-text-secondary'
                      }`}
                    >
                      {tech}
                    </span>
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