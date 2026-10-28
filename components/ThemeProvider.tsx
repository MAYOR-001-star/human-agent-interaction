'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

export type AppTheme = 'light' | 'dark' | 'system';

const ThemeContext = createContext<{
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
} | undefined>(undefined);

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function resolveTheme(theme: AppTheme): 'light' | 'dark' {
  return theme === 'system' ? getSystemTheme() : theme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'ziki-theme',
}: {
  children: ReactNode;
  defaultTheme?: AppTheme;
  storageKey?: string;
}) {
  const [theme, setThemeState] = useState<AppTheme>(defaultTheme);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        setThemeState(stored as AppTheme);
      }
    } catch {
      // localStorage unavailable; keep defaultTheme
    }
  }, [storageKey]);

  const setTheme = useCallback(
    (next: AppTheme) => {
      setThemeState(next);
      try {
        if (next === 'system') {
          window.localStorage.removeItem(storageKey);
        } else {
          window.localStorage.setItem(storageKey, next);
        }
      } catch {
        // ignore
      }
    },
    [storageKey]
  );

  const resolved = resolveTheme(theme);

  useEffect(() => {
    const root = document.documentElement;
    if (resolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolved]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
