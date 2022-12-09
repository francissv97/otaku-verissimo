import { Header } from "../components/Header";
import { TrendingNow } from "../components/TrendingNow";
import { PopularThisSeason } from "../components/PopularThisSeason";
import { UpcomingNextSeason } from "../components/UpcomingNextSeason";
import { AllTimePopular } from "../components/AllTimePopular";
import { Footer } from "../components/Footer";
import {
  currentSeason,
  currentYear,
  nextSeason,
  nextSeasonYear,
  perPage,
} from "../utils/handleVariablesQueries";

export function Home() {
  return (
    <>
      <Header />
      <>
        <TrendingNow perPage={perPage} />
        <PopularThisSeason
          currentSeason={currentSeason()}
          currentYear={currentYear()}
          perPage={perPage}
        />
        <UpcomingNextSeason
          nextSeason={nextSeason()}
          nextSeasonYear={nextSeasonYear()}
          perPage={perPage}
        />
        <AllTimePopular perPage={perPage} />
      </>
      <Footer />
    </>
  );
}
