import { motion } from "motion/react";
import { ArrowUpRightIcon, ArrowDownIcon } from "@phosphor-icons/react";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { Container, Marks } from "@/components/site/bits";
import { SectionIntro } from "@/components/site/kinetic";

const EASE = [0.16, 1, 0.3, 1] as const;

// Lo que el grado me ha dado y que no se aprende en un grado de empresa al uso.
const takeaways = [
  {
    title: "Una empresa real desde el primer día",
    text: "Trabajo dentro de Nitton, la junior empresa del grado: clientes, facturas y resultados, no casos de estudio. He sido Team Leader y Customer Leader, y hoy soy Digital Leader.",
  },
  {
    title: "Validar antes de construir",
    text: "Probar la demanda con lo mínimo antes de invertir: una encuesta, una lista de espera o una sesión gratuita. Lo aplico desde ShareWay hasta The Pickle Center.",
  },
  {
    title: "Aprender viajando",
    text: "Cada viaje del grado tiene un objetivo. India, Nueva York y Seúl acabaron en proyectos, clientes y contactos.",
    href: "#viajes",
  },
  {
    title: "Equipo, lectura y método",
    text: "Trabajo en equipo con coach, lectura constante, mi propio Learning Path y herramientas como el Business Model Canvas, el Buyer Persona o el Customer Journey Map.",
  },
];

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-5 max-w-2xl text-base leading-relaxed text-fg/85 md:text-lg">{children}</p>
);

const Year = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-3 font-mono text-xs tracking-[0.12em] text-mute uppercase">{children}</p>
);

const Learned = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-6 max-w-2xl border-l-2 border-accent pl-4 text-base leading-relaxed text-fg md:text-lg">
    <span className="mb-1 block font-mono text-[11px] tracking-[0.12em] text-accent uppercase">Lo que aprendí</span>
    {children}
  </p>
);

const Img = ({ src, alt, portrait }: { src: string; alt: string; portrait?: boolean }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    className={
      "w-full rounded-xl border border-line object-cover shadow-[0_10px_30px_-18px_rgb(0_0_0/0.35)] " +
      (portrait ? "aspect-[4/5]" : "aspect-[16/10] object-left-top")
    }
  />
);

const DocLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target={href.startsWith("#") ? undefined : "_blank"}
    rel={href.startsWith("#") ? undefined : "noopener"}
    className="group mb-6 inline-flex items-center gap-1.5 font-medium text-accent underline-offset-4 hover:underline"
  >
    {children}
    <ArrowUpRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </a>
);

