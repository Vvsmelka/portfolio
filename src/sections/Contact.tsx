import { useState } from "react";
import { CheckIcon, CopyIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { Container, Marks } from "@/components/site/bits";

const EMAIL = "melkamu996@gmail.com";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contacto" aria-labelledby="contacto-t" className="relative border-t border-line py-24 md:py-36">
      <Marks />
      <Container>
        <BlurFade inView>
          <div className="relative grid overflow-hidden rounded-xl border border-line bg-ink-2 md:grid-cols-[1.3fr_1fr]">
            <div className="relative px-6 py-14 md:px-14 md:py-20">
              <div aria-hidden className="absolute -top-32 -left-20 h-72 w-[30rem] rounded-full bg-accent/10 blur-[110px]" />
              <div className="relative">
                <h2 id="contacto-t" className="text-4xl font-semibold tracking-[-0.045em] text-fg md:text-6xl">
                  Hablemos de tu proyecto.
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute md:text-xl">
                  Si tienes un negocio en marcha o una idea que validar, escríbeme y te propondré los siguientes pasos.
                  Reuniones en Bilbao o en remoto.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="inline-flex items-center gap-2.5 rounded-lg bg-accent px-5 py-3.5 font-mono text-sm text-accent-ink transition hover:-translate-y-px hover:brightness-110 active:translate-y-px"
                  >
                    <EnvelopeSimpleIcon className="h-5 w-5" />
                    {EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={copy}
                    className="inline-flex items-center gap-2 rounded-lg border border-line bg-ink-2 px-4 py-3.5 text-sm font-medium text-fg transition hover:border-black/25"
                  >
                    {copied ? <CheckIcon className="h-4 w-4 text-accent" /> : <CopyIcon className="h-4 w-4" />}
                    <span aria-live="polite">{copied ? "Copiado" : "Copiar email"}</span>
                  </button>
                </div>
              </div>
            </div>
            <figure className="relative min-h-64 md:min-h-full">
              <img
                src="img/bilbao-ria.webp"
                alt="La ría de Bilbao en un día despejado"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 bg-gradient-to-t from-black/60 to-transparent px-4 pt-12 pb-3.5 text-white">
                <span className="text-sm font-medium">La ría, Bilbao</span>
                <span className="font-mono text-[11px] text-white/80">43.2630° N · 2.9350° W</span>
              </figcaption>
            </figure>
            <BorderBeam duration={9} size={280} colorFrom="#2550e6" colorTo="#9fb4ff" />
          </div>
        </BlurFade>
      </Container>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line py-8">
      <Marks />
      <Container className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs text-mute">
        <span>© 2026 Melkamu Gomez-Cruzado</span>
        <span>Bizkaia, España</span>
      </Container>
    </footer>
  );
}
