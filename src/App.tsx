import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Book from "./pages/Book.tsx";
import PackageDetail from "./pages/PackageDetail.tsx";
import Category from "./pages/Category.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import Account from "./pages/Account.tsx";
import About from "./pages/About.tsx";
import Upcoming from "./pages/Upcoming.tsx";
import Tracker from "./pages/Tracker.tsx";
import VendorDashboard from "./pages/VendorDashboard.tsx";
import AdminDashboard from "./pages/AdminDashboard.tsx";
import JoinUs from "./pages/JoinUs.tsx";
import InvitationMaker from "./pages/InvitationMaker.tsx";
import InvitationPreview from "./pages/InvitationPreview.tsx";
import { WhatsAppFab } from "./components/ritual/WhatsAppFab";
import { AuthProvider } from "./contexts/AuthContext";
import { LocationPrompt } from "./components/location/LocationPrompt";
import { CartProvider } from "./contexts/CartContext";
import { CartSheet } from "./components/cart/CartSheet";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/account" element={<Account />} />
            <Route path="/book" element={<Book />} />
            <Route path="/package/:id" element={<PackageDetail />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/about" element={<About />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/join-us" element={<JoinUs />} />
            <Route path="/invitation-maker" element={<InvitationMaker />} />
            <Route path="/invitation-preview" element={<InvitationPreview />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppFab />
          <LocationPrompt />
          <CartSheet />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
