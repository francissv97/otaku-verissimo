import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrendingNow } from "./components/TrendingNow";
import { PopularThisSeason } from "./components/PopularThisSeason";
import { UpcomingNextSeason } from "./components/UpcomingNextSeason";

/**
 * 1: Verificar se anilist_code está na url.
 * 1.1: salvar código na LocalStorage
 *  */

/**
 * 2: Caso não esteja, verifcar se token está salvo no localstorage
 *  */

export function AnimeHome() {
  function hasTokenURL() {
    const currentUrl = window.location.href;

    if (currentUrl.includes("#access_token=")) {
      const accessToken = currentUrl.split("#access_token=")[1].split("&")[0];

      localStorage.setItem("access_token", accessToken);

      const cleanUrl = currentUrl.split("#")[0];
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }

  function getAccessTokenLocalStorage() {
    const token = localStorage.getItem("access_token");

    if (token) return token;

    return null;
  }

  useEffect(() => {
    if (document.title !== "otakuVERISSIMO") document.title = "otakuVERISSIMO";

    hasTokenURL();
  }, []);

  return (
    <>
      <div className="flex min-h-screen flex-col justify-between pt-20">
        <Header hideBackButton />

        {!getAccessTokenLocalStorage() && (
          <Link
            className="ml-auto p-4 font-bold text-main invert"
            to={`https://anilist.co/api/v2/oauth/authorize?client_id=${
              import.meta.env.VITE_ID_CLIENT
            }&response_type=token`}
          >
            Login with AniList
          </Link>
        )}

        <div className="mb-auto flex-1">
          <TrendingNow />
          <PopularThisSeason />
          <UpcomingNextSeason />
        </div>
      </div>

      <Footer />
    </>
  );
}
