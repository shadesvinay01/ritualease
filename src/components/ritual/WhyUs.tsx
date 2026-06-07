import { ShieldCheck, Tag, Home, Heart, BadgeCheck } from "lucide-react";

const items = [
  { icon: BadgeCheck, title: "End-to-end service", desc: "Setup, execution, cleanup — all handled." },
  { icon: ShieldCheck, title: "Verified vendors", desc: "Background-checked professionals only." },
  { icon: Tag, title: "Transparent pricing", desc: "No hidden costs. What you see is what you pay." },
  { icon: Heart, title: "Stress-free experience", desc: "Be a guest at your own celebration." },
  { icon: Home, title: "At-home convenience", desc: "Skip the venue. Celebrate where it matters." },
];

export const WhyUs = () => (
  <section className="py-20 md:py-28 bg-background text-foreground relative overflow-hidden">
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--gold))_0%,transparent_50%),radial-gradient(circle_at_80%_80%,hsl(var(--rose))_0%,transparent_50%)] pointer-events-none" />
    
    {/* Ornate mandala hint in background */}
    <div className="absolute -top-40 -right-40 w-96 h-96 border-[40px] border-white/5 rounded-full blur-sm pointer-events-none" />
    <div className="absolute -bottom-40 -left-40 w-96 h-96 border-[40px] border-white/5 rounded-full blur-sm pointer-events-none" />

    <div className="container mx-auto px-4 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-sm uppercase tracking-[0.2em] text-gold font-semibold mb-3">Why RitualEase</p>
        <h2 className="font-display text-3xl md:text-5xl text-foreground">Built for the way India celebrates</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {items.map(i => (
          <div key={i.title} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 hover:shadow-gold/10 hover:border-gold/30">
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-gold flex items-center justify-center shadow-lg shadow-gold/20">
              <i.icon className="h-6 w-6 text-maroon" />
            </div>
            <h3 className="font-display text-lg mb-2 text-foreground/90">{i.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{i.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
