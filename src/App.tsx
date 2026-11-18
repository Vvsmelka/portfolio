import { MotionConfig } from "motion/react";
import { Nav } from "@/sections/Nav";
import { Hero, Logos } from "@/sections/Hero";
import { Projects } from "@/sections/Projects";
import { Words } from "@/sections/Words";
import { Capabilities } from "@/sections/Capabilities";
import { Journey } from "@/sections/Journey";
import { Profile } from "@/sections/Profile";
import { Contact, Footer } from "@/sections/Contact";
import { Frame } from "@/components/site/bits";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#proyectos"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-fg focus:px-4 focus:py-2 focus:text-ink"
      >
        Saltar al contenido
      </a>
      <Frame />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Logos />
        <Words />
        <Projects />
        <Capabilities />
        <Journey />
        <Profile />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
