import Navbar from "../components/Commond/NavBar";
import Footer from "../components/Commond/Footer";
import Hero from "../components/LandingPage/Hero";
import HowItWorks from "../components/LandingPage/HowItWorks";
import Features from "../components/LandingPage/Features";
import SeccionCTA from "../components/LandingPage/CTASection";
import PNGTuberWidget from "../components/Pngtuber/PNGTuberWidget";

const LandingPage = () => {

  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <SeccionCTA />
      <Footer />
      <PNGTuberWidget />
    </>
  );
};

export default LandingPage;
