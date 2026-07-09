import type { Service } from "#velite";
import Button from "@/components/ui/Button";
import MDXContent from "@/components/mdx/MDXContent";

type ServiceTemplateProps = {
  service: Service;
};

export default function ServiceTemplate({ service }: ServiceTemplateProps) {
  return (
    <>
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-navy">{service.title}</h1>
          <p className="mt-6 text-lg text-gray-600">{service.summary}</p>
          <div className="mt-10">
            <Button href="/quote">Request a Quote</Button>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-navy">Deliverables</h2>
            <ul className="mt-4 space-y-3">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2 text-gray-600">
                  <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-navy">Our Process</h2>
            <ol className="mt-4 space-y-4">
              {service.processSteps.map((step, index) => (
                <li key={step} className="flex items-start gap-3 text-gray-600">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <MDXContent code={service.content} />
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
