import React, { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// IFIAAS - VERSION ULTRA
// Holding Digitale & Financière Panafricaine
// Expérience Immersive Premium - Luxe Extrême & Cinématographie Digitale
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────────
// SYSTÈME DE THÈMES
// ─────────────────────────────────────────────────────────────────────────────────

const themes = {
  midnight: {
    name: 'Midnight Luxury',
    bg: '#050505',
    bgSecondary: '#0a0a0a',
    bgTertiary: '#111111',
    text: '#ffffff',
    textSecondary: '#888888',
    accent: '#d4af37',
    accentLight: '#f4d03f',
    accentRgb: '212, 175, 55',
    gradient: 'linear-gradient(135deg, #050505 0%, #111111 50%, #050505 100%)',
    cardBg: 'rgba(17, 17, 17, 0.6)',
    border: 'rgba(212, 175, 55, 0.15)',
    glow: 'rgba(212, 175, 55, 0.4)',
  },
  techBlue: {
    name: 'Tech Blue Future',
    bg: '#060d18',
    bgSecondary: '#0d1b2a',
    bgTertiary: '#1b263b',
    text: '#e0e1dd',
    textSecondary: '#778da9',
    accent: '#00b4d8',
    accentLight: '#90e0ef',
    accentRgb: '0, 180, 216',
    gradient: 'linear-gradient(135deg, #060d18 0%, #0d1b2a 50%, #060d18 100%)',
    cardBg: 'rgba(13, 27, 42, 0.6)',
    border: 'rgba(0, 180, 216, 0.15)',
    glow: 'rgba(0, 180, 216, 0.4)',
  },
  emerald: {
    name: 'Emerald Growth',
    bg: '#030f03',
    bgSecondary: '#0b1f0b',
    bgTertiary: '#132a13',
    text: '#ecf0e8',
    textSecondary: '#8fb996',
    accent: '#d4af37',
    accentLight: '#90be6d',
    accentRgb: '212, 175, 55',
    gradient: 'linear-gradient(135deg, #030f03 0%, #132a13 50%, #030f03 100%)',
    cardBg: 'rgba(19, 42, 19, 0.6)',
    border: 'rgba(212, 175, 55, 0.15)',
    glow: 'rgba(144, 190, 109, 0.4)',
  },
  pureLight: {
    name: 'Pure Light Corporate',
    bg: '#fafafa',
    bgSecondary: '#f5f5f5',
    bgTertiary: '#eeeeee',
    text: '#111111',
    textSecondary: '#555555',
    accent: '#1a56db',
    accentLight: '#3b82f6',
    accentRgb: '26, 86, 219',
    gradient: 'linear-gradient(135deg, #fafafa 0%, #f0f0f0 50%, #fafafa 100%)',
    cardBg: 'rgba(255, 255, 255, 0.8)',
    border: 'rgba(26, 86, 219, 0.12)',
    glow: 'rgba(26, 86, 219, 0.3)',
  },
};

// ─────────────────────────────────────────────────────────────────────────────────
// HOOKS PERSONNALISÉS
// ─────────────────────────────────────────────────────────────────────────────────

const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsInView(true);
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
};

const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * speed);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  
  return offset;
};

const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [ref, isInView] = useInView();
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView && !hasStarted) {
      setHasStarted(true);
      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeOut * end));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration, hasStarted]);

  return [ref, count];
};

// ─────────────────────────────────────────────────────────────────────────────────
// COMPOSANTS ANIMATIONS
// ─────────────────────────────────────────────────────────────────────────────────

const Preloader = ({ onComplete, theme }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const duration = 2500;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setPhase('reveal');
        setTimeout(() => {
          setPhase('complete');
          setTimeout(onComplete, 600);
        }, 800);
      }
    };
    
    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      background: theme.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: phase === 'complete' ? 0 : 1,
      transition: 'opacity 0.6s ease-out',
      pointerEvents: phase === 'complete' ? 'none' : 'auto',
    }}>
      <div style={{
        position: 'relative',
        marginBottom: '60px',
        transform: phase === 'reveal' ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <rect
            x="10" y="10" width="100" height="100" rx="12"
            stroke={theme.accent}
            strokeWidth="2"
            fill="none"
            style={{
              strokeDasharray: 400,
              strokeDashoffset: 400 - (progress / 100) * 400,
              transition: 'stroke-dashoffset 0.1s linear',
            }}
          />
          <g style={{
            opacity: progress > 30 ? (progress - 30) / 70 : 0,
            transition: 'opacity 0.3s ease',
          }}>
            <path d="M30 36 L60 24 L90 36 L90 84 L60 96 L30 84 Z" fill={theme.accent} opacity="0.15" />
            <path d="M60 24 L60 96" stroke={theme.accent} strokeWidth="2" />
            <path d="M30 36 L90 36" stroke={theme.accent} strokeWidth="2" />
            <path d="M30 60 L90 60" stroke={theme.accent} strokeWidth="2" />
            <path d="M30 84 L90 84" stroke={theme.accent} strokeWidth="2" />
          </g>
        </svg>
        
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          opacity: progress / 100 * 0.6,
          pointerEvents: 'none',
        }} />
      </div>
      
      <div style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: '48px',
        fontWeight: 500,
        letterSpacing: '0.3em',
        color: theme.text,
        display: 'flex',
        overflow: 'hidden',
      }}>
        {'IFIAAS'.split('').map((letter, i) => (
          <span
            key={i}
            style={{
              display: 'inline-block',
              transform: progress > (i + 1) * 12 ? 'translateY(0)' : 'translateY(100%)',
              opacity: progress > (i + 1) * 12 ? 1 : 0,
              transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '200px',
      }}>
        <div style={{
          height: '1px',
          background: theme.border,
          borderRadius: '1px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: theme.accent,
            transition: 'width 0.1s linear',
          }} />
        </div>
        <div style={{
          marginTop: '16px',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '11px',
          color: theme.textSecondary,
          letterSpacing: '0.2em',
          textAlign: 'center',
        }}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

const ParticlesBackground = ({ theme, count = 50 }) => {
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);
  }, [count]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden',
    }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: theme.accent,
            opacity: p.opacity,
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};

