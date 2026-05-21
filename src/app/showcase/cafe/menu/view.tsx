"use client";

import { useState, useMemo } from "react";
import { useCafe } from "../context";
import { CafeButton, CartDrawer } from "../components";
import { cafeTokens, routes } from "../tokens";
import { Leaf, Award, ShoppingBag } from "lucide-react";

export default function CafeMenuPage() {
  const { menuItems, addToCart, cartCount, cartTotal } = useCafe();
  const [activeCategory, setActiveCategory] = useState<"all" | "coffee" | "food" | "sweets">("all");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "vegan" | "gf">("all");
  const [cartOpen, setCartOpen] = useState(false);

  const categories = [
    { id: "all", name: "Full Menu" },
    { id: "coffee", name: "Coffee Bar" },
    { id: "food", name: "Kitchen" },
    { id: "sweets", name: "Breads & Sweets" },
  ] as const;

  const dietaries = [
    { id: "all", name: "All Items" },
    { id: "vegan", name: "Vegan" },
    { id: "gf", name: "Gluten-Free" },
  ] as const;

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const categoryMatch = activeCategory === "all" || item.category === activeCategory;
      const dietaryMatch =
        dietaryFilter === "all" || (item.dietary && item.dietary.includes(dietaryFilter));
      return categoryMatch && dietaryMatch;
    });
  }, [menuItems, activeCategory, dietaryFilter]);

  return (
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12 font-sans space-y-16 pb-32">
      {/* Title */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: cafeTokens.font.display }}>
          Our Menu
        </h1>
        <p className="text-sm md:text-base opacity-75 max-w-md mx-auto">
          Every espresso shot, sourdough plate, and pastry is prepared by hand in our Indiranagar kitchen daily.
        </p>
      </div>

      {/* Filter Toggles */}
      <div className="flex flex-col md:flex-row gap-6 justify-between items-center border-y py-6 border-gray-200">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-full border transition-all duration-200 hover:shadow-sm"
              style={{
                backgroundColor: activeCategory === cat.id ? cafeTokens.color.inkDark : "transparent",
                color: activeCategory === cat.id ? cafeTokens.color.bgIvory : cafeTokens.color.inkDark,
                borderColor: activeCategory === cat.id ? cafeTokens.color.inkDark : `${cafeTokens.color.inkDark}20`,
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Dietary */}
        <div className="flex gap-4 items-center">
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Filter:</span>
          <div className="flex gap-1.5">
            {dietaries.map((diet) => (
              <button
                key={diet.id}
                onClick={() => setDietaryFilter(diet.id)}
                className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded border transition-all duration-200"
                style={{
                  backgroundColor: dietaryFilter === diet.id ? cafeTokens.color.peachBg : "transparent",
                  color: cafeTokens.color.inkDark,
                  borderColor: dietaryFilter === diet.id ? cafeTokens.color.copper : "transparent",
                }}
              >
                {diet.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Physical Menu Style Board */}
      <div
        className="relative border-4 p-6 md:p-12 rounded-3xl bg-white shadow-panel"
        style={{
          borderColor: cafeTokens.color.inkDark,
        }}
      >
        {/* Inner subtle outline */}
        <div
          className="absolute inset-2 pointer-events-none border border-dashed rounded-2xl opacity-30"
          style={{ borderColor: cafeTokens.color.inkDark }}
        />

        {/* Menu Columns Grid */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 relative">
          {filteredItems.length === 0 ? (
            <div className="col-span-2 text-center py-20 space-y-4">
              <Leaf className="w-10 h-10 mx-auto text-gray-300 animate-pulse" />
              <p className="text-sm text-gray-500">No items match your selected filters.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setDietaryFilter("all");
                }}
                className="text-xs font-bold uppercase tracking-widest underline"
                style={{ color: cafeTokens.color.copper }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start gap-4 pb-6 border-b transition-colors duration-300 hover:border-gray-400 group"
                style={{ borderColor: cafeTokens.color.rule }}
              >
                <div className="space-y-1.5 flex-grow min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="text-lg font-bold truncate group-hover:text-[oklch(0.46_0.13_32)] transition-colors" style={{ fontFamily: cafeTokens.font.display }}>
                      {item.name}
                    </h3>
                    <span className="h-px bg-dotted flex-grow opacity-20 border-b border-dashed border-gray-400"></span>
                    <span className="text-sm font-bold shrink-0">₹{item.price}</span>
                  </div>
                  <p className="text-xs opacity-75 leading-relaxed pr-6">{item.description}</p>
                  
                  {/* Dietary badges */}
                  {item.dietary && item.dietary.length > 0 && (
                    <div className="flex gap-1.5 pt-1">
                      {item.dietary.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                          style={{ backgroundColor: cafeTokens.color.peachBg, color: cafeTokens.color.copper }}
                        >
                          {tag === "gf" ? "Gluten-Free" : tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="shrink-0 pt-1">
                  {item.available ? (
                    <CafeButton
                      onClick={() => addToCart(item, "Standard", 1)}
                      variant="outline"
                      className="px-4 py-1.5 min-h-9 text-[9px] hover:shadow-sm"
                    >
                      Add
                    </CafeButton>
                  ) : (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1.5 border border-dashed rounded bg-gray-50/50">
                      Sold Out
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Sourcing note */}
      <div className="max-w-xl mx-auto text-center py-6 opacity-75 text-xs leading-relaxed space-y-2">
        <Award className="w-6 h-6 mx-auto text-yellow-600 opacity-80" />
        <p>
          We pride ourselves on using premium local grains and estate-sourced coffee. Our milk is organic A2 set yogurt or milk, and we offer soy and oat alternatives. Please inform our crew of any allergies.
        </p>
      </div>

      {/* Sticky Visit/Cart Summary Bar */}
      {cartCount > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div
            className="flex items-center justify-between p-4 rounded-full border shadow-panel backdrop-blur-md"
            style={{
              backgroundColor: `${cafeTokens.color.inkDark}F2`,
              borderColor: `${cafeTokens.color.copper}33`,
              color: cafeTokens.color.bgIvory,
            }}
          >
            <div className="flex items-center gap-3 pl-2">
              <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 relative">
                <ShoppingBag className="w-4 h-4 text-white" />
                <span
                  className="absolute -top-1 -right-1 text-[8px] font-bold text-white w-4.5 h-4.5 rounded-full flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: cafeTokens.color.copper }}
                >
                  {cartCount}
                </span>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest opacity-60">Your Cart</p>
                <p className="text-sm font-bold">₹{cartTotal}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCartOpen(true)}
                className="text-[10px] font-bold uppercase tracking-wider px-4 py-2 hover:underline transition-all"
              >
                View
              </button>
              <CafeButton href={routes.checkout} variant="secondary" className="px-5 py-2 min-h-[38px] text-[10px] hover:shadow-lg">
                Checkout
              </CafeButton>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
