import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Loader2, Mail, Phone, BadgeCheck, AlertCircle } from "lucide-react";

type Profile = {
  id: string;
  customer_id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  gender: "male" | "female" | "other" | "prefer_not_to_say" | null;
  date_of_birth: string | null;
  email_verified: boolean;
  phone_verified: boolean;
};

const schema = z.object({
  full_name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().regex(/^\+?\d{10,15}$/, "Enter a valid phone number"),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional(),
  date_of_birth: z.string().optional().or(z.literal("")),
});

export const ProfileSection = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    gender: "" as Profile["gender"] | "",
    date_of_birth: "",
  });

  const load = async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
    setLoading(false);
    if (error) { toast.error("Could not load profile"); return; }
    if (data) {
      setProfile(data as Profile);
      setForm({
        full_name: data.full_name || "",
        phone: data.phone || "",
        gender: (data.gender as Profile["gender"]) || "",
        date_of_birth: data.date_of_birth || "",
      });
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [user?.id]);

  const save = async () => {
    if (!user) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) { toast.error(parsed.error.issues[0].message); return; }
    setSaving(true);
    const { error } = await supabase.from("profiles").update({
      full_name: parsed.data.full_name,
      phone: parsed.data.phone,
      gender: parsed.data.gender || null,
      date_of_birth: parsed.data.date_of_birth || null,
    }).eq("id", user.id);
    setSaving(false);
    if (error) { toast.error("Could not save changes"); return; }
    toast.success("Profile updated");
    setEditing(false);
    load();
  };

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-rose" /></div>;
  }
  if (!profile) return null;

  return (
    <div className="bg-card rounded-2xl border border-border/60 shadow-soft p-5 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="font-display text-xl md:text-2xl">{profile.full_name || "Your profile"}</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Customer ID: <span className="font-mono font-medium text-foreground">{profile.customer_id}</span>
          </p>
        </div>
        {!editing && <Button variant="outline" size="sm" onClick={() => setEditing(true)}>Edit profile</Button>}
      </div>

      <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
        <div>
          <Label className="mb-1.5 flex items-center gap-2">
            <Mail className="h-3.5 w-3.5" /> Email
            {profile.email_verified
              ? <Badge variant="secondary" className="gap-1 text-xs"><BadgeCheck className="h-3 w-3" /> Verified</Badge>
              : <Badge variant="outline" className="gap-1 text-xs"><AlertCircle className="h-3 w-3" /> Unverified</Badge>}
          </Label>
          <Input value={profile.email || ""} disabled className="bg-muted/40" />
        </div>

        <div>
          <Label className="mb-1.5 flex items-center gap-2">
            <Phone className="h-3.5 w-3.5" /> Mobile number
            {profile.phone_verified
              ? <Badge variant="secondary" className="gap-1 text-xs"><BadgeCheck className="h-3 w-3" /> Verified</Badge>
              : <Badge variant="outline" className="gap-1 text-xs"><AlertCircle className="h-3 w-3" /> Unverified</Badge>}
          </Label>
          <Input
            value={editing ? form.phone : (profile.phone || "—")}
            disabled={!editing}
            maxLength={15}
            onChange={e => setForm({ ...form, phone: e.target.value.replace(/[^0-9+]/g, "") })}
            className={!editing ? "bg-muted/40" : ""}
          />
        </div>

        <div>
          <Label className="mb-1.5 block">Full name</Label>
          <Input
            value={editing ? form.full_name : (profile.full_name || "—")}
            disabled={!editing}
            maxLength={80}
            onChange={e => setForm({ ...form, full_name: e.target.value })}
            className={!editing ? "bg-muted/40" : ""}
          />
        </div>

        <div>
          <Label className="mb-1.5 block">Gender</Label>
          {editing ? (
            <Select value={form.gender || ""} onValueChange={v => setForm({ ...form, gender: v as Profile["gender"] })}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          ) : (
            <Input value={profile.gender ? profile.gender.replace(/_/g, " ") : "—"} disabled className="bg-muted/40 capitalize" />
          )}
        </div>

        <div className="sm:col-span-2">
          <Label className="mb-1.5 block">Date of birth</Label>
          <Input
            type={editing ? "date" : "text"}
            value={editing ? form.date_of_birth : (profile.date_of_birth || "—")}
            disabled={!editing}
            onChange={e => setForm({ ...form, date_of_birth: e.target.value })}
            className={!editing ? "bg-muted/40" : "max-w-xs"}
          />
        </div>
      </div>

      {editing && (
        <div className="mt-6 flex gap-2 justify-end">
          <Button variant="ghost" onClick={() => { setEditing(false); load(); }}>Cancel</Button>
          <Button variant="hero" onClick={save} disabled={saving}>
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save changes"}
          </Button>
        </div>
      )}

      {(!profile.phone_verified || !profile.email_verified) && !editing && (
        <p className="mt-6 text-xs text-muted-foreground border-t border-border pt-4">
          Two-factor verification of mobile and email will be enabled soon.
        </p>
      )}
    </div>
  );
};
