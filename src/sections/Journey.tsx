import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { Container, Marks } from "@/components/site/bits";
import { SectionIntro } from "@/components/site/kinetic";

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

const DocLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener"
    className="group mb-6 inline-flex items-center gap-1.5 font-medium text-accent underline-offset-4 hover:underline"
  >
    {children}
    <ArrowUpRightIcon className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  </a>
);

const data: TimelineEntry[] = [
  {
    title: "2023",
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
    title: "Mar 2024",
    content: (
      <>
        <P>
          ShareWay Carpool, primer proyecto en Nitton, con Gorka Fernández: coche compartido entre estudiantes para llegar
          al campus de la UPV/EHU en Leioa, con más de 44.000 alumnos. En la encuesta a estudiantes, el 47,8 % compartiría
          trayecto y el 40,9 % vive a más de 10 km. Preparamos la propuesta, el plan de implantación con la universidad y un
          prototipo de la web.
        </P>
        <div className="max-w-xl">
          <Img src="img/shareway-web.webp" alt="Prototipo de la web de ShareWay Carpool" />
        </div>
      </>
    ),
  },
  {
    title: "May 2024",
    content: (
      <>
        <P>
          Gravity Systems: plan de negocio de un envase patentado con cámara de flotación, que impide que las botellas de
          plástico se hundan en el mar y facilita su recogida. Como director de operaciones, preparé el dossier con producto,
          mercado, DAFO, objetivos comerciales y presupuesto, presentado a BBK ARIN.
        </P>
        <P>
          En paralelo, mi Learning Path sobre gestión de equipos y resultados empresariales, a partir de Good to Great de Jim
          Collins, Management Teams de Belbin y un curso de edX.
        </P>
        <DocLink href="docs/learning-path-melkamu-gomez-cruzado.pdf">Leer el Learning Path (PDF)</DocLink>
        <div className="grid max-w-xl grid-cols-2 gap-3">
          <Img src="img/gravity-dossier.webp" alt="Portada del dossier de Gravity Systems" portrait />
          <a href="docs/learning-path-melkamu-gomez-cruzado.pdf" target="_blank" rel="noopener" aria-label="Abrir el Learning Path en PDF">
            <Img src="img/learning-path.webp" alt="Portada del Learning Path sobre gestión de equipos" portrait />
          </a>
        </div>
      </>
    ),
  },
  {
    title: "Nov 2024",
    content: (
      <>
        <P>
          B-Digital Solutions, con Ander Martin: digitalización de pequeños comercios con web, reservas online y SEO local, y
          acompañamiento para solicitar el Kit Digital. Es el origen de Konsultek.
        </P>
        <div className="max-w-xl">
          <Img src="img/bdigital.webp" alt="Presentación de B-Digital Solutions" />
        </div>
      </>
    ),
  },
  {
    title: "Ene 2025",
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
          Living Lab en Konkuk University, en Seúl. Desde allí, Konsultek suma una línea de inteligencia comercial entre
          Corea del Sur y Europa.
        </P>
        <div className="grid max-w-xl grid-cols-2 gap-3">
          <Img src="img/seul-gsc-1.webp" alt="Sesión en el Global Startup Center de Seúl" />
          <Img src="img/seul-gsc-2.webp" alt="Encuentro de equipos en el Global Startup Center de Seúl" />
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
        <SectionIntro
          index="03"
          label="Trayectoria"
          aside="2023 — hoy"
          title="Trayectoria"
          id="trayectoria-t"
          intro="Formación, empresas y proyectos, en orden cronológico."
        />
      </Container>
      <Timeline data={data} />
    </section>
  );
}
