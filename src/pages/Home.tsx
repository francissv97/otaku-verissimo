import { useSearchParams } from "react-router-dom";
import {
  currentSeason,
  currentYear,
  nextSeason,
  nextSeasonYear,
} from "../utils/variablesQueries";
import { GET_SEARCH_QUERY } from "../lib/queries";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HeaderResults } from "../components/Header";
import { ResultsList, SmallResultsList } from "../components/ResultsList";
import { MyShadow } from "../components/MyComponents";
import {
  ButtonMoreOptions,
  InputSearch,
  SelectFieldGenres,
} from "../components/SearchFields";

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  // console.log(searchParams.has("search"));
  // searchParams.forEach((item, key) => console.log());
  // console.log(searchParams.keys().next().value);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      <div className="flex gap-4 items-center p-4 max-w-6xl justify-between mx-auto flex-wrap">
        <InputSearch
          searchTerm={searchTerm}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        {/* <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm text-zinc-500">Genres</span>
              <SelectFieldGenres />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm text-zinc-500">Year</span>
              <SelectFieldGenres />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm text-zinc-500">Season</span>
              <SelectFieldGenres />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm text-zinc-500">Format</span>
              <SelectFieldGenres />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm text-zinc-500">Airing Status</span>
              <SelectFieldGenres />
            </div>

            <ButtonMoreOptions />
          </div> */}
      </div>

      <div className="mb-auto flex-1 shadow-xl pb-6">
        {searchTerm.length == 0 ? (
          <>
            <SmallResultsList
              query={GET_SEARCH_QUERY}
              variables={{ perPage: 6, sort: "TRENDING_DESC" }}
            >
              <HeaderResults title="trending now" paramViewAll="trending" />
            </SmallResultsList>

            <MyShadow />

            <SmallResultsList
              query={GET_SEARCH_QUERY}
              variables={{
                season: currentSeason(),
                seasonYear: currentYear(),
                perPage: 6,
                sort: "POPULARITY_DESC",
              }}
            >
              <HeaderResults
                title="popular this season"
                paramViewAll="this-season"
              />
            </SmallResultsList>

            <MyShadow />

            <SmallResultsList
              query={GET_SEARCH_QUERY}
              variables={{
                season: nextSeason(),
                seasonYear: nextSeasonYear(),
                perPage: 6,
                sort: "POPULARITY_DESC",
              }}
            >
              <HeaderResults
                title="upcoming next season"
                paramViewAll="next-season"
              />
            </SmallResultsList>

            <MyShadow />

            <SmallResultsList
              query={GET_SEARCH_QUERY}
              variables={{
                perPage: 6,
                sort: "POPULARITY_DESC",
              }}
            >
              <HeaderResults title="all time popular" paramViewAll="popular" />
            </SmallResultsList>
          </>
        ) : (
          <ResultsList
            query={GET_SEARCH_QUERY}
            variables={{
              perPage: 20,
              page: 1,
              search: searchTerm,
              sort: "POPULARITY_DESC",
              isAdult: false,
            }}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}
