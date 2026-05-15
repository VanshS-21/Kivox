"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, BookOpen, Users, Trophy, ChevronRight, GraduationCap, MapPin, Phone, Mail } from "lucide-react";

export default function SchoolShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  return (
    <div 
      ref={containerRef}
      className="relative bg-white text-[#0A192F] min-h-screen font-sans selection:bg-[#C5A059] selection:text-white"
    >
      {/* NAVIGATION */}
      <nav className="fixed top-12 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#0A192F]/10 transition-all duration-300 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0A192F] text-white flex items-center justify-center rounded-sm">
              <span className="font-serif text-xl font-bold">W</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-none text-[#0A192F]">WELLINGTON</span>
              <span className="text-[9px] font-semibold tracking-[0.2em] uppercase mt-1 text-[#C5A059]">Preparatory Academy</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.15em] uppercase text-[#0A192F]">
            <a href="#" className="hover:text-[#C5A059] transition-colors">About Us</a>
            <a href="#" className="hover:text-[#C5A059] transition-colors">Academics</a>
            <a href="#" className="hover:text-[#C5A059] transition-colors">Admissions</a>
            <a href="#" className="hover:text-[#C5A059] transition-colors">Student Life</a>
            <a href="#" className="hover:text-[#C5A059] transition-colors">Athletics</a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a href="#" className="hidden md:block text-[10px] font-bold tracking-[0.1em] uppercase text-[#0A192F]/60 hover:text-[#0A192F] transition-colors pr-4 border-r border-[#0A192F]/20">
              Parent Portal
            </a>
            <button className="px-6 py-2.5 bg-[#0A192F] text-white text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-[#C5A059] transition-colors rounded-sm">
              Inquire
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-48 h-[80vh] min-h-[600px] max-h-[900px] flex items-center md:items-end pb-12 md:pb-24 px-6 md:px-12">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2000&auto=format&fit=crop" 
            alt="Historic campus building" 
            fill 
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full mt-12 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-block px-3 py-1 bg-[#C5A059] text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-6 rounded-sm">
              Est. 1892
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05] mb-6">
              Cultivating Intellect.<br/>
              Inspiring Character.
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-8 font-light">
              A premier independent day and boarding school for grades 9-12, fostering academic excellence and ethical leadership in the heart of New England.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-[#0A192F] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#C5A059] hover:text-white transition-colors rounded-sm flex items-center justify-center gap-2 group">
                Discover Wellington
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-transparent border border-white/30 text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors rounded-sm text-center">
                Virtual Tour
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* QUICK STATS & HERITAGE */}
      <section className="bg-[#0A192F] text-white py-16 md:py-24 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-4 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="py-6 md:py-0 flex flex-col items-center justify-center">
            <span className="text-4xl lg:text-6xl font-serif text-[#C5A059] mb-2">100%</span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">College Matriculation</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="py-6 md:py-0 flex flex-col items-center justify-center">
            <span className="text-4xl lg:text-6xl font-serif text-[#C5A059] mb-2">6:1</span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">Student-Teacher Ratio</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="py-6 md:py-0 flex flex-col items-center justify-center">
            <span className="text-4xl lg:text-6xl font-serif text-[#C5A059] mb-2">45</span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">States & Countries Represented</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="py-6 md:py-0 flex flex-col items-center justify-center">
            <span className="text-4xl lg:text-6xl font-serif text-[#C5A059] mb-2">75+</span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">Varsity & Club Athletics</span>
          </motion.div>
        </div>
      </section>

      {/* HEADMASTER'S WELCOME */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-full">
            <Image 
              src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1500&auto=format&fit=crop" 
              alt="Historic academy library" 
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-sm"
            />
            <div className="absolute -bottom-8 -right-8 w-2/3 aspect-[4/3] border-8 border-white bg-[#0A192F] p-8 hidden md:flex flex-col justify-center rounded-sm">
              <span className="font-serif text-3xl text-white mb-4 leading-tight">"A community where tradition meets forward-thinking."</span>
              <span className="text-[#C5A059] text-[10px] font-bold tracking-[0.15em] uppercase">— Dr. Eleanor Vance, Head of School</span>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-start">
            <h2 className="text-[#C5A059] text-[11px] font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#C5A059]" /> Our Philosophy
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.1] text-[#0A192F] mb-8">
              Preparing scholars for a world of complexity.
            </h3>
            <p className="text-base md:text-lg text-[#0A192F]/70 leading-relaxed mb-6 font-light">
              Since our founding, Wellington Preparatory Academy has been dedicated to rigorous intellectual inquiry. We do not simply teach students what to think; we empower them with the analytical tools to determine how to think.
            </p>
            <p className="text-base md:text-lg text-[#0A192F]/70 leading-relaxed mb-10 font-light">
              Our Harkness-style classrooms demand active participation, ensuring that every voice is heard and every assumption is challenged in a supportive, collaborative environment.
            </p>
            <button className="group flex items-center gap-3 text-[11px] font-bold tracking-[0.15em] uppercase text-[#0A192F] hover:text-[#C5A059] transition-colors pb-1 border-b border-[#0A192F]/20 hover:border-[#C5A059]">
              Read the Strategic Plan
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* PILLARS OF EXCELLENCE (GRID) */}
      <section className="bg-gray-50 py-24 md:py-32 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-[#C5A059] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">The Wellington Experience</h2>
            <h3 className="text-4xl md:text-5xl font-serif tracking-tight text-[#0A192F]">A holistic approach to education.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: BookOpen,
                title: "Academics",
                desc: "Over 150 courses, including 24 AP offerings and advanced post-AP seminars designed to challenge our most ambitious scholars.",
                img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop"
              },
              {
                icon: Users,
                title: "Student Life",
                desc: "A vibrant residential and day community with over 60 student-led clubs, fostering leadership, creativity, and civic engagement.",
                img: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=800&auto=format&fit=crop"
              },
              {
                icon: Trophy,
                title: "Athletics",
                desc: "A storied tradition of athletic excellence, teaching resilience, teamwork, and sportsmanship across 22 varsity programs.",
                img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
              }
            ].map((pillar, idx) => (
              <div key={idx} className="group flex flex-col bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-500">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image 
                    src={pillar.img} 
                    alt={pillar.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-[#0A192F]/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-8 lg:p-10 flex flex-col flex-grow relative">
                  <div className="absolute -top-8 left-8 w-16 h-16 bg-white flex items-center justify-center rounded-sm shadow-md text-[#0A192F]">
                    <pillar.icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-2xl font-serif text-[#0A192F] mt-6 mb-4">{pillar.title}</h4>
                  <p className="text-sm text-[#0A192F]/70 leading-relaxed flex-grow font-light">{pillar.desc}</p>
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <button className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#C5A059] flex items-center gap-2 group/btn">
                      Explore {pillar.title}
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSIONS / CTA */}
      <section className="relative py-32 px-6 md:px-12 bg-[#0A192F] text-white overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[#C5A059] hidden lg:block" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0% 100%)' }} />
        
        <div className="max-w-[1600px] mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
          <div className="flex flex-col items-start justify-center">
            <h2 className="text-[#C5A059] text-[11px] font-bold tracking-[0.2em] uppercase mb-6">Admissions</h2>
            <h3 className="text-4xl md:text-6xl font-serif tracking-tight leading-[1.1] mb-8">
              Begin your Wellington journey.
            </h3>
            <p className="text-base md:text-lg text-white/80 leading-relaxed mb-10 max-w-lg font-light">
              We seek intellectually curious students who are eager to contribute to a diverse and dynamic community. Applications for the upcoming academic year are now open.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#C5A059] text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-white hover:text-[#0A192F] transition-colors rounded-sm text-center">
                Apply Now
              </button>
              <button className="px-8 py-4 border border-white/30 text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors rounded-sm text-center">
                Schedule a Visit
              </button>
            </div>
          </div>

          <div className="bg-white text-[#0A192F] p-10 md:p-12 rounded-sm shadow-2xl lg:max-w-md lg:ml-auto w-full border-t-4 border-[#C5A059]">
            <h4 className="text-2xl font-serif mb-8">Key Dates</h4>
            <ul className="space-y-6">
              <li className="flex justify-between items-end border-b border-gray-200 pb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#0A192F]/50 mb-1">Application Deadline</span>
                  <span className="font-medium text-lg">January 15</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#C5A059]" />
              </li>
              <li className="flex justify-between items-end border-b border-gray-200 pb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#0A192F]/50 mb-1">Financial Aid Deadline</span>
                  <span className="font-medium text-lg">February 1</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#C5A059]" />
              </li>
              <li className="flex justify-between items-end border-b border-gray-200 pb-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#0A192F]/50 mb-1">Decisions Released</span>
                  <span className="font-medium text-lg">March 10</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#C5A059]" />
              </li>
            </ul>
            <a href="#" className="inline-block mt-8 text-[11px] font-bold tracking-[0.15em] uppercase text-[#C5A059] hover:text-[#0A192F] transition-colors">
              View Full Calendar &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050D1A] text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white text-[#0A192F] flex items-center justify-center rounded-sm">
                <span className="font-serif text-lg font-bold">W</span>
              </div>
              <span className="text-lg font-bold tracking-tight">Wellington Academy</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-xs font-light">
              Fostering academic excellence and ethical leadership since 1892.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/70 font-light">
              <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-[#C5A059]" /> 1892 Academy Lane, Boston, MA</div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#C5A059]" /> (555) 123-4567</div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#C5A059]" /> admissions@wellington.edu</div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-[#C5A059] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Admissions</h5>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors font-light">How to Apply</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors font-light">Tuition & Financial Aid</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors font-light">Visit Campus</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors font-light">International Students</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors font-light">Request Information</a>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-[#C5A059] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Community</h5>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors font-light">Alumni Network</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors font-light">Parents Association</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors font-light">Giving to Wellington</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors font-light">Careers</a>
            <a href="#" className="text-sm text-white/70 hover:text-white transition-colors font-light">News & Events</a>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-[#C5A059] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Accreditation</h5>
            <p className="text-sm text-white/60 mb-6 font-light">
              Wellington Preparatory Academy is accredited by the New England Association of Schools and Colleges (NEASC).
            </p>
            <div className="w-16 h-16 border border-white/20 flex items-center justify-center rounded-full">
              <GraduationCap className="w-6 h-6 text-white/40" />
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] font-bold tracking-[0.15em] uppercase text-white/40">
          <p>© {new Date().getFullYear()} Wellington Preparatory Academy.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Employment</a>
            <a href="#" className="hover:text-white transition-colors">Directory</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
