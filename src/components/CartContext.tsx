"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartLine } from "@/lib/types";
import { getProductBySlug } from "@/data/products";

const STORAGE_KEY = "shieldspring-cart";

interface CartContextValue {
  lines: CartLine[];
  addItem: (slug: string, size: string, color: string, quantity?: number) => void;
  updateQuantity: (slug: string, size: string, color: string, quantity: number) => void;
  removeItem: (slug: string, size: string, color: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage, unavailable during SSR
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, isHydrated]);

  const addItem = useCallback(
    (slug: string, size: string, color: string, quantity = 1) => {
      setLines((prev) => {
        const existing = prev.find(
          (l) => l.slug === slug && l.size === size && l.color === color
        );
        if (existing) {
          return prev.map((l) =>
            l === existing ? { ...l, quantity: l.quantity + quantity } : l
          );
        }
        return [...prev, { slug, size, color, quantity }];
      });
    },
    []
  );

  const updateQuantity = useCallback(
    (slug: string, size: string, color: string, quantity: number) => {
      setLines((prev) =>
        quantity <= 0
          ? prev.filter(
              (l) => !(l.slug === slug && l.size === size && l.color === color)
            )
          : prev.map((l) =>
              l.slug === slug && l.size === size && l.color === color
                ? { ...l, quantity }
                : l
            )
      );
    },
    []
  );

  const removeItem = useCallback((slug: string, size: string, color: string) => {
    setLines((prev) =>
      prev.filter((l) => !(l.slug === slug && l.size === size && l.color === color))
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () =>
      lines.reduce((sum, l) => {
        const product = getProductBySlug(l.slug);
        return product ? sum + product.price * l.quantity : sum;
      }, 0),
    [lines]
  );

  const value = useMemo(
    () => ({
      lines,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      itemCount,
      subtotal,
      isHydrated,
    }),
    [lines, addItem, updateQuantity, removeItem, clearCart, itemCount, subtotal, isHydrated]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
