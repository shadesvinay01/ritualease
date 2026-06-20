import { useState } from "react";
import { Sparkles, ArrowRight, ArrowLeft, Wand2, AlignLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function InvitationMaker() {
  const [mode, setMode] = useState<"ai" | "manual">("ai");
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    try {
      const res = await fetch("http://localhost:8000/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      
      if (!res.ok) throw new Error("Failed to generate");
      
      const data = await res.json();
      
      // Store in localStorage for the preview page to consume
      localStorage.setItem('generatedEvent', JSON.stringify(data));
      
      // Navigate to preview
      navigate('/invitation-preview');
    } catch (err) {
      console.error(err);
      alert("Failed to connect to AI Studio. Is the backend running on port 8000?");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden pt-24">
      {/* Ambient orbs matching RitualEase subtle styling */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="flex items-center gap-2">
          <div className="sdot act">1</div><div className="w-8 h-0.5 bg-border"></div>
          <div className="sdot">2</div><div className="w-8 h-0.5 bg-border"></div>
          <div className="sdot">3</div>
        </div>
      </header>

      {/* Main Wizard Area */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">Let's create something beautiful</h1>
            <p className="text-muted-foreground text-lg">Describe your event in plain language, or enter details manually.</p>
          </div>

          <div className="bg-card/60 backdrop-blur-xl border border-border rounded-3xl p-2 mb-8 flex p-1">
            <button 
              className={`flex-1 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'ai' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setMode('ai')}
            >
              <Wand2 className="w-4 h-4" /> AI Generation (Recommended)
            </button>
            <button 
              className={`flex-1 py-3 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${mode === 'manual' ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setMode('manual')}
            >
              <AlignLeft className="w-4 h-4" /> Manual Entry
            </button>
          </div>

          <AnimatePresence mode="wait">
            {mode === 'ai' ? (
              <motion.div
                key="ai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-sm"
              >
                <Label htmlFor="prompt" className="text-xs uppercase tracking-wider text-primary font-bold mb-4 flex items-center gap-2">
                  <Sparkles className="w-3 h-3" /> Event Prompt
                </Label>
                <Textarea 
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Create a royal wedding invitation for Sarah and James on 20 December 2026 in Delhi. Theme should be luxury gold. We need a printable PDF and a WhatsApp invite."
                  className="min-h-[200px] text-lg bg-background border-border focus:border-primary text-foreground rounded-2xl p-6 resize-none shadow-inner"
                />
                <div className="mt-6 flex justify-end">
                  <Button 
                    size="lg" 
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt}
                    className="font-bold rounded-2xl px-8 h-14 hover:opacity-90 transition-all shadow-xl shadow-primary/20 w-full sm:w-auto"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 animate-spin" /> Generating Magic...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Generate Invitation <ArrowRight className="w-5 h-5" />
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
                className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 space-y-6 shadow-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Event Type</Label>
                    <Input className="bg-background border-border focus:border-primary" placeholder="e.g. Wedding, Birthday" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Event Name / Hosts</Label>
                    <Input className="bg-background border-border focus:border-primary" placeholder="e.g. Sarah & James" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Date</Label>
                    <Input type="date" className="bg-background border-border focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-muted-foreground">Venue</Label>
                    <Input className="bg-background border-border focus:border-primary" placeholder="e.g. The Grand Hotel" />
                  </div>
                </div>
                <div className="mt-8 flex justify-end">
                  <Button 
                    size="lg" 
                    onClick={handleGenerate}
                    className="font-bold rounded-2xl px-8 h-12 w-full sm:w-auto"
                  >
                    Continue to Design <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Global styles for dots */}
      <style dangerouslySetInnerHTML={{__html: `
        .sdot { width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; border: 2px solid hsl(var(--border)); color: hsl(var(--muted-foreground)); background: hsl(var(--background)); }
        .sdot.act { border-color: hsl(var(--primary)); color: hsl(var(--primary)); background: hsl(var(--primary) / 0.1); box-shadow: 0 0 20px hsl(var(--primary) / 0.15); }
      `}} />
    </div>
  );
}
