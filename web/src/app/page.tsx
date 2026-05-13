import { HomeContact } from "@/components/sections/HomeContact";
import { HomeHero } from "@/components/sections/HomeHero";
import { HomePOV } from "@/components/sections/HomePOV";
import { HomeProcess } from "@/components/sections/HomeProcess";
import { HomeServices } from "@/components/sections/HomeServices";
import { HomeWorkPreview } from "@/components/sections/HomeWorkPreview";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeWorkPreview />
      <HomeServices />
      <HomePOV />
      <HomeProcess />
      <HomeContact />
    </>
  );
}
