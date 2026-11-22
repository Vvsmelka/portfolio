import { BlurFade } from "@/components/ui/blur-fade";
import { Container, Marks } from "@/components/site/bits";
import { SectionIntro } from "@/components/site/kinetic";

// Todo lo que alguien quiere saber de un vistazo, sin tener que deducirlo.
const facts = [
  ["Edad", "21 años"],
  ["Base", "Bilbao, Bizkaia · nacido en Valladolid"],
  ["Formación", "LEINN, Mondragon Unibertsitatea · 4.º curso (2023–2027)"],
  ["Estancias", "Seúl (Living Lab, 2026) · Nueva York (2025) · India"],
  ["Nitton", "Team Leader, Customer Leader y Digital Leader"],
  ["Cofundador", "The Pickle Center"],
  ["Idiomas", "Castellano e inglés"],
];

// Lo que está en marcha ahora mismo (noviembre de 2026).
const now = [
  { name: "Abra Innova", what: "Cribado con IA de la economía azul", tag: "Entrega en noviembre" },
  { name: "AN Reformas", what: "Web nueva y sistema de captación", tag: "En desarrollo" },
  { name: "The Pickle Center", what: "Sesiones en centros educativos de Bizkaia", tag: "En marcha" },
];

const interests = ["Pickleball", "Balonmano", "Viajar", "Corea del Sur", "Leer"];

export function Profile() {
  return (
    <section id="perfil" aria-labelledby="perfil-t" className="relative border-t border-line py-24 md:py-36">
      <Marks />
      <Container>
        <SectionIntro index="01" label="Sobre mí" aside="21 años · Bilbao" title="Sobre mí" id="perfil-t" max={230} />
      </Container>
      <Container className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <BlurFade inView className="min-w-0">
          <div className="grid gap-5 text-lg leading-relaxed text-mute">
            <p>
              <span className="text-fg">Soy Melkamu Gomez-Cruzado, tengo 21 años y vivo en Bilbao.</span> Estoy en el
              último curso de LEINN, el grado de Liderazgo, Emprendimiento e Innovación de Mondragon Unibertsitatea.
            </p>
            <p>
              Desde el primer curso aprendo con proyectos reales: he cofundado The Pickle Center, lo he llevado a India,
              Nueva York y Seúl, y hoy llevo proyectos de ecommerce, captación de clientes e inteligencia artificial para
              empresas de Bizkaia.
            </p>
            <p>
              Donde más aporto es abriendo mercado: poner en marcha un proyecto, conseguir los primeros clientes y crear
              relaciones con marcas, clubes y socios, aquí o fuera.
            </p>
          </div>
          <div className="mt-8">
            <p className="mb-3 font-mono text-xs tracking-[0.12em] text-mute uppercase">Intereses</p>
            <ul className="flex flex-wrap gap-2">
              {interests.map((i) => (
                <li key={i} className="rounded-md border border-line bg-ink-2 px-3 py-1.5 text-sm text-fg">
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </BlurFade>

        <BlurFade inView delay={0.08} className="min-w-0">
          <div className="grid gap-3">
            <dl className="overflow-hidden rounded-xl border border-line bg-ink-2">
              {facts.map(([k, v], i) => (
                <div
                  key={k}
                  className={
                    "grid grid-cols-[6.5rem_1fr] gap-4 px-5 py-3.5 text-sm md:grid-cols-[7.5rem_1fr]" +
                    (i ? " border-t border-line" : "")
                  }
                >
                  <dt className="font-mono text-xs tracking-[0.1em] text-mute uppercase">{k}</dt>
                  <dd className="text-fg">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="rounded-xl border border-line bg-ink-2 p-4 md:p-5">
              <div className="mb-3 flex items-center justify-between font-mono text-[11px] tracking-[0.12em] text-mute uppercase">
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Ahora
                </span>
                <span>Nov 2026</span>
              </div>
              <ul className="divide-y divide-line">
                {now.map((n) => (
                  <li key={n.name} className="flex items-center justify-between gap-4 py-2.5">
                    <div className="min-w-0">
                      <p className="text-[15px] font-medium text-fg">{n.name}</p>
                      <p className="truncate text-sm text-mute">{n.what}</p>
                    </div>
                    <span className="hidden shrink-0 rounded-md border border-line bg-ink px-2 py-1 font-mono text-[11px] text-mute sm:inline">
                      {n.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </BlurFade>
      </Container>
    </section>
  );
}
