import Hero from "@/components/home/Hero";
import AudienceSplit from "@/components/home/AudienceSplit";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedWork from "@/components/home/FeaturedWork";
import TrustStrip from "@/components/home/TrustStrip";

export default function Home() {
  return (
    <>
      <Hero />
      <AudienceSplit />
      <ServicesPreview />
      <FeaturedWork />
      <TrustStrip />
    </>
  );
}
