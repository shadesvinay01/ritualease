import { Link, useParams } from "react-router-dom";
import { PACKAGES } from "@/data/booking";
import { Navbar } from "@/components/ritual/Navbar";
import { Footer } from "@/components/ritual/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock, Star, Users } from "lucide-react";
import { AlaCarteView } from "@/components/alacarte/AlaCarteView";

const CATEGORY_META: Record<string, { label: "Parties" | "Pujas" | "Ala-Carte"; emoji: string; tagline: string }> = {
  parties: { label: "Parties", emoji: "🎈", tagline: "Birthdays, anniversaries, bachelorettes & more" },
  pujas: { label: "Pujas", emoji: "🪔", tagline: "Sacred ceremonies, every detail handled" },
  alacarte: { label: "Ala-Carte", emoji: "🎁", tagline: "Pick exactly what you need" },
};

const Category = () => {
  const { slug } = useParams();
  const meta = slug ? CATEGORY_META[slug] : undefined;

  if (!meta) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-4xl mb-4">Category not found</h1>
          <Button variant="hero" asChild><Link to="/">Back home</Link></Button>
        </div>
      </div>
    );
  }

  const packages = PACKAGES.filter(p => p.category === meta.label);
  const isAlaCarte = slug === "alacarte";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-cream/40 border-b border-border/60">
        <div className="container mx-auto px-4 py-10 md:py-14">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-rose mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to home
          </Link>
          <div className="flex items-end gap-4">
            <span className="text-5xl md:text-6xl">{meta.emoji}</span>
            <div>
              <h1 className="font-display text-4xl md:text-5xl text-foreground">{meta.label}</h1>
              <p className="text-muted-foreground mt-2 text-base md:text-lg">{meta.tagline}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {isAlaCarte ? (
            <AlaCarteView />
          ) : packages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-6">Offerings coming soon for this category.</p>
              <Button variant="hero" asChild><Link to="/">Explore other categories</Link></Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {packages.map(p => (
                <Link
                  key={p.id}
                  to={`/package/${p.id}`}
                  className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.cover} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span className="inline-flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-gold text-gold" /> {p.rating} ({p.reviewCount})</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {p.guests}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {p.duration}</span>
                    </div>
                    <h3 className="font-display text-2xl text-foreground mb-1">{p.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{p.tagline}</p>
                    <ul className="text-sm text-foreground/80 space-y-1 mb-5">
                      {p.bullets.slice(0, 3).map(b => <li key={b}>• {b}</li>)}
                    </ul>
                    <div className="mt-auto flex items-end justify-between">
                      <div>
                        {p.strikePrice && (
                          <span className="text-sm text-muted-foreground line-through mr-2">₹{p.strikePrice.toLocaleString()}</span>
                        )}
                        <span className="font-display text-2xl text-rose">₹{p.price.toLocaleString()}</span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-rose font-semibold text-sm group-hover:gap-2 transition-all">
                        View <ArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Category;