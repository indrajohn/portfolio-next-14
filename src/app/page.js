import AboutMePage from "@/components/about-me";
import ContactPage from "@/components/contact";
import GoToTopButton from "@/components/go-to-top-button";
import Hero from "@/components/hero";
import PortfolioPage from "@/components/latest-project";
import NavBar from "@/components/navbar";
import Timeline from "@/components/timeline";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <AboutMePage />
      <Timeline />
      <PortfolioPage />
      <ContactPage />
      <GoToTopButton />
    </main>
  );
}
