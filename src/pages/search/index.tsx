import { useSearchParams } from "react-router-dom";
import { InputSearch } from "./components/SearchFields";
import { ResultsList } from "./components/ResultsList";
import { GET_SEARCH_QUERY } from "@/lib/queries/SearchQuery";

export function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  return (
    <div>
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

      {searchTerm && (
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
  );
}
