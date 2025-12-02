import { useEffect, useRef, useState } from 'react';

interface MagneticEffectOptions {
  strength?: number;
  range?: number;
}

export const useMagneticEffect = (options: MagneticEffectOptions = {}) => {
  const { strength = 0.3, range = 100 } = options;
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < range) {
        const magnetStrength = (1 - distance / range) * strength;
        setOffset({
          x: deltaX * magnetStrength,
          y: deltaY * magnetStrength,
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, range]);

  return { ref, offset };
};
