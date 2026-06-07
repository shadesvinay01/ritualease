import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const reviews = [
  { name: "Priya Sharma", city: "Gurgaon", text: "Booked the kids birthday package — they handled everything. My son had the best day and I actually got to enjoy too!", rating: 5 },
  { name: "Rohit & Anjali", city: "Delhi", text: "Our anniversary felt like a 5-star experience at home. Decor, dinner, music — flawless.", rating: 5 },
  { name: "Mehta Family", city: "Noida", text: "Pandit ji was on time, samagri was complete, prasad was delicious. Truly stress-free Satyanarayan Katha.", rating: 5 },
  { name: "Neha Gupta", city: "Bangalore", text: "The bachelorette setup was beyond my expectations. Premium quality decor and very professional team.", rating: 5 },
  { name: "Vikram Singh", city: "Mumbai", text: "Used RitualEase for a house party. The bartender and catering were top notch. Highly recommended!", rating: 4 },
];

export const Testimonials = () => (
  <section className="py-20 md:py-28 bg-background" id="testimonials">
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-rose font-semibold mb-3">Loved by families</p>
          <h2 className="font-display text-3xl md:text-5xl mb-4">1000+ celebrations delivered</h2>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex">{Array.from({length:5}).map((_,i)=><Star key={i} className="h-5 w-5 fill-gold text-gold" />)}</div>
            <span className="font-bold text-xl">4.8</span>
            <span className="text-muted-foreground">/ 5 from 2,400+ reviews</span>
          </div>

          {/* Write a Review Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-full border-rose text-rose hover:bg-rose hover:text-white transition-all shadow-sm">
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">Write a Review</DialogTitle>
                <DialogDescription>
                  Share your RitualEase experience with other families!
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4" onSubmit={(e) => { e.preventDefault(); alert("Thank you for your review! It has been submitted for moderation."); }}>
                <div className="flex gap-1 justify-center mb-4">
                  {Array.from({length:5}).map((_,i)=><Star key={i} className="h-8 w-8 text-muted hover:fill-gold hover:text-gold cursor-pointer transition-colors" />)}
                </div>
                <Input placeholder="Your Name" required className="rounded-xl" />
                <Input placeholder="City / Location" required className="rounded-xl" />
                <Textarea placeholder="Tell us about your celebration..." required className="rounded-xl min-h-[120px]" />
                <Button type="submit" variant="hero" className="w-full rounded-full">Submit Review</Button>
              </form>
            </DialogContent>
          </Dialog>

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

      {/* Moving Carousel */}
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative"
      >
        <CarouselContent className="-ml-4">
          {reviews.map(r => (
            <CarouselItem key={r.name} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <blockquote className="bg-cream rounded-2xl p-7 shadow-soft h-full flex flex-col">
                <div className="flex mb-3">{Array.from({length:r.rating}).map((_,i)=><Star key={i} className="h-4 w-4 fill-gold text-gold" />)}</div>
                <p className="text-foreground/90 leading-relaxed mb-5 flex-1">"{r.text}"</p>
                <footer className="text-sm">
                  <div className="font-semibold">{r.name}</div>
                  <div className="text-muted-foreground">{r.city}</div>
                </footer>
              </blockquote>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-end gap-2 mt-6">
          <CarouselPrevious className="relative right-0 top-0 translate-y-0 hover:bg-rose hover:text-white border-rose/30" />
          <CarouselNext className="relative right-0 top-0 translate-y-0 hover:bg-rose hover:text-white border-rose/30" />
        </div>
      </Carousel>
    </div>
  </section>
);
