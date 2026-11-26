import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react/dist/csr/ArrowCounterClockwise";
import { HandPointingIcon } from "@phosphor-icons/react/dist/csr/HandPointing";
import { Container } from "@/components/site/bits";
import { SectionIntro } from "@/components/site/kinetic";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// Mapa de puntos generado con dotted-map (public/img/world-dots.svg). Las posiciones de cada
// lugar están en proporción del mapa (0 a 1), calculadas con la misma herramienta.
const MAP_W = 133;
const MAP_H = 72;
const RATIO = MAP_W / MAP_H;

type Place = {
  id: string;
  name: string;
  meta: string;
  x: number;
  y: number;
  labelLeft?: boolean;
  rows: [string, string][];
  photo?: { src: string; alt: string };
  stat?: { value: string; label: string };
};

const places: Place[] = [
  {
    id: "bilbao",
    name: "Bilbao",
    meta: "Mi base · LEINN y Nitton",
    x: 0.4774,
    y: 0.3849,
    rows: [
      ["Qué hago aquí", "Estudio LEINN, trabajo en Nitton y llevo proyectos para empresas de Bizkaia. Desde aquí salen, y aquí vuelven, todos los viajes."],
      ["Qué he aprendido", "A sostener proyectos en el tiempo con clientes reales, no solo a lanzarlos."],
      ["Qué ha salido", "The Pickle Center, el Festival de Plentzia, el torneo de Gorliz y proyectos para AN Reformas, Hosts Revenue y Abra Innova."],
    ],
    photo: { src: "img/hero-guggenheim.webp", alt: "Una trainera frente al Guggenheim de Bilbao" },
  },
  {
    id: "nyc",
    name: "Nueva York",
    meta: "Learning Journey · noviembre de 2025 · un mes",
    x: 0.2707,
    y: 0.3969,
    rows: [
      ["A qué fui", "A estudiar el mercado del pickleball en Estados Unidos, donde ya es un deporte masivo, y a buscar marcas y posibles socios."],
      ["Qué aprendí", "Que en un mercado maduro la diferencia está en la marca: muchas marcas premium que allí son habituales no llegan a Europa."],
      ["Qué salió", "La estrategia de The Pickle Center: marcas premium difíciles de encontrar en Europa."],
    ],
    photo: { src: "img/nyc-calle.webp", alt: "Rascacielos de Nueva York al atardecer" },
  },
  {
    id: "india",
    name: "India",
    meta: "Learning Journey · con The Pickle Center",
    x: 0.7068,
    y: 0.5172,
    rows: [
      ["A qué fui", "A organizar una sesión de iniciación al pickleball con The Pickle Center, montada desde cero."],
      ["Qué aprendí", "A sacar adelante un evento en otro país, con otro idioma y otros tiempos."],
      ["Qué salió", "Una sesión con 25 personas y la primera experiencia de The Pickle Center fuera de España."],
    ],
    stat: { value: "25", label: "personas en la sesión de iniciación" },
  },
  {
    id: "seoul",
    name: "Seúl",
    meta: "Living Lab · Konkuk University · enero a abril de 2026",
    x: 0.8496,
    y: 0.421,
    labelLeft: true,
    rows: [
      ["A qué fui", "El Living Lab es la estancia internacional de LEINN: cuatro meses viviendo en Seúl, con base en Konkuk University, para trabajar el mercado coreano desde dentro."],
      ["Qué aprendí", "A vender en inglés en otra cultura de negocio y a escuchar antes de proponer: la oportunidad real con una multinacional de certificación salió de una reunión que se salió del guion."],
      ["Qué salió", "La línea coreana de Konsultek: inteligencia comercial para empresas coreanas que quieren entrar en Europa, una cartera de exportadores para esa multinacional y propuestas para una marca coreana de ordenadores de buceo. Además, los primeros contactos de The Pickle Center en Seúl."],
    ],
    photo: { src: "img/seul-gsc-1.webp", alt: "Sesión en el Global Startup Center de Seúl" },
  },
];

const home = places[0];

type View = { s: number; x: number; y: number };

