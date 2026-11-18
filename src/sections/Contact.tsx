import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpIcon, CheckIcon, CopyIcon, EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { Container } from "@/components/site/bits";
import { FitHeading, VelocityMarquee } from "@/components/site/kinetic";

const EMAIL = "melkamu996@gmail.com";
const EASE = [0.16, 1, 0.3, 1] as const;

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
    <section
      id="contacto"
      aria-labelledby="contacto-t"
      className="relative overflow-hidden bg-[#07090c] pt-24 text-white md:pt-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_45%_at_20%_25%,rgb(37_80_230/0.28),transparent_70%),radial-gradient(45%_40%_at_100%_100%,rgb(159_180_255/0.12),transparent_70%)]"
      />

      <Container className="relative">
        <div className="flex items-center justify-between border-b border-white/15 pb-4 font-mono text-[11px] tracking-[0.16em] text-white/55 uppercase md:text-xs">
          <span>(05) Contacto</span>
          <span>Bilbao · Remoto</span>
        </div>
        <div className="mt-6 md:mt-8">
          <FitHeading text="Hablemos." id="contacto-t" max={300} className="text-white" />
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[1.25fr_1fr] md:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <p className="max-w-lg text-lg leading-relaxed text-white/70 md:text-xl">
              Si tienes un negocio en marcha o una idea que validar, escríbeme y te propondré los siguientes pasos.
              Reuniones en Bilbao o en remoto.
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-8 inline-flex max-w-full items-center gap-3 text-[1.35rem] font-semibold tracking-[-0.03em] break-all text-white sm:text-3xl md:text-[2.6rem]"
            >
              <EnvelopeSimpleIcon className="h-7 w-7 shrink-0 text-[#9fb4ff] md:h-9 md:w-9" />
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-bottom-left bg-no-repeat pb-1 transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                {EMAIL}
              </span>
            </a>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-[#0e0f11] transition hover:-translate-y-px hover:bg-white/90 active:translate-y-px"
              >
                Escribir un correo
              </a>
              <button
                type="button"
                onClick={copy}
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/[0.06] px-4 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/[0.12]"
              >
                {copied ? <CheckIcon className="h-4 w-4 text-[#9fb4ff]" /> : <CopyIcon className="h-4 w-4" />}
                <span aria-live="polite">{copied ? "Copiado" : "Copiar email"}</span>
              </button>
            </div>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
            className="relative min-h-64 overflow-hidden rounded-2xl border border-white/10 md:min-h-full"
          >
            <img
              src="img/bilbao-ria.webp"
              alt="La ría de Bilbao en un día despejado"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent px-4 pt-12 pb-3.5">
              <span className="text-sm font-medium">La ría, Bilbao</span>
              <span className="font-mono text-[11px] text-white/80">43.2630° N · 2.9350° W</span>
            </figcaption>
          </motion.figure>
        </div>
      </Container>

      {/* Cierre: el nombre corriendo con el scroll */}
      <div className="relative mt-24 border-t border-white/10 py-6 md:mt-36 md:py-10">
        <VelocityMarquee baseVelocity={-1.6} className="text-[18vw] leading-[0.9] font-semibold tracking-[-0.06em] text-white/[0.09] md:text-[12rem]">
          Melkamu Gomez-Cruzado —
        </VelocityMarquee>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-[#07090c] py-8 text-white/55">
      <Container className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
        <span>© 2026 Melkamu Gomez-Cruzado</span>
        <span>Bizkaia, España</span>
        <a href="#inicio" className="inline-flex items-center gap-1.5 text-white/70 transition hover:text-white">
          Volver arriba <ArrowUpIcon className="h-3.5 w-3.5" />
        </a>
      </Container>
    </footer>
  );
}
