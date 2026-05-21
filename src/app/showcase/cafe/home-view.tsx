"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowRight, MapPin, Clock, Leaf, Award } from "lucide-react";
import { CafeButton, CafePanel } from "./components";
import { cafeTokens, routes } from "./tokens";
import { useCafe } from "./context";

export default function CafeHomePage() {
  const { beanProducts, menuItems, addToCart } = useCafe();
  const [activeCategory, setActiveCategory] = useState<"all" | "coffee" | "food" | "sweets">("all");
  const [dietaryFilter, setDietaryFilter] = useState<"all" | "vegan" | "gf">("all");
  const [selectedBranch, setSelectedBranch] = useState<"indiranagar" | "koramangala">("indiranagar");
  const [selectedEstate, setSelectedEstate] = useState<"attikan" | "bettadakhan" | "araku">("attikan");

  const estates = {
    attikan: {
      name: "Attikan Estate Single Origin",
      origin: "Biligirirangana (BR) Hills, Karnataka",
      altitude: "1,550 - 1,650m",
      process: "Washed",
      notes: ["Dark Chocolate", "Fig", "Roasted Almond"],
      stats: { acidity: 35, body: 85, sweetness: 70, roast: 75, floral: 20 },
      bagImage: "/media/showcase/attikan-estate.png",
    },
    bettadakhan: {
      name: "Bettadakhan Estate Arabica",
      origin: "Baba Budan Giri, Karnataka",
      altitude: "1,400 - 1,500m",
      process: "Natural",
      notes: ["Cardamom", "Brown Sugar", "Cocoa Nibs"],
      stats: { acidity: 50, body: 75, sweetness: 90, roast: 60, floral: 35 },
      bagImage: "/media/showcase/bettadakhan-estate.png",
    },
    araku: {
      name: "Araku Valley Organic",
      origin: "Araku Valley, Andhra Pradesh",
      altitude: "1,100 - 1,200m",
      process: "Honey Process",
      notes: ["Jasmine", "Sweet Orange", "Wild Honey"],
      stats: { acidity: 85, body: 60, sweetness: 80, roast: 45, floral: 80 },
      bagImage: "/media/showcase/araku-valley.png",
    },
  } as const;

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

  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      const categoryMatch = activeCategory === "all" || item.category === activeCategory;
      const dietaryMatch =
        dietaryFilter === "all" || (item.dietary && item.dietary.includes(dietaryFilter));
      return categoryMatch && dietaryMatch;
    });
  }, [menuItems, activeCategory, dietaryFilter]);

  return (
    <div className="space-y-20 md:space-y-28 pb-16 font-sans">
      {/* HERO SECTION - Visit Intent optimization */}
      <section className="relative px-6 md:px-12 max-w-[1600px] mx-auto pt-6 min-h-[95vh] flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6 flex flex-col items-start z-10 space-y-6">
            <div
              className="inline-flex items-center gap-3 px-4.5 py-2 border rounded-full text-[10.5px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:scale-[1.02] shadow-sm bg-white"
              style={{ borderColor: `${cafeTokens.color.copper}33` }}
            >
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: cafeTokens.color.copper }} />
              <span style={{ color: cafeTokens.color.inkDark }}>Now Roasting: Araku Valley Honey Process</span>
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.95] tracking-tighter text-balance"
              style={{ fontFamily: cafeTokens.font.display }}
            >
              Coffee that <br />
              <span className="italic font-normal relative inline-block" style={{ color: cafeTokens.color.copper }}>
                Respects
                <span className="absolute left-0 bottom-1 w-full h-[6px] rounded-full bg-[oklch(0.78_0.09_35)]/20 -z-10" />
              </span>
              <br />
              the Source.
            </h1>

            <div className="text-[10px] font-mono opacity-50 tracking-[0.25em] uppercase flex items-center gap-1.5 mt-1">
              <span>Bengaluru, KA</span>
              <span>•</span>
              <span>12.9716° N, 77.5946° E</span>
            </div>

            <p className="text-sm md:text-base max-w-lg opacity-85 leading-relaxed">
              We source directly from smallholder forest estates across South India, roasting micro-batches daily at our sensory laboratory in Karnataka.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
              <CafeButton href="#menu" variant="primary" className="shadow-lg">
                Explore Menu
              </CafeButton>
              <CafeButton href={routes.shop} variant="outline">
                Buy Beans (₹)
              </CafeButton>
            </div>

            {/* SENSORY PROFILER DASHBOARD */}
            <div
              className="bg-white/95 backdrop-blur-sm border p-6 rounded-2xl flex flex-col gap-4 w-full max-w-xl shadow-panel transition-all duration-300 hover:shadow-lift"
              style={{ borderColor: cafeTokens.color.rule }}
            >
              <div className="flex justify-between items-center border-b pb-2.5 animate-fadeIn" style={{ borderColor: cafeTokens.color.rule }}>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-mono uppercase tracking-widest bg-amber-50 text-[#9F442B] border border-amber-100/50 px-2 py-0.5 rounded">
                    Interactive
                  </span>
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: cafeTokens.color.inkDark }}>
                    Sensory Estate Explorer
                  </h4>
                </div>
                <span className="text-[8px] font-mono opacity-40">Select Estate to Update Collage</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-2">
                {(Object.keys(estates) as Array<keyof typeof estates>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedEstate(key)}
                    className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all border ${
                      selectedEstate === key
                        ? "bg-[oklch(0.26_0.018_35)] border-[oklch(0.26_0.018_35)] text-white shadow-sm"
                        : "bg-transparent hover:bg-black/5 opacity-70"
                    }`}
                    style={{
                      borderColor: selectedEstate === key ? "transparent" : cafeTokens.color.rule,
                    }}
                  >
                    {key === "attikan" ? "Attikan" : key === "bettadakhan" ? "Bettadakhan" : "Araku Valley"}
                  </button>
                ))}
              </div>

              {/* Content Grid */}
              <div className="grid sm:grid-cols-2 gap-6 pt-1">
                {/* Left side: Sourcing details */}
                <div className="space-y-3.5">
                  <div>
                    <span className="text-[8px] font-mono uppercase opacity-55 block">Single Origin Crop</span>
                    <p className="text-sm font-extrabold text-gray-900 mt-0.5 leading-none">{estates[selectedEstate].name}</p>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono uppercase opacity-55 block">Regional Terroir</span>
                    <p className="text-xs text-gray-700 font-medium mt-0.5">{estates[selectedEstate].origin}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[8px] font-mono uppercase opacity-55 block">Elevation</span>
                      <span className="text-xs font-bold text-gray-800">{estates[selectedEstate].altitude}</span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono uppercase opacity-55 block">Process Method</span>
                      <span className="text-xs font-bold text-gray-800">{estates[selectedEstate].process}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[8px] font-mono uppercase opacity-55 block mb-1.5">Tasting Notes</span>
                    <div className="flex flex-wrap gap-1">
                      {estates[selectedEstate].notes.map((note) => (
                        <span
                          key={note}
                          className="text-[9px] font-bold px-2 py-0.5 rounded border"
                          style={{
                            backgroundColor: cafeTokens.color.peachBg,
                            color: cafeTokens.color.copper,
                            borderColor: `${cafeTokens.color.copper}1A`,
                          }}
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Flavor stats bar graphs */}
                <div className="space-y-2.5 sm:border-l sm:pl-6" style={{ borderColor: cafeTokens.color.rule }}>
                  <span className="text-[8px] font-mono uppercase opacity-55 block">Sensory Profile (W.C.R. Standard)</span>
                  <div className="space-y-2">
                    {[
                      { label: "Acidity", key: "acidity", icon: "🍋" },
                      { label: "Body", key: "body", icon: "☕" },
                      { label: "Sweetness", key: "sweetness", icon: "🍯" },
                      { label: "Roast Scale", key: "roast", icon: "🔥" },
                      { label: "Floral / Aroma", key: "floral", icon: "🌸" },
                    ].map((stat) => (
                      <div key={stat.key} className="space-y-0.5">
                        <div className="flex justify-between text-[9px] font-semibold">
                          <span className="flex items-center gap-1 opacity-80">
                            <span className="text-xs shrink-0">{stat.icon}</span>
                            <span>{stat.label}</span>
                          </span>
                          <span className="font-extrabold" style={{ color: cafeTokens.color.copper }}>
                            {estates[selectedEstate].stats[stat.key as keyof typeof estates[typeof selectedEstate]["stats"]]}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500 ease-out"
                            style={{
                              width: `${estates[selectedEstate].stats[stat.key as keyof typeof estates[typeof selectedEstate]["stats"]]}%`,
                              backgroundColor: cafeTokens.color.copper,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - Premium overlapping visual collage + Boarding Pass Ticket */}
          <div className="lg:col-span-6 flex flex-col gap-8 items-center justify-center">
            {/* Collage Container */}
            <div className="relative h-[48vh] lg:h-[52vh] w-full flex items-center justify-center max-w-lg select-none">
              {/* Collage Layer 1 - Back Left (Cafe Interior) */}
              <div className="absolute left-[4%] top-[10%] w-[52%] h-[52%] rounded-2xl overflow-hidden shadow-lg border border-white/60 transition-all duration-500 hover:scale-105 hover:z-30 z-10 -rotate-6">
                <Image
                  src="/media/showcase/roastery-interior-premium.png"
                  alt="The Roastery Bengaluru Cafe Interior"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Collage Layer 2 - Back Right (Roast Lab tumbling beans) */}
              <div className="absolute right-[4%] top-[4%] w-[48%] h-[48%] rounded-full overflow-hidden shadow-md border-2 border-white transition-all duration-500 hover:scale-105 hover:z-30 z-10 rotate-6">
                <Image
                  src="/media/showcase/roastery-roast-premium.png"
                  alt="Fresh Coffee Beans roasting"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Collage Layer 3 - Mid Center (Espresso brewing extraction) */}
              <div className="absolute left-[16%] bottom-[12%] w-[48%] h-[48%] rounded-2xl overflow-hidden shadow-lg border border-white/80 transition-all duration-500 hover:scale-105 hover:z-30 z-15 -rotate-3">
                <Image
                  src="/media/showcase/roastery-brew-premium.png"
                  alt="Aesthetic coffee brewing extraction"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Collage Layer 4 - Front Centerpiece (Dynamic Estate Bag Mockup!) */}
              <div className="absolute bottom-[2%] right-[8%] w-[54%] h-[64%] rounded-t-[36px] rounded-b-[18px] overflow-hidden shadow-2xl border border-white/95 transition-all duration-500 hover:scale-105 hover:z-30 z-20 rotate-3">
                <Image
                  src={estates[selectedEstate].bagImage}
                  alt={`${estates[selectedEstate].name} specialty packaging`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover animate-fadeIn"
                />
              </div>

              {/* Floating sensory stamp badge */}
              <div
                className="absolute top-[6%] left-[43%] w-24 h-24 rounded-full flex items-center justify-center text-center p-3 shadow-lift text-white font-bold transition-transform duration-700 hover:rotate-[360deg] z-30 select-none cursor-pointer"
                style={{
                  backgroundColor: cafeTokens.color.copper,
                  border: "2px dashed oklch(0.978 0.008 85)",
                }}
              >
                <span className="text-[9px] uppercase tracking-[0.12em] leading-tight">
                  100% Single Origin
                </span>
              </div>
            </div>

            {/* Visit Details: Interactive ticket kiosk style */}
            <div
              className="bg-white border p-6 rounded-2xl flex flex-col gap-4 w-full max-w-lg shadow-panel transition-all duration-300 hover:shadow-lift relative overflow-hidden"
              style={{
                borderColor: cafeTokens.color.rule,
                backgroundImage: `radial-gradient(circle at 100% 150%, ${cafeTokens.color.bgPaper} 24%, white 24%)`,
              }}
            >
              {/* Tear-off dots at the top of the ticket */}
              <div className="absolute top-0 left-0 right-0 h-1 flex justify-between overflow-hidden opacity-30 select-none">
                {[...Array(20)].map((_, i) => (
                  <span key={i} className="w-1.5 h-1.5 rounded-full bg-black shrink-0 -translate-y-1/2 mx-0.5" />
                ))}
              </div>

              {/* Ticket Header */}
              <div className="flex justify-between items-start border-b border-dashed pb-3" style={{ borderColor: cafeTokens.color.rule }}>
                <div>
                  <span className="text-[8px] font-mono uppercase tracking-[0.2em] opacity-50 block">Sensory Laboratory</span>
                  <h4 className="text-sm font-bold uppercase tracking-wider">THE ROASTERY BLR</h4>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-mono uppercase tracking-[0.2em] opacity-50 block">Receipt ID</span>
                  <span className="text-[9px] font-mono font-bold">#BLR-{(selectedBranch === "indiranagar" ? "12M-42" : "80F-87")}</span>
                </div>
              </div>

              {/* Branch Selector Tabs in ticket style */}
              <div className="flex gap-1 bg-black/5 p-0.5 rounded-lg text-[9px] font-bold uppercase tracking-wider self-start z-10">
                <button
                  onClick={() => setSelectedBranch("indiranagar")}
                  className={`px-3 py-1 rounded transition-all ${
                    selectedBranch === "indiranagar"
                      ? "bg-white shadow-sm font-extrabold text-black"
                      : "opacity-60"
                  }`}
                >
                  Indiranagar Flagship
                </button>
                <button
                  onClick={() => setSelectedBranch("koramangala")}
                  className={`px-3 py-1 rounded transition-all ${
                    selectedBranch === "koramangala"
                      ? "bg-white shadow-sm font-extrabold text-black"
                      : "opacity-60"
                  }`}
                >
                  Koramangala Roastery
                </button>
              </div>

              {/* Ticket Details */}
              <div className="grid grid-cols-2 gap-4 text-xs z-10">
                <div className="space-y-2">
                  <div>
                    <span className="text-[8px] font-bold uppercase tracking-[0.1em] opacity-50 block">Destination</span>
                    <p className="font-bold text-gray-900 leading-tight">
                      {selectedBranch === "indiranagar" ? "12th Main, Indiranagar" : "80 Feet Rd, Koramangala"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold tracking-[0.1em] uppercase opacity-50 block">Inquiries</span>
                    <p className="text-gray-600">{selectedBranch === "indiranagar" ? "+91 80 4965 2511" : "+91 80 4390 8823"}</p>
                  </div>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] hover:underline"
                    style={{ color: cafeTokens.color.copper }}
                  >
                    <span>Get Map Coordinates</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </a>
                </div>

                <div className="space-y-2 border-l border-dashed pl-4" style={{ borderColor: cafeTokens.color.rule }}>
                  <div>
                    <span className="text-[8px] font-bold tracking-[0.1em] uppercase opacity-50 block">Roast Lab Feed</span>
                    <p className="text-emerald-700 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      <span>Active & Serving</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold tracking-[0.1em] uppercase opacity-50 block">Operating Hours</span>
                    <p className="text-gray-700 font-semibold">{selectedBranch === "indiranagar" ? "7:00 AM - 9:00 PM" : "8:00 AM - 10:30 PM"}</p>
                  </div>
                  <div>
                    <span className="text-[8px] font-bold tracking-[0.1em] uppercase opacity-50 block">Lab Lead</span>
                    <p className="text-gray-600 font-medium">{selectedBranch === "indiranagar" ? "Barista Vikram" : "Barista Aarav"}</p>
                  </div>
                </div>
              </div>

              {/* Thermal Barcode Footer */}
              <div className="border-t border-dashed pt-3 flex flex-col items-center gap-1 select-none" style={{ borderColor: cafeTokens.color.rule }}>
                <div className="flex h-6 items-end gap-[1.5px] opacity-75">
                  {[2, 1, 3, 1, 2, 4, 1, 2, 3, 1, 2, 1, 4, 2, 1, 3, 1, 2, 1, 2, 3, 1, 4, 1, 2].map((w, idx) => (
                    <div
                      key={idx}
                      className="h-full bg-black shrink-0"
                      style={{ width: `${w}px`, opacity: idx % 3 === 0 ? 0.6 : 0.9 }}
                    />
                  ))}
                </div>
                <span className="text-[7.5px] font-mono uppercase tracking-[0.3em] opacity-40">
                  *{(selectedBranch === "indiranagar" ? "12.9782N-77.6404E" : "12.9352N-77.6244E")}*
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="py-4 border-y overflow-hidden flex whitespace-nowrap text-white" style={{ backgroundColor: cafeTokens.color.inkDark, borderColor: cafeTokens.color.inkDark }}>
        <div className="flex gap-16 text-[10px] font-bold uppercase tracking-[0.3em] animate-marquee">
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex gap-16 items-center shrink-0">
              <span>Direct Estate Sourced</span>
              <span>•</span>
              <span>Roasted in Bengaluru</span>
              <span>•</span>
              <span>100% Traceable Crop</span>
              <span>•</span>
              <span>Transparent Pricing</span>
              <span>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* BRAND STORY */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-panel border" style={{ borderColor: cafeTokens.color.rule }}>
          <Image
            src="/media/showcase/roastery-roast-premium.png"
            alt="Roaster working with specialty coffee beans"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: cafeTokens.color.copper }}>
            Our Sourcing Philosophy
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-balance leading-tight" style={{ fontFamily: cafeTokens.font.display }}>
            Supporting Indian coffee growers through traceable, premium trade.
          </h3>
          <p className="text-sm md:text-base opacity-80 leading-relaxed">
            Every coffee bean carries the unique microclimate of Indian hills. Our commitment is to celebrate that source. By paying premiums well above fair-trade market prices, we foster sustainable cultivation at estates like Attikan and Bettadakhan, helping independent growers build thriving futures.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t" style={{ borderColor: cafeTokens.color.rule }}>
            <div>
              <p className="text-3xl md:text-4xl font-bold" style={{ color: cafeTokens.color.copper, fontFamily: cafeTokens.font.display }}>100%</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] opacity-75 mt-1">Traceable Estates</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold" style={{ color: cafeTokens.color.copper, fontFamily: cafeTokens.font.display }}>Weekly</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] opacity-75 mt-1">Small Batch Roasts</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold" style={{ color: cafeTokens.color.copper, fontFamily: cafeTokens.font.display }}>3.5x</p>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] opacity-75 mt-1">Above Fair Trade</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE MENU (HOMEPAGE INTEGRATION) */}
      <section id="menu" className="max-w-[1200px] mx-auto px-6 md:px-12 scroll-mt-24 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: cafeTokens.color.copper }}>
            Fresh Daily from Our Bar & Kitchen
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: cafeTokens.font.display }}>
            Cafe Menu
          </h3>
          <p className="text-sm opacity-75 max-w-md mx-auto">
            Handcrafted espresso drinks, freshly baked local grain pastries, and sourdough-focused kitchen plates.
          </p>
        </div>

        {/* Filter Toggles */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center border-y py-6 border-gray-200">
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

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 pt-4">
          {filteredMenuItems.length === 0 ? (
            <div className="col-span-2 text-center py-20 space-y-4">
              <Leaf className="w-10 h-10 mx-auto text-gray-300 animate-pulse" />
              <p className="text-sm text-gray-500">No items match your filters.</p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setDietaryFilter("all");
                }}
                className="text-xs font-bold uppercase tracking-widest underline"
                style={{ color: cafeTokens.color.copper }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredMenuItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-start gap-4 pb-6 border-b transition-all duration-300 hover:border-gray-400 group"
                style={{ borderColor: cafeTokens.color.rule }}
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-2">
                    <h4 className="text-base font-bold truncate group-hover:text-[oklch(0.46_0.13_32)] transition-colors" style={{ fontFamily: cafeTokens.font.display }}>
                      {item.name}
                    </h4>
                    <span className="h-px bg-dotted flex-1 opacity-25 border-b border-dashed border-gray-400"></span>
                    <span className="text-sm font-bold shrink-0">₹{item.price}</span>
                  </div>
                  <p className="text-xs opacity-75 leading-relaxed pr-4">{item.description}</p>
                  
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
                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1.5 border border-dashed rounded bg-gray-50/50">
                      Sold Out
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="max-w-xl mx-auto text-center py-6 opacity-75 text-xs leading-relaxed space-y-2">
          <Award className="w-5 h-5 mx-auto text-yellow-600 opacity-80" />
          <p>
            Our coffees are brewed with organic milk or vegan alternatives (soy, oat). Please inform our crew of any allergies.
          </p>
        </div>
      </section>

      {/* SIGNATURE PRODUCTS PREVIEW */}
      <section className="bg-white/60 py-20 border-y" style={{ borderColor: cafeTokens.color.rule }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: cafeTokens.color.copper }}>
                Indian Specialty Estate Beans
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight" style={{ fontFamily: cafeTokens.font.display }}>
                Signature Whole Bean Packs
              </h3>
            </div>
            <CafeButton href={routes.shop} variant="outline">
              Shop All Beans
            </CafeButton>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beanProducts.slice(0, 4).map((product) => (
              <CafePanel key={product.id} className="flex flex-col justify-between h-full bg-white transition-all duration-300 hover:shadow-lift hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border bg-gray-50 shadow-inner">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: cafeTokens.color.bgPaper, color: cafeTokens.color.inkMuted }}>
                        {product.roast} Roast
                      </span>
                      <span className="text-[10px] font-medium opacity-65">{product.process}</span>
                    </div>
                    <h4 className="text-lg font-bold mt-2 truncate" style={{ fontFamily: cafeTokens.font.display }}>{product.name}</h4>
                    <p className="text-xs opacity-75 mt-1">{product.origin}</p>
                    <p className="text-xs italic opacity-60 mt-1 truncate">{product.notes.join(" · ")}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-6 pt-4 border-t" style={{ borderColor: cafeTokens.color.rule }}>
                  <span className="text-sm font-bold">₹{product.price}</span>
                  <CafeButton href={routes.product(product.id)} variant="text" className="text-[10px] tracking-widest font-bold">
                    View Tasting Profile
                  </CafeButton>
                </div>
              </CafePanel>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: cafeTokens.color.copper }}>
            Find Your Nearest Roastery
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: cafeTokens.font.display }}>
            Bengaluru Locations
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <CafePanel className="space-y-4 bg-white">
            <div className="flex justify-between items-start">
              <h4 className="text-xl font-bold" style={{ fontFamily: cafeTokens.font.display }}>Indiranagar Flagship</h4>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-sm">
                Open Now
              </span>
            </div>
            <p className="text-sm opacity-80">
              Our flagship outlet featuring a full manual brew pour-over bar, retail bean sacks, roasting experiences, and quiet workspace.
            </p>
            <div className="text-xs space-y-2.5 pt-3 border-t" style={{ borderColor: cafeTokens.color.rule }}>
              <p className="flex gap-2 opacity-80">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: cafeTokens.color.copper }} />
                <span>12th Main Road, Indiranagar, Bengaluru, Karnataka 560038</span>
              </p>
              <p className="flex gap-2 opacity-80">
                <Clock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: cafeTokens.color.copper }} />
                <span>Daily: 7AM - 7PM</span>
              </p>
            </div>
            <div className="pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:underline"
                style={{ color: cafeTokens.color.copper }}
              >
                Get Directions <ArrowRight className="w-3.5 h-3.5 transition-transform hover:translate-x-1" />
              </a>
            </div>
          </CafePanel>

          <CafePanel className="space-y-4 bg-white">
            <div className="flex justify-between items-start">
              <h4 className="text-xl font-bold" style={{ fontFamily: cafeTokens.font.display }}>Koramangala Kiosk</h4>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 shadow-sm">
                Closes 5PM
              </span>
            </div>
            <p className="text-sm opacity-80">
              A high-precision espresso bar designed for swift takeaway orders, serving commuters and professionals in Koramangala.
            </p>
            <div className="text-xs space-y-2.5 pt-3 border-t" style={{ borderColor: cafeTokens.color.rule }}>
              <p className="flex gap-2 opacity-80">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" style={{ color: cafeTokens.color.copper }} />
                <span>80 Feet Road, Koramangala 4th Block, Bengaluru, Karnataka 560034</span>
              </p>
              <p className="flex gap-2 opacity-80">
                <Clock className="w-4 h-4 shrink-0 mt-0.5" style={{ color: cafeTokens.color.copper }} />
                <span>Mon-Fri: 7AM - 5PM, Sat-Sun: 8AM - 4PM</span>
              </p>
            </div>
            <div className="pt-2">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider hover:underline"
                style={{ color: cafeTokens.color.copper }}
              >
                Get Directions <ArrowRight className="w-3.5 h-3.5 transition-transform hover:translate-x-1" />
              </a>
            </div>
          </CafePanel>
        </div>
      </section>

      {/* WHOLESALE / B2B */}
      <section className="bg-[oklch(0.26_0.018_35)] text-white py-16 px-8 text-center rounded-2xl max-w-6xl mx-auto shadow-panel hover:shadow-lift transition-all duration-300">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] opacity-80" style={{ color: cafeTokens.color.peachSoft }}>
            Partner With Us
          </h2>
          <h3 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: cafeTokens.font.display }}>
            Serve The Roastery Specialty Beans
          </h3>
          <p className="text-sm md:text-base opacity-90 leading-relaxed">
            We provide wholesale single-origin supply, professional barista training, cafe design consulting, and bulk discounts for fine restaurants, hotels, and workspaces across India.
          </p>
          <div className="pt-4">
            <CafeButton href={routes.home} variant="outline" className="bg-white border-white text-[oklch(0.26_0.018_35)] hover:bg-transparent hover:text-white">
              Request Commercial Quote
            </CafeButton>
          </div>
        </div>
      </section>
    </div>
  );
}
