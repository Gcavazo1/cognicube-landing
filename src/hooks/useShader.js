import { useEffect, useState } from 'react';
import { ShaderMaterial, Vector2 } from 'three';

// Helper function to load shader from a file
const loadShaderFile = async (url) => {
  try {
    const response = await fetch(url);
    return await response.text();
  } catch (error) {
    console.error('Error loading shader file:', error);
    return null;
  }
};

// Custom hook to create and manage a shader material
export const useShader = (vertexShaderPath, fragmentShaderPath, uniforms = {}) => {
  const [material, setMaterial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadShaders = async () => {
      try {
        setLoading(true);
        
        // Load vertex and fragment shaders
        const [vertexShader, fragmentShader] = await Promise.all([
          loadShaderFile(vertexShaderPath),
          loadShaderFile(fragmentShaderPath)
        ]);
        
        if (!vertexShader || !fragmentShader) {
          throw new Error('Failed to load shaders');
        }

        // Default uniforms
        const defaultUniforms = {
          time: { value: 0 },
          resolution: { value: new Vector2(window.innerWidth, window.innerHeight) }
        };

        // Create shader material
        const shaderMaterial = new ShaderMaterial({
          vertexShader,
          fragmentShader,
          uniforms: { ...defaultUniforms, ...uniforms }
        });

        // Handle window resize for resolution uniform
        const handleResize = () => {
          if (shaderMaterial.uniforms.resolution) {
            shaderMaterial.uniforms.resolution.value.set(
              window.innerWidth,
              window.innerHeight
            );
          }
        };

        window.addEventListener('resize', handleResize);
        setMaterial(shaderMaterial);
        setLoading(false);

        return () => {
          window.removeEventListener('resize', handleResize);
        };
      } catch (err) {
        console.error('Error in useShader:', err);
        setError(err);
        setLoading(false);
      }
    };

    loadShaders();
  }, [vertexShaderPath, fragmentShaderPath]);

  return { material, loading, error };
};

// Helper hook to update time uniform in a shader material
export const useShaderTime = (material, isPaused = false) => {
  useEffect(() => {
    if (!material || !material.uniforms.time) return;

    let startTime = Date.now();
    let rafId;

    const updateTime = () => {
      if (!isPaused && material && material.uniforms.time) {
        const elapsedSeconds = (Date.now() - startTime) / 1000;
        material.uniforms.time.value = elapsedSeconds;
      }
      rafId = requestAnimationFrame(updateTime);
    };

    updateTime();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [material, isPaused]);
};

export default useShader; 