/** Encuadre del mapa: todos los lugares, o acercado a uno. Valores en píxeles, origen arriba a la izquierda. */
function viewFor(w: number, h: number, focus: Place | null): View {
  if (!w || !h) return { s: 1, x: 0, y: 0 };
  const mh = w / RATIO;
  const cover = Math.max(1, h / mh);
  const xs = places.map((p) => p.x);
  const ys = places.map((p) => p.y);
  const x0 = Math.min(...xs) - 0.09;
  const x1 = Math.max(...xs) + 0.09;
  const y0 = Math.min(...ys) - 0.22;
  const y1 = Math.max(...ys) + 0.22;
  const base = Math.max(cover, Math.min(1 / (x1 - x0), h / ((y1 - y0) * mh)));
  // Acercamiento más suave en pantallas grandes, donde el mapa ya se ve grande.
  const s = focus ? base * (w >= 768 ? 1.75 : 2.2) : base;
  const cx = focus ? focus.x : (x0 + x1) / 2;
  const cy = focus ? focus.y : (y0 + y1) / 2;
  let x = w / 2 - s * cx * w;
  let y = h / 2 - s * cy * mh;
  x = Math.min(0, Math.max(w - s * w, x));
  y = Math.min(0, Math.max(h - s * mh, y));
  return { s, x, y };
}

function useSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

// Arco entre Bilbao y cada destino, en coordenadas del mapa.
function arc(to: Place) {
  const ax = home.x * MAP_W;
  const ay = home.y * MAP_H;
  const bx = to.x * MAP_W;
  const by = to.y * MAP_H;
  const mx = (ax + bx) / 2;
  const my = (ay + by) / 2 - Math.abs(bx - ax) * 0.28;
  return `M${ax} ${ay} Q${mx} ${my} ${bx} ${by}`;
}

