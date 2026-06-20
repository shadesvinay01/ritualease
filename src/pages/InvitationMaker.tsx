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

const PREVIEW_THEMES = ["royal_rajput", "emerald_foil", "watercolor_florals", "tropical_palm"];

// A lightweight floating particle component
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

export default function InvitationMaker() {
  const [mode, setMode] = useState<"ai" | "manual">("ai");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewThemeIndex, setPreviewThemeIndex] = useState(0);
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
        body: JSON.stringify({ prompt: mode === 'ai' ? prompt : "Manual entry" }),
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
          <Link to="/" className="flex items-center gap-2 text-white/50 hover:text-amber-400 transition-colors font-medium text-sm bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full border border-white/5">
            <ArrowLeft className="w-4 h-4" /> Exit Studio
          </Link>
          <div className="hidden md:flex items-center gap-2 text-sm font-semibold tracking-widest text-white/80 uppercase">
            <Sparkles className="w-4 h-4 text-amber-500" /> RitualEase Magic Studio
          </div>
        </div>
        
        {/* Cinematic Progress Indicator */}
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">Step 1 of 3</span>
          <div className="flex items-center gap-2">
            <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-amber-600 to-yellow-400 shadow-[0_0_15px_rgba(251,191,36,0.5)]"></div>
            <div className="w-3 h-1.5 rounded-full bg-white/10"></div>
            <div className="w-3 h-1.5 rounded-full bg-white/10"></div>
          </div>
        </div>
      </header>

      {/* Main Split-Screen Layout */}
      <main className="flex-1 w-full pt-24 flex flex-col lg:flex-row relative z-10">
        
        {/* Left Side: Inspiration Carousel */}
        <div className="hidden lg:flex w-[45%] items-center justify-center p-12 relative overflow-hidden">
          <div className="relative z-10 w-full max-w-[400px] flex flex-col items-center">
            
            {/* Floating Glow Behind Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-amber-500/10 blur-[80px] rounded-full z-0" />

            <AnimatePresence mode="wait">
              <motion.div
                key={previewThemeIndex}
                initial={{ opacity: 0, scale: 0.95, rotateY: -10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.05, rotateY: 10 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="w-full aspect-[3/4] rounded-2xl overflow-hidden relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50 z-20 pointer-events-none mix-blend-overlay"></div>
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
              <h2 className="font-display text-4xl font-light tracking-wide text-white">Endless Possibilities</h2>
              <p className="text-white/40 mt-3 font-light tracking-wider uppercase text-sm">Powered by vector mathematics</p>
            </div>
          </div>
        </div>

        {/* Right Side: The Magic Wizard */}
        <div className="flex-1 flex flex-col p-6 lg:p-12 xl:p-20 overflow-y-auto">
          <div className="max-w-2xl w-full mx-auto">
            
            <div className="mb-12">
              <h1 className="text-5xl md:text-6xl font-light font-display mb-6 text-white leading-tight">
                Design with <br/><span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-600">Pure Magic</span>
              </h1>
              <p className="text-white/50 text-xl font-light leading-relaxed">
                Describe your dream invitation. Our AI will instantly construct a pixel-perfect, luxurious vector design.
              </p>
            </div>

            {/* Premium Mode Switcher */}
            <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-1.5 mb-10 flex shadow-2xl">
              <button 
                className={`flex-1 py-3.5 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-500 ${mode === 'ai' ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10' : 'text-white/40 hover:text-white'}`}
                onClick={() => setMode('ai')}
              >
                <Wand2 className="w-4 h-4 text-amber-400" /> AI Generator
              </button>
              <button 
                className={`flex-1 py-3.5 rounded-xl text-sm font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-500 ${mode === 'manual' ? 'bg-white/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/10' : 'text-white/40 hover:text-white'}`}
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
                    {/* Intense Glow on Focus */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/0 via-amber-500/20 to-amber-500/0 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition duration-1000"></div>
                    
                    {/* Glass Box */}
                    <div className="relative bg-[#0a0a0c]/80 backdrop-blur-3xl border border-white/10 group-focus-within:border-amber-500/30 rounded-[2rem] p-3 shadow-2xl transition duration-500">
                      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                        <Label htmlFor="prompt" className="text-xs uppercase tracking-widest text-amber-500 font-bold flex items-center gap-3">
                          <Sparkles className="w-3.5 h-3.5" /> Event Prompt
                        </Label>
                        <Zap className="w-4 h-4 text-white/20" />
                      </div>
                      <Textarea 
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. Create a minimalist botanical wedding invitation for Sarah and James. We need it to be deeply elegant..."
                        className="min-h-[240px] text-xl md:text-2xl font-display font-light bg-transparent border-0 focus-visible:ring-0 text-white rounded-3xl p-6 resize-none placeholder:text-white/20 leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-3">
                    {SUGGESTIONS.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(suggestion)}
                        className="text-xs font-medium tracking-wide text-white/50 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 px-5 py-3 rounded-full transition-all duration-300 text-left max-w-full truncate shadow-lg"
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
                      className="w-full h-16 rounded-2xl text-lg font-bold bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-black shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] transition-all duration-500 border-0 group overflow-hidden relative"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-10" />
                      
                      {isGenerating ? (
                        <span className="flex items-center gap-3 relative z-20">
                          <Sparkles className="w-5 h-5 animate-spin" /> Designing your masterpiece...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3 relative z-20">
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
                  className="bg-[#0a0a0c]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-10 space-y-8 shadow-2xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-white/50 font-semibold tracking-wide uppercase text-xs">Event Type</Label>
                      <Input className="bg-white/5 border-white/10 focus:border-amber-500/50 text-white h-14 rounded-xl px-4" placeholder="e.g. Wedding, Birthday" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white/50 font-semibold tracking-wide uppercase text-xs">Event Name / Hosts</Label>
                      <Input className="bg-white/5 border-white/10 focus:border-amber-500/50 text-white h-14 rounded-xl px-4" placeholder="e.g. Sarah & James" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white/50 font-semibold tracking-wide uppercase text-xs">Date</Label>
                      <Input type="date" className="bg-white/5 border-white/10 focus:border-amber-500/50 text-white h-14 rounded-xl px-4" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-white/50 font-semibold tracking-wide uppercase text-xs">Venue</Label>
                      <Input className="bg-white/5 border-white/10 focus:border-amber-500/50 text-white h-14 rounded-xl px-4" placeholder="e.g. The Grand Hotel" />
                    </div>
                  </div>
                  <div className="pt-6">
                    <Button 
                      size="lg" 
                      onClick={handleGenerate}
                      className="w-full h-14 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all duration-300"
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

      {/* Cinematic Loading Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#030305]/90 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Glowing Orb */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-96 h-96 bg-amber-500/20 rounded-full blur-[100px]"
            />
            
            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 border-t-2 border-r-2 border-amber-500 rounded-full mb-10 shadow-[0_0_30px_rgba(245,158,11,0.5)]"
              />
              <h2 className="text-4xl font-display font-light text-white mb-4 tracking-wide">Designing Masterpiece</h2>
              <p className="text-amber-500/70 font-light tracking-widest uppercase text-sm">Synthesizing mathematical vectors...</p>
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
