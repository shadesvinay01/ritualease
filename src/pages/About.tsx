import { Navbar } from "@/components/ritual/Navbar";
import { Footer } from "@/components/ritual/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

const VALUES = [
  { icon: Heart, title: "Made with love", text: "Every celebration is treated like our own — with care, intention and warmth." },
  { icon: Sparkles, title: "Effortless for you", text: "We handle setup, execution and cleanup. You just show up and enjoy." },
  { icon: ShieldCheck, title: "Trusted vendors", text: "Verified pandits, decorators, chefs and entertainers — vetted by us." },
  { icon: Users, title: "1000+ families", text: "From birthdays to pujas, families across Delhi NCR celebrate with us." },
];

const About = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="bg-cream/40 border-b border-border/60">
      <div className="container mx-auto px-4 py-14 md:py-20 max-w-4xl">
        <p className="text-sm uppercase tracking-[0.2em] text-rose font-semibold mb-3">About RitualEase</p>
        <h1 className="font-display text-4xl md:text-5xl mb-5">Celebrations, made effortless.</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          RitualEase began with a simple belief — that the most meaningful moments in our lives should be
          enjoyed, not stressed over. From a child's first birthday to a Satyanarayan Puja for a new home,
          we bring everything together so families can be fully present.
        </p>
      </div>
    </section>

    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl mb-10 text-center">What we stand for</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {VALUES.map(v => (
            <div key={v.title} className="p-6 rounded-2xl bg-card border border-border shadow-soft">
              <div className="w-11 h-11 rounded-xl bg-rose/10 text-rose flex items-center justify-center mb-4">
                <v.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-12 md:py-16 bg-cream/40 border-t border-border/60">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h2 className="font-display text-2xl md:text-3xl mb-4">Ready to plan your moment?</h2>
        <p className="text-muted-foreground mb-6">We'll handle the rest.</p>
        <Button variant="hero" size="lg" asChild><Link to="/book">Plan My Celebration</Link></Button>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;