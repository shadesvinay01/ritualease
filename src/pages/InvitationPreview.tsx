import { useState, useRef, useEffect } from "react";
import { Sparkles, Download, Share2, ArrowLeft, Palette, QrCode, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationCard } from "@/components/ritual/InvitationCard";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-500/40 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 2,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [null, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

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
    <div className="min-h-screen bg-[#030305] text-white flex flex-col relative overflow-hidden font-sans selection:bg-amber-500/30">
      
      {/* Cinematic Ambient Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-rose-900/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none" />

      <FloatingParticles />

      {/* Ultra-Premium Glassmorphic Toolbar */}
      <header className="fixed top-0 w-full z-50 px-8 py-5 flex items-center justify-between border-b border-white/5 bg-[#030305]/40 backdrop-blur-3xl">
        <div className="flex items-center gap-8">
          <Link to="/invitation-maker" className="flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors font-medium text-sm bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/5">
            <ArrowLeft className="w-4 h-4" /> Back to Edit
          </Link>
          <div className="hidden md:flex items-center gap-2 text-sm font-semibold tracking-widest text-white/80 uppercase">
            <Sparkles className="w-4 h-4 text-amber-500" /> RitualEase Magic Studio
          </div>
        </div>
        
        {/* Cinematic Progress Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">Step 2 of 3</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-amber-600 to-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]"></div>
            <div className="w-3 h-1.5 rounded-full bg-white/10"></div>
          </div>
        </div>
      </header>

      {/* Main Preview Area */}
      <main className="flex-1 relative z-10 pt-28 p-6 md:p-10 flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto w-full">
        
        {/* Canvas Area (Left) */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 px-4">
            <h2 className="text-3xl font-light font-display flex items-center gap-3 text-white">
              <Sparkles className="w-6 h-6 text-amber-500" /> Your Masterpiece
            </h2>
            
            <div className="flex items-center gap-3 bg-[#0a0a0c]/80 backdrop-blur-3xl border border-white/10 rounded-full px-5 py-2.5 shadow-2xl">
              <Palette className="w-4 h-4 text-amber-400" />
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-transparent text-sm font-medium focus:outline-none text-white cursor-pointer"
              >
                <optgroup label="Premium Vector Designs" className="bg-[#030305] text-white">
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
            className="w-full max-w-lg aspect-[3/4] rounded-[2rem] relative group shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10"
            ref={cardRef}
          >
            {/* Cinematic Glow Behind Card */}
            <div className="absolute inset-0 bg-amber-500/20 blur-[100px] -z-10 rounded-full" />
            
            <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-30 z-20 pointer-events-none mix-blend-overlay"></div>
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
            className="bg-[#0a0a0c]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <h3 className="text-xl font-light font-display text-white mb-6 flex items-center gap-3">
              <Download className="w-5 h-5 text-amber-500" /> Export Assets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handlePDFDownload}
                disabled={isDownloading}
                variant="outline"
                className="w-full h-auto flex flex-col py-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-500/50 text-white transition-all duration-300"
              >
                <span className="font-bold text-lg">{isDownloading ? '...' : 'PDF'}</span>
                <span className="text-xs text-white/40 mt-1 uppercase tracking-wider">Print Ready</span>
              </Button>
              <Button 
                onClick={handleDownload} 
                disabled={isDownloading}
                variant="outline"
                className="w-full h-auto flex flex-col py-8 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 hover:border-amber-500/50 text-white transition-all duration-300"
              >
                <span className="font-bold text-lg">{isDownloading ? '...' : 'PNG'}</span>
                <span className="text-xs text-white/40 mt-1 uppercase tracking-wider">High Res</span>
              </Button>
            </div>
            <Button variant="outline" className="w-full mt-4 h-14 rounded-xl border-white/10 bg-transparent hover:bg-white/5 text-white/70 hover:text-white transition-all">
              <Video className="w-4 h-4 mr-2 text-amber-500" /> Generate Video Invite
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-[#0a0a0c]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-2xl"
          >
            <h3 className="text-xl font-light font-display text-white mb-6 flex items-center gap-3">
              <Share2 className="w-5 h-5 text-amber-500" /> Share & RSVP
            </h3>
            <div className="space-y-4">
              <Button 
                onClick={handleWhatsAppShare}
                className="w-full justify-start bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 border border-[#25D366]/30 h-14 rounded-xl text-base font-medium transition-all"
              >
                Share on WhatsApp
              </Button>
              <Button variant="outline" className="w-full justify-start h-14 rounded-xl border-white/10 bg-transparent hover:bg-white/5 text-white/70 hover:text-white transition-all">
                <QrCode className="w-4 h-4 mr-3" /> Get QR Code
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="w-full text-lg font-bold rounded-2xl h-16 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-black shadow-[0_0_30px_rgba(245,158,11,0.2)] hover:shadow-[0_0_50px_rgba(245,158,11,0.4)] transition-all duration-500 border-0">
              Publish & Manage RSVPs
            </Button>
          </motion.div>
        </div>

      </main>
      
    </div>
  );
}
