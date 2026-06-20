import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InvitationCard } from "@/components/ritual/InvitationCard";
import { ChevronRight, ChevronLeft, Volume2, VolumeX } from "lucide-react";

export default function GuestView() {
  const [events, setEvents] = useState<any[]>([]);
  const [musicTrack, setMusicTrack] = useState<string>("none");
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [isOpened, setIsOpened] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    // Load from local storage for now (simulating DB load)
    const saved = localStorage.getItem('generatedEvent');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) setEvents(parsed);
      else setEvents([{ ...parsed, theme_id: parsed.theme_id || "royal_rajput" }]);
    }
    const savedMusic = localStorage.getItem('selectedMusic');
    if (savedMusic) setMusicTrack(savedMusic);
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
  };

  const currentEvent = events[currentIndex];

  if (!events.length) {
    return <div className="min-h-screen bg-[#2A0800] flex items-center justify-center text-amber-500">Loading Invitation...</div>;
  }

  return (
    <div className="min-h-screen bg-[#1A0500] text-amber-50 overflow-hidden relative flex items-center justify-center font-serif">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900 via-[#1A0500] to-[#1A0500]" />

      <AnimatePresence>
        {!isOpened ? (
          <motion.div 
            key="envelope"
            exit={{ y: "100%", opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
            className="relative z-50 flex flex-col items-center justify-center cursor-pointer"
            onClick={handleOpenEnvelope}
          >
            {/* The Digital Envelope */}
            <div className="relative w-[300px] h-[200px] md:w-[400px] md:h-[260px]">
              {/* Back of envelope */}
              <div className="absolute inset-0 bg-[#3a0a00] rounded-xl shadow-2xl border border-amber-900/50" />
              
              {/* Flaps */}
              <div className="absolute inset-0 overflow-hidden rounded-xl">
                {/* Bottom flap */}
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-[#4a0d00] border-t border-amber-800/30" style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
                {/* Left flap */}
                <div className="absolute top-0 bottom-0 left-0 w-[50%] bg-[#5a1000]" style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
                {/* Right flap */}
                <div className="absolute top-0 bottom-0 right-0 w-[50%] bg-[#5a1000]" style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }} />
                {/* Top flap (closed) */}
                <motion.div 
                  className="absolute top-0 left-0 right-0 h-[60%] bg-[#6a1300] origin-top border-b border-amber-800/40 shadow-lg z-10" 
                  style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
                  whileHover={{ rotateX: 10 }}
                />
              </div>

              {/* Wax Seal */}
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-red-800 rounded-full flex items-center justify-center shadow-[0_5px_15px_rgba(0,0,0,0.5)] border-2 border-red-900/80 cursor-pointer"
                style={{ background: 'radial-gradient(circle at 30% 30%, #991b1b, #7f1d1d, #450a0a)' }}
              >
                <div className="w-12 h-12 rounded-full border border-red-900/40 flex items-center justify-center opacity-80">
                  <span className="font-serif text-2xl font-bold text-amber-100/90 drop-shadow-md">
                    {currentEvent.title.charAt(0)}
                  </span>
                </div>
              </motion.div>
            </div>
            
            <motion.p 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
              className="mt-8 text-amber-500/80 uppercase tracking-[0.3em] text-sm font-bold animate-pulse"
            >
              Tap to Open
            </motion.p>
          </motion.div>
        ) : (
          <motion.div 
            key="invitation"
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-lg aspect-[3/4] p-4 flex flex-col items-center"
          >
            {/* Audio Controls */}
            {musicTrack !== "none" && (
              <button 
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-8 right-8 z-50 bg-black/20 backdrop-blur-md p-3 rounded-full border border-amber-500/30 text-amber-400 hover:text-amber-300 hover:bg-black/40 transition-all"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            )}

            {/* The Animated Card */}
            <div className="w-full h-full shadow-[0_30px_80px_rgba(0,0,0,0.8)] border-[3px] border-[#3a0a00] rounded-xl overflow-hidden relative">
              <div className="absolute inset-0 border border-amber-400/30 rounded-xl z-20 pointer-events-none"></div>
              <InvitationCard 
                themeId={currentEvent.theme_id || "royal_rajput"}
                title={currentEvent.title}
                subtitle={currentEvent.subtitle}
                date={currentEvent.date}
                venue={currentEvent.venue}
                isAnimated={true}
              />
            </div>

            {/* Storybook Pagination for Guest */}
            {events.length > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 1 }}
                className="flex items-center gap-6 mt-8 bg-[#2A0800]/80 backdrop-blur-md px-6 py-3 rounded-full border border-amber-500/20 shadow-xl"
              >
                <button 
                  onClick={() => setCurrentIndex(prev => Math.max(prev - 1, 0))} 
                  disabled={currentIndex === 0}
                  className="text-amber-500 disabled:opacity-30 hover:text-amber-300 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="text-amber-500/90 font-bold font-sans text-xs tracking-[0.2em] uppercase">
                  Event {currentIndex + 1} / {events.length}
                </div>
                <button 
                  onClick={() => setCurrentIndex(prev => Math.min(prev + 1, events.length - 1))} 
                  disabled={currentIndex === events.length - 1}
                  className="text-amber-500 disabled:opacity-30 hover:text-amber-300 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
