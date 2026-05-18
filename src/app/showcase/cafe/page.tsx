import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Mail,
  Coffee,
  Truck,
  Leaf,
  Clock,
} from "lucide-react";

export default function CafeShowcase() {
  return (
    <div className="relative bg-[#F9F6F0] text-[#2C241B] min-h-screen font-sans selection:bg-[#D26E4B] selection:text-white">
      {/* NAVIGATION */}
      <nav className="fixed top-12 left-0 right-0 z-40 bg-[#F9F6F0]/80 backdrop-blur-md border-b border-[#2C241B]/10 transition-all duration-300">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-col">
            <span className="text-2xl font-bold tracking-tighter leading-none">
              THE
            </span>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase mt-1">
              Roastery
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10 text-[11px] font-bold tracking-[0.2em] uppercase">
            <a
              href="#menu"
              className="inline-flex min-h-11 items-center hover:text-[#9F442B] transition-colors"
            >
              Shop Coffee
            </a>
            <a
              href="#subscriptions"
              className="inline-flex min-h-11 items-center hover:text-[#9F442B] transition-colors"
            >
              Subscriptions
            </a>
            <a
              href="#wholesale"
              className="inline-flex min-h-11 items-center hover:text-[#9F442B] transition-colors"
            >
              Wholesale
            </a>
            <a
              href="#locations"
              className="inline-flex min-h-11 items-center hover:text-[#9F442B] transition-colors"
            >
              Locations
            </a>
            <a
              href="#story"
              className="inline-flex min-h-11 items-center hover:text-[#9F442B] transition-colors"
            >
              Our Story
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <a
              href="#contact"
              className="hidden min-h-11 items-center text-[11px] font-bold tracking-[0.2em] uppercase hover:text-[#9F442B] transition-colors md:inline-flex"
            >
              Account
            </a>
            <button className="flex min-h-11 min-w-11 items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase hover:text-[#9F442B] transition-colors">
              Cart (0)
            </button>
            <a
              href="#menu"
              className="hidden min-h-11 items-center bg-[#2C241B] px-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F9F6F0] transition-colors hover:bg-[#9F442B] sm:inline-flex"
            >
              Order Pickup
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section
        id="shop"
        className="relative pt-28 pb-12 md:pt-32 md:pb-16 px-6 md:px-12 max-w-[1600px] mx-auto min-h-[90vh] lg:min-h-screen flex flex-col justify-center"
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#2C241B]/20 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-[#9F442B]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
                Now Roasting: Ethiopian Yirgacheffe
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl lg:text-[8.5rem] font-serif leading-[0.85] tracking-tight mb-6">
              Coffee that <br />
              <span className="italic text-[#8B6E52]">Respects</span>
              <br />
              the Source.
            </h1>

            <p className="text-base md:text-xl max-w-lg text-[#2C241B]/75 leading-relaxed mb-8">
              We source directly from independent farmers globally to roast
              small-batch, specialty coffee in the heart of Brooklyn.
              Uncompromising quality from seed to cup.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12">
              <a
                href="#menu"
                className="px-8 py-4 bg-[#2C241B] text-[#F9F6F0] text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#9F442B] transition-colors flex items-center justify-center gap-3 group"
              >
                View Menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* HIGH CRAFT: Hours and Location visible without scrolling (Case Study Promise) */}
            <div className="bg-white/80 backdrop-blur-md border border-[#2C241B]/10 p-6 rounded-2xl flex flex-col sm:flex-row gap-8 w-full max-w-lg shadow-xl mt-auto">
              <div className="flex gap-3">
                <MapPin className="w-5 h-5 text-[#9F442B] shrink-0" />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2C241B]/80 mb-1">
                    Flagship Cafe
                  </p>
                  <p className="text-sm font-semibold">
                    123 Roaster Ave, Brooklyn
                  </p>
                  <a
                    href="#locations"
                    className="mt-2 inline-flex min-h-11 items-center text-[10px] font-bold uppercase tracking-[0.1em] text-[#9F442B] hover:underline"
                  >
                    Get Directions
                  </a>
                </div>
              </div>
              <div className="w-px bg-[#2C241B]/10 hidden sm:block"></div>
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-[#9F442B] shrink-0" />
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2C241B]/80 mb-1">
                    Today&apos;s Hours
                  </p>
                  <p className="text-sm font-semibold">Open • Closes at 7PM</p>
                  <p className="text-[#2C241B]/80 text-[10px] mt-2">
                    Mon-Sun, 7AM - 7PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-[50vh] lg:h-[70vh] max-h-[600px] w-full rounded-t-full overflow-hidden mt-8 lg:mt-0">
            <Image
              src="/media/showcase/the-roastery-hero.webp"
              alt="The Roastery menu-first cafe website visual"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              fetchPriority="high"
              preload
            />
            {/* Circular badge overlay */}
            <div className="absolute top-12 right-12 md:-right-6 md:top-32 w-28 h-28 md:w-32 md:h-32 bg-[#9F442B] rounded-full flex items-center justify-center text-white p-4 text-center rotate-12 shadow-2xl">
              <span className="text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase leading-tight">
                Fresh
                <br />
                Roasted
                <br />
                Daily
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="border-y border-[#2C241B]/10 py-5 overflow-hidden flex whitespace-nowrap bg-[#2C241B] text-[#F9F6F0]">
        <div
          data-native-scroll
          className="flex gap-16 overflow-x-auto px-6 text-[11px] font-bold uppercase tracking-[0.3em] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {[...Array(8)].map((_, i) => (
            <span key={i} className="flex items-center gap-16">
              <span>Fair Trade Certified</span>
              <span>•</span>
              <span>Roasted on site</span>
              <span>•</span>
              <span>Single Origin Excellence</span>
              <span>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* BRAND STORY */}
      <section
        id="story"
        className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="relative aspect-square w-full md:w-4/5">
            <Image
              src="/media/showcase/the-roastery-roasting.webp"
              alt="The Roastery small-batch roasting system"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-2xl"
            />
            {/* Floating smaller image */}
            <div className="absolute -bottom-16 -right-8 md:-right-16 w-2/3 aspect-[4/3] border-8 border-[#F9F6F0] rounded-2xl overflow-hidden shadow-2xl hidden sm:block">
              <Image
                src="/media/showcase/the-roastery-beans.webp"
                alt="The Roastery seasonal coffee menu visual"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col items-start mt-16 sm:mt-0">
            <h2 className="text-[#9F442B] text-[11px] font-bold tracking-[0.3em] uppercase mb-6">
              Our Philosophy
            </h2>
            <h3 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.1] mb-8">
              We believe great coffee requires radical transparency.
            </h3>
            <p className="text-base md:text-lg text-[#2C241B]/70 leading-relaxed mb-6">
              Founded in 2012 in a small Williamsburg garage, Brooklyn Roasting
              Co. was built on a simple premise: pay farmers exceptionally well,
              roast with meticulous scientific precision, and serve without the
              snobbery.
            </p>
            <p className="text-base md:text-lg text-[#2C241B]/70 leading-relaxed mb-12">
              Every bean we roast tells a story of terroir, altitude, and
              careful processing. We spend months each year at origin building
              relationships so that the cup you brew at home is the absolute
              best representation of that harvest.
            </p>

            <div className="grid grid-cols-2 gap-8 w-full border-t border-[#2C241B]/10 pt-12">
              <div>
                <div className="text-4xl font-serif mb-2">12+</div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2C241B]/80">
                  Partner Countries
                </div>
              </div>
              <div>
                <div className="text-4xl font-serif mb-2">3.5x</div>
                <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#2C241B]/80">
                  Above Fair-Trade Price
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRINT-INSPIRED CAFE MENU (Case Study Promise: Menu is first-class) */}
      <section id="menu" className="bg-[#2C241B] text-[#F9F6F0] py-24 md:py-32">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-[#F1A37D] text-[11px] font-bold tracking-[0.3em] uppercase mb-6">
              Our Offerings
            </h2>
            <h3 className="text-4xl md:text-6xl font-serif tracking-tight">
              The Menu
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            {/* Column 1 */}
            <div>
              <h4 className="text-2xl font-serif border-b border-[#F9F6F0]/20 pb-4 mb-8 text-[#F1A37D]">
                Espresso Bar
              </h4>
              <ul className="space-y-8">
                <li>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xl font-medium tracking-wide">
                      Espresso
                    </span>
                    <span className="text-lg text-[#F9F6F0]/60">3.5</span>
                  </div>
                  <p className="text-sm text-[#F9F6F0]/75 font-light leading-relaxed">
                    Double shot of our seasonal Bedford blend.
                  </p>
                </li>
                <li>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xl font-medium tracking-wide">
                      Cortado
                    </span>
                    <span className="text-lg text-[#F9F6F0]/60">4.0</span>
                  </div>
                  <p className="text-sm text-[#F9F6F0]/75 font-light leading-relaxed">
                    Equal parts espresso and steamed milk.
                  </p>
                </li>
                <li>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xl font-medium tracking-wide">
                      Cappuccino
                    </span>
                    <span className="text-lg text-[#F9F6F0]/60">4.5</span>
                  </div>
                  <p className="text-sm text-[#F9F6F0]/75 font-light leading-relaxed">
                    Espresso with thick, velvety micro-foam.
                  </p>
                </li>
                <li>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xl font-medium tracking-wide">
                      Latte
                    </span>
                    <span className="text-lg text-[#F9F6F0]/60">5.0</span>
                  </div>
                  <p className="text-sm text-[#F9F6F0]/75 font-light leading-relaxed">
                    Espresso with lightly textured milk. Hot or iced.
                  </p>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="text-2xl font-serif border-b border-[#F9F6F0]/20 pb-4 mb-8 text-[#F1A37D]">
                Pour Over
              </h4>
              <ul className="space-y-8 mb-16">
                <li>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xl font-medium tracking-wide">
                      Yirgacheffe Reserve
                    </span>
                    <span className="text-lg text-[#F9F6F0]/60">6.0</span>
                  </div>
                  <p className="text-sm text-[#F9F6F0]/75 font-light leading-relaxed">
                    Ethiopia • Jasmine, Lemon Zest, Raw Honey
                  </p>
                </li>
                <li>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xl font-medium tracking-wide">
                      Antigua Estate
                    </span>
                    <span className="text-lg text-[#F9F6F0]/60">5.5</span>
                  </div>
                  <p className="text-sm text-[#F9F6F0]/75 font-light leading-relaxed">
                    Guatemala • Caramel, Green Apple, Almond
                  </p>
                </li>
              </ul>

              <h4 className="text-2xl font-serif border-b border-[#F9F6F0]/20 pb-4 mb-8 text-[#F1A37D]">
                Not Coffee
              </h4>
              <ul className="space-y-8">
                <li>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xl font-medium tracking-wide">
                      Matcha Latte
                    </span>
                    <span className="text-lg text-[#F9F6F0]/60">5.5</span>
                  </div>
                  <p className="text-sm text-[#F9F6F0]/75 font-light leading-relaxed">
                    Ceremonial grade matcha from Uji, Japan.
                  </p>
                </li>
                <li>
                  <div className="flex justify-between items-baseline mb-2">
                    <span className="text-xl font-medium tracking-wide">
                      Chai Tea Latte
                    </span>
                    <span className="text-lg text-[#F9F6F0]/60">5.0</span>
                  </div>
                  <p className="text-sm text-[#F9F6F0]/75 font-light leading-relaxed">
                    House-made spicy chai concentrate with milk.
                  </p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-20 pt-10 border-t border-[#F9F6F0]/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#F9F6F0]/75">
              Alternative milks available: Oat, Almond, Macadamia (+0.75)
            </p>
            <a
              href="#contact"
              className="px-8 py-4 bg-[#9F442B] text-[#F9F6F0] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#F9F6F0] hover:text-[#2C241B] transition-colors"
            >
              Order Ahead
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES / BENEFITS */}
      <section
        id="subscriptions"
        className="py-24 border-b border-[#2C241B]/10"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#9F442B]/10 flex items-center justify-center text-[#9F442B] mb-6">
              <Leaf className="w-6 h-6" />
            </div>
            <p className="text-xl font-serif mb-3">Ethically Sourced</p>
            <p className="text-[#2C241B]/70 text-sm leading-relaxed max-w-xs">
              We pay severe premiums above fair-trade to ensure farmers can
              reinvest in their communities.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#9F442B]/10 flex items-center justify-center text-[#9F442B] mb-6">
              <Coffee className="w-6 h-6" />
            </div>
            <p className="text-xl font-serif mb-3">Small Batch Roasted</p>
            <p className="text-[#2C241B]/70 text-sm leading-relaxed max-w-xs">
              Roasted to order on our vintage Probat machines, hand-profiled by
              our head roaster.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#9F442B]/10 flex items-center justify-center text-[#9F442B] mb-6">
              <Truck className="w-6 h-6" />
            </div>
            <p className="text-xl font-serif mb-3">Fast & Free Shipping</p>
            <p className="text-[#2C241B]/70 text-sm leading-relaxed max-w-xs">
              Free shipping on all US orders over $40. Beans ship within 24
              hours of roasting.
            </p>
          </div>
        </div>
      </section>

      {/* LOCATIONS */}
      <section
        id="locations"
        className="py-32 max-w-[1600px] mx-auto px-6 md:px-12"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="flex flex-col justify-center">
            <h2 className="text-[#9F442B] text-[11px] font-bold tracking-[0.3em] uppercase mb-6">
              Visit Us
            </h2>
            <h3 className="text-5xl md:text-7xl font-serif tracking-tight mb-8">
              Our Cafes
            </h3>
            <p className="text-lg text-[#2C241B]/70 leading-relaxed mb-12 max-w-md">
              Experience our coffee exactly as it was meant to be brewed. Enjoy
              a pour-over, grab a bag of beans, and stay a while.
            </p>

            <div className="space-y-8">
              <div className="p-8 border border-[#2C241B]/10 rounded-2xl hover:border-[#D26E4B] transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-serif">Williamsburg Flagship</h4>
                  <span className="px-3 py-1 bg-[#9F442B]/10 text-[#9F442B] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">
                    Open Now
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-[#2C241B]/70 mb-4">
                  <MapPin className="w-4 h-4 shrink-0 mt-1" />
                  <span>
                    123 Roaster Ave
                    <br />
                    Brooklyn, NY 11211
                  </span>
                </div>
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#9F442B] group-hover:translate-x-2 transition-transform flex items-center gap-2">
                  Get Directions <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              <div className="p-8 border border-[#2C241B]/10 rounded-2xl hover:border-[#D26E4B] transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-serif">West Village Kiosk</h4>
                  <span className="px-3 py-1 bg-[#2C241B]/10 text-[#2C241B] text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">
                    Closes 5PM
                  </span>
                </div>
                <div className="flex gap-4 text-sm text-[#2C241B]/70 mb-4">
                  <MapPin className="w-4 h-4 shrink-0 mt-1" />
                  <span>
                    45 Bleecker St
                    <br />
                    New York, NY 10014
                  </span>
                </div>
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#9F442B] group-hover:translate-x-2 transition-transform flex items-center gap-2">
                  Get Directions <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] lg:aspect-auto h-full min-h-[600px] w-full rounded-2xl overflow-hidden">
            <Image
              src="/media/showcase/the-roastery-interior.webp"
              alt="The Roastery visit and location visual"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHOLESALE / B2B */}
      <section
        id="wholesale"
        className="bg-[#9F442B] text-[#F9F6F0] py-32 px-6 md:px-12 text-center"
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <h2 className="text-[11px] font-bold tracking-[0.3em] uppercase mb-6 text-[#F9F6F0]/80">
            Partner With Us
          </h2>
          <h3 className="text-5xl md:text-7xl font-serif tracking-tight mb-8">
            Serve Brooklyn Roasters at your cafe, office, or restaurant.
          </h3>
          <p className="text-lg text-[#F9F6F0]/90 leading-relaxed mb-12">
            We provide comprehensive training, equipment consultation, and
            volume pricing for partners who share our commitment to quality.
          </p>
          <a
            href="#contact"
            className="px-10 py-5 bg-[#F9F6F0] text-[#9F442B] text-xs font-bold tracking-[0.2em] uppercase rounded-full hover:bg-[#2C241B] hover:text-[#F9F6F0] transition-colors"
          >
            Inquire About Wholesale
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="contact"
        className="bg-[#2C241B] text-[#F9F6F0] pt-24 pb-12 px-6 md:px-12"
      >
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="flex flex-col">
            <div className="flex flex-col mb-8">
              <span className="text-2xl font-bold tracking-tighter leading-none">
                THE
              </span>
              <span className="text-[10px] font-semibold tracking-[0.3em] uppercase mt-1 text-[#F1A37D]">
                Roastery
              </span>
            </div>
            <p className="text-sm text-[#F9F6F0]/60 max-w-xs leading-relaxed mb-8">
              Exceptional coffee, roasted with care by The Roastery.
              Sourced transparently, served without pretense.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="The Roastery on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F9F6F0]/10 transition-colors hover:bg-[#9F442B]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="mailto:hello@theroastery.example"
                aria-label="Email The Roastery"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F9F6F0]/10 transition-colors hover:bg-[#9F442B]"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[#F1A37D] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
              Shop
            </p>
            <a
              href="#menu"
              className="inline-flex min-h-11 items-center text-sm text-[#F9F6F0]/70 transition-colors hover:text-white"
            >
              All Coffee
            </a>
            <a
              href="#subscriptions"
              className="inline-flex min-h-11 items-center text-sm text-[#F9F6F0]/70 transition-colors hover:text-white"
            >
              Subscriptions
            </a>
            <a
              href="#menu"
              className="inline-flex min-h-11 items-center text-sm text-[#F9F6F0]/70 transition-colors hover:text-white"
            >
              Equipment
            </a>
            <a
              href="#menu"
              className="inline-flex min-h-11 items-center text-sm text-[#F9F6F0]/70 transition-colors hover:text-white"
            >
              Merchandise
            </a>
            <a
              href="#menu"
              className="inline-flex min-h-11 items-center text-sm text-[#F9F6F0]/70 transition-colors hover:text-white"
            >
              Gift Cards
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[#F1A37D] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
              About
            </p>
            <a
              href="#story"
              className="inline-flex min-h-11 items-center text-sm text-[#F9F6F0]/70 transition-colors hover:text-white"
            >
              Our Story
            </a>
            <a
              href="#story"
              className="inline-flex min-h-11 items-center text-sm text-[#F9F6F0]/70 transition-colors hover:text-white"
            >
              Sourcing & Impact
            </a>
            <a
              href="#locations"
              className="inline-flex min-h-11 items-center text-sm text-[#F9F6F0]/70 transition-colors hover:text-white"
            >
              Locations
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center text-sm text-[#F9F6F0]/70 transition-colors hover:text-white"
            >
              Careers
            </a>
            <a
              href="mailto:hello@theroastery.example"
              className="inline-flex min-h-11 items-center text-sm text-[#F9F6F0]/70 transition-colors hover:text-white"
            >
              Contact Us
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[#F1A37D] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
              Stay Awake
            </p>
            <p className="text-sm text-[#F9F6F0]/60 mb-4">
              Subscribe for updates on rare releases, new coffees, and brew
              guides.
            </p>
            <div className="flex border-b border-[#F9F6F0]/30 pb-2 focus-within:border-[#D26E4B] transition-colors">
              <input
                type="email"
                placeholder="Email Address"
                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-[#F9F6F0]/30"
              />
              <button className="min-h-11 shrink-0 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#F1A37D]">
                Sign Up
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#F9F6F0]/10 text-[10px] font-bold tracking-[0.2em] uppercase text-[#F9F6F0]/70">
          <p>
            © {new Date().getFullYear()} The Roastery. All Rights
            Reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="/privacy"
              className="inline-flex min-h-11 items-center transition-colors hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="inline-flex min-h-11 items-center transition-colors hover:text-white"
            >
              Terms of Service
            </a>
            <a
              href="#contact"
              className="inline-flex min-h-11 items-center transition-colors hover:text-white"
            >
              Shipping & Returns
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
