import { motion } from "motion/react";
import { Container } from "@/components/site/bits";
import { SectionIntro } from "@/components/site/kinetic";

const EASE = [0.16, 1, 0.3, 1] as const;

type Trip = {
  place: string;
  meta: string;
  went: string;
  learned: string;
  outcome: string;
  photo?: { src: string; alt: string };
  stat?: { value: string; label: string };
};

// Cada viaje del grado se justifica por lo que salió de él.
const trips: Trip[] = [
  {
    place: "India",
    meta: "Learning Journey · con The Pickle Center",
    went: "Organizar una sesión de iniciación al pickleball con The Pickle Center, montada desde cero.",
    learned: "A sacar adelante un evento en otro país, con otro idioma y otros tiempos.",
    outcome: "Una sesión con 25 personas y la primera experiencia de The Pickle Center fuera de España.",
    stat: { value: "25", label: "personas en la sesión de iniciación" },
  },
  {
    place: "Nueva York",
    meta: "Learning Journey · noviembre de 2025 · un mes",
    went: "Estudiar el mercado del pickleball en Estados Unidos, donde ya es un deporte masivo, y buscar marcas y posibles socios.",
    learned: "Que en un mercado maduro la diferencia está en la marca: muchas marcas premium que allí son habituales no llegan a Europa.",
    outcome: "La estrategia de The Pickle Center: marcas premium difíciles de encontrar en Europa.",
    photo: { src: "img/nyc-calle.webp", alt: "Rascacielos de Nueva York al atardecer" },
  },
  {
    place: "Seúl",
    meta: "Living Lab · Konkuk University · enero a abril de 2026",
    went: "El Living Lab es la estancia internacional de LEINN: cuatro meses viviendo en Seúl, con base en Konkuk University, para trabajar el mercado coreano desde dentro.",
    learned: "A vender en inglés en otra cultura de negocio y a escuchar antes de proponer: la oportunidad real con una multinacional de certificación salió de una reunión que se salió del guion.",
    outcome: "La línea coreana de Konsultek, inteligencia comercial para empresas coreanas que quieren entrar en Europa: una cartera de exportadores para esa multinacional y propuestas para una marca coreana de ordenadores de buceo. Además, los primeros contactos de The Pickle Center en Seúl.",
    photo: { src: "img/seul-gsc-1.webp", alt: "Sesión en el Global Startup Center de Seúl" },
  },
];

const rows: [keyof Trip, string][] = [
  ["went", "A qué fui"],
  ["learned", "Qué aprendí"],
  ["outcome", "Qué salió"],
];

export function Trips() {
  return (
    <section id="viajes" aria-labelledby="viajes-t" className="relative overflow-hidden bg-[#07090c] py-24 text-white md:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_90%_5%,rgb(37_80_230/0.25),transparent_70%),radial-gradient(40%_35%_at_0%_95%,rgb(159_180_255/0.1),transparent_70%)]"
      />
      <Container className="relative">
        <SectionIntro
          dark
          index="03"
          label="Dónde he aprendido"
          aside={`${trips.length} destinos`}
          title="Viajes"
          id="viajes-t"
          max={260}
          intro="Cada viaje de LEINN tiene un objetivo. Estos tres acabaron en proyectos, clientes y contactos."
        />

        <div className="mt-14 md:mt-20">
          {trips.map((t, i) => (
            <motion.article
              key={t.place}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="grid gap-8 border-t border-white/12 py-12 md:grid-cols-[0.95fr_1.05fr] md:gap-14 md:py-16"
            >
              <div className="min-w-0">
                <p className="font-mono text-xs text-white/45 tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-[3.4rem] leading-[0.9] font-semibold tracking-[-0.05em] md:text-[5.5rem]">
                  {t.place}
                </h3>
                <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-[#9fb4ff] uppercase md:text-xs">{t.meta}</p>
                {t.photo && (
                  <img
                    src={t.photo.src}
                    alt={t.photo.alt}
                    loading="lazy"
                    decoding="async"
                    className="mt-7 aspect-[4/3] w-full rounded-2xl border border-white/10 object-cover"
                  />
                )}
                {t.stat && (
                  <div className="mt-7 flex aspect-[4/3] w-full flex-col justify-end rounded-2xl border border-white/10 bg-[radial-gradient(80%_80%_at_20%_0%,rgb(37_80_230/0.35),transparent_70%)] p-6 md:p-8">
                    <span className="text-[6rem] leading-none font-semibold tracking-[-0.06em] md:text-[9rem]">{t.stat.value}</span>
                    <span className="mt-2 text-white/70">{t.stat.label}</span>
                  </div>
                )}
              </div>
              <dl className="grid content-start gap-8 md:pt-10">
                {rows.map(([key, label]) => (
                  <div key={key}>
                    <dt className="font-mono text-[11px] tracking-[0.14em] text-white/50 uppercase">{label}</dt>
                    <dd className="mt-2 text-lg leading-relaxed text-white/85 md:text-xl">{t[key] as string}</dd>
                  </div>
                ))}
              </dl>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
