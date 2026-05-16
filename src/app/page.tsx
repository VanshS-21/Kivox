import { HomeContact } from "@/components/sections/HomeContact";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomePOV } from "@/components/sections/HomePOV";
import { HomeProcess } from "@/components/sections/HomeProcess";
import { HomeProofBand } from "@/components/sections/HomeProofBand";
import { HomeServices } from "@/components/sections/HomeServices";
import { HomeTeam } from "@/components/sections/HomeTeam";
import { HomeWorkPreview } from "@/components/sections/HomeWorkPreview";

export default function Home() {
  return (
    <>
      <HomeHero />
      <div id="live-examples" className="scroll-mt-24">
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
        <HomePOV />
      </div>
      <div className="cv-auto">
        <HomeProcess />
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
