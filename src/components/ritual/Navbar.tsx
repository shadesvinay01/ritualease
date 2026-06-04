import { MapPin, Menu, User as UserIcon, LogOut, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
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
  { label: "Parties", href: "/category/parties" },
  { label: "Pujas", href: "/category/pujas" },
  { label: "Ala-Carte", href: "/category/alacarte" },
  { label: "Upcoming", href: "/upcoming" },
  { label: "About Us", href: "/about" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { count, openCart } = useCart();
  const initial = (user?.user_metadata?.full_name || user?.email || "U").trim().charAt(0).toUpperCase();
  return (
    <header className="sticky top-0 z-50 w-full bg-background/85 backdrop-blur-md border-b border-border/60">
      <nav className="container mx-auto flex items-center justify-between h-20 md:h-24 px-4">
        <Link to="/" className="flex items-center gap-1 shrink-0 cursor-pointer" aria-label="RitualEase home">
          <img src={logoIcon} alt="RitualEase icon" className="h-12 md:h-16 w-auto" />
          <img src={logoWordmark} alt="RitualEase — Celebrations made easy" className="hidden sm:block h-8 md:h-10 w-auto -ml-1" />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.label}>
              {l.href.startsWith("/") ? (
                <Link to={l.href} className="text-sm font-semibold uppercase tracking-wide text-foreground/80 hover:text-rose transition-colors">
                  {l.label}
                </Link>
              ) : (
                <a href={l.href} className="text-sm font-semibold uppercase tracking-wide text-foreground/80 hover:text-rose transition-colors">
                  {l.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            type="button"
            onClick={openCart}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose/10 text-rose hover:bg-rose/20 transition-colors"
            aria-label={`Cart (${count} items)`}
          >
            <ShoppingBag className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-rose text-cream text-[10px] font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
          <button className="hidden md:flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-rose transition-colors">
            <MapPin className="h-4 w-4" />
            <span>Delhi NCR</span>
          </button>
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose/10 text-rose font-semibold text-sm hover:bg-rose/20 transition-colors"
                  aria-label="Account"
                >
                  {initial}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="truncate">
                  {user.user_metadata?.full_name || user.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/account"><UserIcon className="h-4 w-4" /> My account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth" className="hidden lg:inline text-sm font-medium text-foreground/80 hover:text-rose transition-colors">
              Login
            </Link>
          )}
          <Button variant="hero" size="sm" className="hidden sm:inline-flex" asChild><a href="/book">Book Now</a></Button>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <ul className="container mx-auto px-4 py-4 space-y-3">
            {links.map(l => (
              <li key={l.label}>
                {l.href.startsWith("/") ? (
                  <Link to={l.href} onClick={() => setOpen(false)} className="block py-2 font-semibold uppercase text-sm">{l.label}</Link>
                ) : (
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-2 font-semibold uppercase text-sm">{l.label}</a>
                )}
              </li>
            ))}
            <li className="flex items-center gap-1.5 py-2 text-sm"><MapPin className="h-4 w-4" /> Delhi NCR</li>
            {user ? (
              <>
                <li><Link to="/account" className="block py-2 font-semibold uppercase text-sm">My account</Link></li>
                <li><button onClick={signOut} className="block py-2 font-semibold uppercase text-sm text-left">Sign out</button></li>
              </>
            ) : (
              <li><Link to="/auth" className="block py-2 font-semibold uppercase text-sm">Login / Sign up</Link></li>
            )}
            <li><Button variant="hero" className="w-full" asChild><a href="/book">Book Now</a></Button></li>
          </ul>
        </div>
      )}
    </header>
  );
};
