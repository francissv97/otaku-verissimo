import { useSearchParams } from "react-router-dom";
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
  GET_SEARCH_QUERY,
  GET_TRENDING_NOW_QUERY,
} from "../lib/queries";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { HeaderResults } from "../components/Header";
import { ResultsList, SmallResultsList } from "../components/ResultsList";
import { MyShadow } from "../components/MyComponents";
import { InputSearch } from "../components/SearchFields";

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("search") || "";

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />

        <div className="flex gap-4 items-center p-4 max-w-6xl justify-center mx-auto flex-wrap">
          <InputSearch
            searchTerm={searchTerm}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />

          {/* <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-500">Genres</span>
            <SelectFieldGenres />
          </div> */}

          {/* <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-500">Year</span>
            <SelectFieldGenres />
          </div> */}

          {/* <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-500">Season</span>
            <SelectFieldGenres />
          </div> */}

          {/* <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-500">Format</span>
            <SelectFieldGenres />
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-medium text-zinc-500">Airing Status</span>
            <SelectFieldGenres />
          </div> */}
        </div>
      </div>

      <div className="mb-auto flex-1 shadow-xl pb-6">
        {searchTerm.length == 0 ? (
          <>
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
