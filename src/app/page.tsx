import { CinematicBreak } from "@/components/sections/CinematicBreak";
import { HomeContact } from "@/components/sections/HomeContact";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeMarquee } from "@/components/sections/HomeMarquee";
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
      <HomeProofBand />
      <HomeMarquee />
      <div className="cv-auto">
        <HomeWorkPreview />
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
        <CinematicBreak />
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
