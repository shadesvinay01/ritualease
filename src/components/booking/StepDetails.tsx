import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type DetailsValue = {
  date?: Date;
  time: string;
  name: string;
  phone: string;
  address: string;
  city: string;
};

export const StepDetails = ({ value, onChange, errors }: { value: DetailsValue; onChange: (v: DetailsValue) => void; errors: Partial<Record<keyof DetailsValue, string>>; }) => {
  const set = <K extends keyof DetailsValue>(k: K, v: DetailsValue[K]) => onChange({ ...value, [k]: v });

  return (
    <div>
      <h2 className="font-display text-2xl md:text-3xl mb-2">When & where?</h2>
      <p className="text-muted-foreground mb-6">Tell us your date and where to bring the magic.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="mb-1.5 block">Celebration date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className={cn("w-full justify-start text-left font-normal h-11", !value.date && "text-muted-foreground")}>
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value.date ? format(value.date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={value.date} onSelect={(d) => set("date", d)} disabled={(d) => d < new Date(new Date().setHours(0,0,0,0))} initialFocus className={cn("p-3 pointer-events-auto")} />
            </PopoverContent>
          </Popover>
          {errors.date && <p className="text-xs text-destructive mt-1">{errors.date}</p>}
        </div>
        <div>
          <Label className="mb-1.5 block">Preferred time *</Label>
          <Input type="time" value={value.time} onChange={e => set("time", e.target.value)} className="h-11" />
          {errors.time && <p className="text-xs text-destructive mt-1">{errors.time}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="mb-1.5 block">Your name *</Label>
          <Input value={value.name} maxLength={80} onChange={e => set("name", e.target.value)} placeholder="Priya Sharma" className="h-11" />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <Label className="mb-1.5 block">WhatsApp number *</Label>
          <Input value={value.phone} maxLength={15} onChange={e => set("phone", e.target.value.replace(/[^0-9+]/g, ""))} placeholder="+91 98xxxxxxxx" className="h-11" />
          {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
        </div>
      </div>

      <div className="mb-4">
        <Label className="mb-1.5 block">City *</Label>
        <Input value={value.city} maxLength={50} onChange={e => set("city", e.target.value)} placeholder="Delhi / Gurgaon / Noida" className="h-11" />
        {errors.city && <p className="text-xs text-destructive mt-1">{errors.city}</p>}
      </div>

      <div>
        <Label className="mb-1.5 block">Full address *</Label>
        <Textarea value={value.address} maxLength={300} onChange={e => set("address", e.target.value)} placeholder="House no, street, locality, landmark" rows={3} />
        {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
      </div>
    </div>
  );
};
