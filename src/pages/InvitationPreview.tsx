import { useState, useRef, useEffect } from "react";
import { Sparkles, Download, Share2, ArrowLeft, Palette, QrCode, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationCard } from "@/components/ritual/InvitationCard";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function InvitationPreview() {
  const [theme, setTheme] = useState("luxury_gold");
  const [eventData, setEventData] = useState<any>({
    title: "Sarah & James",
    subtitle: "Together with their families",
    date: "December 20th, 2026",
    venue: "The Grand Hotel, Delhi"
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
    <div className="min-h-screen bg-[#FCFBF8] text-[#2C2825] flex flex-col relative overflow-hidden font-sans selection:bg-rose-200/50">
      
      {/* Editorial Ambient Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-amber-50/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50/30 rounded-full blur-[150px] pointer-events-none" />

      {/* Elegant Editorial Toolbar */}
      <header className="fixed top-0 w-full z-50 px-8 py-5 flex items-center justify-between border-b border-[#2C2825]/5 bg-white/70 backdrop-blur-3xl">
        <div className="flex items-center gap-8">
          <Link to="/invitation-maker" className="flex items-center gap-2 text-[#2C2825]/60 hover:text-rose-600 transition-colors font-medium text-sm bg-white hover:bg-rose-50 px-5 py-2.5 rounded-full border border-[#2C2825]/5 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Edit
          </Link>
          <div className="hidden md:flex items-center gap-2 text-sm font-semibold tracking-widest text-[#2C2825]/80 uppercase">
            <Sparkles className="w-4 h-4 text-rose-400" /> RitualEase Magic Studio
          </div>
        </div>
        
        {/* Editorial Progress Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2C2825]/40">Step 2 of 3</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1 rounded-full bg-[#10b981]"></div>
            <div className="w-10 h-1 rounded-full bg-gradient-to-r from-rose-300 to-rose-400"></div>
            <div className="w-3 h-1 rounded-full bg-[#2C2825]/10"></div>
          </div>
        </div>
      </header>

      {/* Main Preview Area */}
      <main className="flex-1 relative z-10 pt-28 p-6 md:p-10 flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto w-full">
        
        {/* Canvas Area (Left) */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 px-4">
            <h2 className="text-3xl font-light font-display flex items-center gap-3 text-[#2C2825]">
              <Sparkles className="w-6 h-6 text-rose-400" /> Your Masterpiece
            </h2>
            
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur-3xl border border-[#2C2825]/5 rounded-full px-5 py-2.5 shadow-md">
              <Palette className="w-4 h-4 text-rose-400" />
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-transparent text-sm font-medium focus:outline-none text-[#2C2825] cursor-pointer"
              >
                <optgroup label="Premium Vector Designs" className="bg-white text-[#2C2825]">
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
                  <option value="minimalist_botanical">Minimalist Botanical</option>
                  <option value="rose_gold_brush">Rose Gold Brushstrokes</option>
                  <option value="haldi_marigold">Traditional Haldi</option>
                  <option value="gothic_romance">Gothic Romance</option>
                  <option value="rustic_wood">Rustic Wood & Lights</option>
                  <option value="modern_clean">Modern Clean</option>
                  <option value="boho_pampas">Boho Pampas Grass</option>
                  <option value="lotus_pond">Lotus Pond</option>
                  <option value="pearl_ribbon">Pearl & Ribbon</option>
                  <option value="geometric_marble">Geometric Marble</option>
                </optgroup>
              </select>
            </div>
          </div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-lg aspect-[3/4] rounded-[2rem] relative group shadow-[0_30px_60px_rgba(44,40,37,0.08)] border border-white"
            ref={cardRef}
          >
            <div className="absolute inset-0 bg-white rounded-[2rem] -z-10" />
            <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
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
        <div className="w-full lg:w-[400px] flex flex-col gap-8">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-3xl border border-[#2C2825]/5 rounded-[2rem] p-8 shadow-xl relative overflow-hidden"
          >
            <h3 className="text-xl font-light font-display text-[#2C2825] mb-6 flex items-center gap-3">
              <Download className="w-5 h-5 text-rose-400" /> Export Assets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handlePDFDownload}
                disabled={isDownloading}
                variant="outline"
                className="w-full h-auto flex flex-col py-8 rounded-2xl border-[#2C2825]/10 bg-[#FCFBF8] hover:bg-rose-50 hover:border-rose-300 text-[#2C2825] hover:text-rose-700 transition-all duration-300 shadow-sm"
              >
                <span className="font-bold text-lg">{isDownloading ? '...' : 'PDF'}</span>
                <span className="text-[10px] text-[#2C2825]/40 mt-1 font-bold uppercase tracking-wider">Print Ready</span>
              </Button>
              <Button 
                onClick={handleDownload} 
                disabled={isDownloading}
                variant="outline"
                className="w-full h-auto flex flex-col py-8 rounded-2xl border-[#2C2825]/10 bg-[#FCFBF8] hover:bg-rose-50 hover:border-rose-300 text-[#2C2825] hover:text-rose-700 transition-all duration-300 shadow-sm"
              >
                <span className="font-bold text-lg">{isDownloading ? '...' : 'PNG'}</span>
                <span className="text-[10px] text-[#2C2825]/40 mt-1 font-bold uppercase tracking-wider">High Res</span>
              </Button>
            </div>
            <Button variant="outline" className="w-full mt-4 h-14 rounded-xl border-[#2C2825]/10 bg-transparent hover:bg-rose-50 text-[#2C2825]/70 hover:text-rose-700 transition-all">
              <Video className="w-4 h-4 mr-2 text-rose-400" /> Generate Video Invite
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-3xl border border-[#2C2825]/5 rounded-[2rem] p-8 shadow-xl"
          >
            <h3 className="text-xl font-light font-display text-[#2C2825] mb-6 flex items-center gap-3">
              <Share2 className="w-5 h-5 text-rose-400" /> Share & RSVP
            </h3>
            <div className="space-y-4">
              <Button 
                onClick={handleWhatsAppShare}
                className="w-full justify-start bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 border border-[#25D366]/30 h-14 rounded-xl text-base font-medium transition-all shadow-sm"
              >
                Share on WhatsApp
              </Button>
              <Button variant="outline" className="w-full justify-start h-14 rounded-xl border-[#2C2825]/10 bg-transparent hover:bg-gray-50 text-[#2C2825]/70 hover:text-[#2C2825] transition-all">
                <QrCode className="w-4 h-4 mr-3" /> Get QR Code
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="w-full text-lg font-bold rounded-2xl h-16 bg-[#2C2825] hover:bg-[#1A1816] text-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0">
              Publish & Manage RSVPs
            </Button>
          </motion.div>
        </div>

      </main>
      
    </div>
  );
}
