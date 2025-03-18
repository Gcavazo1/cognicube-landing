// Fractal Tunnel GLSL Shader
// This is the complete shader code for the fractal tunnel with orange cube effect

// Common uniforms
uniform float time;
uniform vec2 resolution;
uniform bool isPaused;
uniform float zoomProgress;
uniform vec3 cubeColor;
uniform float cameraOffset;
uniform float pathSpeed;
uniform float transitionSpeed;

// Varying variables for passing data from vertex to fragment shader
varying vec2 vUv;

float det = 0.001, t, boxhit;
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
  vec3 p = vec3(vec2(sin(t * 0.1), cos(t * 0.05)) * 10.0, t);
  p.x += smoothstep(0.0, 0.5, abs(0.5 - fract(t * 0.02))) * 10.0;
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
  p2.xz *= rot(t * 0.2);
  p2.xy *= rot(t * 0.1);
  p2.yz *= rot(t * 0.15);
  float b = box(p2, vec3(1.0));
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
  for (int i = 0; i < 80; i++) {
    p = from + td * dir;
    d = de(p) * (1.0 - hash(gl_FragCoord.xy + t) * 0.3);
    if (d < det && boxhit < 0.5) break;
    td += max(det, abs(d));
    float f = fractal(p.xy) + fractal(p.xz) + fractal(p.yz);
    float b = fractal(boxp.xy) + fractal(boxp.xz) + fractal(boxp.yz);
    vec3 colf = vec3(f);
    vec3 colb = vec3(b + 0.1, b * b + 0.05, 0.0);
    
    // Use cubeColor uniform to control the orange cube color
    if (boxhit > 0.5) {
      colb = mix(vec3(b), cubeColor, 0.8);
    }
    
    g += colf / (3.0 + d * d * 2.0) * exp(-0.0015 * td * td) * step(5.0, td) / 2.0 * (1.0 - boxhit);
    g += colb / (10.0 + d * d * 20.0) * boxhit * 0.5;
  }
  return g;
}

mat3 lookat(vec3 dir, vec3 up) {
  dir = normalize(dir);
  vec3 rt = normalize(cross(dir, normalize(up)));
  return mat3(rt, cross(rt, dir), dir);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - resolution * 0.5) / resolution.y;
  
  // Use our time uniform multiplied by the speed parameter
  t = time * pathSpeed;
  
  // If we're in the transition phase, modify timing
  if (zoomProgress > 0.0) {
    // Slow down the animation during transition
    t = isPaused ? t : t + zoomProgress * 0.1;
  }
  
  // Camera position based on the path
  vec3 from = path(t);
  
  // Position of the cube ahead of the camera
  float advOffset = cameraOffset;
  if (zoomProgress > 0.0) {
    // Bring the cube closer during transition
    advOffset = mix(cameraOffset, 1.0, zoomProgress);
  }
  
  adv = path(t + advOffset + sin(t * 0.1) * 3.0);
  
  // Camera direction
  vec3 dir = normalize(vec3(uv, 0.7));
  dir = lookat(adv - from, vec3(0.0, 1.0, 0.0)) * dir;
  
  // Zoom effect for the transition
  if (zoomProgress > 0.0) {
    // Narrow field of view to zoom in on cube
    dir = normalize(mix(dir, normalize(adv - from), zoomProgress * 0.5));
    
    // Increase brightness near the end for fade-to-white effect
    if (zoomProgress > 0.8) {
      float fadeWhite = smoothstep(0.8, 1.0, zoomProgress);
      vec3 col = march(from, dir);
      fragColor = vec4(mix(col, vec3(1.0), fadeWhite), 1.0);
      return;
    }
  }
  // Regular rendering
  vec3 col = march(from, dir);
  fragColor = vec4(col, 1.0);
}