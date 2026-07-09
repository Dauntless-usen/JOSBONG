const stats = [
  { value: "50+", label: "Projects delivered" },
  { value: "20+", label: "Academic partners" },
  { value: "15+", label: "Industries served" },
  { value: "98%", label: "Client satisfaction" },
];

export default function TrustStrip() {
  return (
    <section className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat) => (
          <div key={stat.label}>
            <div className="text-3xl md:text-4xl font-bold text-orange">{stat.value}</div>
            <div className="mt-2 text-sm text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
