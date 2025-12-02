import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export const PageTransition = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Hide loader after animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
        </div>

        <div className="flex flex-col items-center gap-4">
          <h2 className="text-2xl font-bold text-gradient-primary">Loading Experience</h2>
          
          {/* Progress bar */}
          <div className="w-64 h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary via-neon-cyan to-primary bg-[length:200%_100%] animate-border-spin transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          
          <p className="text-sm text-muted-foreground">
            {Math.floor(Math.min(progress, 100))}%
          </p>
        </div>
      </div>

      {/* Exit animation */}
      <div 
        className="absolute inset-0 bg-background transition-opacity duration-500"
        style={{ opacity: progress >= 100 ? 0 : 1 }}
      />
    </div>
  );
};
