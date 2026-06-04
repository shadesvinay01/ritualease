import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, MapPin, Package as PackageIcon, ChevronDown, ChevronUp } from "lucide-react";
import { format } from "date-fns";

type OrderStatus = "pending" | "confirmed" | "in_progress" | "completed" | "cancelled";
type AddonRow = { id: string; name: string; price: number };
type AddressSnap = { full_address?: string; city?: string };

type Order = {
  id: string;
  order_number: string;
  package_title: string;
  package_price: number;
  scheduled_date: string | null;
  scheduled_time: string | null;
  contact_name: string;
  contact_phone: string;
  address_snapshot: AddressSnap;
  addons: AddonRow[];
  subtotal: number;
  discount: number;
  total: number;
  status: OrderStatus;
  created_at: string;
};

const ONGOING: OrderStatus[] = ["pending", "confirmed", "in_progress"];
const HISTORY: OrderStatus[] = ["completed", "cancelled"];

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-900",
  confirmed: "bg-blue-100 text-blue-900",
  in_progress: "bg-violet-100 text-violet-900",
  completed: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-rose-100 text-rose-900",
};

const statusLabel: Record<OrderStatus, string> = {
  pending: "Pending confirmation",
  confirmed: "Confirmed",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const OrdersSection = ({ mode }: { mode: "ongoing" | "history" }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      setLoading(true);
      const statuses = mode === "ongoing" ? ONGOING : HISTORY;
      const { data, error } = await supabase
        .from("orders").select("*")
        .eq("user_id", user.id)
        .in("status", statuses)
        .order("created_at", { ascending: false });
      setLoading(false);
      if (error) return;
      setOrders((data || []) as unknown as Order[]);
    };
    load();
  }, [user?.id, mode]);

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  if (loading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-rose" /></div>;
  }

  if (orders.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border/60 p-10 text-center">
        <PackageIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
        <p className="font-medium">{mode === "ongoing" ? "No ongoing bookings" : "No past bookings yet"}</p>
        <p className="text-sm text-muted-foreground mt-1">
          {mode === "ongoing" ? "Your active bookings will appear here." : "Your completed bookings will appear here."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map(o => {
        const isOpen = expanded.has(o.id);
        return (
          <div key={o.id} className="bg-card rounded-2xl border border-border/60 shadow-soft overflow-hidden">
            <button
              onClick={() => toggle(o.id)}
              className="w-full text-left p-5 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-xs text-muted-foreground">{o.order_number}</span>
                    <Badge className={statusStyles[o.status] + " border-transparent"}>{statusLabel[o.status]}</Badge>
                  </div>
                  <p className="font-display text-lg leading-tight">{o.package_title}</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-muted-foreground">
                    {o.scheduled_date && (
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />
                        {format(new Date(o.scheduled_date), "d MMM yyyy")}{o.scheduled_time ? ` · ${o.scheduled_time}` : ""}
                      </span>
                    )}
                    {o.address_snapshot?.city && (
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {o.address_snapshot.city}</span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-display text-lg text-rose font-bold">₹{o.total.toLocaleString("en-IN")}</p>
                  <span className="inline-flex items-center text-xs text-muted-foreground mt-1">
                    {isOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    {isOpen ? "Hide" : "Details"}
                  </span>
                </div>
              </div>
            </button>

            {isOpen && (
              <div className="px-5 pb-5 border-t border-border bg-muted/20 text-sm space-y-3 pt-4">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div><span className="text-muted-foreground">Contact: </span><span className="font-medium">{o.contact_name}</span></div>
                  <div><span className="text-muted-foreground">Phone: </span><span className="font-medium">{o.contact_phone}</span></div>
                  {o.address_snapshot?.full_address && (
                    <div className="sm:col-span-2"><span className="text-muted-foreground">Address: </span><span className="font-medium">{o.address_snapshot.full_address}</span></div>
                  )}
                </div>

                <div className="border-t border-border pt-3">
                  <div className="flex justify-between"><span>Package</span><span>₹{o.package_price.toLocaleString("en-IN")}</span></div>
                  {o.addons?.length > 0 && o.addons.map(a => (
                    <div key={a.id} className="flex justify-between text-muted-foreground"><span>+ {a.name}</span><span>₹{a.price.toLocaleString("en-IN")}</span></div>
                  ))}
                  {o.discount > 0 && (
                    <div className="flex justify-between text-rose"><span>Discount</span><span>-₹{o.discount.toLocaleString("en-IN")}</span></div>
                  )}
                  <div className="flex justify-between font-bold border-t border-border mt-2 pt-2">
                    <span>Total</span><span>₹{o.total.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground">Booked on {format(new Date(o.created_at), "d MMM yyyy, h:mm a")}</p>

                <div className="flex gap-2 pt-1">
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://wa.me/919958461103?text=${encodeURIComponent(`Hi, I have a question about my order ${o.order_number}`)}`} target="_blank" rel="noopener noreferrer">
                      Chat on WhatsApp
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
