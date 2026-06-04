import { Button } from "@/components/ui/button";
import { ADDONS, PACKAGES, WHATSAPP_NUMBER } from "@/data/booking";
import type { DetailsValue } from "./StepDetails";
import type { CustomizeValue } from "./StepCustomize";
import { format } from "date-fns";
import { MessageCircle, Phone, Sparkles, Loader2, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

export const StepConfirm = ({
  packageId, details, addOnIds, customize,
}: { packageId: string; details: DetailsValue; addOnIds: string[]; customize: CustomizeValue }) => {
  const { user } = useAuth();
  const { add, openCart } = useCart();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const pkg = PACKAGES.find(p => p.id === packageId)!;
  const addOns = ADDONS.filter(a => addOnIds.includes(a.id));
  const addOnTotal = addOns.reduce((s, a) => s + a.price, 0);

  const hc = pkg.headcount;
  const kidsCount = hc?.kids ? (customize.kids ?? hc.kids.min) : 0;
  const adultsCount = hc?.adults ? (customize.adults ?? hc.adults.min) : 0;
  const extraKids = hc?.kids ? Math.max(0, kidsCount - hc.kids.min) : 0;
  const extraAdults = hc?.adults ? Math.max(0, adultsCount - hc.adults.min) : 0;
  const extraKidsCost = extraKids * (hc?.kids?.perExtra ?? 0);
  const extraAdultsCost = extraAdults * (hc?.adults?.perExtra ?? 0);
  const extraGuestTotal = extraKidsCost + extraAdultsCost;

  const subtotal = pkg.price + addOnTotal + extraGuestTotal;
  const preBookDiscount = 1000;
  const total = subtotal - preBookDiscount;

  const customRows: { label: string; value: string }[] = [];
  if (hc?.kids) customRows.push({ label: hc.kids.label ?? "Kids", value: `${kidsCount}${extraKids > 0 ? ` (+${extraKids})` : ""}` });
  if (hc?.adults) customRows.push({ label: hc.adults.label ?? "Adults", value: `${adultsCount}${extraAdults > 0 ? ` (+${extraAdults})` : ""}` });
  if (customize.decorTheme) customRows.push({ label: "Decor theme", value: customize.decorTheme });
  if (customize.cakeTheme) customRows.push({ label: "Cake theme", value: customize.cakeTheme });
  if (customize.cakeFlavour) customRows.push({ label: "Cake flavour", value: customize.cakeFlavour });
  if (customize.menuType) customRows.push({ label: "Menu", value: customize.menuType });

  const buildMessage = () => {
    const lines = [
      "*New RitualEase Booking Request* 🎉",
      "",
      ...(orderNumber ? [`*Order:* ${orderNumber}`, ""] : []),
      `*Package:* ${pkg.title}`,
      `*Base price:* ₹${pkg.price.toLocaleString("en-IN")}`,
      "",
      `*Date:* ${details.date ? format(details.date, "EEE, d MMM yyyy") : "-"}`,
      `*Time:* ${details.time || "-"}`,
      `*Name:* ${details.name}`,
      `*Phone:* ${details.phone}`,
      `*City:* ${details.city}`,
      `*Address:* ${details.address}`,
    ];
    if (customRows.length) {
      lines.push("", "*Customisation:*");
      customRows.forEach(r => lines.push(`• ${r.label}: ${r.value}`));
    }
    if (addOns.length) {
      lines.push("", "*Add-ons:*");
      addOns.forEach(a => lines.push(`• ${a.name} — ₹${a.price.toLocaleString("en-IN")}`));
    }
    lines.push("", `*Subtotal:* ₹${subtotal.toLocaleString("en-IN")}`);
    lines.push(`*Pre-booking discount:* -₹${preBookDiscount.toLocaleString("en-IN")}`);
    lines.push(`*Estimated total:* ₹${total.toLocaleString("en-IN")}`);
    lines.push("", "Please confirm availability. Thank you!");
    return lines.join("\n");
  };

  const persistOrder = async (): Promise<string | null> => {
    if (!user) return null;
    if (orderNumber) return orderNumber; // already saved
    setSaving(true);
    const { data, error } = await supabase.from("orders").insert([{
      user_id: user.id,
      order_number: "", // trigger fills it
      package_id: pkg.id,
      package_title: pkg.title,
      package_price: pkg.price,
      addons: addOns.map(a => ({ id: a.id, name: a.name, price: a.price })) as unknown as never,
      customisation: customize as unknown as never,
      scheduled_date: details.date ? format(details.date, "yyyy-MM-dd") : null,
      scheduled_time: details.time || null,
      contact_name: details.name,
      contact_phone: details.phone,
      address_snapshot: { full_address: details.address, city: details.city } as unknown as never,
      subtotal,
      discount: preBookDiscount,
      total,
      status: "pending",
    }]).select("order_number").single();
    setSaving(false);
    if (error) {
      toast.error("Could not save your booking. Please try again.");
      return null;
    }
    setOrderNumber(data.order_number);
    return data.order_number;
  };

  const handleWhatsApp = async () => {
    await persistOrder();
    const text = encodeURIComponent(buildMessage());
    const appUrl = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${text}`;
    const webUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    // Open the installed WhatsApp app (mobile / WhatsApp Desktop) directly.
    window.location.href = appUrl;
    // If the app isn't installed, fall back to web after a short delay.
    setTimeout(() => {
      if (document.visibilityState === "visible") {
        window.open(webUrl, "_blank", "noopener,noreferrer");
      }
    }, 1500);
  };

  const handleAddToCart = () => {
    const detailLines: string[] = [];
    detailLines.push(`Date: ${details.date ? format(details.date, "d MMM yyyy") : "-"} at ${details.time || "-"}`);
    detailLines.push(`For: ${details.name} · ${details.phone}`);
    detailLines.push(`Address: ${details.address}, ${details.city}`);
    customRows.forEach(r => detailLines.push(`${r.label}: ${r.value}`));
    if (addOns.length) detailLines.push(`Add-ons: ${addOns.map(a => a.name).join(", ")}`);

    add({
      id: `pkg:${pkg.id}:${Date.now()}`,
      name: pkg.title,
      price: subtotal,
      note: pkg.guests,
      kind: "package",
      details: detailLines,
    }, 1);
    toast.success(`${pkg.title} added to cart`);
    setTimeout(() => {
      openCart();
      navigate("/");
    }, 200);
  };

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl mb-2">Review & confirm</h2>
      <p className="text-muted-foreground mb-6">Send your booking on WhatsApp — our team will confirm within 30 minutes.</p>

      <div className="bg-cream rounded-2xl p-5 md:p-6 mb-5 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">Package</p>
          <p className="font-display text-lg">{pkg.title}</p>
          <p className="text-sm text-muted-foreground">{pkg.guests}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 text-sm border-t border-border pt-4">
          <div><span className="text-muted-foreground">Date: </span><span className="font-medium">{details.date ? format(details.date, "d MMM yyyy") : "-"}</span></div>
          <div><span className="text-muted-foreground">Time: </span><span className="font-medium">{details.time}</span></div>
          <div><span className="text-muted-foreground">Name: </span><span className="font-medium">{details.name}</span></div>
          <div><span className="text-muted-foreground">Phone: </span><span className="font-medium">{details.phone}</span></div>
          <div className="sm:col-span-2"><span className="text-muted-foreground">Address: </span><span className="font-medium">{details.address}, {details.city}</span></div>
        </div>
        {customRows.length > 0 && (
          <div className="border-t border-border pt-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Customisation</p>
            <ul className="space-y-1 text-sm">
              {customRows.map(r => (
                <li key={r.label} className="flex justify-between gap-3">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="font-medium text-right">{r.value}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {addOns.length > 0 && (
          <div className="border-t border-border pt-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Add-ons</p>
            <ul className="space-y-1 text-sm">
              {addOns.map(a => <li key={a.id} className="flex justify-between"><span>{a.emoji} {a.name}</span><span className="font-medium">₹{a.price.toLocaleString("en-IN")}</span></li>)}
            </ul>
          </div>
        )}
      </div>

      <div className="bg-gradient-rose text-cream rounded-2xl p-5 md:p-6 mb-6">
        <div className="flex justify-between text-sm mb-1"><span>Package</span><span>₹{pkg.price.toLocaleString("en-IN")}</span></div>
        {extraGuestTotal > 0 && <div className="flex justify-between text-sm mb-1"><span>Extra guests</span><span>₹{extraGuestTotal.toLocaleString("en-IN")}</span></div>}
        {addOnTotal > 0 && <div className="flex justify-between text-sm mb-1"><span>Add-ons</span><span>₹{addOnTotal.toLocaleString("en-IN")}</span></div>}
        <div className="flex justify-between text-sm mb-1 text-gold"><span className="flex items-center gap-1"><Sparkles className="h-3.5 w-3.5" />Pre-booking discount</span><span>-₹{preBookDiscount.toLocaleString("en-IN")}</span></div>
        <div className="border-t border-cream/20 mt-3 pt-3 flex justify-between items-end">
          <span className="text-sm">Estimated total</span>
          <span className="font-display text-3xl font-bold">₹{total.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="grid gap-3">
        <Button variant="hero" size="lg" onClick={handleAddToCart}>
          <ShoppingBag className="h-5 w-5" /> Add to cart & checkout
        </Button>
        <div className="grid sm:grid-cols-2 gap-3">
          <Button variant="outline" size="lg" onClick={handleWhatsApp} disabled={saving}>
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageCircle className="h-5 w-5" />}
            {saving ? "Saving…" : "Send on WhatsApp"}
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={`tel:+${WHATSAPP_NUMBER}`}><Phone className="h-5 w-5" /> Or call us</a>
          </Button>
        </div>
      </div>
      {orderNumber && (
        <p className="text-xs text-center mt-3 text-rose font-medium">
          Booking saved as {orderNumber}. View it anytime in My Account.
        </p>
      )}
      <p className="text-xs text-muted-foreground text-center mt-4">No payment required to reserve. Pay only after confirmation.</p>
    </div>
  );
};
