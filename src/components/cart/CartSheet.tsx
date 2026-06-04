import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { Minus, Plus, Trash2, ShoppingBag, Package } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { WHATSAPP_NUMBER } from "@/data/booking";

const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const CartSheet = () => {
  const { items, isOpen, closeCart, setQty, remove, subtotal, clear } = useCart();
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const needsContactBlock = items.some(i => i.kind !== "package");

  const checkout = () => {
    if (!items.length) return;
    const cleanPhone = phone.replace(/[\s-]/g, "").trim();
    if (needsContactBlock) {
      if (!name.trim()) { toast.error("Please enter your name"); return; }
      if (!/^\+?\d{10,15}$/.test(cleanPhone)) { toast.error("Please enter a valid phone number"); return; }
      if (!date) { toast.error("Please select an event date"); return; }
    }
    const lines = [
      `Hi! I'd like to book the following from RitualEase:`,
      ``,
      ...items.flatMap(i => [
        `• ${i.name} × ${i.qty} = ${formatPrice(i.price * i.qty)}${i.unit ? ` (${formatPrice(i.price)}/${i.unit})` : ""}`,
        ...((i.details ?? []).map(d => `   - ${d}`)),
      ]),
      ``,
      `Subtotal: ${formatPrice(subtotal)}`,
      ...(needsContactBlock ? [
        ``,
        `Event date: ${date}`,
        `Name: ${name}`,
        `Phone: ${cleanPhone}`,
      ] : []),
    ].join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) {
      // Popup blocked — fallback to same-tab navigation
      window.location.href = url;
      return;
    }
    toast.success("Cart sent — we'll confirm on WhatsApp");
    clear();
    closeCart();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && closeCart()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-rose" /> Your cart
          </SheetTitle>
          <SheetDescription>
            Review your packages and add-ons, then send the booking on WhatsApp to confirm.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              Your cart is empty. Browse Ala-Carte to add offerings.
            </div>
          ) : items.map(i => (
            <div key={i.id} className="bg-card border border-border/60 rounded-2xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate flex items-center gap-1.5">
                    {i.kind === "package" && <Package className="h-3.5 w-3.5 text-rose shrink-0" />}
                    {i.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatPrice(i.price)}{i.unit ? ` / ${i.unit}` : ""}
                  </p>
                  {i.details && i.details.length > 0 && (
                    <ul className="mt-2 space-y-0.5">
                      {i.details.map((d, idx) => (
                        <li key={idx} className="text-[11px] text-muted-foreground leading-snug">• {d}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <button onClick={() => remove(i.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setQty(i.id, i.qty - 1)}
                    disabled={i.qty <= 1 || i.kind === "package"}
                    className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center disabled:opacity-40 hover:border-rose/40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-7 text-center font-display">{i.qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(i.id, i.qty + 1)}
                    disabled={i.kind === "package"}
                    className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center hover:border-rose/40"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="font-display text-rose font-semibold">{formatPrice(i.price * i.qty)}</span>
              </div>
            </div>
          ))}

          {items.length > 0 && needsContactBlock && (
            <div className="space-y-3 pt-2">
              <p className="text-xs text-muted-foreground">Contact details for your ala-carte items:</p>
              <div>
                <Label htmlFor="cart-date">Event date</Label>
                <Input id="cart-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cart-name">Your name</Label>
                <Input id="cart-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="cart-phone">Phone number</Label>
                <Input id="cart-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10-digit mobile" className="mt-1" />
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t pt-4 sm:flex-col sm:space-x-0 gap-3">
            <div className="flex items-center justify-between w-full">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl text-rose font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex gap-2 w-full">
              <Button variant="ghost" onClick={clear} className="flex-1">Clear</Button>
              <Button variant="hero" onClick={checkout} className="flex-1">Confirm on WhatsApp</Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