const CustomCursor = ({ theme }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);
    };

    const handleOver = (e) => {
      const target = e.target;
      setIsPointer(
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );
    };

    const handleLeave = () => setIsHidden(true);

    if (!isMobile) {
      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseover', handleOver);
      document.addEventListener('mouseleave', handleLeave);
    }

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: isPointer ? '50px' : '12px',
          height: isPointer ? '50px' : '12px',
          borderRadius: '50%',
          background: isPointer ? 'transparent' : theme.accent,
          border: isPointer ? `1px solid ${theme.accent}` : 'none',
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s ease, height 0.3s ease, background 0.3s ease',
          pointerEvents: 'none',
          zIndex: 10001,
          opacity: isHidden ? 0 : 1,
          mixBlendMode: 'difference',
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: theme.accent,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 10002,
          opacity: isHidden ? 0 : 1,
        }}
      />
    </>
  );
};

const GrainOverlay = ({ opacity = 0.03 }) => (
  <div style={{
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 9999,
    opacity,
    mixBlendMode: 'overlay',
  }}>
    <svg width="100%" height="100%">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </div>
);

const AnimatedSection = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const [ref, isInView] = useInView();
  
  const transforms = {
    up: 'translateY(80px)',
    down: 'translateY(-80px)',
    left: 'translateX(80px)',
    right: 'translateX(-80px)',
    scale: 'scale(0.9)',
  };
  
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate(0) scale(1)' : transforms[direction],
        transition: `all 1s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// COMPOSANTS UI
// ─────────────────────────────────────────────────────────────────────────────────

const IFIAASLogo = ({ theme, size = 'normal' }) => {
  const scale = size === 'small' ? 0.7 : size === 'large' ? 1.5 : 1;
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: `${14 * scale}px` }}>
      <svg width={44 * scale} height={44 * scale} viewBox="0 0 44 44" fill="none">
        <rect x="2" y="2" width="40" height="40" rx="6" stroke={theme.accent} strokeWidth="1.5" fill="none" />
        <path d="M11 13 L22 8 L33 13 L33 31 L22 36 L11 31 Z" fill={theme.accent} opacity="0.12" />
        <path d="M22 8 L22 36" stroke={theme.accent} strokeWidth="1.5" />
        <path d="M11 13 L33 13" stroke={theme.accent} strokeWidth="1.5" />
        <path d="M11 22 L33 22" stroke={theme.accent} strokeWidth="1.5" />
        <path d="M11 31 L33 31" stroke={theme.accent} strokeWidth="1.5" />
      </svg>
      <span style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: `${30 * scale}px`,
        fontWeight: 500,
        letterSpacing: '0.18em',
        color: theme.text,
      }}>
        IFIAAS
      </span>
    </div>
  );
};

const ThemeSelector = ({ currentTheme, setTheme, theme }) => {
  const themeKeys = Object.keys(themes);
  const currentIndex = themeKeys.indexOf(currentTheme);
  
  const cycleTheme = () => {
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  return (
    <button
      onClick={cycleTheme}
      style={{
        background: theme.cardBg,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${theme.border}`,
        borderRadius: '50px',
        padding: '10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        transition: 'all 0.4s ease',
        position: 'relative',
        width: '52px',
        height: '52px',
      }}
      title={`Thème: ${themes[currentTheme].name} (cliquer pour changer)`}
    >
      {/* Cercles de couleur des 4 thèmes */}
      <div style={{
        position: 'relative',
        width: '28px',
        height: '28px',
      }}>
        {themeKeys.map((key, i) => {
          const isActive = key === currentTheme;
          const angle = (i * 90) - 45;
          const radius = isActive ? 0 : 10;
          const x = Math.cos(angle * Math.PI / 180) * radius;
          const y = Math.sin(angle * Math.PI / 180) * radius;
          
          return (
            <div
              key={key}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: isActive ? '28px' : '8px',
                height: isActive ? '28px' : '8px',
                borderRadius: '50%',
                background: themes[key].accent,
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: isActive ? `0 0 20px ${themes[key].glow}` : 'none',
                zIndex: isActive ? 2 : 1,
                opacity: isActive ? 1 : 0.6,
              }}
            />
          );
        })}
      </div>
    </button>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────────

