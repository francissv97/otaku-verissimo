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
import { MyDivider, MyShadow } from "../components/MyComponents";

export function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Header />

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
