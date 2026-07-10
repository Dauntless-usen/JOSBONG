import type { Service } from "@/lib/services";
import Button from "@/components/ui/Button";

type SimpleServiceTemplateProps = {
  service: Service;
};

export default function SimpleServiceTemplate({ service }: SimpleServiceTemplateProps) {
  return (
    <>
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <service.icon className="mx-auto text-orange" size={40} />
          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-navy">{service.title}</h1>
          <p className="mt-6 text-lg text-gray-600">{service.description}</p>
          <div className="mt-10">
            <Button href="/quote">Request a Quote</Button>
          </div>
        </div>
      </section>

      <section className="bg-navy">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white">Ready to get started?</h2>
          <p className="mt-3 text-gray-400">
            Tell us about your project and we&apos;ll follow up with next steps.
          </p>
          <div className="mt-8">
            <Button href="/quote">Request a Quote</Button>
          </div>
        </div>
      </section>
    </>
  );
}
