import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  unit?: string;
  note?: string;
  qty: number;
  details?: string[];
  kind?: "ala-carte" | "package";
};

type CartCtx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "ritualease.cart.v1";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const add: CartCtx["add"] = (item, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(x => x.id === item.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { ...item, qty }];
    });
  };
  const remove = (id: string) => setItems(prev => prev.filter(x => x.id !== id));
  const setQty = (id: string, qty: number) => setItems(prev =>
    prev.map(x => x.id === id ? { ...x, qty: Math.max(1, qty) } : x)
  );
  const clear = () => setItems([]);

  const count = items.reduce((s, x) => s + x.qty, 0);
  const subtotal = items.reduce((s, x) => s + x.price * x.qty, 0);

  const value = useMemo<CartCtx>(() => ({
    items, add, remove, setQty, clear, count, subtotal,
    isOpen, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false),
  }), [items, isOpen, count, subtotal]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
};

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
};
