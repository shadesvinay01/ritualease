import { MapPin, Menu, User as UserIcon, LogOut, ShoppingBag, LayoutDashboard, Truck, Store, Sparkles, PartyPopper, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoIcon from "@/assets/ritualease-icon.png";
import logoWordmark from "@/assets/ritualease-wordmark.png";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import pujaImg from "@/assets/cat-pujas.jpg";
import partyImg from "@/assets/cat-parties.jpg";
import alacarteImg from "@/assets/cat-alacarte.jpg";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { count, openCart } = useCart();
  const initial = (user?.user_metadata?.full_name || user?.email || "U").trim().charAt(0).toUpperCase();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full flex justify-center mt-4 px-4 transition-all duration-500 pointer-events-none">
      <div 
        className={`pointer-events-auto flex items-center justify-between transition-all duration-500 border overflow-visible ${
          scrolled 
            ? "w-[95%] max-w-7xl bg-background/60 backdrop-blur-2xl border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.2)] rounded-full py-2 px-4 md:px-6" 
            : "w-full max-w-7xl bg-transparent border-transparent py-4 px-2"
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group" aria-label="RitualEase home">
          <div className="relative">
            <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src={logoIcon} alt="RitualEase icon" className={`relative z-10 transition-all duration-500 ${scrolled ? "h-10" : "h-14"} w-auto group-hover:scale-110 drop-shadow-lg`} />
          </div>
          <img src={logoWordmark} alt="RitualEase" className={`hidden lg:block transition-all duration-500 ${scrolled ? "h-6 opacity-0 w-0" : "h-8 opacity-100 w-auto"} -ml-1`} />
        </Link>

        {/* MEGA MENU (DESKTOP) */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              
              {/* Pujas */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/5 text-foreground/90 font-semibold tracking-wide text-sm data-[state=open]:bg-white/10">
                  <Sparkles className="w-4 h-4 mr-2 text-gold" /> Pujas
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex gap-4">
                    <div className="w-1/3 relative rounded-xl overflow-hidden shadow-inner">
                      <img src={pujaImg} className="object-cover w-full h-full" alt="Pujas" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <div className="w-2/3 flex flex-col gap-2">
                      <h4 className="font-display text-gold text-lg">Sacred Ceremonies</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">Book verified pandits with complete samagri for your home.</p>
                      <Link to="/category/pujas" className="text-sm font-semibold text-rose hover:text-rose-deep flex items-center gap-1">Explore all Pujas &rarr;</Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Parties */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-white/5 text-foreground/90 font-semibold tracking-wide text-sm data-[state=open]:bg-white/10">
                  <PartyPopper className="w-4 h-4 mr-2 text-rose" /> Parties
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4 bg-background/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex gap-4">
                    <div className="w-1/3 relative rounded-xl overflow-hidden shadow-inner">
                      <img src={partyImg} className="object-cover w-full h-full" alt="Parties" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    </div>
                    <div className="w-2/3 flex flex-col gap-2">
                      <h4 className="font-display text-rose text-lg">Epic Celebrations</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-2">Premium decor, catering, and entertainment packages.</p>
                      <Link to="/category/parties" className="text-sm font-semibold text-rose hover:text-rose-deep flex items-center gap-1">Explore all Parties &rarr;</Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* A La Carte */}
              <NavigationMenuItem>
                <Link to="/category/alacarte">
                  <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent hover:bg-white/5 text-foreground/90 font-semibold tracking-wide text-sm`}>
                    <Utensils className="w-4 h-4 mr-2 text-foreground/60" /> A-La-Carte
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* ICONS & ACTIONS */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          
          <button onClick={openCart} className="relative group p-2.5 rounded-full hover:bg-white/10 transition-colors">
            <ShoppingBag className="h-5 w-5 text-foreground/80 group-hover:text-gold transition-colors" />
            {count > 0 && (
              <span className="absolute 2 top-1 right-1 w-4 h-4 bg-rose text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-in zoom-in">
                {count}
              </span>
            )}
          </button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-10 w-10 rounded-full bg-gradient-to-br from-gold to-rose flex items-center justify-center text-white font-bold shadow-lg hover:shadow-gold/20 hover:scale-105 transition-all">
                  {initial}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2 bg-background/95 backdrop-blur-xl border-white/10 rounded-2xl shadow-2xl">
                <DropdownMenuLabel className="font-normal">
                  Signed in as <strong className="block truncate text-gold">{user.email}</strong>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild className="rounded-xl focus:bg-white/5"><Link to="/account"><UserIcon className="mr-2 h-4 w-4 text-rose" /> My Account</Link></DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl focus:bg-white/5"><Link to="/tracker"><Truck className="mr-2 h-4 w-4 text-gold" /> Order Tracker</Link></DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild className="rounded-xl focus:bg-white/5"><Link to="/vendor-dashboard"><Store className="mr-2 h-4 w-4 text-foreground/60" /> Vendor Portal</Link></DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl focus:bg-white/5"><Link to="/admin-dashboard"><LayoutDashboard className="mr-2 h-4 w-4 text-foreground/60" /> Admin Portal</Link></DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem onClick={signOut} className="rounded-xl text-destructive focus:bg-destructive/10 focus:text-destructive"><LogOut className="mr-2 h-4 w-4" /> Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="outline" className="hidden sm:flex rounded-full border-white/20 hover:bg-white/10 text-foreground" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
          )}

          <Button variant="hero" className="hidden md:flex rounded-full px-6 shadow-lg shadow-rose/20 hover:shadow-rose/40 hover:-translate-y-0.5 transition-all font-semibold" asChild>
            <Link to="/book">Book Now</Link>
          </Button>

          <button className="md:hidden p-2 rounded-full hover:bg-white/10" onClick={() => setOpen(!open)}>
            <Menu className="h-6 w-6 text-foreground" />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`fixed inset-0 z-40 bg-background/95 backdrop-blur-3xl transition-transform duration-500 ease-in-out md:hidden ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full pt-28 px-6 pb-6 gap-6">
          <Link to="/category/pujas" onClick={() => setOpen(false)} className="text-2xl font-display text-foreground border-b border-white/10 pb-4">Pujas</Link>
          <Link to="/category/parties" onClick={() => setOpen(false)} className="text-2xl font-display text-foreground border-b border-white/10 pb-4">Parties</Link>
          <Link to="/category/alacarte" onClick={() => setOpen(false)} className="text-2xl font-display text-foreground border-b border-white/10 pb-4">A-La-Carte</Link>
          <Link to="/join-us" onClick={() => setOpen(false)} className="text-2xl font-display text-gold border-b border-white/10 pb-4">Join as Vendor</Link>
          
          <div className="mt-auto flex flex-col gap-4">
            {!user && <Button variant="outline" className="w-full rounded-full border-white/20 py-6 text-lg" asChild><Link to="/auth">Sign In</Link></Button>}
            <Button variant="hero" className="w-full rounded-full py-6 text-lg" asChild><Link to="/book" onClick={() => setOpen(false)}>Book Now</Link></Button>
            <button className="absolute top-8 right-6 p-2 bg-white/10 rounded-full" onClick={() => setOpen(false)}>✕</button>
          </div>
        </div>
      </div>
    </header>
  );
};
