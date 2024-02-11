import { useEffect } from "react";
import { GET_ANIME_PAGE_QUERY } from "@/lib/queries/anime-page-query";
// import {
//   currentSeason,
//   currentYear,
//   nextSeason,
//   nextSeasonYear,
// } from "@/utils";
import { HomeListingSection } from "./home-listing-section";
import { HomeHeader } from "./home-header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { seasonUtils as season } from "@/utils/season";

const isLocalHost = location.href.includes("localhost");

export function Home() {
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

  useEffect(() => {
    if (document.title !== "otakuVERISSIMO") document.title = "otakuVERISSIMO";
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-between py-14">
      <HomeHeader hideBackButton />

      {/* {isLocalHost && (
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
      )} */}

      <div className="mb-auto flex-1">
        <HomeListingSection
          title="trending now"
          query={GET_ANIME_PAGE_QUERY}
          variables={{ perPage: 10, sort: "TRENDING_DESC" }}
        />

        <HomeListingSection
          title="popular this season"
          query={GET_ANIME_PAGE_QUERY}
          variables={{
            perPage: 10,
            season: season.getCurrentSeason(),
            seasonYear: season.getCurrentYear(),
            sort: "POPULARITY_DESC",
          }}
        />

        <HomeListingSection
          title="upcoming next season"
          query={GET_ANIME_PAGE_QUERY}
          variables={{
            perPage: 10,
            season: season.getNextSeason(),
            seasonYear: season.getNextYear(),
            sort: "POPULARITY_DESC",
          }}
        />

        <HomeListingSection
          title="all time popular"
          query={GET_ANIME_PAGE_QUERY}
          variables={{ perPage: 10, sort: "POPULARITY_DESC" }}
        />
      </div>

      <BottomNavigation active="/" />
    </div>
  );
}
