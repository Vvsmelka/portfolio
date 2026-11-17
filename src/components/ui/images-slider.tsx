// Basado en Images Slider de Aceternity UI (21st.dev). Adaptado para fondo de portada:
// fundido lento con zoom suave, contenido visible desde el primer momento y pie de foto
// sincronizado con la imagen activa.
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import React, { useEffect, useState } from "react";

export type Slide = { src: string; place: string; caption: string; coords: string; position?: string };

export const ImagesSlider = ({
  slides,
  children,
  className,
  interval = 6500,
  renderCaption,
}: {
  slides: Slide[];
  children: React.ReactNode;
  className?: string;
  interval?: number;
  renderCaption?: (slide: Slide, index: number, total: number, go: (i: number) => void) => React.ReactNode;
}) => {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  // Precarga del resto de fotos cuando la primera ya está en pantalla.
  useEffect(() => {
    slides.slice(1).forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, [slides]);

  useEffect(() => {
    if (reduce || slides.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(id);
  }, [reduce, slides.length, interval, index]);

  const slide = slides[index];

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.src}
          src={slide.src}
          alt=""
          aria-hidden
          draggable={false}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4, ease: "easeInOut" }, scale: { duration: interval / 1000 + 1.4, ease: "linear" } }}
          style={{ objectPosition: slide.position ?? "center" }}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority={index === 0 ? "high" : undefined}
        />
      </AnimatePresence>
      {children}
      {renderCaption?.(slide, index, slides.length, setIndex)}
    </div>
  );
};
