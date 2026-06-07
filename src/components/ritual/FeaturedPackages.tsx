import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { PACKAGES } from "@/data/booking";

const FEATURED_IDS = ["kids-premium", "anniv-couple", "satyanarayan", "bach-premium", "rudrabhishek", "grah-pravesh"];
const TAGS: Record<string, string> = {
  "kids-premium": "Most loved",
  "anniv-couple": "Romantic",
  "satyanarayan": "Spiritual",
  "bach-premium": "Trending",
  "rudrabhishek": "Sacred",
  "grah-pravesh": "Premium",
};

export const FeaturedPackages = () => {
  const list = FEATURED_IDS.map(id => PACKAGES.find(p => p.id === id)!).filter(Boolean);

  return (
    <section className="py-20 md:py-28 bg-cream" id="featured">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-rose font-semibold mb-3">Featured packages</p>
            <h2 className="font-display text-3xl md:text-5xl">Ready to book. Loved by everyone.</h2>
          </div>
          <Button variant="ghost" className="text-rose font-semibold w-fit" asChild>
            <Link to="/book">View all packages →</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p) => (
            <Link
              key={p.id}
              to={`/package/${p.id}`}
              className="group bg-card rounded-3xl overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-[5/4] overflow-hidden">
                <img src={p.cover} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" width={1000} height={800} />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-gold text-maroon text-xs font-bold uppercase tracking-wide shadow-gold">
                  {TAGS[p.id] ?? p.category}
                </span>
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-cream/95 backdrop-blur text-xs font-bold inline-flex items-center gap-1">
                  <Star className="h-3 w-3 fill-gold text-gold" /> {p.rating}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display text-2xl mb-3 group-hover:text-rose transition-colors">{p.title}</h3>
                <ul className="space-y-2 mb-5 flex-1">
                  {p.bullets.slice(0, 4).map(b => (
                    <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-rose mt-0.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Starting from</p>
                    <p className="font-display text-2xl text-rose font-bold">
                      ₹{p.price.toLocaleString("en-IN")}
                      {p.strikePrice && <span className="text-sm text-muted-foreground line-through font-sans font-normal ml-1">₹{p.strikePrice.toLocaleString("en-IN")}</span>}
                    </p>
                  </div>
                </div>
                <Button variant="hero" className="w-full pointer-events-none">View Details</Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
