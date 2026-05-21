"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

export type MenuItem = {
  id: string;
  name: string;
  category: "coffee" | "food" | "sweets";
  price: number;
  description: string;
  dietary?: ("vegan" | "gf" | "nut-free")[];
  available: boolean;
};

export type BeanProduct = {
  id: string;
  name: string;
  price: number;
  description: string;
  origin: string;
  roast: "Light" | "Medium" | "Dark";
  notes: string[];
  image: string;
  process: string;
  altitude: string;
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  size: "250g" | "1kg" | "Standard";
  image: string;
};

export type CheckoutInfo = {
  fullName: string;
  email: string;
  phone: string;
  method: "pickup" | "delivery";
  address?: string;
  timeSlot: string;
};

type CafeContextType = {
  menuItems: MenuItem[];
  beanProducts: BeanProduct[];
  cart: CartItem[];
  addToCart: (product: BeanProduct | MenuItem, size?: "250g" | "1kg" | "Standard", quantity?: number) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  checkoutInfo: CheckoutInfo | null;
  setCheckoutInfo: Dispatch<SetStateAction<CheckoutInfo | null>>;
  lastOrderId: string | null;
  setLastOrderId: Dispatch<SetStateAction<string | null>>;
  resetDemo: () => void;
  view: string;
  selectedId: string | undefined;
  changeView: (view: string, id?: string) => void;
};

const CafeContext = createContext<CafeContextType | undefined>(undefined);

export const initialMenuItems: MenuItem[] = [
  { id: "espresso", name: "Espresso", category: "coffee", price: 180, description: "Double shot of our signature Attikan single-origin crop.", available: true },
  { id: "cortado", name: "Cortado", category: "coffee", price: 210, description: "Equal parts espresso and steamed organic A2 milk.", available: true },
  { id: "cappuccino", name: "Cappuccino", category: "coffee", price: 240, description: "Espresso with structured microfoam.", available: true },
  { id: "latte", name: "Latte", category: "coffee", price: 260, description: "Double espresso with steamed milk and light foam.", available: true },
  { id: "pour-over", name: "Pour Over", category: "coffee", price: 280, description: "Single-origin Araku Valley, brewed manually to order.", available: true },
  { id: "cold-brew", name: "Cold Brew", category: "coffee", price: 250, description: "24-hour slow steep, served over ice. Crisp & refreshing.", available: true },
  
  { id: "sourdough-toast", name: "Sourdough Toast", category: "food", price: 220, description: "Thick slice of house sourdough, served with salted butter and local mango preserve.", dietary: ["vegan"], available: true },
  { id: "avocado-toast", name: "Avocado Toast", category: "food", price: 380, description: "Smashed avocado, organic radish, chili flakes, and microgreens on toasted sourdough.", dietary: ["vegan"], available: true },
  { id: "granola-bowl", name: "Granola Bowl", category: "food", price: 340, description: "House-toasted grain granola, organic set yogurt (or coconut yogurt), seasonal berries, and wild forest honey.", dietary: ["gf"], available: true },
  { id: "shakshuka", name: "Shakshuka", category: "food", price: 420, description: "Two free-range poached eggs in a spiced tomato and bell pepper stew, topped with feta and coriander, served with grilled sourdough.", available: true },

  { id: "almond-croissant", name: "Almond Croissant", category: "sweets", price: 280, description: "Double-baked butter croissant filled with frangipane cream and topped with sliced almonds.", dietary: ["nut-free"], available: false }, // nut-free flag just to show tag
  { id: "cinnamon-bun", name: "Cardamom & Cinnamon Bun", category: "sweets", price: 240, description: "Soft cardamom-spiced dough rolled with cinnamon sugar and finished with vanilla glaze.", available: true },
  { id: "chocolate-brownie", name: "Chocolate Brownie", category: "sweets", price: 220, description: "Rich, fudgy single-origin dark chocolate brownie with sea salt flakes.", dietary: ["gf"], available: true },
];

