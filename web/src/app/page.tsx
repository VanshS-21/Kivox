import { HomeContact } from "@/components/sections/HomeContact";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomeMarquee } from "@/components/sections/HomeMarquee";
import { HomePOV } from "@/components/sections/HomePOV";
import { HomeProcess } from "@/components/sections/HomeProcess";
import { HomeServices } from "@/components/sections/HomeServices";
import { HomeTeam } from "@/components/sections/HomeTeam";
import { HomeWorkPreview } from "@/components/sections/HomeWorkPreview";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeMarquee />
      <HomeWorkPreview />
      <HomeServices />
      <HomePOV />
      <HomeProcess />
      <HomeTeam />
      <HomeContact />
    </>
  );
}
