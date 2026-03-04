import { useState, useEffect, useRef} from "react";
import * as THREE from "three";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

/* ════════════════════════════════════════════════════════════
   CONFIG
════════════════════════════════════════════════════════════ */
const config = {
  name: "Chaitanya Sethi",
  title: "Mobile · Cloud · Full‑Stack Engineer",
  sub: "Building High‑Performance Apps With AI & Scalable Architectures",
  skills: [
    { name:"Flutter",      color:"#38bdf8", level:95 },
    { name:"Dart",         color:"#0ea5e9", level:93 },
    { name:"ReactJS",      color:"#34d399", level:92 },
    { name:"Firebase",     color:"#fbbf24", level:90 },
    { name:"Tailwind CSS", color:"#22d3ee", level:90 },
    { name:"NextJS",       color:"#e2e8f0", level:88 },
    { name:"NodeJS",       color:"#4ade80", level:87 },
    { name:"ExpressJS",    color:"#94a3b8", level:85 },
    { name:"Google Cloud", color:"#60a5fa", level:85 },
    { name:"Java",         color:"#fb923c", level:99 },
    { name:"MongoDB",      color:"#86efac", level:83 },
    { name:"Supabase",     color:"#2dd4bf", level:80 },
    { name:"AWS",          color:"#fb923c", level:78 },
    { name:"XML",          color:"#94a3b8", level:75 },
  ],
  projects: [
    { id:1, title:"Zizzle",       sub:"AI‑Powered Social Media App",
      desc:"Next‑gen Flutter social platform — optimized reel engine, real‑time chat, creator monetization (₹19/₹99/₹249), global content boosting, and Gemini AI utilities.",
      tech:["Flutter","Dart","Firebase","NodeJS","Google Cloud","Gemini API"],
      live:"https://play.google.com/store/apps/details?id=com.InbredTechno.Zizzle",
      repo:"https://github.com/sethi12/zizzle",
      type:"Mobile", g:["#38bdf8","#818cf8"], stat:"Play Store Live" },
    { id:2, title:"RJ Attires",   sub:"Modern E‑Commerce Platform",
      desc:"High‑performance fashion e‑commerce with dynamic catalogs, SSR, advanced filtering and secure cart built with Next.js.",
      tech:["NextJS","Tailwind CSS","Material UI","NodeJS","ExpressJS","Firebase"],
      live:"https://rj-attires.vercel.app/", repo:"https://github.com/sethi12/rj-attires",
      type:"Web", g:["#fbbf24","#f97316"], stat:"SSR Optimized" },
    { id:3, title:"MediBook",     sub:"Doctor Appointment System",
      desc:"Real‑time appointment platform — patient & doctor dashboards, calendar integration, live availability checks.",
      tech:["NextJS","Tailwind CSS","Bootstrap","NodeJS","ExpressJS","Firebase"],
      live:"https://doctor-appointment-eight-phi.vercel.app/", repo:"https://github.com/sethi12/doctor-appointment",
      type:"Web", g:["#34d399","#22d3ee"], stat:"Real‑time" },
    { id:4, title:"ShopCore",     sub:"React + Firebase E‑Commerce",
      desc:"Dynamic e‑commerce — auth, product filtering, cart, wishlist, Firebase real‑time DB with optimized queries.",
      tech:["ReactJS","NodeJS","Firebase","Tailwind CSS"],
      live:"#", repo:"#",
      type:"Web", g:["#818cf8","#38bdf8"], stat:"Real‑time DB" },
    { id:5, title:"Enterprise API", sub:"MERN Stack Backend",
      desc:"Scalable backend — Express APIs, JWT auth, role‑based access, order workflow, MongoDB aggregation pipelines.",
      tech:["ReactJS","ExpressJS","MongoDB","Bootstrap"],
      live:"#", repo:"#",
      type:"Backend", g:["#fb923c","#fbbf24"], stat:"Enterprise" },
  ],
  contact: {
    email:"sethichaitanya03@gmail.com",
    linkedin:"https://www.linkedin.com/in/chaitanya-sethi-420974229/",
    github:"https://github.com/sethi12",
  },
};

