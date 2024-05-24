import Facilities from "@/components/Facilities";
import FeaturedVilla from "@/components/FeaturedVilla";
import HomePageHero from "@/components/HomePageHero";
import SpaResort from "@/components/SpaResort";

export default function Home() {
  return (
    <div className="min-h-screen  w-full">
      <HomePageHero />
      <Facilities />
      <SpaResort />
      <FeaturedVilla/>
    </div>
  );
}
