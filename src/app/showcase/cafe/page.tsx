"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, MapPin, Mail, Coffee, Truck, Leaf } from "lucide-react";

export default function CafeShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  return (
    <div 
      ref={containerRef}
      className="relative bg-[#F9F6F0] text-[#2C241B] min-h-screen font-sans selection:bg-[#D26E4B] selection:text-white"
    >
      {/* NAVIGATION */}
      <nav className="fixed top-12 left-0 right-0 z-40 bg-[#F9F6F0]/80 backdrop-blur-md border-b border-[#2C241B]/10 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tighter leading-none">BROOKLYN</span>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase mt-1">Roasting Co.</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase">
            <a href="#" className="hover:text-[#D26E4B] transition-colors">Shop Coffee</a>
            <a href="#" className="hover:text-[#D26E4B] transition-colors">Subscriptions</a>
            <a href="#" className="hover:text-[#D26E4B] transition-colors">Wholesale</a>
            <a href="#" className="hover:text-[#D26E4B] transition-colors">Locations</a>
            <a href="#" className="hover:text-[#D26E4B] transition-colors">Our Story</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <a href="#" className="hidden md:block text-[11px] font-bold tracking-[0.2em] uppercase hover:text-[#D26E4B] transition-colors">
              Account
            </a>
            <button className="flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase hover:text-[#D26E4B] transition-colors">
              Cart (0)
            </button>
            <button className="hidden sm:block px-6 py-3 bg-[#2C241B] text-[#F9F6F0] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#D26E4B] transition-colors">
              Order Pickup
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-28 pb-12 md:pt-32 md:pb-16 px-6 md:px-12 max-w-[1600px] mx-auto min-h-[90vh] lg:min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start z-10"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#2C241B]/20 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#D26E4B] animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Now Roasting: Ethiopian Yirgacheffe</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[8.5rem] font-serif leading-[0.85] tracking-tight mb-6">
              Coffee that <br/>
              <span className="italic text-[#8B6E52]">Respects</span><br/>
              the Source.
            </h1>
            
            <p className="text-base md:text-xl max-w-lg text-[#2C241B]/70 leading-relaxed mb-8">
              We source directly from independent farmers globally to roast small-batch, specialty coffee in the heart of Brooklyn. Uncompromising quality from seed to cup.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="px-8 py-4 bg-[#2C241B] text-[#F9F6F0] text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#D26E4B] transition-colors flex items-center justify-center gap-3 group">
                Shop Whole Bean
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 border border-[#2C241B]/20 text-[#2C241B] text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#2C241B]/5 transition-colors text-center">
                Find a Cafe
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative h-[50vh] lg:h-[70vh] max-h-[600px] w-full rounded-t-full overflow-hidden mt-8 lg:mt-0"
          >
            <Image 
              src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop" 
              alt="Barista pouring latte art" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />
            {/* Circular badge overlay */}
            <div className="absolute top-12 right-12 md:-right-6 md:top-32 w-28 h-28 md:w-32 md:h-32 bg-[#D26E4B] rounded-full flex items-center justify-center text-white p-4 text-center rotate-12 shadow-2xl">
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase leading-tight">Fresh<br/>Roasted<br/>Daily</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TICKER */}
      <div className="border-y border-[#2C241B]/10 py-5 overflow-hidden flex whitespace-nowrap bg-[#2C241B] text-[#F9F6F0]">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="flex gap-16 items-center text-[11px] font-bold tracking-[0.3em] uppercase"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-16">
              <span>Fair Trade Certified</span>
              <span>•</span>
              <span>Roasted in Brooklyn</span>
              <span>•</span>
              <span>Single Origin Excellence</span>
              <span>•</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* BRAND STORY */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="relative aspect-square w-full md:w-4/5">
            <Image 
              src="https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?q=80&w=1500&auto=format&fit=crop" 
              alt="Coffee roasting machine" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-2xl"
            />
            {/* Floating smaller image */}
            <motion.div 
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
              className="absolute -bottom-16 -right-8 md:-right-16 w-2/3 aspect-[4/3] border-8 border-[#F9F6F0] rounded-2xl overflow-hidden shadow-2xl hidden sm:block"
            >
              <Image 
                src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=1000&auto=format&fit=crop" 
                alt="Coffee beans sorting" 
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="flex flex-col items-start mt-16 sm:mt-0">
            <h2 className="text-[#D26E4B] text-[11px] font-bold tracking-[0.3em] uppercase mb-6">Our Philosophy</h2>
            <h3 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.1] mb-8">
              We believe great coffee requires radical transparency.
            </h3>
            <p className="text-base md:text-lg text-[#2C241B]/70 leading-relaxed mb-6">
              Founded in 2012 in a small Williamsburg garage, Brooklyn Roasting Co. was built on a simple premise: pay farmers exceptionally well, roast with meticulous scientific precision, and serve without the snobbery.
            </p>
            <p className="text-base md:text-lg text-[#2C241B]/70 leading-relaxed mb-12">
              Every bean we roast tells a story of terroir, altitude, and careful processing. We spend months each year at origin building relationships so that the cup you brew at home is the absolute best representation of that harvest.
            </p>
            
            <div className="grid grid-cols-2 gap-8 w-full border-t border-[#2C241B]/10 pt-12">
              <div>
                <div className="text-4xl font-serif mb-2">12+</div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2C241B]/60">Partner Countries</div>
              </div>
              <div>
                <div className="text-4xl font-serif mb-2">3.5x</div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2C241B]/60">Above Fair-Trade Price</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED ROASTS (E-COMMERCE) */}
      <section className="bg-[#2C241B] text-[#F9F6F0] py-24 md:py-32">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-[#D26E4B] text-[11px] font-bold tracking-[0.3em] uppercase mb-6">Freshly Roasted</h2>
              <h3 className="text-4xl md:text-7xl font-serif tracking-tight">Current Offerings</h3>
            </div>
            <button className="text-[11px] font-bold tracking-[0.2em] uppercase hover:text-[#D26E4B] transition-colors flex items-center gap-2 border-b border-current pb-1">
              Shop All Coffee
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: 1,
                name: "Bedford Espresso",
                origin: "Blend: Brazil & Colombia",
                notes: "Dark Chocolate, Cherry, Hazelnut",
                roast: "Medium-Dark",
                price: "$19",
                img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=800&auto=format&fit=crop"
              },
              {
                id: 2,
                name: "Yirgacheffe Reserve",
                origin: "Single Origin: Ethiopia",
                notes: "Jasmine, Lemon Zest, Raw Honey",
                roast: "Light",
                price: "$24",
                img: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop"
              },
              {
                id: 3,
                name: "Antigua Estate",
                origin: "Single Origin: Guatemala",
                notes: "Caramel, Green Apple, Almond",
                roast: "Medium",
                price: "$21",
                img: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop"
              },
              {
                id: 4,
                name: "Night Owl Decaf",
                origin: "Blend: Mexico (Swiss Water)",
                notes: "Graham Cracker, Cocoa, Molasses",
                roast: "Medium-Dark",
                price: "$20",
                img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
              }
            ].map((product) => (
              <div key={product.id} className="group relative flex flex-col bg-[#1A1510] rounded-2xl overflow-hidden hover:bg-[#15100B] transition-colors">
                <div className="aspect-[4/5] relative overflow-hidden bg-black/20">
                  {/* Fake Coffee Bag Image placeholder */}
                  <Image 
                    src={product.img} 
                    alt={product.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#D26E4B] text-white text-[9px] font-bold tracking-[0.2em] uppercase rounded-full">
                    {product.roast}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-[#D26E4B] text-[10px] font-bold tracking-[0.2em] uppercase mb-2">
                    {product.origin}
                  </div>
                  <h4 className="text-2xl font-serif mb-2">{product.name}</h4>
                  <p className="text-sm text-[#F9F6F0]/60 mb-6 flex-grow">{product.notes}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#F9F6F0]/10">
                    <span className="text-lg font-serif">{product.price} <span className="text-xs font-sans opacity-50">/ 12oz</span></span>
                    <button className="w-10 h-10 rounded-full bg-[#F9F6F0] text-[#2C241B] flex items-center justify-center hover:bg-[#D26E4B] hover:text-white transition-colors">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES / BENEFITS */}
      <section className="py-24 border-b border-[#2C241B]/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#D26E4B]/10 flex items-center justify-center text-[#D26E4B] mb-6">
              <Leaf className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-serif mb-3">Ethically Sourced</h4>
            <p className="text-[#2C241B]/70 text-sm leading-relaxed max-w-xs">We pay severe premiums above fair-trade to ensure farmers can reinvest in their communities.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#D26E4B]/10 flex items-center justify-center text-[#D26E4B] mb-6">
              <Coffee className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-serif mb-3">Small Batch Roasted</h4>
            <p className="text-[#2C241B]/70 text-sm leading-relaxed max-w-xs">Roasted to order on our vintage Probat machines, hand-profiled by our head roaster.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#D26E4B]/10 flex items-center justify-center text-[#D26E4B] mb-6">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="text-xl font-serif mb-3">Fast & Free Shipping</h4>
            <p className="text-[#2C241B]/70 text-sm leading-relaxed max-w-xs">Free shipping on all US orders over $40. Beans ship within 24 hours of roasting.</p>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="py-32 max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="flex flex-col justify-center">
            <h2 className="text-[#D26E4B] text-[11px] font-bold tracking-[0.3em] uppercase mb-6">Visit Us</h2>
            <h3 className="text-5xl md:text-7xl font-serif tracking-tight mb-8">Our Cafes</h3>
            <p className="text-lg text-[#2C241B]/70 leading-relaxed mb-12 max-w-md">
              Experience our coffee exactly as it was meant to be brewed. Enjoy a pour-over, grab a bag of beans, and stay a while.
            </p>

            <div className="space-y-8">
              <div className="p-8 border border-[#2C241B]/10 rounded-2xl hover:border-[#D26E4B] transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-serif">Williamsburg Flagship</h4>
                  <span className="px-3 py-1 bg-[#D26E4B]/10 text-[#D26E4B] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">Open Now</span>
                </div>
                <div className="flex gap-4 text-sm text-[#2C241B]/70 mb-4">
                  <MapPin className="w-4 h-4 shrink-0 mt-1" />
                  <span>123 Roaster Ave<br/>Brooklyn, NY 11211</span>
                </div>
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#D26E4B] group-hover:translate-x-2 transition-transform flex items-center gap-2">
                  Get Directions <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="p-8 border border-[#2C241B]/10 rounded-2xl hover:border-[#D26E4B] transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-serif">West Village Kiosk</h4>
                  <span className="px-3 py-1 bg-[#2C241B]/10 text-[#2C241B] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">Closes 5PM</span>
                </div>
                <div className="flex gap-4 text-sm text-[#2C241B]/70 mb-4">
                  <MapPin className="w-4 h-4 shrink-0 mt-1" />
                  <span>45 Bleecker St<br/>New York, NY 10014</span>
                </div>
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#D26E4B] group-hover:translate-x-2 transition-transform flex items-center gap-2">
                  Get Directions <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] lg:aspect-auto h-full min-h-[600px] w-full rounded-2xl overflow-hidden">
            <Image 
              src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1500&auto=format&fit=crop" 
              alt="Cafe interior" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHOLESALE / B2B */}
      <section className="bg-[#D26E4B] text-[#F9F6F0] py-32 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6 text-[#F9F6F0]/80">Partner With Us</h2>
          <h3 className="text-5xl md:text-7xl font-serif tracking-tight mb-8">Serve Brooklyn Roasters at your cafe, office, or restaurant.</h3>
          <p className="text-lg text-[#F9F6F0]/90 leading-relaxed mb-12">
            We provide comprehensive training, equipment consultation, and volume pricing for partners who share our commitment to quality.
          </p>
          <button className="px-10 py-5 bg-[#F9F6F0] text-[#D26E4B] text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#2C241B] hover:text-[#F9F6F0] transition-colors">
            Inquire About Wholesale
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#2C241B] text-[#F9F6F0] pt-24 pb-12 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="flex flex-col">
            <div className="flex flex-col mb-8">
              <span className="text-2xl font-bold tracking-tighter leading-none">BROOKLYN</span>
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase mt-1 text-[#D26E4B]">Roasting Co.</span>
            </div>
            <p className="text-sm text-[#F9F6F0]/60 max-w-xs leading-relaxed mb-8">
              Exceptional coffee, roasted with care in Brooklyn, New York. Sourced transparently, served without pretense.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#F9F6F0]/10 flex items-center justify-center hover:bg-[#D26E4B] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#F9F6F0]/10 flex items-center justify-center hover:bg-[#D26E4B] transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-[#D26E4B] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Shop</h5>
            <a href="#" className="text-sm text-[#F9F6F0]/70 hover:text-white transition-colors">All Coffee</a>
            <a href="#" className="text-sm text-[#F9F6F0]/70 hover:text-white transition-colors">Subscriptions</a>
            <a href="#" className="text-sm text-[#F9F6F0]/70 hover:text-white transition-colors">Equipment</a>
            <a href="#" className="text-sm text-[#F9F6F0]/70 hover:text-white transition-colors">Merchandise</a>
            <a href="#" className="text-sm text-[#F9F6F0]/70 hover:text-white transition-colors">Gift Cards</a>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-[#D26E4B] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">About</h5>
            <a href="#" className="text-sm text-[#F9F6F0]/70 hover:text-white transition-colors">Our Story</a>
            <a href="#" className="text-sm text-[#F9F6F0]/70 hover:text-white transition-colors">Sourcing & Impact</a>
            <a href="#" className="text-sm text-[#F9F6F0]/70 hover:text-white transition-colors">Locations</a>
            <a href="#" className="text-sm text-[#F9F6F0]/70 hover:text-white transition-colors">Careers</a>
            <a href="#" className="text-sm text-[#F9F6F0]/70 hover:text-white transition-colors">Contact Us</a>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-[#D26E4B] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">Stay Awake</h5>
            <p className="text-sm text-[#F9F6F0]/60 mb-4">Subscribe for updates on rare releases, new coffees, and brew guides.</p>
            <div className="flex border-b border-[#F9F6F0]/30 pb-2 focus-within:border-[#D26E4B] transition-colors">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#F9F6F0]/30"
              />
              <button className="text-[10px] font-bold tracking-[0.2em] uppercase hover:text-[#D26E4B] transition-colors shrink-0">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#F9F6F0]/10 text-[10px] font-bold tracking-[0.2em] uppercase text-[#F9F6F0]/40">
          <p>© {new Date().getFullYear()} Brooklyn Roasting Co. All Rights Reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Shipping & Returns</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
