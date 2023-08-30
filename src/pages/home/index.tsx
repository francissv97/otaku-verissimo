import { useSearchParams } from "react-router-dom";
import { currentSeason, currentYear, nextSeason, nextSeasonYear } from "../../utils";
import { GET_SEARCH_QUERY } from "../../lib/queries";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { HeaderResults } from "../../components/Header";
import { ResultsList, SmallResultsList } from "../../components/ResultsList";
import { ButtonMoreOptions, InputSearch, SelectFieldGenres } from "../../components/SearchFields";
import { useEffect } from "react";

export function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const perPage = 10;

  // console.log(searchParams.has("search"));
  // searchParams.forEach((item, key) => console.log());
  // console.log(searchParams.keys().next().value);

  useEffect(() => {
    if (document.title !== "otakuVERISSIMO") document.title = "otakuVERISSIMO";
  }, []);

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Header />

      <div className="flex max-w-6xl flex-wrap items-center justify-between gap-4 p-4">
        <InputSearch
          searchTerm={searchTerm}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        {/* <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm">Genres</span>
              <SelectFieldGenres />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm">Year</span>
              <SelectFieldGenres />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm">Season</span>
              <SelectFieldGenres />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm">Format</span>
              <SelectFieldGenres />
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-medium text-sm">Airing Status</span>
              <SelectFieldGenres />
            </div>

            <ButtonMoreOptions />
          </div> */}
      </div>

      <div className="mb-auto flex-1">
        {searchTerm.length == 0 ? (
          <>
            <SmallResultsList query={GET_SEARCH_QUERY} variables={{ perPage, sort: "TRENDING_DESC" }}>
              <HeaderResults title="trending now" paramViewAll="trending" />
            </SmallResultsList>

            <SmallResultsList
              query={GET_SEARCH_QUERY}
              variables={{
                season: currentSeason(),
                seasonYear: currentYear(),
                perPage: 6,
                sort: "POPULARITY_DESC",
              }}
            >
              <HeaderResults title="popular this season" paramViewAll="this-season" />
            </SmallResultsList>

            <SmallResultsList
              query={GET_SEARCH_QUERY}
              variables={{
                season: nextSeason(),
                seasonYear: nextSeasonYear(),
                perPage: 6,
                sort: "POPULARITY_DESC",
              }}
            >
              <HeaderResults title="upcoming next season" paramViewAll="next-season" />
            </SmallResultsList>

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
