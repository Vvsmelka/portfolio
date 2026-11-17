import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Marquee } from "@/components/ui/marquee";
import { Container } from "@/components/site/bits";
import { cn } from "@/lib/utils";

type Slide = { src: string; place: string; caption: string; coords: string; position?: string };

// Fotos propias: Bilbao, la base, y Nueva York, durante la Learning Journey.
const slides: Slide[] = [
  {
    src: "img/hero-guggenheim.webp",
    place: "Bilbao",
    caption: "Una trainera frente al Guggenheim",
    coords: "43.2687° N · 2.9340° W",
    position: "50% 55%",
  },
  {
    src: "img/hero-nyc.webp",
    place: "Nueva York",
    caption: "Learning Journey: estudio del mercado del pickleball",
    coords: "40.7128° N · 74.0060° W",
    position: "50% 40%",
  },
  {
    src: "img/hero-ria-torres.webp",
    place: "Bilbao",
    caption: "La ría y las torres Isozaki",
    coords: "43.2669° N · 2.9283° W",
    position: "50% 45%",
  },
];

// Datos reales de los proyectos, en la franja inferior de la portada.
const facts: [string, string][] = [
  ["Competizione", "Importación desde Corea del Sur y Alemania"],
  ["The Pickle Center", "Tienda online con 11 marcas"],
  ["Vitoria-Gasteiz", "Torneo con 50 participantes"],
  ["Plentzia", "Festival de pickleball con 6 pistas"],
  ["Seúl", "Living Lab en Konkuk University"],
  ["Nueva York", "Learning Journey"],
  ["Hosts Revenue", "CRM para el equipo comercial"],
  ["AN Reformas", "Captación y presupuestos online"],
  ["Abra Innova", "Cribado con IA de la economía azul"],
];

const INTERVAL = 7000;
const EASE = [0.16, 1, 0.3, 1] as const;

function useSlides(total: number) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    slides.slice(1).forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);
  useEffect(() => {
    if (reduce || total < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % total), INTERVAL);
    return () => clearInterval(id);
  }, [reduce, total, index]);
  return [index, setIndex] as const;
}

const timeIn = (timeZone: string) =>
  new Intl.DateTimeFormat("es-ES", { hour: "2-digit", minute: "2-digit", timeZone }).format(new Date());

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

