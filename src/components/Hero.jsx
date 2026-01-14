import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';

const taglineWords = ['Connecter.', 'Financer.', 'Investir.', 'Développer.'];

export default function Hero() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full opacity-20"
          style={{ 
            background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
            top: '-10%',
            right: '-10%'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{ 
            background: 'radial-gradient(circle, var(--accent-secondary) 0%, transparent 70%)',
            bottom: '10%',
            left: '-5%'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--text) 1px, transparent 1px),
            linear-gradient(90deg, var(--text) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border)' 
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--accent)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            Holding Digitale & Financière • Basée au Bénin
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] mb-6"
          style={{ color: 'var(--text)' }}
        >
          <span className="gradient-text">IFIAAS</span>
          <br />
          <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl" style={{ color: 'var(--text)' }}>
            Bâtir l'infrastructure digitale
            <br />
            et financière de l'Afrique
          </span>
        </motion.h1>

        {/* Tagline Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12"
        >
          {taglineWords.map((word, index) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.15 }}
              className="text-lg sm:text-xl md:text-2xl font-medium"
              style={{ color: 'var(--accent)' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('ecosystem')}
            className="group flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
            style={{ 
              background: 'var(--accent)', 
              color: 'var(--bg)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
            }}
          >
            Explorer l'écosystème IFIAAS
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection('contact')}
            className="flex items-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
            style={{ 
              background: 'transparent', 
              color: 'var(--text)',
              border: '1px solid var(--border)'
            }}
          >
            <MessageCircle className="w-5 h-5" />
            Contacter la direction
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full flex items-start justify-center pt-2"
            style={{ border: '2px solid var(--border)' }}
          >
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 rounded-full"
              style={{ background: 'var(--accent)' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
