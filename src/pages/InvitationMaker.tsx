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
  "Create an elegant, minimalist botanical invitation for our intimate wedding...",
  "Modern Indian reception invite with subtle gold geometric lines...",
  "Sophisticated ivory and sage green engagement announcement..."
];

const PREVIEW_THEMES = ["minimalist_botanical", "modern_clean", "pearl_ribbon", "geometric_marble"];

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
  const [manualTheme, setManualTheme] = useState("minimalist_botanical");

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
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A3B32] flex flex-col relative overflow-hidden font-sans selection:bg-[#EAE0D5]/50">
      
      {/* Subtle Ambient Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#F2EBE1]/60 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#EAE0D5]/40 rounded-full blur-[120px] pointer-events-none" />

      <MinimalistHennaOverlay />

      {/* Elegant Minimalist Toolbar */}
      <header className="fixed top-0 w-full z-50 px-8 py-5 flex items-center justify-between border-b border-[#EAE0D5] bg-[#FDFBF7]/90 backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-[#4A3B32]/60 hover:text-[#4A3B32] transition-colors font-medium text-sm bg-white hover:bg-[#F2EBE1] px-5 py-2.5 rounded-full border border-[#EAE0D5]">
            <ArrowLeft className="w-4 h-4" /> Back to Studio
          </Link>
          <div className="hidden md:flex items-center gap-2 text-sm font-semibold tracking-widest text-[#4A3B32]/80 uppercase">
            <Sparkles className="w-4 h-4 text-[#C19B76]" /> RitualEase Elegance
          </div>
        </div>
        
        {/* Minimal Progress Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#4A3B32]/40">Step 1 of 3</span>
          <div className="flex items-center gap-2">
            <div className="w-10 h-1 rounded-full bg-[#C19B76]"></div>
            <div className="w-3 h-1 rounded-full bg-[#EAE0D5]"></div>
            <div className="w-3 h-1 rounded-full bg-[#EAE0D5]"></div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 w-full pt-24 flex flex-col lg:flex-row relative z-10">
        
        {/* Left Side: Inspiration Carousel */}
        <div className="hidden lg:flex w-[45%] items-center justify-center p-12 relative overflow-hidden">
          <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">

            <AnimatePresence mode="wait">
              <motion.div
                key={previewThemeIndex}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full aspect-[3/4] overflow-hidden relative z-10 shadow-[0_20px_50px_rgba(74,59,50,0.06)] border border-[#EAE0D5] bg-white rounded-md"
              >
                <InvitationCard 
                  themeId={PREVIEW_THEMES[previewThemeIndex]}
                  title="Sarah & James"
                  subtitle="Request the pleasure of your company"
                  date="October 15, 2026"
                  venue="The Botanical Gardens"
                />
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 text-center relative z-10">
              <h2 className="text-2xl font-normal font-serif text-[#4A3B32] tracking-wide">Modern Minimalist</h2>
              <p className="text-[#4A3B32]/40 mt-2 font-semibold tracking-widest uppercase text-[10px]">Pure, Refined Elegance</p>
            </div>
          </div>
        </div>

        {/* Right Side: The Magic Wizard */}
        <div className="flex-1 flex flex-col p-6 lg:p-12 xl:p-20 overflow-y-auto">
          <div className="max-w-2xl w-full mx-auto">
            
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-serif font-normal mb-6 text-[#4A3B32] leading-tight">
                Design with <br/>
                <span className="italic text-[#C19B76]">
                  Delicate Precision
                </span>
              </h1>
              <p className="text-[#4A3B32]/60 text-xl font-light leading-relaxed">
                Describe your sophisticated event. Our AI will curate an invitation defined by clean lines and subtle luxury.
              </p>
            </div>

            {/* Elegant Mode Switcher */}
            <div className="bg-white/60 backdrop-blur-md border border-[#EAE0D5] rounded-xl p-1.5 mb-10 flex shadow-sm">
              <button 
                className={`flex-1 py-3.5 rounded-lg text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${mode === 'ai' ? 'bg-white text-[#4A3B32] shadow-sm border border-[#EAE0D5]' : 'text-[#4A3B32]/40 hover:text-[#4A3B32]'}`}
                onClick={() => setMode('ai')}
              >
                <Wand2 className="w-4 h-4 text-[#C19B76]" /> AI Generator
              </button>
              <button 
                className={`flex-1 py-3.5 rounded-lg text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${mode === 'manual' ? 'bg-white text-[#4A3B32] shadow-sm border border-[#EAE0D5]' : 'text-[#4A3B32]/40 hover:text-[#4A3B32]'}`}
                onClick={() => setMode('manual')}
              >
                <PenTool className="w-4 h-4" /> Manual Entry
              </button>
            </div>

            <AnimatePresence mode="wait">
              {mode === 'ai' ? (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className="relative group">
                    <div className="relative bg-white border border-[#EAE0D5] group-focus-within:border-[#C19B76] rounded-xl shadow-sm transition duration-300 overflow-hidden">
                      <div className="px-6 py-4 border-b border-[#EAE0D5]/50 flex items-center justify-between bg-[#FDFBF7]/50">
                        <Label htmlFor="prompt" className="text-[10px] uppercase tracking-widest text-[#C19B76] font-bold flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5" /> Event Vision
                        </Label>
                        <Zap className="w-3.5 h-3.5 text-[#4A3B32]/20" />
                      </div>
                      <Textarea 
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. Create a highly minimal ivory invitation for Sarah. Focus on clean serif typography and very subtle botanical accents..."
                        className="min-h-[220px] text-lg font-light bg-transparent border-0 focus-visible:ring-0 text-[#4A3B32] p-6 resize-none placeholder:text-[#4A3B32]/30 leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(suggestion)}
                        className="text-xs font-medium text-[#4A3B32]/60 bg-white hover:bg-[#F2EBE1] hover:text-[#4A3B32] border border-[#EAE0D5] px-4 py-2.5 rounded-full transition-all duration-300 text-left max-w-full truncate shadow-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>

                  <div className="pt-6">
                    <Button 
                      size="lg" 
                      onClick={handleGenerate}
                      disabled={isGenerating || !prompt}
                      className="w-full h-14 rounded-xl text-sm font-semibold tracking-widest uppercase bg-[#4A3B32] hover:bg-[#382b24] text-[#FDFBF7] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border-0"
                    >
                      {isGenerating ? (
                        <span className="flex items-center gap-3">
                          <Sparkles className="w-4 h-4 animate-spin text-[#C19B76]" /> Curating Design...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3">
                          Generate Invitation <ArrowRight className="w-4 h-4 text-[#C19B76]" />
                        </span>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white border border-[#EAE0D5] rounded-xl p-8 space-y-8 shadow-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-[#4A3B32]/50 font-bold tracking-widest uppercase text-[9px]">Event Title / Hosts *</Label>
                      <Input value={manualTitle} onChange={e => setManualTitle(e.target.value)} className="bg-[#FDFBF7] border-[#EAE0D5] focus:border-[#C19B76] text-[#4A3B32] h-12 rounded-lg px-4 shadow-sm" placeholder="e.g. Sarah & James" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#4A3B32]/50 font-bold tracking-widest uppercase text-[9px]">Subtitle (Optional)</Label>
                      <Input value={manualSubtitle} onChange={e => setManualSubtitle(e.target.value)} className="bg-[#FDFBF7] border-[#EAE0D5] focus:border-[#C19B76] text-[#4A3B32] h-12 rounded-lg px-4 shadow-sm" placeholder="e.g. Request your presence" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#4A3B32]/50 font-bold tracking-widest uppercase text-[9px]">Date & Time *</Label>
                      <Input value={manualDate} onChange={e => setManualDate(e.target.value)} className="bg-[#FDFBF7] border-[#EAE0D5] focus:border-[#C19B76] text-[#4A3B32] h-12 rounded-lg px-4 shadow-sm" placeholder="e.g. October 15, 2026" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[#4A3B32]/50 font-bold tracking-widest uppercase text-[9px]">Venue / Location *</Label>
                      <Input value={manualVenue} onChange={e => setManualVenue(e.target.value)} className="bg-[#FDFBF7] border-[#EAE0D5] focus:border-[#C19B76] text-[#4A3B32] h-12 rounded-lg px-4 shadow-sm" placeholder="e.g. The Botanical Gardens" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-[#4A3B32]/50 font-bold tracking-widest uppercase text-[9px]">Theme</Label>
                      <select 
                        value={manualTheme}
                        onChange={(e) => setManualTheme(e.target.value)}
                        className="w-full bg-[#FDFBF7] border border-[#EAE0D5] focus:border-[#C19B76] text-[#4A3B32] h-12 rounded-lg px-4 shadow-sm outline-none"
                      >
                        <optgroup label="Minimal & Clean Designs">
                          <option value="minimalist_botanical">Minimalist Botanical</option>
                          <option value="modern_clean">Modern Clean</option>
                          <option value="pearl_ribbon">Pearl & Ribbon</option>
                          <option value="geometric_marble">Geometric Marble</option>
                        </optgroup>
                        <optgroup label="Other Premium Designs">
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
                  <div className="pt-6">
                    <Button 
                      size="lg" 
                      onClick={handleManualSubmit}
                      className="w-full h-14 rounded-xl text-sm font-semibold tracking-widest uppercase bg-[#4A3B32] hover:bg-[#382b24] text-[#FDFBF7] shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Continue to Design <ArrowRight className="ml-2 w-4 h-4 text-[#C19B76]" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </main>

      {/* Minimalist Loading Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#FDFBF7]/98 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 border-2 border-[#EAE0D5] border-t-[#C19B76] rounded-full mb-8"
              />
              <h2 className="text-2xl font-serif text-[#4A3B32] mb-3 tracking-wide">Refining Details...</h2>
              <p className="text-[#4A3B32]/40 font-bold tracking-widest uppercase text-[10px]">Curating minimalist vectors</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
