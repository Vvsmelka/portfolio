import { motion } from "motion/react";
import { Marquee } from "@/components/ui/marquee";
import { Container, Marks } from "@/components/site/bits";
import { SectionIntro } from "@/components/site/kinetic";

const EASE = [0.16, 1, 0.3, 1] as const;

// Soy bueno en…: cada aptitud con dónde la he demostrado.
const skills = [
  {
    title: "Abrir mercado y crear relaciones",
    text: "Contacto con marcas, clubes, empresas e instituciones, también en inglés y en otra cultura de negocio.",
    proof: "Seúl · Nueva York · patrocinio de DropShot",
  },
  {
    title: "Validar antes de invertir",
    text: "Pruebo la demanda con lo mínimo antes de construir: una encuesta, una lista de espera o una sesión gratuita.",
    proof: "ShareWay · Strabe Motion · The Pickle Center",
  },
  {
    title: "Ecommerce y captación de clientes",
    text: "Tienda online, campañas en Meta y medición de cada paso, del anuncio a la venta o la visita comercial.",
    proof: "The Pickle Center · AN Reformas",
  },
  {
    title: "Organizar equipos y eventos",
    text: "Roles claros, seguimiento y entregas a tiempo, también cuando hay muchas piezas y poco margen.",
    proof: "Nitton · Festival de Plentzia · Torneo de Gorliz",
  },
  {
    title: "Inteligencia artificial aplicada",
    text: "Herramientas y automatizaciones con IA para el día a día de una empresa, y formación para que el equipo las use.",
    proof: "Abra Innova · Hosts Revenue",
  },
];

const values = [
  ["Aprender haciendo", "Prefiero probar algo pequeño y real a planificar sin salir del papel."],
  ["Escuchar antes de proponer", "Las mejores oportunidades me han llegado de atender a lo que el cliente necesita de verdad."],
  ["Cuidar el detalle", "Una errata o un enlace roto restan confianza. Reviso todo lo que ve el cliente."],
  ["Pensar en margen y escala", "Un proyecto tiene que poder crecer y dejar margen, no solo funcionar una vez."],
];

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

export function Capabilities() {
  return (
    <section id="aptitudes" aria-labelledby="aptitudes-t" className="relative border-t border-line py-24 md:py-36">
      <Marks />
      <Container>
        <SectionIntro
          index="04"
          label="Aptitudes"
          aside="Soy bueno en…"
          title="Aptitudes"
          id="aptitudes-t"
          intro="Lo que hago bien y dónde lo he demostrado. Después, cómo trabajo y las herramientas que uso."
        />

        <ol className="mt-14 border-b border-line md:mt-20">
          {skills.map((it, i) => (
            <motion.li
              key={it.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.04 * i }}
              className="group relative border-t border-line"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(90deg,rgb(37_80_230/0.1),rgb(37_80_230/0.02))] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <div className="relative grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-3 py-7 md:grid-cols-[4.5rem_1.1fr_1fr] md:gap-x-8 md:py-9">
                <span className="font-mono text-xs text-mute tabular-nums md:text-sm">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-[1.65rem] leading-[1.04] font-semibold tracking-[-0.04em] text-fg transition-transform duration-500 group-hover:translate-x-2 md:text-[2.6rem]">
                  {it.title}
                </h3>
                <div className="col-start-2 md:col-start-3">
                  <p className="leading-relaxed text-mute md:text-lg">{it.text}</p>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-accent uppercase">{it.proof}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="mt-20 md:mt-28">
          <h3 className="font-mono text-xs tracking-[0.14em] text-mute uppercase">Valores · Cómo trabajo</h3>
          <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {values.map(([v, d]) => (
              <li key={v} className="bg-ink-2 p-5 md:p-6">
                <p className="text-lg font-semibold tracking-tight text-fg">{v}</p>
                <p className="mt-1.5 leading-relaxed text-mute">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="mt-20 md:mt-28">
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
