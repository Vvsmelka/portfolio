import { VelocityMarquee } from "@/components/site/kinetic";

const Dot = () => <span className="mx-[0.25em] inline-block h-[0.14em] w-[0.14em] translate-y-[-0.28em] rounded-full bg-accent align-middle" />;

/** Franja de palabras grandes entre la portada y los proyectos: reacciona a la velocidad del scroll. */
export function Words() {
  return (
    <section aria-label="Áreas de trabajo" className="relative z-10 overflow-hidden border-b border-line bg-ink py-8 md:py-14">
      <p className="sr-only">Estrategia, ecommerce, captación de clientes, inteligencia artificial, Corea del Sur y marca.</p>
      <div aria-hidden>
        <VelocityMarquee className="text-[17vw] leading-[0.95] font-semibold tracking-[-0.06em] text-fg md:text-[9.5rem]">
          Estrategia <Dot /> Ecommerce <Dot /> Captación <Dot />
        </VelocityMarquee>
        <VelocityMarquee
          baseVelocity={2.5}
          className="text-[17vw] leading-[0.95] font-semibold tracking-[-0.06em] text-transparent [-webkit-text-stroke:1.5px_rgb(14_15_17/0.55)] md:text-[9.5rem]"
        >
          Inteligencia artificial <Dot /> Corea del Sur <Dot /> Marca <Dot />
        </VelocityMarquee>
      </div>
    </section>
  );
}
