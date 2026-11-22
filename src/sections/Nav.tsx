import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#perfil", label: "Sobre mí" },
  { href: "#leinn", label: "LEINN" },
  { href: "#viajes", label: "Viajes" },
  { href: "#aptitudes", label: "Aptitudes" },
  { href: "#proyectos", label: "Proyectos" },
];

export function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  // Sobre la foto de la portada la barra va en blanco; al bajar, en claro.
  const onPhoto = !scrolled;

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 md:top-4">
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Principal"
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-xl border px-3 py-2 transition-colors duration-300 md:px-4",
          onPhoto
            ? "border-transparent bg-transparent"
            : "border-line bg-ink-2/85 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.15)] backdrop-blur-xl",
        )}
      >
        <a href="#inicio" className={cn("text-[15px] font-semibold tracking-tight transition-colors", onPhoto ? "text-white" : "text-fg")}>
          <span className="hidden sm:inline">Melkamu Gomez-Cruzado</span>
          <span className="sm:hidden">Melka</span>
        </a>
        <div className="flex items-center gap-1 md:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={cn(
                "hidden rounded-md px-3 py-2 text-sm transition md:inline-block",
                onPhoto ? "text-white/80 hover:bg-white/10 hover:text-white" : "text-mute hover:bg-black/[0.04] hover:text-fg",
              )}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition hover:-translate-y-px active:translate-y-px",
              onPhoto ? "bg-white text-[#0e0f11] hover:bg-white/90" : "bg-fg text-ink-2 hover:brightness-110",
            )}
          >
            Contactar
          </a>
        </div>
      </motion.nav>
    </header>
  );
}
