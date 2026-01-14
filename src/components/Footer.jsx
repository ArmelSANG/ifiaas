import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="py-12 relative"
      style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Brand */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg"
              style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            >
              IF
            </div>
            <span 
              className="font-display text-xl font-semibold tracking-tight"
              style={{ color: 'var(--text)' }}
            >
              IFIAAS
            </span>
          </motion.div>

          {/* Location */}
          <div className="flex items-center gap-2" style={{ color: 'var(--text-secondary)' }}>
            <MapPin className="w-4 h-4" />
            <span className="text-sm">
              Basé au Bénin — Présent partout en Afrique
            </span>
          </div>

          {/* Copyright */}
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            IFIAAS © {currentYear} — Tous droits réservés
          </p>
        </div>

        {/* Bottom Decoration */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1.5 }}
          className="mt-8 h-px w-full origin-center"
          style={{ 
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' 
          }}
        />
      </div>
    </footer>
  );
}
