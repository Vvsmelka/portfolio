import { ArrowRightIcon } from "@phosphor-icons/react";
import { ImagesSlider, type Slide } from "@/components/ui/images-slider";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { BlurFade } from "@/components/ui/blur-fade";
import { Container } from "@/components/site/bits";
import { cn } from "@/lib/utils";

// Fotos propias de Bilbao: la ciudad desde la que trabajo.
const slides: Slide[] = [
  {
    src: "img/hero-guggenheim.webp",
    place: "Bilbao",
    caption: "Una trainera frente al Guggenheim",
    coords: "43.2687° N · 2.9340° W",
    position: "50% 55%",
  },
  {
    src: "img/hero-ria-torres.webp",
    place: "Bilbao",
    caption: "La ría y las torres Isozaki",
    coords: "43.2669° N · 2.9283° W",
    position: "50% 45%",
  },
  {
    src: "img/hero-calle.webp",
    place: "Bilbao",
    caption: "Camino del Guggenheim",
    coords: "43.2672° N · 2.9365° W",
    position: "50% 40%",
  },
];

export function Hero() {
  return (
    <section id="inicio" aria-label="Presentación" className="relative">
      <ImagesSlider
        slides={slides}
        className="min-h-[640px] h-[92svh] max-h-[960px] bg-[#0b0d10]"
        renderCaption={(slide, index, total, go) => (
          <div className="absolute inset-x-0 bottom-0 z-20">
            <Container className="flex items-end justify-between gap-6 pb-6 md:pb-8">
              <p className="min-w-0 text-white">
                <span className="block font-mono text-[11px] tracking-[0.14em] text-white/70 uppercase">
                  {slide.place}
                  <span className="hidden sm:inline"> · {slide.coords}</span>
                </span>
                <span className="mt-1 block truncate text-sm text-white/90">{slide.caption}</span>
              </p>
              <div className="flex shrink-0 items-center gap-2" role="group" aria-label="Fotos de fondo">
                {Array.from({ length: total }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Foto ${i + 1} de ${total}`}
                    aria-current={i === index}
                    className={cn(
                      "h-1 rounded-full transition-all duration-500",
                      i === index ? "w-8 bg-white" : "w-4 bg-white/40 hover:bg-white/70",
                    )}
                  />
                ))}
              </div>
            </Container>
          </div>
        )}
      >
        {/* Oscurecido para que el texto se lea sobre cualquier foto */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 bg-[linear-gradient(90deg,rgb(8_10_14/0.82)_0%,rgb(8_10_14/0.55)_42%,rgb(8_10_14/0.12)_100%)]"
        />
        <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-48 bg-gradient-to-t from-black/60 to-transparent" />

        <Container className="relative z-20 flex h-full flex-col justify-center pt-20">
          <BlurFade delay={0.05}>
            <p className="font-mono text-xs tracking-[0.16em] text-white/70 uppercase">
              Melkamu Gomez-Cruzado · Bilbao
            </p>
          </BlurFade>
          <BlurFade delay={0.15}>
            <h1 className="mt-6 max-w-3xl text-[2.7rem] leading-[1.02] font-semibold tracking-[-0.045em] text-white [text-wrap:balance] sm:text-6xl lg:text-[4.6rem]">
              Pongo en marcha negocios y abro{" "}
              <PointerHighlight
                containerClassName="inline-block align-baseline"
                rectangleClassName="border-white/60 rounded-[4px] bg-white/[0.06]"
                pointerClassName="text-[#9fb4ff]"
              >
                <span className="relative z-10 px-1.5">mercados</span>
              </PointerHighlight>{" "}
              nuevos.
            </h1>
          </BlurFade>
          <BlurFade delay={0.25}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/80 md:text-xl">
              Estrategia, tienda online, captación y herramientas con IA. Lo aplico en mis empresas y en las de mis
              clientes.
            </p>
          </BlurFade>
          <BlurFade delay={0.35}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#proyectos"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-[#0e0f11] transition hover:-translate-y-px hover:bg-white/90 active:translate-y-px"
              >
                Ver proyectos <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#contacto"
                className="inline-flex items-center rounded-lg border border-white/25 bg-white/10 px-5 py-3 font-medium text-white backdrop-blur-md transition hover:bg-white/20"
              >
                Contactar
              </a>
            </div>
          </BlurFade>
        </Container>
      </ImagesSlider>
    </section>
  );
}

const logos = [
  { src: "logos/competizione.png", alt: "Competizione", h: "h-5 md:h-6" },
  { src: "logos/tpc.svg", alt: "The Pickle Center", h: "h-7 md:h-8" },
  { src: "logos/an-reformas.png", alt: "AN Reformas", h: "h-9 md:h-10" },
  { src: "logos/hosts-revenue.png", alt: "Hosts Revenue", h: "h-10 md:h-11" },
];

/** Empresas propias y clientes, justo debajo de la portada. */
export function Logos() {
  return (
    <section aria-label="Empresas y clientes" className="relative z-10 border-b border-line bg-ink-2">
      <Container className="flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-10">
        <p className="shrink-0 font-mono text-xs tracking-[0.14em] text-mute uppercase">Empresas propias y clientes</p>
        <ul className="grid grid-cols-2 items-center gap-x-10 gap-y-6 sm:flex sm:flex-wrap sm:gap-x-14">
          {logos.map((l) => (
            <li key={l.alt} className="flex items-center">
              <img
                src={l.src}
                alt={l.alt}
                loading="lazy"
                className={cn(l.h, "w-auto opacity-75 grayscale transition hover:opacity-100")}
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