const Header = ({ theme, currentTheme, setTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      // Fermer le menu mobile automatiquement au scroll
      if (mobileOpen && window.scrollY > 10) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  const menuItems = [
    { label: 'Vision', href: '#vision' },
    { label: 'Écosystème', href: '#ecosystem' },
    { label: 'Chiffres', href: '#stats' },
    { label: 'Roadmap', href: '#roadmap' },
    { label: 'Confiance', href: '#trust' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollTo = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: mobileOpen ? 0 : 'auto',
      zIndex: 10001,
      padding: '0 5%',
      height: mobileOpen ? '100%' : (scrolled ? '72px' : '100px'),
      display: 'flex',
      flexDirection: mobileOpen ? 'column' : 'row',
      alignItems: mobileOpen ? 'stretch' : 'center',
      justifyContent: 'flex-start',
      background: (scrolled || mobileOpen) ? theme.bg : 'transparent',
      backdropFilter: (scrolled || mobileOpen) ? 'blur(30px) saturate(180%)' : 'none',
      borderBottom: (scrolled && !mobileOpen) ? `1px solid ${theme.border}` : 'none',
      transition: mobileOpen ? 'none' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      overflow: 'hidden',
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: scrolled || mobileOpen ? '72px' : '100px',
        minHeight: scrolled || mobileOpen ? '72px' : '100px',
        transition: mobileOpen ? 'none' : 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <IFIAASLogo theme={theme} />

        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              style={{
                color: theme.textSecondary,
                textDecoration: 'none',
                fontSize: '13px',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.03em',
                transition: 'all 0.3s ease',
                padding: '8px 0',
              }}
              onMouseEnter={(e) => e.target.style.color = theme.accent}
              onMouseLeave={(e) => e.target.style.color = theme.textSecondary}
            >
              {item.label}
            </a>
          ))}
          <ThemeSelector currentTheme={currentTheme} setTheme={setTheme} theme={theme} />
        </nav>

        {/* Mobile: Theme button + Menu button */}
        <div className="mobile-controls" style={{
          display: 'none',
          alignItems: 'center',
          gap: '12px',
        }}>
          <ThemeSelector currentTheme={currentTheme} setTheme={setTheme} theme={theme} />
          
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: theme.cardBg,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.border}`,
              borderRadius: '50%',
              width: '52px',
              height: '52px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path d="M6 6L18 18M6 18L18 6" stroke={theme.text} strokeWidth="1.5" fill="none" />
              ) : (
                <path d="M3 7H21M3 12H21M3 17H21" stroke={theme.text} strokeWidth="1.5" fill="none" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobile - maintenant à l'intérieur du header */}
      {mobileOpen && (
        <div className="mobile-menu" style={{
          flex: 1,
          padding: '30px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '28px',
          borderTop: `1px solid ${theme.border}`,
          overflowY: 'auto',
        }}>
          {menuItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              style={{
                color: theme.text,
                textDecoration: 'none',
                fontSize: '32px',
                fontFamily: "'Playfair Display', Georgia, serif",
                opacity: 0,
                transform: 'translateX(-20px)',
                animation: `mobileItemIn 0.5s ease ${index * 0.08}s forwards`,
              }}
            >
              {item.label}
            </a>
          ))}
          
          {/* Nom du thème actuel en bas */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '30px',
            borderTop: `1px solid ${theme.border}`,
          }}>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              color: theme.textSecondary,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Thème actuel: <span style={{ color: theme.accent }}>{themes[currentTheme].name}</span>
            </span>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
        }
        @keyframes mobileItemIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </header>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const HeroSection = ({ theme }) => {
  const [loaded, setLoaded] = useState(false);
  const parallaxOffset = useParallax(0.3);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 200);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: '140px 5% 100px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        background: theme.gradient,
        transform: `translateY(${parallaxOffset * 0.5}px)`,
      }} />

      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${theme.border} 1px, transparent 1px),
          linear-gradient(90deg, ${theme.border} 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        opacity: 0.25,
        transform: `translateY(${parallaxOffset}px)`,
      }} />

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) translateY(${parallaxOffset * 0.2}px)`,
        width: '150vmax',
        height: '150vmax',
        pointerEvents: 'none',
      }}>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${i * 25}%`,
              height: `${i * 25}%`,
              borderRadius: '50%',
              border: `1px solid ${theme.border}`,
              opacity: 0.5 - i * 0.1,
            }}
          />
        ))}
      </div>

      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: `translate(-50%, -50%) translateY(${parallaxOffset * 0.15}px)`,
        width: '900px',
        height: '900px',
        background: `radial-gradient(circle, ${theme.glow} 0%, transparent 60%)`,
        opacity: 0.4,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1100px' }}>
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 28px',
            background: theme.cardBg,
            backdropFilter: 'blur(20px)',
            borderRadius: '100px',
            border: `1px solid ${theme.border}`,
            marginBottom: '50px',
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 12px #22c55e',
            }} />
            <span style={{
              color: theme.textSecondary,
              fontSize: '12px',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Holding Panafricaine · Bénin
            </span>
          </div>
        </div>

        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 'clamp(38px, 7vw, 82px)',
          fontWeight: 600,
          color: theme.text,
          lineHeight: 1.05,
          marginBottom: '30px',
          letterSpacing: '-0.02em',
        }}>
          <span style={{
            display: 'block',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}>
            Bâtir l'infrastructure
          </span>
          <span style={{
            display: 'block',
            color: theme.accent,
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.7s',
            textShadow: `0 0 80px ${theme.glow}`,
          }}>
            digitale et financière
          </span>
          <span style={{
            display: 'block',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.9s',
          }}>
            de l'Afrique
          </span>
        </h1>

        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.1s',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(16px, 2.2vw, 22px)',
            color: theme.textSecondary,
            fontWeight: 300,
            letterSpacing: '0.25em',
            marginBottom: '60px',
          }}>
            Connecter · Financer · Investir · Développer
          </p>
        </div>

        <div style={{
          display: 'flex',
          gap: '24px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1) 1.3s',
        }}>
          <a
            href="#ecosystem"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#ecosystem')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '20px 40px',
              background: theme.accent,
              color: theme.bg,
              borderRadius: '10px',
              textDecoration: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Explorer l'écosystème
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L16 9L9 16M16 9H2" stroke="currentColor" strokeWidth="2" />
            </svg>
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '20px 40px',
              background: 'transparent',
              color: theme.text,
              border: `1px solid ${theme.border}`,
              borderRadius: '10px',
              textDecoration: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '15px',
              fontWeight: 500,
              letterSpacing: '0.02em',
              transition: 'all 0.4s ease',
              backdropFilter: 'blur(10px)',
            }}
          >
            Contacter la direction
          </a>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1.5s ease 2s',
      }}>
        <span style={{
          color: theme.textSecondary,
          fontSize: '10px',
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}>
          Découvrir
        </span>
        <div style={{
          width: '20px',
          height: '32px',
          borderRadius: '12px',
          border: `1px solid ${theme.border}`,
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '8px',
        }}>
          <div style={{
            width: '3px',
            height: '8px',
            borderRadius: '2px',
            background: theme.accent,
          }} />
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// VISION SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const VisionSection = ({ theme }) => {
  const parallaxOffset = useParallax(0.1);

  return (
    <section id="vision" style={{
      padding: '160px 5%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        width: '1px',
        height: '100px',
        background: `linear-gradient(to bottom, transparent, ${theme.accent}, transparent)`,
        transform: `translateY(${parallaxOffset}px)`,
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <AnimatedSection>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 24px',
            background: theme.cardBg,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.border}`,
            borderRadius: '100px',
            marginBottom: '50px',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: theme.accent,
            }} />
            <span style={{
              color: theme.accent,
              fontSize: '11px',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              Notre Vision
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(34px, 5vw, 60px)',
            fontWeight: 400,
            color: theme.text,
            lineHeight: 1.15,
            marginBottom: '30px',
          }}>
            L'Afrique avance.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(34px, 5vw, 60px)',
            fontWeight: 400,
            color: theme.textSecondary,
            lineHeight: 1.15,
            marginBottom: '50px',
          }}>
            Mais elle a besoin de structures <span style={{ color: theme.accent }}>solides</span>.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={450}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '18px',
            color: theme.textSecondary,
            lineHeight: 2,
            maxWidth: '750px',
            margin: '0 auto',
          }}>
            IFIAAS est née d'une vision simple : créer des plateformes fiables pour soutenir 
            la croissance africaine. Nous ne vendons pas des services — nous construisons 
            l'infrastructure économique numérique qui permettra à des millions d'Africains 
            de se connecter, d'épargner, d'investir et de prospérer.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100% - 40px, 140px), 180px))',
            gap: '50px',
            marginTop: '100px',
            paddingTop: '50px',
            borderTop: `1px solid ${theme.border}`,
            justifyContent: 'center',
            padding: '50px 20px 0',
          }}>
            {[
              { value: '2024', label: 'Fondation' },
              { value: 'Bénin', label: 'Siège Social' },
              { value: 'Afrique', label: 'Rayonnement' },
              { value: '∞', label: 'Ambition' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '36px',
                  color: theme.accent,
                  marginBottom: '12px',
                  textShadow: `0 0 40px ${theme.glow}`,
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px',
                  color: theme.textSecondary,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// ECOSYSTEM SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const EcosystemCard = ({ theme, platform, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <AnimatedSection delay={index * 120} direction={index % 2 === 0 ? 'left' : 'right'}>
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: theme.cardBg,
          backdropFilter: 'blur(30px)',
          border: `1px solid ${isHovered ? theme.accent : theme.border}`,
          borderRadius: '24px',
          padding: '50px',
          transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: isHovered ? 'translateY(-12px)' : 'translateY(0)',
          boxShadow: isHovered ? `0 40px 80px ${theme.accent}20` : 'none',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: `radial-gradient(ellipse at top, ${theme.accent}15 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${theme.accent}20, ${theme.accent}05)`,
            border: `1px solid ${theme.border}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
            fontSize: '32px',
            transition: 'all 0.4s ease',
            transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0)',
          }}>
            {platform.icon}
          </div>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            background: platform.active ? 'rgba(34, 197, 94, 0.15)' : `${theme.accent}10`,
            borderRadius: '100px',
            marginBottom: '24px',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: platform.active ? '#22c55e' : theme.accent,
              boxShadow: platform.active ? '0 0 10px #22c55e' : 'none',
            }} />
            <span style={{
              fontSize: '10px',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: platform.active ? '#22c55e' : theme.accent,
              fontWeight: 500,
            }}>
              {platform.status}
            </span>
          </div>

          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '30px',
            color: theme.text,
            marginBottom: '10px',
          }}>
            {platform.name}
          </h3>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '15px',
            fontStyle: 'italic',
            color: theme.accent,
            marginBottom: '24px',
            opacity: 0.9,
          }}>
            "{platform.tagline}"
          </p>

          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '15px',
            color: theme.textSecondary,
            lineHeight: 1.85,
            marginBottom: '35px',
            flex: 1,
          }}>
            {platform.description}
          </p>

          {platform.link && (
            <a
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 30px',
                background: isHovered ? theme.accent : 'transparent',
                color: isHovered ? theme.bg : theme.text,
                border: `1px solid ${theme.accent}`,
                borderRadius: '10px',
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.4s ease',
                alignSelf: 'flex-start',
              }}
            >
              Accéder à {platform.name}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 14L14 2M14 2H6M14 2V10" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          )}

          {platform.mention && (
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '11px',
              color: theme.textSecondary,
              marginTop: '20px',
              opacity: 0.6,
            }}>
              {platform.mention}
            </p>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};

const EcosystemSection = ({ theme }) => {
  const platforms = [
    {
      name: 'GigaZone',
      icon: '📡',
      tagline: 'Avant le digital, il faut la connexion.',
      description: 'Plateforme de WiFi public intelligent intégrant Internet haut débit, portail captif et services numériques. Déployée activement à Zinvié et ses environs.',
      status: 'Opérationnel',
      active: true,
      link: 'https://z.ifiaas.com',
      mention: 'Plateforme officielle GigaZone par IFIAAS',
    },
    {
      name: 'ifiMoney',
      icon: '💰',
      tagline: "L'épargne est la base de toute économie forte.",
      description: 'Plateforme de tontine digitale sécurisée permettant aux communautés de gérer leur épargne collective de manière transparente et efficace.',
      status: 'Opérationnel',
      active: true,
      link: 'https://money.ifiaas.com',
    },
    {
      name: 'Services Numériques',
      icon: '🔧',
      tagline: 'Simplifier le quotidien digital.',
      description: 'Suite de services numériques conçus pour faciliter les démarches administratives et commerciales des populations africaines.',
      status: 'En développement',
      active: false,
    },
    {
      name: 'Investissements',
      icon: '📈',
      tagline: "Démocratiser l'accès aux opportunités.",
      description: "Plateforme d'investissement participatif permettant aux particuliers d'investir dans des projets structurants pour l'économie africaine.",
      status: 'En développement',
      active: false,
    },
    {
      name: 'ifiMarket',
      icon: '🛒',
      tagline: 'Le commerce africain, digitalisé.',
      description: 'Marketplace B2B et B2C connectant producteurs, commerçants et consommateurs à travers tout le continent.',
      status: 'En développement',
      active: false,
    },
    {
      name: 'Agriculture & Impact',
      icon: '🌱',
      tagline: "Nourrir l'Afrique durablement.",
      description: 'Solutions intégrées pour le financement, la formation et la commercialisation des produits agricoles africains.',
      status: 'En développement',
      active: false,
    },
  ];

  return (
    <section id="ecosystem" style={{
      padding: '160px 5%',
      background: theme.bgSecondary,
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 24px',
              background: theme.cardBg,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.border}`,
              borderRadius: '100px',
              marginBottom: '40px',
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: theme.accent,
              }} />
              <span style={{
                color: theme.accent,
                fontSize: '11px',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                Écosystème IFIAAS
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(34px, 5vw, 54px)',
              fontWeight: 400,
              color: theme.text,
              marginBottom: '24px',
            }}>
              Des plateformes qui <span style={{ color: theme.accent }}>structurent</span>
            </h2>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '17px',
              color: theme.textSecondary,
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: 1.8,
            }}>
              Chaque plateforme répond à un besoin fondamental. Ensemble, elles forment 
              une infrastructure complète pour l'économie numérique africaine.
            </p>
          </div>
        </AnimatedSection>

        <div className="ecosystem-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100% - 40px, 350px), 400px))',
          gap: '35px',
          justifyContent: 'center',
          padding: '0 20px',
        }}>
          {platforms.map((platform, index) => (
            <EcosystemCard key={platform.name} theme={theme} platform={platform} index={index} />
          ))}
        </div>

        <AnimatedSection delay={800}>
          <div style={{
            textAlign: 'center',
            marginTop: '100px',
            padding: '50px',
            background: `linear-gradient(135deg, ${theme.cardBg}, transparent)`,
            borderRadius: '20px',
            border: `1px solid ${theme.border}`,
          }}>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(22px, 3vw, 28px)',
              color: theme.text,
              fontStyle: 'italic',
            }}>
              "Les fondations sont posées. <span style={{ color: theme.accent }}>L'avenir se construit.</span>"
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// STATS SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const StatCard = ({ theme, value, suffix, label, delay }) => {
  const [ref, count] = useCountUp(value, 2500);

  return (
    <AnimatedSection delay={delay}>
      <div
        ref={ref}
        style={{
          textAlign: 'center',
          padding: '50px 30px',
          background: theme.cardBg,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.border}`,
          borderRadius: '24px',
          transition: 'all 0.5s ease',
        }}
      >
        <div style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 'clamp(48px, 6vw, 72px)',
          fontWeight: 400,
          color: theme.accent,
          marginBottom: '16px',
          textShadow: `0 0 60px ${theme.glow}`,
          lineHeight: 1,
        }}>
          {count.toLocaleString()}{suffix}
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: theme.textSecondary,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          {label}
        </div>
      </div>
    </AnimatedSection>
  );
};

const StatsSection = ({ theme }) => {
  const stats = [
    { value: 6, suffix: '', label: 'Plateformes' },
    { value: 2, suffix: '', label: 'Déjà actives' },
    { value: 1, suffix: '', label: 'Pays (base)' },
    { value: 54, suffix: '', label: 'Pays visés' },
  ];

  return (
    <section id="stats" style={{
      padding: '160px 5%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '120%',
        height: '120%',
        background: `radial-gradient(ellipse, ${theme.accent}08 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 24px',
              background: theme.cardBg,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.border}`,
              borderRadius: '100px',
              marginBottom: '40px',
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: theme.accent,
              }} />
              <span style={{
                color: theme.accent,
                fontSize: '11px',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                IFIAAS en chiffres
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(34px, 5vw, 54px)',
              fontWeight: 400,
              color: theme.text,
            }}>
              L'ambition en <span style={{ color: theme.accent }}>données</span>
            </h2>
          </div>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100% - 40px, 220px), 260px))',
          gap: '30px',
          justifyContent: 'center',
          padding: '0 20px',
        }}>
          {stats.map((stat, i) => (
            <StatCard 
              key={i} 
              theme={theme} 
              value={stat.value} 
              suffix={stat.suffix}
              label={stat.label} 
              delay={i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// ROADMAP SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const RoadmapSection = ({ theme }) => {
  const milestones = [
    { phase: '01', title: 'Connexion', desc: 'GigaZone', status: 'done' },
    { phase: '02', title: 'Finance', desc: 'ifiMoney', status: 'done' },
    { phase: '03', title: 'Services', desc: 'Numériques', status: 'progress' },
    { phase: '04', title: 'Investissement', desc: 'Participatif', status: 'upcoming' },
    { phase: '05', title: 'Marketplace', desc: 'ifiMarket', status: 'upcoming' },
    { phase: '06', title: 'Agriculture', desc: '& Impact', status: 'upcoming' },
  ];

  return (
    <section id="roadmap" style={{
      padding: '160px 5%',
      background: theme.bgSecondary,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '100px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 24px',
              background: theme.cardBg,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.border}`,
              borderRadius: '100px',
              marginBottom: '40px',
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: theme.accent,
              }} />
              <span style={{
                color: theme.accent,
                fontSize: '11px',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                Roadmap
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(34px, 5vw, 54px)',
              fontWeight: 400,
              color: theme.text,
            }}>
              Notre <span style={{ color: theme.accent }}>trajectoire</span>
            </h2>
          </div>
        </AnimatedSection>

        <div style={{ position: 'relative' }}>
          <AnimatedSection delay={300}>
            <div style={{
              position: 'absolute',
              top: '40px',
              left: '0',
              right: '0',
              height: '2px',
              background: theme.border,
              zIndex: 0,
            }}>
              <div style={{
                width: '33%',
                height: '100%',
                background: `linear-gradient(90deg, ${theme.accent}, ${theme.accent}50)`,
                borderRadius: '2px',
                boxShadow: `0 0 20px ${theme.glow}`,
              }} />
            </div>
          </AnimatedSection>

          <div className="roadmap-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '20px',
            position: 'relative',
            zIndex: 1,
            padding: '0 20px',
          }}>
            {milestones.map((milestone, index) => (
              <AnimatedSection key={index} delay={400 + index * 100}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: milestone.status === 'done' ? theme.accent :
                      milestone.status === 'progress' ? theme.bgTertiary : theme.bg,
                    border: `2px solid ${milestone.status === 'done' ? theme.accent :
                      milestone.status === 'progress' ? theme.accent : theme.border}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    transition: 'all 0.6s ease',
                    boxShadow: milestone.status === 'done' ? `0 0 30px ${theme.glow}` :
                      milestone.status === 'progress' ? `0 0 20px ${theme.accent}30` : 'none',
                  }}>
                    {milestone.status === 'done' ? (
                      <svg width="28" height="28" viewBox="0 0 28 28" fill={theme.bg}>
                        <path d="M6 14L11 19L22 8" stroke="currentColor" strokeWidth="2.5" fill="none" />
                      </svg>
                    ) : milestone.status === 'progress' ? (
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: `2px solid ${theme.accent}`,
                        borderTopColor: 'transparent',
                        animation: 'spin 1s linear infinite',
                      }} />
                    ) : (
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '16px',
                        fontWeight: 600,
                        color: theme.textSecondary,
                      }}>
                        {milestone.phase}
                      </span>
                    )}
                  </div>

                  <h4 style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '20px',
                    color: milestone.status === 'upcoming' ? theme.textSecondary : theme.text,
                    marginBottom: '8px',
                  }}>
                    {milestone.title}
                  </h4>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px',
                    color: theme.textSecondary,
                    opacity: milestone.status === 'upcoming' ? 0.6 : 1,
                  }}>
                    {milestone.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={1000}>
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(24px, 3.5vw, 32px)',
              color: theme.text,
              maxWidth: '700px',
              margin: '0 auto',
            }}>
              IFIAAS n'est pas un projet.<br />
              <span style={{ color: theme.accent }}>IFIAAS est une infrastructure.</span>
            </p>
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) { .roadmap-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 640px) { .roadmap-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// TRUST SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const TrustSection = ({ theme }) => {
  const values = [
    { icon: '🎯', title: 'Vision long terme', desc: 'Nous construisons pour les décennies à venir, pas pour le profit immédiat.' },
    { icon: '📐', title: 'Approche structurée', desc: "Chaque plateforme est conçue comme une brique d'un édifice cohérent." },
    { icon: '🌍', title: 'Solutions terrain', desc: 'Nos solutions sont pensées pour les réalités africaines, par des Africains.' },
    { icon: '⚖️', title: 'Gouvernance claire', desc: 'Transparence, responsabilité et éthique au cœur de nos opérations.' },
    { icon: '💡', title: 'Innovation maîtrisée', desc: 'Nous innovons avec prudence, en privilégiant la fiabilité à la nouveauté.' },
    { icon: '🤝', title: 'Impact social', desc: 'Chaque décision est évaluée à travers son impact sur les communautés.' },
  ];

  return (
    <section id="trust" style={{
      padding: '160px 5%',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 24px',
              background: theme.cardBg,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.border}`,
              borderRadius: '100px',
              marginBottom: '40px',
            }}>
              <div style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: theme.accent,
              }} />
              <span style={{
                color: theme.accent,
                fontSize: '11px',
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}>
                Pourquoi nous faire confiance
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(34px, 5vw, 54px)',
              fontWeight: 400,
              color: theme.text,
            }}>
              Ce qui nous <span style={{ color: theme.accent }}>distingue</span>
            </h2>
          </div>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100% - 40px, 320px), 380px))',
          gap: '30px',
          justifyContent: 'center',
          padding: '0 20px',
        }}>
          {values.map((value, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <div style={{
                padding: '45px',
                background: theme.cardBg,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${theme.border}`,
                borderRadius: '20px',
                transition: 'all 0.5s ease',
                height: '100%',
              }}>
                <span style={{ fontSize: '40px', marginBottom: '24px', display: 'block' }}>
                  {value.icon}
                </span>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '24px',
                  color: theme.text,
                  marginBottom: '16px',
                }}>
                  {value.title}
                </h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '15px',
                  color: theme.textSecondary,
                  lineHeight: 1.8,
                }}>
                  {value.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={600}>
          <div style={{
            marginTop: '100px',
            padding: '60px',
            background: theme.cardBg,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.border}`,
            borderRadius: '24px',
            textAlign: 'center',
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '12px',
              color: theme.textSecondary,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '30px',
            }}>
              Ils nous font confiance
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '60px',
              flexWrap: 'wrap',
              opacity: 0.6,
            }}>
              {['Communauté Zinvié', 'Entreprises locales', 'Particuliers', 'Partenaires'].map((partner, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '18px',
                    color: theme.textSecondary,
                  }}
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// CONTACT SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const ContactSection = ({ theme }) => {
  const parallaxOffset = useParallax(0.15);

  return (
    <section id="contact" style={{
      padding: '160px 5%',
      background: theme.bgSecondary,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: `translate(-50%, -50%) translateY(${parallaxOffset}px)`,
        width: '800px',
        height: '800px',
        background: `radial-gradient(circle, ${theme.accent}15 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <AnimatedSection>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 24px',
            background: theme.cardBg,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.border}`,
            borderRadius: '100px',
            marginBottom: '40px',
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: theme.accent,
            }} />
            <span style={{
              color: theme.accent,
              fontSize: '11px',
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>
              Contact Direction
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(34px, 5vw, 54px)',
            fontWeight: 400,
            color: theme.text,
            marginBottom: '24px',
          }}>
            Entrons en <span style={{ color: theme.accent }}>contact</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <div style={{
            background: theme.cardBg,
            backdropFilter: 'blur(30px)',
            border: `1px solid ${theme.border}`,
            borderRadius: '32px',
            padding: '70px 50px',
            marginTop: '50px',
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${theme.accent}30, ${theme.accent}10)`,
              border: `2px solid ${theme.accent}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 30px',
              boxShadow: `0 0 40px ${theme.glow}`,
            }}>
              <span style={{ fontSize: '44px' }}>👤</span>
            </div>

            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '32px',
              color: theme.text,
              marginBottom: '8px',
            }}>
              Armel SANGAN
            </h3>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '13px',
              color: theme.accent,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '50px',
            }}>
              Promoteur & Fondateur
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              maxWidth: '450px',
              margin: '0 auto',
            }}>
              {[
                { icon: '📞', label: 'Téléphone', value: '+229 01 67 45 54 62', href: 'tel:+22901674554562' },
                { icon: '💬', label: 'WhatsApp', value: '+229 67 45 54 62', href: 'https://wa.me/22967455462' },
                { icon: '✉️', label: 'Email', value: 'info@ifiaas.com', href: 'mailto:info@ifiaas.com' },
              ].map((contact, i) => (
                <a
                  key={i}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    padding: '20px 28px',
                    background: theme.bgTertiary,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '16px',
                    textDecoration: 'none',
                    transition: 'all 0.4s ease',
                  }}
                >
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '14px',
                    background: `${theme.accent}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                  }}>
                    {contact.icon}
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '11px',
                      color: theme.textSecondary,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '6px',
                    }}>
                      {contact.label}
                    </div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '17px',
                      color: theme.text,
                      fontWeight: 500,
                    }}>
                      {contact.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={500}>
          <a
            href="mailto:info@ifiaas.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              padding: '22px 50px',
              background: theme.accent,
              color: theme.bg,
              borderRadius: '12px',
              textDecoration: 'none',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '16px',
              fontWeight: 500,
              marginTop: '60px',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            Entrer en contact avec IFIAAS
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L16 9L9 16M16 9H2" stroke="currentColor" strokeWidth="2" />
            </svg>
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────────

const Footer = ({ theme }) => {
  return (
    <footer style={{
      padding: '80px 5%',
      borderTop: `1px solid ${theme.border}`,
      background: theme.bg,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
      }}>
        <IFIAASLogo theme={theme} size="small" />

        <div style={{
          display: 'flex',
          gap: '50px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {[
            { label: 'Vision', href: '#vision' },
            { label: 'Écosystème', href: '#ecosystem' },
            { label: 'Roadmap', href: '#roadmap' },
            { label: 'Contact', href: '#contact' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                color: theme.textSecondary,
                textDecoration: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '14px',
                transition: 'color 0.3s ease',
              }}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div style={{ width: '100%', height: '1px', background: theme.border }} />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '16px',
        }}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '14px',
            color: theme.textSecondary,
          }}>
            IFIAAS © {new Date().getFullYear()} — Tous droits réservés
          </p>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            color: theme.textSecondary,
            opacity: 0.6,
          }}>
            Basé au Bénin · Présent partout en Afrique
          </p>
        </div>
      </div>
    </footer>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// APPLICATION PRINCIPALE
// ═══════════════════════════════════════════════════════════════════════════════

export default function IFIAASUltra() {
  const [currentTheme, setCurrentTheme] = useState('midnight');
  const [isLoading, setIsLoading] = useState(true);
  const theme = themes[currentTheme];

  useEffect(() => {
    const saved = localStorage.getItem('ifiaas-theme');
    if (saved && themes[saved]) {
      setCurrentTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setCurrentTheme(prefersDark ? 'midnight' : 'pureLight');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('ifiaas-theme', currentTheme);
  }, [currentTheme]);

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      color: theme.text,
      transition: 'background 0.6s ease, color 0.6s ease',
      overflowX: 'hidden',
    }}>
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: ${theme.accent}; color: ${theme.bg}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { background: ${theme.accent}40; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: ${theme.accent}; }
        @keyframes floatParticle {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.1; }
          25% { transform: translate(30px, -50px) scale(1.2); opacity: 0.3; }
          50% { transform: translate(-20px, -100px) scale(0.8); opacity: 0.2; }
          75% { transform: translate(40px, -50px) scale(1.1); opacity: 0.4; }
        }
      `}</style>

      {isLoading && (
        <Preloader theme={theme} onComplete={() => setIsLoading(false)} />
      )}

      <CustomCursor theme={theme} />
      <GrainOverlay opacity={currentTheme === 'pureLight' ? 0.02 : 0.04} />
      <ParticlesBackground theme={theme} count={40} />

      <Header theme={theme} currentTheme={currentTheme} setTheme={setCurrentTheme} />

      <main>
        <HeroSection theme={theme} />
        <VisionSection theme={theme} />
        <EcosystemSection theme={theme} />
        <StatsSection theme={theme} />
        <RoadmapSection theme={theme} />
        <TrustSection theme={theme} />
        <ContactSection theme={theme} />
      </main>

      <Footer theme={theme} />
    </div>
  );
}