function TripMap({ selected, onSelect }: { selected: Place | null; onSelect: (p: Place | null) => void }) {
  const [box, { w, h }] = useSize<HTMLDivElement>();
  const v = viewFor(w, h, selected);
  const mh = w / RATIO;
  const transition = { duration: 1.1, ease: EASE };

  return (
    <div
      ref={box}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(70%_70%_at_50%_40%,rgb(37_80_230/0.16),transparent_75%),#0b0d10] sm:aspect-[16/9] lg:aspect-[2.2/1]"
    >
      {w > 0 && (
        <>
          <motion.div
            className="absolute top-0 left-0 origin-top-left"
            style={{ width: w, height: mh }}
            initial={false}
            animate={{ x: v.x, y: v.y, scale: v.s }}
            transition={transition}
          >
            <img src="img/world-dots.svg" alt="" aria-hidden className="absolute inset-0 h-full w-full opacity-40" />
            <svg aria-hidden viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 h-full w-full overflow-visible">
              {places.slice(1).map((p) => (
                <path
                  key={p.id}
                  d={arc(p)}
                  fill="none"
                  stroke="#9fb4ff"
                  strokeWidth={1.5}
                  strokeDasharray="5 7"
                  vectorEffect="non-scaling-stroke"
                  className="trip-arc transition-opacity duration-700"
                  style={{ opacity: !selected || selected.id === p.id || selected.id === "bilbao" ? 0.75 : 0.12 }}
                />
              ))}
            </svg>
          </motion.div>

          {places.map((p) => {
            const active = selected?.id === p.id;
            const dim = !!selected && !active;
            return (
              <motion.button
                key={p.id}
                type="button"
                onClick={() => onSelect(active ? null : p)}
                aria-label={`${p.name}: ver qué hice allí`}
                aria-pressed={active}
                className="group absolute top-0 left-0 -mt-[22px] -ml-[22px] flex h-11 w-11 items-center justify-center"
                initial={false}
                animate={{ x: v.x + v.s * p.x * w, y: v.y + v.s * p.y * mh, opacity: dim ? 0.35 : 1 }}
                transition={transition}
              >
                <span className="absolute h-6 w-6 animate-ping rounded-full bg-[#2550e6]/50" />
                <span
                  className={cn(
                    "relative h-3 w-3 rounded-full border-2 border-white shadow-[0_0_0_4px_rgb(37_80_230/0.45)] transition",
                    active ? "scale-125 bg-white" : p.id === "bilbao" ? "bg-[#2550e6]" : "bg-[#9fb4ff]",
                  )}
                />
                <span
                  className={cn(
                    "pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-md bg-black/75 px-2 py-1 font-mono text-[10px] tracking-[0.1em] whitespace-nowrap text-white uppercase backdrop-blur-sm transition group-hover:bg-[#2550e6] md:text-[11px]",
                    p.labelLeft ? "right-full mr-1" : "left-full ml-1",
                    active && "bg-[#2550e6]",
                  )}
                >
                  {p.name}
                </span>
              </motion.button>
            );
          })}
        </>
      )}

      <AnimatePresence>
        {!selected ? (
          <motion.p
            key="hint"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute top-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 font-mono text-[10px] tracking-[0.12em] text-white/80 uppercase backdrop-blur-md md:top-4 md:left-4 md:text-[11px]"
          >
            <HandPointingIcon className="h-3.5 w-3.5 animate-[nudge_1.6s_ease-in-out_infinite]" />
            Pulsa un punto del mapa
          </motion.p>
        ) : (
          <motion.button
            key="back"
            type="button"
            onClick={() => onSelect(null)}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-3 right-3 inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-sm font-medium text-[#0e0f11] transition hover:bg-white/90 md:top-4 md:right-4"
          >
            <ArrowCounterClockwiseIcon className="h-4 w-4" />
            Volver al mapa
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlaceDetail({ p }: { p: Place }) {
  return (
    <motion.article
      key={p.id}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="grid gap-7 md:grid-cols-[0.9fr_1.1fr] md:gap-12"
      aria-live="polite"
    >
      <div className="min-w-0">
        <h3 className="text-[3rem] leading-[0.9] font-semibold tracking-[-0.05em] md:text-[4.5rem]">{p.name}</h3>
        <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-[#9fb4ff] uppercase md:text-xs">{p.meta}</p>
        {p.photo && (
          <img
            src={p.photo.src}
            alt={p.photo.alt}
            loading="lazy"
            decoding="async"
            className="mt-6 aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover"
          />
        )}
        {p.stat && (
          <div className="mt-6 flex aspect-[4/3] w-full flex-col justify-end rounded-2xl border border-white/10 bg-[radial-gradient(80%_80%_at_20%_0%,rgb(37_80_230/0.35),transparent_70%)] p-6 md:p-8">
            <span className="text-[6rem] leading-none font-semibold tracking-[-0.06em] md:text-[8rem]">{p.stat.value}</span>
            <span className="mt-2 text-white/70">{p.stat.label}</span>
          </div>
        )}
      </div>
      <dl className="grid content-start gap-7 md:pt-24">
        {p.rows.map(([label, text]) => (
          <div key={label}>
            <dt className="font-mono text-[11px] tracking-[0.14em] text-white/50 uppercase">{label}</dt>
            <dd className="mt-2 text-lg leading-relaxed text-white/85 md:text-xl">{text}</dd>
          </div>
        ))}
      </dl>
    </motion.article>
  );
}

export function Trips() {
  const [selected, setSelected] = useState<Place | null>(null);
  const detail = useRef<HTMLDivElement>(null);

  const choose = (p: Place | null) => {
    setSelected(p);
    // En móvil, si el detalle queda fuera de la vista, se acerca un poco para que se vea que ha aparecido.
    if (p && detail.current && window.innerWidth < 768) {
      const r = detail.current.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.85) window.scrollBy({ top: r.top - window.innerHeight * 0.55, behavior: "smooth" });
    }
  };

  return (
    <section id="viajes" aria-labelledby="viajes-t" className="relative overflow-hidden bg-[#07090c] py-24 text-white md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_90%_5%,rgb(37_80_230/0.25),transparent_70%),radial-gradient(40%_35%_at_0%_95%,rgb(159_180_255/0.1),transparent_70%)]"
      />
      <Container className="relative">
        <SectionIntro
          dark
          index="04"
          label="Dónde he aprendido"
          aside={`${places.length} lugares`}
          title="Viajes"
          id="viajes-t"
          max={260}
          intro="Cada viaje de LEINN tiene un objetivo. Pulsa en el mapa para ver qué hice en cada sitio y qué salió de ahí."
        />

        <div className="mt-12 md:mt-16">
          <TripMap selected={selected} onSelect={choose} />

          {/* Acceso directo a cada lugar, cómodo con el pulgar */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="group" aria-label="Lugares">
            {places.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => choose(selected?.id === p.id ? null : p)}
                aria-pressed={selected?.id === p.id}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
                  selected?.id === p.id
                    ? "border-white bg-white text-[#0e0f11]"
                    : "border-white/20 bg-white/[0.06] text-white hover:bg-white/[0.12]",
                )}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div ref={detail} className="mt-10 min-h-[4rem] md:mt-14">
            <AnimatePresence mode="wait">
              {selected ? (
                <PlaceDetail key={selected.id} p={selected} />
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="max-w-xl text-lg leading-relaxed text-white/60"
                >
                  Bilbao es la base. Desde aquí, Nueva York, India y Seúl: tres viajes que acabaron en proyectos, clientes y
                  contactos.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}
