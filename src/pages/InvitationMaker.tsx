import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Wand2, AlignLeft, Bot, Zap, PenTool } from "lucide-react";
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

export default function InvitationMaker() {
  const [mode, setMode] = useState<"ai" | "manual">("ai");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewThemeIndex, setPreviewThemeIndex] = useState(0);
  const navigate = useNavigate();

  // Rotate preview themes slowly
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
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden font-sans">
      {/* Dynamic Ambient Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Sleek Studio Toolbar (Replaces old blank header) */}
      <header className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between border-b border-border/40 bg-background/60 backdrop-blur-2xl">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-medium text-sm bg-muted/30 px-4 py-2 rounded-full">
            <ArrowLeft className="w-4 h-4" /> Exit Studio
          </Link>
          <div className="hidden md:flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground/80">
            <Bot className="w-4 h-4 text-primary" /> RitualEase AI Studio
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Step 1 of 3</span>
          <div className="flex items-center gap-2">
            <div className="w-8 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(var(--primary),0.5)]"></div>
            <div className="w-3 h-2 rounded-full bg-border"></div>
            <div className="w-3 h-2 rounded-full bg-border"></div>
          </div>
        </div>
      </header>

      {/* Main Split-Screen Layout */}
      <main className="flex-1 w-full pt-20 flex flex-col lg:flex-row relative z-10">
        
        {/* Left Side: Inspiration Carousel */}
        <div className="hidden lg:flex w-[40%] border-r border-border/40 bg-muted/10 items-center justify-center p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-transparent z-0" />
          <div className="relative z-10 w-full max-w-sm flex flex-col items-center">
            <div className="mb-8 text-center">
              <h2 className="font-display text-3xl font-bold text-foreground">Endless Possibilities</h2>
              <p className="text-muted-foreground mt-2">Powered by vector mathematics</p>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={previewThemeIndex}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.1, y: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="w-full aspect-[3/4] rounded-2xl shadow-2xl overflow-hidden border-4 border-background"
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
          </div>
        </div>

        {/* Right Side: The Magic Wizard */}
        <div className="flex-1 flex flex-col p-6 lg:p-12 xl:p-20 overflow-y-auto">
          <div className="max-w-2xl w-full mx-auto">
            
            <div className="mb-10">
              <h1 className="text-4xl md:text-5xl font-bold font-display mb-4 text-foreground">
                Design with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose">Magic</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Describe your dream invitation in plain language. Our AI will instantly construct a pixel-perfect vector design.
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl p-1.5 mb-8 flex shadow-sm">
              <button 
                className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'ai' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => setMode('ai')}
              >
                <Wand2 className="w-4 h-4" /> AI Generator
              </button>
              <button 
                className={`flex-1 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'manual' ? 'bg-primary text-primary-foreground shadow-md' : 'text-muted-foreground hover:text-foreground'}`}
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
                  className="space-y-6"
                >
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-rose rounded-3xl blur opacity-20 group-focus-within:opacity-50 transition duration-500"></div>
                    <div className="relative bg-card border border-border/50 rounded-3xl p-2 shadow-xl">
                      <div className="px-6 py-4 border-b border-border/30 flex items-center justify-between">
                        <Label htmlFor="prompt" className="text-xs uppercase tracking-widest text-primary font-bold flex items-center gap-2">
                          <Sparkles className="w-3 h-3" /> Event Prompt
                        </Label>
                        <Zap className="w-4 h-4 text-muted-foreground/50" />
                      </div>
                      <Textarea 
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. Create a minimalist botanical wedding invitation for Sarah and James. We need it to be elegant..."
                        className="min-h-[220px] text-lg bg-transparent border-0 focus-visible:ring-0 text-foreground rounded-2xl p-6 resize-none placeholder:text-muted-foreground/40 leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Suggestion Chips */}
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => setPrompt(suggestion)}
                        className="text-xs font-medium text-muted-foreground bg-muted/30 hover:bg-muted/60 border border-border/50 px-4 py-2 rounded-full transition-all text-left max-w-full truncate"
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
                      className="w-full h-16 rounded-2xl text-lg font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all group overflow-hidden relative"
                    >
                      {/* Button shine effect */}
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                      
                      {isGenerating ? (
                        <span className="flex items-center gap-3 relative z-20">
                          <Sparkles className="w-6 h-6 animate-spin" /> Designing your masterpiece...
                        </span>
                      ) : (
                        <span className="flex items-center gap-3 relative z-20">
                          Generate Invitation <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
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
                  className="bg-card/80 backdrop-blur-xl border border-border/50 rounded-3xl p-8 space-y-8 shadow-xl"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <Label className="text-muted-foreground font-semibold">Event Type</Label>
                      <Input className="bg-background border-border focus:border-primary h-12 rounded-xl" placeholder="e.g. Wedding, Birthday" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-muted-foreground font-semibold">Event Name / Hosts</Label>
                      <Input className="bg-background border-border focus:border-primary h-12 rounded-xl" placeholder="e.g. Sarah & James" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-muted-foreground font-semibold">Date</Label>
                      <Input type="date" className="bg-background border-border focus:border-primary h-12 rounded-xl text-foreground" />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-muted-foreground font-semibold">Venue</Label>
                      <Input className="bg-background border-border focus:border-primary h-12 rounded-xl" placeholder="e.g. The Grand Hotel" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button 
                      size="lg" 
                      onClick={handleGenerate}
                      className="w-full h-14 rounded-2xl font-bold shadow-lg shadow-primary/20"
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

      {/* Loading Overlay */}
      <AnimatePresence>
        {isGenerating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 border-t-2 border-r-2 border-primary rounded-full mb-8"
            />
            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Analyzing Requirements</h2>
            <p className="text-muted-foreground">Our AI is selecting the perfect mathematical vectors...</p>
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
