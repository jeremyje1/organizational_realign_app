'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/components/providers/ThemeProvider'

interface ParticleSystemProps {
  particleCount?: number
  connectionDistance?: number
  particleSpeed?: number
  particleSize?: number
  className?: string
  interactive?: boolean
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export function ParticleSystem({
  particleCount = 50,
  connectionDistance = 100,
  particleSpeed = 0.5,
  particleSize = 2,
  className = '',
  interactive = true
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const { theme } = useTheme()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * particleSpeed,
      vy: (Math.random() - 0.5) * particleSpeed,
      size: Math.random() * particleSize + 1,
    }))
  }

  // Update particle positions
  const updateParticles = (width: number, height: number) => {
    particlesRef.current.forEach(particle => {
      particle.x += particle.vx
      particle.y += particle.vy

      // Bounce off walls
      if (particle.x <= 0 || particle.x >= width) {
        particle.vx *= -1
      }
      if (particle.y <= 0 || particle.y >= height) {
        particle.vy *= -1
      }

      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(width, particle.x))
      particle.y = Math.max(0, Math.min(height, particle.y))

      // Interactive mouse effect
      if (interactive) {
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < connectionDistance) {
          const force = (connectionDistance - distance) / connectionDistance
          particle.vx += dx * force * 0.001
          particle.vy += dy * force * 0.001
        }
      }
    })
  }

  // Draw particles and connections
  const draw = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Set colors based on theme
    const particleColor = theme === 'dark' ? 'rgba(99, 102, 241, 0.6)' : 'rgba(99, 102, 241, 0.4)'
    const connectionColor = theme === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(99, 102, 241, 0.1)'

    // Draw connections
    ctx.strokeStyle = connectionColor
    ctx.lineWidth = 0.5
    
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const particle1 = particlesRef.current[i]
        const particle2 = particlesRef.current[j]
        
        const dx = particle1.x - particle2.x
        const dy = particle1.y - particle2.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < connectionDistance) {
          const opacity = 1 - distance / connectionDistance
          ctx.globalAlpha = opacity * 0.3
          ctx.beginPath()
          ctx.moveTo(particle1.x, particle1.y)
          ctx.lineTo(particle2.x, particle2.y)
          ctx.stroke()
        }
      }
    }

    // Draw particles
    ctx.fillStyle = particleColor
    ctx.globalAlpha = 0.8
    
    particlesRef.current.forEach(particle => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
    })

    ctx.globalAlpha = 1
  }

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas

    updateParticles(width, height)
    draw(ctx, width, height)

    animationRef.current = requestAnimationFrame(animate)
  }

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas || !interactive) return

    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  // Handle resize
  const handleResize = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    
    canvas.width = width * window.devicePixelRatio
    canvas.height = height * window.devicePixelRatio
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    setDimensions({ width, height })
    initParticles(width, height)
  }

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [interactive])

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      animate()
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions, theme])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  )
}

// Animated gradient background
interface AnimatedGradientProps {
  colors?: string[]
  speed?: number
  className?: string
}

export function AnimatedGradient({
  colors = ['#0EA5E9', '#EAB308', '#10B981', '#64748B'],
  speed = 3,
  className = ''
}: AnimatedGradientProps) {
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = gradientRef.current
    if (!element) return

    const colorCount = colors.length
    let currentIndex = 0

    const updateGradient = () => {
      const nextIndex = (currentIndex + 1) % colorCount
      const color1 = colors[currentIndex]
      const color2 = colors[nextIndex]
      
      element.style.background = `linear-gradient(45deg, ${color1}, ${color2})`
      
      currentIndex = nextIndex
    }

    const interval = setInterval(updateGradient, speed * 1000)
    updateGradient() // Initial call

    return () => clearInterval(interval)
  }, [colors, speed])

  return (
    <div
      ref={gradientRef}
      className={`absolute inset-0 transition-all duration-1000 ease-in-out ${className}`}
    />
  )
}

// Simple WebGL shader background
interface ShaderBackgroundProps {
  fragmentShader?: string
  className?: string
}

export function ShaderBackground({
  fragmentShader,
  className = ''
}: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const defaultFragmentShader = `
    precision mediump float;
    uniform vec2 u_resolution;
    uniform float u_time;

    void main() {
      vec2 st = gl_FragCoord.xy / u_resolution.xy;
      
      // Create animated gradient
      vec3 color1 = vec3(0.39, 0.40, 0.95); // #6366F1
      vec3 color2 = vec3(0.55, 0.36, 0.96); // #8B5CF6
      
      float time = u_time * 0.5;
      float noise = sin(st.x * 10.0 + time) * sin(st.y * 10.0 + time) * 0.1;
      
      vec3 color = mix(color1, color2, st.y + noise);
      
      gl_FragColor = vec4(color, 0.1);
    }
  `

  const vertexShader = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    // Create and compile shaders
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      
      return shader
    }

    const vs = createShader(gl.VERTEX_SHADER, vertexShader)
    const fs = createShader(gl.FRAGMENT_SHADER, fragmentShader || defaultFragmentShader)
    
    if (!vs || !fs) return

    // Create program
    const program = gl.createProgram()
    if (!program) return

    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program))
      return
    }

    // Create buffer
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]), gl.STATIC_DRAW)

    // Get attribute and uniform locations
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const timeLocation = gl.getUniformLocation(program, 'u_time')

    // Resize function
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    // Render function
    const render = (time: number) => {
      gl.useProgram(program)
      
      // Set uniforms
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, time * 0.001)
      
      // Set attributes
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
      
      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      
      animationRef.current = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    
    render(0)

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [fragmentShader])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
