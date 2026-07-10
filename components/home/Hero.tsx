import Button from "@/components/ui/Button";
import HeroTypewriter from "@/components/home/HeroTypewriter";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 md:pt-16 md:pb-32 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-navy">
          JosBong Solutions
        </h1>
        <h3 className="mt-4 md:mt-6 text-xl md:text-2xl font-semibold italic text-navy max-w-3xl mx-auto">
          We help you with <HeroTypewriter />
        </h3>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          JosBong supports the full journey from Ideation to Delivery - Research, Analysis, Consultancy, and AI, for Businesses and Academics alike.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/quote">Request a Quote</Button>
          <Button href="/services" variant="secondary">
            Explore Services
          </Button>
        </div>
      </div>
    </section>
  );
}