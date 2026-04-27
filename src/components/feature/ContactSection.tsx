import { useState } from 'react';
import AnimatedSection from '../base/AnimatedSection';
import { useThemeContext } from '../../hooks/useThemeContext';

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const { theme } = useThemeContext();
  const isLight = theme === 'light';

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

      const response = await fetch('https://readdy.ai/api/form/d7n8dgtnkhlbktri3fdg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  const inputClass = `w-full px-4 py-3 border rounded-lg text-sm focus:outline-none transition-colors ${
    isLight
      ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-accent-green'
      : 'bg-dark-700 border-dark-600 text-white placeholder-text-muted focus:border-accent-green'
  }`;

  return (
    <section id="contacto" className={`py-20 md:py-28 ${isLight ? 'bg-slate-50' : 'bg-dark-900'}`}>
      <div className="w-full px-4 md:px-8 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <AnimatedSection className="mb-16">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-lg bg-accent-green/10 flex items-center justify-center">
                <i className="ri-mail-send-line text-accent-green text-xl" />
              </div>
              <span className="text-accent-green font-mono text-sm">06. Contacto</span>
            </div>
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              ¿Hablamos? <span className="text-accent-green">Colaboremos</span>
            </h2>
            <p className={`mt-4 max-w-xl ${isLight ? 'text-slate-500' : 'text-text-secondary'}`}>
              ¿Tienes un proyecto en mente o quieres discutir oportunidades? Estoy abierto a colaboraciones, freelance y roles permanentes.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left: Info */}
            <AnimatedSection className="lg:col-span-2 space-y-8" delay={100}>
              <div>
                <h3 className={`font-bold text-xl mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>Información de contacto</h3>
                <div className="space-y-4">
                  {[
                    { icon: 'ri-mail-line', label: 'Email', value: 'diegogalindolahuerta@gmail.com', href: 'mailto:diegogalindolahuerta@gmail.com' },
                    { icon: 'ri-map-pin-line', label: 'Ubicación', value: 'España', href: null },
                    { icon: 'ri-time-line', label: 'Disponibilidad', value: 'Full-time / Freelance', href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isLight ? 'bg-slate-100' : 'bg-dark-700'}`}>
                        <i className={`${item.icon} text-accent-green`} />
                      </div>
                      <div>
                        <p className={`text-xs ${isLight ? 'text-slate-400' : 'text-text-muted'}`}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className={`text-sm hover:text-accent-green transition-colors ${isLight ? 'text-slate-700' : 'text-white'}`}>
                            {item.value}
                          </a>
                        ) : (
                          <p className={`text-sm ${isLight ? 'text-slate-700' : 'text-white'}`}>{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className={`font-bold text-lg mb-4 ${isLight ? 'text-slate-900' : 'text-white'}`}>Redes sociales</h3>
                <div className="flex gap-3">
                  {[
                    { icon: 'ri-linkedin-fill', label: 'LinkedIn', href: 'https://www.linkedin.com/in/diegogalindodvlp' },
                    { icon: 'ri-github-fill', label: 'GitHub', href: 'https://github.com/wbpingu49' },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-accent-green hover:text-dark-900 ${
                        isLight ? 'bg-slate-100 text-slate-600' : 'bg-dark-700 text-text-secondary'
                      }`}
                    >
                      <i className={social.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Right: Form */}
            <AnimatedSection className="lg:col-span-3" delay={200}>
              <form
                id="contacto-portfolio"
                data-readdy-form
                onSubmit={handleSubmit}
                className={`border rounded-xl p-6 md:p-8 ${isLight ? 'bg-white border-slate-200' : 'bg-dark-800 border-dark-600'}`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className={`block text-sm mb-2 ${isLight ? 'text-slate-600' : 'text-text-secondary'}`}>Nombre</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Tu nombre" />
                  </div>
                  <div>
                    <label htmlFor="email" className={`block text-sm mb-2 ${isLight ? 'text-slate-600' : 'text-text-secondary'}`}>Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="tu@email.com" />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="subject" className={`block text-sm mb-2 ${isLight ? 'text-slate-600' : 'text-text-secondary'}`}>Asunto</label>
                  <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required className={`${inputClass} appearance-none cursor-pointer`}>
                    <option value="" disabled>Selecciona un asunto</option>
                    <option value="proyecto">Propuesta de proyecto</option>
                    <option value="empleo">Oportunidad laboral</option>
                    <option value="colaboracion">Colaboración</option>
                    <option value="consulta">Consulta general</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className={`block text-sm mb-2 ${isLight ? 'text-slate-600' : 'text-text-secondary'}`}>Mensaje</label>
                  <textarea
                    id="message" name="message" value={formData.message} onChange={handleChange}
                    required maxLength={500} rows={5}
                    className={`${inputClass} resize-none`}
                    placeholder="Cuéntame sobre tu proyecto o consulta..."
                  />
                  <p className={`text-xs mt-1 text-right ${isLight ? 'text-slate-400' : 'text-text-muted'}`}>
                    {formData.message.length}/500
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-4 bg-accent-green text-dark-900 font-semibold rounded-lg hover:bg-accent-green-light transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {formStatus === 'submitting' ? (
                    <><i className="ri-loader-4-line animate-spin" />Enviando...</>
                  ) : (
                    <><i className="ri-send-plane-line" />Enviar mensaje</>
                  )}
                </button>

                {formStatus === 'success' && (
                  <div className="mt-4 p-4 bg-accent-green/10 border border-accent-green/30 rounded-lg flex items-center gap-3">
                    <i className="ri-checkbox-circle-line text-accent-green text-xl" />
                    <p className="text-accent-green text-sm">¡Mensaje enviado correctamente! Te responderé pronto.</p>
                  </div>
                )}
                {formStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                    <i className="ri-alert-line text-red-400 text-xl" />
                    <p className="text-red-400 text-sm">Hubo un error al enviar. Por favor, inténtalo de nuevo.</p>
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