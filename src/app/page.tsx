import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";
import PortfolioSection from "@/components/home/PortfolioSection";
import VideoSection from "@/components/home/VideoSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactFormSection from "@/components/home/ContactFormSection";
import ContactInfoSection from "@/components/home/ContactInfoSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <PortfolioSection />
      <VideoSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactFormSection />
      <ContactInfoSection />
    </>
  );
}
