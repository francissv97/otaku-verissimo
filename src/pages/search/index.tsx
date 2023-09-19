import { useSearchParams } from "react-router-dom";
import { GET_SEARCH_QUERY } from "@/lib/queries/SearchQuery";
import { Header } from "@/components/Header";
import { InputSearch } from "./components/SearchFields";
import { ResultsList } from "./components/ResultsList";
import girlListeningMusic from "@/assets/girl-listening-music.png";

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  return (
    <>
      <Header hideSearchButton />

      <div className="flex max-w-6xl flex-wrap items-center justify-between gap-4 p-4 pt-20">
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

      {searchTerm ? (
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
      ) : (
        <div className="px-4">
          <img
            src={girlListeningMusic}
            alt="2D girl listeing music."
            className="mx-auto mt-28 aspect-square w-full max-w-[480px] rounded-full object-cover"
          />
        </div>
      )}
    </>
  );
}
