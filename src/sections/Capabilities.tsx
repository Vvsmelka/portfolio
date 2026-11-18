import { motion } from "motion/react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Marquee } from "@/components/ui/marquee";
import { Container } from "@/components/site/bits";
import { SectionIntro } from "@/components/site/kinetic";

const items = [
  {
    title: "Validación de negocio",
    text: "Modelo de negocio, precios y márgenes, y pruebas de demanda antes de invertir en producto.",
    proof: "Gravity Systems · ShareWay",
  },
  {
    title: "Ecommerce y marca",
    text: "Identidad, web y tienda en Shopify orientadas a convertir visitas en pedidos y solicitudes.",
    proof: "The Pickle Center · AN Reformas",
  },
  {
    title: "Captación de clientes",
    text: "Campañas en Meta segmentadas por tipo de cliente, con medición de cada paso y seguimiento comercial.",
    proof: "AN Reformas · Hosts Revenue",
  },
  {
    title: "Procesos e inteligencia artificial",
    text: "CRM, presupuestadores y automatizaciones a medida, y formación de equipos en inteligencia artificial.",
    proof: "Hosts Revenue · Abra Innova",
  },
  {
    title: "Corea del Sur y Europa",
    text: "Inteligencia comercial, estudios de mercado y búsqueda de socios entre ambos mercados.",
    proof: "Konsultek · Seúl",
  },
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
    <section
      id="servicios"
      aria-labelledby="servicios-t"
      className="relative overflow-hidden bg-[#07090c] py-24 text-white md:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_85%_10%,rgb(37_80_230/0.25),transparent_70%),radial-gradient(40%_35%_at_0%_100%,rgb(159_180_255/0.1),transparent_70%)]"
      />
      <Container className="relative">
        <SectionIntro
          dark
          index="02"
          label="Servicios"
          aside="Para empresas"
          title="Servicios"
          id="servicios-t"
          intro="De la validación de la idea a las primeras ventas, y las herramientas para crecer con orden."
        />

        <ol className="mt-14 border-b border-white/12 md:mt-20">
          {items.map((it, i) => (
            <motion.li
              key={it.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.04 * i }}
              className="group relative border-t border-white/12"
            >
              {/* Barrido de color al pasar el cursor */}
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(90deg,rgb(37_80_230/0.22),rgb(37_80_230/0.04))] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <div className="relative grid grid-cols-[2.5rem_1fr] items-baseline gap-x-4 gap-y-3 py-7 md:grid-cols-[4.5rem_1.1fr_1fr_2rem] md:gap-x-8 md:py-10">
                <span className="font-mono text-xs text-white/45 tabular-nums md:text-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[1.75rem] leading-[1.02] font-semibold tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-2 md:text-5xl">
                  {it.title}
                </h3>
                <div className="col-start-2 md:col-start-3">
                  <p className="leading-relaxed text-white/65 md:text-lg">{it.text}</p>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.1em] text-[#9fb4ff] uppercase">{it.proof}</p>
                </div>
                <ArrowUpRightIcon className="hidden h-6 w-6 self-center text-white/30 transition duration-500 group-hover:rotate-45 group-hover:text-white md:block" />
              </div>
            </motion.li>
          ))}
        </ol>
      </Container>

      <div className="relative mt-20 md:mt-28">
        <Container>
          <p className="mb-6 font-mono text-xs tracking-[0.12em] text-white/50 uppercase">Herramientas de trabajo</p>
        </Container>
        <div className="relative">
          <Marquee pauseOnHover className="[--duration:38s] [--gap:3.5rem]">
            {tools.map(([slug, name]) => (
              <div key={slug} className="flex items-center gap-3 text-white/60">
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
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#07090c] to-transparent md:w-48" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#07090c] to-transparent md:w-48" />
        </div>
      </div>
    </section>
  );
}
