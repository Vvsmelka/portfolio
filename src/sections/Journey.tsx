import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { Container, SectionHeading, Marks } from "@/components/site/bits";

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-6 max-w-2xl text-base leading-relaxed text-fg/85 md:text-lg">{children}</p>
);

const Img = ({ src, alt, portrait }: { src: string; alt: string; portrait?: boolean }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
    className={
      "w-full rounded-xl border border-line object-cover shadow-[0_10px_30px_-18px_rgb(0_0_0/0.35)] " + (portrait ? "aspect-[4/5]" : "aspect-[16/10] object-left-top")
    }
  />
);

const data: TimelineEntry[] = [
  {
    title: "LEINN",
    content: (
      <>
      <P>
        Grado en Liderazgo, Emprendimiento e Innovación en Mondragon Unibertsitatea, en Bilbao, donde se aprende creando y
        gestionando empresas reales. En Nitton, la junior empresa del grado, he sido Team Leader y Customer Leader, y hoy
        soy Digital Leader.
      </P>
        <div className="max-w-sm">
          <Img src="img/bilbao-zubizuri.webp" alt="El puente Zubizuri, junto a la sede de Nitton en Uribitarte" portrait />
        </div>
      </>
    ),
  },
  {
    title: "2024",
    content: (
      <>
        <P>
          Cofundación de The Pickle Center en el programa TMT de Mondragon Team Academy. Primeros eventos, tienda online y
          acuerdos con marcas del sector.
        </P>
        <div className="grid max-w-xl grid-cols-2 gap-3">
          <Img src="img/tpc-ig-1.webp" alt="Publicación de The Pickle Center" portrait />
          <Img src="img/tpc-ig-2.webp" alt="Serie de clubes de pickleball de España" portrait />
        </div>
      </>
    ),
  },
  {
    title: "Nov 2025",
    content: (
      <>
        <P>
          Learning Journey de un mes en Nueva York para The Pickle Center: investigación del mercado del pickleball en
          Estados Unidos y contacto con posibles socios.
        </P>
        <div className="max-w-[16rem]">
          <Img src="img/nyc-calle.webp" alt="Rascacielos de Nueva York al atardecer" portrait />
        </div>
      </>
    ),
  },
  {
    title: "Ene 2026",
    content: (
      <>
        <P>
          Living Lab en Konkuk University, en Seúl. De esa estancia nacen Konsultek, la línea coreana de Competizione y el
          concepto de IcePop.
        </P>
        <div className="grid max-w-xl grid-cols-2 gap-3">
          <Img src="img/seul-gs25-vaso.webp" alt="Vaso de hielo en una tienda GS25 de Seúl" portrait />
          <Img src="img/seul-gs25.webp" alt="Bebidas con hielo en una tienda de conveniencia de Seúl" portrait />
        </div>
      </>
    ),
  },
  {
    title: "Mar 2026",
    content: (
      <>
        <P>
          Puesta en marcha de Competizione con Iker Arruza y desarrollo de su plataforma interna de importación entre marzo y
          julio.
        </P>
        <div className="max-w-xl">
          <Img src="img/competizione.webp" alt="Web de Competizione" />
        </div>
      </>
    ),
  },
  {
    title: "Jul 2026",
    content: (
      <P>
        Festival de pickleball en Plentzia y torneo de fútbol 7 en Gorliz, con una aplicación de resultados en tiempo real.
      </P>
    ),
  },
  {
    title: "Otoño 2026",
    content: (
      <>
        <P>
          Proyectos para empresas: la nueva web y el sistema de captación de AN Reformas, el CRM de Hosts Revenue y el
          cribado con IA de Abra Innova, con un curso para su equipo.
        </P>
        <div className="grid max-w-xl grid-cols-2 gap-3">
          <Img src="img/anreformas.webp" alt="Web de AN Reformas" />
          <Img src="img/hosts-crm.webp" alt="CRM de Hosts Revenue" />
        </div>
      </>
    ),
  },
];

export function Journey() {
  return (
    <section id="trayectoria" aria-labelledby="trayectoria-t" className="relative border-t border-line pt-24 md:pt-36">
      <Marks />
      <Container>
        <SectionHeading
          id="trayectoria-t"
          title="Trayectoria"
          intro="Formación, empresas y proyectos, en orden cronológico."
        />
      </Container>
      <Timeline data={data} />
    </section>
  );
}
