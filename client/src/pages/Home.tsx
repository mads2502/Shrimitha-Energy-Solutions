import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import Projects from "@/components/home/Projects";
import Stats from "@/components/home/Stats";
import Collaborations from "@/components/home/Collaborations";
import Workshops from "@/components/home/Workshops";
import Newsletter from "@/components/home/Newsletter";
import InternshipForm from "@/components/home/InternshipForm";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Srimitha Energy Solutions - Innovative Electrical Engineering Services</title>
        <meta name="description" content="Srimitha Energy Solutions offers cutting-edge electrical engineering services including renewable energy, smart grid technologies, and energy efficiency solutions." />
      </Helmet>
      
      <Hero />
      <Services />
      <About />
      <Stats />
      <Projects />
      <Workshops />
      <Collaborations />
      <InternshipForm />
      <Newsletter />
    </>
  );
}
