/* filepath: /lib/three/webgl-manager.ts */

import * as THREE from 'three';

export interface WebGLCapabilities {
  supported: boolean;
  maxTextureSize: number;
  extensions: string[];
  renderer: string;
  vendor: string;
  precision: string;
}

export interface ParticleSystemConfig {
  count: number;
  size: number;
  color: string;
  speed: number;
  opacity: number;
  spread: number;
}

export interface MorphConfig {
  duration: number;
  easing: string;
  particles: boolean;
  wireframe: boolean;
}

/**
 * Advanced WebGL Manager for Three.js integration
 * Provides enterprise-grade 3D capabilities with graceful degradation
 */
export class WebGLManager {
  private renderer: THREE.WebGLRenderer | null = null;
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private capabilities: WebGLCapabilities | null = null;
  private isInitialized = false;
  private animationId: number | null = null;
  private resizeObserver: ResizeObserver | null = null;

  /**
   * Initialize WebGL context and detect capabilities
   */
  async initialize(canvas: HTMLCanvasElement): Promise<WebGLCapabilities> {
    try {
      // Create renderer with optimal settings
      this.renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
        precision: 'mediump',
      });

      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.setClearColor(0x000000, 0);
      this.renderer.shadowMap.enabled = true;
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.2;

      // Create scene and camera
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.Fog(0x000000, 50, 200);

