import { ShieldCheck, Tag, Home, Heart, BadgeCheck } from "lucide-react";

const items = [
  { icon: BadgeCheck, title: "End-to-end service", desc: "Setup, execution, cleanup — all handled." },
  { icon: ShieldCheck, title: "Verified vendors", desc: "Background-checked professionals only." },
  { icon: Tag, title: "Transparent pricing", desc: "No hidden costs. What you see is what you pay." },
  { icon: Heart, title: "Stress-free experience", desc: "Be a guest at your own celebration." },
  { icon: Home, title: "At-home convenience", desc: "Skip the venue. Celebrate where it matters." },
];

export const WhyUs = () => (
  <section className="py-20 md:py-28 bg-maroon text-cream relative overflow-hidden">
    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--gold))_0%,transparent_50%),radial-gradient(circle_at_80%_80%,hsl(var(--rose))_0%,transparent_50%)]" />
    <div className="container mx-auto px-4 relative">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-sm uppercase tracking-[0.2em] text-gold font-semibold mb-3">Why RitualEase</p>
        <h2 className="font-display text-3xl md:text-5xl">Built for the way India celebrates</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {items.map(i => (
          <div key={i.title} className="bg-cream/5 backdrop-blur border border-cream/10 rounded-2xl p-6 hover:bg-cream/10 transition">
            <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-gold flex items-center justify-center">
              <i.icon className="h-6 w-6 text-maroon" />
            </div>
            <h3 className="font-display text-lg mb-2">{i.title}</h3>
            <p className="text-sm text-cream/70">{i.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
