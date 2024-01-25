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

  function handleLoginWithAniList() {
    const popUp = window.open(
      `http://localhost:5174`,
      "AniListAuth",
      "width=500,height=600",
    );

    window.addEventListener("message", (event) => {
      console.log(event.data);
    });
  }

  return (
    <div className="flex min-h-screen flex-col justify-between pb-20 pt-14 md:pb-28">
      <Header hideBackButton />

      {isLocalHost && (
        <>
          <button
            onClick={() => window.parent.postMessage("uma mensagem para você", "*")}
            className="my-4"
          >
            WindowParentPostMessage
          </button>

          <button
            onClick={handleLoginWithAniList}
            className="my-4 text-yellow-300"
          >
            windowAddEventListenerMessage
          </button>
        </>
      )}

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
