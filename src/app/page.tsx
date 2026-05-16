import { HomeContact } from "@/components/sections/HomeContact";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomePOV } from "@/components/sections/HomePOV";
import { HomeProcess } from "@/components/sections/HomeProcess";
import { HomeProofBand } from "@/components/sections/HomeProofBand";
import { HomeServices } from "@/components/sections/HomeServices";
import { HomeTeam } from "@/components/sections/HomeTeam";
import { HomeWorkPreview } from "@/components/sections/HomeWorkPreview";
import { HomeProjectBand } from "@/components/sections/HomeProjectBand";
import { HomeTestimonials } from "@/components/sections/HomeTestimonials";
import { HomeFAQ } from "@/components/sections/HomeFAQ";

export default function Home() {
  return (
    <>
      <HomeHero />
      <div className="cv-auto">
        <HomeProjectBand />
      </div>
      <div id="live-examples" className="scroll-mt-24 cv-auto">
        <div className="xl:hidden">
          <HomeProofBand />
        </div>
        <div className="hidden xl:block">
          <HomeWorkPreview />
        </div>
      </div>
      <div className="cv-auto">
        <HomeServices />
      </div>
      <div className="cv-auto">
        <HomeTestimonials />
      </div>
      <div className="cv-auto">
        <HomePOV />
      </div>
      <div className="cv-auto">
        <HomeProcess />
      </div>
      <div className="cv-auto">
        <HomeFAQ />
      </div>
      <div className="cv-auto">
        <HomeTeam />
      </div>
      <div className="cv-auto">
        <HomeContact />
      </div>
    </>
  );
}
