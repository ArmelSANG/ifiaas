import { motion } from 'framer-motion';
import { Target, Layout, MapPin, Shield, Lightbulb } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const reasons = [
  {
    icon: Target,
    title: 'Vision long terme',
    description: 'Une stratégie de développement sur 10+ ans, pas des projets éphémères.'
  },
  {
    icon: Layout,
    title: 'Approche structurée',
    description: 'Chaque plateforme est construite pour durer et s\'intégrer à l\'écosystème global.'
  },
  {
    icon: MapPin,
    title: 'Solutions terrain africain',
    description: 'Conçues en Afrique, pour l\'Afrique, avec une compréhension profonde des réalités locales.'
  },
  {
    icon: Shield,
    title: 'Gouvernance claire',
    description: 'Une structure de holding transparente avec une direction identifiée et accessible.'
  },
  {
    icon: Lightbulb,
    title: 'Innovation maîtrisée',
    description: 'Technologies modernes adaptées aux infrastructures existantes du continent.'
  }
];

export default function WhyIFIAAS() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section 
      id="why" 
      className="py-32 lg:py-40 relative"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-20"
        >
          <span 
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Pourquoi IFIAAS
          </span>
          <h2 
            className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-6"
            style={{ color: 'var(--text)' }}
          >
            Ce qui nous différencie
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Plus qu'une entreprise tech, IFIAAS est un bâtisseur d'infrastructures économiques.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -4 }}
                className="group p-8 rounded-2xl transition-all duration-500"
                style={{ 
                  background: 'var(--bg-secondary)', 
                  border: '1px solid var(--border)' 
                }}
              >
                {/* Icon */}
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                  style={{ background: 'var(--accent)', opacity: 0.1 }}
                >
                  <Icon className="w-7 h-7" style={{ color: 'var(--accent)' }} />
                </div>

                {/* Content */}
                <h3 
                  className="font-display text-xl font-semibold mb-3"
                  style={{ color: 'var(--text)' }}
                >
                  {reason.title}
                </h3>
                <p 
                  className="text-base leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {reason.description}
                </p>

                {/* Hover Indicator */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  className="h-0.5 mt-6 rounded-full"
                  style={{ background: 'var(--accent)' }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
