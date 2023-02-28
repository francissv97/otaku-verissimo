import { ArrowLeft, House } from "phosphor-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { MyShadow } from "../components/MyComponents";
import { ResultsList } from "../components/ResultsList";
import {
  GET_ALL_TIME_POPULAR_QUERY,
  GET_NEXT_SEASON_POPULAR_QUERY,
  GET_POPULAR_THIS_SEASON_QUERY,
  GET_TRENDING_NOW_QUERY,
} from "../lib/queries";
import { ViewAllParams } from "../types";
import {
  currentSeason,
  currentYear,
  nextSeason,
  nextSeasonYear,
} from "../utils/variablesQueries";

export function ViewAll() {
  const pathname = useLocation().pathname.replace("/", "") as ViewAllParams;
  const navigate = useNavigate();

  function handleSwitch() {
    switch (pathname) {
      case "trending":
        return (
          <ResultsList
            query={GET_TRENDING_NOW_QUERY}
            variables={{ perPage: 20, page: 1 }}
          />
        );
      case "popular":
        return (
          <ResultsList
            query={GET_ALL_TIME_POPULAR_QUERY}
            variables={{ perPage: 20, page: 1 }}
          />
        );
      case "next-season":
        return (
          <ResultsList
            query={GET_NEXT_SEASON_POPULAR_QUERY}
            variables={{
              perPage: 20,
              page: 1,
              nextSeason: nextSeason(),
              nextSeasonYear: nextSeasonYear(),
            }}
          />
        );
      case "this-season":
        return (
          <ResultsList
            query={GET_POPULAR_THIS_SEASON_QUERY}
            variables={{
              perPage: 20,
              page: 1,
              currentSeason: currentSeason(),
              currentYear: currentYear(),
            }}
          />
        );
    }
  }

  useEffect(() => scrollTo({ top: 0, behavior: "smooth" }), []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      <main className="mb-auto">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex gap-2 items-center border border-main text-main mx-2 mt-4 px-2 rounded uppercase hover:bg-main/20 transition"
          >
            <ArrowLeft size={22} className="text-main" weight="light" />
            go back to home
            <House size={22} className="text-main" weight="light" />
          </button>
        </div>
        {handleSwitch()}
      </main>

      <MyShadow />

      <Footer />
    </div>
  );
}

// import { useSearchParams } from 'react-router-dom'

// const Component = () => {
//     const [searchParams, setSearchParams] = useSearchParams()

//     return (
//         <div>Tutorial: {searchParams.get('tutorial')}</div>
//     )
// }
