import { MapPin, Menu, User as UserIcon, LogOut, ShoppingBag, LayoutDashboard, Truck, Store } from "lucide-react";
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

const links = [
  { label: "Pujas", href: "/category/pujas" },
  { label: "Parties", href: "/category/parties" },
  { label: "Ala-Carte", href: "/category/alacarte" },
  { label: "About Us", href: "/about" },
  { label: "Join as Vendor", href: "/join-us" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();
  const { count, openCart } = useCart();
  const initial = (user?.user_metadata?.full_name || user?.email || "U").trim().charAt(0).toUpperCase();

  // Add scroll listener for dynamic navbar styling
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-background/95 backdrop-blur-xl border-b border-rose/10 shadow-sm py-2" 
          : "bg-background/50 backdrop-blur-md py-4"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-1 shrink-0 cursor-pointer group" aria-label="RitualEase home">
          <img src={logoIcon} alt="RitualEase icon" className={`transition-all duration-300 ${scrolled ? "h-10" : "h-14"} w-auto group-hover:scale-105`} />
          <img src={logoWordmark} alt="RitualEase" className={`hidden sm:block transition-all duration-300 ${scrolled ? "h-6" : "h-8"} w-auto -ml-1`} />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.label}>
              <Link 
                to={l.href} 
                className="relative text-sm font-semibold uppercase tracking-wider text-foreground/80 hover:text-rose transition-colors py-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-rose after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 md:gap-5">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full border border-border/50 text-xs font-medium text-foreground/70 cursor-pointer hover:bg-muted transition-colors">
            <MapPin className="h-3.5 w-3.5 text-rose" />
            <span>Delhi NCR</span>
          </div>

          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-rose/5 border border-rose/20 text-rose hover:bg-rose hover:text-cream transition-all duration-300 shadow-sm hover:shadow-rose/20"
            aria-label={`Cart (${count} items)`}
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 rounded-full bg-rose border-2 border-background text-cream text-[10px] font-bold flex items-center justify-center animate-in zoom-in">
                {count}
              </span>
            )}
          </button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="hidden sm:inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-rose to-maroon text-cream font-bold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  aria-label="Account"
                >
                  {initial}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 p-2 rounded-xl shadow-xl border-rose/10">
                <DropdownMenuLabel className="truncate text-muted-foreground font-normal">
                  Signed in as <br/><strong className="text-foreground">{user.user_metadata?.full_name || user.email}</strong>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link to="/account"><UserIcon className="h-4 w-4 mr-2 text-rose" /> My account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link to="/tracker"><Truck className="h-4 w-4 mr-2 text-rose" /> Order Tracker</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="text-xs uppercase text-muted-foreground">Portals</DropdownMenuLabel>
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link to="/vendor-dashboard"><Store className="h-4 w-4 mr-2 text-rose" /> Vendor Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link to="/admin-dashboard"><LayoutDashboard className="h-4 w-4 mr-2 text-rose" /> Admin Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="rounded-lg cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="h-4 w-4 mr-2" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" className="hidden lg:inline text-sm font-semibold tracking-wide text-foreground hover:text-rose transition-colors">
              Log in
            </Link>
          )}
          
          <Button variant="hero" className="hidden sm:inline-flex rounded-full px-6 shadow-md shadow-rose/20 hover:shadow-rose/40 transition-all duration-300 hover:-translate-y-0.5" asChild>
            <a href="/book">Book Now</a>
          </Button>
          
          <button className="md:hidden p-2 rounded-full hover:bg-muted transition-colors" onClick={() => setOpen(!open)} aria-label="Menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-background border-b border-border/60 shadow-xl transition-all duration-300 origin-top ${open ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"}`}>
        <ul className="container mx-auto px-4 py-6 space-y-4">
          {links.map(l => (
            <li key={l.label}>
              <Link to={l.href} onClick={() => setOpen(false)} className="block py-2 font-bold uppercase tracking-wider text-sm hover:text-rose transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-2 py-3 border-y border-border/50 text-sm font-medium text-muted-foreground">
            <MapPin className="h-4 w-4 text-rose" /> Delhi NCR
          </li>
          
          {user ? (
            <div className="space-y-2 pt-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Account</p>
              <li><Link to="/account" onClick={() => setOpen(false)} className="flex items-center py-2 font-semibold text-sm hover:text-rose transition-colors"><UserIcon className="h-4 w-4 mr-2" /> My Profile</Link></li>
              <li><Link to="/tracker" onClick={() => setOpen(false)} className="flex items-center py-2 font-semibold text-sm hover:text-rose transition-colors"><Truck className="h-4 w-4 mr-2" /> Order Tracker</Link></li>
              <li><Link to="/vendor-dashboard" onClick={() => setOpen(false)} className="flex items-center py-2 font-semibold text-sm hover:text-rose transition-colors"><Store className="h-4 w-4 mr-2" /> Vendor Portal</Link></li>
              <li><Link to="/admin-dashboard" onClick={() => setOpen(false)} className="flex items-center py-2 font-semibold text-sm hover:text-rose transition-colors"><LayoutDashboard className="h-4 w-4 mr-2" /> Admin Portal</Link></li>
              <li><button onClick={() => { signOut(); setOpen(false); }} className="flex items-center w-full py-2 font-semibold text-sm text-destructive"><LogOut className="h-4 w-4 mr-2" /> Sign out</button></li>
            </div>
          ) : (
            <li><Link to="/auth" onClick={() => setOpen(false)} className="block py-2 font-bold uppercase tracking-wider text-sm hover:text-rose transition-colors">Log in / Sign up</Link></li>
          )}
          <li className="pt-4">
            <Button variant="hero" className="w-full rounded-full" asChild><a href="/book">Book Now</a></Button>
          </li>
        </ul>
      </div>
    </header>
  );
};
