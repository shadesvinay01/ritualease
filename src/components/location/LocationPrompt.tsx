import { useEffect, useState } from "react";
import { MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "ritualease.location.prompt";

type Stored = { decided: boolean; coords?: { lat: number; lng: number }; deniedAt?: number };

export const getStoredLocation = (): Stored | null => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); } catch { return null; }
};

export const LocationPrompt = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = getStoredLocation();
    if (stored?.decided) return;
    // Slight delay to feel polished
    const t = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(t);
  }, []);

  const close = (decided: boolean, coords?: GeolocationCoordinates) => {
    const data: Stored = decided
      ? coords
        ? { decided: true, coords: { lat: coords.latitude, lng: coords.longitude } }
        : { decided: true, deniedAt: Date.now() }
      : { decided: false };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setOpen(false);
  };

  const allow = () => {
    if (!("geolocation" in navigator)) { close(true); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => close(true, pos.coords),
      () => close(true),
      { timeout: 8000 }
    );
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 p-4 animate-in fade-in">
      <div className="bg-card border border-border rounded-2xl shadow-elegant max-w-md w-full p-6 relative">
        <button onClick={() => close(false)} className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-muted" aria-label="Close">
          <X className="h-4 w-4" />
        </button>
        <div className="h-12 w-12 rounded-full bg-rose/10 flex items-center justify-center mb-4">
          <MapPin className="h-6 w-6 text-rose" />
        </div>
        <h3 className="font-display text-xl mb-2">Allow location access?</h3>
        <p className="text-sm text-muted-foreground mb-5">
          We use your location to show nearby pandits, available delivery slots, and accurate pricing for your city.
        </p>
        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
          <Button variant="ghost" onClick={() => close(false)}>Not now</Button>
          <Button variant="hero" onClick={allow}>Allow location</Button>
        </div>
      </div>
    </div>
  );
};
