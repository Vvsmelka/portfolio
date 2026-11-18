// Piezas tipográficas con movimiento, comunes a todas las secciones.
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const TYPE = "font-semibold tracking-[-0.06em] whitespace-nowrap";

/** Titular que ocupa todo el ancho disponible (hasta `max` px) y aparece letra a letra al entrar en pantalla. */
export function FitHeading({
  text,
  id,
  max = 190,
  className,
}: {
  text: string;
  id?: string;
  max?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const probe = useRef<HTMLSpanElement>(null);
  const [size, setSize] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const letters = Array.from(text);

  useLayoutEffect(() => {
    const el = wrap.current;
    const p = probe.current;
    if (!el || !p) return;
    const fit = () => {
      const pw = p.getBoundingClientRect().width;
      if (pw) setSize(Math.min((el.clientWidth / pw) * 100, max));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [text, max]);

  return (
    <div ref={wrap} className="relative w-full">
      {/* Copia invisible para medir; dentro de una caja de tamaño cero para que no ensanche la página */}
      <div aria-hidden className="pointer-events-none absolute top-0 left-0 h-0 w-0 overflow-hidden">
        <span ref={probe} className={cn(TYPE, "invisible absolute top-0 left-0 text-[100px]")}>
          {letters.map((ch, i) => (
            <span key={i} className="inline-block">
              {ch}
            </span>
          ))}
        </span>
      </div>
      <motion.h2
        id={id}
        aria-label={text}
        className={cn(TYPE, className)}
        style={{ fontSize: size ? `${size}px` : "14vw", lineHeight: 0.88 }}
        initial={reduce ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        <span aria-hidden className="block overflow-hidden pt-[0.05em] pb-[0.04em]">
          {letters.map((ch, i) => (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                show: { y: "0%", transition: { duration: 0.95, ease: EASE, delay: i * 0.035 } },
              }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      </motion.h2>
    </div>
  );
}

/** Cabecera de sección: índice, titular a todo el ancho y entradilla. */
export function SectionIntro({
  index,
  label,
  title,
  intro,
  aside,
  id,
  dark,
  max,
}: {
  index: string;
  label: string;
  title: string;
  intro?: ReactNode;
  aside?: string;
  id?: string;
  dark?: boolean;
  max?: number;
}) {
  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-between border-b pb-4 font-mono text-[11px] tracking-[0.16em] uppercase md:text-xs",
          dark ? "border-white/15 text-white/55" : "border-line text-mute",
        )}
      >
        <span>
          ({index}) {label}
        </span>
        {aside && <span>{aside}</span>}
      </div>
      <div className="mt-6 md:mt-8">
        <FitHeading text={title} id={id} max={max} className={dark ? "text-white" : "text-fg"} />
      </div>
      {intro && (
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className={cn(
            "mt-6 max-w-xl text-lg leading-relaxed md:mt-8 md:ml-auto md:text-xl",
            dark ? "text-white/65" : "text-mute",
          )}
        >
          {intro}
        </motion.p>
      )}
    </div>
  );
}

const wrapRange = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** Franja de texto grande que avanza sola y acelera, cambia de sentido e inclina con la velocidad del scroll. */
export function VelocityMarquee({
  children,
  baseVelocity = -2.5,
  className,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const factor = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const skew = useTransform(smooth, [-2500, 0, 2500], [7, 0, -7]);
  const x = useTransform(baseX, (v) => `${wrapRange(-25, -50, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let move = dir.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    move += dir.current * move * f;
    baseX.set(baseX.get() + move);
  });

  return (
    <div className={cn("flex overflow-hidden whitespace-nowrap", className)}>
      <motion.div className="flex whitespace-nowrap will-change-transform" style={reduce ? undefined : { x, skewX: skew }}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} aria-hidden={i > 0} className="block pr-[0.35em]">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