/** Nombre a todo el ancho: calcula el tamaño de letra para que la línea más larga ocupe el contenedor. */
function GiantName({
  lines,
  shifts,
  aside,
}: {
  lines: string[];
  shifts: MotionValue<string>[];
  aside?: ReactNode;
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
      if (pw) setSize(Math.min((w / pw) * 100, h * 0.17));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, []);

  const type = "font-semibold tracking-[-0.065em] whitespace-nowrap";

  return (
    <div ref={wrap} className="relative w-full">
      {/* Misma estructura letra a letra que el titular, para medir el ancho real */}
      <span ref={probe} aria-hidden className={cn(type, "invisible absolute top-0 left-0 text-[100px]")}>
        {Array.from(longest).map((ch, i) => (
          <span key={i} className="inline-block">
            {ch}
          </span>
        ))}
      </span>
      {aside && (
        <div
          className="absolute right-0 hidden items-end justify-end md:flex"
          style={{ top: 0, height: size ? `${size * 0.92}px` : "11vw", width: "38%" }}
        >
          {aside}
        </div>
      )}
      <h1
        aria-label={lines.join(" ")}
        className={cn(type, "text-white select-none")}
        style={{ fontSize: size ? `${size}px` : "12.5vw", lineHeight: 0.92 }}
      >
        {lines.map((line, li) => (
          <span key={line} aria-hidden className="block overflow-hidden pt-[0.04em] pb-[0.02em]">
            <motion.span className="inline-block will-change-transform" style={reduce ? undefined : { x: shifts[li] }}>
              {Array.from(line).map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={reduce ? false : { y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, ease: EASE, delay: 0.25 + li * 0.12 + i * 0.03 }}
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

function SlideCaption({
  slide,
  index,
  go,
  reduce,
}: {
  slide: Slide;
  index: number;
  go: (i: number) => void;
  reduce: boolean;
}) {
  return (
    <div className="flex w-full items-end justify-between gap-6 pb-[0.9em] md:flex-col md:items-end md:gap-3 md:pb-[1.1rem] md:text-right">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={slide.src}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5 }}
          className="min-w-0 text-white"
        >
          <span className="block font-mono text-[11px] tracking-[0.14em] text-white/60 uppercase">
            {slide.place}
            <span className="hidden lg:inline"> · {slide.coords}</span>
          </span>
          <span className="mt-0.5 block truncate text-sm text-white/85">{slide.caption}</span>
        </motion.p>
      </AnimatePresence>
      <div className="flex shrink-0 items-center gap-2" role="group" aria-label="Fotos de fondo">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => go(i)}
            aria-label={`Foto ${i + 1} de ${slides.length}: ${s.place}`}
            aria-current={i === index}
            className="group relative h-6 w-8 cursor-pointer"
          >
            <span
              className={cn(
                "absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 overflow-hidden rounded-full",
                i === index ? "bg-white/30" : "bg-white/25 group-hover:bg-white/50",
              )}
            >
              {i === index && !reduce && (
                <motion.span
                  key={`p-${index}`}
                  className="absolute inset-y-0 left-0 bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                />
              )}
              {i === index && reduce && <span className="absolute inset-0 bg-white" />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [index, go] = useSlides(slides.length);
  const slide = slides[index];

  // Al bajar, la portada se recoge en una tarjeta y el nombre se desplaza en sentidos opuestos.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const clip = useTransform(scrollYProgress, [0, 1], ["inset(0% 0% 0% 0% round 0px)", "inset(7% 3% 0% 3% round 28px)"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const line1 = useTransform(scrollYProgress, [0, 1], ["0vw", "-16vw"]);
  const line2 = useTransform(scrollYProgress, [0, 1], ["0vw", "12vw"]);

  return (
    <section
      ref={ref}
      id="inicio"
      aria-label="Presentación"
      className="relative h-[100svh] min-h-[640px] max-h-[1040px] bg-ink"
    >
      <motion.div
        className="relative h-full w-full overflow-hidden bg-[#07090c]"
        style={reduce ? undefined : { clipPath: clip }}
      >
        {/* Fondo: fotos propias con fundido lento */}
        <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: bgScale }}>
          <AnimatePresence initial={false}>
            <motion.img
              key={slide.src}
              src={slide.src}
              alt=""
              aria-hidden
              draggable={false}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1.6, ease: "easeInOut" }, scale: { duration: INTERVAL / 1000 + 1.6, ease: "linear" } }}
              style={{ objectPosition: slide.position ?? "center" }}
              className="absolute inset-0 h-full w-full object-cover"
              fetchPriority={index === 0 ? "high" : undefined}
            />
          </AnimatePresence>
        </motion.div>

        {/* Oscurecido para leer el texto sobre cualquier foto */}
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(180deg,rgb(7_9_12/0.55)_0%,rgb(7_9_12/0.25)_38%,rgb(7_9_12/0.55)_70%,rgb(7_9_12/0.92)_100%)]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgb(7_9_12/0.6)_0%,transparent_60%)]" />
        {/* Grano fino y retícula, para el acabado técnico */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgb(255_255_255/0.6)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.6)_1px,transparent_1px)] [background-size:96px_96px] [mask-image:linear-gradient(180deg,black,transparent_75%)]"
        />

        <div className="relative z-10 flex h-full flex-col">
          {/* Bloque superior: quién y qué */}
          <motion.div className="flex-1" style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}>
            <Container className="flex h-full flex-col justify-center pt-24 pb-6 md:pt-28">
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.16em] text-white/65 uppercase md:text-xs"
              >
                <span className="flex items-center gap-2.5">
                  <span aria-hidden className="hidden h-px w-8 bg-white/50 sm:block" />
                  Cofundador de Competizione y The Pickle Center
                </span>
                <span className="flex items-center gap-4">
                  <Clock city="Bilbao" tz="Europe/Madrid" />
                  <span aria-hidden className="text-white/30">/</span>
                  <Clock city="Seúl" tz="Asia/Seoul" />
                </span>
              </motion.div>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                className="mt-7 max-w-3xl text-[2.35rem] leading-[1.02] font-semibold tracking-[-0.045em] text-white [text-wrap:balance] sm:text-5xl md:mt-9 lg:text-[3.6rem]"
              >
                Pongo en marcha negocios y abro <span className="text-[#9fb4ff]">mercados</span>.
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
                className="mt-6 flex flex-col gap-7 md:mt-8 md:flex-row md:items-end md:justify-between"
              >
                <p className="max-w-md text-base leading-relaxed text-white/75 md:text-lg">
                  Estrategia, ecommerce, captación de clientes e inteligencia artificial aplicada al negocio.
                </p>
                <div className="flex flex-wrap items-center gap-3">
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
              </motion.div>
            </Container>
          </motion.div>

          {/* Bloque inferior: pie de foto, nombre a todo el ancho y franja de datos */}
          <div>
            <Container className="pb-3 md:hidden">
              <SlideCaption slide={slide} index={index} go={go} reduce={!!reduce} />
            </Container>

            <div className="px-3 md:px-5">
              <GiantName
                lines={["Melkamu", "Gomez-Cruzado"]}
                shifts={[line1, line2]}
                aside={<SlideCaption slide={slide} index={index} go={go} reduce={!!reduce} />}
              />
            </div>

            <div className="mt-2 border-t border-white/15 bg-black/30 backdrop-blur-sm md:mt-3">
              <Marquee className="py-3 [--duration:60s] [--gap:3rem] md:py-3.5" repeat={3}>
                {facts.map(([k, v]) => (
                  <span key={k} className="flex items-center gap-3 font-mono text-[11px] tracking-[0.08em] whitespace-nowrap uppercase md:text-xs">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-[#9fb4ff]" />
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
  { src: "logos/competizione.png", alt: "Competizione", h: "h-5 md:h-6" },
  { src: "logos/tpc.svg", alt: "The Pickle Center", h: "h-7 md:h-8" },
];
const clients = [
  { src: "logos/an-reformas.png", alt: "AN Reformas", h: "h-9 md:h-10" },
  { src: "logos/hosts-revenue.png", alt: "Hosts Revenue", h: "h-10 md:h-11" },
];

function LogoGroup({ label, logos }: { label: string; logos: typeof founded }) {
  return (
    <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
      <p className="shrink-0 font-mono text-xs tracking-[0.14em] text-mute uppercase">{label}</p>
      <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
        {logos.map((l) => (
          <li key={l.alt} className="flex items-center">
            <img src={l.src} alt={l.alt} loading="lazy" className={cn(l.h, "w-auto opacity-75 grayscale transition hover:opacity-100")} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Empresas cofundadas y clientes, justo debajo de la portada. */
export function Logos() {
  return (
    <section aria-label="Empresas y clientes" className="relative z-10 border-b border-line bg-ink-2">
      <Container className="flex flex-col gap-8 py-8 md:flex-row md:items-center md:justify-between md:py-10">
        <LogoGroup label="Cofundador" logos={founded} />
        <LogoGroup label="Clientes" logos={clients} />
      </Container>
    </section>
  );
}
