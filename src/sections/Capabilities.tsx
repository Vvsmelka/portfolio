import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PlusIcon } from "@phosphor-icons/react/dist/csr/Plus";
import { Marquee } from "@/components/ui/marquee";
import { Container, Marks } from "@/components/site/bits";
import { SectionIntro, VelocityMarquee } from "@/components/site/kinetic";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Skill = {
  title: string;
  text: string;
  proof: string;
  img?: string;
  stat?: { value: string; label: string };
};

// Soy bueno en…: cada aptitud con dónde la he demostrado y una imagen o cifra que lo enseña.
const skills: Skill[] = [
  {
    title: "Abrir mercado y crear relaciones",
    text: "Contacto con marcas, clubes, empresas e instituciones, también en inglés y en otra cultura de negocio.",
    proof: "Seúl · Nueva York · patrocinio de DropShot",
    img: "img/hero-nyc.webp",
  },
  {
    title: "Validar antes de invertir",
    text: "Pruebo la demanda con lo mínimo antes de construir: una encuesta, una lista de espera o una sesión gratuita.",
    proof: "ShareWay · Strabe Motion · The Pickle Center",
    img: "img/strabe.webp",
  },
  {
    title: "Ecommerce y captación de clientes",
    text: "Tienda online, campañas en Meta y medición de cada paso, del anuncio a la venta o la visita comercial.",
    proof: "The Pickle Center · AN Reformas",
    img: "img/card-tpc.webp",
  },
  {
    title: "Organizar equipos y eventos",
    text: "Roles claros, seguimiento y entregas a tiempo, también cuando hay muchas piezas y poco margen.",
    proof: "Nitton · Festival de Plentzia · Torneo de Gorliz",
    stat: { value: "50", label: "participantes en el torneo de Vitoria-Gasteiz" },
  },
  {
    title: "Inteligencia artificial aplicada",
    text: "Herramientas y automatizaciones con IA para el día a día de una empresa, y formación para que el equipo las use.",
    proof: "Abra Innova · Hosts Revenue",
    img: "img/hosts-crm.webp",
  },
];

const values = ["Aprender haciendo", "Escuchar antes de proponer", "Cuidar el detalle", "Pensar en margen y escala"];

const tools = [
  ["shopify", "Shopify"],
  ["supabase", "Supabase"],
  ["react", "React"],
  ["typescript", "TypeScript"],
  ["vercel", "Vercel"],
  ["netlify", "Netlify"],
  ["meta", "Meta Ads"],
  ["anthropic", "Claude"],
  ["python", "Python"],
  ["tailwindcss", "Tailwind CSS"],
  ["vite", "Vite"],
  ["googleanalytics", "Google Analytics"],
];

const Dot = () => (
  <span className="mx-[0.3em] inline-block h-[0.14em] w-[0.14em] translate-y-[-0.28em] rounded-full bg-accent align-middle" />
);

export function Capabilities() {
  const [open, setOpen] = useState(0);

  return (
    <section id="aptitudes" aria-labelledby="aptitudes-t" className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <Marks />
      <Container>
        <SectionIntro
          index="05"
          label="Aptitudes"
          aside="Soy bueno en…"
          title="Aptitudes"
          id="aptitudes-t"
          intro="Lo que hago bien y dónde lo he demostrado. Pulsa cada una para verla."
        />

        <ol className="mt-12 border-b border-line md:mt-20">
          {skills.map((it, i) => {
            const isOpen = open === i;
            return (
              <li key={it.title} className="border-t border-line">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`apt-${i}`}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="group flex w-full items-center gap-4 py-6 text-left md:gap-8 md:py-8"
                >
                  <span className="w-7 shrink-0 font-mono text-xs text-mute tabular-nums md:w-10 md:text-sm">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3
                    className={cn(
                      "flex-1 text-[1.6rem] leading-[1.04] font-semibold tracking-[-0.04em] transition-colors md:text-[2.6rem]",
                      isOpen ? "text-fg" : "text-fg/55 group-hover:text-fg",
                    )}
                  >
                    {it.title}
                  </h3>
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition duration-500",
                      isOpen ? "rotate-45 border-accent bg-accent text-white" : "border-line text-fg group-hover:border-fg/40",
                    )}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`apt-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-5 pb-8 md:grid-cols-[1fr_1.1fr] md:gap-10 md:pb-10 md:pl-[4.5rem]">
                        {it.img ? (
                          <img
                            src={it.img}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            className="aspect-[16/10] w-full rounded-xl border border-line object-cover object-top"
                          />
                        ) : (
                          it.stat && (
                            <div className="flex aspect-[16/10] w-full flex-col justify-end rounded-xl border border-line bg-[radial-gradient(80%_90%_at_15%_0%,rgb(37_80_230/0.22),transparent_70%)] bg-ink-2 p-6">
                              <span className="text-[5rem] leading-none font-semibold tracking-[-0.06em] text-fg md:text-[6.5rem]">
                                {it.stat.value}
                              </span>
                              <span className="mt-1 text-mute">{it.stat.label}</span>
                            </div>
                          )
                        )}
                        <div className="md:pt-2">
                          <p className="text-lg leading-relaxed text-fg/80 md:text-xl">{it.text}</p>
                          <p className="mt-4 font-mono text-[11px] tracking-[0.1em] text-accent uppercase">{it.proof}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>

        <h3 className="mt-20 font-mono text-xs tracking-[0.14em] text-mute uppercase md:mt-28">Valores · Cómo trabajo</h3>
      </Container>

      {/* Valores en grande, con el movimiento del scroll */}
      <div className="mt-6" aria-label={values.join(", ")}>
        <div aria-hidden>
          <VelocityMarquee baseVelocity={-1.8} className="text-[13vw] leading-[1] font-semibold tracking-[-0.055em] text-fg md:text-[6.5rem]">
            {values.map((v) => (
              <span key={v}>
                {v}
                <Dot />
              </span>
            ))}
          </VelocityMarquee>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <Container>
          <h3 className="mb-6 font-mono text-xs tracking-[0.14em] text-mute uppercase">Hard skills</h3>
        </Container>
        <div className="relative">
          <Marquee pauseOnHover className="[--duration:38s] [--gap:3.5rem]">
            {tools.map(([slug, name]) => (
              <div key={slug} className="flex items-center gap-3 text-mute">
                <span
                  aria-hidden
                  className="h-6 w-6 bg-current"
                  style={{
                    maskImage: `url(logos/${slug}.svg)`,
                    WebkitMaskImage: `url(logos/${slug}.svg)`,
                    maskSize: "contain",
                    WebkitMaskSize: "contain",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                />
                <span className="text-lg font-medium tracking-tight whitespace-nowrap">{name}</span>
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent md:w-48" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent md:w-48" />
        </div>
      </div>
    </section>
  );
}
