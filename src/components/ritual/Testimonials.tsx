import { Star } from "lucide-react";

const reviews = [
  { name: "Priya Sharma", city: "Gurgaon", text: "Booked the kids birthday package — they handled everything. My son had the best day and I actually got to enjoy too!", rating: 5 },
  { name: "Rohit & Anjali", city: "Delhi", text: "Our anniversary felt like a 5-star experience at home. Decor, dinner, music — flawless.", rating: 5 },
  { name: "Mehta Family", city: "Noida", text: "Pandit ji was on time, samagri was complete, prasad was delicious. Truly stress-free Satyanarayan Katha.", rating: 5 },
];

export const Testimonials = () => (
  <section className="py-20 md:py-28 bg-background">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-14">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-rose font-semibold mb-3">Loved by families</p>
          <h2 className="font-display text-3xl md:text-5xl mb-4">1000+ celebrations delivered</h2>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-5 w-5 fill-gold text-gold" />)}</div>
            <span className="font-bold text-xl">4.8</span>
            <span className="text-muted-foreground">/ 5 from 2,400+ reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { n: "1000+", l: "Celebrations" },
            { n: "4.8★", l: "Avg Rating" },
            { n: "50+", l: "Verified Vendors" },
          ].map(s => (
            <div key={s.l} className="bg-cream rounded-2xl p-5">
              <div className="font-display text-2xl md:text-3xl text-rose font-bold">{s.n}</div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map(r => (
          <blockquote key={r.name} className="bg-cream rounded-2xl p-7 shadow-soft">
            <div className="flex mb-3">{Array.from({length:r.rating}).map((_,i)=><Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div>
            <p className="text-foreground/90 leading-relaxed mb-5">"{r.text}"</p>
            <footer className="text-sm">
              <div className="font-semibold">{r.name}</div>
              <div className="text-muted-foreground">{r.city}</div>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  </section>
);
