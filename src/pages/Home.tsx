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
import { QueryComponent } from "../components/QueryComponent";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

      <div className="mb-auto">
        <QueryComponent query={GET_TRENDING_NOW_QUERY} perPage={6}>
          <HeaderResults title="trending now" paramViewAll="trending" />
        </QueryComponent>

        <QueryComponent
          query={GET_POPULAR_THIS_SEASON_QUERY}
          currentSeason={currentSeason()}
          currentYear={currentYear()}
          perPage={6}
        >
          <HeaderResults
            title="popular this season"
            paramViewAll="this-season"
          />
        </QueryComponent>

        <QueryComponent
          query={GET_NEXT_SEASON_POPULAR_QUERY}
          nextSeason={nextSeason()}
          nextSeasonYear={nextSeasonYear()}
          perPage={6}
        >
          <HeaderResults
            title="upcoming next season"
            paramViewAll="next-season"
          />
        </QueryComponent>

        <QueryComponent query={GET_ALL_TIME_POPULAR_QUERY} perPage={6}>
          <HeaderResults title="all time popular" paramViewAll="popular" />
        </QueryComponent>
      </div>

      <Footer />
    </div>
  );
}
