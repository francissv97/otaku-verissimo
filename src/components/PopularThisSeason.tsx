import { useQuery } from "@apollo/client";
import { GET_POPULAR_THIS_SEASON_QUERY } from "../lib/queries";
import { PopularThisSeasonType } from "../types";
import { SectionResults } from "./SectionResults";

export function PopularThisSeason({
  currentSeason,
  currentYear,
  perPage,
}: PopularThisSeasonType) {
  const { data } = useQuery(GET_POPULAR_THIS_SEASON_QUERY, {
    variables: { currentYear, currentSeason, perPage },
  });

  return (
    <SectionResults
      title="Popular this season"
      navigateParamViewAll="popular"
      data={data}
    />
  );
}
