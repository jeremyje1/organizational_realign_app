/**
 * Advanced GSAP Animation System
 * Comprehensive animation library with ScrollTrigger integration
 */

'use client';

import { useEffect, useRef, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';

// Import GSAP plugins (these need to be registered)
let ScrollTrigger: any = null;
let TextPlugin: any = null;
let MorphSVGPlugin: any = null;
let DrawSVGPlugin: any = null;

// Dynamic imports for client-side only
if (typeof window !== 'undefined') {
  import('gsap/ScrollTrigger').then(module => {
    ScrollTrigger = module.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  });
  
  import('gsap/TextPlugin').then(module => {
    TextPlugin = module.TextPlugin;
    gsap.registerPlugin(TextPlugin);
  });
}

// Animation Configuration Types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number | object;
  repeat?: number;
  yoyo?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: (progress: number) => void;
}

export interface ScrollAnimationConfig extends AnimationConfig {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  snap?: boolean | object;
  toggleActions?: string;
  markers?: boolean;
}

export interface TimelineConfig {
  repeat?: number;
  yoyo?: boolean;
  paused?: boolean;
  onComplete?: () => void;
  onRepeat?: () => void;
}

// Advanced Animation Manager
export class AdvancedAnimationManager {
  private timelines: Map<string, gsap.core.Timeline> = new Map();
  private scrollTriggers: gsap.plugins.ScrollTriggerInstance[] = [];
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    this.initializeManager();
  }

  private initializeManager(): void {
    // Set GSAP defaults
    gsap.defaults({
      duration: 0.6,
      ease: "power2.out"
    });

    // Initialize resize observer for responsive animations
    if (typeof window !== 'undefined' && window.ResizeObserver) {
      this.resizeObserver = new ResizeObserver(() => {
        this.refreshScrollTriggers();
      });
    }
  }

  // Create and register a timeline
  createTimeline(id: string, config: TimelineConfig = {}): gsap.core.Timeline {
    const timeline = gsap.timeline(config);
    this.timelines.set(id, timeline);
    return timeline;
  }

  // Get existing timeline
  getTimeline(id: string): gsap.core.Timeline | null {
    return this.timelines.get(id) || null;
  }

  // Remove timeline
  removeTimeline(id: string): void {
    const timeline = this.timelines.get(id);
    if (timeline) {
      timeline.kill();
      this.timelines.delete(id);
    }
  }

  // Create scroll-triggered animation
  createScrollAnimation(
    targets: string | Element | Element[],
    props: gsap.TweenVars,
    scrollConfig: ScrollAnimationConfig = {}
  ): gsap.plugins.ScrollTriggerInstance | null {
    if (!ScrollTrigger) return null;

    const scrollTrigger = ScrollTrigger.create({
      trigger: scrollConfig.trigger || targets,
      start: scrollConfig.start || "top 80%",
      end: scrollConfig.end || "bottom 20%",
      toggleActions: scrollConfig.toggleActions || "play none none reverse",
      scrub: scrollConfig.scrub || false,
      pin: scrollConfig.pin || false,
      snap: scrollConfig.snap || false,
      markers: scrollConfig.markers || false,
      animation: gsap.to(targets, {
        ...props,
        duration: scrollConfig.duration || 1,
        ease: scrollConfig.ease || "power2.out",
        onComplete: scrollConfig.onComplete,
        onStart: scrollConfig.onStart,
        onUpdate: scrollConfig.onUpdate
      }),
      onToggle: (self) => {
        if (self.isActive) {
          gsap.to(targets, { scale: 1.02, duration: 0.3 });
        } else {
          gsap.to(targets, { scale: 1, duration: 0.3 });
        }
      }
    });

    this.scrollTriggers.push(scrollTrigger);
    return scrollTrigger;
  }

  // Create staggered animations
  createStaggeredAnimation(
    targets: string | Element[],
    props: gsap.TweenVars,
    config: AnimationConfig = {}
  ): gsap.core.Tween {
    return gsap.to(targets, {
      ...props,
      duration: config.duration || 0.6,
      ease: config.ease || "power2.out",
      stagger: config.stagger || 0.1,
      delay: config.delay || 0,
      onComplete: config.onComplete,
      onStart: config.onStart
    });
  }

  // Create morphing text animation
  createTextAnimation(
    target: string | Element,
    texts: string[],
    config: AnimationConfig = {}
  ): gsap.core.Timeline {
    const timeline = gsap.timeline({
      repeat: config.repeat || -1,
      yoyo: config.yoyo || false,
      onComplete: config.onComplete
    });

    texts.forEach((text, index) => {
      timeline.to(target, {
        duration: config.duration || 2,
        text: text,
        ease: config.ease || "none",
        delay: index === 0 ? 0 : 1
      });
    });

    return timeline;
  }

  // Create parallax effect
  createParallaxEffect(
    targets: string | Element[],
    speed: number = 0.5
  ): gsap.plugins.ScrollTriggerInstance | null {
    if (!ScrollTrigger) return null;

    return ScrollTrigger.create({
      trigger: targets,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      animation: gsap.to(targets, {
        yPercent: -50 * speed,
        ease: "none"
      })
    });
  }

  // Create reveal animation
  createRevealAnimation(
    targets: string | Element[],
    direction: 'up' | 'down' | 'left' | 'right' = 'up',
    config: ScrollAnimationConfig = {}
  ): gsap.plugins.ScrollTriggerInstance | null {
    if (!ScrollTrigger) return null;

    const initialProps: gsap.TweenVars = { opacity: 0 };
    const finalProps: gsap.TweenVars = { opacity: 1 };

    switch (direction) {
      case 'up':
        initialProps.y = 50;
        finalProps.y = 0;
        break;
      case 'down':
        initialProps.y = -50;
        finalProps.y = 0;
        break;
      case 'left':
        initialProps.x = 50;
        finalProps.x = 0;
        break;
      case 'right':
        initialProps.x = -50;
        finalProps.x = 0;
        break;
    }

    // Set initial state
    gsap.set(targets, initialProps);

    return this.createScrollAnimation(targets, finalProps, {
      ...config,
      start: config.start || "top 80%"
    });
  }

  // Create counter animation
  createCounterAnimation(
    target: string | Element,
    fromValue: number,
    toValue: number,
    config: AnimationConfig = {}
  ): gsap.core.Tween {
    const obj = { value: fromValue };
    
    return gsap.to(obj, {
      value: toValue,
      duration: config.duration || 2,
      ease: config.ease || "power2.out",
      onUpdate: () => {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (element) {
          element.textContent = Math.round(obj.value).toLocaleString();
        }
        config.onUpdate?.(obj.value / toValue);
      },
      onComplete: config.onComplete
    });
  }

  // Create loading animation
  createLoadingAnimation(target: string | Element): gsap.core.Timeline {
    const timeline = gsap.timeline({ repeat: -1 });
    
    timeline
      .to(target, { rotation: 360, duration: 1, ease: "none" })
      .to(target, { scale: 1.1, duration: 0.5, yoyo: true, repeat: 1 }, 0);
    
    return timeline;
  }

  // Create page transition
  createPageTransition(
    outTarget: string | Element,
    inTarget: string | Element,
    type: 'fade' | 'slide' | 'scale' = 'fade'
  ): gsap.core.Timeline {
    const timeline = gsap.timeline();

    switch (type) {
      case 'fade':
        timeline
          .to(outTarget, { opacity: 0, duration: 0.3 })
          .set(inTarget, { opacity: 0 })
          .to(inTarget, { opacity: 1, duration: 0.3 });
        break;
      case 'slide':
        timeline
          .to(outTarget, { x: "-100%", duration: 0.5, ease: "power2.inOut" })
          .set(inTarget, { x: "100%" })
          .to(inTarget, { x: "0%", duration: 0.5, ease: "power2.inOut" }, "-=0.2");
        break;
      case 'scale':
        timeline
          .to(outTarget, { scale: 0, duration: 0.3, ease: "back.in(1.7)" })
          .set(inTarget, { scale: 0 })
          .to(inTarget, { scale: 1, duration: 0.3, ease: "back.out(1.7)" }, "-=0.1");
        break;
    }

    return timeline;
  }

  // Advanced scroll-triggered timeline
  createScrollTimeline(
    timelineId: string,
    config: ScrollAnimationConfig = {}
  ): gsap.core.Timeline | null {
    if (!ScrollTrigger) return null;

    const timeline = this.createTimeline(timelineId);
    
    ScrollTrigger.create({
      trigger: config.trigger,
      start: config.start || "top center",
      end: config.end || "bottom center",
      scrub: config.scrub || 1,
      pin: config.pin || false,
      animation: timeline,
      markers: config.markers || false,
      onUpdate: (self) => {
        config.onUpdate?.(self.progress);
      }
    });

    return timeline;
  }

  // Refresh all scroll triggers
  refreshScrollTriggers(): void {
    if (ScrollTrigger) {
      ScrollTrigger.refresh();
    }
  }

  // Kill all animations and clean up
  cleanup(): void {
    // Kill all timelines
    this.timelines.forEach(timeline => timeline.kill());
    this.timelines.clear();

    // Kill all scroll triggers
    this.scrollTriggers.forEach(trigger => trigger.kill());
    this.scrollTriggers = [];

    // Disconnect resize observer
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }

    // Kill all GSAP animations
    gsap.killTweensOf("*");
  }

  // Pause all animations
  pauseAll(): void {
    this.timelines.forEach(timeline => timeline.pause());
  }

  // Resume all animations
  resumeAll(): void {
    this.timelines.forEach(timeline => timeline.resume());
  }

  // Get animation progress
  getProgress(timelineId: string): number {
    const timeline = this.timelines.get(timelineId);
    return timeline ? timeline.progress() : 0;
  }

  // Set animation progress
  setProgress(timelineId: string, progress: number): void {
    const timeline = this.timelines.get(timelineId);
    if (timeline) {
      timeline.progress(progress);
    }
  }
}

