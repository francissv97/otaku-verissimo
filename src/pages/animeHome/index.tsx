import { useEffect } from "react";
import { Header } from "@/components/Header";
import { TrendingNow } from "./components/TrendingNow";
import { PopularThisSeason } from "./components/PopularThisSeason";
import { UpcomingNextSeason } from "./components/UpcomingNextSeason";
import { MenuBottom } from "./components/MenuBottom";

const isLocalHost = location.href.includes("localhost");

export function AnimeHome() {
  useEffect(() => {
    if (document.title !== "otakuVERISSIMO") document.title = "otakuVERISSIMO";
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-between pb-20 pt-14 md:pb-28">
      <Header hideBackButton />

      <div className="mb-auto flex-1">
        <TrendingNow />

        {!isLocalHost && (
          <>
            <PopularThisSeason />
            <UpcomingNextSeason />
          </>
        )}
      </div>

      <MenuBottom />
    </div>
  );
}
