import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { PACKAGES, ADDONS, SUGGESTED_ADDONS } from "@/data/booking";
import { Navbar } from "@/components/ritual/Navbar";
import { Footer } from "@/components/ritual/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  ArrowLeft, ArrowRight, Check, Clock, MapPin, MessageCircle, ShieldCheck, Sparkles, Star, Tag, Users, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = PACKAGES.find(p => p.id === id);
  const [activeImg, setActiveImg] = useState(0);

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="font-display text-4xl mb-4">Package not found</h1>
          <Button variant="hero" asChild><Link to="/">Back home</Link></Button>
        </div>
      </div>
    );
  }

  const suggestedIds = SUGGESTED_ADDONS[pkg.category] ?? [];
  const suggested = ADDONS.filter(a => suggestedIds.includes(a.id));
  const related = PACKAGES.filter(p => p.category === pkg.category && p.id !== pkg.id).slice(0, 3);
  const discount = pkg.strikePrice ? pkg.strikePrice - pkg.price : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <div className="border-b border-border/60 bg-cream/40">
        <div className="container mx-auto px-4 py-3 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-rose">Home</Link>
          <span className="text-muted-foreground mx-2">/</span>
          <span className="text-muted-foreground">{pkg.category}</span>
          <span className="text-muted-foreground mx-2">/</span>
          <span className="font-medium text-foreground">{pkg.title}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-muted shadow-elegant mb-3">
              <img
                src={pkg.gallery[activeImg]}
                alt={`${pkg.title} ${activeImg + 1}`}
                className="w-full h-full object-cover"
                width={1000} height={800}
              />
            </div>
            {pkg.gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {pkg.gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={cn(
                      "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                      activeImg === i ? "border-rose shadow-soft" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={g} alt="" loading="lazy" className="w-full h-full object-cover" width={200} height={200} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-rose font-semibold mb-3">{pkg.category}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-3 leading-tight">{pkg.title}</h1>
            <p className="text-lg text-muted-foreground mb-5">{pkg.tagline}</p>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-gold text-gold" />
                <span className="font-bold">{pkg.rating}</span>
                <span className="text-sm text-muted-foreground">({pkg.reviewCount} reviews)</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Users className="h-4 w-4" /> {pkg.guests}
              </div>
              <span className="text-muted-foreground hidden sm:inline">•</span>
              <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> {pkg.duration}
              </div>
            </div>

            <div className="bg-cream rounded-2xl p-5 md:p-6 mb-5 border border-gold/30">
              <div className="flex items-baseline gap-3 mb-1">
                <span className="font-display text-4xl font-bold text-rose">₹{pkg.price.toLocaleString("en-IN")}</span>
                {pkg.strikePrice && (
                  <>
                    <span className="text-lg text-muted-foreground line-through">₹{pkg.strikePrice.toLocaleString("en-IN")}</span>
                    <span className="text-xs font-bold text-cream bg-rose px-2.5 py-1 rounded-full">Save ₹{discount.toLocaleString("en-IN")}</span>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground mb-4">All-inclusive price • Setup, execution & cleanup included</p>
              <div className="flex items-center gap-2 text-sm text-rose font-semibold mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Pre-book today and get an extra ₹1,000 off</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="hero" size="lg" className="flex-1" asChild>
                  <Link to={`/book?pkg=${pkg.id}`}>Book this package <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button variant="outline" size="lg" className="flex-1" asChild>
                  <a href="https://wa.me/919599054850" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="h-4 w-4" /> Ask on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Trust strip */}
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { icon: ShieldCheck, label: "Verified vendors" },
                { icon: Tag, label: "Fixed pricing" },
                { icon: MapPin, label: "Delhi NCR" },
              ].map(t => (
                <div key={t.label} className="bg-background border border-border rounded-xl p-3">
                  <t.icon className="h-5 w-5 text-rose mx-auto mb-1" />
                  <p className="text-xs font-medium">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="bg-cream/40 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-display text-3xl md:text-4xl mb-2">What's included</h2>
          <p className="text-muted-foreground mb-10">Everything below is part of the price — no surprises.</p>

          <div className="grid md:grid-cols-2 gap-4">
            {pkg.inclusions.map(i => (
              <div key={i.label} className="bg-card rounded-2xl p-5 shadow-soft border border-border/50 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-rose flex items-center justify-center shrink-0">
                  <Check className="h-5 w-5 text-cream" />
                </div>
                <div>
                  <h3 className="font-display text-lg mb-1">{i.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{i.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {pkg.notIncluded && pkg.notIncluded.length > 0 && (
            <div className="mt-8 bg-background rounded-2xl p-5 border border-border">
              <h3 className="font-display text-lg mb-3 text-muted-foreground">Not included</h3>
              <ul className="space-y-2">
                {pkg.notIncluded.map(n => (
                  <li key={n} className="flex gap-2 text-sm text-muted-foreground">
                    <X className="h-4 w-4 mt-0.5 shrink-0 text-destructive/70" /> {n}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Suggested add-ons */}
      {suggested.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-display text-3xl md:text-4xl mb-2">Make it even better</h2>
            <p className="text-muted-foreground mb-8">Popular add-ons for this package — pick during booking.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggested.map(a => (
                <div key={a.id} className="bg-card rounded-2xl p-5 border border-border shadow-soft flex items-center gap-4">
                  <span className="text-3xl">{a.emoji}</span>
                  <div className="flex-1">
                    <p className="font-semibold">{a.name}</p>
                    <p className="text-sm text-rose font-bold">+ ₹{a.price.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews */}
      <section className="bg-maroon text-cream py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-end justify-between gap-4 mb-10 flex-wrap">
            <div>
              <h2 className="font-display text-3xl md:text-4xl mb-2">What customers say</h2>
              <div className="flex items-center gap-2">
                <div className="flex">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-5 w-5 fill-gold text-gold" />)}</div>
                <span className="font-bold text-lg">{pkg.rating}</span>
                <span className="text-cream/70 text-sm">/ 5 from {pkg.reviewCount} reviews</span>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {pkg.reviews.map(r => (
              <blockquote key={r.name} className="bg-cream/5 backdrop-blur border border-cream/10 rounded-2xl p-6">
                <div className="flex mb-3">{Array.from({length:r.rating}).map((_,i)=><Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div>
                <p className="text-cream/90 leading-relaxed mb-4 text-sm">"{r.text}"</p>
                <footer className="text-xs text-cream/70">
                  <div className="font-semibold text-cream">{r.name}</div>
                  <div>{r.city} • {r.date}</div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl mb-2">Frequently asked questions</h2>
          <p className="text-muted-foreground mb-8">Got more questions? Just message us on WhatsApp.</p>
          <Accordion type="single" collapsible className="space-y-3">
            {pkg.faqs.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-2xl px-5">
                <AccordionTrigger className="text-left font-display text-lg hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-cream/40 py-16">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="font-display text-3xl md:text-4xl mb-8">You may also like</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {related.map(r => (
                <Link key={r.id} to={`/package/${r.id}`} className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1">
                  <div className="aspect-[5/4] overflow-hidden">
                    <img src={r.cover} alt={r.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" width={1000} height={800} />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg mb-2">{r.title}</h3>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl text-rose font-bold">₹{r.price.toLocaleString("en-IN")}</span>
                      <span className="text-rose font-semibold text-sm group-hover:gap-2 inline-flex items-center gap-1 transition-all">View →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky mobile CTA */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 bg-card border-t border-border shadow-elegant p-3 z-40">
        <div className="container mx-auto flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="font-display text-lg text-rose font-bold">₹{pkg.price.toLocaleString("en-IN")}</p>
          </div>
          <Button variant="hero" size="lg" asChild>
            <Link to={`/book?pkg=${pkg.id}`}>Book Now <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)}><ArrowLeft className="h-4 w-4" /> Back</Button>
      </div>

      <Footer />
    </div>
  );
};

export default PackageDetail;
