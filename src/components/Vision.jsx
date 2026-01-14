import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Vision() {
  const [ref, isVisible] = useScrollAnimation(0.2);

  return (
    <section 
      id="vision" 
      className="py-32 lg:py-40 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Background Accent */}
      <div 
        className="absolute top-0 left-0 w-full h-1"
        style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
      />

      <div className="max-w-5xl mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Section Label */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-6"
            style={{ color: 'var(--accent)' }}
          >
            Notre Vision
          </motion.span>

          {/* Main Text */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-8"
            style={{ color: 'var(--text)' }}
          >
            L'Afrique avance.
            <br />
            <span style={{ color: 'var(--text-secondary)' }}>
              Mais elle a besoin de structures solides.
            </span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            IFIAAS est née d'une vision simple : créer des plateformes fiables 
            pour soutenir la croissance africaine. Nous ne vendons pas des services. 
            <span className="gradient-text font-semibold"> Nous construisons l'infrastructure économique numérique de l'Afrique.</span>
          </motion.p>

          {/* Visual Element */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 h-px w-32 mx-auto"
            style={{ background: 'var(--accent)' }}
          />
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { value: '4+', label: 'Plateformes en développement' },
            { value: '1', label: 'Siège au Bénin' },
            { value: '54', label: 'Pays à conquérir' },
            { value: '∞', label: 'Potentiel africain' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-center p-6 rounded-2xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <div className="font-display text-3xl sm:text-4xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
