import { ALA_CARTE_GROUPS, CATERING_PACKAGES, CATERING_NOTES, CATERING_MENU, CATERING_MIN_PAX } from "@/data/alacarte";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp, Sparkles, Utensils } from "lucide-react";
import { Link } from "react-router-dom";
import { WHATSAPP_NUMBER } from "@/data/booking";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import type { AlaCarteItem } from "@/data/alacarte";
import { useCart } from "@/contexts/CartContext";

const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const PREVIEW_COUNT = 3;

const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

const ItemCard = ({ item, onAdd }: { item: AlaCarteItem; onAdd: (item: AlaCarteItem) => void }) => (
  <div className="bg-card rounded-2xl p-5 shadow-soft hover:shadow-elegant hover:-translate-y-0.5 transition-all flex flex-col">
    <h3 className="font-display text-lg text-foreground mb-1">{item.name}</h3>
    {item.note && <p className="text-xs text-muted-foreground mb-3">{item.note}</p>}
    <div className="mt-auto flex items-end justify-between pt-3">
      <div>
        <span className="font-display text-2xl text-rose">{formatPrice(item.price)}</span>
        {item.unit && <span className="text-xs text-muted-foreground ml-1">/ {item.unit}</span>}
      </div>
      <button
        type="button"
        onClick={() => onAdd(item)}
        className="text-rose font-semibold text-sm hover:underline"
      >
        Add →
      </button>
    </div>
  </div>
);

const CollapsibleGroup = ({ group, onAdd }: { group: typeof ALA_CARTE_GROUPS[number]; onAdd: (item: AlaCarteItem) => void }) => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = group.items.length > PREVIEW_COUNT;
  const visible = expanded || !hasMore ? group.items : group.items.slice(0, PREVIEW_COUNT);
  const hiddenCount = group.items.length - PREVIEW_COUNT;

  return (
    <section id={group.id} className="scroll-mt-24">
      <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl md:text-4xl">{group.emoji}</span>
            <h2 className="font-display text-2xl md:text-4xl text-foreground">{group.title}</h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">{group.tagline}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {visible.map(item => <ItemCard key={item.name} item={item} onAdd={onAdd} />)}
      </div>

      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setExpanded(e => !e)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-rose/40 text-rose font-semibold text-sm hover:bg-rose hover:text-white transition-colors"
          >
            {expanded ? (
              <>Show less <ChevronUp className="h-4 w-4" /></>
            ) : (
              <>Show all + {hiddenCount} more <ChevronDown className="h-4 w-4" /></>
            )}
          </button>
        </div>
      )}
    </section>
  );
};

