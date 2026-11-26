import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Container, Marks } from "@/components/site/bits";
import { SectionIntro } from "@/components/site/kinetic";

// Todo lo que alguien quiere saber de un vistazo, sin tener que deducirlo.
const facts = [
  ["Base", "Bilbao, Bizkaia · nacido en Valladolid"],
  ["Formación", "LEINN, Mondragon Unibertsitatea · 4.º curso (2023–2027)"],
  ["Nitton", "Team Leader, Customer Leader y Digital Leader"],
  ["Idiomas", "Castellano e inglés"],
];

// Lo que está en marcha ahora mismo (noviembre de 2026).
const now = [
  { name: "Abra Innova", what: "Cribado con IA de la economía azul", tag: "Entrega en noviembre" },
  { name: "AN Reformas", what: "Web nueva y sistema de captación", tag: "En desarrollo" },
  { name: "The Pickle Center", what: "Sesiones en centros educativos de Bizkaia", tag: "En marcha" },
];

const interests = ["Pickleball", "Balonmano", "Viajar", "Corea del Sur", "Leer"];

const stats: [number, string][] = [
  [21, "años"],
  [4, "países con proyectos"],
  [3, "roles en Nitton"],
  [11, "marcas en la tienda de The Pickle Center"],
];

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!inView || !el) return;
    if (reduce) {
      el.textContent = String(to);
      return;
    }
    const c = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => (el.textContent = String(Math.round(v))),
    });
    return () => c.stop();
  }, [inView, to, reduce]);
  return <span ref={ref}>{reduce ? to : 0}</span>;
}

export function Profile() {
  return (
    <section id="perfil" aria-labelledby="perfil-t" className="relative border-t border-line py-24 md:py-36">
      <Marks />
      <Container>
        <SectionIntro index="02" label="Sobre mí" aside="21 años · Bilbao" title="Sobre mí" id="perfil-t" max={230} />
      </Container>
      <Container className="mt-10 md:mt-14">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
          {stats.map(([n, label]) => (
            <li key={label} className="flex flex-col justify-between gap-3 bg-ink-2 p-5 md:p-7">
              <span className="text-[3.4rem] leading-none font-semibold tracking-[-0.06em] text-fg tabular-nums md:text-[5rem]">
                <CountUp to={n} />
              </span>
              <span className="text-sm leading-snug text-mute md:text-base">{label}</span>
            </li>
          ))}
        </ul>
      </Container>
      <Container className="mt-10 grid grid-cols-1 gap-12 md:mt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <BlurFade inView className="min-w-0">
          <div className="grid gap-5 text-lg leading-relaxed text-mute">
            <p>
              <span className="text-fg">Soy Melkamu Gomez-Cruzado, tengo 21 años y vivo en Bilbao.</span> Estoy en el
              último curso de LEINN, en Mondragon Unibertsitatea, y he cofundado The Pickle Center.
            </p>
            <p>
              Donde más aporto es abriendo mercado: poner en marcha un proyecto, conseguir los primeros clientes y crear
              relaciones con marcas, clubes y socios, aquí o fuera.
            </p>
          </div>
          <figure className="relative mt-8 overflow-hidden rounded-xl border border-line">
            <img
              src="img/bilbao-zubizuri.webp"
              alt="El puente Zubizuri, en Uribitarte, Bilbao"
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 bg-gradient-to-t from-black/65 to-transparent px-4 pt-12 pb-3.5 text-white">
              <span className="text-sm font-medium">Uribitarte, junto a la sede de Nitton</span>
              <span className="font-mono text-[11px] text-white/80">Bilbao</span>
            </figcaption>
          </figure>
          <div className="mt-8">
            <p className="mb-3 font-mono text-xs tracking-[0.12em] text-mute uppercase">Intereses</p>
            <ul className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <li key={i} className="rounded-md border border-line bg-ink-2 px-3 py-1.5 text-sm text-fg">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.08} className="min-w-0">
          <div className="grid gap-3">
            <dl className="overflow-hidden rounded-xl border border-line bg-ink-2">
              {facts.map(([k, v], i) => (
                <div
                  key={k}
                  className={
                    "grid grid-cols-[6.5rem_1fr] gap-4 px-5 py-3.5 text-sm md:grid-cols-[7.5rem_1fr]" +
                    (i ? " border-t border-line" : "")
                  }
                >
                  <dt className="font-mono text-xs tracking-[0.1em] text-mute uppercase">{k}</dt>
                  <dd className="text-fg">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="rounded-xl border border-line bg-ink-2 p-4 md:p-5">
              <div className="mb-3 flex items-center justify-between font-mono text-[11px] tracking-[0.12em] text-mute uppercase">
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Ahora
                </span>
                <span>Nov 2026</span>
              </div>
              <ul className="divide-y divide-line">
                {now.map((n) => (
                  <li key={n.name} className="flex items-center justify-between gap-4 py-2.5">
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium text-fg">{n.name}</p>
                      <p className="truncate text-sm text-mute">{n.what}</p>
                    </div>
                    <span className="hidden shrink-0 rounded-md border border-line bg-ink px-2 py-1 font-mono text-[11px] text-mute sm:inline">
                      {n.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </BlurFade>
      </Container>
    </section>
  );
}
