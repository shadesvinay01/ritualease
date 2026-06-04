import { Link } from "react-router-dom";
import parties from "@/assets/cat-parties.jpg";
import pujas from "@/assets/cat-pujas.jpg";
import alacarte from "@/assets/cat-alacarte.jpg";
import { ArrowRight } from "lucide-react";

const cats = [
  { id: "parties", title: "Parties", emoji: "🎈", img: parties, items: ["Kids Birthday", "Anniversary", "Bachelorette", "Friends Gathering"] },
  { id: "pujas", title: "Pujas", emoji: "🪔", img: pujas, items: ["Satyanarayan Katha", "Rudrabhishek", "Grah Pravesh", "Nav Shanti"] },
  { id: "alacarte", title: "Ala-Carte", emoji: "🎁", img: alacarte, items: ["Decorations", "Entertainment", "Catering", "Kids Activities"] },
];

export const Categories = () => (
  <section className="py-20 md:py-28 bg-background" id="parties">
    <div className="container mx-auto px-4">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-sm uppercase tracking-[0.2em] text-rose font-semibold mb-3">What we curate</p>
        <h2 className="font-display text-3xl md:text-5xl text-foreground mb-4">Pick your moment, we'll do the rest</h2>
        <p className="text-muted-foreground text-lg">Three pillars. Endless ways to celebrate at home.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {cats.map((c) => (
          <Link key={c.id} to={`/category/${c.id}`} className="group relative overflow-hidden rounded-3xl shadow-soft hover:shadow-elegant transition-all duration-500 cursor-pointer">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" width={900} height={1100} />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/95 via-maroon/40 to-transparent" />
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-cream">
              <span className="text-3xl mb-2">{c.emoji}</span>
              <h3 className="font-display text-3xl md:text-4xl mb-3">{c.title}</h3>
              <ul className="space-y-1 mb-5 text-cream/85 text-sm">
                {c.items.map(i => <li key={i}>• {i}</li>)}
              </ul>
              <span className="inline-flex items-center gap-2 text-gold font-semibold group-hover:gap-3 transition-all">
                Explore <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
