import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Wand2, Zap, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationCard } from "@/components/ritual/InvitationCard";

const SUGGESTIONS = [
  "Create a Royal Rajput Wedding invite for Aarav and Priya in Jaipur...",
  "Traditional Haldi ceremony with beautiful marigold florals...",
  "Elegant South Indian wedding in Kerala backwaters..."
];

const PREVIEW_THEMES = ["royal_rajput", "golden_mandala", "emerald_foil", "classic_damask"];

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

export default function InvitationMaker() {
  const [mode, setMode] = useState<"ai" | "manual">("ai");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewThemeIndex, setPreviewThemeIndex] = useState(0);
  
  // Manual Entry States
  const [manualTitle, setManualTitle] = useState("");
  const [manualSubtitle, setManualSubtitle] = useState("Joyfully invite you to celebrate");
  const [manualDate, setManualDate] = useState("");
  const [manualVenue, setManualVenue] = useState("");
  const [manualTheme, setManualTheme] = useState("royal_rajput");

  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setPreviewThemeIndex((prev) => (prev + 1) % PREVIEW_THEMES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleGenerate = async () => {
    if (!prompt.trim() && mode === 'ai') return;
    setIsGenerating(true);
    
    try {
      const res = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      
      if (!res.ok) throw new Error("Failed to generate");
      
      const data = await res.json();
      localStorage.setItem('generatedEvent', JSON.stringify(data));
      navigate('/invitation-preview');
    } catch (err) {
      console.error(err);
      alert("Failed to connect to AI Studio. Is the backend running on port 8000?");
      setIsGenerating(false);
    }
  };

  const handleManualSubmit = () => {
    if (!manualTitle || !manualDate || !manualVenue) {
      alert("Please fill in the required fields (Title, Date, Venue).");
      return;
    }
    const data = {
      id: Date.now(),
      title: manualTitle,
      subtitle: manualSubtitle,
      date: manualDate,
      venue: manualVenue,
      theme_id: manualTheme
    };
    localStorage.setItem('generatedEvent', JSON.stringify(data));
    navigate('/invitation-preview');
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

      <FloatingGoldDust />

      {/* Majestic Toolbar */}
      <header className="fixed top-0 w-full z-50 px-8 py-5 flex items-center justify-between border-b border-amber-500/20 bg-[#2A0800]/80 backdrop-blur-3xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-amber-500/80 hover:text-amber-400 transition-colors font-medium text-sm bg-black/20 hover:bg-black/40 px-5 py-2.5 rounded-full border border-amber-500/30 font-sans uppercase tracking-widest">
            <ArrowLeft className="w-4 h-4" /> Return to Palace
          </Link>
          <div className="hidden md:flex items-center gap-3 text-lg font-semibold tracking-widest text-amber-500 uppercase">
            <Sparkles className="w-5 h-5" /> RitualEase
          </div>
        </div>
        
        {/* Royal Progress Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500/60 font-sans">Step 1 of 3</span>
          <div className="flex items-center gap-2">
            <div className="w-12 h-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-200 shadow-[0_0_15px_rgba(251,191,36,0.6)]"></div>
            <div className="w-3 h-1.5 rounded-full bg-amber-900/50"></div>
            <div className="w-3 h-1.5 rounded-full bg-amber-900/50"></div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 w-full pt-24 flex flex-col lg:flex-row relative z-10">
        
        {/* Left Side: Inspiration Carousel */}
        <div className="hidden lg:flex w-[45%] items-center justify-center p-12 relative overflow-hidden">
          <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">

            {/* Archway Frame behind Card */}
            <div className="absolute inset-[-40px] border-[3px] border-amber-500/20 rounded-t-[200px] rounded-b-xl z-0 pointer-events-none"></div>
            <div className="absolute inset-[-20px] border border-amber-500/40 rounded-t-[180px] rounded-b-lg z-0 pointer-events-none"></div>

            <AnimatePresence mode="wait">
              <motion.div
                key={previewThemeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
                className="w-full aspect-[3/4] overflow-hidden relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] border-4 border-[#3a0a00] rounded-xl"
              >
                {/* Gold inner border */}
                <div className="absolute inset-0 border-2 border-amber-400/50 rounded-xl z-20 pointer-events-none"></div>
                <InvitationCard 
                  themeId={PREVIEW_THEMES[previewThemeIndex]}
                  title="Aarav & Priya"
                  subtitle="Joyfully invite you"
                  date="October 15, 2026"
                  venue="The Palace Gardens"
                />
              </motion.div>
            </AnimatePresence>

            <div className="mt-16 text-center relative z-10">
              <h2 className="text-4xl font-light tracking-widest text-amber-400">Royal Heritage</h2>
              <p className="text-amber-500/60 mt-3 font-semibold tracking-widest uppercase text-xs font-sans">Crafted with precision</p>
            </div>
          </div>
        </div>

        {/* Right Side: The Magic Wizard */}
        <div className="flex-1 flex flex-col p-6 lg:p-12 xl:p-20 overflow-y-auto">
          <div className="max-w-2xl w-full mx-auto">
            
            <div className="mb-12 text-center lg:text-left">
              <h1 className="text-5xl md:text-6xl font-normal mb-6 text-[#FFF6E5] leading-tight">
                Design with <br/>
                <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500">
                  Majestic Elegance
                </span>
              </h1>
              <p className="text-amber-100/60 text-xl font-light leading-relaxed font-sans">
                Describe your grand celebration. Our AI will craft an invitation worthy of royalty.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="bg-black/20 backdrop-blur-md border border-amber-500/20 rounded-2xl p-1.5 mb-10 flex shadow-2xl font-sans">
              <button 
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-500 ${mode === 'ai' ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg border border-amber-500/30' : 'text-amber-500/50 hover:text-amber-400'}`}
                onClick={() => setMode('ai')}
              >
                <Wand2 className="w-4 h-4" /> AI Generator
              </button>
              <button 
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-500 ${mode === 'manual' ? 'bg-gradient-to-r from-amber-600 to-amber-800 text-white shadow-lg border border-amber-500/30' : 'text-amber-500/50 hover:text-amber-400'}`}
                onClick={() => setMode('manual')}
              >
                <PenTool className="w-4 h-4" /> Manual Entry
              </button>
            </div>

            <AnimatePresence mode="wait">
              {mode === 'ai' ? (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-8"
                >
                  <div className="relative group">
                    {/* Gold Box */}
                    <div className="relative bg-[#1A0500]/80 backdrop-blur-xl border-2 border-amber-500/20 group-focus-within:border-amber-400 rounded-2xl shadow-2xl transition duration-500 overflow-hidden">
                      <div className="px-6 py-4 border-b border-amber-500/10 flex items-center justify-between bg-black/20">
                        <Label htmlFor="prompt" className="text-xs uppercase tracking-widest text-amber-500 font-bold flex items-center gap-3 font-sans">
                          <Sparkles className="w-3.5 h-3.5" /> Your Event Details
                        </Label>
                        <Zap className="w-4 h-4 text-amber-500/30" />
                      </div>
                      <Textarea 
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. Create a royal wedding invitation for Sarah and James. We need it to feel incredibly luxurious, using deep reds and gold foil motifs..."
                        className="min-h-[240px] text-2xl font-serif font-normal bg-transparent border-0 focus-visible:ring-0 text-amber-50 rounded-none p-8 resize-none placeholder:text-amber-500/20 leading-relaxed italic"
                      />
                    </div>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-3 font-sans">
                    {SUGGESTIONS.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(suggestion)}
                        className="text-xs font-semibold tracking-wide text-amber-200/60 bg-black/20 hover:bg-amber-900/40 hover:text-amber-100 border border-amber-500/20 px-5 py-3 rounded-full transition-all duration-300 text-left max-w-full truncate shadow-lg"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  <div className="pt-8 font-sans">
                    <Button 
                      size="lg" 
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt}
                      className="w-full h-16 rounded-xl text-lg font-bold bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-400 hover:via-yellow-300 hover:to-amber-400 text-[#2A0800] shadow-[0_0_40px_rgba(251,191,36,0.2)] hover:shadow-[0_0_60px_rgba(251,191,36,0.4)] transition-all duration-500 border-0 group overflow-hidden relative"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />
                      
                      {isGenerating ? (
                        <span className="flex items-center gap-3 relative z-20">
                          <Sparkles className="w-5 h-5 animate-spin" /> Crafting Invitation...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3 relative z-20 uppercase tracking-widest">
                          Generate Magic <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-[#1A0500]/80 backdrop-blur-xl border-2 border-amber-500/20 rounded-2xl p-10 space-y-8 shadow-2xl font-sans"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-amber-500/60 font-bold tracking-widest uppercase text-[10px]">Event Title / Hosts *</Label>
                      <Input value={manualTitle} onChange={e => setManualTitle(e.target.value)} className="bg-black/20 border-amber-500/20 focus:border-amber-400 text-amber-50 h-14 rounded-xl px-4 font-serif text-lg" placeholder="e.g. Sarah & James" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-amber-500/60 font-bold tracking-widest uppercase text-[10px]">Subtitle (Optional)</Label>
                      <Input value={manualSubtitle} onChange={e => setManualSubtitle(e.target.value)} className="bg-black/20 border-amber-500/20 focus:border-amber-400 text-amber-50 h-14 rounded-xl px-4 font-serif text-lg" placeholder="e.g. Joyfully invite you" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-amber-500/60 font-bold tracking-widest uppercase text-[10px]">Date & Time *</Label>
                      <Input value={manualDate} onChange={e => setManualDate(e.target.value)} className="bg-black/20 border-amber-500/20 focus:border-amber-400 text-amber-50 h-14 rounded-xl px-4 font-serif text-lg" placeholder="e.g. December 20, 2026" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-amber-500/60 font-bold tracking-widest uppercase text-[10px]">Venue / Location *</Label>
                      <Input value={manualVenue} onChange={e => setManualVenue(e.target.value)} className="bg-black/20 border-amber-500/20 focus:border-amber-400 text-amber-50 h-14 rounded-xl px-4 font-serif text-lg" placeholder="e.g. The Grand Hotel, Delhi" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label className="text-amber-500/60 font-bold tracking-widest uppercase text-[10px]">Theme</Label>
                      <select 
                        value={manualTheme}
                        onChange={(e) => setManualTheme(e.target.value)}
                        className="w-full bg-[#1A0500] border border-amber-500/20 focus:border-amber-400 text-amber-50 h-14 rounded-xl px-4 font-serif text-lg outline-none"
                      >
                        <optgroup label="Premium Vector Designs">
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
                  <div className="pt-6">
                    <Button 
                      size="lg" 
                      onClick={handleManualSubmit}
                      className="w-full h-14 rounded-xl font-bold tracking-widest uppercase bg-gradient-to-r from-amber-500 to-yellow-500 text-[#2A0800] hover:opacity-90 shadow-lg transition-all duration-300"
                    >
                      Continue to Design <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </main>

      {/* Royal Loading Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1A0500]/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Soft Orb */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-96 h-96 bg-amber-600/30 rounded-full blur-[100px]"
            />
            
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-t-2 border-r-2 border-amber-400 rounded-full mb-10 shadow-[0_0_30px_rgba(251,191,36,0.3)]"
              />
              <h2 className="text-4xl font-serif font-light text-amber-100 mb-4 tracking-widest">Designing Masterpiece</h2>
              <p className="text-amber-500/80 font-bold tracking-widest uppercase text-xs font-sans">Synthesizing vectors...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
