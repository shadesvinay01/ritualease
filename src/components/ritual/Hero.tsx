import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import hero from "@/assets/hero-celebration-premium.png";
import puja from "@/assets/pkg-puja.jpg";
import kids from "@/assets/pkg-kids-party.jpg";
import anniv from "@/assets/pkg-anniversary.jpg";
import friends from "@/assets/occ-houseparty-friends.jpg";

const SLIDES: { src: string; alt: string }[] = [
  { src: hero,    alt: "Indian family celebrating at home" },
  { src: puja,    alt: "Sacred puja ceremony at home" },
  { src: kids,    alt: "Kids birthday celebration" },
  { src: anniv,   alt: "Couple celebrating their anniversary" },
  { src: friends, alt: "Friends sitting together and chilling" },
];

const ROTATE_MS = 2500;

export const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex(i => (i + 1) % SLIDES.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        {SLIDES.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-maroon/30 via-maroon/40 to-maroon/85" />
      </div>

    <div className="relative container mx-auto px-4 py-24 md:py-36 lg:py-44">
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream/15 backdrop-blur border border-gold/40 text-cream text-xs md:text-sm font-medium mb-6">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span>Trusted by 1000+ families across India</span>
        </div>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream leading-[1.05] mb-6">
          Perfect celebrations.{" "}
          <span className="text-gold italic">Delivered at home.</span>
        </h1>

        <p className="text-lg md:text-xl text-cream/85 mb-10 max-w-2xl leading-relaxed">
          From birthdays to pujas — we handle everything, so you just enjoy the moment.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20 md:mb-10">
          <Button variant="hero" size="xl" className="shadow-lg shadow-gold/20" asChild><a href="#featured">Explore Packages</a></Button>
          <Button variant="outlineLight" size="xl" asChild><a href="/book">Plan My Celebration</a></Button>
        </div>
      </div>
    </div>

    {/* The Premium Floating Booking Bar */}
    <div className="absolute bottom-0 left-0 w-full translate-y-1/2 px-4 z-20 hidden md:block">
      <div className="mx-auto max-w-4xl bg-white rounded-full shadow-2xl p-2 pl-8 flex items-center justify-between border border-border/50">
        <div className="flex items-center gap-8 divide-x divide-border/40 w-full">
          {/* Occasion */}
          <div className="flex flex-col justify-center py-2 flex-1 group cursor-pointer">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-rose transition-colors">Occasion</span>
            <span className="text-foreground font-semibold text-sm truncate">What are we celebrating?</span>
          </div>
          
          {/* Location */}
          <div className="flex flex-col justify-center py-2 pl-8 flex-1 group cursor-pointer">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-rose transition-colors">Location</span>
            <span className="text-foreground font-semibold text-sm truncate">Delhi NCR</span>
          </div>

          {/* Date */}
          <div className="flex flex-col justify-center py-2 pl-8 flex-1 group cursor-pointer">
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-rose transition-colors">Date</span>
            <span className="text-foreground font-semibold text-sm truncate">Add dates</span>
          </div>
        </div>

        {/* Search Button */}
        <Button variant="hero" className="rounded-full h-14 px-8 ml-4 shrink-0 shadow-lg hover:shadow-gold/30 hover:scale-105 transition-all" asChild>
          <a href="/book">
            <Star className="w-4 h-4 mr-2 fill-current" />
            Find Packages
          </a>
        </Button>
      </div>
    </div>
    
    {/* Bottom Padding spacer for the floating bar */}
    <div className="h-12 md:h-20 bg-transparent hidden md:block" />
    </section>
  );
};
