import React from "react";
import {
  GlobeHemisphereEastIcon,
  MegaphoneIcon,
  StorefrontIcon,
  StrategyIcon,
  TreeStructureIcon,
} from "@phosphor-icons/react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Marquee } from "@/components/ui/marquee";
import { BlurFade } from "@/components/ui/blur-fade";
import { Container, SectionHeading, Marks } from "@/components/site/bits";
import { cn } from "@/lib/utils";

type Item = { area: string; icon: React.ReactNode; title: string; text: string; tone?: "plain" | "dots" | "glow" };

const items: Item[] = [
  {
    area: "md:[grid-area:1/1/2/7]",
    icon: <StrategyIcon className="h-5 w-5" />,
    title: "Validación de negocio",
    text: "Modelo de negocio, precios y márgenes, y pruebas de demanda antes de invertir en producto.",
    tone: "glow",
  },
  {
    area: "md:[grid-area:1/7/2/13]",
    icon: <StorefrontIcon className="h-5 w-5" />,
    title: "Ecommerce y marca",
    text: "Identidad, web y tienda en Shopify orientadas a convertir visitas en pedidos y solicitudes.",
  },
  {
    area: "md:[grid-area:2/1/3/5]",
    icon: <MegaphoneIcon className="h-5 w-5" />,
    title: "Captación de clientes",
    text: "Campañas en Meta segmentadas por tipo de cliente, con medición de cada paso y seguimiento comercial.",
  },
  {
    area: "md:[grid-area:2/5/3/9]",
    icon: <TreeStructureIcon className="h-5 w-5" />,
    title: "Procesos e inteligencia artificial",
    text: "CRM, presupuestadores y automatizaciones a medida, y formación de equipos en inteligencia artificial.",
  },
  {
    area: "md:[grid-area:2/9/3/13]",
    icon: <GlobeHemisphereEastIcon className="h-5 w-5" />,
    title: "Corea del Sur y Europa",
    text: "Inteligencia comercial, búsqueda de proveedores e importación entre ambos mercados.",
    tone: "dots",
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

function Cell({ item }: { item: Item }) {
  return (
    <li className={cn("min-h-[15rem] list-none", item.area)}>
      <div className="relative h-full rounded-xl border border-line p-1.5 md:p-2">
        <GlowingEffect spread={40} glow={false} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
        <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-lg border border-line bg-ink-2 p-6 md:p-7">
          {item.tone === "dots" && (
            <div
              aria-hidden
              className="absolute inset-0 [background-image:radial-gradient(rgb(0_0_0/0.09)_1px,transparent_1px)] [background-size:14px_14px] [mask-image:linear-gradient(to_top_right,black,transparent_70%)]"
            />
          )}
          {item.tone === "glow" && (
            <div aria-hidden className="absolute -top-20 -right-16 h-56 w-56 rounded-full bg-accent/10 blur-[80px]" />
          )}
          <div className="relative w-fit rounded-md border border-line bg-ink p-2 text-accent">{item.icon}</div>
          <div className="relative">
            <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">{item.title}</h3>
            <p className="mt-2 max-w-md leading-relaxed text-mute">{item.text}</p>
          </div>
        </div>
      </div>
    </li>
  );
}

export function Capabilities() {
  return (
    <section id="servicios" aria-labelledby="servicios-t" className="relative border-t border-line py-24 md:py-36">
      <Marks />
      <Container>
        <SectionHeading
          id="servicios-t"
          title="Servicios"
          intro="De la validación de la idea a las primeras ventas, y las herramientas para crecer con orden."
        />
        <BlurFade inView delay={0.1}>
          <ul className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-12 md:grid-rows-2">
            {items.map((item) => (
              <Cell key={item.title} item={item} />
            ))}
          </ul>
        </BlurFade>
      </Container>

      <div className="mt-20 md:mt-28">
        <Container>
          <p className="mb-6 font-mono text-xs tracking-[0.12em] text-mute uppercase">Herramientas de trabajo</p>
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
