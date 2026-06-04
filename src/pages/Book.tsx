import { useMemo, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Navbar } from "@/components/ritual/Navbar";
import { Stepper } from "@/components/booking/Stepper";
import { StepPackage } from "@/components/booking/StepPackage";
import { StepDetails, type DetailsValue } from "@/components/booking/StepDetails";
import { StepAddOns } from "@/components/booking/StepAddOns";
import { StepConfirm } from "@/components/booking/StepConfirm";
import { StepCustomize, type CustomizeValue } from "@/components/booking/StepCustomize";
import { ADDONS, PACKAGES } from "@/data/booking";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const detailsSchema = z.object({
  date: z.date({ required_error: "Pick a date" }),
  time: z.string().min(1, "Pick a time"),
  name: z.string().trim().min(2, "Enter your name").max(80),
  phone: z.string().trim().regex(/^\+?\d{10,15}$/, "Enter a valid phone number"),
  city: z.string().trim().min(2, "Enter your city").max(50),
  address: z.string().trim().min(10, "Enter a complete address").max(300),
});

const Book = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [packageId, setPackageId] = useState<string | null>(
    params.get("pkg") && PACKAGES.find(p => p.id === params.get("pkg")) ? params.get("pkg") : null
  );
  const [details, setDetails] = useState<DetailsValue>({ date: undefined, time: "", name: "", phone: "", address: "", city: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof DetailsValue, string>>>({});
  const [addOnIds, setAddOnIds] = useState<string[]>([]);
  const [customize, setCustomize] = useState<CustomizeValue>({});
  const [customizeErrors, setCustomizeErrors] = useState<Partial<Record<keyof CustomizeValue, string>>>({});
  const [softPromptOpen, setSoftPromptOpen] = useState(false);
  const [softPromptShown, setSoftPromptShown] = useState(false);

  const toggleAddOn = (id: string) => setAddOnIds(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);

  const runningTotal = useMemo(() => {
    const pkg = PACKAGES.find(p => p.id === packageId);
    const a = ADDONS.filter(x => addOnIds.includes(x.id)).reduce((s, x) => s + x.price, 0);
    let extra = 0;
    if (pkg?.headcount) {
      if (pkg.headcount.kids && customize.kids) {
        extra += Math.max(0, customize.kids - pkg.headcount.kids.min) * pkg.headcount.kids.perExtra;
      }
      if (pkg.headcount.adults && customize.adults) {
        extra += Math.max(0, customize.adults - pkg.headcount.adults.min) * pkg.headcount.adults.perExtra;
      }
    }
    return (pkg?.price ?? 0) + a + extra;
  }, [packageId, addOnIds, customize]);

  const next = () => {
    if (step === 0) {
      if (!packageId) { toast.error("Please select a package"); return; }
      // Soft login nudge after first package selection (one-time per session, only if not signed in)
      if (!authLoading && !user && !softPromptShown) {
        setSoftPromptShown(true);
        setSoftPromptOpen(true);
        return;
      }
    }
    if (step === 1) {
      const pkg = PACKAGES.find(p => p.id === packageId);
      const c = pkg?.customization;
      if (c) {
        const errs: Partial<Record<keyof CustomizeValue, string>> = {};
        if (c.decorThemes && !customize.decorTheme) errs.decorTheme = "Please pick a decor theme";
        if (c.cakeThemes && !customize.cakeTheme) errs.cakeTheme = "Please pick a cake theme";
        if (c.cakeFlavours && !customize.cakeFlavour) errs.cakeFlavour = "Please pick a cake flavour";
        if (c.menuTypes && !customize.menuType) errs.menuType = "Please pick a menu preference";
        if (Object.keys(errs).length) {
          setCustomizeErrors(errs);
          toast.error("Please complete your customisation");
          return;
        }
      }
      setCustomizeErrors({});
    }
    if (step === 3) {
      const result = detailsSchema.safeParse(details);
      if (!result.success) {
        const fieldErrors: Partial<Record<keyof DetailsValue, string>> = {};
        for (const issue of result.error.issues) {
          const k = issue.path[0] as keyof DetailsValue;
          if (!fieldErrors[k]) fieldErrors[k] = issue.message;
        }
        setErrors(fieldErrors);
        toast.error("Please fix the highlighted fields");
        return;
      }
      setErrors({});
    }
    // Hard auth wall before reaching the confirm step
    if (step === 3 && !user) {
      const redirect = encodeURIComponent(`/book${packageId ? `?pkg=${packageId}` : ""}`);
      toast.error("Please sign in to confirm your booking");
      navigate(`/auth?redirect=${redirect}`);
      return;
    }
    setStep(s => Math.min(4, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const back = () => {
    if (step === 0) navigate("/");
    else { setStep(s => s - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center justify-between mb-8">
            <Button variant="ghost" size="sm" onClick={back}><ArrowLeft className="h-4 w-4" /> Back</Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}><X className="h-4 w-4" /></Button>
          </div>

          <div className="mb-10"><Stepper current={step} /></div>

          <div className="bg-card rounded-3xl shadow-soft p-6 md:p-10 border border-border/60">
            {step === 0 && <StepPackage value={packageId} onChange={setPackageId} />}
            {step === 1 && packageId && <StepCustomize packageId={packageId} value={customize} onChange={setCustomize} errors={customizeErrors} />}
            {step === 2 && <StepAddOns selected={addOnIds} onToggle={toggleAddOn} />}
            {step === 3 && <StepDetails value={details} onChange={setDetails} errors={errors} />}
            {step === 4 && packageId && <StepConfirm packageId={packageId} details={details} addOnIds={addOnIds} customize={customize} />}
          </div>

          {step < 4 && (
            <div className="sticky bottom-4 mt-6">
              <div className="bg-card border border-border rounded-2xl shadow-elegant p-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Running total</p>
                  <p className="font-display text-xl text-rose font-bold">₹{runningTotal.toLocaleString("en-IN")}</p>
                </div>
                <Button variant="hero" size="lg" onClick={next}>
                  {step === 3 ? "Review booking" : "Continue"} <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Dialog open={softPromptOpen} onOpenChange={setSoftPromptOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in to save your booking</DialogTitle>
            <DialogDescription>
              Create a free RitualEase account so you can track this booking, save addresses, and reorder in one tap. You can also continue as a guest — we'll ask you to sign in before confirming.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="ghost" onClick={() => { setSoftPromptOpen(false); setStep(s => Math.min(4, s + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
              Continue as guest
            </Button>
            <Button variant="hero" asChild>
              <Link to={`/auth?redirect=${encodeURIComponent(`/book?pkg=${packageId}`)}`}>Sign in / Sign up</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Book;
