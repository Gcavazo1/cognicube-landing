/**
 * Utility functions for working with GLSL shaders
 */

// Import raw shader code
export const importShader = async (path) => {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load shader: ${path}`);
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading shader:', error);
    return null;
  }
};

// Replace a section in the shader code
export const replaceShaderSection = (shader, sectionName, replacement) => {
  const regex = new RegExp(`// BEGIN ${sectionName}[\\s\\S]*?// END ${sectionName}`, 'g');
  return shader.replace(regex, `// BEGIN ${sectionName}\n${replacement}\n// END ${sectionName}`);
};

// Create shader with custom defines
export const createShaderWithDefines = (shaderSource, defines = {}) => {
  const defineLines = Object.entries(defines).map(([key, value]) => {
    if (typeof value === 'string') {
      return `#define ${key} "${value}"`;
    }
    return `#define ${key} ${value}`;
  }).join('\n');
  
  // Insert defines after the first line (usually the version declaration)
  const lines = shaderSource.split('\n');
  return [lines[0], defineLines, ...lines.slice(1)].join('\n');
};

// Extract shader chunks/functions for reuse
export const extractShaderChunk = (shader, chunkName) => {
  const startTag = `// BEGIN ${chunkName}`;
  const endTag = `// END ${chunkName}`;
  
  const startIndex = shader.indexOf(startTag);
  const endIndex = shader.indexOf(endTag);
  
  if (startIndex === -1 || endIndex === -1) {
    console.warn(`Could not find chunk "${chunkName}" in shader`);
    return '';
  }
  
  return shader.substring(startIndex + startTag.length, endIndex).trim();
};

// Create a debounced window resize handler for updating shader uniforms
export const createResizeHandler = (callback, delay = 250) => {
  let timeoutId;
  
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      callback(window.innerWidth, window.innerHeight);
    }, delay);
  };
};

export default {
  importShader,
  replaceShaderSection,
  createShaderWithDefines,
  extractShaderChunk,
  createResizeHandler
}; 