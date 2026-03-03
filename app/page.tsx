import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import GetStartedSection from "@/components/GetStartedSection";
import PricingSection from "@/components/PricingSection";
import StatsSection from "@/components/StatsSection";
import PartnersSection from "@/components/PartnersSection";
import CEOMessageSection from "@/components/CEOMessageSection";
import LatestNewsSection from "@/components/LatestNewsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <GetStartedSection />
      <CEOMessageSection />
      <PricingSection />
      <PartnersSection />
      <LatestNewsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
