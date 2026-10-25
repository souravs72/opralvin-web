import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { DEPTS, CH, FLOW } from "../data.js";

const STONE = new THREE.Color("#f4f2ec");
const SCATTER = new THREE.Color("#7fa29c");
const AMBER = new THREE.Color("#f2a33a");
const INK = "#0d1716";

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const seg = (p, a, b) => clamp01((p - a) / (b - a));
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // cubic in-out
const hash = (n) => {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
};

function makeLabel(name, sub) {
  const c = document.createElement("canvas");
  c.width = 1024;
  c.height = 600;
  const g = c.getContext("2d");
  g.fillStyle = "#f4f2ec";
  g.fillRect(0, 0, c.width, c.height);
  g.fillStyle = INK;
  g.font = '700 116px "Bricolage Grotesque", "Instrument Sans", sans-serif';
  g.textBaseline = "alphabetic";
  const size = name.length > 11 ? 96 : 116;
  g.font = `700 ${size}px "Bricolage Grotesque", "Instrument Sans", sans-serif`;
  g.fillText(name, 64, 300);
  g.fillStyle = "#3b4a47";
  g.font = '500 58px "Instrument Sans", sans-serif';
  g.fillText(sub, 66, 400);
  g.fillStyle = "#f2a33a";
  g.fillRect(64, 470, 96, 14);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function World({ progress, pointer, reduce, compact }) {
  const { camera, gl, scene } = useThree();
  const root = useRef();
  const hub = useRef();
  const packet = useRef();
  const tiles = useRef([]);
  const links = useRef([]);
  const pulses = useRef([]);
  const sm = useRef({ p: 0, px: 0, py: 0 });

  // Soft studio reflections so the rounded tiles read as objects, not flat cards.
  useEffect(() => {
    const pm = new THREE.PMREMGenerator(gl);
    const env = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    return () => {
      env.dispose();
      pm.dispose();
    };
  }, [gl, scene]);

  const data = useMemo(() => {
    const rx = 4.5,
      ry = 2.7;
    return DEPTS.map((d, i) => {
      const a = Math.PI / 2 - (i * Math.PI * 2) / DEPTS.length;
      return {
        ...d,
        home: new THREE.Vector3(Math.cos(a) * rx, Math.sin(a) * ry, 0),
        scatter: new THREE.Vector3((hash(i + 1) * 2 - 1) * 8, (hash(i + 11) * 2 - 1) * 4.6, -2.5 + hash(i + 21) * 3.2),
        rot: new THREE.Euler((hash(i + 31) - 0.5) * 1.4, (hash(i + 41) - 0.5) * 1.8, (hash(i + 51) - 0.5) * 1.2),
        phase: i * 0.61,
      };
    });
  }, []);

  const geo = useMemo(() => new RoundedBoxGeometry(1.72, 1.02, 0.26, 5, 0.09), []);
  const labelGeo = useMemo(() => new THREE.PlaneGeometry(1.62, 0.95), []);
  const linkGeo = useMemo(() => new THREE.CylinderGeometry(0.022, 0.022, 1, 10, 1, true), []);
  const labels = useMemo(() => DEPTS.map((d) => makeLabel(d.name, d.sub)), []);
  // Redraw labels once the brand fonts have loaded, so the canvas text is never in a fallback face.
  useEffect(() => {
    document.fonts?.ready.then(() => {
      DEPTS.forEach((d, i) => {
        const fresh = makeLabel(d.name, d.sub);
        labels[i].image = fresh.image;
        labels[i].needsUpdate = true;
      });
    });
  }, [labels]);

  const tmp = useMemo(() => ({ v: new THREE.Vector3(), up: new THREE.Vector3(0, 1, 0), q: new THREE.Quaternion(), look: new THREE.Vector3(), from: new THREE.Vector3(), to: new THREE.Vector3() }), []);
  const flowPts = useMemo(() => FLOW.map((f) => (f.dept === "hub" ? new THREE.Vector3(0, 0, 0.4) : data.find((d) => d.id === f.dept).home.clone().setZ(0.45))), [data]);

  useFrame((state, dt) => {
    const s = sm.current;
    const k = reduce ? 1 : 1 - Math.exp(-dt * 6); // frame-rate independent damping
    s.p += (progress.current - s.p) * k;
    s.px += ((reduce ? 0 : pointer.current.x) - s.px) * (1 - Math.exp(-dt * 3));
    s.py += ((reduce ? 0 : pointer.current.y) - s.py) * (1 - Math.exp(-dt * 3));
    const p = s.p;
    const t = state.clock.elapsedTime;

    const scatter = ease(seg(p, CH.scatter[0] + 0.01, CH.scatter[0] + 0.12)) * (1 - ease(seg(p, CH.connect[0] + 0.01, CH.connect[0] + 0.12)));
    const linksOff = ease(seg(p, CH.scatter[0], CH.scatter[0] + 0.05));
    const flowT = seg(p, CH.flow[0] + 0.02, CH.flow[1] - 0.02) * (FLOW.length - 1);
    const step = Math.min(FLOW.length - 1, Math.floor(flowT + 0.0001));
    const local = flowT - step;
    const inFlow = p > CH.flow[0] && p < CH.flow[1];

    // root placement: text on the left on wide screens, model centred above text on phones
    const r = root.current;
    r.position.set(0, 0, 0);
    r.rotation.y = (reduce ? 0 : Math.sin(t * 0.18) * 0.05) + s.px * 0.12 - scatter * 0.12;
    r.rotation.x = -s.py * 0.06 + 0.04;

    // hub: the two linked rings of the mark
    const h = hub.current;
    h.rotation.y = reduce ? 0.5 : 0.5 + Math.sin(t * 0.35) * 0.35;
    h.rotation.x = reduce ? 0 : Math.sin(t * 0.27) * 0.12;
    const hubScale = 1 - scatter * 0.25 + (inFlow && step === FLOW.length - 1 ? 0.12 * Math.sin(Math.PI * clamp01(local * 1.4)) : 0);
    h.scale.setScalar(hubScale);

    data.forEach((d, i) => {
      const m = tiles.current[i];
      if (!m) return;
      tmp.v.copy(d.home).lerp(d.scatter, scatter);
      if (!reduce) tmp.v.y += Math.sin(t * 0.9 + d.phase) * 0.05;
      m.position.copy(tmp.v);
      m.rotation.set(d.rot.x * scatter, d.rot.y * scatter, d.rot.z * scatter);
      const active = inFlow && FLOW[step].dept === d.id ? Math.sin(Math.PI * clamp01(local * 1.25)) : 0;
      m.scale.setScalar(1 + active * 0.14);
      const mat = m.material;
      mat.color.copy(STONE).lerp(SCATTER, scatter);
      mat.emissive.copy(AMBER).multiplyScalar(active * 0.25);

      // link from hub to tile; length grows in during "connect", one after another
      const l = links.current[i];
      const grow = ease(seg(p, CH.connect[0] + 0.05 + i * 0.012, CH.connect[0] + 0.1 + i * 0.012));
      const on = Math.max(1 - linksOff, grow);
      tmp.to.copy(m.position);
      const len = tmp.to.length();
      tmp.v.copy(tmp.to).normalize();
      tmp.q.setFromUnitVectors(tmp.up, tmp.v);
      l.quaternion.copy(tmp.q);
      l.scale.set(1, Math.max(0.0001, len * on), 1);
      l.position.copy(tmp.v).multiplyScalar((len * on) / 2);
      l.visible = on > 0.01;

      // pulses travel outward along connected links
      const pu = pulses.current[i];
      const f = reduce ? 0.6 : (t * 0.32 + d.phase * 0.37) % 1;
      pu.position.copy(tmp.to).multiplyScalar(f * on);
      pu.visible = on > 0.95 && !inFlow;
    });

    // the order packet
    const pk = packet.current;
    if (inFlow) {
      const next = Math.min(step + 1, FLOW.length - 1);
      const move = ease(seg(local, 0.55, 1));
      tmp.from.copy(flowPts[step]);
      tmp.to.copy(flowPts[next]);
      pk.position.copy(tmp.from).lerp(tmp.to, move);
      pk.position.z += Math.sin(Math.PI * move) * 0.9;
      pk.visible = true;
      pk.scale.setScalar(1 + (reduce ? 0 : Math.sin(t * 6) * 0.08));
    } else pk.visible = false;

    // camera: a slow push-in during the order's journey
    const push = ease(seg(p, CH.flow[0], CH.flow[0] + 0.06)) * (1 - ease(seg(p, CH.settle[0], CH.settle[0] + 0.08)));
    const aspect = state.size.width / Math.max(1, state.size.height);
    const baseZ = Math.max(15.5, 6.1 / (0.2867 * aspect));
    camera.position.set(s.px * 0.4, s.py * 0.25 + 0.15, baseZ - push * 1.0);
    tmp.look.set(push * 0.3, 0, 0);
    camera.lookAt(tmp.look);
  });

  return (
    <group ref={root}>
      <group ref={hub}>
        <mesh position={[-0.46, 0, 0]}>
          <torusGeometry args={[0.72, 0.16, 32, 120]} />
          <meshStandardMaterial color="#f4f2ec" roughness={0.32} metalness={0.05} />
        </mesh>
        <mesh position={[0.46, 0, 0]} rotation={[0, Math.PI / 2.4, 0]}>
          <torusGeometry args={[0.72, 0.16, 32, 120]} />
          <meshStandardMaterial color="#f2a33a" roughness={0.3} metalness={0.1} />
        </mesh>
      </group>
      {data.map((d, i) => (
        <group key={d.id}>
          <mesh ref={(el) => (links.current[i] = el)} geometry={linkGeo}>
            <meshBasicMaterial color="#f2a33a" toneMapped={false} />
          </mesh>
          <mesh ref={(el) => (pulses.current[i] = el)}>
            <sphereGeometry args={[0.06, 16, 12]} />
            <meshBasicMaterial color="#ffd38a" toneMapped={false} />
          </mesh>
          <mesh ref={(el) => (tiles.current[i] = el)} geometry={geo}>
            <meshStandardMaterial roughness={0.45} metalness={0} color="#f4f2ec" emissive="#000000" />
            <mesh geometry={labelGeo} position={[0, 0, 0.131]}>
              <meshBasicMaterial map={labels[i]} toneMapped={false} />
            </mesh>
          </mesh>
        </group>
      ))}
      <mesh ref={packet} visible={false}>
        <sphereGeometry args={[0.2, 32, 24]} />
        <meshStandardMaterial color="#f2a33a" emissive="#f2a33a" emissiveIntensity={0.6} roughness={0.25} />
      </mesh>
    </group>
  );
}

export default function Scene({ progress, active, reduce, compact }) {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (reduce || compact) return;
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, compact]);

  return (
    <Canvas
      className="scene-canvas"
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ fov: 32, position: [0, 0, 15], near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      aria-hidden="true"
    >
      <hemisphereLight args={["#ffffff", "#0b4f4a", 0.9]} />
      <directionalLight position={[4, 6, 8]} intensity={1.6} />
      <World progress={progress} pointer={pointer} reduce={reduce} compact={compact} />
    </Canvas>
  );
}
