import React, { useState, useEffect, useRef } from 'react';

// ═══════════════════════════════════════════════════════════════════════════════
// IFIAAS - VERSION 3.0 ULTIMATE
// Holding Digitale & Financière Panafricaine
// Design Premium Nouvelle Génération
// ═══════════════════════════════════════════════════════════════════════════════

// ─────────────────────────────────────────────────────────────────────────────────
// SYSTÈME DE THÈMES AVANCÉ
// ─────────────────────────────────────────────────────────────────────────────────

const themes = {
  aurora: {
    name: 'Aurora Nights',
    bg: '#030014',
    bgSecondary: '#070620',
    bgTertiary: '#0c0a2a',
    cardBg: 'rgba(15, 12, 50, 0.6)',
    text: '#ffffff',
    textSecondary: '#c4c1e0',
    textMuted: '#8b87b3',
    accent: '#8b5cf6',
    accentAlt: '#06b6d4',
    accentPink: '#ec4899',
    gradient: 'linear-gradient(135deg, #a78bfa 0%, #22d3ee 50%, #f472b6 100%)',
    gradientBg: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.25) 0%, transparent 50%)',
    border: 'rgba(139, 92, 246, 0.15)',
    borderHover: 'rgba(139, 92, 246, 0.4)',
    glow: '0 0 80px rgba(139, 92, 246, 0.4)',
    glowAlt: '0 0 60px rgba(6, 182, 212, 0.3)',
  },
  midnight: {
    name: 'Midnight Gold',
    bg: '#050505',
    bgSecondary: '#0a0a0a',
    bgTertiary: '#111111',
    cardBg: 'rgba(17, 17, 17, 0.6)',
    text: '#ffffff',
    textSecondary: '#b3b3b3',
    textMuted: '#808080',
    accent: '#d4af37',
    accentAlt: '#f4d03f',
    accentPink: '#d4af37',
    gradient: 'linear-gradient(135deg, #ffd700 0%, #fff4a3 50%, #ffd700 100%)',
    gradientBg: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
    border: 'rgba(212, 175, 55, 0.12)',
    borderHover: 'rgba(212, 175, 55, 0.35)',
    glow: '0 0 80px rgba(212, 175, 55, 0.3)',
    glowAlt: '0 0 60px rgba(244, 208, 63, 0.2)',
  },
  ocean: {
    name: 'Deep Ocean',
    bg: '#020617',
    bgSecondary: '#0f172a',
    bgTertiary: '#1e293b',
    cardBg: 'rgba(15, 23, 42, 0.6)',
    text: '#ffffff',
    textSecondary: '#b8c5d6',
    textMuted: '#7d8fa3',
    accent: '#0ea5e9',
    accentAlt: '#22d3ee',
    accentPink: '#38bdf8',
    gradient: 'linear-gradient(135deg, #67e8f9 0%, #a5f3fc 50%, #ffffff 100%)',
    gradientBg: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(14, 165, 233, 0.2) 0%, transparent 50%)',
    border: 'rgba(14, 165, 233, 0.12)',
    borderHover: 'rgba(14, 165, 233, 0.35)',
    glow: '0 0 80px rgba(14, 165, 233, 0.35)',
    glowAlt: '0 0 60px rgba(34, 211, 238, 0.25)',
  },
  emerald: {
    name: 'Emerald Forest',
    bg: '#021a13',
    bgSecondary: '#032d21',
    bgTertiary: '#043d2d',
    cardBg: 'rgba(3, 45, 33, 0.6)',
    text: '#ffffff',
    textSecondary: '#b8e0d2',
    textMuted: '#7fbcaa',
    accent: '#10b981',
    accentAlt: '#34d399',
    accentPink: '#6ee7b7',
    gradient: 'linear-gradient(135deg, #6ee7b7 0%, #a7f3d0 50%, #ffffff 100%)',
    gradientBg: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(16, 185, 129, 0.2) 0%, transparent 50%)',
    border: 'rgba(16, 185, 129, 0.15)',
    borderHover: 'rgba(16, 185, 129, 0.4)',
    glow: '0 0 80px rgba(16, 185, 129, 0.35)',
    glowAlt: '0 0 60px rgba(52, 211, 153, 0.25)',
  },
};

// ─────────────────────────────────────────────────────────────────────────────────
// HOOKS PERSONNALISÉS
// ─────────────────────────────────────────────────────────────────────────────────

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setIsInView(true),
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

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

const useMouseGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return position;
};

const useCountUp = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          let startTime = null;
          
          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(easeOut * end));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, started]);

  return [ref, count];
};

const useTypewriter = (texts, speed = 100, pause = 2000) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentText.slice(0, text.length + 1));
        if (text === currentText) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(currentText.slice(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, texts, speed, pause]);

  return text;
};

// ─────────────────────────────────────────────────────────────────────────────────
// COMPOSANTS UI
// ─────────────────────────────────────────────────────────────────────────────────

const GradientText = ({ children, theme }) => (
  <span style={{
    color: theme.accentAlt || theme.accent,
    fontWeight: 'inherit',
  }}>
    {children}
  </span>
);

const Badge = ({ children, icon, theme }) => (
  <div style={{
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 20px',
    background: `${theme.accent}15`,
    border: `1px solid ${theme.border}`,
    borderRadius: '100px',
    fontSize: '13px',
    fontWeight: 500,
    color: theme.accent,
    letterSpacing: '0.05em',
    backdropFilter: 'blur(10px)',
  }}>
    {icon && <span style={{ fontSize: '14px' }}>{icon}</span>}
    {children}
  </div>
);

const AnimatedSection = ({ children, delay = 0, direction = 'up' }) => {
  const [ref, isInView] = useInView(0.1);
  
  const transforms = {
    up: 'translateY(60px)',
    down: 'translateY(-60px)',
    left: 'translateX(-60px)',
    right: 'translateX(60px)',
  };

  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translate(0)' : transforms[direction],
        transition: `all 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

const GlassCard = ({ children, theme, style = {}, hover = true, glow = false }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => hover && setHovered(false)}
      style={{
        background: theme.cardBg,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? theme.borderHover : theme.border}`,
        borderRadius: '24px',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered && glow ? theme.glow : 'none',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// PRELOADER
// ─────────────────────────────────────────────────────────────────────────────────

const Preloader = ({ onComplete, theme }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading');

  useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setProgress(Math.floor(eased * 100));
      
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setPhase('complete');
        setTimeout(onComplete, 600);
      }
    };
    
    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: theme.bg,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      opacity: phase === 'complete' ? 0 : 1,
      transition: 'opacity 0.6s ease',
    }}>
      {/* Aurora Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: theme.gradientBg,
        opacity: progress / 100,
      }} />

      {/* Logo */}
      <div style={{
        position: 'relative',
        marginBottom: '50px',
        opacity: progress > 20 ? 1 : 0,
        transform: progress > 20 ? 'scale(1)' : 'scale(0.8)',
        transition: 'all 0.6s ease',
      }}>
        <img 
          src="/logo.png" 
          alt="IFIAAS" 
          style={{ 
            height: '80px',
            filter: `drop-shadow(${theme.glow})`,
          }} 
        />
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '200px',
        height: '3px',
        background: theme.border,
        borderRadius: '10px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: theme.gradient,
          borderRadius: '10px',
          transition: 'width 0.1s ease',
          boxShadow: theme.glow,
        }} />
      </div>

      {/* Percentage */}
      <p style={{
        marginTop: '20px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        color: theme.textSecondary,
        letterSpacing: '0.1em',
      }}>
        {progress}%
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────────────────────────────────────────

