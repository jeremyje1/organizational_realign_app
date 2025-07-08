/* filepath: /components/three/ThreeComponents.tsx */

'use client';

import React, { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Text3D, 
  Center,
  Float,
  MeshDistortMaterial,
  Sphere,
  Box,
  Plane
} from '@react-three/drei';
import * as THREE from 'three';
import { webglManager, WebGLCapabilities } from '@/lib/three/webgl-manager';

interface ThreeJSProviderProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ParticleBackgroundProps {
  count?: number;
  size?: number;
  color?: string;
  speed?: number;
  opacity?: number;
}

interface MorphingSphereProps {
  position?: [number, number, number];
  color?: string;
  intensity?: number;
  speed?: number;
}

interface FloatingElementsProps {
  count?: number;
  spread?: number;
  speed?: number;
}

interface Interactive3DButtonProps {
  text: string;
  onClick?: () => void;
  position?: [number, number, number];
  color?: string;
  hoverColor?: string;
}

interface HeroBackgroundProps {
  variant?: 'particles' | 'geometric' | 'abstract';
  interactive?: boolean;
  performance?: 'high' | 'medium' | 'low';
}

/**
 * WebGL Feature Detection Hook
 */
export function useWebGLCapabilities() {
  const [capabilities, setCapabilities] = useState<WebGLCapabilities | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const detectCapabilities = async () => {
      try {
        const canvas = document.createElement('canvas');
        const caps = await webglManager.initialize(canvas);
        setCapabilities(caps);
      } catch (error) {
        console.warn('WebGL detection failed:', error);
        setCapabilities({
          supported: false,
          maxTextureSize: 0,
          extensions: [],
          renderer: 'fallback',
          vendor: 'unknown',
          precision: 'low',
        });
      } finally {
        setLoading(false);
      }
    };

    detectCapabilities();
  }, []);

  return { capabilities, loading };
}

/**
 * Animated Particle Background
 */
function ParticleBackground({ 
  count = 1000, 
  size = 2, 
  color = '#4f46e5',
  speed = 0.5,
  opacity = 0.6 
}: ParticleBackgroundProps) {
  const meshRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * viewport.width * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;
      
      velocities[i3] = (Math.random() - 0.5) * speed;
      velocities[i3 + 1] = (Math.random() - 0.5) * speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * speed;
    }
    
    return { positions, velocities };
  }, [count, speed, viewport]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particles.velocities.length; i += 3) {
      positions[i] += particles.velocities[i] * 0.01;
      positions[i + 1] += particles.velocities[i + 1] * 0.01;
      positions[i + 2] += particles.velocities[i + 2] * 0.01;
      
      // Wrap around edges
      if (Math.abs(positions[i]) > viewport.width) positions[i] *= -1;
      if (Math.abs(positions[i + 1]) > viewport.height) positions[i + 1] *= -1;
      if (Math.abs(positions[i + 2]) > 10) positions[i + 2] *= -1;
    }
    
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = time * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        transparent
        opacity={opacity}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/**
 * Morphing Sphere with Distortion
 */
function MorphingSphere({ 
  position = [0, 0, 0], 
  color = '#4f46e5',
  intensity = 0.5,
  speed = 1
}: MorphingSphereProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * speed * 0.2;
    meshRef.current.rotation.y = time * speed * 0.3;
    
    // Breathing effect
    const scale = 1 + Math.sin(time * speed) * 0.1;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <Sphere ref={meshRef} args={[2, 64, 64]} position={position}>
      <MeshDistortMaterial
        color={color}
        transparent
        opacity={0.8}
        distort={intensity}
        speed={speed * 2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>
  );
}

/**
 * Floating Geometric Elements
 */
function FloatingElements({ count = 20, spread = 10, speed = 0.5 }: FloatingElementsProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  const elements = useMemo(() => {
    return Array.from({ length: count }, (_, _i) => ({
      position: [
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ] as [number, number, number],
      scale: 0.5 + Math.random() * 0.5,
      type: Math.floor(Math.random() * 3), // 0: box, 1: sphere, 2: plane
      color: `hsl(${240 + Math.random() * 60}, 70%, ${50 + Math.random() * 30}%)`,
    }));
  }, [count, spread]);

  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      child.rotation.x = elements[i].rotation[0] + time * speed * 0.2;
      child.rotation.y = elements[i].rotation[1] + time * speed * 0.3;
      child.position.y += Math.sin(time * speed + i) * 0.01;
    });
  });

  return (
    <group ref={groupRef}>
      {elements.map((element, i) => (
        <Float key={i} speed={speed * 2} rotationIntensity={0.5} floatIntensity={0.5}>
          {element.type === 0 && (
            <Box args={[1, 1, 1]} position={element.position} scale={element.scale}>
              <meshStandardMaterial color={element.color} transparent opacity={0.7} />
            </Box>
          )}
          {element.type === 1 && (
            <Sphere args={[0.5, 16, 16]} position={element.position} scale={element.scale}>
              <meshStandardMaterial color={element.color} transparent opacity={0.7} />
            </Sphere>
          )}
          {element.type === 2 && (
            <Plane args={[1, 1]} position={element.position} scale={element.scale}>
              <meshStandardMaterial color={element.color} transparent opacity={0.7} side={THREE.DoubleSide} />
            </Plane>
          )}
        </Float>
      ))}
    </group>
  );
}

/**
 * Interactive 3D Button
 */
