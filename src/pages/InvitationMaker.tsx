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
  "Create a joyful Haldi ceremony invite for Priya with marigold florals...",
  "Bright and festive Mehendi celebration in saffron and pink...",
  "Traditional Sangeet night with vibrant energy and warm colors..."
];

const PREVIEW_THEMES = ["haldi_marigold", "watercolor_florals", "rose_gold_brush", "boho_pampas"];

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
  const [manualTheme, setManualTheme] = useState("haldi_marigold");

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
    <div className="min-h-screen bg-[#FFFBF0] text-[#5C2B09] flex flex-col relative overflow-hidden font-sans selection:bg-orange-300/50">
      
      {/* Festive Ambient Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-300/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-yellow-300/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-200/20 rounded-full blur-[120px] pointer-events-none" />

      <FallingPetals />

      {/* Warm & Festive Toolbar */}
      <header className="fixed top-0 w-full z-50 px-8 py-5 flex items-center justify-between border-b border-orange-200/50 bg-[#FFFBF0]/80 backdrop-blur-3xl shadow-sm">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 text-orange-800/60 hover:text-orange-600 transition-colors font-medium text-sm bg-orange-100/50 hover:bg-orange-200/60 px-5 py-2.5 rounded-full border border-orange-200">
            <ArrowLeft className="w-4 h-4" /> Back to Celebrations
          </Link>
          <div className="hidden md:flex items-center gap-2 text-lg font-bold tracking-wide text-orange-600">
            <Sparkles className="w-5 h-5 text-yellow-500" /> RitualEase Magic
          </div>
        </div>
        
        {/* Festive Progress Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-800/40">Step 1 of 3</span>
          <div className="flex items-center gap-2">
            <div className="w-10 h-2 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 shadow-[0_0_10px_rgba(249,115,22,0.3)]"></div>
            <div className="w-3 h-2 rounded-full bg-orange-200"></div>
            <div className="w-3 h-2 rounded-full bg-orange-200"></div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 w-full pt-24 flex flex-col lg:flex-row relative z-10">
        
        {/* Left Side: Inspiration Carousel */}
        <div className="hidden lg:flex w-[45%] items-center justify-center p-12 relative overflow-hidden">
          <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">

            {/* Festive Glow Behind Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-orange-400/20 to-yellow-300/20 blur-[60px] rounded-full z-0" />

            <AnimatePresence mode="wait">
              <motion.div
                key={previewThemeIndex}
                initial={{ opacity: 0, y: 30, rotate: -5 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                exit={{ opacity: 0, y: -30, rotate: 5 }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                className="w-full aspect-[3/4] rounded-3xl overflow-hidden relative z-10 shadow-[0_30px_60px_rgba(234,88,12,0.15)] border-8 border-white"
              >
                <InvitationCard 
                  themeId={PREVIEW_THEMES[previewThemeIndex]}
                  title="Priya's Haldi"
                  subtitle="Let the celebrations begin"
                  date="October 14, 2026"
                  venue="The Courtyard"
                />
              </motion.div>
            </AnimatePresence>

            <div className="mt-12 text-center relative z-10 bg-white/60 backdrop-blur-md px-8 py-4 rounded-full border border-orange-100 shadow-sm">
              <h2 className="text-2xl font-bold text-orange-600 font-display">Vibrant & Joyful</h2>
              <p className="text-orange-800/50 mt-1 font-semibold uppercase text-[10px] tracking-widest">A Celebration of Color</p>
            </div>
          </div>
        </div>

        {/* Right Side: The Magic Wizard */}
        <div className="flex-1 flex flex-col p-6 lg:p-12 xl:p-20 overflow-y-auto">
          <div className="max-w-2xl w-full mx-auto">
            
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-bold font-display mb-6 text-[#5C2B09] leading-tight">
                Design with <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                  Festive Joy
                </span>
              </h1>
              <p className="text-orange-900/60 text-xl font-medium leading-relaxed">
                Describe your vibrant celebration. Our AI will weave the perfect colors and motifs for you.
              </p>
            </div>

            {/* Festive Mode Switcher */}
            <div className="bg-white/80 backdrop-blur-md border border-orange-100 rounded-2xl p-1.5 mb-10 flex shadow-sm">
              <button 
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${mode === 'ai' ? 'bg-orange-100 text-orange-700 shadow-sm border border-orange-200/50' : 'text-orange-900/40 hover:text-orange-600'}`}
                onClick={() => setMode('ai')}
              >
                <Wand2 className="w-4 h-4" /> AI Generator
              </button>
              <button 
                className={`flex-1 py-3.5 rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all duration-300 ${mode === 'manual' ? 'bg-orange-100 text-orange-700 shadow-sm border border-orange-200/50' : 'text-orange-900/40 hover:text-orange-600'}`}
                onClick={() => setMode('manual')}
              >
                <PenTool className="w-4 h-4" /> Manual Entry
              </button>
            </div>

            <AnimatePresence mode="wait">
              {mode === 'ai' ? (
                <motion.div
                  key="ai"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-8"
                >
                  <div className="relative group">
                    <div className="absolute -inset-2 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-40 transition duration-700"></div>
                    
                    <div className="relative bg-white/90 backdrop-blur-xl border-2 border-orange-100 group-focus-within:border-orange-300 rounded-[2rem] shadow-xl transition duration-500 overflow-hidden">
                      <div className="px-6 py-4 border-b border-orange-50 bg-orange-50/50 flex items-center justify-between">
                        <Label htmlFor="prompt" className="text-xs uppercase tracking-widest text-orange-600 font-bold flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-yellow-500" /> Event Details
                        </Label>
                      </div>
                      <Textarea 
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. Create a bright, sunny Haldi invitation for Priya. We want lots of marigolds, warm yellow tones, and a very festive energy..."
                        className="min-h-[240px] text-xl md:text-2xl font-medium bg-transparent border-0 focus-visible:ring-0 text-[#5C2B09] p-8 resize-none placeholder:text-orange-900/20 leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-3">
                    {SUGGESTIONS.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(suggestion)}
                        className="text-xs font-bold text-orange-800/70 bg-white hover:bg-orange-100 hover:text-orange-700 border border-orange-100 px-5 py-3 rounded-full transition-all duration-300 text-left max-w-full truncate shadow-sm hover:shadow-md"
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
                      className="w-full h-16 rounded-2xl text-lg font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-[0_8px_20px_rgba(249,115,22,0.25)] hover:shadow-[0_12px_25px_rgba(249,115,22,0.35)] hover:-translate-y-1 transition-all duration-300 border-0 group overflow-hidden relative"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-10" />
                      
                      {isGenerating ? (
                        <span className="flex items-center gap-3 relative z-20">
                          <Sparkles className="w-5 h-5 animate-spin" /> Gathering Marigolds...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3 relative z-20">
                          Design Invitation <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                        </span>
                      )}
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="manual"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white/90 backdrop-blur-xl border-2 border-orange-100 rounded-[2rem] p-10 space-y-8 shadow-xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <Label className="text-orange-900/50 font-bold tracking-widest uppercase text-[10px]">Event Title / Hosts *</Label>
                      <Input value={manualTitle} onChange={e => setManualTitle(e.target.value)} className="bg-orange-50/50 border-orange-100 focus:border-orange-400 text-[#5C2B09] font-bold h-14 rounded-xl px-4 shadow-sm" placeholder="e.g. Priya's Haldi" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-orange-900/50 font-bold tracking-widest uppercase text-[10px]">Subtitle (Optional)</Label>
                      <Input value={manualSubtitle} onChange={e => setManualSubtitle(e.target.value)} className="bg-orange-50/50 border-orange-100 focus:border-orange-400 text-[#5C2B09] font-bold h-14 rounded-xl px-4 shadow-sm" placeholder="e.g. Let the fun begin" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-orange-900/50 font-bold tracking-widest uppercase text-[10px]">Date & Time *</Label>
                      <Input value={manualDate} onChange={e => setManualDate(e.target.value)} className="bg-orange-50/50 border-orange-100 focus:border-orange-400 text-[#5C2B09] font-bold h-14 rounded-xl px-4 shadow-sm" placeholder="e.g. October 14, 2026" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-orange-900/50 font-bold tracking-widest uppercase text-[10px]">Venue / Location *</Label>
                      <Input value={manualVenue} onChange={e => setManualVenue(e.target.value)} className="bg-orange-50/50 border-orange-100 focus:border-orange-400 text-[#5C2B09] font-bold h-14 rounded-xl px-4 shadow-sm" placeholder="e.g. The Courtyard" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label className="text-orange-900/50 font-bold tracking-widest uppercase text-[10px]">Theme</Label>
                      <select 
                        value={manualTheme}
                        onChange={(e) => setManualTheme(e.target.value)}
                        className="w-full bg-orange-50/50 border border-orange-100 focus:border-orange-400 text-[#5C2B09] font-bold h-14 rounded-xl px-4 shadow-sm outline-none"
                      >
                        <optgroup label="Festive & Joyful Designs">
                          <option value="haldi_marigold">Traditional Haldi</option>
                          <option value="watercolor_florals">Watercolor Florals</option>
                          <option value="rose_gold_brush">Rose Gold Brushstrokes</option>
                          <option value="tropical_palm">Tropical Palm</option>
                          <option value="boho_pampas">Boho Pampas Grass</option>
                          <option value="lotus_pond">Lotus Pond</option>
                        </optgroup>
                        <optgroup label="Other Premium Designs">
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
                  <div className="pt-6">
                    <Button 
                      size="lg" 
                      onClick={handleManualSubmit}
                      className="w-full h-14 rounded-xl font-bold bg-orange-600 hover:bg-orange-700 text-white shadow-[0_6px_15px_rgba(234,88,12,0.2)] hover:shadow-[0_8px_20px_rgba(234,88,12,0.3)] hover:-translate-y-1 transition-all duration-300"
                    >
                      Continue to Design <ArrowRight className="ml-2 w-5 h-5 text-orange-200" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </main>

      {/* Joyful Loading Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#FFFBF0]/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Soft Glowing Sun */}
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-96 h-96 bg-gradient-to-tr from-orange-400 to-yellow-300 rounded-full blur-[100px]"
            />
            
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-4 border-orange-100 border-t-orange-500 border-r-yellow-400 rounded-full mb-8 shadow-xl"
              />
              <h2 className="text-4xl font-bold text-[#5C2B09] mb-3 font-display">Blooming Joy...</h2>
              <p className="text-orange-600 font-bold tracking-widest uppercase text-sm">Weaving marigolds & magic</p>
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
