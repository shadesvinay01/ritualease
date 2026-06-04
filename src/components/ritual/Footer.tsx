import { Instagram, MessageCircle, Globe } from "lucide-react";
import logo from "@/assets/ritualease-logo.png";

export const Footer = () => (
  <footer className="bg-maroon text-cream/80 pt-16 pb-8">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-5 gap-10 mb-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="RitualEase" className="h-10 w-auto" width={40} height={40} />
            <span className="font-display text-2xl text-cream font-bold">RitualEase</span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            Celebrations made easy. End-to-end parties, pujas and rituals delivered at your home across India.
          </p>
          <div className="flex gap-3 mt-5">
            <a href="#" className="w-10 h-10 rounded-full bg-cream/10 hover:bg-gold hover:text-maroon flex items-center justify-center transition"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-cream/10 hover:bg-gold hover:text-maroon flex items-center justify-center transition"><MessageCircle className="h-4 w-4" /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-cream/10 hover:bg-gold hover:text-maroon flex items-center justify-center transition"><Globe className="h-4 w-4" /></a>
          </div>
        </div>
        {[
          { title: "Services", links: ["Parties", "Pujas", "Ala-Carte", "Add-ons"] },
          { title: "Company", links: ["About", "How it works", "Careers", "Blog"] },
          { title: "Cities", links: ["Delhi NCR", "Mumbai", "Bangalore", "Hyderabad"] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="font-display text-cream text-lg mb-4">{col.title}</h4>
            <ul className="space-y-2 text-sm">
              {col.links.map(l => <li key={l}><a href="#" className="hover:text-gold transition">{l}</a></li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cream/10 pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-cream/60">
        <p>© {new Date().getFullYear()} RitualEase. Celebrations made easy.</p>
        <p>WhatsApp: +91 9599054850 • www.ritualease.com</p>
      </div>
    </div>
  </footer>
);
