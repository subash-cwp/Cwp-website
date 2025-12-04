import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
}

export const LazyImage = ({ src, alt, className, placeholderClassName }: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Delay showing the image until it's fully loaded to prevent blink
  useEffect(() => {
    if (isLoaded) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => setShowImage(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden bg-muted/30", className)}>
      {/* Subtle placeholder - no animation to avoid flicker */}
      <div
        className={cn(
          "absolute inset-0 bg-muted/50 transition-opacity duration-300 ease-out",
          showImage ? "opacity-0 pointer-events-none" : "opacity-100",
          placeholderClassName
        )}
      />
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300 ease-out",
            showImage ? "opacity-100" : "opacity-0"
          )}
        />
      )}
    </div>
  );
};
