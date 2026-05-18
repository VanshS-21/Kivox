import Image from "next/image";
import { ArrowRight, Check, MapPin, Clock } from "lucide-react";

const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const XIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const YoutubeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

export default function FitnessShowcase() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] font-sans text-white selection:bg-[#CCFF00] selection:text-black">
      {/* HEADER */}
      <header className="fixed left-0 right-0 top-12 z-50 flex items-center justify-between px-6 py-6 mix-blend-difference pointer-events-none md:px-12">
        <div className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic pointer-events-auto flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#CCFF00]"
          >
            <path d="M12 2L2 22H22L12 2Z" fill="currentColor" />
          </svg>
          IRON<span className="text-[#CCFF00]">CLAD</span>
        </div>
        <div className="hidden md:flex gap-8 items-center pointer-events-auto">
          <a
            href="#programs"
            className="inline-flex min-h-11 items-center text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#CCFF00]"
          >
            Programs
          </a>
          <a
            href="#coaches"
            className="inline-flex min-h-11 items-center text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#CCFF00]"
          >
            Coaches
          </a>
          <a
            href="#memberships"
            className="inline-flex min-h-11 items-center text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-[#CCFF00]"
          >
            Pricing
          </a>
        </div>
        <a
          href="#memberships"
          className="pointer-events-auto hidden min-h-11 items-center bg-[#CCFF00] px-6 text-xs font-black uppercase tracking-[0.1em] text-black skew-x-[-10deg] transition-colors hover:bg-white sm:inline-flex md:text-sm"
        >
          <span className="block skew-x-[10deg]">Join Now</span>
        </a>
      </header>

      {/* HERO */}
      <section className="relative min-h-[90vh] md:min-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2000&auto=format&fit=crop"
            alt="Intense Gym Training"
            fill
            sizes="100vw"
            className="object-cover opacity-40 grayscale contrast-125"
            fetchPriority="high"
            preload
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
        </div>

        <div className="relative z-10 w-full px-6 flex flex-col items-center text-center mt-20">
          <div>
            <h1 className="text-[14vw] md:text-[12vw] font-black leading-[0.8] tracking-tighter uppercase italic flex flex-col items-center">
              <span>Push</span>
              <span
                className="text-transparent relative"
                style={{ WebkitTextStroke: "2px #CCFF00" }}
              >
                Past
              </span>
              <span>Your Limits</span>
            </h1>
          </div>
          <p className="mt-8 md:mt-12 text-lg md:text-2xl font-bold tracking-tight uppercase max-w-2xl text-white/80">
            Elite facilities. World-class trainers. No excuses.
          </p>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="relative z-20 flex origin-left -rotate-2 scale-110 overflow-hidden border-y-4 border-white bg-[#CCFF00] py-4 text-black md:py-6">
        <div
          data-native-scroll
          className="overflow-x-auto px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div className="flex w-max items-center gap-8 text-5xl font-black uppercase italic tracking-tighter md:text-7xl">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex items-center px-4">
              <span>Strength</span>
              <span className="mx-6 text-4xl">•</span>
              <span>Conditioning</span>
              <span className="mx-6 text-4xl">•</span>
              <span>Power</span>
              <span className="mx-6 text-4xl">•</span>
            </span>
          ))}
          </div>
        </div>
      </div>

      {/* METHODOLOGIES (PROGRAMS) */}
      <section
        id="programs"
        className="px-6 md:px-12 py-32 max-w-[1600px] mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
          <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
            Our <br />
            <span className="text-[#CCFF00]">Programs</span>
          </h2>
          <p className="max-w-md text-white/60 font-medium text-lg">
            Designed for maximum output. Choose your path to greatness with our
            specialized training modalities.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Hypertrophy",
              desc: "Build mass. Lift heavy. Progressive overload focus.",
              img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000&auto=format&fit=crop",
              stat: "45 MIN",
            },
            {
              title: "Endurance",
              desc: "Cardio conditioning. High-intensity interval training.",
              img: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000&auto=format&fit=crop",
              stat: "60 MIN",
            },
            {
              title: "Mobility",
              desc: "Recover, stretch, and increase joint longevity.",
              img: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1000&auto=format&fit=crop",
              stat: "30 MIN",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative aspect-[3/4] group overflow-hidden bg-[#111] border border-white/10"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover opacity-40 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-t from-black via-black/40 to-transparent">
                <div className="self-end px-3 py-1 bg-[#CCFF00] text-black text-xs font-black tracking-widest uppercase">
                  {item.stat}
                </div>
                <div>
                  <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-3 transform group-hover:-translate-y-2 transition-transform duration-500">
                    {item.title}
                  </h3>
                  <p className="text-white/70 font-medium text-sm md:text-base mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {item.desc}
                  </p>
                  <a
                    href="#schedule"
                    className="flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#CCFF00] transition-colors hover:text-white"
                  >
                    Explore <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CLASS SCHEDULE (Case Study Promise) */}
      <section
        id="schedule"
        className="px-6 md:px-12 py-24 md:py-32 max-w-[1600px] mx-auto border-t border-white/10"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
              The <br />
              <span className="text-[#CCFF00]">Schedule</span>
            </h2>
          </div>
          <p className="max-w-md text-white/60 font-medium text-lg">
            Real-time class schedule. Drop in or book ahead to secure your spot
            in the trenches.
          </p>
        </div>

        {/* Desktop Table (Hidden on Mobile) */}
        <div data-native-scroll className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-white/20">
                <th className="py-6 px-4 text-sm font-bold uppercase tracking-widest text-white/50 w-[15%]">
                  Time
                </th>
                <th className="py-6 px-4 text-sm font-bold uppercase tracking-widest text-white/50 w-[30%]">
                  Class
                </th>
                <th className="py-6 px-4 text-sm font-bold uppercase tracking-widest text-white/50 w-[25%]">
                  Trainer
                </th>
                <th className="py-6 px-4 text-sm font-bold uppercase tracking-widest text-white/50 w-[15%]">
                  Level
                </th>
                <th className="py-6 px-4 text-sm font-bold uppercase tracking-widest text-white/50 w-[15%]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {[
                {
                  time: "06:00 AM",
                  name: "Ironclad Hypertrophy",
                  trainer: "Marcus Kane",
                  level: "Advanced",
                  color: "text-[#FF3333]",
                  bg: "bg-[#FF3333]/10",
                },
                {
                  time: "07:30 AM",
                  name: "Endurance Engine",
                  trainer: "Elena Rostova",
                  level: "All Levels",
                  color: "text-[#CCFF00]",
                  bg: "bg-[#CCFF00]/10",
                },
                {
                  time: "12:00 PM",
                  name: "Lunchtime Power",
                  trainer: "David Vance",
                  level: "Intermediate",
                  color: "text-[#FF9900]",
                  bg: "bg-[#FF9900]/10",
                },
                {
                  time: "05:30 PM",
                  name: "Ironclad Hypertrophy",
                  trainer: "Marcus Kane",
                  level: "Advanced",
                  color: "text-[#FF3333]",
                  bg: "bg-[#FF3333]/10",
                },
                {
                  time: "07:00 PM",
                  name: "Mobility Flow",
                  trainer: "Elena Rostova",
                  level: "All Levels",
                  color: "text-[#CCFF00]",
                  bg: "bg-[#CCFF00]/10",
                },
              ].map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="py-6 px-4 font-black text-xl italic tracking-tighter">
                    {row.time}
                  </td>
                  <td className="py-6 px-4 font-black uppercase tracking-tight text-xl group-hover:text-[#CCFF00] transition-colors">
                    {row.name}
                  </td>
                  <td className="py-6 px-4 font-medium text-white/70">
                    {row.trainer}
                  </td>
                  <td className="py-6 px-4">
                    <span
                      className={`px-3 py-1 text-xs font-black uppercase tracking-widest ${row.color} ${row.bg}`}
                    >
                      {row.level}
                    </span>
                  </td>
                  <td className="py-6 px-4">
                    <a
                      href="#memberships"
                      className="inline-flex min-h-11 items-center border-b border-white/30 text-xs font-bold uppercase tracking-[0.1em] transition-all hover:border-[#CCFF00] hover:text-[#CCFF00]"
                    >
                      Book Spot
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List View (Hidden on Desktop) */}
        <div className="md:hidden space-y-4">
          {[
            {
              time: "06:00 AM",
              name: "Ironclad Hypertrophy",
              trainer: "Marcus Kane",
              level: "Advanced",
              color: "text-[#FF3333]",
              bg: "bg-[#FF3333]/10",
            },
            {
              time: "07:30 AM",
              name: "Endurance Engine",
              trainer: "Elena Rostova",
              level: "All Levels",
              color: "text-[#CCFF00]",
              bg: "bg-[#CCFF00]/10",
            },
            {
              time: "12:00 PM",
              name: "Lunchtime Power",
              trainer: "David Vance",
              level: "Intermediate",
              color: "text-[#FF9900]",
              bg: "bg-[#FF9900]/10",
            },
            {
              time: "05:30 PM",
              name: "Ironclad Hypertrophy",
              trainer: "Marcus Kane",
              level: "Advanced",
              color: "text-[#FF3333]",
              bg: "bg-[#FF3333]/10",
            },
            {
              time: "07:00 PM",
              name: "Mobility Flow",
              trainer: "Elena Rostova",
              level: "All Levels",
              color: "text-[#CCFF00]",
              bg: "bg-[#CCFF00]/10",
            },
          ].map((row, i) => (
            <div
              key={i}
              className="bg-[#111] border border-white/10 p-5 flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-black text-xl italic tracking-tighter text-[#CCFF00] mb-1">
                    {row.time}
                  </div>
                  <h3 className="font-black uppercase tracking-tight text-xl">
                    {row.name}
                  </h3>
                  <div className="text-sm font-medium text-white/60 mt-1">
                    {row.trainer}
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-[10px] font-black uppercase tracking-widest ${row.color} ${row.bg}`}
                >
                  {row.level}
                </span>
              </div>
              <a
                href="#memberships"
                className="flex min-h-11 w-full items-center justify-center border border-white/20 text-center text-xs font-bold uppercase tracking-[0.1em] skew-x-[-10deg] transition-colors hover:bg-white hover:text-black"
              >
                <span className="block skew-x-[10deg]">Book Spot</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ELITE TRAINERS */}
      <section
        id="coaches"
        className="bg-[#111] border-y border-white/10 py-32 px-6 md:px-12 relative overflow-hidden"
      >
        {/* Giant background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-5">
          <span className="text-[20vw] font-black uppercase italic tracking-tighter whitespace-nowrap">
            LEADERS
          </span>
        </div>

        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="mb-20 text-center">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
              Head Coaches
            </h2>
            <p className="text-white/60 max-w-xl mx-auto font-medium">
              Learn from professionals who have dedicated their lives to
              mastering human performance.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-24">
            {[
              {
                name: "Marcus Kane",
                role: "Head of Strength",
                img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1000&auto=format&fit=crop",
              },
              {
                name: "Elena Rostova",
                role: "Endurance & Mobility",
                img: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000&auto=format&fit=crop",
              },
              {
                name: "David Vance",
                role: "Powerlifting",
                img: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1000&auto=format&fit=crop",
              },
            ].map((trainer, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="relative aspect-square mb-6 overflow-hidden bg-[#050505]">
                  <Image
                    src={trainer.img}
                    alt={trainer.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-80 group-hover:opacity-100"
                  />
                  {/* Brutalist crosshair decorative corners */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[#CCFF00] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter mb-1 group-hover:text-[#CCFF00] transition-colors">
                  {trainer.name}
                </h3>
                <p className="text-white/50 font-bold tracking-widest text-xs uppercase">
                  {trainer.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIPS */}
      <section
        id="memberships"
        className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto"
      >
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            Join The Ranks
          </h2>
          <p className="text-white/60 font-medium">
            No contracts. No hidden fees. Just results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Tier 1 */}
          <div className="border border-white/10 bg-[#111] p-8 hover:border-white/30 transition-colors">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">
              Drop-In
            </h3>
            <div className="text-5xl font-black tracking-tighter mb-6">
              $35
              <span className="text-lg text-white/70 tracking-normal font-medium">
                /day
              </span>
            </div>
            <ul className="space-y-4 mb-8 text-white/70 text-sm">
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#CCFF00]" /> Single day access
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#CCFF00]" /> 1 Group Class
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#CCFF00]" /> Locker & Shower
              </li>
            </ul>
            <a
              href="#schedule"
              className="block w-full py-4 border border-white/20 text-center text-xs font-bold uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-colors skew-x-[-10deg]"
            >
              <span className="block skew-x-[10deg]">Select Pass</span>
            </a>
          </div>

          {/* Tier 2 - Highlighted */}
          <div className="border-2 border-[#CCFF00] bg-gradient-to-b from-[#111] to-[#CCFF00]/5 p-10 transform md:-translate-y-4 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#CCFF00] text-black px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em]">
              Most Popular
            </div>
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2 text-[#CCFF00]">
              Unlimited
            </h3>
            <div className="text-6xl font-black tracking-tighter mb-6">
              $199
              <span className="text-xl text-white/70 tracking-normal font-medium">
                /mo
              </span>
            </div>
            <ul className="space-y-4 mb-10 text-white/80">
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#CCFF00]" /> 24/7 Facility
                Access
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#CCFF00]" /> Unlimited Group
                Classes
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#CCFF00]" /> 1 PT Session /
                Month
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-5 h-5 text-[#CCFF00]" /> Recovery Zone
                Access
              </li>
            </ul>
            <a
              href="#schedule"
              className="block w-full py-5 bg-[#CCFF00] text-center text-black text-sm font-black uppercase tracking-[0.1em] hover:bg-white transition-colors skew-x-[-10deg]"
            >
              <span className="block skew-x-[10deg]">Become a Member</span>
            </a>
          </div>

          {/* Tier 3 */}
          <div className="border border-white/10 bg-[#111] p-8 hover:border-white/30 transition-colors">
            <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">
              Personal Training
            </h3>
            <div className="text-5xl font-black tracking-tighter mb-6">
              $499
              <span className="text-lg text-white/70 tracking-normal font-medium">
                /mo
              </span>
            </div>
            <ul className="space-y-4 mb-8 text-white/70 text-sm">
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#CCFF00]" /> All Unlimited
                benefits
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#CCFF00]" /> 4 PT Sessions /
                Month
              </li>
              <li className="flex items-center gap-3">
                <Check className="w-4 h-4 text-[#CCFF00]" /> Custom Nutrition
                Plan
              </li>
            </ul>
            <a
              href="#schedule"
              className="block w-full py-4 border border-white/20 text-center text-xs font-bold uppercase tracking-[0.1em] hover:bg-white hover:text-black transition-colors skew-x-[-10deg]"
            >
              <span className="block skew-x-[10deg]">Apply Now</span>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white text-black relative overflow-hidden">
        {/* Giant CTA */}
        <div className="bg-[#CCFF00] py-24 md:py-32 px-6 text-center border-b border-black/10">
          <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter mb-8 leading-[0.85]">
            Start <br className="md:hidden" />
            Today
          </h2>
          <a
            href="#memberships"
            className="inline-flex px-12 py-6 bg-[#050505] text-white font-black text-lg md:text-xl tracking-tight uppercase hover:bg-transparent hover:text-black hover:border-[#050505] border-2 border-transparent transition-all skew-x-[-10deg] group"
          >
            <span className="flex items-center gap-3 skew-x-[10deg]">
              Claim Free Trial{" "}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </a>
        </div>

        {/* Info Grid */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <div className="text-3xl font-black tracking-tighter uppercase italic mb-8">
              IRON<span className="text-[#4D6100] drop-shadow-sm">CLAD</span>
            </div>
            <p className="text-black/60 font-medium mb-6 max-w-xs">
              Forging elite fitness through uncompromised discipline and
              state-of-the-art facilities.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ironclad on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#050505] text-white transition-colors hover:bg-[#CCFF00] hover:text-black"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ironclad on X"
                className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#050505] text-white transition-colors hover:bg-[#CCFF00] hover:text-black"
              >
                <XIcon />
              </a>
              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ironclad on YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-sm bg-[#050505] text-white transition-colors hover:bg-[#CCFF00] hover:text-black"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          <div>
            <p className="font-black uppercase tracking-widest text-sm mb-6">
              Location
            </p>
            <div className="flex gap-3 mb-4">
              <MapPin className="w-5 h-5 shrink-0" />
              <div>
                <p className="font-bold">The Foundry</p>
                <p className="text-black/60 text-sm">
                  482 Industrial Way
                  <br />
                  Brooklyn, NY 11222
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-black uppercase tracking-widest text-sm mb-6">
              Hours
            </p>
            <div className="flex gap-3">
              <Clock className="w-5 h-5 shrink-0" />
              <div className="space-y-2 text-sm text-black/70">
                <div className="flex justify-between gap-4">
                  <span className="font-bold text-black">Mon - Fri</span>{" "}
                  <span>05:00 - 23:00</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="font-bold text-black">Saturday</span>{" "}
                  <span>06:00 - 20:00</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="font-bold text-black">Sunday</span>{" "}
                  <span>07:00 - 18:00</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="font-black uppercase tracking-widest text-sm mb-6">
              Legal
            </p>
            <ul className="space-y-3 text-sm text-black/60 font-medium">
              <li>
                <a
                  href="/privacy"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-black"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-black"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/terms"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-black"
                >
                  Liability Waiver
                </a>
              </li>
              <li>
                <a
                  href="#memberships"
                  className="inline-flex min-h-11 items-center transition-colors hover:text-black"
                >
                  Membership Rules
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
