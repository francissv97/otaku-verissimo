import { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrendingNow } from "./components/TrendingNow";
import { PopularThisSeason } from "./components/PopularThisSeason";
import { UpcomingNextSeason } from "./components/UpcomingNextSeason";
import { AllTimePopular } from "./components/AllTimePopular";

export function AnimeHome() {
  useEffect(() => {
    if (document.title !== "otakuVERISSIMO") document.title = "otakuVERISSIMO";
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header />

      <div className="mb-auto flex-1">
        <TrendingNow />

        <PopularThisSeason />

        <UpcomingNextSeason />

        <AllTimePopular />
      </div>

      <Footer />
    </div>
  );
}
