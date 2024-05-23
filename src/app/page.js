import Facilities from "@/components/Facilities";
import HomePageHero from "@/components/HomePageHero";

export default function Home() {
  return (
    <div className="min-h-screen  w-full">
      <HomePageHero />
      <Facilities/>
    </div>
  );
}