const Header = ({ theme, currentTheme, setTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      if (window.scrollY > 10 && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileOpen]);

  const navItems = [
    { label: 'Vision', href: '#vision' },
    { label: 'Écosystème', href: '#ecosystem' },
    { label: 'Services', href: '#services' },
    { label: 'Roadmap', href: '#roadmap' },
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
      zIndex: 1000,
      background: scrolled || mobileOpen ? `${theme.bg}ee` : 'transparent',
      backdropFilter: scrolled || mobileOpen ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${theme.border}` : 'none',
      transition: 'all 0.3s ease',
      height: mobileOpen ? '100vh' : 'auto',
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '80px',
      }}>
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => scrollTo(e, '#')}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '14px', 
            textDecoration: 'none',
          }}
        >
          <img src="/logo.png" alt="IFIAAS" style={{ height: '42px' }} />
          <span style={{ 
            fontSize: '20px', 
            fontWeight: 700, 
            color: theme.text,
            fontFamily: "'Clash Display', sans-serif",
            letterSpacing: '-0.02em',
          }}>
            IFIAAS
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '36px',
        }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              style={{
                color: theme.textSecondary,
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'color 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => e.target.style.color = theme.text}
              onMouseLeave={(e) => e.target.style.color = theme.textSecondary}
            >
              {item.label}
            </a>
          ))}

          {/* Theme Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: theme.gradient,
              }} />
            </button>

            {themeOpen && (
              <div style={{
                position: 'absolute',
                top: '50px',
                right: 0,
                background: theme.bgSecondary,
                border: `1px solid ${theme.border}`,
                borderRadius: '16px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                minWidth: '180px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              }}>
                {Object.entries(themes).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => { setTheme(key); setThemeOpen(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 14px',
                      background: currentTheme === key ? `${t.accent}20` : 'transparent',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: t.gradient,
                      boxShadow: currentTheme === key ? t.glow : 'none',
                    }} />
                    <span style={{ 
                      color: theme.text, 
                      fontSize: '13px',
                      fontWeight: currentTheme === key ? 600 : 400,
                    }}>
                      {t.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, '#contact')}
            style={{
              padding: '12px 24px',
              background: theme.gradient,
              borderRadius: '12px',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              boxShadow: theme.glow,
            }}
          >
            Nous contacter
          </a>
        </nav>

        {/* Mobile Controls */}
        <div className="mobile-controls" style={{
          display: 'none',
          alignItems: 'center',
          gap: '12px',
        }}>
          {/* Theme Button Mobile */}
          <button
            onClick={() => {
              const themeKeys = Object.keys(themes);
              const currentIndex = themeKeys.indexOf(currentTheme);
              const nextIndex = (currentIndex + 1) % themeKeys.length;
              setTheme(themeKeys[nextIndex]);
            }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{
              width: '18px',
              height: '18px',
              borderRadius: '50%',
              background: theme.gradient,
            }} />
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: theme.cardBg,
              border: `1px solid ${theme.border}`,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '5px',
            }}
          >
            <span style={{
              width: '18px',
              height: '2px',
              background: theme.text,
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: mobileOpen ? 'rotate(45deg) translateY(5px)' : 'none',
            }} />
            <span style={{
              width: '18px',
              height: '2px',
              background: theme.text,
              borderRadius: '2px',
              opacity: mobileOpen ? 0 : 1,
              transition: 'all 0.3s ease',
            }} />
            <span style={{
              width: '18px',
              height: '2px',
              background: theme.text,
              borderRadius: '2px',
              transition: 'all 0.3s ease',
              transform: mobileOpen ? 'rotate(-45deg) translateY(-5px)' : 'none',
            }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          flex: 1,
          paddingBottom: '100px',
        }}>
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => scrollTo(e, item.href)}
              style={{
                color: theme.text,
                textDecoration: 'none',
                fontSize: '28px',
                fontWeight: 600,
                fontFamily: "'Clash Display', sans-serif",
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => scrollTo(e, '#contact')}
            style={{
              marginTop: '20px',
              padding: '16px 40px',
              background: theme.gradient,
              borderRadius: '14px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Nous contacter
          </a>
        </nav>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; }
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
  const parallax = useParallax(0.3);
  const mouse = useMouseGlow();
  const typedText = useTypewriter([
    'digitale',
    'financière',
    'technologique',
    'panafricaine',
  ], 120, 2500);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
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
      {/* Aurora Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: theme.gradientBg,
        transform: `translateY(${parallax * 0.5}px)`,
      }} />

      {/* Mesh Gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(at 20% 30%, ${theme.accent}20 0px, transparent 50%),
          radial-gradient(at 80% 20%, ${theme.accentAlt}15 0px, transparent 50%),
          radial-gradient(at 40% 80%, ${theme.accentPink}10 0px, transparent 50%)
        `,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 2s ease',
      }} />

      {/* Grid Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(${theme.border} 1px, transparent 1px),
          linear-gradient(90deg, ${theme.border} 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px',
        transform: `translate(${(mouse.x - window.innerWidth / 2) * 0.02}px, ${(mouse.y - window.innerHeight / 2) * 0.02}px)`,
        opacity: 0.5,
        transition: 'transform 0.5s ease-out',
      }} />

      {/* Floating Orbs */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '10%',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.accent}30 0%, transparent 70%)`,
        filter: 'blur(60px)',
        animation: 'float 8s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${theme.accentAlt}25 0%, transparent 70%)`,
        filter: 'blur(50px)',
        animation: 'float 10s ease-in-out infinite reverse',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1100px' }}>
        {/* Badge */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
        }}>
          <Badge icon="🌍" theme={theme}>
            Holding Digitale & Financière Panafricaine
          </Badge>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: 'clamp(44px, 9vw, 90px)',
          fontWeight: 700,
          lineHeight: 1.05,
          margin: '40px 0 30px',
          letterSpacing: '-0.03em',
        }}>
          <span style={{
            display: 'block',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s',
          }}>
            Bâtir l'infrastructure
          </span>
          <span style={{
            display: 'block',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.6s',
            minHeight: '1.1em',
          }}>
            <GradientText theme={theme}>{typedText}</GradientText>
            <span style={{
              display: 'inline-block',
              width: '4px',
              height: '0.9em',
              background: theme.accent,
              marginLeft: '4px',
              animation: 'blink 1s step-end infinite',
              verticalAlign: 'middle',
            }} />
          </span>
          <span style={{
            display: 'block',
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.8s',
          }}>
            de l'Afrique
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: theme.textSecondary,
          maxWidth: '650px',
          margin: '0 auto 50px',
          lineHeight: 1.8,
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1s',
        }}>
          Nous connectons, finançons et développons l'économie africaine 
          à travers des solutions technologiques innovantes.
        </p>

        {/* CTA Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.2s',
        }}>
          <CTAButton primary theme={theme} href="#services">
            Découvrir nos services
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </CTAButton>
          <CTAButton theme={theme} href="#ecosystem">
            Notre écosystème
          </CTAButton>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          marginTop: '80px',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s ease 1.5s',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            animation: 'bounce 2s ease-in-out infinite',
          }}>
            <span style={{
              fontSize: '13px',
              color: theme.textMuted,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}>
              Découvrir
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={theme.textMuted} strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
      `}</style>
    </section>
  );
};

const CTAButton = ({ children, primary, theme, href, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        onClick && onClick();
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        padding: primary ? '18px 36px' : '16px 32px',
        background: primary ? theme.gradient : 'transparent',
        border: primary ? 'none' : `1px solid ${hovered ? theme.borderHover : theme.border}`,
        borderRadius: '14px',
        color: theme.text,
        fontSize: '15px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered && primary ? theme.glow : 'none',
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// VISION SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const VisionSection = ({ theme }) => {
  const stats = [
    { value: '2024', label: 'Fondation' },
    { value: '6+', label: 'Plateformes' },
    { value: '∞', label: 'Ambition' },
  ];

  return (
    <section id="vision" style={{
      padding: '150px 5%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Accent */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '60%',
        height: '60%',
        background: `radial-gradient(ellipse, ${theme.accent}08 0%, transparent 70%)`,
        transform: 'translate(-50%, -50%)',
      }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        {/* Header - Centered */}
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <Badge icon="🎯" theme={theme}>Notre Vision</Badge>
            
            <h2 style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginTop: '30px',
              marginBottom: '30px',
              letterSpacing: '-0.02em',
            }}>
              Transformer le <GradientText theme={theme}>paysage économique</GradientText> africain
            </h2>

            <p style={{
              fontSize: '17px',
              color: theme.textSecondary,
              lineHeight: 1.9,
              maxWidth: '700px',
              margin: '0 auto 40px',
            }}>
              IFIAAS est plus qu'une entreprise : c'est un mouvement. Nous construisons 
              les ponts technologiques et financiers qui permettront à l'Afrique de 
              réaliser son plein potentiel dans l'économie mondiale.
            </p>

            {/* Stats - Centered */}
            <div style={{
              display: 'flex',
              gap: '60px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              {stats.map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '42px',
                    fontWeight: 700,
                  }}>
                    <GradientText theme={theme}>{stat.value}</GradientText>
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: theme.textMuted,
                    marginTop: '4px',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Vision Cards - Centered Grid */}
        <AnimatedSection delay={200}>
          <div 
            className="vision-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '20px',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {[
              { icon: '🔗', title: 'Connecter', desc: 'Relier les talents et opportunités' },
              { icon: '💰', title: 'Financer', desc: 'Faciliter l\'accès aux capitaux' },
              { icon: '📈', title: 'Investir', desc: 'Soutenir les projets innovants' },
              { icon: '🚀', title: 'Développer', desc: 'Accélérer la croissance' },
            ].map((item, i) => (
              <GlassCard 
                key={i} 
                theme={theme} 
                glow
                style={{ padding: '28px', textAlign: 'center' }}
              >
                <div style={{
                  fontSize: '36px',
                  marginBottom: '16px',
                }}>
                  {item.icon}
                </div>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: 600,
                  marginBottom: '8px',
                  color: theme.text,
                }}>
                  {item.title}
                </h4>
                <p style={{
                  fontSize: '13px',
                  color: theme.textSecondary,
                  lineHeight: 1.5,
                }}>
                  {item.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </AnimatedSection>

        {/* Quote - Centered */}
        <AnimatedSection delay={400}>
          <div style={{
            marginTop: '80px',
            textAlign: 'center',
            padding: '50px',
            background: theme.cardBg,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.border}`,
            borderRadius: '24px',
          }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(20px, 3vw, 28px)',
              fontStyle: 'italic',
              color: theme.text,
              lineHeight: 1.6,
            }}>
              "Les fondations sont posées. <GradientText theme={theme}>L'avenir se construit.</GradientText>"
            </p>
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .vision-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .vision-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// ECOSYSTEM SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const EcosystemSection = ({ theme }) => {
  const platforms = [
    {
      name: 'GigaZone',
      tagline: 'Internet Haut Débit',
      description: 'Plateforme de WiFi public intelligent avec Internet haut débit et portail captif. Déployée à Zinvié et environs.',
      icon: '📡',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
      status: 'active',
      link: 'https://z.ifiaas.com',
    },
    {
      name: 'ifiMoney',
      tagline: 'Tontine Digitale',
      description: 'Plateforme de tontine digitale sécurisée pour gérer l\'épargne collective de manière transparente.',
      icon: '💰',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      status: 'active',
      link: 'https://money.ifiaas.com',
    },
    {
      name: 'Services Numériques',
      tagline: 'Solutions Digitales',
      description: 'Suite de services numériques pour faciliter les démarches administratives et commerciales.',
      icon: '🔧',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      status: 'coming',
      link: null,
    },
    {
      name: 'Investissements',
      tagline: 'Crowdfunding Africain',
      description: 'Plateforme d\'investissement participatif pour projets structurants en Afrique.',
      icon: '📈',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      status: 'coming',
      link: null,
    },
    {
      name: 'ifiMarket',
      tagline: 'Marketplace Panafricaine',
      description: 'Place de marché digitale connectant vendeurs et acheteurs à travers l\'Afrique.',
      icon: '🛒',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
      status: 'coming',
      link: null,
    },
    {
      name: 'Agriculture & Impact',
      tagline: 'AgriTech Durable',
      description: 'Solutions technologiques pour l\'agriculture et le développement durable en Afrique.',
      icon: '🌱',
      gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
      status: 'coming',
      link: null,
    },
  ];

  return (
    <section id="ecosystem" style={{
      padding: '150px 5%',
      background: theme.bgSecondary,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Effect */}
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '50%',
        height: '100%',
        background: `radial-gradient(ellipse at right, ${theme.accent}05 0%, transparent 60%)`,
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Badge icon="⚡" theme={theme}>Notre Écosystème</Badge>
            <h2 style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              marginTop: '30px',
              letterSpacing: '-0.02em',
            }}>
              6 plateformes, <GradientText theme={theme}>1 vision</GradientText>
            </h2>
            <p style={{
              fontSize: '17px',
              color: theme.textSecondary,
              maxWidth: '600px',
              margin: '20px auto 0',
              lineHeight: 1.8,
            }}>
              Un écosystème complet de solutions digitales et financières conçues pour l'Afrique.
            </p>
          </div>
        </AnimatedSection>

        {/* Grid Layout - 3 colonnes égales */}
        <div 
          className="ecosystem-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {platforms.map((platform, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <PlatformCard platform={platform} theme={theme} />
            </AnimatedSection>
          ))}
        </div>

        <style>{`
          @media (max-width: 1000px) {
            .ecosystem-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 600px) {
            .ecosystem-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

const PlatformCard = ({ platform, theme }) => {
  const [hovered, setHovered] = useState(false);

  const CardWrapper = platform.link ? 'a' : 'div';
  const cardProps = platform.link ? {
    href: platform.link,
    target: '_blank',
    rel: 'noopener noreferrer',
    style: { textDecoration: 'none' },
  } : {};

  return (
    <CardWrapper
      {...cardProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'block',
        background: theme.cardBg,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? theme.borderHover : theme.border}`,
        borderRadius: '24px',
        padding: '36px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        cursor: 'pointer',
        height: '100%',
        textDecoration: 'none',
      }}
    >
      {/* Gradient Background on Hover */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: platform.gradient,
        opacity: hovered ? 0.1 : 0,
        transition: 'opacity 0.5s ease',
      }} />

      {/* Status Badge */}
      <div style={{
        position: 'absolute',
        top: '24px',
        right: '24px',
        padding: '6px 14px',
        background: platform.status === 'active' 
          ? 'rgba(16, 185, 129, 0.15)' 
          : 'rgba(245, 158, 11, 0.15)',
        borderRadius: '100px',
        fontSize: '11px',
        fontWeight: 600,
        color: platform.status === 'active' ? '#10b981' : '#f59e0b',
        letterSpacing: '0.05em',
      }}>
        {platform.status === 'active' ? '● ACTIF' : '◐ BIENTÔT'}
      </div>

      {/* Icon */}
      <div style={{
        width: '64px',
        height: '64px',
        borderRadius: '20px',
        background: platform.gradient,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        marginBottom: '24px',
        transition: 'transform 0.4s ease',
        transform: hovered ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
        boxShadow: hovered ? `0 20px 40px ${platform.gradient.match(/#[a-f0-9]{6}/i)?.[0]}40` : 'none',
        flexShrink: 0,
      }}>
        {platform.icon}
      </div>

      {/* Content */}
      <div style={{ position: 'relative', flex: 1 }}>
        <p style={{
          fontSize: '12px',
          color: theme.accent,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '8px',
        }}>
          {platform.tagline}
        </p>
        <h3 style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '12px',
          color: theme.text,
        }}>
          {platform.name}
        </h3>
        <p style={{
          fontSize: '15px',
          color: theme.textSecondary,
          lineHeight: 1.7,
        }}>
          {platform.description}
        </p>
      </div>

      {/* Arrow / Link indicator */}
      <div style={{
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: hovered ? `${theme.accent}20` : 'transparent',
        border: `1px solid ${hovered ? theme.accent : theme.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.4s ease',
        marginTop: '24px',
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: '36px',
        right: '36px',
      }}>
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={hovered ? theme.accent : theme.textMuted} 
          strokeWidth="2"
          style={{ transition: 'stroke 0.3s ease' }}
        >
          {platform.link ? (
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
          ) : (
            <path d="M7 17L17 7M17 7H7M17 7v10"/>
          )}
        </svg>
      </div>
    </CardWrapper>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// SERVICES SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const ServicesSection = ({ theme }) => {
  const services = [
    {
      icon: '🌐',
      title: 'Création & Hébergement Web',
      description: 'Sites statiques et dynamiques, hébergement cloud sécurisé avec maintenance incluse.',
      features: ['Sites vitrines', 'E-commerce', 'Applications web', 'Hébergement cloud'],
      color: '#8b5cf6',
    },
    {
      icon: '🎨',
      title: 'Conception Graphique',
      description: 'Identité visuelle complète et création de tous types de supports visuels.',
      features: ['Logos', 'Affiches', 'Flyers', 'Bannières'],
      color: '#ec4899',
    },
    {
      icon: '💸',
      title: 'Transfert Mobile Money',
      description: 'Services de transfert rapides et sécurisés via tous les opérateurs.',
      features: ['MTN Money', 'Moov Money', 'Celtis Cash', 'International'],
      color: '#10b981',
    },
    {
      icon: '📡',
      title: 'Technicien WifiZone',
      description: 'Installation professionnelle de réseaux et vente de matériels.',
      features: ['Installation WiFi', 'Configuration', 'Équipements', 'Maintenance'],
      color: '#06b6d4',
    },
    {
      icon: '🛒',
      title: 'Commerce Général',
      description: 'Activités commerciales diversifiées pour le marché local et régional.',
      features: ['Import/Export', 'Distribution', 'Partenariats', 'Vente en gros'],
      color: '#f59e0b',
    },
  ];

  return (
    <section id="services" style={{
      padding: '150px 5%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `
          radial-gradient(at 10% 20%, ${theme.accent}08 0%, transparent 50%),
          radial-gradient(at 90% 80%, ${theme.accentAlt}05 0%, transparent 50%)
        `,
      }} />

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Badge icon="🚀" theme={theme}>Nos Services</Badge>
            <h2 style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              marginTop: '30px',
              letterSpacing: '-0.02em',
            }}>
              Solutions <GradientText theme={theme}>sur mesure</GradientText>
            </h2>
            <p style={{
              fontSize: '17px',
              color: theme.textSecondary,
              maxWidth: '600px',
              margin: '20px auto 0',
              lineHeight: 1.8,
            }}>
              Une gamme complète de services pour accompagner votre croissance digitale et commerciale.
            </p>
          </div>
        </AnimatedSection>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: '24px',
          justifyContent: 'center',
        }}>
          {services.map((service, index) => (
            <AnimatedSection key={index} delay={index * 100}>
              <ServiceCard service={service} theme={theme} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, theme }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: theme.cardBg,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? theme.borderHover : theme.border}`,
        borderRadius: '24px',
        padding: '40px',
        transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: hovered ? `0 30px 60px ${service.color}15` : 'none',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Icon */}
      <div style={{
        width: '72px',
        height: '72px',
        borderRadius: '20px',
        background: `linear-gradient(135deg, ${service.color}30, ${service.color}10)`,
        border: `1px solid ${service.color}30`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        marginBottom: '28px',
        transition: 'all 0.4s ease',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}>
        {service.icon}
      </div>

      {/* Content */}
      <h3 style={{
        fontFamily: "'Clash Display', sans-serif",
        fontSize: '22px',
        fontWeight: 700,
        marginBottom: '14px',
        color: theme.text,
      }}>
        {service.title}
      </h3>

      <p style={{
        fontSize: '15px',
        color: theme.textSecondary,
        lineHeight: 1.8,
        marginBottom: '28px',
        flex: 1,
      }}>
        {service.description}
      </p>

      {/* Features Tags */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        {service.features.map((feature, i) => (
          <span
            key={i}
            style={{
              padding: '8px 16px',
              background: `${service.color}15`,
              borderRadius: '100px',
              fontSize: '12px',
              fontWeight: 500,
              color: service.color,
              letterSpacing: '0.02em',
            }}
          >
            {feature}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// STATS SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const StatsSection = ({ theme }) => {
  const stats = [
    { value: 500, suffix: '+', label: 'Clients satisfaits', icon: '👥' },
    { value: 50, suffix: '+', label: 'Projets réalisés', icon: '✅' },
    { value: 99, suffix: '%', label: 'Satisfaction', icon: '⭐' },
    { value: 24, suffix: '/7', label: 'Support', icon: '🛡️' },
  ];

  return (
    <section id="stats" style={{
      padding: '120px 5%',
      background: theme.bgSecondary,
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <AnimatedSection>
          <div
            style={{
              padding: '60px 40px',
              background: `linear-gradient(135deg, ${theme.accent}08, ${theme.accentAlt}05)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.border}`,
              borderRadius: '24px',
            }}
          >
            <div 
              className="stats-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '40px',
              }}
            >
              {stats.map((stat, index) => (
                <StatItem key={index} stat={stat} theme={theme} />
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 500px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

const StatItem = ({ stat, theme }) => {
  const [ref, count] = useCountUp(stat.value, 2000);

  return (
    <div ref={ref} style={{ textAlign: 'center', padding: '20px 10px' }}>
      <div style={{ fontSize: '36px', marginBottom: '16px' }}>
        {stat.icon}
      </div>
      <div style={{
        fontFamily: "'Clash Display', sans-serif",
        fontSize: 'clamp(40px, 6vw, 56px)',
        fontWeight: 700,
        marginBottom: '12px',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>
        <GradientText theme={theme}>{count}{stat.suffix}</GradientText>
      </div>
      <p style={{
        fontSize: '15px',
        color: theme.textSecondary,
        fontWeight: 500,
      }}>
        {stat.label}
      </p>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// ROADMAP SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const RoadmapSection = ({ theme }) => {
  const roadmap = [
    {
      year: '2024',
      quarter: 'Q1-Q2',
      title: 'Connexion',
      items: ['Création IFIAAS', 'Lancement GigaZone', 'Déploiement Zinvié'],
      status: 'completed',
    },
    {
      year: '2024',
      quarter: 'Q3-Q4',
      title: 'Finance',
      items: ['Lancement ifiMoney', 'Tontine digitale', 'Premiers utilisateurs'],
      status: 'completed',
    },
    {
      year: '2025',
      quarter: 'Q1-Q2',
      title: 'Services',
      items: ['Services Numériques', 'Extension réseau', 'Partenariats B2B'],
      status: 'current',
    },
    {
      year: '2025',
      quarter: 'Q3-Q4',
      title: 'Expansion',
      items: ['Investissements', 'ifiMarket beta', 'Agriculture & Impact'],
      status: 'upcoming',
    },
  ];

  const statusColors = {
    completed: '#10b981',
    current: theme.accent,
    upcoming: theme.textMuted,
  };

  return (
    <section id="roadmap" style={{
      padding: '150px 5%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Badge icon="🗓️" theme={theme}>Roadmap</Badge>
            <h2 style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              marginTop: '30px',
              letterSpacing: '-0.02em',
            }}>
              Notre <GradientText theme={theme}>trajectoire</GradientText>
            </h2>
          </div>
        </AnimatedSection>

        {/* Timeline Container */}
        <div style={{ position: 'relative' }}>
          {/* Connecting Line - Desktop */}
          <div 
            className="roadmap-line"
            style={{
              position: 'absolute',
              top: '10px',
              left: '0',
              right: '0',
              height: '3px',
              background: theme.border,
              zIndex: 0,
              borderRadius: '2px',
            }}
          >
            <div style={{
              width: '62.5%',
              height: '100%',
              background: theme.gradient,
              borderRadius: '2px',
            }} />
          </div>

          {/* Cards Grid */}
          <div 
            className="roadmap-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '24px',
            }}
          >
            {roadmap.map((item, index) => (
              <AnimatedSection key={index} delay={index * 150}>
                <RoadmapCard item={item} theme={theme} statusColors={statusColors} />
              </AnimatedSection>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .roadmap-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 30px !important;
            }
            .roadmap-line {
              display: none !important;
            }
          }
          @media (max-width: 550px) {
            .roadmap-grid {
              grid-template-columns: 1fr !important;
              max-width: 350px;
              margin: 0 auto;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

const RoadmapCard = ({ item, theme, statusColors }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Status Dot */}
      <div style={{
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        background: item.status === 'current' ? theme.gradient : statusColors[item.status],
        border: `4px solid ${theme.bg}`,
        marginBottom: '24px',
        boxShadow: item.status === 'current' ? theme.glow : `0 0 0 3px ${theme.bgSecondary}`,
        transition: 'transform 0.3s ease',
        transform: hovered ? 'scale(1.4)' : 'scale(1)',
        position: 'relative',
        zIndex: 2,
        flexShrink: 0,
      }} />

      {/* Card */}
      <div
        style={{
          width: '100%',
          padding: '28px 24px',
          background: theme.cardBg,
          backdropFilter: 'blur(20px)',
          border: `1px solid ${hovered ? theme.borderHover : theme.border}`,
          borderRadius: '20px',
          textAlign: 'center',
          opacity: item.status === 'upcoming' ? 0.7 : 1,
          transition: 'all 0.4s ease',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: item.status === 'current' && hovered ? theme.glow : 'none',
        }}
      >
        <p style={{
          fontSize: '12px',
          color: statusColors[item.status],
          fontWeight: 600,
          letterSpacing: '0.1em',
          marginBottom: '8px',
        }}>
          {item.year} • {item.quarter}
        </p>
        <h4 style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: '20px',
          fontWeight: 700,
          marginBottom: '16px',
          color: theme.text,
        }}>
          {item.title}
        </h4>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}>
          {item.items.map((point, i) => (
            <li key={i} style={{
              fontSize: '13px',
              color: theme.textSecondary,
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: 'center',
            }}>
              <span style={{ 
                color: statusColors[item.status],
                fontSize: '10px',
              }}>
                {item.status === 'completed' ? '✓' : item.status === 'current' ? '●' : '○'}
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// TRUST SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const TrustSection = ({ theme }) => {
  const features = [
    { icon: '🔒', title: 'Sécurité', desc: 'Données protégées par les dernières technologies' },
    { icon: '⚡', title: 'Rapidité', desc: 'Services livrés dans les meilleurs délais' },
    { icon: '🎯', title: 'Précision', desc: 'Solutions adaptées à vos besoins spécifiques' },
    { icon: '🤝', title: 'Confiance', desc: 'Partenariats durables et transparents' },
    { icon: '💰', title: 'Accessibilité', desc: 'Tarifs compétitifs sans compromis qualité' },
    { icon: '🌍', title: 'Local & Global', desc: 'Ancré au Bénin, connecté au monde' },
  ];

  return (
    <section style={{
      padding: '150px 5%',
      background: theme.bgSecondary,
      position: 'relative',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <Badge icon="✨" theme={theme}>Pourquoi nous choisir</Badge>
            <h2 style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 700,
              marginTop: '30px',
              letterSpacing: '-0.02em',
            }}>
              La <GradientText theme={theme}>confiance</GradientText> avant tout
            </h2>
          </div>
        </AnimatedSection>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 80}>
              <TrustCard feature={feature} theme={theme} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

const TrustCard = ({ feature, theme }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '36px',
        background: hovered ? `${theme.accent}08` : 'transparent',
        border: `1px solid ${hovered ? theme.borderHover : theme.border}`,
        borderRadius: '20px',
        transition: 'all 0.4s ease',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '20px',
      }}
    >
      <div style={{
        fontSize: '36px',
        transition: 'transform 0.3s ease',
        transform: hovered ? 'scale(1.2)' : 'scale(1)',
      }}>
        {feature.icon}
      </div>
      <div>
        <h4 style={{
          fontSize: '18px',
          fontWeight: 600,
          marginBottom: '8px',
          color: theme.text,
        }}>
          {feature.title}
        </h4>
        <p style={{
          fontSize: '14px',
          color: theme.textSecondary,
          lineHeight: 1.7,
        }}>
          {feature.desc}
        </p>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// CONTACT SECTION
// ─────────────────────────────────────────────────────────────────────────────────

const ContactSection = ({ theme }) => {
  return (
    <section id="contact" style={{
      padding: '150px 5%',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: `radial-gradient(circle, ${theme.accent}15 0%, transparent 60%)`,
        filter: 'blur(80px)',
      }} />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        <AnimatedSection>
          <GlassCard 
            theme={theme}
            hover={false}
            style={{
              padding: '80px 60px',
              textAlign: 'center',
              background: `linear-gradient(135deg, ${theme.accent}10, ${theme.accentAlt}08)`,
            }}
          >
            <Badge icon="📬" theme={theme}>Contact</Badge>

            <h2 style={{
              fontFamily: "'Clash Display', sans-serif",
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              marginTop: '30px',
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}>
              Prêt à démarrer votre <GradientText theme={theme}>projet</GradientText> ?
            </h2>

            <p style={{
              fontSize: '17px',
              color: theme.textSecondary,
              maxWidth: '500px',
              margin: '0 auto 40px',
              lineHeight: 1.8,
            }}>
              Contactez-nous dès maintenant. Notre équipe est prête à vous accompagner 
              dans tous vos projets digitaux et financiers.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '50px',
            }}>
              <CTAButton primary theme={theme} href="https://wa.me/22967455462">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </CTAButton>
              <CTAButton theme={theme} href="mailto:contact@ifiaas.com">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
                Email
              </CTAButton>
            </div>

            {/* Contact Info */}
            <div style={{
              paddingTop: '40px',
              borderTop: `1px solid ${theme.border}`,
              display: 'flex',
              justifyContent: 'center',
              gap: '60px',
              flexWrap: 'wrap',
            }}>
              {[
                { label: 'Téléphone', value: '+229 67 45 54 62' },
                { label: 'Email', value: 'contact@ifiaas.com' },
                { label: 'Localisation', value: 'Bénin, Afrique' },
              ].map((info, i) => (
                <div key={i}>
                  <p style={{ 
                    fontSize: '12px', 
                    color: theme.textMuted, 
                    marginBottom: '6px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    {info.label}
                  </p>
                  <p style={{ 
                    fontSize: '16px', 
                    color: theme.text, 
                    fontWeight: 600,
                  }}>
                    {info.value}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────────────────────────────────────────

const Footer = ({ theme }) => {
  const socials = [
    { icon: 'twitter', path: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
    { icon: 'instagram', path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2h11A4.5 4.5 0 0122 6.5v11a4.5 4.5 0 01-4.5 4.5h-11A4.5 4.5 0 012 17.5v-11A4.5 4.5 0 016.5 2z' },
    { icon: 'linkedin', path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z' },
  ];

  return (
    <footer style={{
      padding: '60px 5%',
      borderTop: `1px solid ${theme.border}`,
      background: theme.bg,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src="/logo.png" alt="IFIAAS" style={{ height: '36px' }} />
          <span style={{ 
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 700, 
            fontSize: '18px',
            color: theme.text,
          }}>
            IFIAAS
          </span>
        </div>

        {/* Copyright */}
        <p style={{ fontSize: '14px', color: theme.textMuted }}>
          © 2025 IFIAAS. Tous droits réservés.
        </p>

        {/* Socials */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {socials.map((social, i) => (
            <a
              key={i}
              href="#"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = theme.accent;
                e.currentTarget.style.background = `${theme.accent}15`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = theme.border;
                e.currentTarget.style.background = theme.cardBg;
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={theme.textSecondary} strokeWidth="2">
                <path d={social.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// WHATSAPP BUTTON
// ─────────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────────
// AI ASSISTANT - Assistant IA Éducatif
// ─────────────────────────────────────────────────────────────────────────────────

const AIAssistant = ({ theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "👋 Bonjour ! Je suis l'assistant IA d'IFIAAS. Je peux vous renseigner sur nos services, nos plateformes et notre vision. Comment puis-je vous aider ?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Base de connaissances IFIAAS
  const knowledgeBase = {
    ifiaas: "IFIAAS (Infrastructure Financière et Informatique pour l'Afrique et l'Autonomisation Sociale) est une holding digitale et financière panafricaine fondée en 2024. Notre mission est de bâtir l'infrastructure digitale et financière de l'Afrique à travers des solutions technologiques innovantes.",
    
    gigazone: "GigaZone est notre plateforme de WiFi public intelligent. Elle offre Internet haut débit, un portail captif et des services numériques. Actuellement déployée à Zinvié et ses environs au Bénin. 🌐 Visitez : https://z.ifiaas.com",
    
    ifimoney: "ifiMoney est notre plateforme de tontine digitale sécurisée. Elle permet aux communautés de gérer leur épargne collective de manière transparente et efficace. C'est une solution moderne pour l'épargne traditionnelle africaine. 💰 Visitez : https://money.ifiaas.com",
    
    services: "IFIAAS propose 5 services principaux :\n\n🌐 **Création & Hébergement Web** - Sites et applications\n🎨 **Conception Graphique** - Logos, affiches, identité visuelle\n💸 **Transfert Mobile Money** - MTN, Moov, Celtis Cash\n📡 **Technicien WifiZone** - Installation réseau\n🛒 **Commerce Général** - Import/Export",
    
    plateformes: "Notre écosystème comprend 6 plateformes :\n\n✅ **GigaZone** - WiFi public (Actif)\n✅ **ifiMoney** - Tontine digitale (Actif)\n🔜 **Services Numériques** - En développement\n🔜 **Investissements** - Crowdfunding\n🔜 **ifiMarket** - Marketplace\n🔜 **Agriculture & Impact** - AgriTech",
    
    contact: "Vous pouvez nous contacter via :\n\n📱 **WhatsApp** : +229 67 45 54 62\n📧 **Email** : contact@ifiaas.com\n📍 **Localisation** : Bénin, Afrique\n\nNotre équipe est disponible 7j/7 !",
    
    vision: "Notre vision est de transformer le paysage économique africain en construisant les ponts technologiques et financiers qui permettront à l'Afrique de réaliser son plein potentiel dans l'économie mondiale. Nous connectons, finançons, investissons et développons !",
    
    tontine: "La tontine est un système d'épargne collective traditionnel en Afrique. Avec ifiMoney, nous digitalisons ce concept pour le rendre plus sûr, transparent et accessible. Les membres peuvent épargner ensemble et bénéficier de fonds à tour de rôle.",
    
    wifi: "Notre service GigaZone offre :\n\n📶 Internet haut débit\n🔐 Portail captif sécurisé\n💻 Services numériques intégrés\n🏘️ Couverture locale (Zinvié)\n💰 Tarifs accessibles\n\nIdéal pour les particuliers et entreprises !",
  };

  const findAnswer = (question) => {
    const q = question.toLowerCase();
    
    // Salutations
    if (q.match(/bonjour|salut|hello|hi|coucou|bonsoir/)) {
      return "Bonjour ! 😊 Ravi de vous accueillir. Je suis là pour répondre à toutes vos questions sur IFIAAS. Que souhaitez-vous savoir ?";
    }
    
    // IFIAAS général
    if (q.match(/ifiaas|c'est quoi|qui êtes|présent|entreprise|société|holding/)) {
      return knowledgeBase.ifiaas;
    }
    
    // GigaZone
    if (q.match(/gigazone|giga|wifi|internet|connexion|réseau/)) {
      return knowledgeBase.gigazone;
    }
    
    // ifiMoney
    if (q.match(/ifimoney|money|tontine|épargne|économ/)) {
      return knowledgeBase.ifimoney;
    }
    
    // Tontine spécifique
    if (q.match(/tontine|cotisation|épargne collective/)) {
      return knowledgeBase.tontine;
    }
    
    // Services
    if (q.match(/service|offre|propose|fait|activité/)) {
      return knowledgeBase.services;
    }
    
    // Plateformes
    if (q.match(/plateforme|écosystème|produit|solution/)) {
      return knowledgeBase.plateformes;
    }
    
    // Contact
    if (q.match(/contact|joindre|téléphone|whatsapp|email|adresse|où/)) {
      return knowledgeBase.contact;
    }
    
    // Vision/Mission
    if (q.match(/vision|mission|objectif|but|pourquoi|valeur/)) {
      return knowledgeBase.vision;
    }
    
    // WiFi détaillé
    if (q.match(/wifi|haut débit|portail|zinvié/)) {
      return knowledgeBase.wifi;
    }
    
    // Prix/Tarifs
    if (q.match(/prix|tarif|coût|combien|gratuit|payer/)) {
      return "Pour connaître nos tarifs détaillés, je vous invite à nous contacter directement :\n\n📱 WhatsApp : +229 67 45 54 62\n📧 Email : contact@ifiaas.com\n\nNos équipes vous feront un devis personnalisé selon vos besoins !";
    }
    
    // Merci
    if (q.match(/merci|thanks|super|génial|parfait/)) {
      return "Avec plaisir ! 😊 N'hésitez pas si vous avez d'autres questions. IFIAAS est là pour vous accompagner dans votre transformation digitale ! 🚀";
    }
    
    // Au revoir
    if (q.match(/bye|revoir|bientôt|ciao/)) {
      return "Au revoir ! 👋 Merci de votre intérêt pour IFIAAS. N'hésitez pas à revenir si vous avez d'autres questions. À bientôt !";
    }
    
    // Réponse par défaut
    return "Je ne suis pas sûr de comprendre votre question. 🤔\n\nVoici ce que je peux vous expliquer :\n\n• **IFIAAS** - Notre holding\n• **GigaZone** - WiFi public\n• **ifiMoney** - Tontine digitale\n• **Services** - Nos prestations\n• **Contact** - Nous joindre\n\nPouvez-vous reformuler ou choisir un sujet ?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simuler un délai de réponse
    setTimeout(() => {
      const answer = findAnswer(input);
      setMessages((prev) => [...prev, { role: 'assistant', content: answer }]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "C'est quoi IFIAAS ?",
    "Parlez-moi de GigaZone",
    "Comment fonctionne ifiMoney ?",
    "Vos services ?",
    "Comment vous contacter ?",
  ];

  return (
    <>
      {/* Chat Window */}
      <div style={{
        position: 'fixed',
        bottom: '170px',
        right: '30px',
        width: '380px',
        maxWidth: 'calc(100vw - 40px)',
        height: '500px',
        maxHeight: 'calc(100vh - 280px)',
        background: theme.bg,
        border: `1px solid ${theme.border}`,
        borderRadius: '24px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        overflow: 'hidden',
        zIndex: 1001,
      }}>
        {/* Header */}
        <div style={{
          padding: '20px',
          background: theme.bgSecondary,
          borderBottom: `1px solid ${theme.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: theme.gradient,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}>
              🤖
            </div>
            <div>
              <h4 style={{ 
                fontSize: '15px', 
                fontWeight: 600, 
                color: theme.text,
                marginBottom: '2px',
              }}>
                Assistant IFIAAS
              </h4>
              <p style={{ fontSize: '12px', color: theme.textMuted }}>
                <span style={{ 
                  display: 'inline-block',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981',
                  marginRight: '6px',
                }} />
                En ligne
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'transparent',
              border: `1px solid ${theme.border}`,
              color: theme.textMuted,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              transition: 'all 0.2s ease',
            }}
          >
            ×
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div style={{
                maxWidth: '85%',
                padding: '12px 16px',
                borderRadius: msg.role === 'user' 
                  ? '18px 18px 4px 18px' 
                  : '18px 18px 18px 4px',
                background: msg.role === 'user' 
                  ? theme.gradient 
                  : theme.bgSecondary,
                color: theme.text,
                fontSize: '14px',
                lineHeight: 1.6,
                whiteSpace: 'pre-wrap',
              }}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {/* Typing indicator */}
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{
                padding: '12px 16px',
                borderRadius: '18px 18px 18px 4px',
                background: theme.bgSecondary,
                display: 'flex',
                gap: '4px',
              }}>
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: theme.textMuted,
                  animation: 'bounce 1.4s ease-in-out infinite',
                }} />
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: theme.textMuted,
                  animation: 'bounce 1.4s ease-in-out 0.2s infinite',
                }} />
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: theme.textMuted,
                  animation: 'bounce 1.4s ease-in-out 0.4s infinite',
                }} />
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 2 && (
          <div style={{
            padding: '0 20px 12px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => {
                  setInput(q);
                  setTimeout(() => handleSend(), 100);
                }}
                style={{
                  padding: '8px 12px',
                  background: theme.bgSecondary,
                  border: `1px solid ${theme.border}`,
                  borderRadius: '100px',
                  color: theme.textSecondary,
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = theme.accent;
                  e.target.style.color = theme.text;
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = theme.border;
                  e.target.style.color = theme.textSecondary;
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: '16px 20px',
          borderTop: `1px solid ${theme.border}`,
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez votre question..."
            style={{
              flex: 1,
              padding: '12px 16px',
              background: theme.bgSecondary,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              color: theme.text,
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = theme.accent}
            onBlur={(e) => e.target.style.borderColor = theme.border}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: input.trim() ? theme.gradient : theme.bgSecondary,
              border: 'none',
              color: '#fff',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              opacity: input.trim() ? 1 : 0.5,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: '100px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: isOpen ? theme.bgSecondary : theme.gradient,
          border: isOpen ? `1px solid ${theme.border}` : 'none',
          boxShadow: isOpen ? 'none' : theme.glow,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          transition: 'all 0.3s ease',
          zIndex: 1000,
        }}
      >
        {isOpen ? '✕' : '🤖'}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-4px); }
        }
      `}</style>
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// WHATSAPP BUTTON
// ─────────────────────────────────────────────────────────────────────────────────

const WhatsAppButton = ({ theme }) => {
  const [hovered, setHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(true), 3000);
    const hide = setTimeout(() => setShowTooltip(false), 8000);
    return () => { clearTimeout(timer); clearTimeout(hide); };
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 999,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    }}>
      {/* Tooltip */}
      <div style={{
        padding: '12px 18px',
        background: theme.cardBg,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${theme.border}`,
        borderRadius: '14px',
        opacity: showTooltip || hovered ? 1 : 0,
        transform: showTooltip || hovered ? 'translateX(0)' : 'translateX(20px)',
        transition: 'all 0.4s ease',
        pointerEvents: 'none',
      }}>
        <p style={{ fontSize: '14px', color: theme.text, margin: 0, whiteSpace: 'nowrap' }}>
          💬 Besoin d'aide ?
        </p>
      </div>

      {/* Button */}
      <a
        href="https://wa.me/22967455462?text=Bonjour%20IFIAAS%2C%20je%20souhaite%20avoir%20plus%20d%27informations."
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: '#25D366',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hovered 
            ? '0 10px 40px rgba(37, 211, 102, 0.5)' 
            : '0 5px 25px rgba(37, 211, 102, 0.3)',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 0.3s ease',
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// SCROLL TO TOP
// ─────────────────────────────────────────────────────────────────────────────────

const ScrollToTop = ({ theme }) => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const toggle = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggle, { passive: true });
    return () => window.removeEventListener('scroll', toggle);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'fixed',
        bottom: '170px',
        right: '38px',
        zIndex: 998,
        width: '46px',
        height: '46px',
        borderRadius: '50%',
        background: hovered ? `${theme.accent}20` : theme.cardBg,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${hovered ? theme.accent : theme.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible 
          ? (hovered ? 'translateY(-4px)' : 'translateY(0)') 
          : 'translateY(20px)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <svg 
        width="18" 
        height="18" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={hovered ? theme.accent : theme.text} 
        strokeWidth="2"
        style={{ transition: 'stroke 0.3s ease' }}
      >
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  );
};

// ─────────────────────────────────────────────────────────────────────────────────
// APP PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────────

export default function IFIAASV3() {
  const [currentTheme, setCurrentTheme] = useState('aurora');
  const [isLoading, setIsLoading] = useState(true);
  const theme = themes[currentTheme];

  useEffect(() => {
    const saved = localStorage.getItem('ifiaas-theme-v3');
    if (saved && themes[saved]) setCurrentTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('ifiaas-theme-v3', currentTheme);
  }, [currentTheme]);

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      color: theme.text,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      transition: 'background 0.5s ease, color 0.5s ease',
    }}>
      {/* Fonts */}
      <link 
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" 
        rel="stylesheet" 
      />
      <link
        href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        rel="stylesheet"
      />

      {/* Global Styles */}
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { 
          overflow-x: hidden; 
          background: ${theme.bg};
          color: ${theme.text};
          transition: background 0.5s ease, color 0.5s ease;
        }
        ::selection { background: ${theme.accent}; color: white; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${theme.bg}; }
        ::-webkit-scrollbar-thumb { 
          background: ${theme.border}; 
          border-radius: 4px; 
        }
        ::-webkit-scrollbar-thumb:hover { 
          background: ${theme.accent}; 
        }
      `}</style>

      {/* Preloader */}
      {isLoading && (
        <Preloader theme={theme} onComplete={() => setIsLoading(false)} />
      )}

      {/* Header */}
      <Header 
        theme={theme} 
        currentTheme={currentTheme} 
        setTheme={setCurrentTheme} 
      />

      {/* Main Content */}
      <main>
        <HeroSection theme={theme} />
        <VisionSection theme={theme} />
        <EcosystemSection theme={theme} />
        <ServicesSection theme={theme} />
        <StatsSection theme={theme} />
        <RoadmapSection theme={theme} />
        <TrustSection theme={theme} />
        <ContactSection theme={theme} />
      </main>

      {/* Footer */}
      <Footer theme={theme} />

      {/* Floating Elements */}
      <AIAssistant theme={theme} />
      <WhatsAppButton theme={theme} />
      <ScrollToTop theme={theme} />
    </div>
  );
}
