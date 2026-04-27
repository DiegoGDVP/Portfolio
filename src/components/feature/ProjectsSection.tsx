import { useState } from 'react';
import { projectsData } from '../../mocks/portfolioData';
import AnimatedSection from '../base/AnimatedSection';
import { useThemeContext } from '../../hooks/useThemeContext';

const categories = ['Todos', ...Array.from(new Set(projectsData.map((p) => p.category)))];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const { theme } = useThemeContext();
  const isLight = theme === 'light';

  const filteredProjects =
    activeFilter === 'Todos'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="proyectos" className={`py-20 md:py-28 ${isLight ? 'bg-white' : 'bg-dark-800'}`}>
      <div className="w-full px-4 md:px-8 lg:px-12">
        <AnimatedSection className="max-w-6xl mx-auto mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center">
              <i className="ri-folder-open-line text-accent-green text-xl" />
            </div>
            <span className="text-accent-green font-mono text-sm">05. Portfolio</span>
          </div>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Proyectos <span className="text-accent-green">Destacados</span>
          </h2>
          <p className={`mt-4 max-w-xl ${isLight ? 'text-slate-500' : 'text-text-secondary'}`}>
            Una selección de proyectos que demuestran experiencia en desarrollo de software y ciberseguridad.
          </p>
        </AnimatedSection>

        {/* Filter Tabs */}
        <AnimatedSection className="max-w-6xl mx-auto mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-accent-green text-dark-900'
                    : isLight
                    ? 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                    : 'bg-dark-700 text-text-secondary hover:text-white hover:bg-dark-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 100}>
              <div className={`border rounded-xl overflow-hidden transition-all duration-300 group flex flex-col ${
                isLight
                  ? 'bg-slate-50 border-slate-200 hover:border-accent-green/40'
                  : 'bg-dark-700 border-dark-600 hover:border-accent-green/40'
              }`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${isLight ? 'from-slate-50/80' : 'from-dark-700/80'} to-transparent`} />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-accent-green text-dark-900 text-xs font-semibold rounded-md">
                    {project.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className={`font-bold text-lg mb-2 group-hover:text-accent-green transition-colors ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {project.name}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-4 line-clamp-6 flex-1 ${isLight ? 'text-slate-500' : 'text-text-secondary'}`}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className={`px-2 py-1 text-xs rounded font-mono ${
                          isLight ? 'bg-slate-200 text-slate-600' : 'bg-dark-600 text-text-muted'
                        }`}
                      >
                        {tech}
                      </span>
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