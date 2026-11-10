import {
  AmbientLight,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  Color,
  ColorManagement,
  DirectionalLight,
  Fog,
  Group,
  HemisphereLight,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  InstancedMesh,
  LinearSRGBColorSpace,
  Line,
  LineDashedMaterial,
  Mesh,
  MeshPhongMaterial,
  NoColorSpace,
  NormalBlending,
  Object3D,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { DESKS } from "../content.js";
import { COMP_FRAG, COMP_VERT, STREAK_FRAG, STREAK_VERT } from "./shaders.js";

ColorManagement.enabled = false;

function rgb(hex) {
  const c = new Color(hex);
  return new Vector3(c.r, c.g, c.b);
}

const PAPER = rgb("#f3efe6");
const INK = rgb("#14181f");
const SIGNAL = rgb("#7a6244");
const BRASS_HI = 0xc4894a;
const PAPER_HEX = 0xf3efe6;
const INK_HEX = 0x14181f;
const SIGNAL_HEX = 0x7a6244;
const PEWTER_HEX = 0x9a9488;
const STEEL_HEX = 0x3a3f47;
const FAR = 72;
const NEAR = 1.1;
const TRAVEL_MOD = 8 * (FAR - NEAR);
const RING_R = 1.38;
const RINGS = [
  { id: "trade", color: 0x6f6a60, specular: 0xf3efe6, shininess: 42, rot: [Math.PI / 2, 0.1, 0], desks: ["sales", "crm", "school"] },
  { id: "goods", color: SIGNAL_HEX, specular: 0xe8c9a0, shininess: 58, rot: [0.52, 0.88, 0.12], desks: ["inventory", "purchase", "manufacturing"] },
  { id: "books", color: STEEL_HEX, specular: 0xc9c4b8, shininess: 36, rot: [1.18, -0.38, 0.52], desks: ["accounting", "hr"] },
];

function easeOutExpo(t) {
  return t >= 1 ? 1 : 1 - 2 ** (-10 * t);
}

function staggerAmt(t, i, n) {
  const delay = (i / Math.max(1, n - 1)) * 0.46;
  return easeOutExpo(Math.max(0, Math.min(1, (t - delay) / (1 - delay))));
}

function mulberry(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function reduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function viewAmt(id) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const b = el.getBoundingClientRect();
  const h = window.innerHeight;
  const overlap = Math.min(b.bottom, h) - Math.max(b.top, 0);
  if (overlap <= 0) return 0;
  return Math.max(0, Math.min(1, overlap / Math.min(h * 0.72, Math.max(1, b.height))));
}

function stageWorld(selector, cam) {
  const el = document.querySelector(selector);
  if (!el) return null;
  const b = el.getBoundingClientRect();
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  if (b.bottom < 24 || b.top > vh - 24) return null;
  const nx = ((b.left + b.width / 2) / vw) * 2 - 1;
  const ny = -(((b.top + b.height / 2) / vh) * 2 - 1);
  const z = cam.position.z;
  const worldH = 2 * z * Math.tan((cam.fov * Math.PI) / 360);
  const worldW = worldH * (vw / vh);
  return {
    x: nx * worldW * 0.5,
    y: ny * worldH * 0.5,
    w: (b.width / vw) * worldW,
    h: (b.height / vh) * worldH,
  };
}

function voucherTexture() {
  const c = document.createElement("canvas");
  c.width = 640;
  c.height = 400;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#f7f4ec";
  ctx.fillRect(0, 0, 640, 400);
  ctx.strokeStyle = "#14181f";
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, 620, 380);
  ctx.fillStyle = "#14181f";
  ctx.font = "700 36px 'Newsreader Variable', 'Newsreader', serif";
  ctx.fillText("Harborline", 32, 62);
  ctx.font = "500 18px 'JetBrains Mono', monospace";
  ctx.fillText("PURCHASE RECEIPT  PR-0001", 32, 96);
  ctx.fillStyle = "#5c5850";
  ctx.fillText("Supplier  Apex Mill", 32, 150);
  ctx.fillText("Warehouse  Main", 32, 180);
  ctx.fillText("Item  A36 steel bar × 10", 32, 230);
  ctx.fillStyle = "#7a6244";
  ctx.font = "700 28px 'Newsreader Variable', 'Newsreader', serif";
  ctx.fillText("Posted  +10  ·  $50,000", 32, 310);
  ctx.fillStyle = "#5c5850";
  ctx.font = "500 16px 'JetBrains Mono', monospace";
  ctx.fillText("Sample. Quantity and value together.", 32, 350);
  const tex = new CanvasTexture(c);
  tex.colorSpace = NoColorSpace;
  tex.needsUpdate = true;
  return tex;
}

