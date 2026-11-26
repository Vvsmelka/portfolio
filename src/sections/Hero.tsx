import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { HandPointingIcon } from "@phosphor-icons/react/dist/csr/HandPointing";
import { Marquee } from "@/components/ui/marquee";
import { Container } from "@/components/site/bits";
import { cn } from "@/lib/utils";

// Fotos reales de proyectos y lugares: aparecen al mover el cursor o deslizar el dedo.
const trail: { src: string; label: string }[] = [
  { src: "img/trail/hero-guggenheim.webp", label: "Bilbao" },
  { src: "img/trail/card-tpc.webp", label: "The Pickle Center" },
  { src: "img/trail/seul-gsc-1.webp", label: "Seúl" },
  { src: "img/trail/anreformas.webp", label: "AN Reformas" },
  { src: "img/trail/tpc-ig-2.webp", label: "The Pickle Center" },
  { src: "img/trail/hero-nyc.webp", label: "Nueva York" },
  { src: "img/trail/hosts-crm.webp", label: "Hosts Revenue" },
  { src: "img/trail/gravity-dossier.webp", label: "Gravity Systems" },
  { src: "img/trail/bilbao-zubizuri.webp", label: "Bilbao" },
  { src: "img/trail/tpc-ig-1.webp", label: "The Pickle Center" },
  { src: "img/trail/grem.webp", label: "Grem.io" },
  { src: "img/trail/shareway-web.webp", label: "ShareWay" },
  { src: "img/trail/seul-gsc-2.webp", label: "Seúl" },
  { src: "img/trail/bdigital.webp", label: "B-Digital Solutions" },
  { src: "img/trail/nyc-calle.webp", label: "Nueva York" },
  { src: "img/trail/tpc-ig-3.webp", label: "The Pickle Center" },
];

// Datos reales de los proyectos, en la franja inferior de la portada.
const facts: [string, string][] = [
  ["The Pickle Center", "Tienda online con 11 marcas"],
  ["Vitoria-Gasteiz", "Torneo con 50 participantes"],
  ["Plentzia", "Festival de pickleball con 6 pistas"],
  ["Seúl", "Living Lab en Konkuk University"],
  ["Nueva York", "Learning Journey"],
  ["Hosts Revenue", "CRM para el equipo comercial"],
  ["AN Reformas", "Captación y presupuestos online"],
  ["Abra Innova", "Cribado con IA de la economía azul"],
];

const EASE = [0.16, 1, 0.3, 1] as const;

function useMedia(query: string) {
  const [match, setMatch] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const m = window.matchMedia(query);
    const on = () => setMatch(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, [query]);
  return match;
}

const timeIn = (timeZone: string) =>
  new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
  }).format(new Date());

function Clock({ city, tz }: { city: string; tz: string }) {
  const [t, setT] = useState(() => timeIn(tz));
  useEffect(() => {
    const id = setInterval(() => setT(timeIn(tz)), 15_000);
    return () => clearInterval(id);
  }, [tz]);
  return (
    <span className="whitespace-nowrap">
      {city} <span className="text-white tabular-nums">{t}</span>
    </span>
  );
}

/**
 * Rastro de fotos: cada tramo de movimiento del cursor o del dedo deja una foto que aparece,
 * se mantiene un instante y se desvanece. Sin interacción, un recorrido automático lo mantiene vivo.
 */
