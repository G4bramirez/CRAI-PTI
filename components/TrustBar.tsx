export default function TrustBar() {
  const stats = [
    { value: "85%", label: "Taxa de recuperação" },
    { value: "7x", label: "ROI Médio" },
    { value: "< 48h", label: "Para integrar" },
    { value: "Zero", label: "Custo fixo — Success Fee" },
  ];

  return (
    <section className="bg-surface-container-low py-xl">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-lg items-center text-center mb-lg">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-xs">
              <p className="font-sora text-headline-md text-primary">
                {stat.value}
              </p>
              <p className="font-inter font-label-sm text-label-sm text-on-surface-variant uppercase tracking-tighter">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="font-inter font-label-sm text-label-sm text-on-surface-variant">
            Projeções baseadas em benchmarks de mercado e modelagem interna
          </p>
        </div>
      </div>
    </section>
  );
}
