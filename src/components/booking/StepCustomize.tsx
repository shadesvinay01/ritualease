import { PACKAGES, type CustomizationOptions } from "@/data/booking";
import { cn } from "@/lib/utils";
import { Check, Cake, Palette, UtensilsCrossed, PartyPopper, Users, Minus, Plus } from "lucide-react";

export type CustomizeValue = {
  cakeFlavour?: string;
  cakeTheme?: string;
  decorTheme?: string;
  menuType?: string;
  adults?: number;
  kids?: number;
};

type Errors = Partial<Record<keyof CustomizeValue, string>>;

const Pill = ({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "px-4 py-2 rounded-full text-sm font-medium border-2 transition-all",
      active
        ? "bg-rose text-cream border-rose shadow-soft"
        : "bg-card text-foreground border-border hover:border-rose/40"
    )}
  >
    {active && <Check className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />}
    {label}
  </button>
);

const Section = ({
  icon: Icon, title, subtitle, error, children,
}: { icon: typeof Cake; title: string; subtitle: string; error?: string; children: React.ReactNode }) => (
  <div>
    <div className="flex items-center gap-2 mb-1">
      <div className="w-8 h-8 rounded-full bg-gradient-rose flex items-center justify-center">
        <Icon className="h-4 w-4 text-cream" />
      </div>
      <h3 className="font-display text-lg">{title}</h3>
    </div>
    <p className="text-xs text-muted-foreground mb-3 ml-10">{subtitle}</p>
    <div className="flex flex-wrap gap-2">{children}</div>
    {error && <p className="text-xs text-destructive mt-2">{error}</p>}
  </div>
);

export const StepCustomize = ({
  packageId, value, onChange, errors,
}: {
  packageId: string;
  value: CustomizeValue;
  onChange: (v: CustomizeValue) => void;
  errors: Errors;
}) => {
  const pkg = PACKAGES.find(p => p.id === packageId);
  const c: CustomizationOptions = pkg?.customization ?? {};
  const hc = pkg?.headcount;
  const set = (patch: Partial<CustomizeValue>) => onChange({ ...value, ...patch });

  const nothing = !c.cakeFlavours && !c.cakeThemes && !c.decorThemes && !c.menuTypes && !hc;

  const Stepper = ({
    label, min, perExtra, value: v, onChange: onCh,
  }: { label: string; min: number; perExtra: number; value: number; onChange: (n: number) => void }) => {
    const extra = Math.max(0, v - min);
    return (
      <div className="flex items-center justify-between gap-3 bg-card border-2 border-border rounded-2xl p-4">
        <div>
          <p className="font-medium text-sm">{label}</p>
          <p className="text-xs text-muted-foreground">
            Includes {min} • +₹{perExtra.toLocaleString("en-IN")}/extra
            {extra > 0 && <span className="text-rose font-medium"> · +{extra} extra (₹{(extra * perExtra).toLocaleString("en-IN")})</span>}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onCh(Math.max(min, v - 1))}
            disabled={v <= min}
            className="w-9 h-9 rounded-full border-2 border-border flex items-center justify-center disabled:opacity-40 hover:border-rose/40"
            aria-label={`Decrease ${label}`}
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center font-display text-lg">{v}</span>
          <button
            type="button"
            onClick={() => onCh(v + 1)}
            className="w-9 h-9 rounded-full border-2 border-border flex items-center justify-center hover:border-rose/40"
            aria-label={`Increase ${label}`}
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl mb-2">Personalise your celebration</h2>
      <p className="text-muted-foreground mb-6">
        Pick your themes & flavours so we craft the perfect setup for you.
      </p>

      {nothing ? (
        <div className="bg-cream rounded-2xl p-5 text-sm text-muted-foreground">
          No customisation needed for this package — you're all set. Tap continue.
        </div>
      ) : (
        <div className="space-y-7">
          {hc && (
            <Section
              icon={Users}
              title="Number of guests"
              subtitle="Package includes the minimum below. Add more — we'll adjust food & gifts accordingly."
            >
              <div className="w-full grid sm:grid-cols-2 gap-3">
                {hc.kids && (
                  <Stepper
                    label={hc.kids.label ?? "Kids"}
                    min={hc.kids.min}
                    perExtra={hc.kids.perExtra}
                    value={value.kids ?? hc.kids.min}
                    onChange={(n) => set({ kids: n })}
                  />
                )}
                {hc.adults && (
                  <Stepper
                    label={hc.adults.label ?? "Adults"}
                    min={hc.adults.min}
                    perExtra={hc.adults.perExtra}
                    value={value.adults ?? hc.adults.min}
                    onChange={(n) => set({ adults: n })}
                  />
                )}
              </div>
            </Section>
          )}

          {c.decorThemes && (
            <Section
              icon={Palette}
              title="Decoration theme"
              subtitle="We'll style the entire setup around your chosen theme."
              error={errors.decorTheme}
            >
              {c.decorThemes.map(t => (
                <Pill key={t} label={t} active={value.decorTheme === t} onClick={() => set({ decorTheme: t })} />
              ))}
            </Section>
          )}

          {c.cakeThemes && (
            <Section
              icon={PartyPopper}
              title="Cake theme"
              subtitle="Theme for your custom designer cake."
              error={errors.cakeTheme}
            >
              {c.cakeThemes.map(t => (
                <Pill key={t} label={t} active={value.cakeTheme === t} onClick={() => set({ cakeTheme: t })} />
              ))}
            </Section>
          )}

          {c.cakeFlavours && (
            <Section
              icon={Cake}
              title="Cake flavour"
              subtitle="Fresh cake baked the same day."
              error={errors.cakeFlavour}
            >
              {c.cakeFlavours.map(f => (
                <Pill key={f} label={f} active={value.cakeFlavour === f} onClick={() => set({ cakeFlavour: f })} />
              ))}
            </Section>
          )}

          {c.menuTypes && (
            <Section
              icon={UtensilsCrossed}
              title="Food menu"
              subtitle="Choose your meal preference."
              error={errors.menuType}
            >
              {c.menuTypes.map(m => (
                <Pill key={m} label={m} active={value.menuType === m} onClick={() => set({ menuType: m })} />
              ))}
            </Section>
          )}
        </div>
      )}
    </div>
  );
};