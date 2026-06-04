import { ADDONS } from "@/data/booking";
import { cn } from "@/lib/utils";
import { Plus, Check } from "lucide-react";

export const StepAddOns = ({ selected, onToggle }: { selected: string[]; onToggle: (id: string) => void }) => {
  const grouped = ADDONS.reduce<Record<string, typeof ADDONS>>((acc, a) => {
    (acc[a.category] ||= []).push(a);
    return acc;
  }, {});

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl mb-2">Make it yours</h2>
      <p className="text-muted-foreground mb-6">Optional add-ons to elevate your celebration. Skip if not needed.</p>

      <div className="space-y-6">
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat}>
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3">{cat}</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {items.map(a => {
                const on = selected.includes(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => onToggle(a.id)}
                    className={cn(
                      "flex items-center gap-3 p-4 rounded-xl border-2 bg-card text-left transition-all",
                      on ? "border-rose shadow-soft" : "border-border hover:border-rose/40"
                    )}
                  >
                    <span className="text-2xl">{a.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{a.name}</p>
                      <p className="text-xs text-rose font-bold">+ ₹{a.price.toLocaleString("en-IN")}</p>
                    </div>
                    <div className={cn("w-7 h-7 rounded-full flex items-center justify-center transition", on ? "bg-rose text-cream" : "bg-muted text-muted-foreground")}>
                      {on ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
