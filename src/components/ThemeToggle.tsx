import { Sun, Moon, Zap } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: 'dark' as const, icon: Moon, label: 'Dark', color: 'text-blue-400' },
    { value: 'light' as const, icon: Sun, label: 'Light', color: 'text-yellow-500' },
    { value: 'neon' as const, icon: Zap, label: 'Neon', color: 'text-primary' },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-lg backdrop-blur-sm border border-border/50">
      {themes.map((t) => {
        const Icon = t.icon;
        const isActive = theme === t.value;
        
        return (
          <button
            key={t.value}
            onClick={() => setTheme(t.value)}
            className={cn(
              'relative p-2 rounded-md transition-all duration-300',
              isActive 
                ? 'bg-primary/20 text-primary scale-110' 
                : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
            )}
            aria-label={`Switch to ${t.label} theme`}
          >
            <Icon className={cn('w-4 h-4 transition-all duration-300', isActive && 'animate-pulse-glow')} />
            
            {/* Active indicator */}
            {isActive && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse-glow" />
            )}
          </button>
        );
      })}
    </div>
  );
};
