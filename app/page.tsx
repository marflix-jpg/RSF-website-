import Nav from "@/components/ui/Nav";
import Hero from "@/components/sections/Hero";
import Reframe from "@/components/sections/Reframe";
import MeetRahul from "@/components/sections/MeetRahul";
import Who from "@/components/sections/WhoArc";
import Method from "@/components/sections/Method";
import Diagnostic from "@/components/sections/Diagnostic";
import Checkins from "@/components/sections/Checkins";
import Packages from "@/components/sections/Packages";
import Results from "@/components/sections/Results";
import Reviews from "@/components/sections/Reviews";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Reframe />
        <MeetRahul />
        <Who />
        <Method />
        <Diagnostic />
        <Checkins />
        <Results />
        <Packages />
        <Reviews />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
