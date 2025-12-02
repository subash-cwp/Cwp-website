import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  animation?: 'slide-up' | 'slide-in-left' | 'slide-in-right' | 'scale-in' | 'fade-in';
  delay?: number;
  className?: string;
  threshold?: number;
}

export const ScrollAnimationWrapper = ({
  children,
  animation = 'slide-up',
  delay = 0,
  className,
  threshold = 0.1,
}: ScrollAnimationWrapperProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const animationClasses = {
    'slide-up': 'animate-slide-up',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right',
    'scale-in': 'animate-scale-in',
    'fade-in': 'animate-fade-in',
  };

  return (
    <div
      ref={ref as any}
      className={cn(
        'transition-all duration-700',
        isVisible && animationClasses[animation],
        className
      )}
      style={{
        animationDelay: isVisible ? `${delay}ms` : '0ms',
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};
