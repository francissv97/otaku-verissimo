import { useQuery } from "@apollo/client";
import { GET_NEXT_SEASON_POPULAR_QUERY } from "../lib/queries";
import { UpcomingNextSeasonType } from "../types";
import { SectionResults } from "./SectionResults";

export function UpcomingNextSeason({
  nextSeason,
  nextSeasonYear,
  perPage,
}: UpcomingNextSeasonType) {
  const { data } = useQuery(GET_NEXT_SEASON_POPULAR_QUERY, {
    variables: { nextSeason, nextSeasonYear, perPage },
  });

  return (
    <div>
      <SectionResults
        title="upcoming next season"
        navigateParamViewAll="next-season"
        data={data}
      />
    </div>
  );
}
