import React, { useEffect, useRef } from 'react';

const vertexSource = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

// Warm, translucent shader inspired by the supplied 21st.dev hero.
const fragmentSource = `#version 300 es
precision highp float;
uniform vec2 resolution;
uniform vec2 pointer;
uniform float time;
out vec4 color;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + 1.0), f.x), f.y);
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  vec2 p = (uv - 0.5) * vec2(resolution.x / resolution.y, 1.0);
  vec2 mouse = (pointer - 0.5) * vec2(resolution.x / resolution.y, 1.0);
  float n = noise(p * 3.0 + vec2(time * 0.025, -time * 0.018));
  float radius = length(p - mouse * 0.35);
  float flow = sin(p.x * 6.0 + p.y * 4.2 + n * 3.0 + time * 0.12);
  float threads = smoothstep(0.91, 1.0, 1.0 - abs(flow));
  float glow = exp(-radius * 3.2) * (0.18 + n * 0.16);
  float edge = 1.0 - smoothstep(0.18, 0.72, length(p));
  float alpha = clamp((threads * 0.18 + glow) * edge, 0.0, 0.25);
  vec3 umber = vec3(0.784, 0.474, 0.173);
  vec3 champagne = vec3(0.957, 0.851, 0.627);
  vec3 tint = mix(umber, champagne, clamp(threads * 0.72 + glow * 1.8, 0.0, 0.78));
  color = vec4(tint * alpha, alpha);
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('TellaMind shader could not compile:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function AnimatedShaderBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof canvas.getContext !== 'function') return undefined;
    const gl = canvas.getContext('webgl2', { alpha: true, antialias: false, powerPreference: 'low-power' });
    if (!gl) return undefined; // CSS glow remains as a graceful fallback.

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertexShader || !fragmentShader) {
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      return undefined;
    }

    const program = gl.createProgram();
    if (!program) return undefined;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('TellaMind shader program could not link:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return undefined;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'position');
    const uniforms = {
      resolution: gl.getUniformLocation(program, 'resolution'),
      pointer: gl.getUniformLocation(program, 'pointer'),
      time: gl.getUniformLocation(program, 'time'),
    };
    const pointer = [0.5, 0.5];
    let frame = 0;
    let visible = true;
    let disposed = false;
    let lastRenderAt = 0;
    const startedAt = performance.now();

    const render = (now = startedAt) => {
      if (disposed || !visible) return;
      if (document.visibilityState === 'hidden') {
        frame = 0;
        return;
      }
      if (!reduceMotion && now - lastRenderAt < 1000 / 30) {
        frame = requestAnimationFrame(render);
        return;
      }
      lastRenderAt = now;
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.enableVertexAttribArray(position);
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.pointer, pointer[0], pointer[1]);
      gl.uniform1f(uniforms.time, reduceMotion ? 0 : (now - startedAt) * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      if (!reduceMotion) frame = requestAnimationFrame(render);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (reduceMotion) render();
    };

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer[0] = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
      pointer[1] = 1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
    };
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !reduceMotion && visible && !frame) frame = requestAnimationFrame(render);
    };
    const observer = typeof IntersectionObserver === 'function' ? new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduceMotion && !frame) frame = requestAnimationFrame(render);
      if (!visible && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
      }
      if (visible && reduceMotion) render();
    }, { threshold: 0.01 }) : null;

    observer?.observe(canvas);
    const resizeObserver = typeof ResizeObserver === 'function' ? new ResizeObserver(resize) : null;
    if (resizeObserver) resizeObserver.observe(canvas);
    else window.addEventListener('resize', resize);
    const pointerTarget = canvas.parentElement || canvas;
    pointerTarget.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    resize();
    if (!reduceMotion) frame = requestAnimationFrame(render);

    return () => {
      disposed = true;
      if (frame) cancelAnimationFrame(frame);
      observer?.disconnect();
      resizeObserver?.disconnect();
      if (!resizeObserver) window.removeEventListener('resize', resize);
      pointerTarget.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return <canvas className="hero-shader-canvas" aria-hidden="true" />;
}
