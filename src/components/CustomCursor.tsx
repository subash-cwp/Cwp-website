import { useEffect, useRef, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const CustomCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const trailRefs = useRef<CursorPosition[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Trail animation
    const animateTrail = () => {
      // Add current position to trail
      trailRefs.current.push({ ...position });
      
      // Limit trail length
      if (trailRefs.current.length > 15) {
        trailRefs.current.shift();
      }

      animationFrameRef.current = requestAnimationFrame(animateTrail);
    };
    animateTrail();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [position]);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[9998]">
      {/* Trail particles */}
      {trailRefs.current.map((pos, index) => {
        const opacity = (index + 1) / trailRefs.current.length;
        const scale = 0.3 + (index / trailRefs.current.length) * 0.7;
        
        return (
          <div
            key={index}
            className="absolute w-2 h-2 rounded-full bg-primary transition-all duration-100"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity: opacity * 0.5,
              boxShadow: `0 0 ${10 * scale}px hsl(var(--primary) / ${opacity * 0.6})`,
            }}
          />
        );
      })}

      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="absolute w-8 h-8 rounded-full border-2 border-primary transition-all duration-200 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
          backgroundColor: isHovering ? 'hsl(var(--primary) / 0.2)' : 'transparent',
          boxShadow: isHovering 
            ? '0 0 20px hsl(var(--primary) / 0.6)' 
            : '0 0 10px hsl(var(--primary) / 0.3)',
        }}
      >
        {/* Inner dot */}
        <div 
          className="absolute top-1/2 left-1/2 w-1 h-1 bg-primary rounded-full transition-all duration-200"
          style={{
            transform: `translate(-50%, -50%) scale(${isHovering ? 0 : 1})`,
          }}
        />
      </div>
    </div>
  );
};
