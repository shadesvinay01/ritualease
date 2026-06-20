import { useState, useRef, useEffect } from "react";
import { Sparkles, Download, Share2, ArrowLeft, Palette, QrCode, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { InvitationCard } from "@/components/ritual/InvitationCard";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

// Falling Marigold Petals
const FallingPetals = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(25)].map((_, i) => {
        // Randomize petal colors between deep orange and bright yellow
        const colors = ["bg-orange-500", "bg-yellow-400", "bg-amber-500"];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return (
          <motion.div
            key={i}
            className={`absolute w-3 h-4 rounded-t-full rounded-br-full ${color} opacity-60`}
            style={{ filter: "blur(1px)" }}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * -window.innerHeight - 100,
              rotate: Math.random() * 360,
              scale: Math.random() * 0.8 + 0.4,
            }}
            animate={{
              y: window.innerHeight + 100,
              x: `+=${Math.random() * 200 - 100}`,
              rotate: `+=${Math.random() * 360 + 180}`,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
};

export default function InvitationPreview() {
  const [theme, setTheme] = useState("haldi_marigold");
  const [eventData, setEventData] = useState<any>({
    title: "Priya's Haldi",
    subtitle: "Let the celebrations begin",
    date: "October 14, 2026",
    venue: "The Courtyard"
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
    <div className="min-h-screen bg-[#FFFBF0] text-[#5C2B09] flex flex-col relative overflow-hidden font-sans selection:bg-orange-300/50">
      
      {/* Festive Ambient Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-300/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-yellow-300/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/20 rounded-full blur-[120px] pointer-events-none" />

      <FallingPetals />

      {/* Warm & Festive Toolbar */}
      <header className="fixed top-0 w-full z-50 px-8 py-5 flex items-center justify-between border-b border-orange-200/50 bg-[#FFFBF0]/80 backdrop-blur-3xl shadow-sm">
        <div className="flex items-center gap-8">
          <Link to="/invitation-maker" className="flex items-center gap-2 text-orange-800/60 hover:text-orange-600 transition-colors font-medium text-sm bg-orange-100/50 hover:bg-orange-200/60 px-5 py-2.5 rounded-full border border-orange-200">
            <ArrowLeft className="w-4 h-4" /> Back to Edit
          </Link>
          <div className="hidden md:flex items-center gap-2 text-lg font-bold tracking-wide text-orange-600">
            <Sparkles className="w-5 h-5 text-yellow-500" /> RitualEase Magic
          </div>
        </div>
        
        {/* Festive Progress Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-800/40">Step 2 of 3</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]"></div>
            <div className="w-10 h-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 shadow-[0_0_10px_rgba(249,115,22,0.3)]"></div>
            <div className="w-3 h-2 rounded-full bg-orange-200"></div>
          </div>
        </div>
      </header>

      {/* Main Preview Area */}
      <main className="flex-1 relative z-10 pt-28 p-6 md:p-10 flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto w-full">
        
        {/* Canvas Area (Left) */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 px-4">
            <h2 className="text-3xl font-bold flex items-center gap-3 text-[#5C2B09] font-display">
              <Sparkles className="w-6 h-6 text-orange-500" /> Your Masterpiece
            </h2>
            
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-3xl border border-orange-100 rounded-full px-5 py-2.5 shadow-sm">
              <Palette className="w-4 h-4 text-orange-500" />
              <select 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-transparent text-sm font-bold focus:outline-none text-orange-900 cursor-pointer"
              >
                <optgroup label="Festive & Joyful Designs" className="bg-[#FFFBF0]">
                  <option value="haldi_marigold">Traditional Haldi</option>
                  <option value="watercolor_florals">Watercolor Florals</option>
                  <option value="rose_gold_brush">Rose Gold Brushstrokes</option>
                  <option value="tropical_palm">Tropical Palm</option>
                  <option value="boho_pampas">Boho Pampas Grass</option>
                  <option value="lotus_pond">Lotus Pond</option>
                </optgroup>
                <optgroup label="Other Premium Designs" className="bg-[#FFFBF0]">
                  <option value="royal_rajput">Royal Rajput Archway</option>
                  <option value="golden_mandala">Golden Mandala</option>
                  <option value="emerald_foil">Emerald & Gold Foil</option>
                  <option value="classic_damask">Classic Damask</option>
                  <option value="peacock_majesty">Peacock Majesty</option>
                  <option value="vintage_lace">Vintage Lace</option>
                  <option value="art_deco">Art Deco Gatsby</option>
                  <option value="celestial">Celestial Night</option>
                  <option value="minimalist_botanical">Minimalist Botanical</option>
                  <option value="gothic_romance">Gothic Romance</option>
                  <option value="rustic_wood">Rustic Wood & Lights</option>
                  <option value="modern_clean">Modern Clean</option>
                  <option value="pearl_ribbon">Pearl & Ribbon</option>
                  <option value="geometric_marble">Geometric Marble</option>
                </optgroup>
              </select>
            </div>
          </div>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="w-full max-w-lg aspect-[3/4] relative group rounded-3xl"
          >
            {/* Festive Glow Behind Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-400/20 to-yellow-300/20 blur-[60px] rounded-full z-0 pointer-events-none" />

            <div className="absolute inset-0 shadow-[0_30px_60px_rgba(234,88,12,0.15)] border-8 border-white rounded-3xl overflow-hidden z-10" ref={cardRef}>
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
        <div className="w-full lg:w-[400px] flex flex-col gap-8 pt-10 lg:pt-0">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-3xl border border-orange-100 rounded-[2rem] p-8 shadow-xl relative overflow-hidden"
          >
            <h3 className="text-xl font-bold text-[#5C2B09] mb-6 flex items-center gap-3">
              <Download className="w-5 h-5 text-orange-500" /> Export Assets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handlePDFDownload}
                disabled={isDownloading}
                variant="outline"
                className="w-full h-auto flex flex-col py-8 rounded-2xl border-orange-200 bg-orange-50/50 hover:bg-orange-100 hover:border-orange-400 text-orange-900 transition-all duration-300 shadow-sm"
              >
                <span className="font-bold text-lg">{isDownloading ? '...' : 'PDF'}</span>
                <span className="text-[10px] text-orange-600 mt-1 uppercase tracking-widest font-bold">Print Ready</span>
              </Button>
              <Button 
                onClick={handleDownload} 
                disabled={isDownloading}
                variant="outline"
                className="w-full h-auto flex flex-col py-8 rounded-2xl border-orange-200 bg-orange-50/50 hover:bg-orange-100 hover:border-orange-400 text-orange-900 transition-all duration-300 shadow-sm"
              >
                <span className="font-bold text-lg">{isDownloading ? '...' : 'PNG'}</span>
                <span className="text-[10px] text-orange-600 mt-1 uppercase tracking-widest font-bold">High Res</span>
              </Button>
            </div>
            <Button variant="outline" className="w-full mt-4 h-14 rounded-xl border-orange-200 bg-transparent hover:bg-orange-50 text-orange-700 hover:text-orange-900 transition-all">
              <Video className="w-4 h-4 mr-2 text-orange-500" /> Generate Video Invite
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-3xl border border-orange-100 rounded-[2rem] p-8 shadow-xl"
          >
            <h3 className="text-xl font-bold text-[#5C2B09] mb-6 flex items-center gap-3">
              <Share2 className="w-5 h-5 text-orange-500" /> Share & RSVP
            </h3>
            <div className="space-y-4">
              <Button 
                onClick={handleWhatsAppShare}
                className="w-full justify-start bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 border border-[#25D366]/30 h-14 rounded-xl text-base font-bold transition-all shadow-sm"
              >
                Share on WhatsApp
              </Button>
              <Button variant="outline" className="w-full justify-start h-14 rounded-xl border-orange-200 bg-transparent hover:bg-orange-50 text-orange-700 hover:text-orange-900 transition-all">
                <QrCode className="w-4 h-4 mr-3" /> Get QR Code
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="w-full text-lg font-bold uppercase tracking-wide rounded-2xl h-16 bg-orange-600 hover:bg-orange-700 text-white shadow-[0_8px_20px_rgba(234,88,12,0.25)] hover:shadow-[0_12px_25px_rgba(234,88,12,0.35)] hover:-translate-y-1 transition-all duration-300 border-0">
              Publish & Manage RSVPs
            </Button>
          </motion.div>
        </div>

      </main>
      
    </div>
  );
}
