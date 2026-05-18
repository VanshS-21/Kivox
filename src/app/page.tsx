import dynamic from "next/dynamic";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeProjectBand } from "@/components/sections/HomeProjectBand";
import { HomeProofBand } from "@/components/sections/HomeProofBand";
import { HomeTeam } from "@/components/sections/HomeTeam";
import { HomeWorkPreview } from "@/components/sections/HomeWorkPreview";
import { LazySection } from "@/components/ui/LazySection";

const HomeServices = dynamic(() =>
  import("@/components/sections/HomeServices").then((mod) => mod.HomeServices),
);
const HomeTestimonials = dynamic(() =>
  import("@/components/sections/HomeTestimonials").then(
    (mod) => mod.HomeTestimonials,
  ),
);
const HomePOV = dynamic(() =>
  import("@/components/sections/HomePOV").then((mod) => mod.HomePOV),
);
const HomeProcess = dynamic(() =>
  import("@/components/sections/HomeProcess").then((mod) => mod.HomeProcess),
);
const HomeFAQ = dynamic(() =>
  import("@/components/sections/HomeFAQ").then((mod) => mod.HomeFAQ),
);
const HomeContact = dynamic(() =>
  import("@/components/sections/HomeContact").then((mod) => mod.HomeContact),
);

export default function Home() {
  return (
    <>
      <HomeHero />
      <div className="cv-auto">
        <HomeProjectBand />
      </div>
      <LazySection rootMargin="0px">
        <div id="live-examples" className="scroll-mt-24 cv-auto">
          <div className="xl:hidden">
            <HomeProofBand />
          </div>
          <div className="hidden xl:block">
            <HomeWorkPreview />
          </div>
        </div>
      </LazySection>
      <LazySection rootMargin="0px">
        <div id="services" className="scroll-mt-24 cv-auto">
          <HomeServices />
        </div>
      </LazySection>
      <LazySection rootMargin="0px">
        <div id="process" className="scroll-mt-24 cv-auto">
          <HomeProcess />
        </div>
      </LazySection>
      <LazySection rootMargin="0px">
        <div className="cv-auto">
          <HomePOV />
        </div>
      </LazySection>
      <LazySection rootMargin="0px">
        <div className="cv-auto">
          <HomeTestimonials />
        </div>
      </LazySection>
      <LazySection rootMargin="0px">
        <div className="cv-auto">
          <HomeFAQ />
        </div>
      </LazySection>
      <HomeTeam />
      <LazySection rootMargin="0px">
        <div id="contact" className="scroll-mt-24 cv-auto">
          <HomeContact />
        </div>
      </LazySection>
    </>
  );
}
