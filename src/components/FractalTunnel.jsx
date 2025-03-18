import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { shaderMaterial, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// Create a shader material with our uniforms
const FractalTunnelMaterial = shaderMaterial(
  {
    time: 0,
    resolution: new THREE.Vector2(window.innerWidth, window.innerHeight),
    isPaused: false,
    zoomProgress: 0,
    cubeColor: new THREE.Vector3(0.7, 0.45, 0.04), // Brighter golden color for the cube
    cameraOffset: 5.0, // Distance ahead for the cube - decreased for better visibility
    pathSpeed: 3.0,     // Increased speed of movement through tunnel
    transitionSpeed: 0.5 // Faster zoom transition
  },
  // Vertex shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,
  // Fragment shader
  `
    uniform float time;
    uniform vec2 resolution;
    uniform bool isPaused;
    uniform float zoomProgress;
    uniform vec3 cubeColor;
    uniform float cameraOffset;
    uniform float pathSpeed;
    uniform float transitionSpeed;
    
    varying vec2 vUv;
    
    float det = 0.00001, t, boxhit; // Decreased detail level for better quality
    vec3 adv, boxp;
    
    float hash(vec2 p) {
      vec3 p3 = fract(vec3(p.xyx) * 0.1031);
      p3 += dot(p3, p3.yzx + 33.33);
      return fract((p3.x + p3.y) * p3.z);
    }
    
    mat2 rot(float a) {
      float s = sin(a), c = cos(a);
      return mat2(c, s, -s, c);
    }
    
    vec3 path(float t) {
      vec3 p = vec3(vec2(sin(t * 0.1), cos(t * 0.05)) * 20.0, t);
      // Enhanced path wobble for more interesting movement
      p.x += smoothstep(0.0, 0.5, abs(0.5 - fract(t * 0.02))) * 12.0;
      return p;
    }
    
    float fractal(vec2 p) {
      p = abs(5.0 - mod(p * 0.2, 10.0)) - 5.0;
      float ot = 1000.0;
      for (int i = 0; i < 7; i++) {
        p = abs(p) / clamp(p.x * p.y, 0.25, 2.0) - 1.0;
        if (i > 0) ot = min(ot, abs(p.x) + 0.7 * fract(abs(p.y) * 0.05 + t * 0.05 + float(i) * 0.3));
      }
      ot = exp(-10.0 * ot);
      return ot;
    }
    
    float box(vec3 p, vec3 l) {
      vec3 c = abs(p) - l;
      return length(max(vec3(0.0), c)) + min(0.0, max(c.x, max(c.y, c.z)));
    }
    
    float de(vec3 p) {
      boxhit = 0.0;
      vec3 p2 = p - adv;
      // More dynamic rotation for the cube
      p2.xz *= rot(t * 0.75);
      p2.xy *= rot(t * 0.2);
      p2.yz *= rot(t * 0.25);
      float b = box(p2, vec3(1.4));
      p.xy -= path(p.z).xy;
      float s = sign(p.y);
      p.y = -abs(p.y) - 3.0;
      p.z = mod(p.z, 20.0) - 10.0;
      for (int i = 0; i < 5; i++) {
        p = abs(p) - 1.0;
        p.xz *= rot(radians(s * -45.0));
        p.yz *= rot(radians(90.0));
      }
      float f = -box(p, vec3(5.0, 5.0, 10.0));
      float d = min(f, b);
      if (d == b) boxp = p2, boxhit = 1.0;
      return d * 0.7;
    }
    
    vec3 march(vec3 from, vec3 dir) {
      vec3 p, n, g = vec3(0.0);
      float d, td = 0.0;
      // Increased iteration count for better quality
      for (int i = 0; i < 1000; i++) {
        p = from + td * dir;
        d = de(p) * ( 1.3 - hash(gl_FragCoord.xy + t) * 0.2); // Even less noise
        if (d < det && boxhit < 0.5) break;
        td += max(det, abs(d));
        float f = fractal(p.xy) + fractal(p.xz) + fractal(p.yz);
        float b = fractal(boxp.xy) + fractal(boxp.xz) + fractal(boxp.yz);
        vec3 colf = vec3(f);
        
        // Enhanced colors for better appearance
        vec3 colb = vec3(b + 0.5, b * b + 0.15, 0.0);
        
        // More vibrant cube color with orange-gold glow
        if (boxhit > 0.5) {
          colb = mix(vec3(b), cubeColor * 1.5, 0.25);
        }
        
        // Enhanced glow and fog effects
        g += colf / (8.5 + d * d * 1.5) * exp(-0.0012 * td * td) * step(5.0, td) / 2.0 * (1.0 - boxhit);
        g += colb / (10.0 + d * d * 12.0) * boxhit * 1.0;
      }
      
      // Add more saturation and contrast to the final image
      g = pow(g, vec3(1.35 ));
      return g;
    }
    
    mat3 lookat(vec3 dir, vec3 up) {
      dir = normalize(dir);
      vec3 rt = normalize(cross(dir, normalize(up)));
      return mat3(rt, cross(rt, dir), dir);
    }
    
    void main() {
      // Calculate normalized device coordinates properly
      vec2 uv = vUv * 2.0 - 1.0;
      
      // Fix aspect ratio to avoid stretching
      float aspect = resolution.x / resolution.y;
      uv.x *= aspect;
      
      // Use our time uniform multiplied by the speed parameter
      t = time * pathSpeed;
      
      // Camera position based on the path
      vec3 from = path(t);
      
      // Position of the cube ahead of the camera
      float advOffset = cameraOffset;
      if (zoomProgress > 0.0) {
        // Bring the cube closer during transition - we want it to get VERY close
        // to create the impression of going through it
        advOffset = mix(cameraOffset, 0.25, zoomProgress);
        
        // Increase travel speed during transition, but gradually
        float speedMultiplier = 0.9 + zoomProgress * 0.3;
        from = path(t * speedMultiplier);
      }
      
      adv = path(t + advOffset + sin(t * 0.3) * 4.0);
      
      // Camera direction
      vec3 dir = normalize(vec3(uv, 0.80)); // Increased focal length for better perspective
      dir = lookat(adv - from, vec3(0.0, 1.0, 0.0)) * dir;
      
      // Zoom effect for the transition
      if (zoomProgress > 0.0) {
        // Narrow field of view to zoom in on cube more gradually
        float zoomFactor = smoothstep(0.0, 1.0, zoomProgress);
        dir = normalize(mix(dir, normalize(adv - from), zoomFactor * 0.8));
        
        // Transition to black with golden accents near the end for thematic consistency
        if (zoomProgress > 0.8) {
          float fadeAmount = smoothstep(0.8, 1.0, zoomProgress);
          vec3 col = march(from, dir);
          
          // Mix with a dark color (almost black) with a hint of gold
          vec3 transitionColor = mix(vec3(0.0), cubeColor * 0.15, 0.2); // Very dark gold tint
          
          // Add golden glow flare at peak of transition (around 90-95%)
          if (zoomProgress > 0.88 && zoomProgress < 0.95) {
            float glowIntensity = smoothstep(0.88, 0.92, zoomProgress) * (1.0 - smoothstep(0.92, 0.95, zoomProgress));
            transitionColor = mix(transitionColor, cubeColor * 0.5, glowIntensity * 0.5);
          }
          
          gl_FragColor = vec4(mix(col, transitionColor, fadeAmount), 1.0);
          return;
        }
      }
      
      // Regular rendering
      vec3 col = march(from, dir);
      
      // Apply vignette effect to darken edges
      float distFromCenter = length(vUv - 0.5) * 2.20;
      float vignette = smoothstep(0.90, 0.0, distFromCenter);
      col *= vignette;
      
      gl_FragColor = vec4(col, 1.0);
    }
  `
);

// Make the material available to the '<fractalTunnelMaterial />' JSX element
extend({ FractalTunnelMaterial });

const FractalTunnel = ({ onFinishAnimation, zoomProgress = 0, isTransitioning = false }) => {
  const meshRef = useRef();
  const materialRef = useRef();
  
  // State to track animation progress
  const [time, setTime] = useState(0);
  const [interactionEnabled, setInteractionEnabled] = useState(false);
  
  // Handle window resize to update shader resolution
  useEffect(() => {
    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.resolution.value.set(
          window.innerWidth, 
          window.innerHeight
        );
      }
    };
    
    // Call it once to initialize
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Animation loop
  useFrame((state, delta) => {
    if (materialRef.current) {
      if (!isTransitioning) {
        // Normal time progression before interaction
        const newTime = time + delta;
        setTime(newTime);
        materialRef.current.uniforms.time.value = newTime;
        
        // Enable interaction after 8.5 seconds
        if (newTime > 8.5 && !interactionEnabled) {
          setInteractionEnabled(true);
          if (onFinishAnimation) onFinishAnimation();
        }
      } else {
        // During transition, continue animation but at a slightly faster pace
        const transitionBoost = 1.5;
        const newTime = time + delta * transitionBoost;
        setTime(newTime);
        materialRef.current.uniforms.time.value = newTime;
      }
      
      // Update zoom progress for transition effect
      materialRef.current.uniforms.zoomProgress.value = zoomProgress;
    }
  });
  
  return (
    <>
      {/* Use orthographic camera for fullscreen quad rendering */}
      <OrthographicCamera makeDefault position={[0, 0, 5]} />
      
      {/* Fullscreen quad */}
      <mesh ref={meshRef}>
        <planeGeometry args={[2, 2]} />
        <fractalTunnelMaterial ref={materialRef} />
      </mesh>
    </>
  );
};

export default FractalTunnel; 