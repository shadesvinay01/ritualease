import { useState, useRef, useEffect } from "react";
import { Sparkles, Download, Share2, ArrowLeft, Palette, QrCode, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { InvitationCard } from "@/components/ritual/InvitationCard";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

// Minimalist Henna Overlay
const MinimalistHennaOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="mehndi" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M60 0c33.137 0 60 26.863 60 60s-26.863 60-60 60S0 93.137 0 60 26.863 0 60 0zm0 4c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56S90.928 4 60 4zm0 28c15.464 0 28 12.536 28 28s-12.536 28-28 28-28-12.536-28-28 12.536-28 28-28zm0 4c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24z" fill="#4A3B32" fillRule="evenodd"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mehndi)" />
      </svg>
    </div>
  );
};

export default function InvitationPreview() {
  const [theme, setTheme] = useState("minimalist_botanical");
  const [eventData, setEventData] = useState<any>({
    title: "Sarah & James",
    subtitle: "Request the pleasure of your company",
    date: "October 15, 2026",
    venue: "The Botanical Gardens"
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('generatedEvent');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.theme_id) setTheme(parsed.theme_id);
      setEventData(parsed);
    }
  }, []);

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = `invitation-${eventData.title.replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to download image', err);
      alert('Failed to generate image.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePDFDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 });
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [cardRef.current.offsetWidth, cardRef.current.offsetHeight]
      });
      pdf.addImage(dataUrl, 'PNG', 0, 0, cardRef.current.offsetWidth, cardRef.current.offsetHeight);
      pdf.save(`invitation-${eventData.title.replace(/\s+/g, '-')}.pdf`);
    } catch (err) {
      console.error('Failed to download PDF', err);
      alert('Failed to generate PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleWhatsAppShare = () => {
    const message = `You're invited! 🎊\n\n*${eventData.title}*\n${eventData.subtitle}\n\n📅 ${eventData.date}\n📍 ${eventData.venue}\n\nWe can't wait to celebrate with you!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A3B32] flex flex-col relative overflow-hidden font-sans selection:bg-[#EAE0D5]/50">
      
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F2EBE1]/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#EAE0D5]/40 rounded-full blur-[120px] pointer-events-none" />

      <MinimalistHennaOverlay />

      {/* Elegant Minimalist Toolbar */}
      <header className="fixed top-0 w-full z-50 px-8 py-5 flex items-center justify-between border-b border-[#EAE0D5] bg-[#FDFBF7]/90 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-8">
          <Link to="/invitation-maker" className="flex items-center gap-2 text-[#4A3B32]/60 hover:text-[#4A3B32] transition-colors font-medium text-sm bg-white hover:bg-[#F2EBE1] px-5 py-2.5 rounded-full border border-[#EAE0D5]">
            <ArrowLeft className="w-4 h-4" /> Back to Edit
          </Link>
          <div className="hidden md:flex items-center gap-2 text-sm font-semibold tracking-widest text-[#4A3B32]/80 uppercase">
            <Sparkles className="w-4 h-4 text-[#C19B76]" /> RitualEase Elegance
          </div>
        </div>
        
        {/* Minimal Progress Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A3B32]/40">Step 2 of 3</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 rounded-full bg-green-600/60"></div>
            <div className="w-10 h-1 rounded-full bg-[#C19B76]"></div>
            <div className="w-3 h-1 rounded-full bg-[#EAE0D5]"></div>
          </div>
        </div>
      </header>

      {/* Main Preview Area */}
      <main className="flex-1 relative z-10 pt-28 p-6 md:p-10 flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto w-full">
        
        {/* Canvas Area (Left) */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 px-4">
            <h2 className="text-2xl font-serif text-[#4A3B32] tracking-wide flex items-center gap-3">
              Your Masterpiece
            </h2>
            
            <div className="flex items-center gap-3 bg-white border border-[#EAE0D5] rounded-lg px-4 py-2 shadow-sm">
              <Palette className="w-4 h-4 text-[#C19B76]" />
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-transparent text-sm font-medium focus:outline-none text-[#4A3B32] cursor-pointer"
              >
                <optgroup label="Minimal & Clean Designs" className="bg-white">
                  <option value="minimalist_botanical">Minimalist Botanical</option>
                  <option value="modern_clean">Modern Clean</option>
                  <option value="pearl_ribbon">Pearl & Ribbon</option>
                  <option value="geometric_marble">Geometric Marble</option>
                </optgroup>
                <optgroup label="Other Premium Designs" className="bg-white">
                  <option value="royal_rajput">Royal Rajput Archway</option>
                  <option value="golden_mandala">Golden Mandala</option>
                  <option value="watercolor_florals">Watercolor Florals</option>
                  <option value="emerald_foil">Emerald & Gold Foil</option>
                  <option value="tropical_palm">Tropical Palm</option>
                  <option value="classic_damask">Classic Damask</option>
                  <option value="peacock_majesty">Peacock Majesty</option>
                  <option value="vintage_lace">Vintage Lace</option>
                  <option value="art_deco">Art Deco Gatsby</option>
                  <option value="celestial">Celestial Night</option>
                  <option value="rose_gold_brush">Rose Gold Brushstrokes</option>
                  <option value="haldi_marigold">Traditional Haldi</option>
                  <option value="gothic_romance">Gothic Romance</option>
                  <option value="rustic_wood">Rustic Wood & Lights</option>
                  <option value="boho_pampas">Boho Pampas Grass</option>
                  <option value="lotus_pond">Lotus Pond</option>
                </optgroup>
              </select>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-lg aspect-[3/4] relative group"
          >
            <div className="absolute inset-0 shadow-[0_20px_50px_rgba(74,59,50,0.06)] border border-[#EAE0D5] bg-white rounded-md overflow-hidden z-10" ref={cardRef}>
              <InvitationCard 
                themeId={theme}
                title={eventData.title}
                subtitle={eventData.subtitle}
                date={eventData.date}
                venue={eventData.venue}
              />
            </div>
          </motion.div>
        </div>

        {/* Tools Area (Right) */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6 pt-10 lg:pt-0">
          
          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white border border-[#EAE0D5] rounded-xl p-8 shadow-sm"
          >
            <h3 className="text-lg font-serif text-[#4A3B32] mb-5 flex items-center gap-3">
              Export Assets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handlePDFDownload}
                disabled={isDownloading}
                variant="outline"
                className="w-full h-auto flex flex-col py-6 rounded-lg border-[#EAE0D5] bg-[#FDFBF7] hover:bg-[#F2EBE1] hover:border-[#C19B76] text-[#4A3B32] transition-all duration-300"
              >
                <span className="font-semibold text-base">{isDownloading ? '...' : 'PDF'}</span>
                <span className="text-[9px] text-[#4A3B32]/50 mt-1 uppercase tracking-widest font-bold">Print Ready</span>
              </Button>
              <Button 
                onClick={handleDownload} 
                disabled={isDownloading}
                variant="outline"
                className="w-full h-auto flex flex-col py-6 rounded-lg border-[#EAE0D5] bg-[#FDFBF7] hover:bg-[#F2EBE1] hover:border-[#C19B76] text-[#4A3B32] transition-all duration-300"
              >
                <span className="font-semibold text-base">{isDownloading ? '...' : 'PNG'}</span>
                <span className="text-[9px] text-[#4A3B32]/50 mt-1 uppercase tracking-widest font-bold">High Res</span>
              </Button>
            </div>
            <Button variant="outline" className="w-full mt-4 h-12 rounded-lg border-[#EAE0D5] bg-transparent hover:bg-[#F2EBE1] text-[#4A3B32]/70 hover:text-[#4A3B32] transition-all">
              <Video className="w-4 h-4 mr-2 text-[#C19B76]" /> Generate Video Invite
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white border border-[#EAE0D5] rounded-xl p-8 shadow-sm"
          >
            <h3 className="text-lg font-serif text-[#4A3B32] mb-5 flex items-center gap-3">
              Share & RSVP
            </h3>
            <div className="space-y-4">
              <Button 
                onClick={handleWhatsAppShare}
                className="w-full justify-start bg-[#25D366]/5 text-[#128C7E] hover:bg-[#25D366]/10 border border-[#25D366]/20 h-12 rounded-lg text-sm font-semibold transition-all"
              >
                Share on WhatsApp
              </Button>
              <Button variant="outline" className="w-full justify-start h-12 rounded-lg border-[#EAE0D5] bg-transparent hover:bg-[#F2EBE1] text-[#4A3B32]/70 hover:text-[#4A3B32] transition-all">
                <QrCode className="w-4 h-4 mr-3 text-[#C19B76]" /> Get QR Code
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button className="w-full text-sm font-semibold uppercase tracking-widest rounded-xl h-14 bg-[#4A3B32] hover:bg-[#382b24] text-[#FDFBF7] shadow-md hover:shadow-lg transition-all duration-300 border-0">
              Publish & Manage RSVPs
            </Button>
          </motion.div>
        </div>

      </main>
      
    </div>
  );
}
