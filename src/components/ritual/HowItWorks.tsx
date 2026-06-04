import { Sparkles, Package, Plus, PartyPopper } from "lucide-react";

const steps = [
  { icon: Sparkles, title: "Choose your celebration", desc: "Pick from parties, pujas or custom add-ons." },
  { icon: Package, title: "Select a package", desc: "Transparent pricing. Everything included." },
  { icon: Plus, title: "Customize with add-ons", desc: "DJ, magic show, decor — make it yours." },
  { icon: PartyPopper, title: "Sit back & enjoy", desc: "We arrive, set up and clean up. You celebrate." },
];

export const HowItWorks = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-sm uppercase tracking-[0.2em] text-rose font-semibold mb-3">How it works</p>
        <h2 className="font-display text-3xl md:text-5xl">Effortless, in 4 simple steps</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <div key={s.title} className="relative bg-cream rounded-2xl p-7 text-center shadow-soft hover:shadow-elegant transition-all">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-rose text-cream font-bold text-sm flex items-center justify-center shadow-elegant">
              {i + 1}
            </div>
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
              <s.icon className="h-7 w-7 text-maroon" />
            </div>
            <h3 className="font-display text-xl mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