export const initialBeanProducts: BeanProduct[] = [
  {
    id: "attikan-estate",
    name: "Attikan Estate Single Origin",
    price: 490.0,
    description: "Our signature espresso roast from the Biligirirangana (BR) Hills. Perfectly balanced, offering a rich chocolatey body.",
    origin: "BR Hills, Karnataka",
    roast: "Medium",
    notes: ["Dark Chocolate", "Fig", "Roasted Almond"],
    image: "/media/showcase/attikan-estate.png",
    process: "Washed",
    altitude: "1,550 - 1,650m",
  },
  {
    id: "bettadakhan-estate",
    name: "Bettadakhan Estate Arabica",
    price: 520.0,
    description: "Grown in the birthplace of Indian coffee, Baba Budan Giri. An incredibly smooth and balanced medium-dark roast with notes of warm spices.",
    origin: "Baba Budan Giri, Karnataka",
    roast: "Medium",
    notes: ["Cardamom", "Brown Sugar", "Cocoa Nibs"],
    image: "/media/showcase/bettadakhan-estate.png",
    process: "Natural",
    altitude: "1,400 - 1,500m",
  },
  {
    id: "araku-valley-organic",
    name: "Araku Valley Organic",
    price: 580.0,
    description: "A vibrant, floral light roast sourced from tribal cooperatives in Araku Valley. Best enjoyed as a pour-over or black coffee.",
    origin: "Araku Valley, Andhra Pradesh",
    roast: "Light",
    notes: ["Jasmine", "Sweet Orange", "Wild Honey"],
    image: "/media/showcase/araku-valley.png",
    process: "Honey Process",
    altitude: "1,100 - 1,200m",
  },
  {
    id: "decaf-coorg",
    name: "Coorg Arabica Decaf",
    price: 540.0,
    description: "Water-process decaf from Coorg with all the sweetness and body of a traditional single-origin crop.",
    origin: "Coorg, Karnataka",
    roast: "Medium",
    notes: ["Caramel", "Milk Chocolate", "Red Apple"],
    image: "/media/showcase/coorg-decaf.png",
    process: "Swiss Water Process",
    altitude: "1,200m",
  },
];

export function CafeProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo | null>(null);
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);
  const [view, setView] = useState("home");
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);

  const changeView = useCallback((newView: string, id?: string) => {
    setView(newView);
    setSelectedId(id);
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set("view", newView);
      if (id) {
        searchParams.set("id", id);
      } else {
        searchParams.delete("id");
      }
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({ view: newView, id }, "", newUrl);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const viewParam = params.get("view") || "home";
      const idParam = params.get("id") || undefined;
      setView(viewParam);
      setSelectedId(idParam);
    };

    // Initialize from URL on mount
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get("view") || "home";
    const idParam = params.get("id") || undefined;
    setView(viewParam);
    setSelectedId(idParam);

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const addToCart = useCallback((product: BeanProduct | MenuItem, size: "250g" | "1kg" | "Standard" = "Standard", quantity: number = 1) => {
    setCart((current) => {
      const isBean = "notes" in product;
      const itemId = product.id;
      const defaultSize = isBean ? (size === "Standard" ? "250g" : size) : "Standard";
      const image = isBean ? (product as BeanProduct).image : "/media/showcase/the-roastery-hero.webp";
      
      const existingIndex = current.findIndex(
        (item) => item.productId === itemId && item.size === defaultSize
      );

      let price = product.price;
      if (isBean && defaultSize === "1kg") {
        price = product.price * 3.5; // discounted bulk price for 1kg
      }

      if (existingIndex > -1) {
        const next = [...current];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...current,
        {
          productId: itemId,
          name: product.name,
          price,
          quantity,
          size: defaultSize,
          image,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: string, size: string) => {
    setCart((current) => current.filter((item) => !(item.productId === productId && item.size === size)));
  }, []);

  const updateQuantity = useCallback((productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }
    setCart((current) =>
      current.map((item) =>
        item.productId === productId && item.size === size ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const cartCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const resetDemo = useCallback(() => {
    setCart([]);
    setCheckoutInfo(null);
    setLastOrderId(null);
  }, []);

  return (
    <CafeContext.Provider
      value={{
        menuItems: initialMenuItems,
        beanProducts: initialBeanProducts,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        checkoutInfo,
        setCheckoutInfo,
        lastOrderId,
        setLastOrderId,
        resetDemo,
        view,
        selectedId,
        changeView,
      }}
    >
      {children}
    </CafeContext.Provider>
  );
}

export function useCafe() {
  const context = useContext(CafeContext);
  if (!context) {
    throw new Error("useCafe must be used within a CafeProvider");
  }
  return context;
}
