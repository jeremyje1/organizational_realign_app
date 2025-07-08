/**
 * Advanced GSAP React Components
 * Pre-built React components with sophisticated GSAP animations
 */

'use client';

import React, { useEffect, useRef, useState, forwardRef } from 'react';
import { 
  useRevealOnScroll, 
  useStaggeredAnimation,
  useCounterAnimation,
  AnimationPresets,
  animationManager,
  gsap 
} from '@/lib/animations/gsap-animations';

// Animated Container Component
export interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideIn' | 'scaleIn' | 'rotateIn';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  triggerOnce?: boolean;
}

export const AnimatedContainer = forwardRef<HTMLDivElement, AnimatedContainerProps>(
  ({ 
    children, 
    animation = 'fadeIn', 
    direction = 'up', 
    delay = 0, 
    duration = 0.8,
    stagger = 0,
    className = '',
    triggerOnce = true 
  }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const combinedRef = ref || containerRef;

    useRevealOnScroll(combinedRef as React.RefObject<HTMLDivElement>, direction, {
      delay,
      duration,
      start: "top 80%",
      toggleActions: triggerOnce ? "play none none none" : "play none none reverse"
    });

    useEffect(() => {
      if (!combinedRef || typeof combinedRef === 'function' || !combinedRef.current) return;

      const children = combinedRef.current.children;
      if (children.length > 1 && stagger > 0) {
        gsap.set(Array.from(children), { opacity: 0, y: 30 });
        
        const scrollTrigger = animationManager.createScrollAnimation(
          Array.from(children),
          { opacity: 1, y: 0, stagger },
          { start: "top 80%" }
        );

        return () => {
          if (scrollTrigger) scrollTrigger.kill();
        };
      }
    }, [stagger, combinedRef]);

    return (
      <div ref={combinedRef} className={className}>
        {children}
      </div>
    );
  }
);

AnimatedContainer.displayName = 'AnimatedContainer';

// Animated Counter Component
export interface AnimatedCounterProps {
  from?: number;
  to: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  triggerInView?: boolean;
  decimal?: number;
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
  triggerInView = true,
  decimal = 0
}: AnimatedCounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const [hasTriggered, setHasTriggered] = useState(!triggerInView);

  useCounterAnimation(
    counterRef,
    from,
    to,
    {
      duration,
      onUpdate: (progress) => {
        if (counterRef.current) {
          const currentValue = from + (to - from) * progress;
          counterRef.current.textContent = `${prefix}${currentValue.toFixed(decimal)}${suffix}`;
        }
      }
    },
    hasTriggered
  );

  useEffect(() => {
    if (!triggerInView) {
      setHasTriggered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [triggerInView, hasTriggered]);

  return <span ref={counterRef} className={className}>{prefix}{from}{suffix}</span>;
}

// Animated Text Component
export interface AnimatedTextProps {
  text: string;
  animation?: 'typewriter' | 'fadeInWords' | 'slideInWords' | 'morphing';
  speed?: number;
  className?: string;
  onComplete?: () => void;
  morphTexts?: string[];
}

export function AnimatedText({
  text,
  animation = 'typewriter',
  speed = 50,
  className = '',
  onComplete,
  morphTexts = []
}: AnimatedTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    if (animationRef.current) {
      animationRef.current.kill();
    }

    switch (animation) {
      case 'typewriter':
        animationRef.current = AnimationPresets.typewriter(
          textRef.current,
          text,
          { duration: speed / 1000, onComplete }
        );
        break;

      case 'fadeInWords':
        const words = text.split(' ');
        textRef.current.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
        const wordElements = textRef.current.querySelectorAll('.word');
        
        gsap.set(wordElements, { opacity: 0, y: 20 });
        animationRef.current = gsap.to(wordElements, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          onComplete
        });
        break;

      case 'slideInWords':
        const slideWords = text.split(' ');
        textRef.current.innerHTML = slideWords.map(word => `<span class="word">${word}</span>`).join(' ');
        const slideWordElements = textRef.current.querySelectorAll('.word');
        
        gsap.set(slideWordElements, { x: -50, opacity: 0 });
        animationRef.current = gsap.to(slideWordElements, {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          onComplete
        });
        break;

      case 'morphing':
        if (morphTexts.length > 0) {
          animationRef.current = animationManager.createTextAnimation(
            textRef.current,
            [text, ...morphTexts],
            { duration: 2, onComplete }
          );
        }
        break;
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [text, animation, speed, onComplete, morphTexts]);

  return <span ref={textRef} className={className}>{text}</span>;
}

