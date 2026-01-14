import { motion } from 'framer-motion';
import { User, Phone, Mail, MessageCircle, MapPin, ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Contact() {
  const [ref, isVisible] = useScrollAnimation(0.1);

  const contactInfo = {
    name: 'Armel SANGAN',
    role: 'Promoteur',
    phone: '+229 01 67 45 54 62',
    whatsapp: '+229 67 45 54 62',
    email: 'info@ifiaas.com',
    location: 'Bénin'
  };

  return (
    <section 
      id="contact" 
      className="py-32 lg:py-40 relative overflow-hidden"
      style={{ background: 'var(--bg-secondary)' }}
    >
      {/* Background Elements */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ 
          background: `radial-gradient(circle, var(--accent) 0%, transparent 70%)`,
          transform: 'translate(30%, -30%)'
        }}
      />

      <div className="max-w-5xl mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span 
            className="inline-block text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Contact
          </span>
          <h2 
            className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold mb-6"
            style={{ color: 'var(--text)' }}
          >
            Parlons de l'avenir
          </h2>
          <p 
            className="text-lg max-w-2xl mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Vous souhaitez en savoir plus sur IFIAAS ou explorer des opportunités de collaboration ?
          </p>
        </motion.div>

        {/* Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="rounded-3xl p-8 md:p-12 max-w-3xl mx-auto"
          style={{ 
            background: 'var(--bg)', 
            border: '1px solid var(--border)',
            boxShadow: '0 20px 80px rgba(0,0,0,0.15)'
          }}
        >
          {/* Direction Label */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            <User className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Direction IFIAAS
            </span>
          </div>

          {/* Name & Role */}
          <h3 
            className="font-display text-2xl md:text-3xl font-semibold mb-2"
            style={{ color: 'var(--text)' }}
          >
            {contactInfo.name}
          </h3>
          <p 
            className="text-lg mb-8"
            style={{ color: 'var(--accent)' }}
          >
            {contactInfo.role}
          </p>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {/* Phone */}
            <a 
              href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
              className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: 'var(--accent)', opacity: 0.15 }}
              >
                <Phone className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Téléphone
                </p>
                <p className="font-semibold" style={{ color: 'var(--text)' }}>
                  {contactInfo.phone}
                </p>
              </div>
            </a>

            {/* WhatsApp */}
            <a 
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: '#25D366', opacity: 0.15 }}
              >
                <MessageCircle className="w-5 h-5" style={{ color: '#25D366' }} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  WhatsApp
                </p>
                <p className="font-semibold" style={{ color: 'var(--text)' }}>
                  {contactInfo.whatsapp}
                </p>
              </div>
            </a>

            {/* Email */}
            <a 
              href={`mailto:${contactInfo.email}`}
              className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ background: 'var(--accent)', opacity: 0.15 }}
              >
                <Mail className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Email
                </p>
                <p className="font-semibold" style={{ color: 'var(--text)' }}>
                  {contactInfo.email}
                </p>
              </div>
            </a>

            {/* Location */}
            <div 
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center"
                style={{ background: 'var(--accent)', opacity: 0.15 }}
              >
                <MapPin className="w-5 h-5" style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>
                  Siège
                </p>
                <p className="font-semibold" style={{ color: 'var(--text)' }}>
                  {contactInfo.location}
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.a
            href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Bonjour, je souhaite en savoir plus sur IFIAAS.`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300"
            style={{ 
              background: 'var(--accent)', 
              color: 'var(--bg)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
            }}
          >
            Entrer en contact avec IFIAAS
            <ArrowUpRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
