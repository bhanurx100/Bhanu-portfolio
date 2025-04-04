import HeroSection from "./components/HeroSection";
import Navbar from "./components/Navbar";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import EmailSection from "./components/EmailSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-transparent">
      <Navbar />
      <div className="container mx-auto">
        <div className="py-24 lg:py-8">
          <HeroSection />
        </div>
        <div className="py-2 lg:py-8">
          <AboutSection />
        </div>
        <div className="py-2 lg:py-4">
          <ProjectsSection />
        </div>
        <div className="py-8 lg:py-16">
          <EmailSection />
        </div>
      </div>
      <Footer />
    </main>
  );
}