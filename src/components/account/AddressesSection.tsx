import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, MapPin, Plus, Pencil, Trash2, Star, Locate } from "lucide-react";

type Address = {
  id: string;
  label: string;
  full_address: string;
  city: string;
  state: string | null;
  pincode: string | null;
  landmark: string | null;
  latitude: number | null;
  longitude: number | null;
  is_default: boolean;
};

const schema = z.object({
  label: z.string().trim().min(1).max(40),
  full_address: z.string().trim().min(10, "Enter a complete address").max(300),
  city: z.string().trim().min(2).max(50),
  state: z.string().trim().max(50).optional().or(z.literal("")),
  pincode: z.string().trim().regex(/^\d{4,8}$/, "Enter a valid pincode").optional().or(z.literal("")),
  landmark: z.string().trim().max(120).optional().or(z.literal("")),
});

const empty = {
  label: "Home",
  full_address: "",
  city: "",
  state: "",
  pincode: "",
  landmark: "",
  is_default: false,
  latitude: null as number | null,
  longitude: null as number | null,
};

export const AddressesSection = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...empty });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("user_addresses").select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });
    setLoading(false);
    if (error) { toast.error("Could not load addresses"); return; }
    setItems((data || []) as Address[]);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user?.id]);

  const openNew = () => {
    setEditId(null);
    setForm({ ...empty, is_default: items.length === 0 });
    setOpen(true);
  };

  const openEdit = (a: Address) => {
    setEditId(a.id);
    setForm({
      label: a.label,
      full_address: a.full_address,
      city: a.city,
      state: a.state || "",
      pincode: a.pincode || "",
      landmark: a.landmark || "",
      is_default: a.is_default,
      latitude: a.latitude,
      longitude: a.longitude,
    });
    setOpen(true);
  };

  const useMyLocation = () => {
    if (!("geolocation" in navigator)) { toast.error("Geolocation not supported"); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm(f => ({ ...f, latitude: pos.coords.latitude, longitude: pos.coords.longitude }));
        toast.success("Location captured");
      },
      () => toast.error("Could not get your location")
    );
  };

  const save = async () => {
    if (!user) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setSaving(true);
    const payload = {
      user_id: user.id,
      label: parsed.data.label,
      full_address: parsed.data.full_address,
      city: parsed.data.city,
      state: parsed.data.state || null,
      pincode: parsed.data.pincode || null,
      landmark: parsed.data.landmark || null,
      latitude: form.latitude,
      longitude: form.longitude,
      is_default: form.is_default,
    };
    const { error } = editId
      ? await supabase.from("user_addresses").update(payload).eq("id", editId)
      : await supabase.from("user_addresses").insert([payload]);
    setSaving(false);
    if (error) { toast.error("Could not save address"); return; }
    toast.success(editId ? "Address updated" : "Address added");
    setOpen(false);
    load();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this address?")) return;
    const { error } = await supabase.from("user_addresses").delete().eq("id", id);
    if (error) { toast.error("Could not delete"); return; }
    toast.success("Address removed");
    load();
  };

  const setDefault = async (id: string) => {
    const { error } = await supabase.from("user_addresses").update({ is_default: true }).eq("id", id);
    if (error) { toast.error("Could not set default"); return; }
    load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">{items.length} saved {items.length === 1 ? "address" : "addresses"}</p>
        <Button variant="hero" size="sm" onClick={openNew}><Plus className="h-4 w-4" /> Add address</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-rose" /></div>
      ) : items.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border/60 p-8 text-center">
          <MapPin className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="font-medium">No addresses saved yet</p>
          <p className="text-sm text-muted-foreground mt-1 mb-4">Add a delivery address for faster checkout.</p>
          <Button variant="hero" onClick={openNew}><Plus className="h-4 w-4" /> Add your first address</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map(a => (
            <div key={a.id} className="bg-card rounded-2xl border border-border/60 shadow-soft p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{a.label}</span>
                  {a.is_default && <Badge variant="secondary" className="gap-1 text-xs"><Star className="h-3 w-3" /> Default</Badge>}
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(a)} aria-label="Edit"><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => remove(a.id)} aria-label="Delete"><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
              <p className="text-sm">{a.full_address}</p>
              <p className="text-sm text-muted-foreground">
                {[a.city, a.state, a.pincode].filter(Boolean).join(", ")}
              </p>
              {a.landmark && <p className="text-xs text-muted-foreground mt-1">Landmark: {a.landmark}</p>}
              {!a.is_default && (
                <Button variant="link" size="sm" className="px-0 mt-2 h-auto" onClick={() => setDefault(a.id)}>Set as default</Button>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId ? "Edit address" : "Add new address"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="mb-1.5 block">Label *</Label>
              <Select value={form.label} onValueChange={v => setForm({ ...form, label: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Home">Home</SelectItem>
                  <SelectItem value="Office">Office</SelectItem>
                  <SelectItem value="Parents">Parents</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1.5 block">Full address *</Label>
              <Textarea rows={3} maxLength={300} value={form.full_address} onChange={e => setForm({ ...form, full_address: e.target.value })} placeholder="House no, street, locality" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1.5 block">City *</Label>
                <Input value={form.city} maxLength={50} onChange={e => setForm({ ...form, city: e.target.value })} />
              </div>
              <div>
                <Label className="mb-1.5 block">State</Label>
                <Input value={form.state} maxLength={50} onChange={e => setForm({ ...form, state: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="mb-1.5 block">Pincode</Label>
                <Input value={form.pincode} maxLength={8} onChange={e => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })} />
              </div>
              <div>
                <Label className="mb-1.5 block">Landmark</Label>
                <Input value={form.landmark} maxLength={120} onChange={e => setForm({ ...form, landmark: e.target.value })} />
              </div>
            </div>
            <div className="flex items-center justify-between gap-3 pt-1">
              <Button type="button" variant="outline" size="sm" onClick={useMyLocation}>
                <Locate className="h-4 w-4" />
                {form.latitude ? "Location captured ✓" : "Use my location"}
              </Button>
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_default}
                  onChange={e => setForm({ ...form, is_default: e.target.checked })}
                  className="h-4 w-4 accent-rose"
                />
                Set as default
              </label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="hero" onClick={save} disabled={saving}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : (editId ? "Save changes" : "Add address")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