// Singleton instance
export const animationManager = new AdvancedAnimationManager();

// React Hooks for GSAP animations
export function useGSAPAnimation() {
  useEffect(() => {
    return () => {
      // Cleanup on unmount
      animationManager.cleanup();
    };
  }, []);

  return animationManager;
}

export function useScrollAnimation(
  targets: string | Element[],
  props: gsap.TweenVars,
  config: ScrollAnimationConfig = {},
  deps: any[] = []
) {
  const animationRef = useRef<gsap.plugins.ScrollTriggerInstance | null>(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = animationManager.createScrollAnimation(targets, props, config);

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, deps);

  return animationRef.current;
}

export function useTimeline(
  id: string,
  config: TimelineConfig = {},
  deps: any[] = []
) {
  const timeline = useMemo(() => {
    animationManager.removeTimeline(id);
    return animationManager.createTimeline(id, config);
  }, deps);

  useEffect(() => {
    return () => {
      animationManager.removeTimeline(id);
    };
  }, [id]);

  return timeline;
}

export function useRevealOnScroll(
  ref: React.RefObject<Element>,
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  config: ScrollAnimationConfig = {}
) {
  useEffect(() => {
    if (!ref.current) return;

    const animation = animationManager.createRevealAnimation(
      [ref.current],
      direction,
      config
    );

    return () => {
      if (animation) {
        animation.kill();
      }
    };
  }, [ref, direction]);
}

