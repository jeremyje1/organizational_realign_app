'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { TextPlugin } from 'gsap/dist/TextPlugin'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

interface GSAPAnimationProps {
  children: React.ReactNode
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'scale' | 'rotate' | 'text' | 'stagger'
  duration?: number
  delay?: number
  ease?: string
  trigger?: 'scroll' | 'immediate' | 'hover'
  className?: string
  triggerElement?: string
  start?: string
  end?: string
  text?: string
  staggerDelay?: number
}

export function GSAPAnimation({
  children,
  animationType = 'fadeIn',
  duration = 1,
  delay = 0,
  ease = 'power2.out',
  trigger = 'scroll',
  className = '',
  triggerElement,
  start = 'top 80%',
  end = 'bottom 20%',
  text = '',
  staggerDelay = 0.1
}: GSAPAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const element = elementRef.current
    let animation: gsap.core.Timeline | gsap.core.Tween

    const getAnimationConfig = () => {
      const baseConfig = {
        duration,
        delay,
        ease,
      }

      switch (animationType) {
        case 'fadeIn':
          return {
            from: { opacity: 0, y: 30 },
            to: { opacity: 1, y: 0, ...baseConfig },
          }
        case 'slideUp':
          return {
            from: { opacity: 0, y: 50 },
            to: { opacity: 1, y: 0, ...baseConfig },
          }
        case 'slideLeft':
          return {
            from: { opacity: 0, x: 50 },
            to: { opacity: 1, x: 0, ...baseConfig },
          }
        case 'scale':
          return {
            from: { opacity: 0, scale: 0.8 },
            to: { opacity: 1, scale: 1, ...baseConfig },
          }
        case 'rotate':
          return {
            from: { opacity: 0, rotation: -10, scale: 0.9 },
            to: { opacity: 1, rotation: 0, scale: 1, ...baseConfig },
          }
        case 'text':
          return {
            from: { text: '' },
            to: { text, ...baseConfig },
          }
        case 'stagger':
          return {
            from: { opacity: 0, y: 30 },
            to: { opacity: 1, y: 0, ...baseConfig, stagger: staggerDelay },
          }
        default:
          return {
            from: { opacity: 0 },
            to: { opacity: 1, ...baseConfig },
          }
      }
    }

    const { from, to } = getAnimationConfig()

    // Set initial state
    gsap.set(element, from)

    if (trigger === 'scroll') {
      animation = gsap.to(element, {
        ...to,
        scrollTrigger: {
          trigger: triggerElement || element,
          start,
          end,
          toggleActions: 'play none none reverse',
          once: false,
        },
      })
    } else if (trigger === 'immediate') {
      animation = gsap.to(element, to)
    }

    return () => {
      if (animation) {
        animation.kill()
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [animationType, duration, delay, ease, trigger, triggerElement, start, end, text, staggerDelay])

  // Handle hover animations
  useEffect(() => {
    if (trigger !== 'hover' || !elementRef.current) return

    const element = elementRef.current

    const handleMouseEnter = () => {
      gsap.to(element, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [trigger])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Parallax component using GSAP
interface ParallaxProps {
  children: React.ReactNode
  speed?: number
  className?: string
  direction?: 'vertical' | 'horizontal'
}

export function ParallaxGSAP({ 
  children, 
  speed = 0.5, 
  className = '',
  direction = 'vertical' 
}: ParallaxProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!parallaxRef.current) return

    const element = parallaxRef.current

    const animation = gsap.to(element, {
      yPercent: direction === 'vertical' ? -50 * speed : 0,
      xPercent: direction === 'horizontal' ? -50 * speed : 0,
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    return () => {
      animation.kill()
    }
  }, [speed, direction])

  return (
    <div ref={parallaxRef} className={className}>
      {children}
    </div>
  )
}

// Text animation with typing effect
interface TypewriterProps {
  text: string
  speed?: number
  className?: string
  cursor?: boolean
  onComplete?: () => void
}

export function Typewriter({
  text,
  speed = 50,
  className = '',
  cursor = true,
  onComplete
}: TypewriterProps) {
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const element = textRef.current
    
    // Create timeline
    const tl = gsap.timeline({
      onComplete
    })

    // Type the text
    tl.to(element, {
      text: text,
      duration: text.length * (speed / 1000),
      ease: 'none',
    })

    // Add blinking cursor
    if (cursor) {
      const cursorElement = document.createElement('span')
      cursorElement.textContent = '|'
      cursorElement.className = 'animate-pulse'
      element.appendChild(cursorElement)

      // Remove cursor after typing
      tl.to(cursorElement, {
        opacity: 0,
        duration: 0.5,
        delay: 1,
      })
    }

    return () => {
      tl.kill()
    }
  }, [text, speed, cursor, onComplete])

  return <span ref={textRef} className={className} />
}

// Page transition animation
interface PageTransitionProps {
  children: React.ReactNode
}

export function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current

    // Page enter animation
    const tl = gsap.timeline()
    
    tl.fromTo(container, {
      opacity: 0,
      y: 50,
      scale: 0.95,
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <div ref={containerRef}>
      {children}
    </div>
  )
}

// Magnetic button effect
interface MagneticButtonProps {
  children: React.ReactNode
  strength?: number
  className?: string
  onClick?: () => void
}

export function MagneticButton({
  children,
  strength = 0.3,
  className = '',
  onClick
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!buttonRef.current) return

    const button = buttonRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      gsap.to(button, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    button.addEventListener('mousemove', handleMouseMove)
    button.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      button.removeEventListener('mousemove', handleMouseMove)
      button.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [strength])

  return (
    <button
      ref={buttonRef}
      className={`transform-gpu ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

// Scroll-triggered counter animation
interface CounterProps {
  end: number
  start?: number
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export function AnimatedCounter({
  end,
  start = 0,
  duration = 2,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0
}: CounterProps) {
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!counterRef.current) return

    const element = counterRef.current

    const animation = gsap.to({ value: start }, {
      value: end,
      duration,
      ease: 'power2.out',
      onUpdate: function() {
        const value = this.targets()[0].value
        element.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`
      },
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reset',
      },
    })

    return () => {
      animation.kill()
    }
  }, [end, start, duration, prefix, suffix, decimals])

  return <span ref={counterRef} className={className} />
}

// Stagger animation for lists
interface StaggerListProps {
  children: React.ReactNode
  stagger?: number
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'scale'
  className?: string
}

export function StaggerList({
  children,
  stagger = 0.1,
  animationType = 'fadeInUp',
  className = ''
}: StaggerListProps) {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!listRef.current) return

    const children = listRef.current.children

    const getAnimation = () => {
      switch (animationType) {
        case 'fadeInUp':
          return {
            from: { opacity: 0, y: 30 },
            to: { opacity: 1, y: 0 }
          }
        case 'fadeInLeft':
          return {
            from: { opacity: 0, x: -30 },
            to: { opacity: 1, x: 0 }
          }
        case 'scale':
          return {
            from: { opacity: 0, scale: 0.8 },
            to: { opacity: 1, scale: 1 }
          }
        default:
          return {
            from: { opacity: 0, y: 30 },
            to: { opacity: 1, y: 0 }
          }
      }
    }

    const { from, to } = getAnimation()

    // Set initial state
    gsap.set(children, from)

    // Animate with stagger
    const animation = gsap.to(children, {
      ...to,
      duration: 0.6,
      stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: listRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    })

    return () => {
      animation.kill()
    }
  }, [stagger, animationType])

  return (
    <div ref={listRef} className={className}>
      {children}
    </div>
  )
}