      this.camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 0, 5);

      // Detect capabilities
      this.capabilities = this.detectCapabilities();
      this.setupResize(canvas);
      this.isInitialized = true;

      return this.capabilities;
    } catch (error) {
      console.warn('WebGL initialization failed:', error);
      return {
        supported: false,
        maxTextureSize: 0,
        extensions: [],
        renderer: 'fallback',
        vendor: 'unknown',
        precision: 'low',
      };
    }
  }

  /**
   * Detect WebGL capabilities for optimization
   */
  private detectCapabilities(): WebGLCapabilities {
    if (!this.renderer) {
      return {
        supported: false,
        maxTextureSize: 0,
        extensions: [],
        renderer: 'none',
        vendor: 'unknown',
        precision: 'low',
      };
    }

    const gl = this.renderer.getContext();
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const extensions = gl.getSupportedExtensions() || [];

    return {
      supported: true,
      maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
      extensions,
      renderer: debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
        : 'unknown',
      vendor: debugInfo
        ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
        : 'unknown',
      precision: this.detectPrecision(gl),
    };
  }

  /**
   * Detect shader precision capabilities
   */
  private detectPrecision(gl: WebGLRenderingContext): string {
    const vertexShaderPrecision = gl.getShaderPrecisionFormat(
      gl.VERTEX_SHADER,
      gl.HIGH_FLOAT
    );
    const fragmentShaderPrecision = gl.getShaderPrecisionFormat(
      gl.FRAGMENT_SHADER,
      gl.HIGH_FLOAT
    );

    if (
      vertexShaderPrecision?.precision &&
      fragmentShaderPrecision?.precision
    ) {
      return 'high';
    }
    return 'medium';
  }

  /**
   * Create floating particles background effect
   */
  createParticleSystem(config: ParticleSystemConfig): THREE.Points | null {
    if (!this.scene || !this.isInitialized) return null;

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(config.count * 3);
    const velocities = new Float32Array(config.count * 3);

    // Generate particle positions and velocities
    for (let i = 0; i < config.count; i++) {
      const i3 = i * 3;
      
      // Random positions within spread
      positions[i3] = (Math.random() - 0.5) * config.spread;
      positions[i3 + 1] = (Math.random() - 0.5) * config.spread;
      positions[i3 + 2] = (Math.random() - 0.5) * config.spread;

      // Random velocities
      velocities[i3] = (Math.random() - 0.5) * config.speed;
      velocities[i3 + 1] = (Math.random() - 0.5) * config.speed;
      velocities[i3 + 2] = (Math.random() - 0.5) * config.speed;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    // Create particle material with shader
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        size: { value: config.size },
        color: { value: new THREE.Color(config.color) },
        opacity: { value: config.opacity },
      },
      vertexShader: `
        uniform float time;
        uniform float size;
        attribute vec3 velocity;
        
        void main() {
          vec3 pos = position + velocity * time * 0.01;
          
          // Wrap particles around edges
          pos.x = mod(pos.x + 50.0, 100.0) - 50.0;
          pos.y = mod(pos.y + 50.0, 100.0) - 50.0;
          pos.z = mod(pos.z + 50.0, 100.0) - 50.0;
          
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        uniform float opacity;
        
        void main() {
          float distance = length(gl_PointCoord - vec2(0.5));
          float alpha = 1.0 - smoothstep(0.0, 0.5, distance);
          gl_FragColor = vec4(color, alpha * opacity);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    this.scene.add(particles);

    return particles;
  }

  /**
   * Create morphing geometry shapes
   */
  createMorphingGeometry(): THREE.Mesh | null {
    if (!this.scene || !this.isInitialized) return null;

    const geometry = new THREE.IcosahedronGeometry(2, 1);
    
    // Create morph targets
    const morphTarget1 = geometry.clone();
    const morphTarget2 = geometry.clone();

    // Deform geometries for morphing
    const positions1 = morphTarget1.attributes.position.array as Float32Array;
    const positions2 = morphTarget2.attributes.position.array as Float32Array;

    for (let i = 0; i < positions1.length; i += 3) {
      const noise1 = Math.sin(positions1[i] * 2) * 0.5;
      const noise2 = Math.cos(positions2[i] * 3) * 0.7;
      
      positions1[i] += noise1;
      positions1[i + 1] += noise1;
      positions1[i + 2] += noise1;

      positions2[i] += noise2;
      positions2[i + 1] += noise2;
      positions2[i + 2] += noise2;
    }

    geometry.morphAttributes.position = [
      morphTarget1.attributes.position,
      morphTarget2.attributes.position,
    ];

    const material = new THREE.MeshPhysicalMaterial({
      color: 0x4f46e5,
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.3,
      transparent: true,
      opacity: 0.8,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, 0);
    this.scene.add(mesh);

    return mesh;
  }

  /**
   * Add lighting setup
   */
  setupLighting(): void {
    if (!this.scene || !this.isInitialized) return;

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    // Directional light with shadows
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    this.scene.add(directionalLight);

    // Point lights for accent
    const pointLight1 = new THREE.PointLight(0x4f46e5, 0.8, 100);
    pointLight1.position.set(10, 0, 10);
    this.scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xe11d48, 0.6, 100);
    pointLight2.position.set(-10, 0, -10);
    this.scene.add(pointLight2);
  }

  /**
   * Start render loop
   */
  startRenderLoop(onFrame?: (time: number) => void): void {
    if (!this.renderer || !this.scene || !this.camera) return;

    const animate = (time: number) => {
      if (onFrame) onFrame(time);
      
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
      
      this.animationId = requestAnimationFrame(animate);
    };

    animate(0);
  }

  /**
   * Stop render loop
   */
  stopRenderLoop(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Setup responsive resize handling
   */
  private setupResize(canvas: HTMLCanvasElement): void {
    this.resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        this.resize(width, height);
      }
    });

    this.resizeObserver.observe(canvas);
  }

  /**
   * Handle resize events
   */
  resize(width: number, height: number): void {
    if (!this.renderer || !this.camera) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height, false);
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics(): {
    fps: number;
    memory: number;
    drawCalls: number;
    triangles: number;
  } | null {
    if (!this.renderer) return null;

    const info = this.renderer.info;
    return {
      fps: 0, // Would need frame tracking
      memory: info.memory.geometries + info.memory.textures,
      drawCalls: info.render.calls,
      triangles: info.render.triangles,
    };
  }

  /**
   * Clean up resources
   */
  dispose(): void {
    this.stopRenderLoop();

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }

    if (this.scene) {
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      this.scene.clear();
      this.scene = null;
    }

    if (this.renderer) {
      this.renderer.dispose();
      this.renderer = null;
    }

    this.camera = null;
    this.isInitialized = false;
  }

  /**
   * Get current capabilities
   */
  getCapabilities(): WebGLCapabilities | null {
    return this.capabilities;
  }

  /**
   * Check if WebGL is initialized and ready
   */
  isReady(): boolean {
    return this.isInitialized && this.renderer !== null;
  }
}

// Export singleton instance
export const webglManager = new WebGLManager();
