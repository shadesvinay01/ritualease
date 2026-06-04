import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import logoIcon from "@/assets/ritualease-icon.png";

const signUpSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z.string().trim().regex(/^\+?\d{10,15}$/, "Enter a valid phone number"),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
});

const signInSchema = z.object({
  email: z.string().trim().email("Enter a valid email"),
  password: z.string().min(1, "Password required"),
});

const Auth = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const { user, loading: authLoading } = useAuth();
  const [busy, setBusy] = useState(false);

  // Sign up
  const [su, setSu] = useState({ fullName: "", email: "", phone: "", password: "" });
  // Sign in
  const [si, setSi] = useState({ email: "", password: "" });

  useEffect(() => {
    if (!authLoading && user) navigate(redirect, { replace: true });
  }, [user, authLoading, navigate, redirect]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signUpSchema.safeParse(su);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: parsed.data.fullName, phone: parsed.data.phone },
      },
    });
    setBusy(false);
    if (error) {
      if (error.message.toLowerCase().includes("already")) toast.error("This email is already registered. Please sign in.");
      else toast.error(error.message);
      return;
    }
    toast.success("Account created! Welcome to RitualEase.");
    navigate(redirect, { replace: true });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = signInSchema.safeParse(si);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });
    setBusy(false);
    if (error) { toast.error("Invalid email or password"); return; }
    toast.success("Welcome back!");
    navigate(redirect, { replace: true });
  };

  const handleGoogle = async () => {
    setBusy(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}${redirect}` },
    });
    if (error) { setBusy(false); toast.error(error.message); }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <div className="container mx-auto px-4 py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
      <main className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-md bg-card rounded-3xl shadow-elegant border border-border/60 p-6 sm:p-8">
          <div className="flex flex-col items-center mb-6">
            <img src={logoIcon} alt="RitualEase" className="h-14 w-auto mb-3" />
            <h1 className="font-display text-2xl">Welcome to RitualEase</h1>
            <p className="text-sm text-muted-foreground mt-1">Celebrations made easy</p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid grid-cols-2 w-full mb-5">
              <TabsTrigger value="signin">Sign in</TabsTrigger>
              <TabsTrigger value="signup">Create account</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <Label className="mb-1.5 block">Email</Label>
                  <Input type="email" autoComplete="email" value={si.email} onChange={e => setSi({ ...si, email: e.target.value })} placeholder="you@email.com" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Password</Label>
                  <Input type="password" autoComplete="current-password" value={si.password} onChange={e => setSi({ ...si, password: e.target.value })} placeholder="••••••••" />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={busy}>
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign in"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label className="mb-1.5 block">Full name *</Label>
                  <Input value={su.fullName} maxLength={80} onChange={e => setSu({ ...su, fullName: e.target.value })} placeholder="Priya Sharma" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Email *</Label>
                  <Input type="email" autoComplete="email" value={su.email} onChange={e => setSu({ ...su, email: e.target.value })} placeholder="you@email.com" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Mobile number *</Label>
                  <Input value={su.phone} maxLength={15} onChange={e => setSu({ ...su, phone: e.target.value.replace(/[^0-9+]/g, "") })} placeholder="+91 98xxxxxxxx" />
                </div>
                <div>
                  <Label className="mb-1.5 block">Password *</Label>
                  <Input type="password" autoComplete="new-password" value={su.password} onChange={e => setSu({ ...su, password: e.target.value })} placeholder="At least 8 characters" />
                </div>
                <Button type="submit" variant="hero" className="w-full" disabled={busy}>
                  {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  We'll verify your phone number from your profile after sign-up.
                </p>
              </form>
            </TabsContent>
          </Tabs>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase tracking-wider"><span className="bg-card px-3 text-muted-foreground">or</span></div>
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogle} disabled={busy}>
            <svg className="h-4 w-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.75h3.57c2.08-1.92 3.28-4.74 3.28-8.07z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.75c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.12c-.22-.66-.35-1.36-.35-2.12s.13-1.46.35-2.12V7.04H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.96l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.04l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"/></svg>
            Continue with Google
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-6">
            By continuing you agree to our terms and privacy policy.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Auth;
