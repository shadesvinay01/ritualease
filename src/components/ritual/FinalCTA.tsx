import { Button } from "@/components/ui/button";

export const FinalCTA = () => (
  <section className="py-20 md:py-28 bg-gradient-warm">
    <div className="container mx-auto px-4">
      <div className="relative max-w-5xl mx-auto rounded-3xl bg-gradient-rose p-10 md:p-16 text-center text-cream shadow-elegant overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,hsl(var(--gold))_0%,transparent_60%)]" />
        <div className="relative">
          <p className="text-sm uppercase tracking-[0.25em] text-gold font-semibold mb-4">Get an extra ₹1000 off on advance bookings</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl mb-5 leading-tight">
            Your next celebration is just <em className="text-gold not-italic">one click</em> away.
          </h2>
          <p className="text-cream/85 text-lg mb-8 max-w-xl mx-auto">Reserve your date today and let us handle the rest.</p>
          <Button variant="gold" size="xl" asChild><a href="/book">Book Your Celebration Now</a></Button>
        </div>
      </div>
    </div>
  </section>
);