function useImageTrail(
  areaRef: React.RefObject<HTMLElement | null>,
  hostRef: React.RefObject<HTMLDivElement | null>,
  onUserInput: () => void,
) {
  const reduce = useReducedMotion();
  useEffect(() => {
    const area = areaRef.current;
    const host = hostRef.current;
    if (!area || !host || reduce) return;

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const imgs = trail.map((t) => {
      const i = new Image();
      i.decoding = "async";
      i.src = t.src;
      return i;
    });

    let idx = 0;
    let last = { x: -9999, y: -9999, t: 0 };
    let lastUser = 0;
    let visible = true;
    let raf = 0;
    const alive: HTMLElement[] = [];

    const spawn = (x: number, y: number, vx = 0, vy = 0) => {
      const item = trail[idx % trail.length];
      const im = imgs[idx % trail.length];
      idx++;
      if (!im.complete || !im.naturalWidth) return;

      const W = host.clientWidth;
      const base = coarse
        ? Math.min(W * 0.46, 240)
        : Math.min(Math.max(W * 0.16, 170), 290);
      const ratio = im.naturalWidth / im.naturalHeight;
      const w = ratio >= 1 ? base * 1.18 : base * 0.8;
      const h = w / ratio;
      const r = (Math.random() * 2 - 1) * 7;
      const dx = Math.max(-80, Math.min(80, vx * 0.18));
      const dy = Math.max(-80, Math.min(80, vy * 0.18)) + 24;

      const fig = document.createElement("figure");
      fig.className = "trail-card";
      fig.style.cssText = `left:${x - w / 2}px;top:${y - h / 2}px;width:${w}px;height:${h}px;`;
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = "";
      img.draggable = false;
      const cap = document.createElement("figcaption");
      cap.textContent = item.label;
      fig.append(img, cap);
      host.appendChild(fig);
      alive.push(fig);
      if (alive.length > 16) alive.shift()?.remove();

      const anim = fig.animate(
        [
          {
            opacity: 0,
            transform: `translate(0,0) scale(0.5) rotate(${r * 1.6}deg)`,
          },
          {
            opacity: 1,
            transform: `translate(0,0) scale(1) rotate(${r}deg)`,
            offset: 0.14,
          },
          {
            opacity: 1,
            transform: `translate(${dx * 0.5}px,${dy * 0.4}px) scale(1) rotate(${r}deg)`,
            offset: 0.62,
          },
          {
            opacity: 0,
            transform: `translate(${dx}px,${dy}px) scale(0.86) rotate(${r * 0.6}deg)`,
          },
        ],
        {
          duration: coarse ? 1500 : 1750,
          easing: "cubic-bezier(0.16,1,0.3,1)",
          fill: "forwards",
        },
      );
      anim.onfinish = () => {
        fig.remove();
        const i = alive.indexOf(fig);
        if (i >= 0) alive.splice(i, 1);
      };
    };

    const gap = () => (coarse ? 64 : Math.max(80, host.clientWidth * 0.065));
    const local = (e: PointerEvent) => {
      const b = host.getBoundingClientRect();
      return { x: e.clientX - b.left, y: e.clientY - b.top };
    };
    const isUi = (e: PointerEvent) =>
      !!(e.target as HTMLElement).closest("a,button");

    const onMove = (e: PointerEvent) => {
      if (isUi(e)) return;
      const p = local(e);
      const now = performance.now();
      const dist = Math.hypot(p.x - last.x, p.y - last.y);
      if (dist > gap()) {
        const dt = Math.max(16, now - last.t);
        const k = last.t ? 1000 / dt : 0;
        spawn(p.x, p.y, (p.x - last.x) * k * 0.06, (p.y - last.y) * k * 0.06);
        last = { ...p, t: now };
      }
      lastUser = now;
      onUserInput();
    };
    // Un toque o clic sin arrastrar abre un pequeño abanico de fotos.
    let down: { x: number; y: number } | null = null;
    const onDown = (e: PointerEvent) => {
      if (isUi(e)) return;
      down = local(e);
      lastUser = performance.now();
      onUserInput();
    };
    const onUp = (e: PointerEvent) => {
      if (!down || isUi(e)) return;
      const p = local(e);
      if (Math.hypot(p.x - down.x, p.y - down.y) < 12) {
        [0, 1, 2].forEach((n) =>
          setTimeout(() => spawn(p.x + (n - 1) * 34, p.y - n * 18), n * 90),
        );
        last = { ...p, t: performance.now() };
      }
      down = null;
    };
    const onCancel = () => (down = null);

    area.addEventListener("pointermove", onMove);
    area.addEventListener("pointerdown", onDown);
    area.addEventListener("pointerup", onUp);
    area.addEventListener("pointercancel", onCancel);

    // Recorrido automático en forma de ocho mientras nadie interactúa.
    let t = Math.PI / 2;
    let prev = performance.now();
    let auto = { x: -9999, y: -9999 };
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(64, now - prev);
      prev = now;
      if (!visible || document.hidden || now - lastUser < 2600) return;
      t += dt * 0.00085;
      const W = host.clientWidth;
      const H = host.clientHeight;
      const x = W / 2 + Math.sin(t) * W * (coarse ? 0.3 : 0.34);
      const y =
        H * (coarse ? 0.5 : 0.52) + Math.sin(t * 2) * H * (coarse ? 0.1 : 0.13);
      if (Math.hypot(x - auto.x, y - auto.y) > gap() * 1.45) {
        spawn(x, y, (x - auto.x) * 0.4, (y - auto.y) * 0.4);
        auto = { x, y };
      }
    };
    const start = setTimeout(() => (raf = requestAnimationFrame(tick)), 900);

    const io = new IntersectionObserver(
      ([en]) => (visible = en.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(host);

    return () => {
      clearTimeout(start);
      cancelAnimationFrame(raf);
      io.disconnect();
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerdown", onDown);
      area.removeEventListener("pointerup", onUp);
      area.removeEventListener("pointercancel", onCancel);
      alive.forEach((a) => a.remove());
    };
  }, [areaRef, hostRef, onUserInput, reduce]);
}

/** Nombre a todo el ancho: calcula el tamaño de letra para que la línea más larga ocupe el contenedor. */
function GiantName({
  lines,
  shifts,
  cap,
}: {
  lines: string[];
  shifts: MotionValue<string>[];
  cap: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const probe = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const longest = lines.reduce((a, b) => (b.length > a.length ? b : a));

  useLayoutEffect(() => {
    const el = wrap.current;
    const p = probe.current;
    if (!el || !p) return;
    const fit = () => {
      const w = el.clientWidth;
      const pw = p.getBoundingClientRect().width;
      const h = el.closest("section")?.clientHeight ?? window.innerHeight;
      if (pw) setSize(Math.min((w / pw) * 100, h * cap));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [longest, cap]);

  const type = "font-semibold tracking-[-0.065em] whitespace-nowrap";

  return (
    <div ref={wrap} className="relative w-full">
      {/* Misma estructura letra a letra que el titular, para medir el ancho real */}
      <span
        ref={probe}
        aria-hidden
        className={cn(type, "invisible absolute top-0 left-0 text-[100px]")}
      >
        {Array.from(longest).map((ch, i) => (
          <span key={i} className="inline-block">
            {ch}
          </span>
        ))}
      </span>
      <h1
        aria-label="Melkamu Gomez-Cruzado"
        className={cn(type, "text-white select-none")}
        style={{ fontSize: size ? `${size}px` : "12.5vw", lineHeight: 0.9 }}
      >
        {lines.map((line, li) => (
          <span
            key={`${li}-${line}`}
            aria-hidden
            className="block overflow-hidden pt-[0.04em] pb-[0.02em]"
          >
            <motion.span
              className="inline-block will-change-transform"
              style={reduce ? undefined : { x: shifts[li] }}
            >
              {Array.from(line).map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={reduce ? false : { y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1,
                    ease: EASE,
                    delay: 0.2 + li * 0.12 + i * 0.03,
                  }}
                >
                  {ch}
                </motion.span>
              ))}
            </motion.span>
          </span>
        ))}
      </h1>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const narrow = useMedia("(max-width: 639px)");
  const coarse = useMedia("(pointer: coarse)");
  const [touched, setTouched] = useState(false);
  const markTouched = useRef(() => setTouched(true)).current;

  useImageTrail(ref, host, markTouched);

  // Al bajar, la portada se recoge en una tarjeta y el nombre se desplaza en sentidos opuestos.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const clip = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 0% 0% 0% round 0px)", "inset(7% 3% 0% 3% round 28px)"],
  );
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const s1 = useTransform(scrollYProgress, [0, 1], ["0vw", "-16vw"]);
  const s2 = useTransform(scrollYProgress, [0, 1], ["0vw", "12vw"]);
  const s3 = useTransform(scrollYProgress, [0, 1], ["0vw", "-10vw"]);

  const lines = narrow
    ? ["Melkamu", "Gomez-", "Cruzado"]
    : ["Melkamu", "Gomez-Cruzado"];

  return (
    <section
      ref={ref}
      id="inicio"
      aria-label="Presentación"
      className="relative h-[100svh] min-h-[640px] max-h-[1040px] touch-pan-y bg-ink"
    >
      <motion.div
        className="relative h-full w-full overflow-hidden bg-[#07090c]"
        style={reduce ? undefined : { clipPath: clip }}
      >
        {/* Fondo: brillo de color y retícula fina */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(55%_45%_at_78%_30%,rgb(37_80_230/0.28),transparent_70%),radial-gradient(40%_40%_at_10%_90%,rgb(159_180_255/0.12),transparent_70%)]"
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgb(255_255_255/0.6)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.6)_1px,transparent_1px)] [background-size:88px_88px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
        />

        {/* Grupo aislado: el nombre solo invierte sobre las fotos, no sobre el fondo */}
        <div className="absolute inset-0 isolate">
          {/* Capa donde aparecen las fotos */}
          <div ref={host} aria-hidden className="absolute inset-0" />

          <div className="pointer-events-none relative flex h-full flex-col">
            {/* Arriba: rol y relojes */}
            <motion.div
              style={reduce ? undefined : { opacity: contentOpacity }}
            >
              <Container className="pt-24 md:pt-28">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                  className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.16em] text-white/65 uppercase md:text-xs"
                >
                  <span className="flex items-center gap-2.5">
                    <span
                      aria-hidden
                      className="hidden h-px w-8 bg-white/50 sm:block"
                    />
                    21 años · Bilbao · Último curso de LEINN
                  </span>
                  <span className="flex items-center gap-4">
                    <Clock city="Bilbao" tz="Europe/Madrid" />
                    <span aria-hidden className="text-white/30">
                      /
                    </span>
                    <Clock city="Seúl" tz="Asia/Seoul" />
                  </span>
                </motion.div>
              </Container>
            </motion.div>

            {/* Centro: el nombre, que invierte los colores al pasar sobre las fotos */}
            <div className="flex flex-1 items-center">
              <div className="w-full px-3 mix-blend-difference md:px-5">
                <GiantName
                  lines={lines}
                  shifts={[s1, s2, s3]}
                  cap={narrow ? 0.13 : 0.19}
                />
              </div>
            </div>

            {/* Abajo: propuesta, llamadas a la acción y pista de interacción */}
            <motion.div
              style={
                reduce ? undefined : { y: contentY, opacity: contentOpacity }
              }
            >
              <Container className="pb-5 md:pb-7">
                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
                  className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                >
                  <div className="max-w-xl">
                    <p className="text-[1.65rem] leading-[1.08] font-semibold tracking-[-0.035em] text-white [text-wrap:balance] md:text-[2.1rem]">
                      Pongo en marcha negocios y abro{" "}
                      <span className="text-[#9fb4ff]">mercados</span>.
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-white/70 md:text-base">
                      Estrategia, ecommerce, captación de clientes e
                      inteligencia artificial aplicada al negocio.
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-4 md:items-end">
                    {!reduce && (
                      <span
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 font-mono text-[11px] tracking-[0.12em] text-white/70 uppercase backdrop-blur-md transition-opacity duration-700",
                          touched && "opacity-0",
                        )}
                      >
                        <HandPointingIcon className="h-3.5 w-3.5 animate-[nudge_1.6s_ease-in-out_infinite]" />
                        {coarse
                          ? "Toca o desliza en horizontal"
                          : "Mueve el cursor"}
                      </span>
                    )}
                    <div className="pointer-events-auto flex flex-wrap items-center gap-3">
                      <a
                        href="#proyectos"
                        className="group inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-[#0e0f11] transition hover:-translate-y-px hover:bg-white/90 active:translate-y-px"
                      >
                        Ver proyectos
                        <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
                      </a>
                      <a
                        href="#contacto"
                        className="inline-flex items-center rounded-lg border border-white/25 bg-white/10 px-5 py-3 font-medium text-white backdrop-blur-md transition hover:bg-white/20"
                      >
                        Contactar
                      </a>
                    </div>
                  </div>
                </motion.div>
              </Container>
            </motion.div>

            {/* Franja de datos */}
            <div className="border-t border-white/15 bg-black/40 backdrop-blur-sm">
              <Marquee
                className="py-3 [--duration:60s] [--gap:3rem] md:py-3.5"
                repeat={3}
              >
                {facts.map(([k, v]) => (
                  <span
                    key={k}
                    className="flex items-center gap-3 font-mono text-[11px] tracking-[0.08em] whitespace-nowrap uppercase md:text-xs"
                  >
                    <span
                      aria-hidden
                      className="h-1 w-1 rounded-full bg-[#9fb4ff]"
                    />
                    <span className="text-white">{k}</span>
                    <span className="text-white/55">{v}</span>
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

const founded = [
  { src: "logos/tpc.svg", alt: "The Pickle Center", h: "h-7 md:h-8" },
];
const clients = [
  { src: "logos/an-reformas.png", alt: "AN Reformas", h: "h-9 md:h-10" },
  { src: "logos/hosts-revenue.png", alt: "Hosts Revenue", h: "h-10 md:h-11" },
];

function LogoGroup({ label, logos }: { label: string; logos: typeof founded }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
      <p className="shrink-0 font-mono text-xs tracking-[0.14em] text-mute uppercase">
        {label}
      </p>
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
        {logos.map((l) => (
          <li key={l.alt} className="flex items-center">
            <img
              src={l.src}
              alt={l.alt}
              loading="lazy"
              className={cn(
                l.h,
                "w-auto opacity-75 grayscale transition hover:opacity-100",
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Empresas cofundadas y clientes, justo debajo de la portada. */
export function Logos() {
  return (
    <section
      aria-label="Empresas y clientes"
      className="relative z-10 border-b border-line bg-ink-2"
    >
      <Container className="flex flex-col gap-8 py-8 md:flex-row md:items-center md:justify-between md:py-10">
        <LogoGroup label="Cofundador" logos={founded} />
        <LogoGroup label="Clientes" logos={clients} />
      </Container>
    </section>
  );
}
