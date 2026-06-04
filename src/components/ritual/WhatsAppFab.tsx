import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/data/booking";

export const WhatsAppFab = () => {
  const [showTip, setShowTip] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setShowTip(true), 4000);
    return () => clearTimeout(t);
  }, [dismissed]);

  const message = "Hi RitualEase! I'd like to know more about your celebration packages.";
  const appHref = `whatsapp://send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
  const webFallback = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowTip(false);
    // Open the installed WhatsApp app (mobile) or WhatsApp Desktop directly.
    window.location.href = appHref;
    // If the app isn't installed, fall back to web after a short delay.
    setTimeout(() => {
      if (document.visibilityState === "visible") {
        window.open(webFallback, "_blank", "noopener,noreferrer");
      }
    }, 1500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-end gap-2 print:hidden">
      {showTip && !dismissed && (
        <div className="relative mb-2 max-w-[220px] rounded-2xl rounded-br-sm bg-card border border-border shadow-elegant px-4 py-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={() => { setShowTip(false); setDismissed(true); }}
            aria-label="Dismiss"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-muted hover:bg-accent flex items-center justify-center border border-border"
          >
            <X className="h-3 w-3" />
          </button>
          <p className="text-sm font-semibold text-foreground leading-tight">Need help planning?</p>
          <p className="text-xs text-muted-foreground mt-0.5">Chat with us on WhatsApp — we reply in minutes.</p>
        </div>
      )}
      <a
        href={appHref}
        aria-label="Chat on WhatsApp"
        onClick={handleClick}
        className="group relative h-14 w-14 rounded-full bg-[hsl(142_70%_45%)] hover:bg-[hsl(142_70%_40%)] text-white shadow-elegant flex items-center justify-center transition-all hover:-translate-y-0.5"
      >
        <span className="absolute inset-0 rounded-full bg-[hsl(142_70%_45%)] animate-ping opacity-30" />
        <MessageCircle className="h-6 w-6 relative" fill="currentColor" />
      </a>
    </div>
  );
};