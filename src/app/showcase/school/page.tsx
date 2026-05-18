import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  Users,
  ChevronRight,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function SchoolShowcase() {
  return (
    <div className="relative bg-white text-[#1E392A] min-h-screen font-sans selection:bg-[#8A9A5B] selection:text-white">
      {/* NAVIGATION */}
      <nav className="fixed top-12 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#1E392A]/10 transition-all duration-300 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1E392A] text-white flex items-center justify-center rounded-sm">
              <span className="font-serif text-xl font-bold">W</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight leading-none text-[#1E392A]">
                WELLINGTON
              </span>
              <span className="text-[9px] font-semibold tracking-[0.2em] uppercase mt-1 text-[#8A9A5B]">
                Preparatory Academy
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8 text-[11px] font-bold tracking-[0.15em] uppercase text-[#1E392A]">
            <a
              href="#about"
              className="inline-flex min-h-11 items-center hover:text-[#8A9A5B] transition-colors"
            >
              About Us
            </a>
            <a
              href="#academics"
              className="inline-flex min-h-11 items-center hover:text-[#8A9A5B] transition-colors"
            >
              Academics
            </a>
            <a
              href="#admissions"
              className="inline-flex min-h-11 items-center hover:text-[#8A9A5B] transition-colors"
            >
              Admissions
            </a>
            <a
              href="#student-life"
              className="inline-flex min-h-11 items-center hover:text-[#8A9A5B] transition-colors"
            >
              Student Life
            </a>
            <a
              href="#student-life"
              className="inline-flex min-h-11 items-center hover:text-[#8A9A5B] transition-colors"
            >
              Athletics
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a
              href="#community"
              className="hidden min-h-11 items-center border-r border-[#1E392A]/20 pr-4 text-[10px] font-bold uppercase tracking-[0.1em] text-[#1E392A]/60 transition-colors hover:text-[#1E392A] md:inline-flex"
            >
              Parent Portal
            </a>
            <a
              href="#admissions"
              className="inline-flex min-h-11 items-center rounded-sm bg-[#1E392A] px-6 text-[10px] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#8A9A5B]"
            >
              Inquire
            </a>
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
            fetchPriority="high"
            preload
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E392A]/90 via-[#1E392A]/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1600px] mx-auto w-full mt-12 md:mt-0">
          <div className="max-w-4xl">
            <div className="inline-block px-3 py-1 bg-[#8A9A5B] text-white text-[10px] font-bold tracking-[0.2em] uppercase mb-6 rounded-sm">
              Est. 1892
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05] mb-6">
              Cultivating Intellect.
              <br />
              Inspiring Character.
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-8 font-light">
              A premier independent day and boarding school for grades 9-12,
              fostering academic excellence and ethical leadership in the heart
              of New England.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#about"
                className="px-8 py-4 bg-white text-[#1E392A] text-xs font-bold tracking-[0.15em] uppercase hover:bg-[#8A9A5B] hover:text-white transition-colors rounded-sm flex items-center justify-center gap-2 group"
              >
                Discover Wellington
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#student-life"
                className="px-8 py-4 bg-transparent border border-white/30 text-white text-xs font-bold tracking-[0.15em] uppercase hover:bg-white/10 transition-colors rounded-sm text-center"
              >
                Virtual Tour
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATS & HERITAGE */}
      <section
        id="student-life"
        className="bg-[#1E392A] text-white py-16 md:py-24 relative overflow-hidden"
      >
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        ></div>

        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-4 gap-8 md:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          <div className="py-6 md:py-0 flex flex-col items-center justify-center">
            <span className="text-4xl lg:text-6xl font-serif text-[#8A9A5B] mb-2">
              100%
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">
              College Matriculation
            </span>
          </div>
          <div className="py-6 md:py-0 flex flex-col items-center justify-center">
            <span className="text-4xl lg:text-6xl font-serif text-[#8A9A5B] mb-2">
              6:1
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">
              Student-Teacher Ratio
            </span>
          </div>
          <div className="py-6 md:py-0 flex flex-col items-center justify-center">
            <span className="text-4xl lg:text-6xl font-serif text-[#8A9A5B] mb-2">
              45
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">
              States & Countries Represented
            </span>
          </div>
          <div className="py-6 md:py-0 flex flex-col items-center justify-center">
            <span className="text-4xl lg:text-6xl font-serif text-[#8A9A5B] mb-2">
              75+
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/70">
              Varsity & Club Athletics
            </span>
          </div>
        </div>
      </section>

      {/* HEADMASTER'S WELCOME */}
      <section
        id="about"
        className="py-24 md:py-32 px-6 md:px-12 max-w-[1600px] mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative aspect-[3/4] w-full max-w-md mx-auto lg:max-w-full">
            <Image
              src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?q=80&w=1500&auto=format&fit=crop"
              alt="Historic academy library"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover rounded-sm"
            />
            <div className="absolute -bottom-8 -right-8 w-2/3 aspect-[4/3] border-8 border-white bg-[#1E392A] p-8 hidden md:flex flex-col justify-center rounded-sm">
              <span className="font-serif text-3xl text-white mb-4 leading-tight">
                &quot;A community where tradition meets forward-thinking.&quot;
              </span>
              <span className="text-[#8A9A5B] text-[10px] font-bold tracking-[0.15em] uppercase">
                — Dr. Eleanor Vance, Head of School
              </span>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex flex-col items-start">
            <h2 className="text-[#8A9A5B] text-[11px] font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-[#8A9A5B]" /> Our Philosophy
            </h2>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif tracking-tight leading-[1.1] text-[#1E392A] mb-8">
              Preparing scholars for a world of complexity.
            </h3>
            <p className="text-base md:text-lg text-[#1E392A]/70 leading-relaxed mb-6 font-light">
              Since our founding, Wellington Preparatory Academy has been
              dedicated to rigorous intellectual inquiry. We do not simply teach
              students what to think; we empower them with the analytical tools
              to determine how to think.
            </p>
            <p className="text-base md:text-lg text-[#1E392A]/70 leading-relaxed mb-10 font-light">
              Our Harkness-style classrooms demand active participation,
              ensuring that every voice is heard and every assumption is
              challenged in a supportive, collaborative environment.
            </p>
            <a
              href="#academics"
              className="group flex min-h-11 items-center gap-3 border-b border-[#1E392A]/20 text-[11px] font-bold uppercase tracking-[0.15em] text-[#1E392A] transition-colors hover:border-[#8A9A5B] hover:text-[#8A9A5B]"
            >
              Read the Strategic Plan
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* ACADEMIC PROGRAMS (Age-Based, per Case Study) */}
      <section
        id="academics"
        className="bg-gray-50 py-24 md:py-32 px-6 md:px-12"
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <h2 className="text-[#8A9A5B] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
              Academic Programs
            </h2>
            <h3 className="text-4xl md:text-5xl font-serif tracking-tight text-[#1E392A]">
              Structured for developmental excellence.
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: "Early Years",
                subtitle: "Pre-K — Grade 4",
                desc: "Building foundational curiosity, joy in learning, and social-emotional resilience through play-based and structured inquiry.",
                img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
              },
              {
                icon: BookOpen,
                title: "Middle School",
                subtitle: "Grades 5 — 8",
                desc: "Fostering independence, critical thinking, and character development during the pivotal early adolescent years.",
                img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop",
              },
              {
                icon: GraduationCap,
                title: "Upper School",
                subtitle: "Grades 9 — 12",
                desc: "Advanced scholarship, leadership preparation, and rigorous college readiness in a Harkness-driven environment.",
                img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop",
              },
            ].map((pillar, idx) => (
              <div
                key={idx}
                className="group flex flex-col bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-xl transition-shadow duration-500"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={pillar.img}
                    alt={pillar.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-[#1E392A]/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="p-8 lg:p-10 flex flex-col flex-grow relative">
                  <div className="absolute -top-8 left-8 w-16 h-16 bg-white flex items-center justify-center rounded-sm shadow-md text-[#1E392A]">
                    <pillar.icon className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <div className="mt-6 mb-4">
                    <h4 className="text-2xl font-serif text-[#1E392A] mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-[#8A9A5B] text-[10px] font-bold tracking-[0.15em] uppercase">
                      {pillar.subtitle}
                    </p>
                  </div>
                  <p className="text-sm text-[#1E392A]/70 leading-relaxed flex-grow font-light">
                    {pillar.desc}
                  </p>
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <a
                      href="#admissions"
                      className="flex min-h-11 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A9A5B] group/btn"
                    >
                      Explore Curriculum
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSIONS JOURNEY (Case Study Promise: 3-step process) */}
      <section
        id="admissions"
        className="relative py-24 md:py-32 px-6 md:px-12 bg-[#1E392A] text-white overflow-hidden"
      >
        <div className="max-w-[1200px] mx-auto relative z-10 text-center mb-16 md:mb-24">
          <h2 className="text-[#8A9A5B] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
            Admissions
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif tracking-tight leading-[1.1] mb-6">
            Your journey begins here.
          </h3>
          <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto font-light">
            We seek intellectually curious students eager to contribute to our
            community. Follow our clear, three-step admissions process.
          </p>
        </div>

        <div className="max-w-[1200px] mx-auto grid md:grid-cols-3 gap-8 relative z-10">
          {/* Step 1 */}
          <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-sm hover:bg-white/10 transition-colors flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#8A9A5B] text-[#1E392A] font-bold text-xl flex items-center justify-center mb-6">
              1
            </div>
            <h4 className="text-xl font-serif mb-3">Inquire & Discover</h4>
            <p className="text-white/70 text-sm font-light mb-6 flex-grow">
              Submit an inquiry to receive our viewbook and connect with your
              dedicated admissions counselor.
            </p>
            <a
              href="#community"
              className="inline-flex min-h-11 items-center border-b border-[#8A9A5B] text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A9A5B] transition-colors hover:text-white"
            >
              Submit Inquiry
            </a>
          </div>

          {/* Step 2 */}
          <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-sm hover:bg-white/10 transition-colors flex flex-col items-center text-center relative md:-translate-y-4">
            {/* Connecting lines for desktop */}
            <div className="hidden md:block absolute top-14 -left-4 w-8 border-t-2 border-dashed border-[#8A9A5B]/30" />
            <div className="hidden md:block absolute top-14 -right-4 w-8 border-t-2 border-dashed border-[#8A9A5B]/30" />

            <div className="w-12 h-12 rounded-full bg-[#8A9A5B] text-[#1E392A] font-bold text-xl flex items-center justify-center mb-6">
              2
            </div>
            <h4 className="text-xl font-serif mb-3">Visit Campus</h4>
            <p className="text-white/70 text-sm font-light mb-6 flex-grow">
              Experience Wellington firsthand. Schedule a student-led tour and
              an interview with our team.
            </p>
            <a
              href="#community"
              className="inline-flex min-h-11 items-center border-b border-[#8A9A5B] text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A9A5B] transition-colors hover:text-white"
            >
              Schedule Visit
            </a>
          </div>

          {/* Step 3 */}
          <div className="bg-white/5 border border-white/10 p-8 md:p-10 rounded-sm hover:bg-white/10 transition-colors flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#8A9A5B] text-[#1E392A] font-bold text-xl flex items-center justify-center mb-6">
              3
            </div>
            <h4 className="text-xl font-serif mb-3">Apply</h4>
            <p className="text-white/70 text-sm font-light mb-6 flex-grow">
              Complete your application, including transcripts, recommendations,
              and standardized test scores.
            </p>
            <a
              href="#community"
              className="inline-flex min-h-11 items-center border-b border-[#8A9A5B] text-[10px] font-bold uppercase tracking-[0.15em] text-[#8A9A5B] transition-colors hover:text-white"
            >
              Start Application
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="community"
        className="bg-[#0F2218] text-white pt-24 pb-12 px-6 md:px-12 border-t border-white/10"
      >
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white text-[#1E392A] flex items-center justify-center rounded-sm">
                <span className="font-serif text-lg font-bold">W</span>
              </div>
              <span className="text-lg font-bold tracking-tight">
                Wellington Academy
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-xs font-light">
              Fostering academic excellence and ethical leadership since 1892.
            </p>
            <div className="flex flex-col gap-3 text-sm text-white/70 font-light">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#8A9A5B]" /> 1892 Academy Lane,
                Boston, MA
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#8A9A5B]" /> (555) 123-4567
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#8A9A5B]" />{" "}
                admissions@wellington.edu
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-[#8A9A5B] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              Admissions
            </h5>
            <a
              href="#admissions"
              className="inline-flex min-h-11 items-center text-sm font-light text-white/70 transition-colors hover:text-white"
            >
              How to Apply
            </a>
            <a
              href="#admissions"
              className="inline-flex min-h-11 items-center text-sm font-light text-white/70 transition-colors hover:text-white"
            >
              Tuition & Financial Aid
            </a>
            <a
              href="#admissions"
              className="inline-flex min-h-11 items-center text-sm font-light text-white/70 transition-colors hover:text-white"
            >
              Visit Campus
            </a>
            <a
              href="#admissions"
              className="inline-flex min-h-11 items-center text-sm font-light text-white/70 transition-colors hover:text-white"
            >
              International Students
            </a>
            <a
              href="#community"
              className="inline-flex min-h-11 items-center text-sm font-light text-white/70 transition-colors hover:text-white"
            >
              Request Information
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-[#8A9A5B] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              Community
            </h5>
            <a
              href="#community"
              className="inline-flex min-h-11 items-center text-sm font-light text-white/70 transition-colors hover:text-white"
            >
              Alumni Network
            </a>
            <a
              href="#community"
              className="inline-flex min-h-11 items-center text-sm font-light text-white/70 transition-colors hover:text-white"
            >
              Parents Association
            </a>
            <a
              href="#community"
              className="inline-flex min-h-11 items-center text-sm font-light text-white/70 transition-colors hover:text-white"
            >
              Giving to Wellington
            </a>
            <a
              href="#community"
              className="inline-flex min-h-11 items-center text-sm font-light text-white/70 transition-colors hover:text-white"
            >
              Careers
            </a>
            <a
              href="#student-life"
              className="inline-flex min-h-11 items-center text-sm font-light text-white/70 transition-colors hover:text-white"
            >
              News & Events
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <h5 className="text-[#8A9A5B] text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              Accreditation
            </h5>
            <p className="text-sm text-white/60 mb-6 font-light">
              Wellington Preparatory Academy is accredited by the New England
              Association of Schools and Colleges (NEASC).
            </p>
            <div className="w-16 h-16 border border-white/20 flex items-center justify-center rounded-full">
              <GraduationCap className="w-6 h-6 text-white/40" />
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-[10px] font-bold tracking-[0.15em] uppercase text-white/40">
          <p>© {new Date().getFullYear()} Wellington Preparatory Academy.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="/privacy"
              className="inline-flex min-h-11 items-center transition-colors hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#community"
              className="inline-flex min-h-11 items-center transition-colors hover:text-white"
            >
              Employment
            </a>
            <a
              href="#community"
              className="inline-flex min-h-11 items-center transition-colors hover:text-white"
            >
              Directory
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
