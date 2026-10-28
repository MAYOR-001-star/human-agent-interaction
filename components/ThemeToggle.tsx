'use client';

import { Moon, Monitor, Sun } from 'lucide-react';
import { useCallback } from 'react';

import { useTheme } from './ThemeProvider';

type ThemeLabel = 'light' | 'dark' | 'system';

const LABELS: Record<ThemeLabel, string> = {
  light: 'Light mode',
  dark: 'Dark mode',
  system: 'System',
};

const ICONS: Record<ThemeLabel, React.ReactNode> = {
  light: <Sun className="w-4 h-4" />,
  dark: <Moon className="w-4 h-4" />,
  system: <Monitor className="w-4 h-4" />,
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const cycleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light');
  }, [setTheme, theme]);

  return (
    <button
      onClick={cycleTheme}
      aria-label={LABELS[theme]}
      title={LABELS[theme]}
      className={[
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors',
        'bg-white dark:bg-slate-800',
        'border-slate-200 dark:border-slate-700',
        'text-slate-900 dark:text-slate-300',
        'hover:bg-slate-100 dark:hover:bg-slate-700',
      ].join(' ')}
    >
      {ICONS[theme]}
      <span className="font-sans">{LABELS[theme]}</span>
    </button>
  );
}
