import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { Carousel, Card, type CardData } from "@/components/ui/apple-cards-carousel";
import { BlurFade } from "@/components/ui/blur-fade";
import { CaseDetail, Container, SectionHeading, Shot, Marks } from "@/components/site/bits";

const tpcPosts = ["img/tpc-ig-1.webp", "img/tpc-ig-2.webp", "img/tpc-ig-3.webp", "img/tpc-ig-4.webp"];

const AbraCover = () => (
  <div className="relative h-full w-full overflow-hidden bg-[#0b1214]">
    <div className="absolute inset-0 [background-image:radial-gradient(rgb(255_255_255/0.12)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_60%_70%,black,transparent_70%)]" />
    <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-[#1f6f78]/50 blur-[90px]" />
    <div className="absolute -bottom-10 left-10 h-56 w-56 rounded-full bg-accent/25 blur-[90px]" />
    <p className="absolute right-6 bottom-24 left-6 text-[2.6rem] leading-[0.95] font-semibold tracking-[-0.04em] text-white/90 md:right-8 md:left-8 md:text-6xl">
      Economía
      <br />
      azul
    </p>
  </div>
);

const cards: CardData[] = [
  {
    category: "Cofundador · Importación de vehículos",
    title: "Competizione",
    src: "img/competizione.webp",
    position: "72% 50%",
    content: (
      <CaseDetail
        lead="Importación a medida de vehículos desde Corea del Sur y Alemania para clientes en España. Fundada junto a Iker Arruza, con un socio operativo en Corea del Sur."
        media={
          <div className="grid gap-2 p-2">
            <Shot src="img/competizione.webp" alt="Portada de competizione.es" className="rounded-xl" />
            <Shot src="img/competizione-catalogo.webp" alt="Catálogo de vehículos de Competizione con precio de mercado y precio de importación" className="rounded-xl" />
          </div>
        }
        caption="competizione.es: portada y catálogo con el precio de mercado en España frente al precio de importación."
        bullets={[
          "Modelo de negocio y operativa completa: búsqueda en origen, compra, transporte, aduanas, homologación y matriculación en España.",
          "Foco en Hyundai, Kia y Genesis, que pueden entrar con arancel preferente gracias al acuerdo comercial entre la Unión Europea y Corea del Sur.",
          "Tienda en Shopify con precio cerrado llave en mano, comparado con el precio de mercado en España.",
          "Plataforma interna desarrollada entre marzo y julio de 2026: búsqueda en el mercado coreano, calculadora de costes de importación, CRM y propuestas en PDF para cada cliente.",
          "Estrategia de contenido en Instagram y vídeo para presentar el mercado coreano al comprador español.",
        ]}
        tools={["Shopify", "React", "Supabase", "Vercel", "Meta Ads"]}
        link={{ href: "https://competizione.es", label: "Visitar competizione.es" }}
      />
    ),
  },
  {
    category: "Cofundador · Deporte y ecommerce",
    title: "The Pickle Center",
    src: "img/card-tpc.webp",
    content: (
      <CaseDetail
        lead="Marca de pickleball con sede en Bizkaia, cofundada con Nicolás Martínez Riego en el programa TMT de Mondragon Team Academy. Reúne tienda online, eventos, comunidad y asesoría a clubes."
        media={
          <div className="grid grid-cols-2 gap-2 p-2 md:grid-cols-4">
            {tpcPosts.map((src) => (
              <Shot key={src} src={src} alt="Publicación de Instagram de The Pickle Center" className="rounded-xl" />
            ))}
          </div>
        }
        caption="Sistema de publicaciones para Instagram, generado por código a partir de la identidad de la marca."
        bullets={[
          "Tienda online en Shopify con palas, pelotas y zapatillas de 11 marcas, entre ellas JOOLA, Wilson, K-Swiss y DropShot.",
          "Torneo en Vitoria-Gasteiz con 50 participantes y sesión de iniciación en India con 25 personas.",
          "Festival de pickleball en Plentzia en julio de 2026, con 6 pistas y material cedido por DropShot y ZCebra.",
          "Campaña de sesiones en centros educativos de Bizkaia y primeros contactos para abrir mercado en Seúl.",
        ]}
        tools={["Shopify", "Meta Ads", "SEO", "Python"]}
        link={{ href: "https://thepicklecenter.com", label: "Visitar la tienda" }}
      />
    ),
  },
  {
    category: "Cliente · Reformas y rehabilitación",
    title: "AN Reformas",
    src: "img/card-anreformas.webp",
    content: (
      <CaseDetail
        lead="Empresa de reformas, fachadas y trabajos verticales en Bizkaia. Rediseño de marca, web nueva y sistema de captación completo, desde el anuncio hasta la visita comercial."
        media={<Shot src="img/anreformas.webp" alt="Portada de la nueva web de AN Reformas" />}
        caption="Versión de trabajo. Las imágenes de muestra se sustituirán por obras reales antes de publicar."
        bullets={[
          "Rediseño de la identidad visual conservando el logotipo.",
          "Asistente de presupuesto a pantalla completa: 17 tipos de trabajo, precio calculado en directo por partidas y presupuesto descargable en PDF.",
          "Reserva de visita o de llamada desde el propio asistente. La solicitud llega al equipo comercial con toda la información.",
          "Medición de cada paso del proceso para atribuir cada cliente a su campaña.",
          "Campañas por línea de servicio y CRM adaptado a las fases de obra.",
        ]}
        tools={["HTML, CSS y JavaScript", "Meta Ads", "Supabase"]}
        status="En desarrollo."
      />
    ),
  },
  {
    category: "Cliente · Revenue management turístico",
    title: "Hosts Revenue",
    src: "img/card-crm.webp",
    position: "0% 50%",
    content: (
      <CaseDetail
        lead="Empresa de gestión de ingresos para alojamientos turísticos. Desarrollo de la web de captación y del CRM que utiliza el equipo a diario."
        media={<Shot src="img/hosts-crm.webp" alt="Panel de dirección del CRM de Hosts Revenue" />}
        caption="Modo demostración con datos de ejemplo."
        bullets={[
          "Asignación automática de cada nuevo contacto al comercial con menos carga, con la primera tarea programada en la franja que pidió el cliente.",
          "Vistas por rol: agenda del día, embudo, clientes, ciclo mensual y facturación.",
          "Panel de dirección privado para la gerencia, con ingresos recurrentes, cobros y coste por contacto.",
          "Permisos verificados rol a rol en la base de datos y altas del equipo mediante invitación.",
        ]}
        tools={["React", "Supabase", "Edge Functions"]}
      />
    ),
  },
  {
    category: "Consultoría · Inteligencia artificial",
    title: "Abra Innova",
    cover: <AbraCover />,
    content: (
      <CaseDetail
        lead="Primer cribado mundial de oportunidades en la economía azul para una consultora de Bizkaia que asesora a un gran inversor. Proyecto desarrollado con Nicolás Martínez Riego a través de Nitton."
        bullets={[
          "Búsqueda en el idioma de cada país líder (noruego, coreano, japonés o neerlandés) con prioridad a fuentes primarias: artículos, patentes, proyectos europeos y registros.",
          "Trazabilidad completa: cada dato conserva la cita exacta, la fecha y una copia de la fuente, y el sistema verifica que la cita existe.",
          "Búsqueda de control desde España para separar lo ya conocido de lo que aporta información nueva.",
          "Revisión manual de una muestra con tasa de error medida, y visor web con mapa y filtros.",
          "Curso práctico de inteligencia artificial en cinco sesiones para el equipo del cliente.",
        ]}
        tools={["Claude API", "Supabase", "Vercel"]}
        status="Entrega en noviembre de 2026."
      />
    ),
  },
  {
    category: "Producto · Servicios para el hogar",
    title: "Grem.io",
    src: "img/card-grem.webp",
    content: (
      <CaseDetail
        lead="Plataforma de reservas de fontanería, electricidad y limpieza en Bilbao y la costa, con precio cerrado y desglosado antes de reservar."
        media={<Shot src="img/grem.webp" alt="Portada de Grem.io" />}
        bullets={[
          "Catálogo de servicios con tarifa, desplazamiento, material, extras y suplementos por código postal.",
          "Reserva por franjas con capacidad limitada y cancelación hasta 24 horas antes.",
          "El servidor recalcula el precio antes de registrar cada reserva.",
          "Confirmación por correo electrónico y alta automática del evento en Google Calendar.",
        ]}
        tools={["HTML, CSS y JavaScript", "Supabase", "Resend"]}
        link={{ href: "https://grem-io.netlify.app", label: "Visitar Grem.io" }}
      />
    ),
  },
];

const others = [
  {
    title: "Konsultek",
    text: "Nació en 2024 como B-Digital Solutions, con Ander Martin: web, reservas online, SEO local y Kit Digital para pequeños comercios. Desde Seúl suma inteligencia comercial entre Corea del Sur y Europa, con una cartera de exportadores coreanos para una multinacional de certificación.",
    tag: "Desde 2024",
  },
  {
    title: "Strabe Motion",
    href: "https://vvsmelka.github.io/Strabe-App/",
    text: "Marketplace de plazas de garaje entre particulares en Gran Bilbao. Lista de espera, panel de datos y aplicación iOS en desarrollo.",
    tag: "En validación",
  },
  {
    title: "Torneo de fútbol 7 de Gorliz",
    text: "Organización completa durante una semana, tres categorías y aplicación de resultados en tiempo real.",
    tag: "Julio de 2026",
  },
  {
    title: "Gravity Systems",
    text: "Plan de negocio de un envase patentado que impide que las botellas de plástico se hundan en el mar. Dossier presentado a BBK ARIN, como director de operaciones.",
    tag: "Mayo de 2024",
  },
  {
    title: "ShareWay Carpool",
    text: "Coche compartido entre estudiantes de la UPV/EHU en Leioa: encuesta a estudiantes, plan de implantación con la universidad y prototipo de web.",
    tag: "Marzo de 2024",
  },
  {
    title: "Learning Path: gestión de equipos",
    href: "docs/learning-path-melkamu-gomez-cruzado.pdf",
    text: "Investigación sobre la relación entre la gestión de equipos y los resultados empresariales, a partir de Good to Great, Management Teams y un curso de edX.",
    tag: "Mayo de 2024",
  },
];

export function Projects() {
  return (
    <section id="proyectos" aria-labelledby="proyectos-t" className="relative border-t border-line py-24 md:py-36">
      <Marks />
      <Container>
        <SectionHeading
          id="proyectos-t"
          title="Proyectos"
          intro="Empresas que he cofundado y proyectos para clientes: el reto de partida, el trabajo realizado y el estado actual de cada uno."
        />
      </Container>

      <Carousel items={cards.map((card, i) => <Card key={card.title} card={card} index={i} />)} />

      <Container className="mt-20 md:mt-28">
        <BlurFade inView>
          <h3 className="text-xl font-semibold tracking-tight text-fg md:text-2xl">Otros proyectos</h3>
        </BlurFade>
        <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-2">
          {others.map((o, i) => (
            <BlurFade key={o.title} inView delay={0.05 * i} className="h-full">
              <div className="flex h-full flex-col gap-3 bg-ink-2 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  {o.href ? (
                    <a
                      href={o.href}
                      target="_blank"
                      rel="noopener"
                      className="group inline-flex items-center gap-1.5 text-lg font-semibold tracking-tight text-fg"
                    >
                      {o.title}
                      <ArrowUpRightIcon className="h-4 w-4 text-mute transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                    </a>
                  ) : (
                    <p className="text-lg font-semibold tracking-tight text-fg">{o.title}</p>
                  )}
                  <span className="shrink-0 rounded-md border border-line bg-ink px-2 py-0.5 font-mono text-[11px] text-mute">{o.tag}</span>
                </div>
                <p className="leading-relaxed text-mute">{o.text}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </Container>
    </section>
  );
}
