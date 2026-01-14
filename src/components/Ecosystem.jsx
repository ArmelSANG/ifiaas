import { motion } from 'framer-motion';
import { Wifi, PiggyBank, ShoppingBag, TrendingUp, Leaf, ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const platforms = [
  {
    id: 'gigazone',
    name: 'GigaZone',
    tagline: 'Connecter',
    quote: 'Avant le digital, il faut la connexion.',
    description: 'Plateforme de WiFi public intelligent avec portail captif et services numériques. Déployée à Zinvié et environs.',
    icon: Wifi,
    link: 'https://z.ifiaas.com',
    linkText: 'Accéder à GigaZone',
    isLive: true,
    size: 'large',
    mention: 'Plateforme officielle GigaZone par IFIAAS'
  },
  {
    id: 'ifimoney',
    name: 'ifiMoney',
    tagline: 'Sécuriser l\'épargne',
    quote: 'L\'épargne est la base de toute économie forte.',
    description: 'Plateforme de tontine digitale sécurisée pour une gestion moderne de l\'épargne collective.',
    icon: PiggyBank,
    link: 'https://money.ifiaas.com',
    linkText: 'Accéder à ifiMoney',
    isLive: true,
    size: 'large'
  },
  {
    id: 'services',
    name: 'Services Numériques',
    tagline: 'Simplifier',
    quote: 'Le digital au service du quotidien.',
    description: 'Suite de services numériques pour simplifier les démarches et transactions.',
    icon: TrendingUp,
    isLive: false,
    size: 'small'
  },
  {
    id: 'ifimarket',
    name: 'ifiMarket',
    tagline: 'Échanger',
    quote: 'Une marketplace pensée pour l\'Afrique.',
    description: 'Place de marché connectant acheteurs et vendeurs à travers le continent.',
    icon: ShoppingBag,
    isLive: false,
    size: 'small'
  },
  {
    id: 'agriculture',
    name: 'Agriculture & Impact',
    tagline: 'Développer',
    quote: 'L\'agriculture, pilier de notre économie.',
    description: 'Solutions innovantes pour le développement agricole durable.',
    icon: Leaf,
    isLive: false,
    size: 'small'
  }
];

function PlatformCard({ platform, index }) {
  const [ref, isVisible] = useScrollAnimation(0.1);
  const Icon = platform.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`group relative rounded-3xl overflow-hidden transition-all duration-500 ${
        platform.size === 'large' ? 'md:col-span-2 md:row-span-2' : ''
      } ${!platform.isLive ? 'opacity-60' : ''}`}
      style={{ 
        background: 'var(--bg-secondary)', 
        border: '1px solid var(--border)' 
      }}
    >
      {/* Coming Soon Badge */}
      {!platform.isLive && (
        <div 
          className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold z-10"
          style={{ background: 'var(--accent)', color: 'var(--bg)' }}
        >
          En développement
        </div>
      )}

      <div className={`p-6 sm:p-8 ${platform.size === 'large' ? 'md:p-10' : ''} h-full flex flex-col`}>
        {/* Icon */}
        <div 
          className={`${platform.size === 'large' ? 'w-14 h-14 md:w-16 md:h-16' : 'w-12 h-12'} rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110`}
          style={{ background: 'var(--accent)', opacity: 0.15 }}
        >
          <Icon 
            className={platform.size === 'large' ? 'w-7 h-7 md:w-8 md:h-8' : 'w-6 h-6'} 
            style={{ color: 'var(--accent)' }} 
          />
        </div>

        {/* Content */}
        <div className="flex-grow">
          {/* Tagline */}
          <span 
            className="text-sm font-semibold tracking-wider uppercase"
            style={{ color: 'var(--accent)' }}
          >
            {platform.tagline}
          </span>

          {/* Name */}
          <h3 
            className={`font-display font-semibold mt-2 mb-3 ${
              platform.size === 'large' ? 'text-2xl md:text-3xl' : 'text-xl'
            }`}
            style={{ color: 'var(--text)' }}
          >
            {platform.name}
          </h3>

          {/* Quote */}
          <p 
            className={`italic mb-4 ${platform.size === 'large' ? 'text-lg' : 'text-base'}`}
            style={{ color: 'var(--text-secondary)' }}
          >
            "{platform.quote}"
          </p>

          {/* Description */}
          <p 
            className={`leading-relaxed ${platform.size === 'large' ? 'text-base' : 'text-sm'}`}
            style={{ color: 'var(--text-secondary)' }}
          >
            {platform.description}
          </p>

          {/* Mention */}
          {platform.mention && (
            <p 
              className="mt-4 text-xs font-medium"
              style={{ color: 'var(--accent)' }}
            >
              {platform.mention}
            </p>
          )}
        </div>

        {/* Link Button */}
        {platform.isLive && platform.link && (
          <motion.a
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 group/btn"
            style={{ 
              background: 'var(--accent)', 
              color: 'var(--bg)' 
            }}
          >
            {platform.linkText}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </motion.a>
        )}
      </div>

      {/* Hover Gradient */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ 
          background: `linear-gradient(135deg, var(--accent) 0%, transparent 50%)`,
          opacity: 0.05
        }}
      />
    </motion.div>
  );
}

export default function Ecosystem() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  return (
    <section 
      id="ecosystem" 
      className="py-32 lg:py-40 relative"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
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
            Écosystème
          </span>
          <h2 
            className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-6"
            style={{ color: 'var(--text)' }}
          >
            Des plateformes structurantes
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Chaque plateforme IFIAAS répond à un besoin fondamental de l'économie africaine.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {platforms.map((platform, index) => (
            <PlatformCard key={platform.id} platform={platform} index={index} />
          ))}
        </div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p 
            className="text-lg font-medium italic"
            style={{ color: 'var(--text-secondary)' }}
          >
            Les fondations sont posées. <span className="gradient-text">L'avenir se construit.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
