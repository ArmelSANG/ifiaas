import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(undefined);

export const themes = [
  { id: 'midnight', name: 'Midnight Luxury', icon: '🌙' },
  { id: 'tech-blue', name: 'Tech Blue', icon: '💎' },
  { id: 'emerald', name: 'Emerald Growth', icon: '🌿' },
  { id: 'light', name: 'Pure Light', icon: '☀️' },
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('ifiaas-theme') || 'midnight';
    }
    return 'midnight';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ifiaas-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
