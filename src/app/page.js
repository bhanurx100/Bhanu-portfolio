import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";
import StarCanvas from "./components/StarCanvas";

export default function Home() {
  return (
    <main className="flex flex-col bg-transparent relative min-h-screen overflow-x-hidden">
      <StarCanvas />
      <Navbar />
      <div className="container mx-auto pt-4 lg:pt-8 relative z-10 flex-1 max-w-7xl">
        <div className="py-8 lg:py-12">
          <HeroSection />
        </div>
        <div className="py-8 lg:py-12">
          <AboutSection />
        </div>
        <div className="py-8 lg:py-12">
          <ProjectsSection />
        </div>
        <div className="py-8 lg:py-12">
          <EmailSection />
        </div>
      </div>
      <Footer />
    </main>
  );
}