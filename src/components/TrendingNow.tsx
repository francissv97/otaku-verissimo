import { gql, useQuery } from "@apollo/client";
import { GET_TRENDING_NOW_QUERY } from "../lib/queries";
import { TrendingNowType } from "../types";
import { SectionResults } from "./SectionResults";

export function TrendingNow({ perPage }: TrendingNowType) {
  const { data } = useQuery(GET_TRENDING_NOW_QUERY, {
    variables: { perPage },
  });

  return (
    <SectionResults
      title="trending now"
      navigateParamViewAll="trending"
      data={data}
    />
  );
}
