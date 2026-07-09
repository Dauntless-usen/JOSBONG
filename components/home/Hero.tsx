import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-navy max-w-3xl mx-auto">
          Research, AI, and data expertise for businesses and academia
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
          JosBong helps companies build with AI and data, and helps
          researchers and students move faster on rigorous, well-supported
          work.
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
