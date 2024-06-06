import Facilities from "@/app/(notAdmin)/components/Facilities";
import FeaturedVilla from "@/app/(notAdmin)/components/FeaturedVilla";
import HomePageHero from "@/app/(notAdmin)/components/HomePageHero";
import SpaResort from "@/app/(notAdmin)/components/SpaResort";
import Header from "./(notAdmin)/components/Header";
import Footer from "./(notAdmin)/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen  w-full">
      <Header/>
      <HomePageHero />
      <Facilities />
      <SpaResort />
      <FeaturedVilla />
      <Footer/>
    </div>
  );
}
