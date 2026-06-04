import { Navbar } from "@/components/ritual/Navbar";
import { Footer } from "@/components/ritual/Footer";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const UPCOMING = [
  {
    eta: "Coming soon",
    title: "Mehendi & Sangeet at Home",
    tagline: "Intimate pre-wedding rituals, fully styled",
    bullets: ["Dholak & singer", "Mehendi artists", "Floral mandap", "Themed decor"],
    accent: "bg-mood-bachelorette",
  },
  {
    eta: "Launching this month",
    title: "Diwali Puja Bundle",
    tagline: "Lakshmi Puja with samagri, pandit & prasad",
    bullets: ["Verified pandit ji", "Full samagri kit", "Diya & rangoli decor", "Bhog & prasad"],
    accent: "bg-mood-puja-sattva",
  },
  {
    eta: "In planning",
    title: "Baby Shower (Godh Bharai)",
    tagline: "Soft, joyful celebrations for the mom-to-be",
    bullets: ["Pastel decor", "Custom cake", "Games & hampers", "Photographer"],
    accent: "bg-mood-romance",
  },
  {
    eta: "In planning",
    title: "Corporate Pujas & Inaugurations",
    tagline: "Office openings, Vishwakarma puja & more",
    bullets: ["On-site setup", "Pandit ji", "Prasad for team", "Flexible timing"],
    accent: "bg-mood-puja-ganesh",
  },
  {
    eta: "Coming soon",
    title: "Game Night Party Kit",
    tagline: "Friends chilling, snacks flowing, vibes high",
    bullets: ["Board games & consoles", "Hookah setup", "Snack platters", "Mood lighting"],
    accent: "bg-mood-house",
  },
  {
    eta: "Coming soon",
    title: "Karwa Chauth Premium",
    tagline: "Sargi to moonrise — handled end-to-end",
    bullets: ["Sargi thali", "Pooja samagri", "Mehendi artist", "Romantic dinner setup"],
    accent: "bg-mood-romance",
  },
];

const Upcoming = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="bg-cream/40 border-b border-border/60">
      <div className="container mx-auto px-4 py-14 md:py-20 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose/10 text-rose text-xs font-semibold uppercase tracking-wide mb-4">
          <Sparkles className="h-3.5 w-3.5" /> Upcoming packages
        </div>
        <h1 className="font-display text-4xl md:text-5xl mb-4">Fresh celebrations, on the way.</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A peek at what we're cooking up next. Got something in mind we haven't listed?
          Tell us — we love building packages our families ask for.
        </p>
      </div>
    </section>

    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {UPCOMING.map(u => (
            <div key={u.title} className={`p-6 rounded-2xl border border-border shadow-soft flex flex-col ${u.accent}`}>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card/80 backdrop-blur text-[11px] font-semibold uppercase tracking-wide text-foreground/70 w-fit mb-4">
                <Calendar className="h-3 w-3" /> {u.eta}
              </div>
              <h3 className="font-display text-xl mb-1">{u.title}</h3>
              <p className="text-sm text-foreground/70 mb-4">{u.tagline}</p>
              <ul className="space-y-1.5 mb-5 flex-1">
                {u.bullets.map(b => (
                  <li key={b} className="text-sm text-foreground/75 flex gap-1.5"><span className="text-rose">•</span>{b}</li>
                ))}
              </ul>
              <Button variant="outline" size="sm" className="w-fit bg-card/80 backdrop-blur" asChild>
                <a href="https://wa.me/919999999999?text=Hi%20RitualEase%2C%20notify%20me%20when%20this%20package%20launches." target="_blank" rel="noreferrer">
                  <Bell className="h-4 w-4" /> Notify me
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-12 md:py-16 bg-cream/40 border-t border-border/60">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <h2 className="font-display text-2xl md:text-3xl mb-4">Want a package we haven't built yet?</h2>
        <p className="text-muted-foreground mb-6">Tell us your vision — we'll put it together for you.</p>
        <Button variant="hero" size="lg" asChild><Link to="/book">Request a custom plan</Link></Button>
      </div>
    </section>

    <Footer />
  </div>
);

export default Upcoming;