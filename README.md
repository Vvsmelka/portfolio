# Melkamu Gomez-Cruzado · Portfolio

Web personal: proyectos, servicios, trayectoria y contacto.

**En línea:** https://vvsmelka.github.io/portfolio/

## Stack

React 19, Vite, TypeScript y Tailwind CSS 4. Componentes de [Aceternity UI](https://ui.aceternity.com) y [Magic UI](https://magicui.design) instalados con la CLI de shadcn y adaptados al diseño de la web. Iconos de Phosphor. Tipografías Geist y Geist Mono, alojadas en el propio proyecto.

## Trabajar en local

    npm install
    npm run dev

## Publicar

    npm run build

El contenido de `dist/` se publica en la rama `gh-pages`. Las rutas son relativas, así que funciona en cualquier subcarpeta.

## Estructura

| Qué | Dónde |
|---|---|
| Colores y tipografía | `src/index.css` (bloque `@theme`) |
| Portada, fotos de fondo y logos | `src/sections/Hero.tsx` |
| Proyectos y fichas | `src/sections/Projects.tsx` |
| Servicios y herramientas | `src/sections/Capabilities.tsx` |
| Trayectoria | `src/sections/Journey.tsx` |
| Perfil | `src/sections/Profile.tsx` |
| Contacto | `src/sections/Contact.tsx` |

## Imágenes

Las fotos de Bilbao y Seúl son propias. Las capturas corresponden a proyectos propios y de clientes; las del CRM usan datos de demostración. Logos de Simple Icons para las herramientas.
