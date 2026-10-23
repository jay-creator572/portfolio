(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const poster = (k) => `assets/posters/${k}.jpg`;
  const icon = {
    arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    left: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M15 6l-6 6 6 6"/></svg>',
    right: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 6l6 6-6 6"/></svg>',
    close: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    play: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>',
    pause: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>'
  };

  /* ---------- shared chrome ---------- */
  function chrome() {
    $$("[data-name]").forEach((el) => (el.textContent = SITE.name));
    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  }

  /* ---------- faint starfield and drifting light dust ---------- */
  function bubbles() {
    const c = $("#bubbles");
    if (!c) return;
    const ctx = c.getContext("2d");
    const onProject = document.body.classList.contains("page-project");
    let w, h, dpr, stars = [], dust = [];
    function resize() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight;
      c.width = w * dpr; c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round(Math.min(320, (w * h) / 4200)) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: 0.3 + Math.random() * 0.8, a: 0.2 + Math.random() * 0.6,
        ph: Math.random() * Math.PI * 2, sp: 0.01 + Math.random() * 0.03,
        tint: Math.random() < 0.3 ? "190,215,255" : "240,240,255"
      }));
      dust = Array.from({ length: Math.round(Math.min(30, (w * h) / 16000)) }, () => makeDust(true));
    }
    function makeDust(anywhere) {
      return { x: Math.random() * w, y: anywhere ? Math.random() * h : h + 10, r: 0.6 + Math.random() * 1.6,
               vy: 0.08 + Math.random() * 0.22, vx: (Math.random() - 0.5) * 0.12, a: 0.15 + Math.random() * 0.4,
               ph: Math.random() * 10 };
    }
    const strength = () => 0.5 * (onProject ? 0.55 : Math.max(0.45, 1 - scrollY / (innerHeight * 1.6)));
    function tick(now = 0) {
      ctx.clearRect(0, 0, w, h);
      const k = strength();
      stars.forEach((s) => {
        s.ph += s.sp;
        ctx.fillStyle = `rgba(${s.tint},${s.a * (0.55 + 0.45 * Math.sin(s.ph)) * k})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
      });
      dust.forEach((d, i) => {
        d.y -= d.vy; d.x += d.vx + Math.sin(now * 0.0006 + d.ph) * 0.08;
        if (d.y < -10) dust[i] = makeDust(false);
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 3);
        g.addColorStop(0, `rgba(220,235,255,${d.a * k})`); g.addColorStop(1, "rgba(220,235,255,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x, d.y, d.r * 3, 0, Math.PI * 2); ctx.fill();
      });
      if (!reduceMotion) requestAnimationFrame(tick);
    }
    addEventListener("resize", resize);
    resize(); tick();
  }


  /* ---------- translucent blue butterflies drifting over dark water ---------- */
  function butterflies() {
    const host = $("#butterflies");
    if (!host) return;
    const onProject = document.body.classList.contains("page-project");
    host.insertAdjacentHTML("beforeend", `<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
      <radialGradient id="bfw" gradientUnits="userSpaceOnUse" cx="50" cy="50" r="50">
        <stop offset="0" stop-color="#244fc4" stop-opacity=".95"/>
        <stop offset=".22" stop-color="#3f6fdc" stop-opacity=".88"/>
        <stop offset=".5" stop-color="#86a8ec" stop-opacity=".58"/>
        <stop offset=".8" stop-color="#d3e0fb" stop-opacity=".34"/>
        <stop offset="1" stop-color="#f3f6ff" stop-opacity=".22"/></radialGradient>
      <radialGradient id="bfw2" gradientUnits="userSpaceOnUse" cx="50" cy="50" r="50">
        <stop offset="0" stop-color="#3d63d6" stop-opacity=".92"/>
        <stop offset=".3" stop-color="#7196e8" stop-opacity=".72"/>
        <stop offset=".65" stop-color="#b9cdf6" stop-opacity=".42"/>
        <stop offset="1" stop-color="#f6f8ff" stop-opacity=".2"/></radialGradient>
      <linearGradient id="bfholo" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0" stop-color="#ffc8f0" stop-opacity=".75"/><stop offset=".22" stop-color="#a9e4ff" stop-opacity=".55"/>
        <stop offset=".45" stop-color="#c3b4ff" stop-opacity=".6"/><stop offset=".62" stop-color="#ffffff" stop-opacity=".4"/>
        <stop offset=".8" stop-color="#8fb4ff" stop-opacity=".55"/><stop offset="1" stop-color="#ffd2ec" stop-opacity=".6"/></linearGradient>
      <radialGradient id="bfsil" gradientUnits="userSpaceOnUse" cx="50" cy="50" r="50">
        <stop offset="0" stop-color="#8ea3cf" stop-opacity=".9"/>
        <stop offset=".3" stop-color="#c3cde3" stop-opacity=".7"/>
        <stop offset=".7" stop-color="#e9edf6" stop-opacity=".42"/>
        <stop offset="1" stop-color="#ffffff" stop-opacity=".25"/></radialGradient>
      <linearGradient id="bfsheen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <linearGradient id="bfbody" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#3a4266"/><stop offset="1" stop-color="#151a2e"/></linearGradient>
    </defs></svg>`);
    // one wing (left side); the right wing is the mirror image. Gradient is centred on the wing root.
    const wing = (g) => `
      <path d="M49 46 C41 36 24 19 8 7 C5 5 2 7 2.5 11 C4 21 8 30 14 37 C24 44 37 47 49 49 Z"
            fill="url(#${g})" stroke="rgba(22,34,80,.85)" stroke-width="1" stroke-linejoin="round"/>
      <path d="M49 52 C39 52.5 26 55 17 62 C10 68 10 79 17 84 C25 88.5 36 82 42 72 C46 65 48.5 58 49 52 Z"
            fill="url(#${g})" stroke="rgba(22,34,80,.8)" stroke-width="1" stroke-linejoin="round"/>
      <path d="M49 46 C41 36 24 19 8 7 C5 5 2 7 2.5 11 C10 15 26 26 49 46 Z" fill="url(#bfsheen)"/>
      <g fill="none" stroke="rgba(20,30,72,.55)" stroke-width=".45" stroke-linecap="round">
        <path d="M48 46 C38 35 22 20 9 9"/><path d="M48 47 C38 39 22 27 5 15"/><path d="M48 47.5 C37 42 22 34 6 24"/>
        <path d="M48 48 C38 45 26 40 11 33"/><path d="M48 48.5 C40 47 30 44 17 39"/>
        <path d="M48 53 C38 56 27 61 16 70"/><path d="M48 54 C40 60 30 69 22 81"/><path d="M48 55 C44 63 38 73 32 84"/>
        <path d="M48 56 C46 63 43 70 39 77"/></g>`;
    const bug = (g) => `<svg viewBox="0 0 100 100">
      <g class="wl">${wing(g)}</g>
      <g class="wr"><g transform="matrix(-1 0 0 1 100 0)">${wing(g)}</g></g>
      <ellipse cx="50" cy="51" rx="1.6" ry="11" fill="url(#bfbody)"/>
      <circle cx="50" cy="39.5" r="1.9" fill="#232a45"/>
      <path d="M49.4 38.5 C47.5 31 45 26 42.5 23.5 M50.6 38.5 C52.5 31 55 26 57.5 23.5" stroke="#2a3150" stroke-width=".5" fill="none"/>
      <circle cx="42.5" cy="23.5" r=".9" fill="#2a3150"/><circle cx="57.5" cy="23.5" r=".9" fill="#2a3150"/></svg>`;

    const n = onProject ? 1 : 2;
    const flock = Array.from({ length: n }, () => {
      const depth = Math.random();
      const g = "bfholo";
      const size = `${38 + depth * 46}px`, f = `${0.8 + Math.random() * 0.6}s`, fd = `${-Math.random()}s`;
      const ref = document.createElement("div"), el = document.createElement("div");
      ref.className = "bfly-ref"; el.className = "bfly";
      [ref, el].forEach((e) => { e.style.setProperty("--s", size); e.style.setProperty("--f", f); e.style.setProperty("--fd", fd); e.innerHTML = bug(g); });
      el.style.opacity = 0.7 + depth * 0.3;
      if (depth < 0.3) el.style.filter = "blur(0.8px)";
      host.append(ref, el);
      return { el, ref, x: Math.random() * innerWidth, y: Math.random() * innerHeight, h: Math.random() * Math.PI * 2,
               v: 0.3 + depth * 0.5, ph: Math.random() * 100, turn: 0.004 + Math.random() * 0.006, lift: 16 + depth * 26 };
    });
    function tick(t) {
      const W = innerWidth, H = innerHeight;
      flock.forEach((b) => {
        b.h += Math.sin(t * 0.0004 + b.ph) * b.turn + Math.sin(t * 0.0011 + b.ph * 2) * b.turn * 0.6;
        const m = 90;
        if (b.x < m || b.x > W - m || b.y < m || b.y > H - m) {
          const want = Math.atan2(H / 2 - b.y, W / 2 - b.x);
          let d = want - b.h; d = Math.atan2(Math.sin(d), Math.cos(d)); b.h += d * 0.03;
        }
        b.x += Math.cos(b.h) * b.v; b.y += Math.sin(b.h) * b.v;
        const bob = Math.sin(t * 0.003 + b.ph) * 3, rot = b.h + Math.PI / 2;
        b.el.style.transform = `translate(${b.x}px, ${b.y + bob}px) rotate(${rot}rad)`;
        b.ref.style.transform = `translate(${b.x + b.lift * 0.5}px, ${b.y + b.lift}px) rotate(${rot}rad) scale(0.92)`;
      });
      requestAnimationFrame(tick);
    }
    if (reduceMotion) flock.forEach((b) => { b.el.style.transform = `translate(${b.x}px, ${b.y}px)`; b.ref.style.transform = `translate(${b.x + 10}px, ${b.y + 20}px)`; });
    else requestAnimationFrame(tick);
  }

  /* show the nav name only after the hero (which already shows the name) scrolls away */
  function navName() {
    if (!document.body.classList.contains("page-home")) return;
    const hero = $(".orbit");
    const upd = () => {
      document.body.classList.toggle("scrolled", scrollY > hero.offsetHeight * 0.6);
      // the silver water pool belongs to the first screen: fade it out as the hero scrolls away
      document.body.style.setProperty("--hero-k", Math.max(0, 1 - scrollY / (hero.offsetHeight * 0.7)).toFixed(3));
    };
    addEventListener("scroll", upd, { passive: true }); upd();
  }



  /* ---------- home: 3D spiral of every poster + scene (ref: Noiced "spiral / list") ---------- */
  const ORBIT_COLORS = {
    burn: ["#c98a3c", "#5f86c9"], dragon: ["#8f9db5", "#46536a"],
    merman: ["#2aa597", "#3d6db3"], reborn: ["#c66fb6", "#7656c4"]
  };
  const ORBIT_ORDER = ["burn", "dragon", "merman", "reborn"];
  function spiralIntro(done, startIdx = 0) {
    const stage = $("#sp-stage"), root = $("#sp-intro"), tip = $("#sp-tip");
    let seen = false;
    try { seen = sessionStorage.getItem("intro-seen") === "1"; } catch (e) {}
    if (!stage || seen) { if (root) root.remove(); if (tip) tip.remove(); done(); return; }
    document.body.classList.add("intro-lock");
    let exiting = false, exitAt = 0, handedOff = false, strip = null;
    const handed = new Set();
    // exit: the posters straighten into one film strip (scenes drop away) that runs past at an even,
    // projector-like pace and eases to a stop on the chosen series; the four key posters carry on into the carousel
    function buildStrip() {
      const keyIds = [-1, 0, 1, 2].map((d) => ORBIT_ORDER[(startIdx + d + 4) % 4]);   // carousel order around the chosen one
      const keyIdx = keyIds.map((id) => items.findIndex((it) => it.id === id && it.kind === "poster"));
      const others = items.map((_, i) => i).filter((i) => items[i].kind === "poster" && !keyIdx.includes(i));
      const seq = [...others.slice(0, -1), ...keyIdx, ...others.slice(-1)];   // most of the reel is still to come (on the left)
      const oc = $(".o-card"), ph = (oc ? oc.offsetHeight : 330) * 0.82;   // strip frame height, a little under the carousel card
      const s = ph / 210, gap = 18, w = () => 152 * s;
      const slot = [];
      let x = 0;
      seq.forEach((i) => { slot[i] = x + w(i) / 2; x += w(i) + gap; });
      const c0 = slot[keyIdx[1]];
      seq.forEach((i) => (slot[i] -= c0));                            // the chosen series sits at 0
      // run at an even speed, then a soft stop; never so far that the reel's end shows on screen
      const V = 240, TD = 2000, leftEnd = -Math.min(...seq.map((i) => slot[i])) + w() / 2;
      const travel = Math.max(0, Math.min(V * 3.4, leftEnd - innerWidth / 2 - 10));
      const TC = Math.max(0, (travel - (V * TD) / 3000) / V) * 1000;
      return { slot, keyIdx, ph, travel, V, TD, TC, sc: () => s };
    }
    function handoff() {
      const out = {};
      strip.keyIdx.forEach((i) => {
        out[items[i].id] = { x: innerWidth / 2 + strip.slot[i], y: stripY(), h: strip.ph, ry: 0, rz: 0, op: 1, br: 1 };
        handed.add(i);
      });
      return out;
    }
    const stripY = () => { const o = $("#orbit-stage"); if (!o) return innerHeight * 0.46; const r = o.getBoundingClientRect(); return r.top + r.height / 2; };
    const exit = () => {
      if (exiting) return;
      exiting = true; exitAt = performance.now(); finishIntro(); hovered = -1;
      try { sessionStorage.setItem("intro-seen", "1"); } catch (e) {}
      strip = buildStrip();
      root.classList.add("exiting"); tip.classList.remove("on");
    };
    function release() {                                           // strip has stopped: hand the four posters to the carousel
      handedOff = true;
      document.body.classList.add("intro-handoff");
      root.classList.add("leaving");
      done(handoff());
      setTimeout(() => { root.remove(); tip.remove(); document.body.classList.remove("intro-lock", "intro-handoff"); }, 1300);
    }
    const byId = Object.fromEntries(DRAMAS.map((d) => [d.id, d]));
    // interleave the four series so every one is visible all the way round; scenes belong to Burn in Regret
    const lanes = ["burn", "dragon", "reborn", "merman"].map((id) => byId[id].posters.map((p) => ({ id, src: poster(p), kind: "poster" })));
    const scenes = ["dragon-keep", "aurora-valley", "celebration-hall", "ice-battlefield", "arena", "sacred-nest-hall", "hidden-cave"]
      .map((k) => ({ id: "burn", src: `assets/scenes/${k}.jpg`, kind: "scene" }));
    const items = [];
    for (let r = 0; items.length < 18 && r < 8; r++) {
      lanes.forEach((l) => { if (l[r]) items.push(l[r]); });
      if (scenes[r]) items.push(scenes[r]);
    }
    const N = items.length;
    stage.innerHTML = items.map((it, i) => `
      <a class="sp-card ${it.kind}" data-i="${i}" href="project.html?id=${it.id}" draggable="false" aria-label="${byId[it.id].title}">
        <img src="${it.src}" alt="" draggable="false"></a>`).join("");
    const cards = $$(".sp-card", stage);

    // corner badge cycles through the four key posters
    const badge = $("#sp-badge-img"), keys = ["burn", "dragon", "merman", "reborn"].map((id) => poster(byId[id].posters[0]));
    let bi = 0; badge.style.backgroundImage = `url(${keys[0]})`;
    setInterval(() => { bi = (bi + 1) % keys.length; badge.style.backgroundImage = `url(${keys[bi]})`; }, 2200);

    // title letters, for the float-in
    let li = 0;
    const h1 = $(".sp-h1", root);
    h1.innerHTML = h1.textContent.split(" ").map((w) => `<span class="wd">${[...w].map((ch) => `<i class="ch" style="--l:${li++}">${ch}</i>`).join("")}</span>`).join(" ");

    let rot = 0, vel = 0, dragging = false, lastX = 0, moved = 0, hovered = -1;
    const INTRO = reduceMotion ? 0 : 2600, t0 = performance.now();
    const clamp = (v) => Math.max(0, Math.min(1, v));
    const easeOut = (v) => 1 - Math.pow(1 - v, 3);
    const easeInOut = (v) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);
    const lerp = (x, y, k) => x + (y - x) * k;
    let introDone = !INTRO;
    const finishIntro = () => { if (!introDone) { introDone = true; root.classList.add("o-beam", "o-ready", "o-settled"); } };
    if (!INTRO) root.classList.add("o-beam", "o-ready", "o-settled");

    function frame(now) {
      if (!root.isConnected) return;
      const ms = now - t0;
      const e = exiting ? now - exitAt : 0;
      const al = exiting ? easeInOut(clamp(e / 900)) : 0;                     // helix → strip
      // film running through a projector: even speed from the start, then a gentle stop on the chosen series
      let slide = 0, slideEnd = 0;
      if (exiting) {
        const { V, TD, TC, travel } = strip; slideEnd = TC + TD;
        const run = e < TC ? (V * e) / 1000 : (V * TC) / 1000 + ((V * TD) / 3000) * (1 - Math.pow(1 - clamp((e - TC) / TD), 3));
        slide = Math.max(0, travel - run);
      }
      const fo = exiting ? clamp((e - (slideEnd - 300)) / 350) : 0;           // everything but the four key posters fades
      if (exiting && !handedOff && e > slideEnd - 200) release();
      if (!introDone) {
        if (ms > 100) root.classList.add("o-beam");
        if (ms > 1100) root.classList.add("o-ready");
        if (ms > 1900) root.classList.add("o-settled");
        if (ms > INTRO) introDone = true;
      }
      if (!dragging && !exiting) { vel *= 0.94; rot += (hovered < 0 && !reduceMotion ? 0.11 : 0) + vel; }
      const W = stage.clientWidth, H = stage.clientHeight;
      const R = Math.min(W * 0.3, 420), step = 360 / 7.2, dy = Math.min(H * 0.062, 50);
      // strip positions, in the helix stage's own (tilted) coordinates
      const sr = stage.getBoundingClientRect(), scx = sr.left + sr.width / 2, scy = sr.top + sr.height / 2;
      const A = (22 * Math.PI) / 180, sy0 = exiting ? stripY() - scy : 0;
      cards.forEach((el, i) => {
        // intro: the spiral unwinds outward from its axis, one frame after another
        const ki = INTRO ? easeOut(clamp((ms - 150 - i * 45) / 1300)) : 1;
        const spinIn = INTRO ? (1 - easeOut(clamp(ms / 2200))) * 420 : 0;
        const th = ((i * step + rot + spinIn) * Math.PI) / 180;
        const sx = Math.sin(th) * R * ki, sz = Math.cos(th) * R * ki, sy = (i - (N - 1) / 2) * dy * ki;
        const face = Math.cos(th);                                   // 1 = facing us, -1 = far side
        const isHover = i === hovered;
        let x = sx, y = sy, z = sz, ry = Math.sin(th) * 38, rz = 0;  // cards stay readable: never turn past side-on
        let sc = lerp(0.3, 0.6 + face * 0.18, ki) * (isHover ? 1.1 : 1);
        let op = ki * (isHover ? 1 : 0.35 + 0.65 * (face * 0.5 + 0.5)), br = isHover ? 1.08 : 0.45 + 0.55 * (face * 0.5 + 0.5), bl = Math.max(0, -face) * 2.2;
        if (exiting) {
          if (strip.slot[i] === undefined) {                         // scene stills just fade where they are
            const out = clamp(e / 600);
            el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${ry}deg) scale(${sc * (1 - out * 0.1)})`;
            el.style.opacity = op * (1 - out); el.style.filter = `brightness(${br}) blur(${bl + out * 6}px)`;
            return;
          }
          // the strip's screen offset, turned into the stage's tilted frame; cards counter-rotate to stand upright
          const SX = innerWidth / 2 - scx + strip.slot[i] + slide, SY = sy0;
          const lx = SX * Math.cos(A) - SY * Math.sin(A), ly = SX * Math.sin(A) + SY * Math.cos(A);
          x = lerp(x, lx, al); y = lerp(y, ly, al); z = lerp(z, 0, al); ry = lerp(ry, 0, al); rz = lerp(0, 22, al);
          sc = lerp(sc, strip.sc(i), al); op = lerp(op, 1, al) * (strip.keyIdx.includes(i) ? 1 : 1 - fo); const prox = 1 - Math.min(1, Math.abs(SX + scx - innerWidth / 2) / (innerWidth * 0.45));   // brighter under the beam
          br = lerp(br, 0.55 + 0.5 * prox, al); bl = lerp(bl, 0, al) + fo * 4;
        }
        el.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateZ(${rz}deg) rotateY(${ry}deg) scale(${sc})`;
        el.style.opacity = handed.has(i) ? 0 : op;
        el.style.filter = `brightness(${br}) blur(${bl}px)`;
        el.style.zIndex = isHover ? 999 : Math.round(500 + z);
      });
      requestAnimationFrame(frame);
    }

    // hover: highlight, tint the room with the series colour, show a tag by the cursor
    stage.addEventListener("pointermove", (e) => {
      if (exiting) return;
      if (dragging) {
        const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
        rot += dx * 0.25; vel = dx * 0.25; return;
      }
      const card = e.target.closest(".sp-card");
      const i = card ? +card.dataset.i : -1;
      if (i !== hovered) {
        hovered = i;
        if (card) {
          const d = byId[items[i].id], [c1, c2] = ORBIT_COLORS[d.id];
          root.style.setProperty("--oc", c1); root.style.setProperty("--oc2", c2);
          tip.innerHTML = `<small>${d.no} · ${d.genre[0]}</small><b>${d.title}</b><span>View series &rarr;</span>`;
        }
        tip.classList.toggle("on", !!card);
      }
      tip.style.transform = `translate(${e.clientX + 18}px, ${e.clientY + 14}px)`;
    });
    stage.addEventListener("pointerleave", () => { hovered = -1; tip.classList.remove("on"); });
    stage.addEventListener("pointerdown", (e) => {
      if (exiting) return;
      finishIntro(); dragging = true; lastX = e.clientX; moved = 0; stage.setPointerCapture(e.pointerId); stage.classList.add("grabbing");
    });
    const end = (e) => {
      if (!dragging) return;
      dragging = false; stage.classList.remove("grabbing");
      if (moved < 6) {
        const card = document.elementFromPoint(e.clientX, e.clientY)?.closest(".sp-card");
        if (card) location.href = card.href;
      }
    };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);
    cards.forEach((c) => c.addEventListener("click", (e) => e.preventDefault()));
    stage.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); vel -= e.deltaX * 0.02; }
    }, { passive: false });

    // enter: automatically after a few seconds, or right away on Enter / scroll / key
    $("#sp-enter").onclick = exit;
    root.addEventListener("wheel", (e) => { if (Math.abs(e.deltaY) > 12) exit(); }, { passive: true });
    addEventListener("keydown", (e) => { if (["Enter", " ", "ArrowDown"].includes(e.key)) exit(); });
    setTimeout(exit, (INTRO || 0) + 4000);
    requestAnimationFrame(frame);
  }


  /* ---------- home: 3D carousel of the four series; unfolds from the centre when the opening ends ---------- */
  function orbit(startIdx = 0) {
    const stage = $("#orbit-stage");
    if (!stage) return null;
    const root = $("#orbit"), label = $("#orbit-label"), count = $("#orbit-count");
    const order = ORBIT_ORDER.map((id) => DRAMAS.find((d) => d.id === id));
    const N = order.length;
    stage.innerHTML = order.map((d, i) => `
      <a class="o-card" data-i="${i}" href="project.html?id=${d.id}" draggable="false" aria-label="${d.title}">
        <img src="${poster(d.posters[0])}" alt="${d.title} poster" draggable="false"><i class="o-shine"></i>
      </a>`).join("");
    const cards = $$(".o-card", stage);
    let li = 0;
    $$(".orbit-word span", root).forEach((sp) => {
      sp.innerHTML = [...sp.textContent].map((ch) => ch === " " ? " " : `<i class="ch" style="--l:${li++}">${ch}</i>`).join("");
    });
    root.classList.add("o-intro");
    let pos = startIdx, target = startIdx, vel = 0, dragging = false, lastX = 0, moved = 0, active = -1, hover = false, lastInteract = performance.now();
    const wrap = (d) => { d = ((d % N) + N) % N; return d > N / 2 ? d - N : d; };

    // opening: cards fly in from where the spiral left them (or, with no spiral, grow out of the centre)
    let INTRO = reduceMotion ? 0 : 2000, from = null;
    let introStart = Infinity, introDone = false;
    const clamp = (v) => Math.max(0, Math.min(1, v));
    const easeOut = (v) => 1 - Math.pow(1 - v, 3);
    const easeInOut = (v) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);
    const lerp = (a, b, k) => a + (b - a) * k;
    function finishIntro() {
      if (introDone || introStart === Infinity) return;
      introDone = true; root.classList.remove("o-intro"); root.classList.add("o-beam", "o-ready", "o-settled");
      lastInteract = performance.now();
    }
    function introTimeline(now) {
      const ms = now - introStart;
      if (ms > 0) root.classList.add("o-beam");
      if (ms > 600) root.classList.add("o-ready");
      if (ms > 1300) root.classList.add("o-settled");
      if (ms >= INTRO) finishIntro();
      return clamp(ms / Math.max(1, INTRO));
    }
    function layout(now = performance.now()) {
      const W = stage.clientWidth, R = Math.min(W * 0.36, 520);
      const t = introDone ? 1 : introTimeline(now);
      const r = from && !introDone ? stage.getBoundingClientRect() : null;
      cards.forEach((el, i) => {
        const d = wrap(i - pos), a = Math.abs(d);
        const x = Math.sin(d * 0.95) * R, y = a * 18, z = (Math.cos(d * 0.95) - 1) * R * 0.9;
        const ry = -d * 32, rz = d * 5, sc = 1 - Math.min(a, 2) * 0.12;
        const op = Math.max(0, 1 - a * 0.42), br = 1 - Math.min(a, 1.6) * 0.38, bl = Math.max(0, a - 1) * 2.5;
        const f = r && from[order[i].id];
        let s;   // start pose
        if (f) s = { x: f.x - (r.left + r.width / 2), y: f.y - (r.top + r.height / 2), z: 0, ry: f.ry, rz: f.rz, sc: f.h / el.offsetHeight, op: f.op, br: f.br, bl: 0 };
        else s = { x: 0, y: 0, z: -120, ry: 0, rz: 0, sc: 0.4, op: 0, br: 1, bl: 10 };
        const deal = f ? easeInOut(clamp(t / 0.8)) : easeInOut(clamp((t - 0.05) / 0.6));   // from the strip: all four move as one
        const appear = f ? 1 : easeOut(clamp(t / 0.3));
        el.style.transform = `translate(-50%, -50%) translate3d(${lerp(s.x, x, deal)}px, ${lerp(s.y, y, deal)}px, ${lerp(s.z, z, deal)}px) rotateY(${lerp(s.ry, ry, deal)}deg) rotateZ(${lerp(s.rz, rz, deal)}deg) scale(${lerp(s.sc, sc, deal)})`;
        el.style.opacity = f ? lerp(s.op, op, deal) : appear * lerp(1, op, deal);
        el.style.filter = `brightness(${lerp(s.br, br, deal)}) blur(${lerp(f ? 0 : (1 - appear) * 10, bl, deal)}px)`;
        el.style.zIndex = 100 - Math.round(a * 10);
        el.classList.toggle("is-front", a < 0.5 && deal >= 1);
      });
      const idx = ((Math.round(pos) % N) + N) % N;
      if (idx !== active) setActive(idx);
    }
    function setActive(i) {
      active = i;
      const d = order[i], [c1, c2] = ORBIT_COLORS[d.id];
      root.style.setProperty("--oc", c1); root.style.setProperty("--oc2", c2);
      label.classList.remove("in"); void label.offsetWidth;
      label.href = `project.html?id=${d.id}`;
      label.innerHTML = `<small>${d.no} — ${d.genre.join(" · ")}</small><b>${d.title}</b><span>View series &rarr;</span>`;
      label.classList.add("in");
      count.textContent = `${String(i + 1).padStart(2, "0")} / ${String(N).padStart(2, "0")}`;
    }
    const go = (step) => { target = Math.round(target) + step; lastInteract = performance.now(); };
    function tick(now) {
      if (!dragging && introDone) {
        if (!reduceMotion && !hover && now - lastInteract > 4200) { target = Math.round(target) + 1; lastInteract = now; }
        pos += (target - pos) * 0.085;
      }
      layout(now);
      requestAnimationFrame(tick);
    }
    ["pointerdown", "wheel", "keydown"].forEach((ev) => root.addEventListener(ev, finishIntro, { capture: true }));
    stage.addEventListener("pointerdown", (e) => {
      dragging = true; lastX = e.clientX; moved = 0; stage.setPointerCapture(e.pointerId); stage.classList.add("grabbing");
    });
    stage.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX; lastX = e.clientX; moved += Math.abs(dx);
      pos -= dx / (stage.clientWidth * 0.45); vel = dx;
    });
    const end = (e) => {
      if (!dragging) return;
      dragging = false; stage.classList.remove("grabbing");
      target = Math.round(pos - Math.sign(vel) * Math.min(Math.abs(vel) / 60, 0.45)); lastInteract = performance.now();
      if (moved < 6) {
        const card = document.elementFromPoint(e.clientX, e.clientY)?.closest(".o-card");
        if (card) { const d = wrap(+card.dataset.i - pos); if (Math.abs(d) < 0.5) location.href = card.href; else target = Math.round(pos + d); }
      }
    };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);
    cards.forEach((c) => c.addEventListener("click", (e) => e.preventDefault()));
    stage.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) { e.preventDefault(); target += (e.deltaX || e.deltaY) / 400; lastInteract = performance.now(); }
    }, { passive: false });
    stage.addEventListener("keydown", (e) => { if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); if (e.key === "Enter") location.href = label.href; });
    root.addEventListener("pointerenter", () => (hover = true));
    root.addEventListener("pointerleave", () => { hover = false; lastInteract = performance.now(); });
    $("#orbit-prev").onclick = () => go(-1);
    $("#orbit-next").onclick = () => go(1);
    addEventListener("resize", () => layout());
    requestAnimationFrame(tick);
    // back to the opening: replay the spiral
    const back = $("#orbit-back");
    if (back) back.onclick = () => {
      try { sessionStorage.removeItem("intro-seen"); } catch (e) {}
      scrollTo(0, 0); location.reload();
    };
    return (handoff) => {
      if (introStart !== Infinity) return;
      if (handoff && Object.keys(handoff).length && INTRO) { from = handoff; INTRO = 1500; }
      introStart = performance.now(); if (!INTRO) finishIntro();
    };
  }

  /* ---------- cinema projector beam: dust drifting through the light ---------- */
  function projector() {
    const c = $(".orbit .beam-dust");
    if (!c || reduceMotion) return;
    const ctx = c.getContext("2d");
    let w, h, motes = [];
    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      motes = Array.from({ length: 90 }, () => ({
        x: Math.random() * w, y: Math.random() * h, r: 0.4 + Math.random() * 1.4,
        vx: (Math.random() - 0.3) * 0.18, vy: (Math.random() - 0.5) * 0.12, ph: Math.random() * 6.28, a: 0.25 + Math.random() * 0.6
      }));
    };
    function tick(t) {
      ctx.clearRect(0, 0, w, h);
      motes.forEach((m) => {
        m.x += m.vx + Math.sin(t * 0.0004 + m.ph) * 0.08; m.y += m.vy + Math.cos(t * 0.0003 + m.ph) * 0.06;
        if (m.x < -5) m.x = w + 5; if (m.x > w + 5) m.x = -5; if (m.y < -5) m.y = h + 5; if (m.y > h + 5) m.y = -5;
        const a = m.a * (0.6 + 0.4 * Math.sin(t * 0.002 + m.ph));
        const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 2.6);
        g.addColorStop(0, `rgba(255,250,240,${a})`); g.addColorStop(1, "rgba(255,250,240,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(m.x, m.y, m.r * 2.6, 0, Math.PI * 2); ctx.fill();
      });
      requestAnimationFrame(tick);
    }
    addEventListener("resize", resize); resize(); requestAnimationFrame(tick);
  }


  /* ---------- nav: frosted bar that tightens on scroll ---------- */
  function navAndParallax() {
    const nav = $(".nav");
    const upd = () => nav.classList.toggle("compact", scrollY > 24);
    addEventListener("scroll", upd, { passive: true }); upd();
  }

  /* ---------- reveal on scroll ---------- */
  function reveal() {
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    }), { threshold: 0, rootMargin: "0px 0px -8% 0px" });
    $$(".reveal").forEach((el) => io.observe(el));
  }

  /* ---------- home ---------- */
  function home() {
    $("#work").innerHTML = DRAMAS.map((d) => `
      <a class="work-row reveal" href="project.html?id=${d.id}">
        <span class="no">${d.no}</span>
        <img src="${poster(d.posters[0])}" alt="" loading="lazy">
        <div>
          <h3>${d.title}${d.altTitle && d.id === "merman" ? `: <em>${d.altTitle}</em>` : ""}</h3>
          <p>${d.logline}</p>
          <div class="genres">${d.genre.map((g) => `<span class="chip">${g}</span>`).join("")}</div>
        </div>
        <span class="arrow">${icon.arrow}</span>
      </a>`).join("");

    $("#about-text").innerHTML = SITE.about.map((p) => `<p>${p}</p>`).join("");
    $("#role").textContent = SITE.role;
    $("#roles").innerHTML = SITE.roles.map((r, i) => `<li>${r}<span>0${i + 1}</span></li>`).join("");
    $("#contact-links").innerHTML = `
      <a class="btn" href="mailto:${SITE.email}">${SITE.email}</a>
      ${SITE.linkedin ? `<a class="btn" href="https://${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn ${icon.arrow}</a>` : ""}`;
  }

  /* ---------- project ---------- */
  function project() {
    const id = new URLSearchParams(location.search).get("id");
    const idx = Math.max(0, DRAMAS.findIndex((d) => d.id === id));
    const d = DRAMAS[idx];
    const next = DRAMAS[(idx + 1) % DRAMAS.length];
    document.title = `${d.title} — ${SITE.name}`;
    document.documentElement.style.setProperty("--accent", d.accent);
    document.body.classList.add(`theme-${d.id}`);
    const pad = (n) => String(n).padStart(2, "0");

    let html = `
      <section class="p-hero">

        <a class="back" href="index.html#series">${icon.left} All projects</a>
        <div class="eyebrow">Project ${d.no} / ${pad(DRAMAS.length)}</div>
        <h1>${d.title}</h1>
        ${d.altTitle ? `<p class="alt">${d.altTitle}</p>` : ""}
        <p class="logline">${d.logline}</p>
        <div class="meta">${d.genre.map((g) => `<span class="chip">${g}</span>`).join("")}<span class="chip">${d.format}</span></div>
        <div class="watch">
          <span class="eyebrow">Watch the full series</span>
          <p class="watch-search">Search <b>“${d.title}”</b> on</p>
          <div class="watch-links">${SITE.platforms.map((p) => p.url
            ? `<a class="watch-btn" href="${p.url}" target="_blank" rel="noopener"><b>${p.name}</b><small>Open website</small>${icon.arrow}</a>`
            : `<span class="watch-btn pending"><b>${p.name}</b><small>Search in the app</small></span>`).join("")}</div>
        </div>
      </section>

      <section class="showcase" style="padding-top:10px">
        <div class="panel reveal">
          <div class="panel-head"><span class="eyebrow">Key Art</span>
            <span class="counter"><b id="car-i">01</b> / ${pad(d.posters.length)}</span></div>
          <div class="carousel" id="carousel">
            ${d.posters.map((p, i) => `<img src="${poster(p)}" alt="${d.title} poster ${i + 1}" class="${i ? "" : "on"}">`).join("")}
            ${d.posters.length > 1 ? `<button class="car-btn prev" aria-label="Previous poster">${icon.left}</button>
            <button class="car-btn next" aria-label="Next poster">${icon.right}</button>` : ""}
          </div>
          ${d.posters.length > 1 ? `<div class="dots" id="dots">${d.posters.map((_, i) => `<button aria-label="Poster ${i + 1}" class="${i ? "" : "on"}"></button>`).join("")}</div>` : ""}
        </div>
        <div class="panel reveal">
          <div class="panel-head"><span class="eyebrow">${d.trailers.length > 1 ? "Promos" : "Trailer"}</span>
            ${d.trailers.length > 1 ? `<div class="tabs" id="tabs">${d.trailers.map((t, i) => `<button class="${i ? "" : "on"}">${t.label}</button>`).join("")}</div>` : ""}
          </div>
          <div class="player"><video id="video" controls playsinline preload="metadata" poster="${poster(d.posters[0])}" src="${d.trailers[0].src}"></video></div>
        </div>
      </section>

      <section class="story">
        <div class="reveal">
          <div class="eyebrow">The Story</div>
          <h2 class="title">Synopsis</h2>
          <div class="roles-grid">${SITE.roles.map((r, i) => `<div><small>MY ROLE ${pad(i + 1)}</small>${r}</div>`).join("")}</div>
        </div>
        <div class="reveal">
          ${d.synopsis.map((p) => `<p>${p}</p>`).join("")}
          <div class="visual-note"><span class="eyebrow">Visual Direction</span><p>${d.visual}</p></div>
        </div>
      </section>`;

    if (d.characters) {
      const glows = ["rgba(120,170,230,.5)", "rgba(120,110,190,.55)", "rgba(210,130,90,.42)", "rgba(214,178,110,.42)"];
      d.characters.forEach((c, i) => (c.glow = glows[i]));
      html += `
      <section>
        <div class="section-head reveal"><div><div class="eyebrow">Character Assets</div><h2>The Cast</h2></div>
          <p>Full-body character designs built for consistent AI generation. Select the face for a close-up portrait, or the body for the full turnaround.</p></div>
        <div class="tt-wrap reveal">
          <div class="tt-stage" id="tt-stage" aria-label="Character display">
            <div class="tt-glow"></div>
            <div class="tt-floor"><div class="tt-ring"></div></div>
            <div class="tt-figure" id="tt-figure">
              <div class="tt-shadow"></div>
              <div class="fig" id="tt-fig">
                <img class="fig-img" draggable="false" alt="">
                <button class="hs hs-body" aria-label="Open turnaround"><span class="hs-tag">Turnaround</span></button>
                <button class="hs hs-face" aria-label="Open portrait"><span class="hs-tag">Portrait</span></button>
              </div>
            </div>
            <div class="tt-hud"><span id="tt-count">01</span><span>/ ${String(d.characters.length).padStart(2, "0")}</span></div>
            <div class="tt-hint">Face · portrait <i></i> Body · turnaround <i></i> Drag the platform</div>
          </div>
          <aside class="tt-info">
            <div class="tt-roster" role="tablist">
              ${d.characters.map((c) => `<button role="tab" aria-label="${c.name}"><img src="assets/turntable/${c.figure}-front.png" alt=""><span>${c.name}</span></button>`).join("")}
            </div>
            <div id="tt-detail"></div>
          </aside>
        </div>
      </section>`;
    }

    if (d.scenes) {
      html += `
      <section>
        <div class="section-head reveal"><div><div class="eyebrow">World Building</div><h2>Visual Development</h2></div>
          <p>Environment concepts designed as a consistent production bible for every scene of the series.</p></div>
        <div class="scenes">
          ${d.scenes.map(([k, t], i) => `<button class="scene reveal" data-scene="${i}"><img src="assets/scenes/${k}.jpg" alt="${t}" loading="lazy"><figcaption>${t}</figcaption></button>`).join("")}
        </div>
      </section>`;
    }

    if (d.score && d.score.length) {
      html += `
      <section class="story">
        <div class="reveal"><div class="eyebrow">Original Score</div><h2 class="title">Music</h2>
          <p style="margin-top:20px">Original themes composed with AI music tools for the series.</p></div>
        <div class="tracks reveal">
          ${d.score.map((t, i) => `
          <div class="track" data-track="${i}">
            <button class="play" aria-label="Play ${t.title}">${icon.play}</button>
            <div><h4>${t.title}</h4><div class="bar"><i></i></div></div>
            <span class="time">0:00</span>
            <audio preload="metadata" src="${t.src}"></audio>
          </div>`).join("")}
        </div>
      </section>`;
    }

    html += `
      <section>
        <a class="next-project" href="project.html?id=${next.id}">
          <div><div class="eyebrow">Next Project</div><h3>${next.title}</h3></div>
          <img src="${poster(next.posters[0])}" alt="">
        </a>
      </section>`;

    $("#project").innerHTML = html;
    carousel(d);
    trailers(d);
    if (d.characters) cast(d);
    if (d.scenes) scenes(d);
    score();
  }

  function carousel(d) {
    const box = $("#carousel"), imgs = $$("#carousel img"), dots = $$("#dots button");
    let i = 0, timer;
    // match the frame to the poster's real proportions so nothing is cropped
    const fit = () => { if (imgs[0].naturalWidth) box.style.setProperty("--ar", (imgs[0].naturalWidth / imgs[0].naturalHeight).toFixed(4)); };
    imgs[0].complete ? fit() : imgs[0].addEventListener("load", fit);
    box.insertAdjacentHTML("beforeend", `<span class="zoom-hint">View full poster</span>`);
    // click a poster to see it full screen; arrows / keys move through all posters of the series
    box.addEventListener("click", (e) => {
      if (e.target.closest("button")) return;
      lightbox(d.posters.map((p, k) => ({ src: poster(p), cap: d.title, sub: `Key art ${String(k + 1).padStart(2, "0")}` })), i);
    });
    if (imgs.length < 2) return;
    const go = (n) => {
      i = (n + imgs.length) % imgs.length;
      imgs.forEach((im, k) => im.classList.toggle("on", k === i));
      dots.forEach((b, k) => b.classList.toggle("on", k === i));
      $("#car-i").textContent = String(i + 1).padStart(2, "0");
      restart();
    };
    const restart = () => { clearInterval(timer); if (!reduceMotion) timer = setInterval(() => go(i + 1), 5000); };
    $("#carousel .prev").onclick = () => go(i - 1);
    $("#carousel .next").onclick = () => go(i + 1);
    dots.forEach((b, k) => (b.onclick = () => go(k)));
    let sx = null;
    $("#carousel").addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
    $("#carousel").addEventListener("touchend", (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
      sx = null;
    });
    restart();
  }

  function trailers(d) {
    const tabs = $$("#tabs button"), v = $("#video");
    tabs.forEach((b, k) => (b.onclick = () => {
      tabs.forEach((t) => t.classList.toggle("on", t === b));
      v.src = d.trailers[k].src; v.play().catch(() => {});
    }));
  }

  /* ---------- character stage: standing figure, spinning platform, clickable hotspots ---------- */
  function cast(d) {
    const stage = $("#tt-stage"), fig = $("#tt-figure"), img = $(".fig-img", stage);
    const ring = $(".tt-ring", stage), face = $(".hs-face", stage), body = $(".hs-body", stage);
    let cur = 0, angle = 0, vel = 0, dragging = false, lastX = 0, lastT = 0;
    const AUTO = reduceMotion ? 0 : 0.12; // degrees per frame when idle

    d.characters.forEach((c) => { const im = new Image(); im.src = `assets/turntable/${c.figure}-front.png`; });

    function loop() {
      if (!dragging) { angle += AUTO + vel; vel *= 0.95; }
      ring.style.transform = `rotateX(74deg) rotateZ(${angle}deg)`;
      requestAnimationFrame(loop);
    }

    // drag anywhere on the stage (except hotspots) to spin the platform
    stage.addEventListener("pointerdown", (e) => {
      if (e.target.closest("button")) return;
      dragging = true; vel = 0; lastX = e.clientX; lastT = performance.now();
      stage.setPointerCapture(e.pointerId); stage.classList.add("grabbing");
    });
    stage.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX, now = performance.now();
      angle += dx * 0.6; vel = (dx * 0.6) / Math.max(1, (now - lastT) / 16);
      lastX = e.clientX; lastT = now;
    });
    const end = () => { dragging = false; stage.classList.remove("grabbing"); };
    stage.addEventListener("pointerup", end);
    stage.addEventListener("pointercancel", end);

    face.onmouseenter = () => fig.classList.add("on-face");
    face.onmouseleave = () => fig.classList.remove("on-face");
    body.onmouseenter = () => fig.classList.add("on-body");
    body.onmouseleave = () => fig.classList.remove("on-body");

    const portrait = (c) => lightbox([{
      html: `<div class="lb-portrait" style="--c:${c.glow}"><img src="assets/portraits/${c.figure}.png" alt="${c.name} portrait"></div>`,
      cap: c.name, sub: `Portrait · ${c.role}`
    }], 0);
    const turnaround = (c) => lightbox([{
      html: `<div class="lb-turn" style="--c:${c.glow}">${["front", "side", "back"].map((v) => `
        <figure><img src="assets/turntable/${c.figure}-${v}.png" alt="${c.name}, ${v} view"><figcaption>${v}</figcaption></figure>`).join("")}</div>`,
      cap: c.name, sub: `Turnaround · ${c.outfit}`
    }], 0);

    function show(i) {
      cur = i;
      const c = d.characters[i];
      $$(".tt-roster button").forEach((b, k) => b.classList.toggle("on", k === i));
      stage.style.setProperty("--c", c.glow);
      $("#tt-count").textContent = String(i + 1).padStart(2, "0");
      fig.classList.add("swap");
      setTimeout(() => {
        img.src = `assets/turntable/${c.figure}-front.png`;
        img.alt = `${c.name}, full-body design`;
        const [x, y, w, h] = c.face;
        Object.assign(face.style, { left: `${(x - w * 0.3) * 100}%`, top: `${(y - h * 0.55) * 100}%`, width: `${w * 1.6 * 100}%`, height: `${h * 1.9 * 100}%` });
        const bodyTop = y + h * 1.35;
        Object.assign(body.style, { left: "14%", width: "72%", top: `${bodyTop * 100}%`, height: `${(0.985 - bodyTop) * 100}%` });
        face.setAttribute("aria-label", `Open ${c.name} portrait`);
        body.setAttribute("aria-label", `Open ${c.name} turnaround`);
        face.onclick = () => portrait(c);
        body.onclick = () => turnaround(c);
        $("#tt-detail").innerHTML = `
          <span class="tt-role">${c.role}</span>
          <h3>${c.name}</h3>
          <p>${c.line}</p>
          <div class="tt-outfit"><small>Shown</small>${c.outfit}</div>
          <div class="tt-actions">
            <button class="btn" id="tt-portrait">Portrait</button>
            <button class="btn" id="tt-turn">Turnaround</button>
            <button class="btn" id="tt-sheets">Costume sheets · ${c.looks.length} ${icon.arrow}</button>
          </div>`;
        $("#tt-portrait").onclick = () => portrait(c);
        $("#tt-turn").onclick = () => turnaround(c);
        $("#tt-sheets").onclick = () => lightbox(c.looks.map(([k, t]) => ({ src: `assets/characters/${k}.jpg`, cap: t, sub: `${c.name} · ${c.role}`, sheet: true })), 0);
        vel = 6; // a little spin when a new character steps on
        fig.classList.remove("swap");
      }, 220);
    }
    $$(".tt-roster button").forEach((b, k) => (b.onclick = () => show(k)));
    show(0);
    requestAnimationFrame(loop);
  }

  function scenes(d) {
    const items = d.scenes.map(([k, t]) => ({ src: `assets/scenes/${k}.jpg`, cap: t, sub: "Visual Development" }));
    $$(".scene").forEach((b) => (b.onclick = () => lightbox(items, +b.dataset.scene)));
  }

  /* ---------- lightbox ---------- */
  function lightbox(items, start) {
    let lb = $("#lightbox");
    if (!lb) {
      lb = document.createElement("div");
      lb.id = "lightbox"; lb.className = "lightbox";
      lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
      document.body.appendChild(lb);
    }
    let i = start;
    const render = () => {
      const it = items[i];
      lb.innerHTML = `
        <button class="lb-close" aria-label="Close">${icon.close}</button>
        ${items.length > 1 ? `<button class="lb-nav prev" aria-label="Previous">${icon.left}</button><button class="lb-nav next" aria-label="Next">${icon.right}</button>` : ""}
        <div class="lb-stage">
          ${it.html || `<img src="${it.src}" alt="${it.cap}" class="${it.sheet ? "sheet" : ""}">`}
          <div class="lb-cap"><small>${it.sub}${items.length > 1 ? ` · ${String(i + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}` : ""}</small>${it.cap}</div>
          ${items.length > 1 ? `<div class="lb-thumbs">${items.map((t, k) => `<button class="${k === i ? "on" : ""}" data-k="${k}"><img src="${t.src}" alt=""></button>`).join("")}</div>` : ""}
        </div>`;
      $(".lb-close", lb).onclick = close;
      const p = $(".lb-nav.prev", lb), n = $(".lb-nav.next", lb);
      if (p) p.onclick = () => { i = (i - 1 + items.length) % items.length; render(); };
      if (n) n.onclick = () => { i = (i + 1) % items.length; render(); };
      $$(".lb-thumbs button", lb).forEach((b) => (b.onclick = () => { i = +b.dataset.k; render(); }));
      $(".lb-close", lb).focus();
    };
    const key = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight" && items.length > 1) { i = (i + 1) % items.length; render(); }
      if (e.key === "ArrowLeft" && items.length > 1) { i = (i - 1 + items.length) % items.length; render(); }
    };
    function close() { lb.classList.remove("open"); document.body.style.overflow = ""; removeEventListener("keydown", key); }
    lb.onclick = (e) => { if (e.target === lb) close(); };
    addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    lb.classList.add("open");
    render();
  }

  /* ---------- score ---------- */
  function score() {
    const fmt = (s) => (isFinite(s) ? `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}` : "0:00");
    const rows = $$(".track");
    rows.forEach((row) => {
      const a = $("audio", row), btn = $(".play", row), bar = $(".bar", row), fill = $(".bar i", row), time = $(".time", row);
      a.addEventListener("loadedmetadata", () => (time.textContent = fmt(a.duration)));
      a.addEventListener("timeupdate", () => {
        fill.style.width = `${(a.currentTime / a.duration) * 100 || 0}%`;
        time.textContent = fmt(a.currentTime);
      });
      a.addEventListener("ended", () => { row.classList.remove("playing"); btn.innerHTML = icon.play; });
      btn.onclick = () => {
        if (a.paused) {
          $$("audio").forEach((o) => { if (o !== a) o.pause(); });
          $$("video").forEach((v) => v.pause());
          a.play();
        } else a.pause();
      };
      a.addEventListener("play", () => { row.classList.add("playing"); btn.innerHTML = icon.pause; });
      a.addEventListener("pause", () => { row.classList.remove("playing"); btn.innerHTML = icon.play; });
      bar.onclick = (e) => {
        const r = bar.getBoundingClientRect();
        if (a.duration) a.currentTime = ((e.clientX - r.left) / r.width) * a.duration;
      };
    });
    const v = $("#video");
    if (v) v.addEventListener("play", () => $$("audio").forEach((o) => o.pause()));
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("v-refined");
    chrome();
    bubbles();
    butterflies();
    navName();
    projector();
    navAndParallax();
    if ($("#work")) home();
    const startIdx = Math.floor(Math.random() * ORBIT_ORDER.length);   // land on a different series each visit
    const startCarousel = orbit(startIdx);
    spiralIntro((handoff) => startCarousel && startCarousel(handoff), startIdx);
    if ($("#project")) project();
    reveal();
  });
})();
