export const STREAK_VERT = /* glsl */ `
attribute vec4 aSeed;
attribute vec4 aProp;
uniform float uTravel, uStretch, uFar, uNear, uWidth, uAspect, uGain, uDpr;
uniform vec2 uRes, uVP;
varying vec2 vP;
varying float vW, vI, vSig;

void main() {
  float span = uFar - uNear;
  float u = mod(aSeed.z * span + uTravel * aSeed.w, span);
  float d = uFar - u;
  float a = aSeed.x;
  vec2 xy = vec2(cos(a) * aSeed.y * uAspect, sin(a) * aSeed.y);
  float len = (0.45 + aProp.x * 2.4) * (0.32 + uStretch);
  float dt = d + len;
  vec2 hp = xy + uVP * (d * d / uFar);
  vec2 tp = xy + uVP * (dt * dt / uFar);
  vec4 ch = projectionMatrix * viewMatrix * vec4(hp, -d, 1.0);
  vec4 ct = projectionMatrix * viewMatrix * vec4(tp, -dt, 1.0);
  vec2 pa = ch.xy / ch.w * uRes * 0.5;
  vec2 pb = ct.xy / ct.w * uRes * 0.5;
  vec2 dir = pb - pa;
  float L = length(dir);
  dir = L > 0.0001 ? dir / L : vec2(1.0, 0.0);
  float minL = 3.0 * uDpr;
  if (L < minL) pb = pa + dir * minL;
  vec2 nrm = vec2(-dir.y, dir.x);
  float w = uWidth * aProp.w * clamp(6.0 / d, 0.55, 2.5);
  w *= (1.0 - 0.62 * position.x);
  float pad = 1.5 * uDpr;
  vec2 pp = mix(pa, pb, position.x) + nrm * position.y * (w * 0.5 + pad);
  gl_Position = vec4(pp / (uRes * 0.5), 0.0, 1.0);
  vW = w;
  vP = vec2(position.x, position.y * (w * 0.5 + pad));
  vSig = step(0.962, aProp.z);
  float fadeFar = smoothstep(uFar, uFar * 0.6, d);
  float fadeNear = smoothstep(uNear, uNear + 1.5, d);
  vI = (0.78 + 0.22 * aProp.y) * fadeFar * fadeNear * uGain;
}
`;

export const STREAK_FRAG = /* glsl */ `
precision highp float;
uniform vec3 uInkCol, uSignal;
varying vec2 vP;
varying float vW, vI, vSig;
void main() {
  float cov = clamp(vW * 0.5 + 0.5 - abs(vP.y), 0.0, 1.0) * min(1.0, vW);
  float along = 1.0 - smoothstep(0.68, 1.0, vP.x);
  float c = cov * along * vI;
  vec3 col = mix(uInkCol, uSignal, vSig);
  gl_FragColor = vec4(col, clamp(c, 0.0, 1.0));
}
`;

export const COMP_VERT = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = position.xy * 0.5 + 0.5;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const COMP_FRAG = /* glsl */ `
precision highp float;
uniform vec2 uVPuv, uCalmC, uCalmR, uRes;
uniform float uAspect, uSpeed, uCalm, uDpr, uInk, uField;
uniform vec3 uPaper, uInkCol, uSignal;
varying vec2 vUv;

float bayer2(vec2 a) { a = floor(a); return fract(a.x / 2.0 + a.y * a.y * 0.75); }
float bayer4(vec2 a) { return bayer2(0.5 * a) * 0.25 + bayer2(a); }
float bayer8(vec2 a) { return bayer4(0.5 * a) * 0.25 + bayer2(a); }

void main() {
  vec2 px = gl_FragCoord.xy;
  vec2 dv = (vUv - uVPuv) * vec2(uAspect, 1.0);
  float rr = length(dv);
  float ink = 0.0;
  float sig = 0.0;
  float cell = 2.0 * uDpr;
  float th = bayer8(px / cell);
  float dens = uField * exp(-rr * rr * 20.0) * (0.78 + 0.2 * clamp(uSpeed / 4.0, 0.0, 1.0));
  ink = max(ink, step(th + 0.002, dens));
  float speckle = step(0.984, fract(th * 7.13 + dens * 3.1));
  sig = speckle * dens * 1.35;
  vec2 q = abs(vUv - uCalmC) - uCalmR;
  float edge = max(q.x, q.y);
  float calm = (1.0 - smoothstep(-0.012, 0.022, edge)) * uCalm;
  float keep = step(calm, th * 0.999);
  ink *= keep;
  sig *= keep;
  vec2 d = (px - uVPuv * uRes);
  float hw = 0.6 * uDpr;
  float armX = (1.0 - smoothstep(hw, hw + 1.0, abs(d.y))) * step(7.0 * uDpr, abs(d.x)) * step(abs(d.x), 28.0 * uDpr);
  float armY = (1.0 - smoothstep(hw, hw + 1.0, abs(d.x))) * step(7.0 * uDpr, abs(d.y)) * step(abs(d.y), 28.0 * uDpr);
  float ring = 1.0 - smoothstep(hw, hw + 1.0, abs(length(d) - 12.0 * uDpr));
  float mark = max(max(armX, armY), ring) * uField * keep;
  vec3 col = uPaper;
  col = mix(col, uInkCol, clamp(ink, 0.0, 1.0));
  col = mix(col, uSignal, clamp(max(sig, mark), 0.0, 1.0));
  gl_FragColor = vec4(col, 1.0);
}
`;
