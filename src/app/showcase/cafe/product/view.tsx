"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useCafe } from "../context";
import { CafeButton, CafePanel } from "../components";
import { cafeTokens, routes } from "../tokens";
import { ArrowLeft, Scale, AlertCircle, Calendar, ShieldCheck } from "lucide-react";

export default function CafeProductDetailPage() {
  const { beanProducts, addToCart, selectedId, changeView } = useCafe();
  const [selectedSize, setSelectedSize] = useState<"250g" | "1kg">("250g");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = useMemo(() => {
    return beanProducts.find((item) => item.id === selectedId);
  }, [beanProducts, selectedId]);

  // Extended details for tasting profile and farm info based on the Indian estates
  const extendedDetails = useMemo(() => {
    if (!product) return null;

    const data: Record<
      string,
      {
        backstory: string;
        cooperative: string;
        roastWeek: string;
        intensities: { label: string; value: number }[];
      }
    > = {
      "attikan-estate": {
        backstory:
          "Attikan Estate is nestled in the Biligirirangan Hills (BR Hills) of Karnataka. Surrounded by a wildlife sanctuary, the coffee is grown under a rich two-tier canopy of native forest trees, giving the cup its uniquely sweet, chocolatey, and low-acid signature.",
        cooperative: "Biligiri Coffee Growers Cooperative",
        roastWeek: "Tuesday batch",
        intensities: [
          { label: "Sweetness", value: 8 },
          { label: "Body", value: 9 },
          { label: "Acidity", value: 4 },
          { label: "Spice Profile", value: 5 },
        ],
      },
      "bettadakhan-estate": {
        backstory:
          "Grown in Baba Budangiri, the mystical birthplace of Indian coffee. Bettadakhan ('hill forest') Estate sits at high altitude, producing beans that are naturally shade-grown alongside cardamom and pepper, resulting in a cup with spiced, earthy undertones.",
        cooperative: "Baba Budan Giri Specialty Growers",
        roastWeek: "Tuesday batch",
        intensities: [
          { label: "Sweetness", value: 7 },
          { label: "Body", value: 8 },
          { label: "Acidity", value: 5 },
          { label: "Spice Profile", value: 8 },
        ],
      },
      "araku-valley-organic": {
        backstory:
          "Sourced from indigenous tribal smallholders in the Araku Valley of Andhra Pradesh. High elevation, iron-rich soil, and dedicated organic polyculture farming yields a remarkably clean, floral, and bright light roast.",
        cooperative: "Araku Smallholder Farmer Cooperatives",
        roastWeek: "Thursday batch",
        intensities: [
          { label: "Sweetness", value: 9 },
          { label: "Body", value: 6 },
          { label: "Acidity", value: 8 },
          { label: "Floral Aromas", value: 9 },
        ],
      },
      "decaf-coorg": {
        backstory:
          "Grown in the evergreen mist-covered hills of Coorg. This single-estate Arabica is decaffeinated using the Swiss Water Process, which gently removes caffeine without organic solvents, retaining all native oils, sweetness, and caramel character.",
        cooperative: "Coorg Organic Union",
        roastWeek: "Tuesday batch",
        intensities: [
          { label: "Sweetness", value: 8 },
          { label: "Body", value: 7 },
          { label: "Acidity", value: 3 },
          { label: "Cocoa Depth", value: 8 },
        ],
      },
    };

    return data[product.id] || {
      backstory: "Cultivated in India's prime shade-grown specialty coffee belt. Handpicked at peak ripeness.",
      cooperative: "Indian Specialty Coffee Association",
      roastWeek: "Weekly roast",
      intensities: [
        { label: "Sweetness", value: 7 },
        { label: "Body", value: 7 },
        { label: "Acidity", value: 6 },
        { label: "Aroma", value: 8 },
      ],
    };
  }, [product]);

  if (!product || !extendedDetails) {
    return (
      <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-4">
        <AlertCircle className="w-12 h-12 mx-auto text-red-500" />
        <h1 className="text-3xl font-bold" style={{ fontFamily: cafeTokens.font.display }}>Roast Not Found</h1>
        <p className="text-sm opacity-70">This coffee roast is currently unavailable. Return to the store catalog.</p>
        <CafeButton href={routes.shop} variant="outline">Back to Shop</CafeButton>
      </div>
    );
  }

  const currentPrice = selectedSize === "250g" ? product.price : Math.round(product.price * 3.5);

  function handleAddToCart() {
    if (!product) return;
    addToCart(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 font-sans space-y-8 pb-20">
      {/* Back link */}
      <button
        onClick={() => changeView("shop")}
        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider hover:underline bg-transparent border-0 cursor-pointer p-0 text-left font-sans"
        style={{ color: cafeTokens.color.copper }}
      >
        <ArrowLeft className="w-4 h-4" /> Back to Coffee Beans
      </button>

      <div className="grid md:grid-cols-12 gap-12 items-start">
        {/* Left: Image & Story */}
        <div className="md:col-span-6 space-y-8">
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-panel border bg-gray-50" style={{ borderColor: cafeTokens.color.rule }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Farm backstory */}
          <CafePanel bg="paper" className="space-y-4">
            <h3 className="text-lg font-bold" style={{ fontFamily: cafeTokens.font.display }}>Estate Backstory</h3>
            <p className="text-xs md:text-sm opacity-80 leading-relaxed">
              {extendedDetails.backstory}
            </p>
            <div className="pt-2 flex flex-col gap-2 text-xs opacity-75">
              <p><strong>Grower/Co-op:</strong> {extendedDetails.cooperative}</p>
              <p><strong>Harvest Season:</strong> Winter Crop (Nov - Feb)</p>
            </div>
          </CafePanel>
        </div>

        {/* Right: Sourcing & Selection Details */}
        <div className="md:col-span-6 space-y-8">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded"
                style={{ backgroundColor: cafeTokens.color.peachBg, color: cafeTokens.color.copper }}
              >
                {product.roast} Roast
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Traceable
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: cafeTokens.font.display }}>
              {product.name}
            </h1>
            <p className="text-sm opacity-80 leading-relaxed pt-2">
              {product.description}
            </p>
          </div>

          {/* Sourcing Parameters Table */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-xl bg-white shadow-sm" style={{ borderColor: cafeTokens.color.rule }}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Origin Estate</span>
              <p className="text-sm font-bold mt-1 text-gray-900">{product.origin}</p>
            </div>
            <div className="p-4 border rounded-xl bg-white shadow-sm" style={{ borderColor: cafeTokens.color.rule }}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Processing</span>
              <p className="text-sm font-bold mt-1 text-gray-900">{product.process}</p>
            </div>
            <div className="p-4 border rounded-xl bg-white shadow-sm" style={{ borderColor: cafeTokens.color.rule }}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Elevation</span>
              <p className="text-sm font-bold mt-1 text-gray-900">{product.altitude}</p>
            </div>
            <div className="p-4 border rounded-xl bg-white shadow-sm" style={{ borderColor: cafeTokens.color.rule }}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Tasting Notes</span>
              <p className="text-xs font-bold mt-1 italic text-gray-900">{product.notes.join(" · ")}</p>
            </div>
          </div>

          {/* Tasting Intensities Gauges */}
          <CafePanel className="space-y-4 bg-white">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Tasting Intensities</h3>
            <div className="space-y-3">
              {extendedDetails.intensities.map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="opacity-85">{item.label}</span>
                    <span style={{ color: cafeTokens.color.copper }}>{item.value} / 10</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.value * 10}%`,
                        backgroundColor: cafeTokens.color.copper,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CafePanel>

          {/* Pricing & Size Selection */}
          <div className="p-6 border-2 rounded-2xl space-y-6 bg-white" style={{ borderColor: cafeTokens.color.inkDark }}>
            <div className="flex justify-between items-baseline">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Price</span>
              <span className="text-3xl font-bold">₹{currentPrice}</span>
            </div>

            {/* Size Selector - Tactile Heavy buttons */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" /> Bag Size Selection
              </label>
              <div className="flex gap-3">
                {(["250g", "1kg"] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className="flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-xl border-2 transition-all duration-200 active:scale-95"
                    style={{
                      backgroundColor: selectedSize === size ? cafeTokens.color.inkDark : "transparent",
                      color: selectedSize === size ? cafeTokens.color.bgIvory : cafeTokens.color.inkDark,
                      borderColor: selectedSize === size ? cafeTokens.color.inkDark : `${cafeTokens.color.inkDark}33`,
                    }}
                  >
                    {size === "250g" ? "250g Pack" : "1kg Bulk (Save 12%)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add button */}
            <div className="flex gap-4">
              <div className="flex items-center border-2 rounded-xl overflow-hidden bg-white shrink-0" style={{ borderColor: `${cafeTokens.color.inkDark}33` }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-2 text-gray-500 font-bold hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-2 text-gray-500 font-bold hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-grow py-3.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 flex justify-center items-center gap-2 text-white hover:opacity-90 active:scale-98 shadow-md"
                style={{
                  backgroundColor: added ? "oklch(0.62 0.17 150)" : cafeTokens.color.copper,
                }}
              >
                {added ? "Added to Order!" : "Add to Order"}
              </button>
            </div>

            <div className="flex items-center gap-2 justify-center opacity-70 text-[10px] font-bold uppercase tracking-wider pt-2 border-t border-dashed" style={{ borderColor: cafeTokens.color.rule }}>
              <Calendar className="w-3.5 h-3.5" />
              <span>Next roast batch: {extendedDetails.roastWeek}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
