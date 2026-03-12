import { useEffect, useRef, useCallback } from 'react'

/* ── WebGL helpers ─────────────────────────────────────── */

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('Shader compile error:', gl.getShaderInfoLog(shader))
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function createShaderProgram(gl, vertexShader, fragmentShader) {
  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(
      'Unable to initialize the shader program: ' +
        gl.getProgramInfoLog(program)
    )
    return null
  }
  return program
}

/* ── GLSL shaders ──────────────────────────────────────── */

const VERTEX_SRC = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

// Beautiful flowing aurora / gradient-mesh fragment shader
const FRAGMENT_SRC = `
  precision mediump float;

  uniform float u_time;
  uniform vec2  u_resolution;
  uniform vec2  u_mouse;      // normalised 0-1

  /* ---------- noise helpers ---------- */
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                             + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                             dot(x12.zw,x12.zw)), 0.0);
    m = m*m;  m = m*m;
    vec3 x_  = 2.0 * fract(p * C.www) - 1.0;
    vec3 h   = abs(x_) - 0.5;
    vec3 ox  = floor(x_ + 0.5);
    vec3 a0  = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x  = a0.x  * x0.x   + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  /* ---------- main ---------- */
  void main(){
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    // Mouse-driven offset (subtle)
    vec2 mouseOff = (u_mouse - 0.5) * 0.3;
    p += mouseOff;

    float t = u_time * 0.15;            // slow drift

    // Layered simplex noise for organic flow
    float n1 = snoise(p * 1.8 + vec2(t,        t * 0.7));
    float n2 = snoise(p * 3.0 + vec2(-t * 0.6, t * 0.4));
    float n3 = snoise(p * 5.0 + vec2(t * 0.3, -t * 0.5));
    float n  = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;

    // Color palette — deep oceanic/aurora blues & cyans
    vec3 c1 = vec3(0.02, 0.04, 0.12);   // deep navy
    vec3 c2 = vec3(0.05, 0.20, 0.55);   // royal blue
    vec3 c3 = vec3(0.10, 0.55, 0.80);   // electric cyan
    vec3 c4 = vec3(0.30, 0.15, 0.70);   // purple accent

    float band = smoothstep(-0.6, 0.6, n);
    vec3 color = mix(c1, c2, smoothstep(0.0, 0.4, band));
    color = mix(color, c3, smoothstep(0.4, 0.7, band));
    color = mix(color, c4, smoothstep(0.7, 1.0, band));

    // Vignette
    float vig = 1.0 - length((uv - 0.5) * 1.4);
    vig = smoothstep(0.0, 0.7, vig);
    color *= vig;

    // Slight glow pulse
    color += vec3(0.02, 0.06, 0.12) * (0.5 + 0.5 * sin(u_time * 0.5));

    gl_FragColor = vec4(color, 1.0);
  }
`

/* ── React component ───────────────────────────────────── */

export default function ShaderBackground({ className = '' }) {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: 0.5, y: 0.5 })
  const rafRef    = useRef(0)
  const glRef     = useRef(null)

  const handleMouse = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseRef.current.x = (e.clientX - rect.left) / rect.width
    mouseRef.current.y = 1.0 - (e.clientY - rect.top) / rect.height   // flip Y
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
    if (!gl) { console.warn('WebGL not supported'); return }
    glRef.current = gl

    /* compile & link */
    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC)
    if (!vs || !fs) return
    const program = createShaderProgram(gl, vs, fs)
    if (!program) return
    gl.useProgram(program)

    /* full-screen quad */
    const verts = new Float32Array([-1,-1, 1,-1, -1,1, 1,1])
    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    /* uniform locations */
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRes  = gl.getUniformLocation(program, 'u_resolution')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')

    /* resize handler — render at lower resolution for performance */
    const resize = () => {
      const parent = canvas.parentElement
      const scale = 0.5  // render at half resolution
      canvas.width  = parent.offsetWidth  * scale
      canvas.height = parent.offsetHeight * scale
      canvas.style.width  = parent.offsetWidth  + 'px'
      canvas.style.height = parent.offsetHeight + 'px'
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    /* animation loop — throttled to ~30fps for smooth perf */
    const start = performance.now()
    let lastFrame = 0
    const frameInterval = 1000 / 30
    const render = (now) => {
      rafRef.current = requestAnimationFrame(render)
      if (now - lastFrame < frameInterval) return
      lastFrame = now
      const elapsed = (now - start) / 1000
      gl.uniform1f(uTime, elapsed)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }
    rafRef.current = requestAnimationFrame(render)

    /* mouse tracking on parent */
    const parentEl = canvas.parentElement
    parentEl.addEventListener('mousemove', handleMouse)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      parentEl.removeEventListener('mousemove', handleMouse)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteBuffer(buf)
    }
  }, [handleMouse])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ zIndex: 0 }}
    />
  )
}
