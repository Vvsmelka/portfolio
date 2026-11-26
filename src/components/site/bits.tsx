import React from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/csr/ArrowUpRight";
import { PlusIcon } from "@phosphor-icons/react/dist/csr/Plus";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 md:px-6", className)}>{children}</div>;
}

/** Líneas verticales fijas a los bordes del contenido (solo escritorio). */
export function Frame() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 left-1/2 z-0 hidden w-full max-w-6xl -translate-x-1/2 border-x border-line md:block" />
  );
}

/** Cruces donde la línea superior de una sección se encuentra con el marco. */
export function Marks() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-20 hidden md:block">
      <div className="relative mx-auto max-w-6xl">
        <PlusIcon weight="light" className="absolute -top-[7px] -left-[7px] h-[14px] w-[14px] text-fg/45" />
        <PlusIcon weight="light" className="absolute -top-[7px] -right-[7px] h-[14px] w-[14px] text-fg/45" />
      </div>
    </div>
  );
}

export function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li key={t} className="rounded-md border border-line bg-ink px-2.5 py-1 font-mono text-xs text-mute">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ExternalButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className="inline-flex items-center gap-2 rounded-lg bg-fg px-5 py-3 text-sm font-medium text-ink transition hover:-translate-y-px hover:bg-black active:translate-y-px"
    >
      {children}
      <ArrowUpRightIcon className="h-4 w-4" />
    </a>
  );
}

/** Contenido común de cada caso dentro del modal del carrusel. */
export function CaseDetail({
  lead,
  media,
  caption,
  bullets,
  tools,
  status,
  link,
}: {
  lead: string;
  media?: React.ReactNode;
  caption?: string;
  bullets: string[];
  tools: string[];
  status?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="grid gap-8">
      <p className="max-w-3xl text-lg leading-relaxed text-fg/90 md:text-xl">{lead}</p>
      {media && (
        <figure className="overflow-hidden rounded-xl border border-line bg-ink-3">
          {media}
          {caption && <figcaption className="border-t border-line px-4 py-3 text-sm text-mute">{caption}</figcaption>}
        </figure>
      )}
      <div className="grid gap-8 md:grid-cols-[1.6fr_1fr] md:gap-12">
        <div>
          <h4 className="mb-4 font-mono text-xs tracking-[0.12em] text-mute uppercase">Qué he hecho</h4>
          <ul className="grid gap-3">
            {bullets.map((b) => (
              <li key={b} className="relative pl-5 leading-relaxed text-mute">
                <span className="absolute top-[0.7em] left-0 h-px w-2.5 bg-accent" aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid content-start gap-6">
          <div>
            <h4 className="mb-3 font-mono text-xs tracking-[0.12em] text-mute uppercase">Herramientas</h4>
            <Chips items={tools} />
          </div>
          {status && (
            <div>
              <h4 className="mb-2 font-mono text-xs tracking-[0.12em] text-mute uppercase">Estado</h4>
              <p className="text-mute">{status}</p>
            </div>
          )}
          {link && (
            <div>
              <ExternalButton href={link.href}>{link.label}</ExternalButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function Shot({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={cn("block h-auto w-full", className)} />;
}