// Scroll Progress Indicator
export function ScrollProgressIndicator({ className = '' }: { className?: string }) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!progressRef.current) return;

    const updateProgress = () => {
      const scrolled = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / height) * 100;
      
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: `${progress}%`,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className={`fixed top-0 left-0 z-50 h-1 bg-gradient-to-r from-primary-500 to-primary-700 ${className}`}>
      <div ref={progressRef} className="h-full w-0 bg-gradient-to-r from-yellow-400 to-orange-500" />
    </div>
  );
}

// Parallax Section Component
export interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  offset?: number;
}

export function ParallaxSection({ 
  children, 
  speed = 0.5, 
  className = '',
  offset = 0 
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const parallaxEffect = animationManager.createParallaxEffect(
      [sectionRef.current],
      speed
    );

    return () => {
      if (parallaxEffect) {
        parallaxEffect.kill();
      }
    };
  }, [speed]);

  return (
    <div ref={sectionRef} className={className} style={{ transform: `translateY(${offset}px)` }}>
      {children}
    </div>
  );
}

// Morphing Card Component
export interface MorphingCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  autoMorph?: boolean;
  morphDuration?: number;
}

export function MorphingCard({ 
  children, 
  className = '',
  hoverEffect = true,
  autoMorph = false,
  morphDuration = 2 
}: MorphingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    if (autoMorph) {
      timelineRef.current = AnimationPresets.morphingCard(cardRef.current, {
        duration: morphDuration
      });
    }

    const handleMouseEnter = () => {
      if (hoverEffect && cardRef.current) {
        gsap.to(cardRef.current, {
          scale: 1.05,
          rotation: 5,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      if (hoverEffect && cardRef.current) {
        gsap.to(cardRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    if (hoverEffect && cardRef.current) {
      cardRef.current.addEventListener('mouseenter', handleMouseEnter);
      cardRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (cardRef.current) {
        cardRef.current.removeEventListener('mouseenter', handleMouseEnter);
        cardRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [hoverEffect, autoMorph, morphDuration]);

  return (
    <div ref={cardRef} className={className}>
      {children}
    </div>
  );
}

// Staggered Grid Component
export interface StaggeredGridProps {
  children: React.ReactNode;
  columns?: number;
  stagger?: number;
  animation?: 'fadeIn' | 'slideUp' | 'scaleIn' | 'rotateIn';
  className?: string;
}

export function StaggeredGrid({ 
  children, 
  columns = 3, 
  stagger = 0.1,
  animation = 'fadeIn',
  className = '' 
}: StaggeredGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useStaggeredAnimation(
    gridRef,
    '.grid-item',
    {
      opacity: 1,
      y: 0,
      scale: 1,
      rotation: 0,
      duration: 0.6,
      ease: "power2.out"
    },
    { stagger }
  );

  useEffect(() => {
    if (!gridRef.current) return;

    const items = gridRef.current.querySelectorAll('.grid-item');
    
    // Set initial states based on animation type
    switch (animation) {
      case 'fadeIn':
        gsap.set(items, { opacity: 0 });
        break;
      case 'slideUp':
        gsap.set(items, { opacity: 0, y: 50 });
        break;
      case 'scaleIn':
        gsap.set(items, { opacity: 0, scale: 0.5 });
        break;
      case 'rotateIn':
        gsap.set(items, { opacity: 0, rotation: 45 });
        break;
    }
  }, [animation]);

  return (
    <div 
      ref={gridRef} 
      className={`grid grid-cols-${columns} gap-4 ${className}`}
    >
      {React.Children.map(children, (child, index) => (
        <div key={index} className="grid-item">
          {child}
        </div>
      ))}
    </div>
  );
}

// Loading Animation Component
export interface LoadingAnimationProps {
  type?: 'spinner' | 'dots' | 'pulse' | 'wave';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

export function LoadingAnimation({ 
  type = 'spinner', 
  size = 'md', 
  color = '#3B82F6',
  className = '' 
}: LoadingAnimationProps) {
  const loadingRef = useRef<HTMLDivElement>(null);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  useEffect(() => {
    if (!loadingRef.current) return;

    let animation: gsap.core.Timeline;

    switch (type) {
      case 'spinner':
        animation = gsap.timeline({ repeat: -1 });
        animation.to(loadingRef.current, {
          rotation: 360,
          duration: 1,
          ease: "none"
        });
        break;

      case 'dots':
        const dots = loadingRef.current.querySelectorAll('.dot');
        animation = gsap.timeline({ repeat: -1 });
        animation.to(dots, {
          scale: 1.5,
          duration: 0.5,
          stagger: 0.2,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
        break;

      case 'pulse':
        animation = gsap.timeline({ repeat: -1 });
        animation.to(loadingRef.current, {
          scale: 1.2,
          duration: 0.8,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
        break;

      case 'wave':
        const bars = loadingRef.current.querySelectorAll('.bar');
        animation = gsap.timeline({ repeat: -1 });
        animation.to(bars, {
          scaleY: 2,
          duration: 0.4,
          stagger: 0.1,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        });
        break;
    }

    return () => {
      if (animation) {
        animation.kill();
      }
    };
  }, [type]);

  const renderLoading = () => {
    switch (type) {
      case 'spinner':
        return (
          <div 
            className={`${sizeClasses[size]} border-2 border-gray-300 border-t-current rounded-full`}
            style={{ borderTopColor: color }}
          />
        );

      case 'dots':
        return (
          <div className="flex space-x-1">
            {[1, 2, 3].map(i => (
              <div 
                key={i}
                className={`dot ${sizeClasses[size]} rounded-full`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div 
            className={`${sizeClasses[size]} rounded-full`}
            style={{ backgroundColor: color }}
          />
        );

      case 'wave':
        return (
          <div className="flex items-end space-x-1">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i}
                className={`bar w-1 ${sizeClasses[size].split(' ')[1]} rounded-full`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div ref={loadingRef} className={`flex items-center justify-center ${className}`}>
      {renderLoading()}
    </div>
  );
}

// Page Transition Wrapper
export interface PageTransitionProps {
  children: React.ReactNode;
  type?: 'fade' | 'slide' | 'scale';
  duration?: number;
  className?: string;
}

export function PageTransition({ 
  children, 
  type = 'fade', 
  duration = 0.5,
  className = '' 
}: PageTransitionProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;

    // Entrance animation
    switch (type) {
      case 'fade':
        gsap.fromTo(pageRef.current, 
          { opacity: 0 },
          { opacity: 1, duration, ease: "power2.out" }
        );
        break;
      case 'slide':
        gsap.fromTo(pageRef.current,
          { x: "100%", opacity: 0 },
          { x: "0%", opacity: 1, duration, ease: "power2.out" }
        );
        break;
      case 'scale':
        gsap.fromTo(pageRef.current,
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration, ease: "back.out(1.7)" }
        );
        break;
    }
  }, [type, duration]);

  return (
    <div ref={pageRef} className={className}>
      {children}
    </div>
  );
}

// Advanced Scroll Sections
export function ScrollSections({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const sections = containerRef.current.querySelectorAll('.scroll-section');
    
    sections.forEach((section, index) => {
      animationManager.createScrollAnimation(
        section,
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotation: 0
        },
        {
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
          delay: index * 0.1
        }
      );
    });

    // Set initial states
    gsap.set(sections, { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    });

  }, []);

  return (
    <div ref={containerRef}>
      {React.Children.map(children, (child, index) => (
        <div key={index} className="scroll-section">
          {child}
        </div>
      ))}
    </div>
  );
}

export default {
  AnimatedContainer,
  AnimatedCounter,
  AnimatedText,
  ScrollProgressIndicator,
  ParallaxSection,
  MorphingCard,
  StaggeredGrid,
  LoadingAnimation,
  PageTransition,
  ScrollSections
};
