import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Mail, HelpCircle } from "lucide-react";

const WHATSAPP = "919958461103";

export const HelpSection = () => (
  <div className="grid sm:grid-cols-2 gap-4">
    <div className="bg-card rounded-2xl border border-border/60 p-6">
      <MessageCircle className="h-6 w-6 text-rose mb-3" />
      <h3 className="font-display text-lg mb-1">Chat on WhatsApp</h3>
      <p className="text-sm text-muted-foreground mb-4">Fastest way to reach our team — typically replies in under 10 minutes.</p>
      <Button variant="hero" asChild className="w-full">
        <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi, I need help with my RitualEase booking.")}`} target="_blank" rel="noopener noreferrer">
          Open WhatsApp
        </a>
      </Button>
    </div>

    <div className="bg-card rounded-2xl border border-border/60 p-6">
      <Phone className="h-6 w-6 text-rose mb-3" />
      <h3 className="font-display text-lg mb-1">Call us</h3>
      <p className="text-sm text-muted-foreground mb-4">9 AM – 9 PM, all days. We're happy to help with bookings or changes.</p>
      <Button variant="outline" asChild className="w-full">
        <a href={`tel:+${WHATSAPP}`}>+91 99584 61103</a>
      </Button>
    </div>

    <div className="bg-card rounded-2xl border border-border/60 p-6">
      <Mail className="h-6 w-6 text-rose mb-3" />
      <h3 className="font-display text-lg mb-1">Email us</h3>
      <p className="text-sm text-muted-foreground mb-4">For invoices, custom requests, or detailed queries.</p>
      <Button variant="outline" asChild className="w-full">
        <a href="mailto:hello@ritualease.com">hello@ritualease.com</a>
      </Button>
    </div>

    <div className="bg-card rounded-2xl border border-border/60 p-6">
      <HelpCircle className="h-6 w-6 text-rose mb-3" />
      <h3 className="font-display text-lg mb-1">FAQs</h3>
      <p className="text-sm text-muted-foreground mb-4">Browse common questions about packages, customisation, and policies.</p>
      <Button variant="outline" asChild className="w-full">
        <a href="/#faqs">View FAQs</a>
      </Button>
    </div>
  </div>
);
