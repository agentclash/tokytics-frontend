"use client";
import { useState, useEffect } from "react";
import { ParticleCanvas } from "@/components/cinematic/ParticleCanvas";
import { FilmGrain } from "@/components/cinematic/FilmGrain";
import { StickyNav } from "@/components/cinematic/StickyNav";
import { ScrollProgress } from "@/components/cinematic/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { FeaturesBento } from "@/components/sections/FeaturesBento";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Quickstart } from "@/components/sections/Quickstart";
import { Security } from "@/components/sections/Security";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { SectionWipe } from "@/components/ui/SectionWipe";

export default function Page() {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: dark ? "#0b0b0f" : "#fafbfe", minHeight: "100vh", transition: "background 0.4s" }}>
      <ParticleCanvas dark={dark} />
      <FilmGrain dark={dark} />
      <StickyNav dark={dark} setDark={setDark} scrolled={scrolled} />
      <ScrollProgress dark={dark} />

      <Hero dark={dark} setDark={setDark} />
      <div key={dark ? "d" : "l"}>
        <SectionWipe dark={dark}><FeaturesBento dark={dark} /></SectionWipe>
      </div>
      <HowItWorks key={dark ? "hw-d" : "hw-l"} dark={dark} />
      <SectionWipe dark={dark}><Quickstart key={dark ? "qs-d" : "qs-l"} dark={dark} /></SectionWipe>
      <Security key={dark ? "sc-d" : "sc-l"} dark={dark} />
      <CTA key={dark ? "ct-d" : "ct-l"} dark={dark} />
      <Footer key={dark ? "ft-d" : "ft-l"} dark={dark} />
    </div>
  );
}
