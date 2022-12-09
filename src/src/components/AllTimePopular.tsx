import { gql, useQuery } from "@apollo/client";
import { AllTimePopularType } from "../types/handleTypes";
import { Results } from "./Results";

const GET_ALL_TIME_POPULAR_QUERY = gql`
  query ($perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      media(type: ANIME, sort: POPULARITY_DESC) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;

export function AllTimePopular({ perPage }: AllTimePopularType) {
  const { data } = useQuery(GET_ALL_TIME_POPULAR_QUERY, {
    variables: { perPage },
  });

  return <Results title="all time popular" data={data} />;
}
