import { gql, useQuery } from "@apollo/client";
import { TrendingNowType } from "../types/handleTypes";
import { Results } from "./Results";

const GET_TRENDING_NOW_QUERY = gql`
  query ($perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      media(type: ANIME, sort: TRENDING_DESC) {
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

export function TrendingNow({ perPage }: TrendingNowType) {
  const { data } = useQuery(GET_TRENDING_NOW_QUERY, {
    variables: { perPage },
  });

  return <Results title="Tendências do momento" data={data} />;
}
