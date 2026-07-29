import { DriverProfileSection } from "@/components/sections/DriverProfile";
import { GarageSection } from "@/components/sections/Garage";
import { HeroSection } from "@/components/sections/Hero";
import { PitStopSection } from "@/components/sections/PitStop";
import { TimingSheetSection } from "@/components/sections/TimingSheet";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <DriverProfileSection />
      <GarageSection />
      <TimingSheetSection />
      <PitStopSection />
    </main>
  );
}