function Interactive3DButton({
  text,
  onClick,
  position = [0, 0, 0],
  color = '#4f46e5',
  hoverColor = '#6366f1'
}: Interactive3DButtonProps) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const targetScale = hovered ? 1.1 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    
    if (hovered) {
      meshRef.current.rotation.y = time * 2;
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[4, 1, 0.2]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial 
          color={hovered ? hoverColor : color}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>
      <Center>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.3}
          height={0.1}
          position={[0, 0, 0.15]}
        >
          {text}
          <meshStandardMaterial color="white" />
        </Text3D>
      </Center>
    </group>
  );
}

/**
 * Scene Lighting Setup
 */
function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[10, 0, 10]} color="#4f46e5" intensity={0.8} />
      <pointLight position={[-10, 0, -10]} color="#e11d48" intensity={0.6} />
    </>
  );
}

/**
 * Hero Background with 3D Elements
 */
export function Hero3DBackground({ 
  variant = 'particles',
  interactive = true,
  performance = 'high'
}: HeroBackgroundProps) {
  const { capabilities, loading } = useWebGLCapabilities();

  if (loading) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-pulse" />
    );
  }

  if (!capabilities?.supported) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="absolute inset-0 bg-[url('/images/fallback-pattern.svg')] opacity-20" />
      </div>
    );
  }

  const getPerformanceSettings = () => {
    switch (performance) {
      case 'high':
        return { particles: 1000, elements: 20, quality: 1 };
      case 'medium':
        return { particles: 500, elements: 10, quality: 0.75 };
      case 'low':
        return { particles: 200, elements: 5, quality: 0.5 };
      default:
        return { particles: 1000, elements: 20, quality: 1 };
    }
  };

  const settings = getPerformanceSettings();

  return (
    <div className="absolute inset-0 bg-black">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        dpr={settings.quality}
      >
        <Suspense fallback={null}>
          <SceneLighting />
          
          {variant === 'particles' && (
            <ParticleBackground 
              count={settings.particles}
              color="#4f46e5"
              speed={0.5}
              opacity={0.6}
            />
          )}
          
          {variant === 'geometric' && (
            <>
              <MorphingSphere 
                position={[0, 0, 0]}
                color="#4f46e5"
                intensity={0.3}
                speed={1}
              />
              <FloatingElements 
                count={settings.elements}
                spread={15}
                speed={0.3}
              />
            </>
          )}
          
          {variant === 'abstract' && (
            <>
              <ParticleBackground 
                count={settings.particles / 2}
                color="#e11d48"
                speed={0.3}
                opacity={0.4}
              />
              <MorphingSphere 
                position={[3, 2, -2]}
                color="#4f46e5"
                intensity={0.5}
                speed={0.8}
              />
              <MorphingSphere 
                position={[-3, -2, -1]}
                color="#e11d48"
                intensity={0.3}
                speed={1.2}
              />
            </>
          )}
          
          {interactive && (
            <OrbitControls 
              enablePan={false}
              enableZoom={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          )}
          
          <Environment preset="night" />
          <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2} />
        </Suspense>
      </Canvas>
    </div>
  );
}

/**
 * 3D Interactive Elements
 */
export function Interactive3DElements() {
  const [scene, setScene] = useState<'intro' | 'assessment' | 'results'>('intro');

  return (
    <div className="w-full h-96 relative">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <SceneLighting />
        
        {scene === 'intro' && (
          <Interactive3DButton
            text="Start Assessment"
            position={[0, 0, 0]}
            onClick={() => setScene('assessment')}
          />
        )}
        
        {scene === 'assessment' && (
          <>
            <Interactive3DButton
              text="Previous"
              position={[-3, 0, 0]}
              onClick={() => setScene('intro')}
              color="#6b7280"
            />
            <Interactive3DButton
              text="Next"
              position={[3, 0, 0]}
              onClick={() => setScene('results')}
            />
          </>
        )}
        
        {scene === 'results' && (
          <Interactive3DButton
            text="View Results"
            position={[0, 0, 0]}
            onClick={() => setScene('intro')}
            color="#059669"
          />
        )}
        
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}

/**
 * Floating Logo Component
 */
export function Floating3DLogo() {
  return (
    <div className="w-32 h-32">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <SceneLighting />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Box args={[2, 2, 0.5]}>
            <meshStandardMaterial 
              color="#4f46e5"
              roughness={0.2}
              metalness={0.8}
            />
          </Box>
        </Float>
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}

/**
 * Performance-Aware Three.js Provider
 */
export function ThreeJSProvider({ children, fallback }: ThreeJSProviderProps) {
  const { capabilities, loading } = useWebGLCapabilities();

  if (loading) {
    return <div className="animate-pulse bg-gray-200 rounded" />;
  }

  if (!capabilities?.supported) {
    return <>{fallback || children}</>;
  }

  return <>{children}</>;
}

/**
 * WebGL Performance Monitor
 */
export function WebGLPerformanceMonitor() {
  const [metrics, setMetrics] = useState<{
    fps: number;
    memory: number;
    drawCalls: number;
    triangles: number;
  } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const perf = webglManager.getPerformanceMetrics();
      if (perf) setMetrics(perf);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!metrics) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs font-mono">
      <div>Memory: {(metrics.memory / 1024 / 1024).toFixed(2)} MB</div>
      <div>Draw Calls: {metrics.drawCalls}</div>
      <div>Triangles: {metrics.triangles.toLocaleString()}</div>
    </div>
  );
}

export {
  ParticleBackground,
  MorphingSphere,
  FloatingElements,
  Interactive3DButton,
  SceneLighting,
};