export function mountWorld(canvas) {
  const mobile = window.innerWidth < 760;
  const reduced = reduceMotion();
  if (canvas.parentElement !== document.body) {
    document.body.insertBefore(canvas, document.body.firstChild);
  }
  const renderer = new WebGLRenderer({
    canvas,
    antialias: false,
    alpha: false,
    powerPreference: "high-performance",
    preserveDrawingBuffer: false,
  });
  renderer.outputColorSpace = LinearSRGBColorSpace;
  renderer.setClearColor(0xf3efe6, 1);
  renderer.autoClear = false;

  const camera = new PerspectiveCamera(60, 1, 0.1, 200);
  camera.position.set(0, 0, 0);

  const count = mobile ? 4200 : 6000;
  const rand = mulberry(1704);
  const seeds = new Float32Array(count * 4);
  const props = new Float32Array(count * 4);
  for (let i = 0; i < count; i++) {
    const j = rand();
    seeds[i * 4] = rand() * Math.PI * 2;
    seeds[i * 4 + 1] = 0.9 + 12.5 * Math.pow(j, 1.7);
    seeds[i * 4 + 2] = rand();
    seeds[i * 4 + 3] = (4 + Math.floor(rand() * 10)) / 8;
    props[i * 4] = Math.pow(rand(), 1.6);
    props[i * 4 + 1] = 0.35 + 0.65 * rand();
    props[i * 4 + 2] = rand();
    props[i * 4 + 3] = 0.5 + 1.7 * Math.pow(rand(), 4);
  }

  const streakGeo = new InstancedBufferGeometry();
  streakGeo.setAttribute(
    "position",
    new BufferAttribute(new Float32Array([0, -1, 0, 1, -1, 0, 1, 1, 0, 0, 1, 0]), 3)
  );
  streakGeo.setIndex([0, 1, 2, 0, 2, 3]);
  streakGeo.setAttribute("aSeed", new InstancedBufferAttribute(seeds, 4));
  streakGeo.setAttribute("aProp", new InstancedBufferAttribute(props, 4));
  streakGeo.instanceCount = count;

  const streakMat = new ShaderMaterial({
    vertexShader: STREAK_VERT,
    fragmentShader: STREAK_FRAG,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    blending: NormalBlending,
    uniforms: {
      uTravel: { value: 140 },
      uStretch: { value: 1 },
      uFar: { value: FAR },
      uNear: { value: NEAR },
      uWidth: { value: 1 },
      uDpr: { value: 1 },
      uAspect: { value: 1.4 },
      uGain: { value: 1 },
      uRes: { value: new Vector2(1, 1) },
      uVP: { value: new Vector2() },
      uInkCol: { value: INK },
      uSignal: { value: SIGNAL },
    },
  });
  const streaks = new Mesh(streakGeo, streakMat);
  streaks.frustumCulled = false;
  const streakScene = new Scene();
  streakScene.add(streaks);

  const quadGeo = new BufferGeometry();
  quadGeo.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3));
  const compMat = new ShaderMaterial({
    vertexShader: COMP_VERT,
    fragmentShader: COMP_FRAG,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
    uniforms: {
      uVPuv: { value: new Vector2(0.5, 0.45) },
      uCalmC: { value: new Vector2(0.3, 0.3) },
      uCalmR: { value: new Vector2(0.2, 0.2) },
      uRes: { value: new Vector2(1, 1) },
      uAspect: { value: 1.6 },
      uSpeed: { value: 1 },
      uCalm: { value: 1 },
      uDpr: { value: 1 },
      uInk: { value: 1 },
      uField: { value: 1 },
      uPaper: { value: PAPER },
      uInkCol: { value: INK },
      uSignal: { value: SIGNAL },
    },
  });
  const quad = new Mesh(quadGeo, compMat);
  quad.frustumCulled = false;
  const compScene = new Scene();
  compScene.add(quad);

  const overlayCam = new PerspectiveCamera(32, 1, 0.1, 80);
  overlayCam.position.set(0, 0.35, 9);
  const overlay = new Scene();
  overlay.fog = new Fog(0xf3efe6, 8.2, 14.5);
  overlay.add(new AmbientLight(0xf3efe6, 0.52));
  overlay.add(new HemisphereLight(0xfff6ea, 0x8a7a64, 0.78));
  const keyLight = new DirectionalLight(0xfff4e4, 0.92);
  keyLight.position.set(4.6, 6.4, 5.2);
  overlay.add(keyLight);
  const rimLight = new DirectionalLight(0xc4894a, 0.32);
  rimLight.position.set(-5.2, 1.4, -3.4);
  overlay.add(rimLight);
  const fillLight = new DirectionalLight(0xe8e2d4, 0.28);
  fillLight.position.set(-2.2, -3.5, 4);
  overlay.add(fillLight);

  const graph = new Group();
  overlay.add(graph);
  const dummy = new Object3D();
  const torusGeo = new TorusGeometry(RING_R, 0.055, 24, 128);
  const beadGeo = new SphereGeometry(0.078, 18, 18);
  const sparkGeo = new SphereGeometry(0.018, 10, 10);
  const rings = RINGS.map((spec) => {
    const group = new Group();
    group.rotation.set(...spec.rot);
    const mat = new MeshPhongMaterial({
      color: spec.color,
      specular: spec.specular,
      shininess: spec.shininess,
      emissive: spec.color,
      emissiveIntensity: 0.04,
      toneMapped: false,
    });
    const mesh = new Mesh(torusGeo, mat);
    group.add(mesh);
    const sparks = [];
    for (let i = 0; i < 7; i++) {
      const spark = new Mesh(
        sparkGeo,
        new MeshPhongMaterial({
          color: spec.color === SIGNAL_HEX ? BRASS_HI : spec.color,
          specular: 0xf3efe6,
          shininess: 70,
          toneMapped: false,
        })
      );
      spark.userData.offset = i * ((Math.PI * 2) / 7);
      group.add(spark);
      sparks.push(spark);
    }
    graph.add(group);
    return { ...spec, group, mesh, mat, sparks };
  });
  const beads = DESKS.map((desk) => {
    const ring = rings.find((r) => r.desks.includes(desk.id));
    const theta = ring.desks.indexOf(desk.id) * ((Math.PI * 2) / ring.desks.length);
    const mat = new MeshPhongMaterial({
      color: INK_HEX,
      specular: 0xf3efe6,
      shininess: 28,
      emissive: 0x000000,
      emissiveIntensity: 0,
      toneMapped: false,
    });
    const mesh = new Mesh(beadGeo, mat);
    mesh.position.set(Math.cos(theta) * RING_R, Math.sin(theta) * RING_R, 0);
    mesh.userData = { id: desk.id, ring, theta, mat };
    ring.group.add(mesh);
    return mesh;
  });
  const pulse = new Mesh(
    new SphereGeometry(0.055, 14, 14),
    new MeshPhongMaterial({
      color: BRASS_HI,
      specular: 0xf3efe6,
      shininess: 80,
      emissive: SIGNAL_HEX,
      emissiveIntensity: 0.35,
      toneMapped: false,
    })
  );
  pulse.visible = false;
  graph.add(pulse);
  const traceGeo = new BufferGeometry();
  traceGeo.setAttribute("position", new BufferAttribute(new Float32Array(6), 3));
  const trace = new Line(
    traceGeo,
    new LineDashedMaterial({
      color: BRASS_HI,
      dashSize: 0.11,
      gapSize: 0.07,
      transparent: true,
      opacity: 0.92,
      toneMapped: false,
    })
  );
  trace.visible = false;
  graph.add(trace);
  const worldA = new Vector3();
  const worldB = new Vector3();

  const blockCount = 27;
  const blockGeo = new BoxGeometry(0.3, 0.3, 0.3);
  const blockMat = new MeshPhongMaterial({
    color: PAPER_HEX,
    specular: 0xffffff,
    shininess: 12,
    toneMapped: false,
  });
  const blocks = new InstancedMesh(blockGeo, blockMat, blockCount);
  blocks.instanceColor = new InstancedBufferAttribute(new Float32Array(blockCount * 3), 3);
  const paperCol = new Color(PAPER_HEX);
  const brassCol = new Color(SIGNAL_HEX);
  const inkCol = new Color(0x2a2e34);
  const blockHome = [];
  const accent = 16;
  for (let i = 0; i < blockCount; i++) {
    const col = i % 3;
    const row = Math.floor(i / 3) % 3;
    const layer = Math.floor(i / 9);
    blockHome.push({
      x: (col - 1) * 0.38,
      y: (1 - row) * 0.38,
      z: (layer - 1) * 0.38,
      sx: (rand() - 0.5) * 2.4,
      sy: (rand() - 0.5) * 1.8,
      sz: (rand() - 0.5) * 2.2 + 0.8,
    });
    const c = i === accent ? brassCol : i % 7 === 0 ? inkCol : paperCol;
    blocks.setColorAt(i, c);
  }
  const blockRoot = new Group();
  blockRoot.add(blocks);
  overlay.add(blockRoot);

  const voucherTex = voucherTexture();
  const voucher = new Mesh(
    new BoxGeometry(2.38, 1.48, 0.045),
    [
      new MeshPhongMaterial({ color: 0xe8e2d4, specular: 0xf3efe6, shininess: 18, toneMapped: false }),
      new MeshPhongMaterial({ color: 0xe8e2d4, specular: 0xf3efe6, shininess: 18, toneMapped: false }),
      new MeshPhongMaterial({ color: 0xe8e2d4, specular: 0xf3efe6, shininess: 18, toneMapped: false }),
      new MeshPhongMaterial({ color: 0xe8e2d4, specular: 0xf3efe6, shininess: 18, toneMapped: false }),
      new MeshPhongMaterial({ map: voucherTex, color: 0xffffff, specular: 0xf3efe6, shininess: 14, toneMapped: false }),
      new MeshPhongMaterial({ color: 0x14181f, shininess: 8, toneMapped: false }),
    ]
  );
  overlay.add(voucher);

  let w = 1;
  let h = 1;
  let dpr = 1;
  let pxW = 4;
  let pxH = 4;
  const calm = { cx: 0.28, cy: 0.62, rx: 0.22, ry: 0.16 };

  const measureCalm = () => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const pad = 36;
    let L = Infinity;
    let T = Infinity;
    let R = -Infinity;
    let B = -Infinity;
    let hit = false;
    document.querySelectorAll("[data-calm]").forEach((el) => {
      const b = el.getBoundingClientRect();
      if (Math.min(b.bottom, vh) - Math.max(b.top, 0) < 10) return;
      hit = true;
      L = Math.min(L, b.left - pad);
      T = Math.min(T, b.top - pad);
      R = Math.max(R, b.right + pad);
      B = Math.max(B, b.bottom + pad);
    });
    if (!hit) {
      calm.rx = 0;
      calm.ry = 0;
      return;
    }
    calm.cx = (L + R) * 0.5 / vw;
    calm.cy = 1 - (T + B) * 0.5 / vh;
    calm.rx = Math.max(0.04, (R - L) * 0.5 / vw);
    calm.ry = Math.max(0.04, (B - T) * 0.5 / vh);
  };

  const resize = () => {
    w = Math.max(1, canvas.clientWidth || window.innerWidth);
    h = Math.max(1, canvas.clientHeight || window.innerHeight);
    dpr = Math.min(2, window.devicePixelRatio || 1);
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);
    pxW = Math.round(w * dpr);
    pxH = Math.round(h * dpr);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    overlayCam.aspect = w / h;
    overlayCam.updateProjectionMatrix();
    const u = streakMat.uniforms;
    u.uRes.value.set(pxW, pxH);
    u.uWidth.value = 1.15 * dpr;
    u.uDpr.value = dpr;
    u.uAspect.value = Math.min(2.1, Math.max(0.85, (w / h) * 0.95));
    const c = compMat.uniforms;
    c.uAspect.value = w / h;
    c.uRes.value.set(pxW, pxH);
    c.uDpr.value = dpr;
    measureCalm();
  };

  let ptrX = 0;
  let ptrY = 0;
  let smX = 0;
  let smY = 0;
  let idle = 99;
  let clock = 0;
  let travel = 140;
  let speed = 1;
  let lastScroll = window.scrollY;
  let vpX = 0;
  let vpY = 0;
  let raf = 0;
  let last = performance.now();

  const onPtr = (e) => {
    ptrX = (e.clientX / window.innerWidth) * 2 - 1;
    ptrY = -(e.clientY / window.innerHeight) * 2 + 1;
    idle = 0;
  };

  const vpBias = () => (window.innerWidth < 760 ? { x: 0.08, y: 0.42 } : { x: 0.22, y: 0.28 });

  const tick = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    clock += dt;
    idle += dt;
    const scrollY = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const p = Math.min(1, scrollY / max);
    const field = Math.max(0.22, 1 - Math.max(0, p - 0.78) / 0.18);
    const heroAmt = Math.max(viewAmt("hero"), p < 0.08 ? 1 : 0);
    const graphAmt = viewAmt("desks");
    const blockAmt = viewAmt("shape");
    const vocAmt = Math.max(heroAmt, viewAmt("ledger"));
    measureCalm();

    if (idle > 2.5) {
      ptrX = Math.sin(clock * 0.42) * 0.5;
      ptrY = Math.sin(clock * 0.29 + 1.3) * 0.38;
    }
    const ease = 1 - Math.exp(-2.6 * dt);
    smX += (ptrX - smX) * ease;
    smY += (ptrY - smY) * ease;
    const vel = dt > 0 ? Math.abs(scrollY - lastScroll) / dt : 0;
    lastScroll = scrollY;
    const targetSpeed = reduced ? 0.35 : 1 + 2.2 * p + Math.min(2.4, vel / 1100);
    const k = targetSpeed > speed ? 4.5 : 1.6;
    speed += (targetSpeed - speed) * (1 - Math.exp(-k * dt));
    travel = (travel + dt * speed * (reduced ? 4 : 15)) % TRAVEL_MOD;

    const bias = vpBias();
    const wantX = Math.max(-0.9, Math.min(0.9, smX * 0.45 + bias.x));
    const wantY = Math.max(-0.8, Math.min(0.8, smY * (mobile ? 0.12 : 0.32) + bias.y));
    const vL = 1 - Math.exp(-5 * dt);
    vpX += (wantX - vpX) * vL;
    vpY += (wantY - vpY) * vL;

    const tan = Math.tan((camera.fov * Math.PI) / 360);
    streakMat.uniforms.uTravel.value = travel;
    streakMat.uniforms.uStretch.value = 0.9 * Math.pow(speed, 1.25);
    streakMat.uniforms.uVP.value.set(vpX * tan * camera.aspect, vpY * tan);
    streakMat.uniforms.uGain.value = 1.15 + 0.1 * speed;
    camera.rotation.z = -vpX * 0.05;
    streakGeo.instanceCount = Math.floor(count * (reduced ? 0.45 : 0.62 + 0.38 * Math.min(1, speed / 3)));

    const cu = compMat.uniforms;
    cu.uVPuv.value.set(0.5 + vpX * 0.5, 0.5 + vpY * 0.5);
    cu.uSpeed.value = speed;
    cu.uCalm.value = calm.rx > 0.02 ? 1 : 0;
    cu.uCalmC.value.set(calm.cx, calm.cy);
    cu.uCalmR.value.set(calm.rx, calm.ry);
    cu.uField.value = field;
    cu.uInk.value = field;

    const hotId = document.documentElement.dataset.desk || "";
    const hotBead = beads.find((b) => b.userData.id === hotId);
    const hotRing = hotBead?.userData.ring || null;
    rings.forEach((ring) => {
      const on = !hotRing || ring === hotRing;
      ring.group.visible = true;
      ring.mesh.scale.setScalar(on && hotRing ? 1.035 : 1);
      ring.mat.emissiveIntensity = on && hotRing
        ? 0.18 + 0.16 * (0.5 + 0.5 * Math.sin(clock * 5.2))
        : 0.035;
      ring.sparks.forEach((spark, i) => {
        const th = spark.userData.offset + clock * (0.35 + i * 0.02);
        spark.position.set(Math.cos(th) * RING_R, Math.sin(th) * RING_R, 0);
        spark.visible = on;
        spark.scale.setScalar(on && hotRing ? 1.35 : 1);
      });
    });
    beads.forEach((bead) => {
      const on = !hotId || bead.userData.id === hotId;
      bead.userData.mat.color.setHex(on && hotId ? BRASS_HI : INK_HEX);
      bead.userData.mat.emissive.setHex(on && hotId ? SIGNAL_HEX : 0x000000);
      bead.userData.mat.emissiveIntensity = on && hotId ? 0.28 : 0;
      bead.scale.setScalar(on && hotId ? 1.55 : 0.92);
    });
    if (hotBead) {
      hotBead.getWorldPosition(worldA);
      graph.worldToLocal(worldA);
      const arr = traceGeo.attributes.position.array;
      arr[0] = worldA.x;
      arr[1] = worldA.y;
      arr[2] = worldA.z;
      arr[3] = 0;
      arr[4] = 0;
      arr[5] = 0;
      traceGeo.attributes.position.needsUpdate = true;
      traceGeo.computeBoundingSphere();
      trace.computeLineDistances();
      trace.visible = true;
      const th = hotBead.userData.theta + clock * 2.1;
      pulse.position.copy(hotBead.userData.ring.group.localToWorld(
        worldB.set(Math.cos(th) * RING_R, Math.sin(th) * RING_R, 0)
      ));
      graph.worldToLocal(pulse.position);
      pulse.visible = true;
    } else {
      trace.visible = false;
      pulse.visible = false;
    }

    const deskStage = stageWorld("[data-stage='desks']", overlayCam);
    const showGraph = deskStage && graphAmt > 0.08 && window.innerWidth > 760;
    graph.visible = !!showGraph;
    if (showGraph) {
      const s = Math.min(deskStage.w / 3.35, deskStage.h / 3.05) * 0.92;
      graph.position.set(deskStage.x + smX * 0.08, deskStage.y + smY * 0.03, 0);
      graph.scale.setScalar(Math.max(0.28, Math.min(1.35, s)));
      const idle = reduced ? 0 : clock * 0.22;
      graph.rotation.set(0.28 + smY * 0.1, idle + smX * 0.38, smX * 0.04);
    }

    const built = Math.min(1, Math.max(0, blockAmt));
    for (let i = 0; i < blockCount; i++) {
      const h0 = blockHome[i];
      const k = staggerAmt(built, i, blockCount);
      dummy.position.set(
        h0.x * k + h0.sx * (1 - k),
        h0.y * k + h0.sy * (1 - k),
        h0.z * k + h0.sz * (1 - k)
      );
      dummy.rotation.set((1 - k) * 1.1, (1 - k) * 0.85, (1 - k) * 0.4);
      dummy.scale.setScalar(0.55 + k * 0.45);
      dummy.updateMatrix();
      blocks.setMatrixAt(i, dummy.matrix);
    }
    blocks.instanceMatrix.needsUpdate = true;

    const shapeStage = stageWorld("[data-stage='shape']", overlayCam);
    const showBlocks = shapeStage && blockAmt > 0.08 && window.innerWidth > 760;
    blockRoot.visible = !!showBlocks;
    if (showBlocks) {
      const s = Math.min(shapeStage.w / 2.6, shapeStage.h / 2.2) * 0.9;
      blockRoot.position.set(shapeStage.x + smX * 0.1, shapeStage.y, 0);
      blockRoot.scale.setScalar(Math.max(0.28, Math.min(1.25, s)) * (1 + Math.sin(clock * 0.7) * 0.012));
      blockRoot.rotation.set(0.18 + smY * 0.06, (reduced ? 0 : clock * 0.2) + smX * 0.2, 0.04);
    }

    voucher.position.set(2.5 + smX * 0.16, 0.48 + Math.sin(clock * 0.65) * 0.07, 0.15);
    voucher.rotation.set(-0.1, -0.52 + smX * 0.12, -0.05);
    voucher.visible = vocAmt > 0.2 && graphAmt < 0.12 && blockAmt < 0.12 && window.innerWidth > 760;
    voucher.scale.setScalar(0.82 + vocAmt * 0.22);

    overlayCam.position.set(smX * 0.55, 0.32 + smY * 0.22, 9);
    overlayCam.lookAt(0, 0.05, 0);

    renderer.setClearColor(0xf3efe6, 1);
    renderer.clear();
    renderer.render(compScene, camera);
    renderer.render(streakScene, camera);
    if (graph.visible || blockRoot.visible || voucher.visible) {
      renderer.clearDepth();
      renderer.render(overlay, overlayCam);
    }
    raf = requestAnimationFrame(tick);
  };

  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  window.addEventListener("pointermove", onPtr, { passive: true });
  window.addEventListener("pointerdown", onPtr, { passive: true });
  document.fonts?.ready.then(measureCalm);
  window.addEventListener("load", measureCalm);
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    window.removeEventListener("pointermove", onPtr);
    window.removeEventListener("pointerdown", onPtr);
    streakGeo.dispose();
    streakMat.dispose();
    quadGeo.dispose();
    compMat.dispose();
    torusGeo.dispose();
    beadGeo.dispose();
    sparkGeo.dispose();
    traceGeo.dispose();
    pulse.geometry.dispose();
    pulse.material.dispose();
    blockGeo.dispose();
    blockMat.dispose();
    blocks.dispose();
    voucher.geometry.dispose();
    voucher.material.forEach((m) => {
      m.map?.dispose();
      m.dispose();
    });
    rings.forEach((ring) => {
      ring.mat.dispose();
      ring.sparks.forEach((spark) => spark.material.dispose());
    });
    beads.forEach((bead) => bead.userData.mat.dispose());
    renderer.dispose();
  };
}
