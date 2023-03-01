import {
  currentSeason,
  currentYear,
  nextSeason,
  nextSeasonYear,
} from "../utils/variablesQueries";
import {
  GET_ALL_TIME_POPULAR_QUERY,
  GET_NEXT_SEASON_POPULAR_QUERY,
  GET_POPULAR_THIS_SEASON_QUERY,
  GET_TRENDING_NOW_QUERY,
} from "../lib/queries";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HeaderResults } from "../components/HeaderResults";
import { SmallResultsList } from "../components/SmallResultsList";
import { MyShadow } from "../components/MyComponents";
import { MagnifyingGlass } from "phosphor-react";

export function Home() {
  function InputExmeplo() {
    return (
      <div className="flex flex-col gap-2">
        <span className="font-medium text-zinc-500">Search</span>
        <div className="flex gap-2 items-center bg-zinc-50 rounded shadow-zinc-300 shadow-lg py-1 px-2">
          <MagnifyingGlass size={22} className="text-zinc-400" />
          <input
            type="text"
            className="w-full text-xl text-zinc-600 outline-none caret-main/70 caert bg-transparent"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      {/* SEARCH FIELDS */}
      <div className="flex gap-4 items-center px-2 py-4 max-w-6xl mx-auto">
        {/* <InputExmeplo /> */}
        {/* <InputExmeplo /> */}
        {/* <InputExmeplo />
        <InputExmeplo />
        <InputExmeplo />
        <InputExmeplo /> */}
      </div>

      <div className="mb-auto">
        <SmallResultsList
          query={GET_TRENDING_NOW_QUERY}
          variables={{ perPage: 6 }}
        >
          <HeaderResults title="trending now" paramViewAll="trending" />
        </SmallResultsList>

        <MyShadow />

        <SmallResultsList
          query={GET_POPULAR_THIS_SEASON_QUERY}
          variables={{
            currentSeason: currentSeason(),
            currentYear: currentYear(),
            perPage: 6,
          }}
        >
          <HeaderResults
            title="popular this season"
            paramViewAll="this-season"
          />
        </SmallResultsList>

        <MyShadow />

        <SmallResultsList
          query={GET_NEXT_SEASON_POPULAR_QUERY}
          variables={{
            nextSeason: nextSeason(),
            nextSeasonYear: nextSeasonYear(),
            perPage: 6,
          }}
        >
          <HeaderResults
            title="upcoming next season"
            paramViewAll="next-season"
          />
        </SmallResultsList>

        <MyShadow />

        <SmallResultsList
          query={GET_ALL_TIME_POPULAR_QUERY}
          variables={{
            perPage: 6,
          }}
        >
          <HeaderResults title="all time popular" paramViewAll="popular" />
        </SmallResultsList>

        <MyShadow />
      </div>

      <Footer />
    </div>
  );
}
