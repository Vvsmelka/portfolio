// Basado en Apple Cards Carousel de Aceternity UI (el mismo que distribuye 21st.dev).
// Adaptado: sin next/image, iconos Phosphor, tema claro y tarjetas sin imagen.
import React, { useEffect, useRef, useState, createContext, useContext } from "react";
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
}

export type CardData = {
  src?: string;
  title: string;
  category: string;
  content: React.ReactNode;
  cover?: React.ReactNode;
  position?: string;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    }
  };

  const step = () => (window.innerWidth < 768 ? 260 : 420);
  const scrollLeft = () => carouselRef.current?.scrollBy({ left: -step(), behavior: "smooth" });
  const scrollRight = () => carouselRef.current?.scrollBy({ left: step(), behavior: "smooth" });

  const handleCardClose = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-6 [scrollbar-width:none] md:py-10"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="mx-auto flex w-full max-w-6xl flex-row justify-start gap-4 px-4 md:px-6">
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.08 * index, ease: "easeOut" }}
                key={"card" + index}
                className="shrink-0 rounded-xl last:pr-4 md:last:pr-6"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl justify-end gap-2 px-4 md:px-6">
          <button
            type="button"
            aria-label="Anterior"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-ink-2 text-fg transition hover:border-black/25 disabled:opacity-35"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Siguiente"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-ink-2 text-fg transition hover:border-black/25 disabled:opacity-35"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <ArrowRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({ card, index, layout = false }: { card: CardData; index: number; layout?: boolean }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }
    if (!open) return;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useOutsideClick(containerRef, () => open && handleClose());

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
    triggerRef.current?.focus({ preventScroll: true });
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[70] h-screen overflow-auto" role="dialog" aria-modal="true" aria-label={card.title}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/45 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[80] mx-auto my-6 h-fit max-w-4xl rounded-xl border border-line bg-ink-2 p-5 md:my-12 md:p-10"
            >
              <button
                type="button"
                aria-label="Cerrar"
                className="sticky top-4 right-0 ml-auto flex h-10 w-10 items-center justify-center rounded-lg border border-line bg-ink-3 text-fg transition hover:bg-black/5"
                onClick={handleClose}
                autoFocus
              >
                <XIcon className="h-5 w-5" />
              </button>
              <p className="font-mono text-sm text-mute">{card.category}</p>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-fg md:text-5xl">{card.title}</h3>
              <div className="pt-8">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        ref={triggerRef}
        type="button"
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="group relative z-10 flex h-96 w-64 flex-col items-start justify-between overflow-hidden rounded-xl border border-line bg-ink-3 text-left md:h-[34rem] md:w-[25rem]"
      >
        <div className="pointer-events-none absolute inset-0 z-30 bg-[linear-gradient(to_bottom,rgb(0_0_0/0.82)_0%,rgb(0_0_0/0.25)_32%,transparent_55%,rgb(0_0_0/0.65)_100%)]" />
        <div className="relative z-40 p-6 md:p-8">
          <p className="font-mono text-xs text-white/75 md:text-sm">{card.category}</p>
          <p className="mt-2 max-w-xs text-2xl font-semibold tracking-tight [text-wrap:balance] text-white md:text-3xl">
            {card.title}
          </p>
        </div>
        <span className="relative z-40 m-6 inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 font-mono text-xs text-white backdrop-blur-md transition group-hover:bg-white/20 md:m-8">
          Ver caso <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5" />
        </span>
        {card.src ? (
          <BlurImage
            src={card.src}
            alt=""
            style={card.position ? { objectPosition: card.position } : undefined}
            className="absolute inset-0 z-10 object-cover transition duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 z-10">{card.cover}</div>
        )}
      </motion.button>
    </>
  );
};

export const BlurImage = ({ src, className, alt, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn("h-full w-full transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
      onLoad={() => setLoading(false)}
      src={src}
      loading="lazy"
      decoding="async"
      alt={alt ?? ""}
      {...rest}
    />
  );
};