const years: TimelineEntry[] = [
  {
    title: "1.º curso",
    content: (
      <>
        <Year>2023–24 · Primeros proyectos en equipo</Year>
        <P>
          Entro en Nitton y lanzamos los primeros proyectos. ShareWay Carpool, con Gorka Fernández: coche compartido para
          llegar al campus de la UPV/EHU en Leioa, con encuesta a estudiantes y prototipo de web. Gravity Systems: plan de
          negocio de un envase patentado que evita que las botellas de plástico se hundan en el mar, presentado a BBK ARIN
          como director de operaciones. Y mi primer Learning Path, sobre gestión de equipos y resultados empresariales.
        </P>
        <Learned>A validar con datos antes de construir y a repartir roles en un equipo.</Learned>
        <DocLink href="docs/learning-path-melkamu-gomez-cruzado.pdf">Leer el Learning Path (PDF)</DocLink>
        <div className="grid max-w-xl gap-3">
          <Img src="img/shareway-web.webp" alt="Prototipo de la web de ShareWay Carpool" />
          <div className="grid grid-cols-2 gap-3">
            <Img src="img/gravity-dossier.webp" alt="Portada del dossier de Gravity Systems" portrait />
            <a href="docs/learning-path-melkamu-gomez-cruzado.pdf" target="_blank" rel="noopener" aria-label="Abrir el Learning Path en PDF">
              <Img src="img/learning-path.webp" alt="Portada del Learning Path sobre gestión de equipos" portrait />
            </a>
          </div>
        </div>
      </>
    ),
  },
  {
    title: "2.º curso",
    content: (
      <>
        <Year>2024–25 · Primeros clientes</Year>
        <P>
          Con Ander Martin monto B-Digital Solutions: web, reservas online, SEO local y Kit Digital para pequeños comercios.
          Es el origen de Konsultek. En enero de 2025 nace The Pickle Center en el programa TMT de Mondragon Team Academy:
          tienda online, primeros eventos y acuerdos con marcas.
        </P>
        <Learned>A vender un servicio a un negocio de verdad y a sostener una marca más allá de un trabajo de clase.</Learned>
        <div className="grid max-w-xl gap-3">
          <Img src="img/bdigital.webp" alt="Presentación de B-Digital Solutions" />
          <div className="grid grid-cols-2 gap-3">
            <Img src="img/tpc-ig-1.webp" alt="Publicación de The Pickle Center" portrait />
            <Img src="img/tpc-ig-2.webp" alt="Serie de clubes de pickleball de España" portrait />
          </div>
        </div>
      </>
    ),
  },
  {
    title: "3.º curso",
    content: (
      <>
        <Year>2025–26 · Salir fuera</Year>
        <P>
          El año de los viajes: Learning Journey en Nueva York en noviembre de 2025 y Living Lab en Seúl de enero a abril de
          2026, con The Pickle Center y Konsultek como proyectos de fondo. De vuelta, el Festival de pickleball de Plentzia,
          con 6 pistas, y el torneo de fútbol 7 de Gorliz, en julio de 2026.
        </P>
        <Learned>
          A abrir conversaciones en inglés y en otra cultura de negocio, y a organizar eventos grandes con poco tiempo.
        </Learned>
        <DocLink href="#viajes">Ver qué salió de cada viaje</DocLink>
        <div className="grid max-w-xl grid-cols-2 gap-3">
          <Img src="img/hero-nyc.webp" alt="Nueva York al amanecer" />
          <Img src="img/seul-gsc-1.webp" alt="Sesión en el Global Startup Center de Seúl" />
        </div>
      </>
    ),
  },
  {
    title: "4.º curso",
    content: (
      <>
        <Year>2026–27 · Proyectos para empresas</Year>
        <P>
          Último curso: web y sistema de captación para AN Reformas, CRM para Hosts Revenue, y cribado con IA y un curso de
          cinco sesiones para Abra Innova. En Nitton soy Digital Leader y, con Loratzen, preparo el trabajo de fin de grado.
        </P>
        <Learned>
          A adaptar el trabajo al nivel real de cada cliente: el curso de IA cambió de formato tras la segunda clase porque
          el equipo ya sabía más de lo previsto.
        </Learned>
        <div className="grid max-w-xl grid-cols-2 gap-3">
          <Img src="img/anreformas.webp" alt="Web de AN Reformas" />
          <Img src="img/hosts-crm.webp" alt="CRM de Hosts Revenue" />
        </div>
      </>
    ),
  },
];

export function Leinn() {
  return (
    <section id="leinn" aria-labelledby="leinn-t" className="relative border-t border-line pt-24 md:pt-36">
      <Marks />
      <Container>
        <SectionIntro
          index="02"
          label="De dónde vengo"
          aside="Mondragon Unibertsitatea"
          title="LEINN"
          id="leinn-t"
          max={260}
          intro="Liderazgo, Emprendimiento e Innovación. Un grado en el que la empresa no se estudia en casos: se crea desde el primer curso, en equipo, con clientes reales y viajando."
        />

        <h3 className="mt-16 font-mono text-xs tracking-[0.14em] text-mute uppercase md:mt-24">Lo que me llevo de LEINN</h3>
        <ul className="mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
          {takeaways.map((t, i) => (
            <motion.li
              key={t.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.05 * i }}
              className="flex flex-col gap-3 bg-ink-2 p-6 md:p-8"
            >
              <span className="font-mono text-xs text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <h4 className="text-2xl font-semibold tracking-[-0.03em] text-fg md:text-[1.7rem]">{t.title}</h4>
              <p className="leading-relaxed text-mute">{t.text}</p>
              {t.href && (
                <a href={t.href} className="group mt-1 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent">
                  Ver los viajes <ArrowDownIcon className="h-4 w-4 transition group-hover:translate-y-0.5" />
                </a>
              )}
            </motion.li>
          ))}
        </ul>

        <h3 className="mt-20 font-mono text-xs tracking-[0.14em] text-mute uppercase md:mt-28">Año a año</h3>
      </Container>
      <Timeline data={years} />
    </section>
  );
}
