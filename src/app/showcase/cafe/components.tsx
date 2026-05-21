"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, type ReactNode } from "react";
import {
  ArrowRight,
  ShoppingBag,
  X,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Clock,
  Coffee,
  Menu,
} from "lucide-react";
import { useCafe } from "./context";
import { cafeTokens, routes } from "./tokens";

function getViewFromHref(href: string): { view: string; id?: string } | null {
  if (!href.startsWith("/showcase/cafe")) return null;
  if (href === "/showcase/cafe" || href === "/showcase/cafe/") return { view: "home" };
  if (href.startsWith("/showcase/cafe/menu")) return { view: "menu" };
  if (href.startsWith("/showcase/cafe/shop")) return { view: "shop" };
  if (href.startsWith("/showcase/cafe/checkout")) return { view: "checkout" };
  if (href.startsWith("/showcase/cafe/order-success")) return { view: "order-success" };
  if (href.startsWith("/showcase/cafe/product/")) {
    const parts = href.split("/");
    const id = parts[parts.length - 1];
    return { view: "product-detail", id };
  }
  return null;
}

export function CafeButton({
  href,
  children,
  onClick,
  variant = "primary",
  disabled = false,
  className = "",
}: {
  href?: string;
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "text";
  disabled?: boolean;
  className?: string;
}) {
  const { changeView } = useCafe();
  const baseClass =
    "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:transform-none disabled:shadow-none";

  let styles = {};
  if (variant === "primary") {
    styles = {
      backgroundColor: cafeTokens.color.inkDark,
      color: cafeTokens.color.bgIvory,
    };
  } else if (variant === "secondary") {
    styles = {
      backgroundColor: cafeTokens.color.copper,
      color: cafeTokens.color.bgIvory,
    };
  } else if (variant === "outline") {
    styles = {
      border: `1px solid ${cafeTokens.color.inkDark}`,
      color: cafeTokens.color.inkDark,
      backgroundColor: "transparent",
    };
  } else {
    styles = {
      color: cafeTokens.color.copper,
      backgroundColor: "transparent",
      padding: "0",
      minHeight: "auto",
    };
  }

  const hoverClass =
    variant === "primary"
      ? "hover:bg-[oklch(0.46_0.13_32)] hover:text-white"
      : variant === "secondary"
        ? "hover:bg-[oklch(0.55_0.15_32)]"
        : variant === "outline"
          ? "hover:bg-[oklch(0.26_0.018_35)] hover:text-white"
          : "hover:underline";

  const content = (
    <>
      {children}
      {variant !== "text" && <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  const spaRoute = href ? getViewFromHref(href) : null;

  const handleOnClick = (e: React.MouseEvent) => {
    if (spaRoute) {
      e.preventDefault();
      changeView(spaRoute.view, spaRoute.id);
      if (onClick) {
        onClick();
      }
      return;
    }
    if (onClick) {
      onClick();
    }
  };

  if (href && !spaRoute) {
    return (
      <Link
        href={href}
        prefetch={false}
        className={`${baseClass} group ${hoverClass} ${className}`}
        style={styles}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      onClick={handleOnClick}
      disabled={disabled}
      className={`${baseClass} group ${hoverClass} ${className}`}
      style={styles}
    >
      {content}
    </button>
  );
}

export function CafePanel({
  children,
  className = "",
  bg = "white",
  style = {},
}: {
  children: ReactNode;
  className?: string;
  bg?: "white" | "paper" | "peach";
  style?: React.CSSProperties;
}) {
  const bgColors = {
    white: cafeTokens.color.bgWhite,
    paper: cafeTokens.color.bgPaper,
    peach: cafeTokens.color.peachBg,
  };

  return (
    <div
      className={`rounded-2xl border p-6 md:p-8 shadow-panel transition-all duration-300 hover:shadow-lift hover:-translate-y-0.5 ${className}`}
      style={{
        backgroundColor: bgColors[bg],
        borderColor: cafeTokens.color.rule,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function CafeNav() {
  const { cartCount, view, changeView } = useCafe();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [activeBranch, setActiveBranch] = useState<"indiranagar" | "koramangala">("indiranagar");
  const [shouldAnimateCart, setShouldAnimateCart] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShouldAnimateCart(true);
      const timer = setTimeout(() => setShouldAnimateCart(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  const branches = {
    indiranagar: {
      name: "Indiranagar Flagship",
      status: "Roasting Today",
      short: "Indiranagar",
      telemetry: [
        { label: "Water Temp", value: "94.2°C" },
        { label: "Extraction", value: "9.2 bar" },
        { label: "Active Baristas", value: "Vikram & Priya" },
        { label: "Current Roast", value: "Attikan Medium" }
      ]
    },
    koramangala: {
      name: "Koramangala Roastery",
      status: "Brew Bar Active",
      short: "Koramangala",
      telemetry: [
        { label: "Water Temp", value: "93.8°C" },
        { label: "Extraction", value: "9.0 bar" },
        { label: "Active Baristas", value: "Kabir & Anjali" },
        { label: "Current Roast", value: "Araku Organic Light" }
      ]
    }
  };

  return (
    <>
      <style>{`
        @keyframes cartPulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .animate-cart-pulse {
          animation: cartPulse 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
      `}</style>

      <nav
        className="fixed top-[64px] left-4 right-4 md:left-8 md:right-8 z-40 rounded-full border backdrop-blur-md transition-all duration-300 shadow-[0_12px_40px_-16px_rgba(44,36,27,0.15)]"
        style={{
          backgroundColor: `${cafeTokens.color.bgIvory}E6`,
          borderColor: `${cafeTokens.color.inkDark}1E`,
        }}
      >
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex justify-between items-center relative">
          {/* Logo */}
          <button
            onClick={() => changeView("home")}
            className="flex items-center gap-2.5 select-none group bg-transparent border-0 cursor-pointer p-0 text-left"
            style={{ color: cafeTokens.color.inkDark }}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[oklch(0.26_0.018_35)] text-[oklch(0.978_0.008_85)] group-hover:rotate-[360deg] transition-all duration-700">
              <Coffee className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs md:text-sm font-black tracking-tight leading-none" style={{ fontFamily: cafeTokens.font.display }}>
                THE ROASTERY
              </span>
              <span className="text-[7px] md:text-[8px] font-bold tracking-[0.25em] uppercase mt-0.5" style={{ color: cafeTokens.color.copper }}>
                Bengaluru
              </span>
            </div>
          </button>

          {/* Links & Branch Switcher (desktop) */}
          <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold tracking-[0.2em] uppercase">
            <button
              onClick={() => changeView("menu")}
              className={`hover:text-[oklch(0.46_0.13_32)] transition-colors min-h-11 inline-flex items-center bg-transparent border-0 cursor-pointer p-0 text-[10px] font-bold tracking-[0.2em] uppercase ${view === "menu" ? "text-[oklch(0.46_0.13_32)]" : ""}`}
            >
              Menu
            </button>
            <button
              onClick={() => changeView("shop")}
              className={`hover:text-[oklch(0.46_0.13_32)] transition-colors min-h-11 inline-flex items-center bg-transparent border-0 cursor-pointer p-0 text-[10px] font-bold tracking-[0.2em] uppercase ${view === "shop" ? "text-[oklch(0.46_0.13_32)]" : ""}`}
            >
              Coffee Beans
            </button>

            <span className="h-4 w-px bg-current opacity-10"></span>

            {/* Live Telemetry Status Widget */}
            <div className="relative">
              <button
                onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-[8px] font-black tracking-[0.15em] uppercase transition-all duration-300 hover:bg-[rgba(44,36,27,0.03)]"
                style={{
                  borderColor: `${cafeTokens.color.inkDark}1E`,
                  color: cafeTokens.color.inkDark
                }}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span>{branches[activeBranch].short} • {branches[activeBranch].status}</span>
              </button>

              {branchDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setBranchDropdownOpen(false)} />
                  <div
                    className="absolute top-10 left-0 w-64 p-4 rounded-2xl border shadow-xl z-50 text-left transition-all duration-300 animate-in fade-in slide-in-from-top-2"
                    style={{
                      backgroundColor: cafeTokens.color.bgIvory,
                      borderColor: `${cafeTokens.color.inkDark}1F`,
                      boxShadow: "0 10px 30px -10px oklch(0.26 0.018 35 / 0.15)"
                    }}
                  >
                    <div className="text-[8px] font-bold tracking-widest uppercase opacity-50 mb-3">Live Telemetry</div>
                    <div className="flex gap-2 mb-4 p-1 rounded-full bg-[rgba(44,36,27,0.03)] border" style={{ borderColor: `${cafeTokens.color.inkDark}08` }}>
                      <button
                        onClick={() => setActiveBranch("indiranagar")}
                        className={`flex-1 text-[8px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider transition-all ${activeBranch === "indiranagar" ? "bg-[oklch(0.26_0.018_35)] text-white" : "opacity-60"}`}
                      >
                        Indiranagar
                      </button>
                      <button
                        onClick={() => setActiveBranch("koramangala")}
                        className={`flex-1 text-[8px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider transition-all ${activeBranch === "koramangala" ? "bg-[oklch(0.26_0.018_35)] text-white" : "opacity-60"}`}
                      >
                        Koramangala
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {branches[activeBranch].telemetry.map((t, idx) => (
                        <div key={idx} className="flex justify-between border-b pb-1.5 last:border-0 last:pb-0" style={{ borderColor: `${cafeTokens.color.inkDark}0F` }}>
                          <span className="text-[9px] opacity-60 font-medium normal-case">{t.label}</span>
                          <span className="text-[9px] font-bold" style={{ color: cafeTokens.color.copper }}>{t.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setCartOpen(true)}
              className={`flex min-h-11 items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors hover:text-[oklch(0.46_0.13_32)] relative ${shouldAnimateCart ? 'animate-cart-pulse' : ''}`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart ({cartCount})</span>
              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-2 text-[9px] text-white w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300"
                  style={{ backgroundColor: cafeTokens.color.copper }}
                >
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => changeView("menu")}
              className="hidden min-h-11 items-center px-6 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-300 rounded-full hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] sm:inline-flex cursor-pointer border-0"
              style={{
                backgroundColor: cafeTokens.color.inkDark,
                color: cafeTokens.color.bgIvory,
              }}
            >
              Order Pickup
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -mr-2 min-h-11 min-w-11 flex items-center justify-center transition-colors hover:text-[oklch(0.46_0.13_32)]"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Responsive Mobile Drawer */}
          {mobileMenuOpen && (
            <div
              className="lg:hidden absolute top-[72px] left-0 right-0 border p-6 rounded-3xl flex flex-col gap-6 shadow-2xl z-40 animate-in slide-in-from-top-5 duration-300"
              style={{
                backgroundColor: cafeTokens.color.bgIvory,
                borderColor: `${cafeTokens.color.inkDark}1E`
              }}
            >
              <div className="flex flex-col gap-4 text-xs font-bold tracking-[0.2em] uppercase items-start">
                <button
                  onClick={() => { changeView("menu"); setMobileMenuOpen(false); }}
                  className={`w-full pb-3 border-b hover:text-[oklch(0.46_0.13_32)] transition-colors text-left bg-transparent border-0 font-bold uppercase tracking-[0.2em] text-xs ${view === "menu" ? "text-[oklch(0.46_0.13_32)]" : ""}`}
                  style={{ borderColor: `${cafeTokens.color.inkDark}0F` }}
                >
                  Menu
                </button>
                <button
                  onClick={() => { changeView("shop"); setMobileMenuOpen(false); }}
                  className={`w-full pb-3 border-b hover:text-[oklch(0.46_0.13_32)] transition-colors text-left bg-transparent border-0 font-bold uppercase tracking-[0.2em] text-xs ${view === "shop" ? "text-[oklch(0.46_0.13_32)]" : ""}`}
                  style={{ borderColor: `${cafeTokens.color.inkDark}0F` }}
                >
                  Coffee Beans
                </button>
              </div>
              
              {/* Mobile Telemetry Status Switcher */}
              <div className="rounded-2xl p-4 border" style={{ backgroundColor: "rgba(44,36,27,0.02)", borderColor: `${cafeTokens.color.inkDark}0F` }}>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[8px] font-bold tracking-widest uppercase opacity-50">Branch Status</span>
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                  </span>
                </div>
                <div className="flex gap-2 mb-3 p-0.5 rounded-full bg-[rgba(44,36,27,0.03)] border" style={{ borderColor: `${cafeTokens.color.inkDark}08` }}>
                  <button
                    onClick={() => setActiveBranch("indiranagar")}
                    className={`flex-1 text-[8px] font-bold py-1.5 px-2.5 rounded-full uppercase tracking-wider transition-all ${activeBranch === "indiranagar" ? "bg-[oklch(0.26_0.018_35)] text-white" : "opacity-60"}`}
                  >
                    Indiranagar
                  </button>
                  <button
                    onClick={() => setActiveBranch("koramangala")}
                    className={`flex-1 text-[8px] font-bold py-1.5 px-2.5 rounded-full uppercase tracking-wider transition-all ${activeBranch === "koramangala" ? "bg-[oklch(0.26_0.018_35)] text-white" : "opacity-60"}`}
                  >
                    Koramangala
                  </button>
                </div>
                <div className="space-y-1.5 text-left">
                  {branches[activeBranch].telemetry.slice(0, 3).map((t, idx) => (
                    <div key={idx} className="flex justify-between text-[10px]">
                      <span className="opacity-60 font-medium">{t.label}:</span>
                      <span className="font-bold" style={{ color: cafeTokens.color.copper }}>{t.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { changeView("menu"); setMobileMenuOpen(false); }}
                className="min-h-11 flex items-center justify-center px-6 text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-colors cursor-pointer border-0"
                style={{
                  backgroundColor: cafeTokens.color.inkDark,
                  color: cafeTokens.color.bgIvory,
                }}
              >
                Order Pickup
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCafe();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div
          className="w-screen max-w-md flex flex-col shadow-2xl border-l h-full"
          style={{
            backgroundColor: cafeTokens.color.bgIvory,
            borderColor: cafeTokens.color.rule,
          }}
        >
          {/* Header */}
          <div className="px-6 py-6 border-b flex justify-between items-center" style={{ borderColor: cafeTokens.color.rule }}>
            <h2 className="text-xl font-bold flex items-center gap-2" style={{ fontFamily: cafeTokens.font.display }}>
              Your Order <span className="text-sm font-normal text-gray-500">({cartCount} items)</span>
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {cart.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-gradient-to-b from-transparent to-[oklch(0.965_0.012_80_/_0.3)] rounded-2xl">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ backgroundColor: cafeTokens.color.peachBg }}>
                  <Coffee className="w-8 h-8" style={{ color: cafeTokens.color.copper }} />
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: cafeTokens.font.display }}>Your basket is empty</h3>
                <p className="text-sm text-gray-500 max-w-[240px] leading-relaxed mb-8">
                  Scent of freshly ground single-origin Indian coffee awaits!
                </p>
                <CafeButton onClick={onClose} variant="secondary" className="w-full">
                  Explore Menu
                </CafeButton>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex gap-4 pb-6 border-b"
                  style={{ borderColor: cafeTokens.color.rule }}
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border bg-white shadow-sm">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold truncate">{item.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                    <div className="flex justify-between items-center mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border rounded-full overflow-hidden bg-white shadow-sm" style={{ borderColor: cafeTokens.color.rule }}>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
                          className="px-2.5 py-1 hover:bg-gray-50 text-gray-500 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
                          className="px-2.5 py-1 hover:bg-gray-50 text-gray-500 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId, item.size)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-sm font-bold">₹{item.price * item.quantity}</span>
                    {item.quantity > 1 && (
                      <p className="text-[10px] text-gray-500 mt-0.5">₹{item.price} each</p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="px-6 py-6 border-t space-y-4" style={{ borderColor: cafeTokens.color.rule }}>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-bold text-lg">₹{cartTotal}</span>
              </div>
              <p className="text-[11px] text-gray-500">
                Taxes and fulfillment details are calculated at checkout.
              </p>
              <CafeButton href={routes.checkout} className="w-full" variant="secondary" onClick={onClose}>
                Proceed to Checkout
              </CafeButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function CafeFooter() {
  const { changeView } = useCafe();
  return (
    <footer
      id="contact"
      className="pt-24 pb-12 px-6 md:px-12 border-t"
      style={{
        backgroundColor: cafeTokens.color.inkDark,
        color: cafeTokens.color.bgIvory,
        borderColor: `${cafeTokens.color.bgIvory}1A`,
      }}
    >
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24 font-sans">
        <div className="flex flex-col items-start">
          <button
            onClick={() => changeView("home")}
            className="flex flex-col mb-8 text-left bg-transparent border-0 cursor-pointer p-0 text-white select-none group"
          >
            <span className="text-2xl font-bold tracking-tighter leading-none" style={{ fontFamily: cafeTokens.font.display }}>
              THE ROASTERY
            </span>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase mt-1" style={{ color: cafeTokens.color.peachSoft }}>
              Specialty Coffee
            </span>
          </button>
          <p className="text-sm opacity-70 max-w-xs leading-relaxed mb-8">
            Exceptional specialty coffee, roasted with care in Bengaluru. Sourced transparently from Indian estates, served without pretense.
          </p>
          <div className="p-4 rounded-xl border text-xs leading-relaxed opacity-80" style={{ borderColor: `${cafeTokens.color.bgIvory}20`, backgroundColor: "rgba(255,255,255,0.03)" }}>
            <strong>Demonstration Mode:</strong> The Roastery is a fictional showcase designed by Kivox. No real orders or transactions are processed.
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: cafeTokens.color.peachSoft }}>
            Explore
          </p>
          <button
            onClick={() => changeView("menu")}
            className="text-sm opacity-80 hover:opacity-100 transition-opacity bg-transparent border-0 cursor-pointer p-0 text-white font-sans text-left"
          >
            Cafe Menu
          </button>
          <button
            onClick={() => changeView("shop")}
            className="text-sm opacity-80 hover:opacity-100 transition-opacity bg-transparent border-0 cursor-pointer p-0 text-white font-sans text-left"
          >
            Buy Beans
          </button>
        </div>

        <div className="flex flex-col gap-4 items-start">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: cafeTokens.color.peachSoft }}>
            Hours & Location
          </p>
          <div className="flex gap-2 text-sm opacity-80 text-left">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <span>12th Main Road, Indiranagar, Bengaluru</span>
          </div>
          <div className="flex gap-2 text-sm opacity-80 text-left">
            <Clock className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Daily: 7AM - 7PM</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start w-full">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase mb-4" style={{ color: cafeTokens.color.peachSoft }}>
            Newsletter
          </p>
          <p className="text-sm opacity-70 mb-2 text-left">
            Receive roasting schedules and fresh crop arrivals.
          </p>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="newsletter-email" className="sr-only">Email Address</label>
            <div className="flex border-b pb-2 focus-within:border-white transition-colors w-full" style={{ borderColor: `${cafeTokens.color.bgIvory}30` }}>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none outline-none text-sm w-full placeholder:opacity-50 text-white"
              />
              <button className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-white shrink-0 bg-transparent border-0 cursor-pointer p-0 text-white">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t text-[10px] font-bold tracking-[0.2em] uppercase opacity-70" style={{ borderColor: `${cafeTokens.color.bgIvory}1A` }}>
        <p>© {new Date().getFullYear()} The Roastery. All Rights Reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <button
            onClick={() => changeView("home")}
            className="hover:opacity-100 transition-opacity bg-transparent border-0 cursor-pointer p-0 text-[10px] font-bold uppercase tracking-[0.2em] text-white font-sans"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => changeView("home")}
            className="hover:opacity-100 transition-opacity bg-transparent border-0 cursor-pointer p-0 text-[10px] font-bold uppercase tracking-[0.2em] text-white font-sans"
          >
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  );
}
