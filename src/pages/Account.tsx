import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/ritual/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileSection } from "@/components/account/ProfileSection";
import { AddressesSection } from "@/components/account/AddressesSection";
import { OrdersSection } from "@/components/account/OrdersSection";
import { HelpSection } from "@/components/account/HelpSection";
import { Loader2 } from "lucide-react";

const Account = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [tab, setTab] = useState("profile");

  useEffect(() => {
    if (!loading && !user) navigate("/auth?redirect=/account", { replace: true });
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-rose" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <header className="mb-6 md:mb-8">
          <h1 className="font-display text-3xl md:text-4xl">My Account</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your profile, addresses, and bookings</p>
        </header>

        <Tabs value={tab} onValueChange={setTab} className="w-full">
          <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 h-auto md:h-10 gap-1 md:gap-0 bg-card border border-border p-1">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="help">Help</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6"><ProfileSection /></TabsContent>
          <TabsContent value="addresses" className="mt-6"><AddressesSection /></TabsContent>
          <TabsContent value="ongoing" className="mt-6"><OrdersSection mode="ongoing" /></TabsContent>
          <TabsContent value="history" className="mt-6"><OrdersSection mode="history" /></TabsContent>
          <TabsContent value="help" className="mt-6"><HelpSection /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Account;
