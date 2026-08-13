import { AboutSection } from "./components/AboutSection";
import { ContactFooter } from "./components/ContactFooter";
import { FeaturedVideoSection } from "./components/FeaturedVideoSection";
import { HeroSection } from "./components/HeroSection";
import { PhilosophySection } from "./components/PhilosophySection";
import { ServicesSection } from "./components/ServicesSection";

export default function App() {
  return (
    <main className="bg-black text-white">
      <HeroSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
      <ContactFooter />
    </main>
  );
}
