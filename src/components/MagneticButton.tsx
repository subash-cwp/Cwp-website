import { ReactNode } from 'react';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { cn } from '@/lib/utils';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  range?: number;
  [key: string]: any;
}

export const MagneticButton = ({
  children,
  className,
  strength = 0.4,
  range = 100,
  ...props
}: MagneticButtonProps) => {
  const { ref, offset } = useMagneticEffect({ strength, range });

  return (
    <div
      ref={ref as any}
      className={cn('inline-block transition-transform duration-200 ease-out', className)}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
