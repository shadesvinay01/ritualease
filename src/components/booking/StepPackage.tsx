import { useMemo, useState } from "react";
import { PACKAGES } from "@/data/booking";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPackageMood } from "@/lib/packageMood";

const cats = ["Parties", "Pujas"] as const;

export const StepPackage = ({ value, onChange }: { value: string | null; onChange: (id: string) => void }) => {
  const [cat, setCat] = useState<(typeof cats)[number]>("Parties");
  const list = useMemo(() => PACKAGES.filter(p => p.category === cat), [cat]);

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl mb-2">Choose your package</h2>
      <p className="text-muted-foreground mb-6">Pick a curated package — we'll handle setup, execution and cleanup.</p>

      <div className="inline-flex p-1 bg-muted rounded-full mb-6">
        {cats.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn("px-5 py-2 rounded-full text-sm font-semibold transition-all", cat === c ? "bg-gradient-rose text-cream shadow-soft" : "text-muted-foreground hover:text-foreground")}
          >{c}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {list.map((p) => {
          const selected = value === p.id;
          const mood = getPackageMood(p.id, p.category);
          return (
            <button
              key={p.id}
              onClick={() => onChange(p.id)}
              className={cn(
                "text-left p-5 rounded-2xl border-2 transition-all hover:-translate-y-0.5",
                mood,
                selected ? "border-rose shadow-elegant" : "border-border hover:border-rose/40 shadow-soft"
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-display text-lg leading-tight">{p.title}</h3>
                <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition bg-card/70", selected ? "bg-rose border-rose" : "border-border")}>
                  {selected && <Check className="h-3.5 w-3.5 text-cream" />}
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-3">{p.guests}</p>
              <ul className="space-y-1 mb-4">
                {p.bullets.slice(0, 3).map(b => (
                  <li key={b} className="text-xs text-foreground/75 flex gap-1.5"><span className="text-rose">•</span>{b}</li>
                ))}
              </ul>
              <p className="font-display text-xl text-rose font-bold">₹{p.price.toLocaleString("en-IN")}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
