import { useQuery } from "@apollo/client";
import { GET_ALL_TIME_POPULAR_QUERY } from "../lib/queries";
import { AllTimePopularType } from "../types";
import { SectionResults } from "./SectionResults";

export function AllTimePopular({ perPage }: AllTimePopularType) {
  const { data } = useQuery(GET_ALL_TIME_POPULAR_QUERY, {
    variables: { perPage },
  });

  return (
    <SectionResults
      title="all time popular"
      navigateParamViewAll="popular"
      data={data}
    />
  );
}
