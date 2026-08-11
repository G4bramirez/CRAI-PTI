import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import HowItWorks from "@/components/HowItWorks";
import Differentials from "@/components/Differentials";
import PricingSection from "@/components/PricingSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <Hero />
        <TrustBar />
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <Differentials />
        <PricingSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
