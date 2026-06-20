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
  "Tropical beach party invitation with a minimalist aesthetic...",
  "Traditional Haldi ceremony with beautiful marigold florals..."
];

const PREVIEW_THEMES = ["minimalist_botanical", "watercolor_florals", "rose_gold_brush", "pearl_ribbon"];

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
  const [manualTheme, setManualTheme] = useState("luxury_gold");

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
    <div className="min-h-screen bg-[#FCFBF8] text-[#2C2825] flex flex-col relative overflow-hidden font-sans selection:bg-rose-200/50">
      
      {/* Editorial Ambient Backgrounds */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-100/50 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-amber-50/50 rounded-full blur-[120px] pointer-events-none" />

      {/* Elegant Editorial Toolbar */}
      <header className="fixed top-0 w-full z-50 px-8 py-5 flex items-center justify-between border-b border-[#2C2825]/5 bg-white/70 backdrop-blur-3xl">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-[#2C2825]/60 hover:text-rose-600 transition-colors font-medium text-sm bg-white hover:bg-rose-50 px-5 py-2.5 rounded-full border border-[#2C2825]/5 shadow-sm">
            <ArrowLeft className="w-4 h-4" /> Exit Studio
          </Link>
          <div className="hidden md:flex items-center gap-2 text-sm font-semibold tracking-widest text-[#2C2825]/80 uppercase">
            <Sparkles className="w-4 h-4 text-rose-400" /> RitualEase Magic Studio
          </div>
        </div>
        
        {/* Editorial Progress Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2C2825]/40">Step 1 of 3</span>
          <div className="flex items-center gap-2">
            <div className="w-10 h-1 rounded-full bg-gradient-to-r from-rose-300 to-rose-400"></div>
            <div className="w-3 h-1 rounded-full bg-[#2C2825]/10"></div>
            <div className="w-3 h-1 rounded-full bg-[#2C2825]/10"></div>
          </div>
        </div>
      </header>

      {/* Main Split-Screen Layout */}
      <main className="flex-1 w-full pt-24 flex flex-col lg:flex-row relative z-10">
        
        {/* Left Side: Inspiration Carousel */}
        <div className="hidden lg:flex w-[45%] items-center justify-center p-12 relative overflow-hidden">
          <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">

            <AnimatePresence mode="wait">
              <motion.div
                key={previewThemeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative z-10 shadow-[0_30px_60px_rgba(44,40,37,0.08)] border border-white"
              >
                <InvitationCard 
                  themeId={PREVIEW_THEMES[previewThemeIndex]}
                  title="Aarav & Priya"
                  subtitle="Joyfully invite you"
                  date="October 15, 2026"
                  venue="The Palace Gardens"
                />
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 text-center relative z-10">
              <h2 className="font-display text-4xl font-light tracking-wide text-[#2C2825]">Editorial Perfection</h2>
              <p className="text-[#2C2825]/40 mt-3 font-semibold tracking-widest uppercase text-[10px]">Powered by vector mathematics</p>
            </div>
          </div>
        </div>

        {/* Right Side: The Magic Wizard */}
        <div className="flex-1 flex flex-col p-6 lg:p-12 xl:p-20 overflow-y-auto">
          <div className="max-w-2xl w-full mx-auto">
            
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-light font-display mb-6 text-[#2C2825] leading-tight">
                Design with <br/><span className="italic font-normal text-rose-500">Pure Elegance</span>
              </h1>
              <p className="text-[#2C2825]/60 text-xl font-light leading-relaxed">
                Describe your dream invitation. Our AI will instantly construct a pristine, editorial-quality vector design.
              </p>
            </div>

            {/* Premium Mode Switcher */}
            <div className="bg-white/50 backdrop-blur-md border border-[#2C2825]/5 rounded-2xl p-1.5 mb-10 flex shadow-sm">
              <button 
                className={`flex-1 py-3.5 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-500 ${mode === 'ai' ? 'bg-white text-[#2C2825] shadow-sm border border-[#2C2825]/5' : 'text-[#2C2825]/40 hover:text-[#2C2825]'}`}
                onClick={() => setMode('ai')}
              >
                <Wand2 className="w-4 h-4 text-rose-400" /> AI Generator
              </button>
              <button 
                className={`flex-1 py-3.5 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-500 ${mode === 'manual' ? 'bg-white text-[#2C2825] shadow-sm border border-[#2C2825]/5' : 'text-[#2C2825]/40 hover:text-[#2C2825]'}`}
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
                    {/* Soft Glow on Focus */}
                    <div className="absolute -inset-1 bg-rose-200 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-50 transition duration-1000"></div>
                    
                    {/* Editorial Box */}
                    <div className="relative bg-white/90 backdrop-blur-xl border border-[#2C2825]/10 group-focus-within:border-rose-300 rounded-[2rem] p-3 shadow-xl transition duration-500">
                      <div className="px-6 py-4 border-b border-[#2C2825]/5 flex items-center justify-between">
                        <Label htmlFor="prompt" className="text-xs uppercase tracking-widest text-rose-500 font-bold flex items-center gap-3">
                          <Sparkles className="w-3.5 h-3.5" /> Event Prompt
                        </Label>
                        <Zap className="w-4 h-4 text-[#2C2825]/20" />
                      </div>
                      <Textarea 
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. Create a minimalist botanical wedding invitation for Sarah and James. We need it to be deeply elegant..."
                        className="min-h-[240px] text-xl md:text-2xl font-display font-normal bg-transparent border-0 focus-visible:ring-0 text-[#2C2825] rounded-3xl p-6 resize-none placeholder:text-[#2C2825]/20 leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-3">
                    {SUGGESTIONS.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(suggestion)}
                        className="text-xs font-medium tracking-wide text-[#2C2825]/60 bg-white hover:bg-rose-50 hover:text-rose-700 border border-[#2C2825]/10 px-5 py-3 rounded-full transition-all duration-300 text-left max-w-full truncate shadow-sm hover:shadow-md"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  <div className="pt-8">
                    <Button 
                      size="lg" 
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt}
                      className="w-full h-16 rounded-2xl text-lg font-bold bg-[#2C2825] hover:bg-[#1A1816] text-white shadow-xl hover:shadow-2xl transition-all duration-500 border-0 group overflow-hidden relative"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
                      
                      {isGenerating ? (
                        <span className="flex items-center gap-3 relative z-20">
                          <Sparkles className="w-5 h-5 animate-spin text-rose-300" /> Designing your masterpiece...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3 relative z-20 text-rose-50">
                          Create Invitation <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 text-rose-300" />
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
                  className="bg-white/90 backdrop-blur-xl border border-[#2C2825]/10 rounded-[2rem] p-10 space-y-8 shadow-xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-[#2C2825]/50 font-bold tracking-wide uppercase text-[10px]">Event Title / Hosts *</Label>
                      <Input value={manualTitle} onChange={e => setManualTitle(e.target.value)} className="bg-white border-[#2C2825]/10 focus:border-rose-300 text-[#2C2825] h-14 rounded-xl px-4 shadow-sm" placeholder="e.g. Sarah & James" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[#2C2825]/50 font-bold tracking-wide uppercase text-[10px]">Subtitle (Optional)</Label>
                      <Input value={manualSubtitle} onChange={e => setManualSubtitle(e.target.value)} className="bg-white border-[#2C2825]/10 focus:border-rose-300 text-[#2C2825] h-14 rounded-xl px-4 shadow-sm" placeholder="e.g. Joyfully invite you" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[#2C2825]/50 font-bold tracking-wide uppercase text-[10px]">Date & Time *</Label>
                      <Input value={manualDate} onChange={e => setManualDate(e.target.value)} className="bg-white border-[#2C2825]/10 focus:border-rose-300 text-[#2C2825] h-14 rounded-xl px-4 shadow-sm" placeholder="e.g. December 20, 2026" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-[#2C2825]/50 font-bold tracking-wide uppercase text-[10px]">Venue / Location *</Label>
                      <Input value={manualVenue} onChange={e => setManualVenue(e.target.value)} className="bg-white border-[#2C2825]/10 focus:border-rose-300 text-[#2C2825] h-14 rounded-xl px-4 shadow-sm" placeholder="e.g. The Grand Hotel, Delhi" />
                    </div>
                    <div className="space-y-3 md:col-span-2">
                      <Label className="text-[#2C2825]/50 font-bold tracking-wide uppercase text-[10px]">Theme</Label>
                      <select 
                        value={manualTheme}
                        onChange={(e) => setManualTheme(e.target.value)}
                        className="w-full bg-white border border-[#2C2825]/10 focus:border-rose-300 text-[#2C2825] h-14 rounded-xl px-4 shadow-sm outline-none"
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
                      className="w-full h-14 rounded-xl font-bold bg-[#2C2825] hover:bg-[#1A1816] text-white shadow-lg transition-all duration-300"
                    >
                      Continue to Design <ArrowRight className="ml-2 w-5 h-5 text-rose-300" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </main>

      {/* Light Luxury Loading Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#FCFBF8]/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Soft Orb */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-96 h-96 bg-rose-200 rounded-full blur-[100px]"
            />
            
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-t-2 border-r-2 border-rose-400 rounded-full mb-10"
              />
              <h2 className="text-4xl font-display font-light text-[#2C2825] mb-4 tracking-wide">Designing Masterpiece</h2>
              <p className="text-rose-500 font-bold tracking-widest uppercase text-xs">Synthesizing mathematical vectors...</p>
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