/* ════════════════════════════════════════════════════════════
   GLOBAL STYLES
════════════════════════════════════════════════════════════ */
const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --c:#00e5ff;--c2:#38bdf8;--g:#34d399;--i:#818cf8;--w:#fbbf24;
      --dark:#00040a;--d2:#010810;
      --grd:linear-gradient(135deg,#00e5ff,#38bdf8,#34d399);
    }
    html{scroll-behavior:smooth}
    body{font-family:'Rajdhani',sans-serif;background:var(--dark);color:#e2e8f0;overflow-x:hidden;cursor:none!important}
    *{cursor:none!important}
    ::-webkit-scrollbar{width:3px}
    ::-webkit-scrollbar-track{background:#00040a}
    ::-webkit-scrollbar-thumb{background:linear-gradient(180deg,#00e5ff,#34d399);border-radius:2px}

    /* Fonts */
    .fo{font-family:'Orbitron',monospace}
    .fr{font-family:'Rajdhani',sans-serif}
    .fm{font-family:'JetBrains Mono',monospace}

    /* Keyframes */
    @keyframes scan{0%{top:-2px}100%{top:100vh}}
    @keyframes hpulse{
      0%,100%{box-shadow:0 0 20px rgba(0,229,255,.2),0 0 60px rgba(0,229,255,.07),inset 0 0 30px rgba(0,229,255,.03)}
      50%    {box-shadow:0 0 50px rgba(0,229,255,.45),0 0 120px rgba(0,229,255,.15),inset 0 0 50px rgba(0,229,255,.08)}
    }
    @keyframes glitch{
      0%,90%,100%{transform:translate(0);clip-path:none;opacity:1}
      91%{transform:translate(-3px,1px);clip-path:polygon(0 15%,100% 15%,100% 30%,0 30%);opacity:.8}
      93%{transform:translate(3px,-1px);clip-path:polygon(0 55%,100% 55%,100% 70%,0 70%);opacity:.8}
      95%{transform:translate(-2px,2px);clip-path:none;opacity:1}
    }
    @keyframes flicker{
      0%,89%,100%{opacity:1}
      90%{opacity:.4}91%{opacity:1}94%{opacity:.6}95%{opacity:1}
    }
    @keyframes rotateSlow{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}
    @keyframes orbit{0%{transform:rotateZ(0deg) rotateX(72deg)}100%{transform:rotateZ(360deg) rotateX(72deg)}}
    @keyframes float{0%,100%{transform:translateY(0) rotateY(0deg)}50%{transform:translateY(-18px) rotateY(8deg)}}
    @keyframes dataPulse{0%,100%{opacity:.3;transform:scaleX(1)}50%{opacity:1;transform:scaleX(1.05)}}
    @keyframes cornerSpin{0%{transform:rotate(0deg)}100%{transform:rotate(90deg)}}
    @keyframes beam{0%{transform:translateX(-100%)}100%{transform:translateX(200%)}}
    @keyframes hexPulse{0%,100%{opacity:.15}50%{opacity:.4}}
    @keyframes rise{0%{transform:translateY(100%);opacity:0}100%{transform:translateY(0);opacity:1}}
    @keyframes depthPop{0%{transform:perspective(800px) translateZ(-80px) rotateX(8deg);opacity:0}100%{transform:perspective(800px) translateZ(0) rotateX(0deg);opacity:1}}

    /* Glow text */
    .neon{animation:flicker 7s infinite;text-shadow:0 0 10px #00e5ff,0 0 20px #00e5ff,0 0 40px #00e5ff,0 0 80px #38bdf8}

    /* Glitch */
    .glitch{position:relative}
    .glitch::before,.glitch::after{content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none}
    .glitch::before{color:#38bdf8;animation:glitch 6s infinite;clip-path:polygon(0 0,100% 0,100% 45%,0 45%)}
    .glitch::after{color:#34d399;animation:glitch 6s 1s infinite reverse;clip-path:polygon(0 55%,100% 55%,100% 100%,0 100%)}

    /* Holographic border pulse */
    .holo{animation:hpulse 3s ease-in-out infinite}

    /* Scan line */
    .scanline::after{content:'';position:fixed;left:0;right:0;height:2px;
      background:linear-gradient(90deg,transparent,rgba(0,229,255,.35),transparent);
      animation:scan 12s linear infinite;pointer-events:none;z-index:9990}

    /* Cyber button */
    .cbtn{position:relative;clip-path:polygon(12px 0%,100% 0%,calc(100% - 12px) 100%,0% 100%);
      transition:transform .2s,box-shadow .2s}
    .cbtn:hover{transform:translateY(-4px)}
    .cbtn::after{content:'';position:absolute;top:0;left:-100%;width:50%;height:100%;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent);
      animation:beam 2.5s ease-in-out infinite}

    /* Progress */
    .pbar{height:3px;border-radius:2px;background:rgba(255,255,255,.06);overflow:hidden;position:relative}
    .pfill{height:100%;border-radius:2px;position:relative}
    .pfill::after{content:'';position:absolute;right:0;top:-2px;width:6px;height:6px;border-radius:50%;
      background:inherit;box-shadow:0 0 8px currentColor;filter:brightness(1.5)}

    /* 3D card */
    .card3d{transform-style:preserve-3d;transition:transform .08s ease-out}

    /* Section layout */
    .sw{padding:100px 28px;max-width:1220px;margin:0 auto}
    .g2{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}
    .g3{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
    .gc{display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start}

    @media(max-width:980px){
      .g2{grid-template-columns:1fr;gap:44px}
      .g3{grid-template-columns:1fr 1fr;gap:22px}
      .gc{grid-template-columns:1fr;gap:36px}
      .sw{padding:80px 18px}
    }
    @media(max-width:580px){
      .g3{grid-template-columns:1fr}
      .sw{padding:60px 14px}
    }

    /* Responsive type */
    .hn{font-size:clamp(38px,11vw,130px)}
    .hsub{font-size:clamp(14px,2.5vw,22px)}
    .stn{font-size:clamp(22px,4.5vw,34px)}
    .sh2{font-size:clamp(26px,5vw,48px)}

    /* Hex pattern overlay */
    .hexbg{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath fill='none' stroke='rgba(0,229,255,0.04)' stroke-width='1' d='M28 2L54 17L54 47L28 62L2 47L2 17Z M28 62L54 77L54 107L28 122L2 107L2 77Z'/%3E%3C/svg%3E");background-size:56px 100px}

    /* Nav responsive */
    @media(max-width:520px){
      .nlabel{display:none}
      .ndot{display:block!important}
    }

    /* Depth animation on scroll reveal */
    .depth-reveal{animation:depthPop .8s ease-out forwards}
  `}</style>
);

/* ════════════════════════════════════════════════════════════
   THREE.JS SCENE — Rotating 3D torus + floating particles
════════════════════════════════════════════════════════════ */
const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 5);

    // ── Wireframe torus knot (the centrepiece) ──────────────
    const torusGeo = new THREE.TorusKnotGeometry(1.4, 0.38, 180, 20, 2, 3);
    const torusMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    scene.add(torus);

    // ── Inner solid torus (glowing core) ───────────────────
    const innerGeo = new THREE.TorusKnotGeometry(1.4, 0.3, 100, 12, 2, 3);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    scene.add(inner);

    // ── Icosahedron rings ───────────────────────────────────
    [2.6, 3.2, 3.8].forEach((r, idx) => {
      const geo = new THREE.IcosahedronGeometry(r, 1);
      const mat = new THREE.MeshBasicMaterial({
        color: idx === 1 ? 0x38bdf8 : 0x00e5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.04 - idx * 0.008,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { speed: 0.0008 + idx * 0.0004, axis: new THREE.Vector3(idx % 2, 1 - idx % 2, 0.5).normalize() };
      scene.add(mesh);
    });

    // ── Floating particles ──────────────────────────────────
    const pCount = 1200;
    const pPositions = new Float32Array(pCount * 3);
    const pColors = new Float32Array(pCount * 3);
    const palette = [
      new THREE.Color(0x00e5ff),
      new THREE.Color(0x38bdf8),
      new THREE.Color(0x34d399),
      new THREE.Color(0x818cf8),
    ];
    for (let i = 0; i < pCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 2.5 + Math.random() * 7;
      pPositions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pPositions[i * 3 + 2] = r * Math.cos(phi);
      const col = palette[Math.floor(Math.random() * palette.length)];
      pColors[i * 3] = col.r; pColors[i * 3 + 1] = col.g; pColors[i * 3 + 2] = col.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(pColors, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Mouse parallax ──────────────────────────────────────
    let mx = 0, my = 0;
    const onMouse = (e) => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    // ── Resize ──────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animate ─────────────────────────────────────────────
    let frame;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      torus.rotation.x = t * 0.18;
      torus.rotation.y = t * 0.22;
      inner.rotation.x = -t * 0.14;
      inner.rotation.z = t * 0.16;

      scene.children.forEach(obj => {
        if (obj.userData.speed) {
          obj.rotateOnAxis(obj.userData.axis, obj.userData.speed);
        }
      });

      particles.rotation.y = t * 0.04;
      particles.rotation.x = t * 0.02;

      // Smooth parallax
      camera.position.x += (mx * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (-my * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Pulse opacity
      torusMat.opacity = 0.14 + Math.sin(t * 1.2) * 0.06;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed", inset: 0, zIndex: 0,
        pointerEvents: "none",
        width: "100vw", height: "100vh",
      }}
    />
  );
};

/* ════════════════════════════════════════════════════════════
   MATRIX RAIN CANVAS
════════════════════════════════════════════════════════════ */
const MatrixRain = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    const resize = () => { c.width = window.innerWidth; c.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    let drops = Array(Math.floor(c.width / 20)).fill(1);
    const chars = "01アイウエオカサタナバパZX∆Ω∞";
    let raf;
    const draw = () => {
      ctx.fillStyle = "rgba(0,4,10,.055)";
      ctx.fillRect(0, 0, c.width, c.height);
      drops.forEach((y, i) => {
        const bright = Math.random() > 0.98;
        ctx.fillStyle = bright ? "rgba(255,255,255,.9)" : "rgba(0,229,255,.1)";
        ctx.font = `${bright ? "bold " : ""}12px JetBrains Mono`;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 20, y * 20);
        if (y * 20 > c.height && Math.random() > .975) drops[i] = 0;
        drops[i]++;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed", inset:0, zIndex:0, opacity:.22, pointerEvents:"none" }} />;
};

/* ════════════════════════════════════════════════════════════
   AMBIENT ORBS
════════════════════════════════════════════════════════════ */
const Orbs = () => (
  <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", overflow:"hidden" }}>
    {[
      { x:"5%",  y:"10%", s:500, c:"rgba(0,229,255,.04)",  d:0 },
      { x:"70%", y:"5%",  s:600, c:"rgba(56,189,248,.035)",d:2.5 },
      { x:"50%", y:"60%", s:400, c:"rgba(52,211,153,.03)", d:5 },
      { x:"10%", y:"75%", s:350, c:"rgba(129,140,248,.04)",d:1 },
      { x:"85%", y:"70%", s:300, c:"rgba(0,229,255,.025)", d:3 },
    ].map((o,i) => (
      <motion.div key={i}
        style={{ position:"absolute", left:o.x, top:o.y, width:o.s, height:o.s,
          borderRadius:"50%", background:`radial-gradient(circle,${o.c} 0%,transparent 70%)`,
          filter:"blur(60px)" }}
        animate={{ y:[0,-45,0], x:[0,20,0], scale:[1,1.12,1] }}
        transition={{ duration:9+i*2, repeat:Infinity, delay:o.d, ease:"easeInOut" }}
      />
    ))}
    {/* Fine grid */}
    <div style={{ position:"absolute", inset:0,
      backgroundImage:"linear-gradient(rgba(0,229,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,.018) 1px,transparent 1px)",
      backgroundSize:"70px 70px" }} />
  </div>
);

/* ════════════════════════════════════════════════════════════
   CUSTOM CURSOR
════════════════════════════════════════════════════════════ */
const Cursor = () => {
  const cx=useMotionValue(-200), cy=useMotionValue(-200);
  const sx=useSpring(cx,{stiffness:700,damping:32}), sy=useSpring(cy,{stiffness:700,damping:32});
  const tx=useSpring(cx,{stiffness:80,damping:18}),  ty=useSpring(cy,{stiffness:80,damping:18});
  const [click,setClick]=useState(false);
  useEffect(()=>{
    const mv = e => { cx.set(e.clientX-8); cy.set(e.clientY-8); };
    const md = ()=>setClick(true), mu = ()=>setClick(false);
    window.addEventListener("mousemove",mv);
    window.addEventListener("mousedown",md);
    window.addEventListener("mouseup",mu);
    return ()=>{ window.removeEventListener("mousemove",mv); window.removeEventListener("mousedown",md); window.removeEventListener("mouseup",mu); };
  },[]);
  return(<>
    <motion.div style={{x:sx,y:sy,position:"fixed",zIndex:99999,pointerEvents:"none",top:0,left:0}}>
      <motion.div animate={{scale:click?.3:1}}
        style={{width:16,height:16,borderRadius:"50%",background:"#00e5ff",
          boxShadow:"0 0 24px #00e5ff,0 0 48px #00e5ff,0 0 4px #fff",mixBlendMode:"screen"}}/>
    </motion.div>
    <motion.div style={{x:tx,y:ty,position:"fixed",zIndex:99998,pointerEvents:"none",top:0,left:0}}>
      <motion.div animate={{scale:click?2.5:1,rotate:click?45:0}}
        style={{width:44,height:44,borderRadius:"50%",
          border:"1px solid rgba(0,229,255,.5)",
          transform:"translate(-14px,-14px)",mixBlendMode:"screen"}}/>
    </motion.div>
  </>);
};

/* ════════════════════════════════════════════════════════════
   SECTION HEADER (3D depth)
════════════════════════════════════════════════════════════ */
const SH = ({ num, title, accent }) => (
  <motion.div
    initial={{ opacity:0, z:-40, rotateX:12 }} whileInView={{ opacity:1, z:0, rotateX:0 }}
    viewport={{ once:true }} transition={{ duration:.9, ease:"easeOut" }}
    style={{ marginBottom:56, transformStyle:"preserve-3d", perspective:600 }}
  >
    <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:10 }}>
      <span className="fm" style={{ color:"rgba(0,229,255,.4)", fontSize:11, letterSpacing:5 }}>{num}</span>
      <div style={{ flex:1, height:1, background:"linear-gradient(90deg,rgba(0,229,255,.3),transparent)" }} />
      <span className="fm" style={{ color:"rgba(0,229,255,.2)", fontSize:9, letterSpacing:3 }}>REACT.JS</span>
    </div>
    <h2 className="fo sh2" style={{ fontWeight:900, letterSpacing:3, transformStyle:"preserve-3d" }}>
      <span style={{ color:"#fff" }}>{title} </span>
      <span style={{ color:"var(--c)", textShadow:"0 0 30px rgba(0,229,255,.5), 0 4px 20px rgba(0,229,255,.2)" }}>{accent}</span>
    </h2>
    <div style={{ marginTop:12, width:80, height:2, background:"linear-gradient(90deg,var(--c),transparent)",
      boxShadow:"0 0 10px rgba(0,229,255,.6)" }} />
  </motion.div>
);

/* ════════════════════════════════════════════════════════════
   HERO
════════════════════════════════════════════════════════════ */
const Hero = ({ onContact }) => {
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState(0);
  const phrases = ["Flutter & Dart Engineer","Cloud Architect","Full‑Stack Developer","AI App Builder","Mobile Innovator"];
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useTransform(my, [-400,400], [6,-6]);
  const ry = useTransform(mx, [-600,600], [-6,6]);

  useEffect(() => {
    const p = phrases[phase % phrases.length]; let i = 0; setTyped("");
    const t = setInterval(() => {
      if (i <= p.length) { setTyped(p.slice(0,i)); i++; }
      else { clearInterval(t); setTimeout(() => setPhase(x=>x+1), 1800); }
    }, 68);
    return () => clearInterval(t);
  }, [phase]);

  return (
    <section id="hero"
      style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center",
        padding:"80px 20px 48px", position:"relative", overflow:"hidden" }}
    >
      {/* Animated corner brackets */}
      {[
        {style:{top:20,left:20},  borders:{borderTop:"2px solid var(--c)",borderLeft:"2px solid var(--c)"}},
        {style:{top:20,right:20}, borders:{borderTop:"2px solid var(--c)",borderRight:"2px solid var(--c)"}},
        {style:{bottom:20,left:20}, borders:{borderBottom:"2px solid var(--c)",borderLeft:"2px solid var(--c)"}},
        {style:{bottom:20,right:20},borders:{borderBottom:"2px solid var(--c)",borderRight:"2px solid var(--c)"}},
      ].map((b,i) => (
        <motion.div key={i}
          animate={{ opacity:[.3,.7,.3] }} transition={{ duration:2+i*.5, repeat:Infinity, delay:i*.3 }}
          style={{ position:"absolute", ...b.style, width:32, height:32, ...b.borders }} />
      ))}

      {/* Horizontal data lines */}
      {[...Array(3)].map((_,i)=>(
        <motion.div key={i}
          style={{ position:"absolute", left:0, right:0, top:`${25+i*25}%`, height:1,
            background:"linear-gradient(90deg,transparent,rgba(0,229,255,.06),transparent)" }}
          animate={{ opacity:[0,.4,0] }} transition={{ duration:3, repeat:Infinity, delay:i*1.2 }}
        />
      ))}

      {/* Main 3D tilt wrapper */}
      <motion.div
        style={{ rotateX:rx, rotateY:ry, transformStyle:"preserve-3d", perspective:1200 }}
        onMouseMove={e=>{ mx.set(e.clientX-window.innerWidth/2); my.set(e.clientY-window.innerHeight/2); }}
        className="text-center"
        initial={{ opacity:0, y:80, rotateX:20 }} animate={{ opacity:1, y:0, rotateX:0 }}
        transition={{ duration:1.3, ease:"easeOut" }}
      >
        {/* Availability badge */}
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} transition={{ delay:.3 }}
          style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"6px 22px",
            borderRadius:100, border:"1px solid rgba(0,229,255,.25)",
            background:"rgba(0,229,255,.04)", marginBottom:28,
            backdropFilter:"blur(10px)" }}
        >
          <motion.div animate={{ scale:[1,1.8,1], opacity:[1,.4,1] }} transition={{ duration:1.8, repeat:Infinity }}
            style={{ width:8, height:8, borderRadius:"50%", background:"#00ff88",
              boxShadow:"0 0 12px #00ff88" }} />
          <span className="fm" style={{ color:"rgba(0,229,255,.8)", fontSize:10, letterSpacing:4 }}>
            AVAILABLE FOR HIRE
          </span>
        </motion.div>

        {/* 3D floating name block */}
        <motion.div style={{ transformStyle:"preserve-3d", transform:"translateZ(60px)" }}>
          <motion.h1
            className="fo hn glitch neon"
            data-text="CHAITANYA"
            animate={{ textShadow:["0 0 10px #00e5ff,0 0 20px #00e5ff,0 0 40px #00e5ff","0 0 20px #00e5ff,0 0 60px #00e5ff,0 0 80px #38bdf8","0 0 10px #00e5ff,0 0 20px #00e5ff,0 0 40px #00e5ff"] }}
            transition={{ duration:3, repeat:Infinity }}
            style={{ fontWeight:900, color:"#fff", letterSpacing:5, lineHeight:.88, marginBottom:8,
              transformStyle:"preserve-3d", filter:"drop-shadow(0 8px 30px rgba(0,229,255,.3))" }}
          >
            CHAITANYA
          </motion.h1>
          <motion.h1
            className="fo hn"
            style={{ fontWeight:900, background:"linear-gradient(135deg,#00e5ff 0%,#38bdf8 40%,#34d399 100%)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              letterSpacing:5, lineHeight:.88, marginBottom:36,
              filter:"drop-shadow(0 12px 40px rgba(0,229,255,.35))",
              transformStyle:"preserve-3d", transform:"translateZ(20px)" }}
          >
            SETHI
          </motion.h1>
        </motion.div>

        {/* Typing */}
        <div style={{ marginBottom:14, height:40, display:"flex", justifyContent:"center", alignItems:"center" }}>
          <span className="fm hsub" style={{ color:"var(--c)", letterSpacing:2 }}>
            {typed}
            <motion.span animate={{ opacity:[1,0,1] }} transition={{ duration:.7, repeat:Infinity }}
              style={{ color:"var(--g)" }}>_</motion.span>
          </span>
        </div>

        <p className="fr" style={{ fontSize:"clamp(13px,1.9vw,16px)", color:"rgba(226,232,240,.5)",
          maxWidth:520, margin:"0 auto 44px", letterSpacing:1, lineHeight:1.7 }}>
          Building High‑Performance Apps With AI &amp; Scalable Architectures
        </p>

        {/* CTAs */}
        <motion.div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:.9 }}>
          <motion.a href="#projects" className="cbtn"
            whileHover={{ scale:1.07 }} whileTap={{ scale:.93 }}
            style={{ padding:"14px 38px", background:"linear-gradient(135deg,rgba(0,229,255,.18),rgba(0,229,255,.04))",
              border:"1px solid var(--c)", color:"var(--c)", fontFamily:"'Orbitron',monospace",
              fontSize:11, fontWeight:700, letterSpacing:3, textDecoration:"none", display:"inline-block",
              boxShadow:"0 0 20px rgba(0,229,255,.2),inset 0 0 20px rgba(0,229,255,.04)" }}>
            VIEW WORK
          </motion.a>
          <motion.button onClick={onContact} className="cbtn"
            whileHover={{ scale:1.07 }} whileTap={{ scale:.93 }}
            style={{ padding:"14px 38px", background:"linear-gradient(135deg,rgba(52,211,153,.18),rgba(52,211,153,.04))",
              border:"1px solid var(--g)", color:"var(--g)", fontFamily:"'Orbitron',monospace",
              fontSize:11, fontWeight:700, letterSpacing:3, cursor:"none",
              boxShadow:"0 0 20px rgba(52,211,153,.2),inset 0 0 20px rgba(52,211,153,.04)" }}>
            CONTACT
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div style={{ display:"flex", gap:"clamp(20px,5vw,56px)", justifyContent:"center", marginTop:56, flexWrap:"wrap" }}
          initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.2 }}>
          {[["5+","Projects"],["3+","Years Exp"],["15+","Technologies"],["MCA","Amity Univ"]].map(([n,l])=>(
            <motion.div key={l} whileHover={{ scale:1.1, y:-4 }} style={{ textAlign:"center", cursor:"none" }}>
              <div className="fo stn" style={{ fontWeight:900, color:"var(--c)",
                textShadow:"0 0 20px rgba(0,229,255,.5)", transform:"translateZ(10px)" }}>{n}</div>
              <div className="fm" style={{ fontSize:9, color:"rgba(226,232,240,.35)", letterSpacing:3, marginTop:4 }}>{l}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div animate={{ y:[0,14,0] }} transition={{ duration:2, repeat:Infinity }}
        style={{ position:"absolute", bottom:28, left:"50%", transform:"translateX(-50%)",
          display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
        <span className="fm" style={{ fontSize:8, color:"rgba(0,229,255,.3)", letterSpacing:5 }}>SCROLL</span>
        <div style={{ width:1, height:48, background:"linear-gradient(180deg,var(--c),transparent)" }}/>
      </motion.div>

      {/* Floating tech chips (decorative) */}
      {["React","Three.js","Framer"].map((t,i)=>(
        <motion.div key={t}
          animate={{ y:[0,-12,0], opacity:[.4,.7,.4] }}
          transition={{ duration:4+i, repeat:Infinity, delay:i*1.5 }}
          style={{ position:"absolute",
            ...(i===0 ? {left:"5%",bottom:"30%"} : i===1 ? {right:"6%",top:"35%"} : {right:"8%",bottom:"25%"}),
            padding:"4px 12px", border:"1px solid rgba(0,229,255,.2)",
            borderRadius:100, background:"rgba(0,229,255,.04)",
            backdropFilter:"blur(8px)" }}
        >
          <span className="fm" style={{ fontSize:9, color:"rgba(0,229,255,.6)", letterSpacing:2 }}>{t}</span>
        </motion.div>
      ))}
    </section>
  );
};

/* ════════════════════════════════════════════════════════════
   3D AVATAR (Three.js ring)
════════════════════════════════════════════════════════════ */
const Avatar3D = () => {
  const mountRef = useRef(null);
  useEffect(()=>{
    const el = mountRef.current; if(!el) return;
    const W = el.clientWidth, H = el.clientHeight;
    const renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
    renderer.setSize(W, H);
    renderer.setClearColor(0,0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W/H, 0.1, 100);
    camera.position.z = 4;

    // Torus rings
    [[1.1,.05,120,20,"#00e5ff",.9],[1.4,.04,120,20,"#38bdf8",.5],[1.7,.03,120,20,"#34d399",.3]].forEach(([r,t,ts,rs,col,op])=>{
      const geo = new THREE.TorusGeometry(r,t,ts,rs);
      const mat = new THREE.MeshBasicMaterial({ color:new THREE.Color(col), transparent:true, opacity:op, wireframe:false });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.userData = { speed: .01 + Math.random()*.008, axis: new THREE.Vector3(Math.random(),Math.random(),Math.random()).normalize() };
      scene.add(mesh);
    });

    // Central icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(.6, 1);
    const icoMat = new THREE.MeshBasicMaterial({ color:0x00e5ff, wireframe:true, transparent:true, opacity:.7 });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      scene.children.forEach(obj=>{
        if(obj.userData.speed) obj.rotateOnAxis(obj.userData.axis, obj.userData.speed);
      });
      ico.rotation.y += .012;
      ico.rotation.x += .007;
      renderer.render(scene, camera);
    };
    animate();
    return ()=>{ cancelAnimationFrame(raf); renderer.dispose(); if(el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
  },[]);
  return <div ref={mountRef} style={{ width:"100%", height:"100%", position:"absolute", top:0, left:0 }} />;
};

/* ════════════════════════════════════════════════════════════
   ABOUT
════════════════════════════════════════════════════════════ */
const About = () => {
  const [active, setActive] = useState(null);
  return (
    <section id="about" className="sw hexbg" style={{ position:"relative" }}>
      <SH num="// 01" title="ABOUT THE" accent="ARCHITECT" />
      <div className="g2">
        {/* Left */}
        <motion.div initial={{ opacity:0, x:-60, rotateY:15 }} whileInView={{ opacity:1, x:0, rotateY:0 }}
          viewport={{ once:true }} transition={{ duration:.9 }}>

          {/* 3D Avatar Card */}
          <motion.div
            animate={{ y:[0,-12,0] }} transition={{ duration:6, repeat:Infinity, ease:"easeInOut" }}
            style={{ width:"100%", maxWidth:270, margin:"0 auto 36px",
              aspectRatio:"1", position:"relative", transformStyle:"preserve-3d" }}
          >
            <div className="holo" style={{ width:"100%", height:"100%", borderRadius:24,
              background:"linear-gradient(135deg,rgba(0,229,255,.05),rgba(52,211,153,.03))",
              border:"1px solid rgba(0,229,255,.18)", position:"relative", overflow:"hidden",
              backdropFilter:"blur(10px)" }}>
              <Avatar3D />
              {/* Overlay text */}
              <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column",
                alignItems:"center", justifyContent:"flex-end", padding:"0 0 24px", zIndex:5 }}>
                <div className="fo" style={{ fontSize:11, color:"rgba(0,229,255,.6)", letterSpacing:4 }}>
                  FULL STACK ARCHITECT
                </div>
              </div>
              {/* Scan line */}
              <motion.div animate={{ top:["0%","100%"] }} transition={{ duration:3, repeat:Infinity, ease:"linear" }}
                style={{ position:"absolute", left:0, right:0, height:2, zIndex:4,
                  background:"linear-gradient(90deg,transparent,rgba(0,229,255,.5),transparent)" }} />
              {/* Corner dots */}
              {[{top:12,left:12},{top:12,right:12},{bottom:12,left:12},{bottom:12,right:12}].map((pos,i)=>(
                <motion.div key={i} animate={{ opacity:[.3,1,.3] }} transition={{ duration:1.5+i*.3, repeat:Infinity }}
                  style={{ position:"absolute", ...pos, width:4, height:4, borderRadius:"50%",
                    background:"var(--c)", boxShadow:"0 0 8px var(--c)" }} />
              ))}
            </div>
          </motion.div>

          {/* Bio paragraphs */}
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            {[
              { text:"MCA candidate at Amity University, specializing in architecting fast, scalable, and cloud‑powered applications.", hl:false },
              { text:"I engineer production‑grade mobile apps in Flutter/Dart, design robust backends using Node.js/Express, and build modern web apps with ReactJS/Next.js.", hl:false },
              { text:"My flagship creation, Zizzle, showcases real‑world engineering — optimized reel playback, Gemini AI, real‑time chat, and a complete monetization ecosystem.", hl:true },
            ].map(({text,hl},i) => (
              <motion.div key={i} initial={{ opacity:0, x:-20, rotateX:8 }} whileInView={{ opacity:1, x:0, rotateX:0 }}
                viewport={{ once:true }} transition={{ delay:i*.18, duration:.6 }}
                style={{ transformStyle:"preserve-3d", perspective:400 }}>
                <p style={{ color:hl?"rgba(0,229,255,.9)":"rgba(226,232,240,.66)",
                  lineHeight:1.8, fontSize:15, fontWeight:hl?600:400,
                  paddingLeft:16, borderLeft:`2px solid ${hl?"var(--c)":"rgba(0,229,255,.15)"}`,
                  background:hl?"rgba(0,229,255,.04)":"transparent",
                  padding:hl?"12px 16px":"0 0 0 16px", borderRadius:hl?8:0 }}>{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Built with React badge */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:.6 }}
            style={{ marginTop:24, display:"inline-flex", alignItems:"center", gap:10,
              padding:"8px 18px", borderRadius:8, background:"rgba(52,211,153,.06)",
              border:"1px solid rgba(52,211,153,.2)", backdropFilter:"blur(8px)" }}>
            <motion.div animate={{ rotate:360 }} transition={{ duration:8, repeat:Infinity, ease:"linear" }}
              style={{ width:18, height:18, borderRadius:"50%", border:"2px solid var(--g)",
                borderTopColor:"transparent", borderRightColor:"rgba(52,211,153,.3)" }}/>
            <span className="fm" style={{ fontSize:10, color:"var(--g)", letterSpacing:2 }}>
              BUILT WITH REACT.JS
            </span>
          </motion.div>
        </motion.div>

        {/* Right: Skills */}
        <motion.div initial={{ opacity:0, x:60 }} whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }} transition={{ duration:.9 }}>
          <h3 className="fo" style={{ color:"var(--c)", fontSize:13, letterSpacing:3, marginBottom:28 }}>
            SKILL MATRIX
          </h3>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {config.skills.map((s,i) => (
              <motion.div key={s.name}
                initial={{ opacity:0, x:40, rotateY:-10 }} whileInView={{ opacity:1, x:0, rotateY:0 }}
                viewport={{ once:true }} transition={{ delay:i*.04, duration:.5 }}
                onHoverStart={()=>setActive(s.name)} onHoverEnd={()=>setActive(null)}
                style={{ cursor:"none", transformStyle:"preserve-3d" }}
              >
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                  <span className="fr" style={{ fontSize:13, fontWeight:600, letterSpacing:1, transition:"color .3s",
                    color:active===s.name?s.color:"rgba(226,232,240,.74)" }}>{s.name}</span>
                  <span className="fm" style={{ fontSize:10, color:s.color, transition:"opacity .3s",
                    opacity:active===s.name?1:.38 }}>{s.level}%</span>
                </div>
                <div className="pbar">
                  <motion.div className="pfill"
                    initial={{ width:0 }} whileInView={{ width:`${s.level}%` }}
                    viewport={{ once:true }} transition={{ duration:1.6, delay:i*.04, ease:"easeOut" }}
                    style={{ background:`linear-gradient(90deg,${s.color},${s.color}44)`,
                      boxShadow:`0 0 10px ${s.color}66`,
                      ...(active===s.name ? { filter:"brightness(1.4)" } : {}) }} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════
   PROJECT CARD (full 3D tilt + depth layers)
════════════════════════════════════════════════════════════ */
const PCard = ({ project, index }) => {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x:0, y:0 });
  const [hov, setHov] = useState(false);
  const [glowPos, setGlowPos] = useState({ x:50, y:50 });

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = ((e.clientY - r.top)  / r.height - .5) * 22;
    const y = ((e.clientX - r.left) / r.width  - .5) * -22;
    setTilt({ x, y });
    setGlowPos({ x:((e.clientX-r.left)/r.width)*100, y:((e.clientY-r.top)/r.height)*100 });
  };

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:60, rotateX:-18, z:-50 }}
      whileInView={{ opacity:1, y:0, rotateX:0, z:0 }}
      viewport={{ once:true }}
      transition={{ delay:index*.13, duration:.7, ease:"easeOut" }}
      onMouseMove={onMove}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>{ setTilt({x:0,y:0}); setHov(false); }}
      animate={{ rotateX:tilt.x, rotateY:tilt.y, scale:hov?1.04:1,
        z: hov ? 40 : 0,
        boxShadow: hov
          ? `0 40px 100px ${project.g[0]}30, 0 0 80px ${project.g[0]}15, 0 0 20px ${project.g[0]}25`
          : "0 10px 40px rgba(0,0,0,.5)" }}
      style={{ transformStyle:"preserve-3d", perspective:1000, cursor:"none", borderRadius:20 }}
    >
      {/* Spotlight glow that follows mouse */}
      {hov && (
        <div style={{ position:"absolute", inset:0, borderRadius:20, pointerEvents:"none", zIndex:1,
          background:`radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, ${project.g[0]}15 0%, transparent 60%)` }} />
      )}

      <div style={{ background:"rgba(0,4,10,.88)", borderRadius:20, overflow:"hidden",
        border:`1px solid ${hov?project.g[0]:"rgba(0,229,255,.07)"}`,
        backdropFilter:"blur(24px)", height:"100%", display:"flex", flexDirection:"column",
        transition:"border-color .3s", position:"relative" }}>

        {/* Top gradient bar */}
        <div style={{ height:3, background:`linear-gradient(90deg,${project.g[0]},${project.g[1]})`,
          boxShadow:`0 0 20px ${project.g[0]}80` }} />

        {/* Floating type tag */}
        <div style={{ padding:"20px 22px 16px",
          background:`linear-gradient(135deg,${project.g[0]}08,${project.g[1]}04)`,
          borderBottom:"1px solid rgba(255,255,255,.04)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
            <motion.span animate={{ opacity:hov?1:.7 }}
              style={{ padding:"4px 12px", borderRadius:100, background:`${project.g[0]}1c`,
                border:`1px solid ${project.g[0]}38`, fontSize:9, color:project.g[0],
                fontFamily:"'JetBrains Mono',monospace", letterSpacing:2 }}>{project.type.toUpperCase()}</motion.span>
            <span style={{ fontSize:9, color:"rgba(226,232,240,.28)", fontFamily:"'JetBrains Mono',monospace" }}>{project.stat}</span>
          </div>
          {/* 3D title layer */}
          <motion.h3 className="fo"
            animate={{ z: hov ? 20 : 0 }}
            style={{ fontSize:18, fontWeight:700, color:"#fff", marginBottom:3, letterSpacing:1,
              transform:hov?"translateZ(16px)":"translateZ(0)", transition:"transform .2s",
              transformStyle:"preserve-3d" }}>{project.title}</motion.h3>
          <p style={{ fontSize:11, color:project.g[0], fontFamily:"'Rajdhani',sans-serif", fontWeight:600, letterSpacing:1 }}>
            {project.sub}
          </p>
        </div>

        {/* Body */}
        <div style={{ padding:"16px 22px 20px", flex:1, display:"flex", flexDirection:"column" }}>
          <p style={{ fontSize:13, color:"rgba(226,232,240,.55)", lineHeight:1.68, marginBottom:14, flex:1 }}>
            {project.desc}
          </p>
          {/* Tech chips */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:5, marginBottom:18 }}>
            {project.tech.map(t => (
              <motion.span key={t} whileHover={{ scale:1.1, y:-2 }}
                style={{ padding:"2px 9px", borderRadius:4, background:"rgba(255,255,255,.04)",
                  border:"1px solid rgba(255,255,255,.07)", fontSize:9,
                  color:"rgba(226,232,240,.5)", fontFamily:"'JetBrains Mono',monospace" }}>{t}</motion.span>
            ))}
          </div>
          {/* Buttons */}
          <div style={{ display:"flex", gap:10 }}>
            {[
              { href:project.live, lbl:"LIVE →", bg:`linear-gradient(135deg,${project.g[0]}22,${project.g[1]}10)`, bd:`${project.g[0]}44`, cl:project.g[0] },
              { href:project.repo, lbl:"CODE →", bg:"rgba(255,255,255,.03)", bd:"rgba(255,255,255,.08)", cl:"rgba(226,232,240,.5)" },
            ].map(b => (
              <motion.a key={b.lbl} href={b.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.07, y:-2 }} whileTap={{ scale:.93 }}
                style={{ flex:1, padding:"9px 0", background:b.bg, border:`1px solid ${b.bd}`,
                  borderRadius:8, color:b.cl, textDecoration:"none", textAlign:"center",
                  fontSize:10, fontFamily:"'Orbitron',monospace", fontWeight:700, letterSpacing:2 }}>
                {b.lbl}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════════
   PROJECTS
════════════════════════════════════════════════════════════ */
const Projects = () => (
  <section id="projects" style={{ background:"rgba(0,0,0,.3)",
    borderTop:"1px solid rgba(0,229,255,.04)", borderBottom:"1px solid rgba(0,229,255,.04)" }}>
    <div className="sw">
      <SH num="// 02" title="LIVE" accent="DEPLOYMENTS" />
      {/* 3D perspective container */}
      <motion.div className="g3" style={{ transformStyle:"preserve-3d", perspective:1400 }}>
        {config.projects.map((p,i) => <PCard key={p.id} project={p} index={i} />)}
      </motion.div>
    </div>
  </section>
);

/* ════════════════════════════════════════════════════════════
   CONTACT
════════════════════════════════════════════════════════════ */
const Contact = () => {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [st, setSt] = useState("");
  const [foc, setFoc] = useState(null);

  const oc = e => { setForm({...form,[e.target.name]:e.target.value}); setSt(""); };
  const os = e => {
    e.preventDefault(); setSt("sending");
    setTimeout(() => {
      setSt(form.name&&form.email&&form.message ? "ok" : "err");
      if (form.name&&form.email&&form.message) setForm({name:"",email:"",message:""});
    }, 1800);
  };

  const inp = n => ({
    width:"100%", padding:"13px 16px",
    background:"rgba(0,4,10,.5)",
    border:`1px solid ${foc===n ? "var(--c)" : "rgba(0,229,255,.1)"}`,
    borderRadius:8, color:"#fff", fontSize:15,
    fontFamily:"'Rajdhani',sans-serif", fontWeight:500, outline:"none",
    boxShadow: foc===n ? "0 0 20px rgba(0,229,255,.1), inset 0 0 16px rgba(0,229,255,.03)" : "none",
    transition:"all .3s", cursor:"none", resize:"none",
    backdropFilter:"blur(8px)",
  });

  return (
    <section id="contact" className="sw">
      <SH num="// 03" title="INITIATE" accent="CONTACT" />
      <div className="gc">
        {/* Form */}
        <motion.div initial={{ opacity:0, x:-60, rotateY:12 }} whileInView={{ opacity:1, x:0, rotateY:0 }}
          viewport={{ once:true }} transition={{ duration:.9 }}>
          <div className="holo" style={{ background:"rgba(0,4,10,.85)", border:"1px solid rgba(0,229,255,.1)",
            borderRadius:20, padding:"clamp(24px,4vw,40px)", backdropFilter:"blur(24px)" }}>
            <h3 className="fo" style={{ color:"var(--c)", fontSize:12, letterSpacing:3, marginBottom:22 }}>
              TRANSMISSION PANEL
            </h3>
            <form onSubmit={os} style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {["name","email"].map(f => (
                <input key={f} type={f==="email"?"email":"text"} name={f}
                  placeholder={f.charAt(0).toUpperCase()+f.slice(1)} value={form[f]}
                  onChange={oc} onFocus={()=>setFoc(f)} onBlur={()=>setFoc(null)}
                  style={inp(f)} required />
              ))}
              <textarea name="message" placeholder="Your Message" value={form.message}
                onChange={oc} onFocus={()=>setFoc("message")} onBlur={()=>setFoc(null)}
                rows={5} style={inp("message")} required />
              <motion.button type="submit" disabled={st==="sending"}
                whileHover={{ scale:1.03, y:-2 }} whileTap={{ scale:.97 }}
                style={{ padding:"14px",
                  background: st==="ok"
                    ? "linear-gradient(135deg,rgba(0,255,136,.18),rgba(0,229,255,.08))"
                    : "linear-gradient(135deg,rgba(0,229,255,.18),rgba(0,229,255,.04))",
                  border:`1px solid ${st==="ok"?"#00ff88":"var(--c)"}`,
                  borderRadius:8, color:st==="ok"?"#00ff88":"var(--c)",
                  fontFamily:"'Orbitron',monospace", fontSize:11, fontWeight:700, letterSpacing:3,
                  cursor:st==="sending"?"wait":"none",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:9 }}>
                {st==="sending" ? (
                  <><motion.div animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:"linear"}}
                    style={{width:14,height:14,border:"2px solid var(--c)",borderTopColor:"transparent",borderRadius:"50%"}}/>
                  TRANSMITTING...</>
                ) : st==="ok" ? "✓ TRANSMITTED" : "TRANSMIT DATA"}
              </motion.button>
              <AnimatePresence>
                {st==="err" && (
                  <motion.p initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                    style={{color:"#f87171",fontFamily:"'JetBrains Mono',monospace",fontSize:10,textAlign:"center"}}>
                    ERROR: All fields required
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div initial={{ opacity:0, x:60 }} whileInView={{ opacity:1, x:0 }}
          viewport={{ once:true }} transition={{ duration:.9 }}
          style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <h3 className="fo" style={{ color:"rgba(226,232,240,.44)", fontSize:12, letterSpacing:3, marginBottom:6 }}>
            DIRECT CHANNELS
          </h3>
          {[
            { lbl:"EMAIL",    val:"sethichaitanya03@gmail.com", href:`mailto:${config.contact.email}`, col:"#00e5ff" },
            { lbl:"LINKEDIN", val:"Chaitanya Sethi",            href:config.contact.linkedin,          col:"#38bdf8" },
            { lbl:"GITHUB",   val:"sethi12",                    href:config.contact.github,            col:"#94a3b8" },
          ].map((item,i) => (
            <motion.a key={item.lbl} href={item.href}
              target={item.href.startsWith("mailto")?"_self":"_blank"} rel="noopener noreferrer"
              initial={{ opacity:0, x:40, rotateY:-8 }} whileInView={{ opacity:1, x:0, rotateY:0 }}
              viewport={{ once:true }} transition={{ delay:i*.14, duration:.6 }}
              whileHover={{ x:8, z:10 }}
              style={{ display:"flex", alignItems:"center", gap:16, padding:"18px 22px",
                background:"rgba(0,4,10,.65)", border:"1px solid rgba(255,255,255,.055)",
                borderRadius:12, textDecoration:"none", backdropFilter:"blur(10px)",
                transition:"border-color .3s,background .3s", cursor:"none",
                transformStyle:"preserve-3d" }}
              onMouseEnter={e=>{ e.currentTarget.style.borderColor=item.col+"45"; e.currentTarget.style.background=item.col+"0a"; }}
              onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,.055)"; e.currentTarget.style.background="rgba(0,4,10,.65)"; }}
            >
              <motion.div animate={{ boxShadow:[`0 0 8px ${item.col}`,`0 0 18px ${item.col}`,`0 0 8px ${item.col}`] }}
                transition={{ duration:2, repeat:Infinity }}
                style={{ width:4, height:38, borderRadius:2, background:item.col }} />
              <div>
                <div className="fm" style={{ fontSize:9, color:"rgba(226,232,240,.34)", letterSpacing:3, marginBottom:3 }}>{item.lbl}</div>
                <div className="fr" style={{ fontSize:15, fontWeight:600, color:"#e2e8f0" }}>{item.val}</div>
              </div>
              <div style={{ marginLeft:"auto", color:item.col, fontSize:16, opacity:.5 }}>→</div>
            </motion.a>
          ))}

          {/* Availability */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:.55 }}
            style={{ padding:"22px", background:"rgba(0,255,136,.04)",
              border:"1px solid rgba(0,255,136,.18)", borderRadius:12, marginTop:6 }}>
            <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:7 }}>
              <motion.div animate={{ scale:[1,1.8,1], boxShadow:["0 0 8px #00ff88","0 0 20px #00ff88","0 0 8px #00ff88"] }}
                transition={{ duration:2, repeat:Infinity }}
                style={{ width:9, height:9, borderRadius:"50%", background:"#00ff88" }} />
              <span className="fo" style={{ fontSize:10, color:"#00ff88", letterSpacing:2 }}>AVAILABLE FOR OPPORTUNITIES</span>
            </div>
            <p style={{ fontSize:13, color:"rgba(226,232,240,.46)", lineHeight:1.65 }}>
              Open to full‑time roles, freelance projects, and exciting collaborations in mobile, cloud, or full‑stack development.
            </p>
          </motion.div>

          {/* Tech stack badge */}
          <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:.7 }}
            style={{ display:"flex", flexWrap:"wrap", gap:8, padding:"18px",
              background:"rgba(0,229,255,.03)", border:"1px solid rgba(0,229,255,.1)",
              borderRadius:12 }}>
            <div className="fm" style={{ width:"100%", fontSize:9, color:"rgba(0,229,255,.4)", letterSpacing:3, marginBottom:8 }}>
              STACK OF THIS PORTFOLIO
            </div>
            {["React.js","Three.js","Framer Motion","JetBrains Mono","Orbitron"].map(t => (
              <span key={t} style={{ padding:"3px 10px", borderRadius:100,
                background:"rgba(0,229,255,.06)", border:"1px solid rgba(0,229,255,.15)",
                fontSize:9, color:"rgba(0,229,255,.7)", fontFamily:"'JetBrains Mono',monospace" }}>{t}</span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

/* ════════════════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════════════════ */
const Nav = ({ active }) => {
  const [sc, setSc] = useState(false);
  useEffect(()=>{
    const h=()=>setSc(window.scrollY>50);
    window.addEventListener("scroll",h);
    return()=>window.removeEventListener("scroll",h);
  },[]);
  return (
    <motion.nav initial={{ y:-80 }} animate={{ y:0 }} transition={{ duration:.55, ease:"easeOut" }}
      style={{ position:"fixed", top:0, left:0, right:0, zIndex:200,
        padding:"0 clamp(14px,3vw,44px)", height:62,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        background: sc ? "rgba(0,4,10,.94)" : "transparent",
        borderBottom: sc ? "1px solid rgba(0,229,255,.07)" : "none",
        backdropFilter: sc ? "blur(24px)" : "none",
        transition:"all .35s" }}>
      <a href="#hero" style={{ textDecoration:"none" }}>
        <motion.div whileHover={{ scale:1.06 }} style={{ display:"flex", alignItems:"center", gap:10, cursor:"none" }}>
          <motion.div animate={{ boxShadow:["0 0 8px rgba(0,229,255,.3)","0 0 20px rgba(0,229,255,.6)","0 0 8px rgba(0,229,255,.3)"] }}
            transition={{ duration:2.5, repeat:Infinity }}
            style={{ width:34, height:34, borderRadius:7,
              background:"linear-gradient(135deg,rgba(0,229,255,.18),rgba(52,211,153,.15))",
              border:"1px solid rgba(0,229,255,.3)",
              display:"flex", alignItems:"center", justifyContent:"center" }}>
            <span className="fo" style={{ fontSize:13, fontWeight:900, color:"var(--c)" }}>CS</span>
          </motion.div>
          <span className="fo" style={{ fontSize:13, fontWeight:700, color:"#fff", letterSpacing:2 }}>
            ARCHITECT
          </span>
        </motion.div>
      </a>

      <div style={{ display:"flex", gap:4 }}>
        {["About","Projects","Contact"].map(item => (
          <motion.a key={item} href={`#${item.toLowerCase()}`}
            whileHover={{ scale:1.06, y:-1 }}
            style={{ padding:"7px 15px", borderRadius:5, textDecoration:"none", transition:"all .3s", cursor:"none",
              color: active===item.toLowerCase() ? "var(--c)" : "rgba(226,232,240,.42)",
              background: active===item.toLowerCase() ? "rgba(0,229,255,.07)" : "transparent",
              border: active===item.toLowerCase() ? "1px solid rgba(0,229,255,.18)" : "1px solid transparent",
              fontFamily:"'Orbitron',monospace", fontSize:10, fontWeight:700, letterSpacing:2 }}>
            <span className="nlabel">{item.toUpperCase()}</span>
            <span className="ndot" style={{ display:"none", width:6, height:6, borderRadius:"50%",
              background:active===item.toLowerCase()?"var(--c)":"rgba(226,232,240,.4)" }} />
          </motion.a>
        ))}
      </div>
    </motion.nav>
  );
};

/* ════════════════════════════════════════════════════════════
   FOOTER
════════════════════════════════════════════════════════════ */
const Footer = () => (
  <footer style={{ padding:"36px 24px", borderTop:"1px solid rgba(0,229,255,.05)",
    textAlign:"center", background:"rgba(0,0,0,.3)", backdropFilter:"blur(10px)" }}>
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, marginBottom:12 }}>
      <div style={{ flex:1, maxWidth:160, height:1, background:"linear-gradient(90deg,transparent,rgba(0,229,255,.15))" }}/>
      <span className="fo" style={{ fontSize:10, color:"rgba(0,229,255,.3)", letterSpacing:4 }}>CS.ARCHITECT</span>
      <div style={{ flex:1, maxWidth:160, height:1, background:"linear-gradient(90deg,rgba(0,229,255,.15),transparent)" }}/>
    </div>
    <p className="fm" style={{ fontSize:9, color:"rgba(226,232,240,.18)", letterSpacing:3 }}>
      © {new Date().getFullYear()} CHAITANYA SETHI · BUILT WITH REACT.JS + THREE.JS + FRAMER MOTION · ALL SYSTEMS OPERATIONAL
    </p>
  </footer>
);

/* ════════════════════════════════════════════════════════════
   APP
════════════════════════════════════════════════════════════ */
export default function App() {
  const [sec, setSec] = useState("hero");
  const goContact = () => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" });

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setSec(e.target.id); }),
      { threshold:.25 }
    );
    ["hero","about","projects","contact"].forEach(id => {
      const el = document.getElementById(id); if(el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="scanline"
      style={{ minHeight:"100vh", background:"var(--dark)", color:"#e2e8f0",
        fontFamily:"'Rajdhani',sans-serif", position:"relative", overflowX:"hidden" }}>
      <GS />
      <Cursor />

      {/* Background layers: z=0 */}
      <ThreeScene />
      <MatrixRain />
      <Orbs />

      {/* Noise grain */}
      <div style={{ position:"fixed", inset:0, zIndex:1, pointerEvents:"none", opacity:.02,
        backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize:"150px 150px" }} />

      <Nav active={sec} />

      <div style={{ position:"relative", zIndex:10 }}>
        <Hero onContact={goContact} />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}