export function useStaggeredAnimation(
  ref: React.RefObject<Element>,
  selector: string,
  props: gsap.TweenVars,
  config: AnimationConfig = {}
) {
  useEffect(() => {
    if (!ref.current) return;

    const targets = ref.current.querySelectorAll(selector);
    if (targets.length === 0) return;

    const animation = animationManager.createStaggeredAnimation(
      Array.from(targets),
      props,
      config
    );

    return () => {
      animation.kill();
    };
  }, [ref, selector]);
}

export function useCounterAnimation(
  ref: React.RefObject<Element>,
  fromValue: number,
  toValue: number,
  config: AnimationConfig = {},
  trigger: boolean = true
) {
  useEffect(() => {
    if (!ref.current || !trigger) return;

    const animation = animationManager.createCounterAnimation(
      ref.current,
      fromValue,
      toValue,
      config
    );

    return () => {
      animation.kill();
    };
  }, [ref, fromValue, toValue, trigger]);
}

// Pre-built animation presets
export const AnimationPresets = {
  // Entrance animations
  fadeInUp: (targets: string | Element[], config: ScrollAnimationConfig = {}) => 
    animationManager.createRevealAnimation(targets, 'up', config),

  fadeInDown: (targets: string | Element[], config: ScrollAnimationConfig = {}) => 
    animationManager.createRevealAnimation(targets, 'down', config),

  fadeInLeft: (targets: string | Element[], config: ScrollAnimationConfig = {}) => 
    animationManager.createRevealAnimation(targets, 'left', config),

  fadeInRight: (targets: string | Element[], config: ScrollAnimationConfig = {}) => 
    animationManager.createRevealAnimation(targets, 'right', config),

  // Attention seekers
  pulse: (targets: string | Element[], config: AnimationConfig = {}) => 
    gsap.to(targets, {
      scale: 1.1,
      duration: config.duration || 0.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: config.repeat || 3,
      onComplete: config.onComplete
    }),

  bounce: (targets: string | Element[], config: AnimationConfig = {}) => 
    gsap.to(targets, {
      y: -20,
      duration: config.duration || 0.4,
      ease: "bounce.out",
      yoyo: true,
      repeat: config.repeat || 1,
      onComplete: config.onComplete
    }),

  shake: (targets: string | Element[], config: AnimationConfig = {}) => 
    gsap.to(targets, {
      x: 10,
      duration: config.duration || 0.1,
      ease: "power2.inOut",
      yoyo: true,
      repeat: config.repeat || 5,
      onComplete: config.onComplete
    }),

  // Complex animations
  typewriter: (target: string | Element, text: string, config: AnimationConfig = {}) => {
    const timeline = gsap.timeline({ onComplete: config.onComplete });
    const chars = text.split('');
    
    gsap.set(target, { text: '' });
    
    chars.forEach((char, index) => {
      timeline.to(target, {
        duration: config.duration || 0.05,
        text: text.substring(0, index + 1),
        ease: "none"
      });
    });
    
    return timeline;
  },

  morphingCard: (target: string | Element, config: AnimationConfig = {}) => {
    const timeline = gsap.timeline({ repeat: -1, yoyo: true });
    
    timeline
      .to(target, {
        borderRadius: "50%",
        duration: config.duration || 2,
        ease: "power2.inOut"
      })
      .to(target, {
        rotation: 180,
        duration: config.duration || 1,
        ease: "power2.inOut"
      }, "-=1")
      .to(target, {
        scale: 1.2,
        duration: config.duration || 1,
        ease: "power2.inOut"
      }, "-=0.5");
    
    return timeline;
  }
};

// Export GSAP instance for direct use
export { gsap };
