"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useCafe } from "../context";
import { CafeButton, CafePanel } from "../components";
import { cafeTokens, routes } from "../tokens";
import { Leaf, SlidersHorizontal } from "lucide-react";

export default function CafeShopPage() {
  const { beanProducts } = useCafe();
  const [selectedRoast, setSelectedRoast] = useState<"All" | "Light" | "Medium" | "Dark">("All");
  const [selectedProcess, setSelectedProcess] = useState<string>("All");

  // Get all unique processes dynamically
  const uniqueProcesses = useMemo(() => {
    const processes = new Set<string>();
    beanProducts.forEach((p) => processes.add(p.process));
    return ["All", ...Array.from(processes)];
  }, [beanProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return beanProducts.filter((product) => {
      const roastMatch = selectedRoast === "All" || product.roast === selectedRoast;
      const processMatch = selectedProcess === "All" || product.process === selectedProcess;
      return roastMatch && processMatch;
    });
  }, [beanProducts, selectedRoast, selectedProcess]);

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 font-sans space-y-16 pb-24">
      {/* Title */}
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight" style={{ fontFamily: cafeTokens.font.display }}>
          Specialty Coffee
        </h1>
        <p className="text-sm md:text-base opacity-75">
          Fresh whole beans roasted weekly in Indiranagar, Bengaluru. Packed in eco-friendly degassing valve bags to preserve tasting notes.
        </p>
      </div>

      {/* Interactive Catalog Filters */}
      <div
        className="border p-6 rounded-2xl bg-white shadow-panel flex flex-col md:flex-row gap-6 md:items-center justify-between"
        style={{ borderColor: cafeTokens.color.rule }}
      >
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
          <SlidersHorizontal className="w-4 h-4 text-gray-400" />
          <span>Filter Beans</span>
        </div>

        <div className="flex flex-wrap gap-6 items-center">
          {/* Roast Selector */}
          <div className="space-y-1.5">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Roast Profile</span>
            <div className="flex gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
              {(["All", "Light", "Medium", "Dark"] as const).map((roast) => (
                <button
                  key={roast}
                  onClick={() => setSelectedRoast(roast)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-md transition-all"
                  style={{
                    backgroundColor: selectedRoast === roast ? cafeTokens.color.inkDark : "transparent",
                    color: selectedRoast === roast ? cafeTokens.color.bgIvory : cafeTokens.color.inkMuted,
                  }}
                >
                  {roast}
                </button>
              ))}
            </div>
          </div>

          {/* Process Selector */}
          <div className="space-y-1.5">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-400">Processing Method</span>
            <div className="flex gap-1 bg-gray-50 p-1 rounded-lg border border-gray-100">
              {uniqueProcesses.map((process) => (
                <button
                  key={process}
                  onClick={() => setSelectedProcess(process)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-md transition-all"
                  style={{
                    backgroundColor: selectedProcess === process ? cafeTokens.color.inkDark : "transparent",
                    color: selectedProcess === process ? cafeTokens.color.bgIvory : cafeTokens.color.inkMuted,
                  }}
                >
                  {process}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bean Catalog Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full text-center py-20 space-y-4">
            <Leaf className="w-10 h-10 mx-auto text-gray-300 animate-pulse" />
            <p className="text-sm text-gray-500">No estates match your filter selection.</p>
            <button
              onClick={() => {
                setSelectedRoast("All");
                setSelectedProcess("All");
              }}
              className="text-xs font-bold uppercase tracking-widest underline"
              style={{ color: cafeTokens.color.copper }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <CafePanel key={product.id} className="flex flex-col justify-between h-full bg-white relative transition-all duration-300 hover:shadow-lift hover:-translate-y-1">
              <div className="space-y-6">
                {/* Product Cover */}
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border bg-gray-50 shadow-inner">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div
                    className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded shadow-sm text-white"
                    style={{ backgroundColor: cafeTokens.color.copper }}
                  >
                    {product.process}
                  </div>
                </div>

                {/* Title & Origin */}
                <div>
                  <h3 className="text-2xl font-bold hover:text-[oklch(0.46_0.13_32)] transition-colors" style={{ fontFamily: cafeTokens.font.display }}>
                    {product.name}
                  </h3>
                  <p className="text-xs opacity-75 mt-1 font-medium">{product.origin}</p>
                  <p className="text-[10px] opacity-60 mt-0.5">Elevation: {product.altitude}</p>
                </div>

                {/* Roast Scale Gauge */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    <span>Roast Profile</span>
                    <span className="text-gray-700">{product.roast}</span>
                  </div>
                  <div className="flex gap-1">
                    {(["Light", "Medium", "Dark"] as const).map((r) => (
                      <div
                        key={r}
                        className="h-1.5 flex-1 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor:
                            product.roast === r
                              ? cafeTokens.color.copper
                              : `${cafeTokens.color.inkDark}15`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Tasting Notes */}
                <div className="pt-4 border-t" style={{ borderColor: cafeTokens.color.rule }}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Flavor Profile</p>
                  <div className="flex flex-wrap gap-1.5">
                    {product.notes.map((note) => (
                      <span
                        key={note}
                        className="text-[10px] font-semibold border px-2.5 py-1 rounded-full transition-colors hover:bg-gray-50"
                        style={{ borderColor: cafeTokens.color.rule, color: cafeTokens.color.inkMuted }}
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex justify-between items-center mt-8 pt-4 border-t" style={{ borderColor: cafeTokens.color.rule }}>
                <div>
                  <span className="text-[10px] opacity-65 uppercase tracking-wider block">250g Pack</span>
                  <p className="text-lg font-bold">₹{product.price}</p>
                </div>
                <CafeButton href={routes.product(product.id)} variant="primary" className="px-5 py-2 text-[10px]">
                  Order Beans
                </CafeButton>
              </div>
            </CafePanel>
          ))
        )}
      </div>

      {/* Roasting Guarantee Banner */}
      <div className="bg-white border rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto shadow-panel hover:shadow-lift transition-all" style={{ borderColor: cafeTokens.color.rule }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: cafeTokens.color.peachBg, color: cafeTokens.color.copper }}>
          <Leaf className="w-6 h-6 animate-pulse" />
        </div>
        <div className="space-y-2 text-center md:text-left flex-grow">
          <h4 className="text-lg font-bold" style={{ fontFamily: cafeTokens.font.display }}>Tuesday Roasting Guarantee</h4>
          <p className="text-xs opacity-75 leading-relaxed">
            We roast in small batches every Tuesday morning in Indiranagar. Orders are packed immediately and shipped out within 24 hours to guarantee you brew at optimal degassing and freshness peaks.
          </p>
        </div>
      </div>
    </div>
  );
}
