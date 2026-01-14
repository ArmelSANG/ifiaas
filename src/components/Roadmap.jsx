import { motion } from 'framer-motion';
import { Wifi, PiggyBank, TrendingUp, ShoppingBag, Leaf, Check } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const steps = [
  {
    id: 1,
    title: 'Connexion',
    description: 'Déployer l\'accès internet à travers GigaZone',
    icon: Wifi,
    status: 'active',
  },
  {
    id: 2,
    title: 'Finance',
    description: 'Sécuriser l\'épargne avec ifiMoney',
    icon: PiggyBank,
    status: 'active',
  },
  {
    id: 3,
    title: 'Investissement',
    description: 'Faciliter l\'accès aux opportunités',
    icon: TrendingUp,
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Marketplace',
    description: 'Connecter acheteurs et vendeurs',
    icon: ShoppingBag,
    status: 'upcoming',
  },
  {
    id: 5,
    title: 'Agriculture & Impact',
    description: 'Soutenir le développement durable',
    icon: Leaf,
    status: 'upcoming',
  },
];

export default function Roadmap() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section 
      id="roadmap" 
      className="py-32 lg:py-40 relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(var(--accent) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-6xl mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span 
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Roadmap
          </span>
          <h2 
            className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-6"
            style={{ color: 'var(--text)' }}
          >
            Notre trajectoire
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Une construction méthodique, étape par étape.
          </p>
        </motion.div>

        {/* Stepping Stones - Desktop */}
        <div className="hidden md:block relative">
          {/* Connection Line */}
          <div 
            className="absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2"
            style={{ background: 'var(--border)' }}
          />
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={isVisible ? { scaleX: 0.4 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute top-1/2 left-0 h-0.5 -translate-y-1/2 origin-left"
            style={{ background: 'var(--accent)', width: '100%' }}
          />

          {/* Steps */}
          <div className="flex justify-between relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.status === 'active';
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  className="flex flex-col items-center text-center w-40"
                >
                  {/* Circle */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                      isActive ? 'shadow-lg' : ''
                    }`}
                    style={{ 
                      background: isActive ? 'var(--accent)' : 'var(--bg)',
                      border: `2px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`
                    }}
                  >
                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: 'var(--bg)', border: '2px solid var(--accent)' }}
                      >
                        <Check className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                      </motion.div>
                    )}
                    <Icon 
                      className="w-8 h-8" 
                      style={{ color: isActive ? 'var(--bg)' : 'var(--text-secondary)' }} 
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 
                    className="font-display text-lg font-semibold mb-2"
                    style={{ color: isActive ? 'var(--text)' : 'var(--text-secondary)' }}
                  >
                    {step.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stepping Stones - Mobile */}
        <div className="md:hidden relative">
          {/* Vertical Line */}
          <div 
            className="absolute left-6 top-0 bottom-0 w-0.5"
            style={{ background: 'var(--border)' }}
          />
          <motion.div 
            initial={{ scaleY: 0 }}
            animate={isVisible ? { scaleY: 0.4 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute left-6 top-0 w-0.5 origin-top"
            style={{ background: 'var(--accent)', height: '100%' }}
          />

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.status === 'active';
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
                  className="flex items-start gap-6 pl-2"
                >
                  {/* Circle */}
                  <div
                    className="relative w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ 
                      background: isActive ? 'var(--accent)' : 'var(--bg)',
                      border: `2px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`
                    }}
                  >
                    <Icon 
                      className="w-5 h-5" 
                      style={{ color: isActive ? 'var(--bg)' : 'var(--text-secondary)' }} 
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 
                      className="font-display text-lg font-semibold mb-1"
                      style={{ color: isActive ? 'var(--text)' : 'var(--text-secondary)' }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="text-center mt-20 p-8 rounded-2xl"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}
        >
          <p 
            className="text-xl font-display font-medium"
            style={{ color: 'var(--text)' }}
          >
            IFIAAS n'est pas un projet.
            <br />
            <span className="gradient-text">IFIAAS est une infrastructure.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
