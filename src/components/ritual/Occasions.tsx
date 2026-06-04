import { useEffect, useState } from "react";
import puja from "@/assets/pkg-puja.jpg";
import kids from "@/assets/pkg-kids-party.jpg";
import anniv from "@/assets/pkg-anniversary.jpg";
import friends from "@/assets/occ-houseparty-friends.jpg";
import festive from "@/assets/occ-festive.jpg";
import house from "@/assets/occ-houseparty-mixed.jpg";

type Slide = { img: string; title: string; count: string; tone: string };

const SLIDES: Slide[] = [
  { img: puja,    title: "Festive Pujas",            count: "10 packages", tone: "Sacred & serene" },
  { img: kids,    title: "Kids Birthday Magic",      count: "12 packages", tone: "Playful & joyful" },
  { img: anniv,   title: "Anniversary for Two",      count: "8 packages",  tone: "Romantic & intimate" },
  { img: friends, title: "Friends Chilling at Home", count: "6 packages",  tone: "Easy & vibey" },
  { img: festive, title: "Festive Gatherings",       count: "9 packages",  tone: "Warm & celebratory" },
  { img: house,   title: "House Parties",            count: "6 packages",  tone: "Loud & lively" },
];

const ROTATE_MS = 3500;

export const Occasions = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex(i => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  const active = SLIDES[index];

  return (
    <section className="py-20 md:py-28 bg-background" id="pujas" aria-label="Browse by occasion">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <p className="text-sm uppercase tracking-[0.2em] text-rose font-semibold mb-3">Browse by occasion</p>
          <h2 className="font-display text-3xl md:text-5xl">Find inspiration for your moment</h2>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Cross-fading image stack */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-elegant">
            {SLIDES.map((s, i) => (
              <img
                key={s.title}
                src={s.img}
                alt={s.title}
                width={1600}
                height={900}
                loading={i === 0 ? "eager" : "lazy"}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
                  i === index ? "opacity-100 scale-105" : "opacity-0"
                }`}
                style={{ transitionProperty: "opacity, transform" }}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 via-maroon/30 to-transparent" />

            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-cream">
              <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-gold mb-2">{active.tone}</p>
              <h3 className="font-display text-2xl md:text-4xl mb-1">{active.title}</h3>
              <p className="text-sm md:text-base text-cream/80">{active.count}</p>
            </div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {SLIDES.map((s, i) => (
              <button
                key={s.title}
                aria-label={`Show ${s.title}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-rose" : "w-2 bg-border hover:bg-rose/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