export const AlaCarteView = () => {
  const { add, openCart } = useCart();
  const [selected, setSelected] = useState<AlaCarteItem | null>(null);
  const [qty, setQty] = useState(1);

  const openAdd = (item: AlaCarteItem) => {
    setSelected(item);
    setQty(1);
  };

  const subtotal = selected ? selected.price * qty : 0;
  const unitLabel = selected?.unit ? ` / ${selected.unit}` : "";

  const submit = () => {
    if (!selected) return;
    add({
      id: `ala:${selected.name}`,
      name: selected.name,
      price: selected.price,
      unit: selected.unit,
      note: selected.note,
    }, qty);
    toast.success(`Added ${selected.name} to cart`);
    setSelected(null);
  };

  const submitAndCheckout = () => {
    submit();
    setTimeout(() => openCart(), 100);
  };

  return (
    <div className="space-y-20 md:space-y-24">
      {/* Grouped add-on categories */}
      {ALA_CARTE_GROUPS.map(group => <CollapsibleGroup key={group.id} group={group} onAdd={openAdd} />)}

      {/* Catering packages */}
      <section id="catering" className="scroll-mt-24">
        <div className="max-w-2xl mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Utensils className="h-7 w-7 text-rose" />
            <h2 className="font-display text-2xl md:text-4xl text-foreground">Catering Service</h2>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            Curated multi-course menus for gatherings of {CATERING_MIN_PAX}+ guests. Pick a tier that matches your vibe.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {CATERING_PACKAGES.map(pkg => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl p-6 md:p-7 flex flex-col shadow-soft hover:shadow-elegant transition-all ${
                pkg.featured
                  ? "bg-gradient-to-br from-rose/10 to-cream border-2 border-rose"
                  : "bg-card border border-border/60"
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 bg-rose text-white text-xs font-semibold px-3 py-1 rounded-full">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </span>
              )}
              <h3 className="font-display text-2xl text-foreground mb-1">{pkg.name}</h3>
              <div className="mb-5">
                <span className="font-display text-4xl text-rose">{formatPrice(pkg.pricePerPerson)}</span>
                <span className="text-muted-foreground text-sm ml-1">/ person</span>
              </div>
              <ul className="space-y-2 mb-6 flex-1">
                {pkg.highlights.map(h => (
                  <li key={h} className="flex items-start gap-2 text-sm text-foreground/80">
                    <Check className="h-4 w-4 text-rose shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <a
                href={waLink(`Hi! I'd like to know more about the ${pkg.name} catering package (${formatPrice(pkg.pricePerPerson)} / person, min ${CATERING_MIN_PAX} pax).`)}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full inline-flex items-center justify-center px-4 py-2.5 rounded-md font-semibold text-sm transition-colors ${
                  pkg.featured
                    ? "bg-rose text-white hover:bg-rose/90"
                    : "border border-rose text-rose hover:bg-rose hover:text-white"
                }`}
              >
                Know more on WhatsApp
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-cream/50 rounded-2xl p-5 md:p-6 border border-border/60">
          <p className="text-sm font-semibold text-foreground mb-3">Good to know</p>
          <ul className="space-y-1.5">
            {CATERING_NOTES.map(n => (
              <li key={n} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-rose">•</span>
                <span>{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Catering menu */}
      <section id="catering-menu" className="scroll-mt-24">
        <div className="max-w-2xl mb-8">
          <h2 className="font-display text-2xl md:text-4xl text-foreground mb-2">Catering Menu</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Mix and match across these dishes when building your selected catering package.
          </p>
        </div>

        <div className="space-y-10">
          {CATERING_MENU.map(section => (
            <div key={section.section}>
              <h3 className="font-display text-xl md:text-2xl text-rose mb-4">{section.section}</h3>
              <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                {section.groups.map(g => (
                  <div key={g.title} className="bg-card rounded-2xl p-5 md:p-6 shadow-soft">
                    <h4 className="font-display text-lg text-foreground mb-3">{g.title}</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                      {g.items.map(i => (
                        <li key={i} className="text-sm text-foreground/80 flex items-start gap-2">
                          <span className="text-rose mt-1">•</span>
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-rose/10 to-cream rounded-3xl p-8 md:p-12 text-center">
        <h2 className="font-display text-2xl md:text-3xl text-foreground mb-3">
          Need help putting it all together?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Tell us your occasion, headcount and budget — we'll bundle the perfect mix of activities, entertainment and catering for you.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="hero" asChild>
            <a href={waLink("Hi! I'd like help building a custom celebration package.")} target="_blank" rel="noreferrer">
              Chat on WhatsApp
            </a>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/book">Start a booking</Link>
          </Button>
        </div>
      </section>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">{selected?.name}</DialogTitle>
            <DialogDescription>
              {formatPrice(selected?.price ?? 0)}{unitLabel}
              {selected?.note && <> · {selected.note}</>}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-center justify-between bg-cream/50 rounded-2xl p-4 border border-border/60">
              <div>
                <p className="font-medium text-sm">Quantity</p>
                <p className="text-xs text-muted-foreground">How many would you like?</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="w-9 h-9 rounded-full border-2 border-border flex items-center justify-center disabled:opacity-40 hover:border-rose/40"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center font-display text-lg">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty(q => q + 1)}
                  className="w-9 h-9 rounded-full border-2 border-border flex items-center justify-center hover:border-rose/40"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between bg-rose/10 rounded-2xl p-4">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl text-rose font-bold">{formatPrice(subtotal)}</span>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => setSelected(null)}>Cancel</Button>
            <Button variant="outline" onClick={submit}>Add to cart</Button>
            <Button variant="hero" onClick={submitAndCheckout}>Add & view cart</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};