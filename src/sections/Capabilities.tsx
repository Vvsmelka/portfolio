import { motion } from "motion/react";
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

const hard: { group: string; items: string[] }[] = [
  { group: "Ecommerce y marketing", items: ["Shopify", "Meta Ads", "SEO", "Google Analytics"] },
  { group: "Producto y desarrollo web", items: ["React", "TypeScript", "Supabase", "Python", "Vercel", "Netlify"] },
  { group: "Inteligencia artificial", items: ["Claude", "Automatizaciones", "CRM a medida"] },
  { group: "Gestión y método", items: ["Business Model Canvas", "Buyer Persona", "Customer Journey Map", "Excel"] },
  { group: "Idiomas", items: ["Castellano nativo", "Inglés de negocio"] },
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
          intro="Lo que hago bien y dónde lo he demostrado. Después, cómo trabajo y las herramientas que domino."
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

        <div className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <h3 className="font-mono text-xs tracking-[0.14em] text-mute uppercase">Valores · Cómo trabajo</h3>
            <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line">
              {values.map(([v, d]) => (
                <li key={v} className="bg-ink-2 p-5 md:p-6">
                  <p className="text-lg font-semibold tracking-tight text-fg">{v}</p>
                  <p className="mt-1.5 leading-relaxed text-mute">{d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-mono text-xs tracking-[0.14em] text-mute uppercase">Hard skills</h3>
            <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line">
              {hard.map((h) => (
                <div key={h.group} className="grid gap-3 bg-ink-2 p-5 md:grid-cols-[11rem_1fr] md:items-baseline md:gap-6 md:p-6">
                  <p className="font-mono text-[11px] tracking-[0.12em] text-mute uppercase">{h.group}</p>
                  <ul className="flex flex-wrap gap-2">
                    {h.items.map((x) => (
                      <li key={x} className="rounded-md border border-line bg-ink px-2.5 py-1 text-sm text-fg">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
