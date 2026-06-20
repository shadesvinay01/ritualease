import { useState, useRef, useEffect } from "react";
import { Sparkles, Download, Share2, ArrowLeft, Palette, QrCode, Video, PenLine, Plus, ChevronLeft, ChevronRight, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { InvitationCard } from "@/components/ritual/InvitationCard";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

// Royal Gold Dust particles
const FloatingGoldDust = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(251,191,36,1) 0%, rgba(217,119,6,0) 100%)",
            boxShadow: "0 0 10px rgba(251,191,36,0.8)"
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: Math.random() * 2,
            opacity: Math.random() * 0.5 + 0.2,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            x: [null, Math.random() * 40 - 20],
            opacity: [null, 0.9, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default function InvitationPreview() {
  const [events, setEvents] = useState<any[]>([{
    title: "Aarav & Priya",
    subtitle: "Joyfully invite you",
    date: "October 15, 2026",
    venue: "The Palace Gardens",
    theme_id: "royal_rajput"
  }]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [musicTrack, setMusicTrack] = useState("royal_shehnai");
  const [isDownloading, setIsDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('generatedEvent');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        setEvents(parsed);
      } else {
        setEvents([{ ...parsed, theme_id: parsed.theme_id || "royal_rajput" }]);
      }
    }
    const savedMusic = localStorage.getItem('selectedMusic');
    if (savedMusic) {
      setMusicTrack(savedMusic);
    }
  }, []);

  const handleUpdateEventData = (field: string, value: string) => {
    const newEvents = [...events];
    newEvents[currentIndex] = { ...newEvents[currentIndex], [field]: value };
    setEvents(newEvents);
    localStorage.setItem('generatedEvent', JSON.stringify(newEvents));
  };

  const handleThemeChange = (newTheme: string) => {
    handleUpdateEventData('theme_id', newTheme);
  };

  const handleMusicChange = (newMusic: string) => {
    setMusicTrack(newMusic);
    localStorage.setItem('selectedMusic', newMusic);
  };

  const handleAddEvent = () => {
    const newEvents = [...events, {
      title: events[0]?.title || "New Event",
      subtitle: "Join us for",
      date: "",
      venue: "",
      theme_id: events[currentIndex]?.theme_id || "royal_rajput"
    }];
    setEvents(newEvents);
    setCurrentIndex(newEvents.length - 1);
    localStorage.setItem('generatedEvent', JSON.stringify(newEvents));
  };

  const handleNextEvent = () => {
    setCurrentIndex(prev => Math.min(prev + 1, events.length - 1));
  };

  const handlePrevEvent = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const currentEvent = events[currentIndex] || events[0];

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 });
      const link = document.createElement('a');
      link.download = `invitation-${currentEvent.title.replace(/\s+/g, '-')}-part${currentIndex+1}.png`;
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
      pdf.save(`invitation-${currentEvent.title.replace(/\s+/g, '-')}-part${currentIndex+1}.pdf`);
    } catch (err) {
      console.error('Failed to download PDF', err);
      alert('Failed to generate PDF.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleWhatsAppShare = () => {
    const message = `You're invited! 🎊\n\n*${currentEvent.title}*\n${currentEvent.subtitle}\n\n📅 ${currentEvent.date}\n📍 ${currentEvent.venue}\n\nWe can't wait to celebrate with you!`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#2A0800] text-[#FFF6E5] flex flex-col relative overflow-hidden font-serif selection:bg-amber-500/30">
      
      {/* Traditional Pattern Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-color-dodge"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23fbbf24\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}
      />

      {/* Royal Ambient Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/40 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-amber-900/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-yellow-900/20 rounded-full blur-[150px] pointer-events-none" />

      <FloatingGoldDust />

      {/* Majestic Toolbar */}
      <header className="fixed top-0 w-full z-50 px-8 py-5 flex items-center justify-between border-b border-amber-500/20 bg-[#2A0800]/80 backdrop-blur-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-8">
          <Link to="/invitation-maker" className="flex items-center gap-2 text-amber-500/80 hover:text-amber-400 transition-colors font-medium text-sm bg-black/20 hover:bg-black/40 px-5 py-2.5 rounded-full border border-amber-500/30 font-sans uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Back to Edit
          </Link>
          <div className="hidden md:flex items-center gap-3 text-lg font-semibold tracking-widest text-amber-500 uppercase">
            <Sparkles className="w-5 h-5" /> RitualEase
          </div>
        </div>
        
        {/* Royal Progress Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500/60 font-sans">Step 2 of 3</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-200 shadow-[0_0_15px_rgba(251,191,36,0.6)]"></div>
            <div className="w-3 h-1.5 rounded-full bg-amber-900/50"></div>
          </div>
        </div>
      </header>

      {/* Main Preview Area */}
      <main className="flex-1 relative z-10 pt-28 p-6 md:p-10 flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto w-full">
        
        {/* Canvas Area (Left) */}
        <div className="flex-1 flex flex-col items-center">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 px-4">
            <h2 className="text-3xl font-light tracking-widest flex items-center gap-3 text-amber-400">
              <Sparkles className="w-6 h-6 text-amber-500" /> Your Masterpiece
            </h2>
            
            <div className="flex items-center gap-3 bg-[#1A0500]/80 backdrop-blur-3xl border border-amber-500/20 rounded-full px-5 py-2.5 shadow-2xl">
              <Palette className="w-4 h-4 text-amber-400" />
              <select 
                value={currentEvent.theme_id || "royal_rajput"}
                onChange={(e) => handleThemeChange(e.target.value)}
                className="bg-transparent text-sm font-sans font-medium focus:outline-none text-amber-50 cursor-pointer"
              >
                <optgroup label="Premium Vector Designs" className="bg-[#2A0800] text-amber-50">
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
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="w-full max-w-lg aspect-[3/4] relative group"
          >
            {/* Archway Frame behind Card */}
            <div className="absolute inset-[-40px] border-[3px] border-amber-500/20 rounded-t-[200px] rounded-b-xl z-0 pointer-events-none"></div>
            <div className="absolute inset-[-20px] border border-amber-500/40 rounded-t-[180px] rounded-b-lg z-0 pointer-events-none"></div>

            <div className="absolute inset-0 shadow-[0_30px_80px_rgba(0,0,0,0.8)] border-4 border-[#3a0a00] rounded-xl overflow-hidden z-10" ref={cardRef}>
              <div className="absolute inset-0 border-2 border-amber-400/50 rounded-xl z-20 pointer-events-none"></div>
              <InvitationCard 
                themeId={currentEvent.theme_id || "royal_rajput"}
                title={currentEvent.title}
                subtitle={currentEvent.subtitle}
                date={currentEvent.date}
                venue={currentEvent.venue}
              />
            </div>
          </motion.div>

          {/* Storybook Pagination */}
          <div className="flex items-center gap-4 mt-8">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handlePrevEvent} 
              disabled={currentIndex === 0}
              className="rounded-full bg-[#1A0500]/80 border-amber-500/30 text-amber-500 hover:bg-amber-900/40"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="text-amber-500/80 font-bold font-sans text-xs tracking-widest uppercase">
              Event {currentIndex + 1} of {events.length}
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleNextEvent} 
              disabled={currentIndex === events.length - 1}
              className="rounded-full bg-[#1A0500]/80 border-amber-500/30 text-amber-500 hover:bg-amber-900/40"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Tools Area (Right) */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6 font-sans pt-10 lg:pt-0 pb-20">
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-[#1A0500]/80 backdrop-blur-3xl border border-amber-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-serif tracking-widest text-amber-400 flex items-center gap-3">
                <PenLine className="w-5 h-5 text-amber-500" /> Customize Text
              </h3>
              <Button onClick={handleAddEvent} size="sm" variant="outline" className="bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20 text-xs tracking-widest uppercase">
                <Plus className="w-3 h-3 mr-1" /> Add Event
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] uppercase tracking-widest text-amber-500/60 font-bold mb-1 block">Names / Title</label>
                <input 
                  type="text" 
                  value={currentEvent.title} 
                  onChange={(e) => handleUpdateEventData('title', e.target.value)}
                  className="w-full bg-black/20 border border-amber-500/20 rounded-xl px-4 py-2.5 text-amber-50 focus:outline-none focus:border-amber-400 font-serif text-lg"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-amber-500/60 font-bold mb-1 block">Subtitle</label>
                <input 
                  type="text" 
                  value={currentEvent.subtitle} 
                  onChange={(e) => handleUpdateEventData('subtitle', e.target.value)}
                  className="w-full bg-black/20 border border-amber-500/20 rounded-xl px-4 py-2.5 text-amber-50 focus:outline-none focus:border-amber-400 font-serif text-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-amber-500/60 font-bold mb-1 block">Date</label>
                  <input 
                    type="text" 
                    value={currentEvent.date} 
                    onChange={(e) => handleUpdateEventData('date', e.target.value)}
                    className="w-full bg-black/20 border border-amber-500/20 rounded-xl px-4 py-2.5 text-amber-50 focus:outline-none focus:border-amber-400 font-serif text-sm"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-amber-500/60 font-bold mb-1 block">Venue</label>
                  <input 
                    type="text" 
                    value={currentEvent.venue} 
                    onChange={(e) => handleUpdateEventData('venue', e.target.value)}
                    className="w-full bg-black/20 border border-amber-500/20 rounded-xl px-4 py-2.5 text-amber-50 focus:outline-none focus:border-amber-400 font-serif text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Background Music Selector */}
            <div className="mt-6 pt-6 border-t border-amber-500/20">
              <h3 className="text-sm font-bold tracking-widest text-amber-500/80 mb-3 uppercase flex items-center gap-2">
                <Music className="w-4 h-4" /> Background Audio
              </h3>
              <select 
                value={musicTrack}
                onChange={(e) => handleMusicChange(e.target.value)}
                className="w-full bg-black/20 border border-amber-500/20 rounded-xl px-4 py-3 text-amber-50 focus:outline-none focus:border-amber-400 font-sans text-sm cursor-pointer"
              >
                <option value="none">No Music</option>
                <option value="royal_shehnai">Royal Shehnai Welcome</option>
                <option value="sitar_lounge">Ambient Sitar Lounge</option>
                <option value="festive_dhol">Festive Wedding Dhol</option>
                <option value="soft_piano">Romantic Piano</option>
              </select>
              <div className="mt-2 text-[10px] text-amber-500/50 uppercase tracking-widest">
                Plays automatically when guests open your link
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#1A0500]/80 backdrop-blur-3xl border border-amber-500/20 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <h3 className="text-xl font-serif tracking-widest text-amber-400 mb-6 flex items-center gap-3">
              <Download className="w-5 h-5 text-amber-500" /> Export Assets
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                onClick={handlePDFDownload}
                disabled={isDownloading}
                variant="outline"
                className="w-full h-auto flex flex-col py-8 rounded-xl border-amber-500/20 bg-black/20 hover:bg-amber-900/40 hover:border-amber-400 text-amber-50 transition-all duration-300"
              >
                <span className="font-bold text-lg">{isDownloading ? '...' : 'PDF'}</span>
                <span className="text-[10px] text-amber-500/60 mt-1 uppercase tracking-widest font-bold">Print Ready</span>
              </Button>
              <Button 
                onClick={handleDownload} 
                disabled={isDownloading}
                variant="outline"
                className="w-full h-auto flex flex-col py-8 rounded-xl border-amber-500/20 bg-black/20 hover:bg-amber-900/40 hover:border-amber-400 text-amber-50 transition-all duration-300"
              >
                <span className="font-bold text-lg">{isDownloading ? '...' : 'PNG'}</span>
                <span className="text-[10px] text-amber-500/60 mt-1 uppercase tracking-widest font-bold">High Res</span>
              </Button>
            </div>
            <Button variant="outline" className="w-full mt-4 h-14 rounded-xl border-amber-500/20 bg-transparent hover:bg-amber-900/40 text-amber-200/80 hover:text-amber-50 transition-all">
              <Video className="w-4 h-4 mr-2 text-amber-500" /> Generate Video Invite
            </Button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-[#1A0500]/80 backdrop-blur-3xl border border-amber-500/20 rounded-2xl p-8 shadow-2xl"
          >
            <h3 className="text-xl font-serif tracking-widest text-amber-400 mb-6 flex items-center gap-3">
              <Share2 className="w-5 h-5 text-amber-500" /> Share & RSVP
            </h3>
            <div className="space-y-4">
              <Button 
                onClick={handleWhatsAppShare}
                className="w-full justify-start bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366]/30 border border-[#25D366]/30 h-14 rounded-xl text-base font-medium transition-all"
              >
                Share on WhatsApp
              </Button>
              <Button variant="outline" className="w-full justify-start h-14 rounded-xl border-amber-500/20 bg-transparent hover:bg-amber-900/40 text-amber-200/80 hover:text-amber-50 transition-all">
                <QrCode className="w-4 h-4 mr-3" /> Get QR Code
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="w-full text-lg font-bold tracking-widest uppercase rounded-xl h-16 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-yellow-500 hover:to-amber-500 text-[#2A0800] shadow-[0_0_30px_rgba(251,191,36,0.3)] hover:shadow-[0_0_50px_rgba(251,191,36,0.5)] transition-all duration-500 border-0">
              Publish & Manage RSVPs
            </Button>
          </motion.div>
        </div>

      </main>
      
    </div>
  );
}
