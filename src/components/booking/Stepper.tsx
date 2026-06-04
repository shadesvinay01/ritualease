import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = ["Package", "Customise", "Add-ons", "Date & Address", "Confirm"];

export const Stepper = ({ current }: { current: number }) => (
  <div className="w-full">
    <ol className="flex items-center justify-between gap-2">
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex-1 flex items-center gap-2 min-w-0">
            <div className="flex flex-col items-center gap-2 min-w-0">
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all shrink-0",
                  done && "bg-rose border-rose text-cream",
                  active && "bg-gradient-rose border-rose text-cream shadow-elegant scale-110",
                  !done && !active && "bg-background border-border text-muted-foreground"
                )}
              >
                {done ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              <span className={cn("text-[11px] md:text-xs font-medium text-center truncate max-w-[72px]", active ? "text-rose" : "text-muted-foreground")}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("flex-1 h-0.5 -mt-6 transition-colors", done ? "bg-rose" : "bg-border")} />
            )}
          </li>
        );
      })}
    </ol>
  </div>
);
