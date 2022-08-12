import { gql, useQuery } from "@apollo/client";
import { PopularThisSeasonType } from "../types/handleTypes";
import { Results } from "./Results";

const GET_POPULAR_THIS_SEASON_QUERY = gql`
  query ($currentYear: Int, $currentSeason: MediaSeason, $perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      media(
        type: ANIME
        seasonYear: $currentYear
        season: $currentSeason
        sort: POPULARITY_DESC
      ) {
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

export function PopularThisSeason({
  currentSeason,
  currentYear,
  perPage,
}: PopularThisSeasonType) {
  const { data } = useQuery(GET_POPULAR_THIS_SEASON_QUERY, {
    variables: { currentYear, currentSeason, perPage },
  });

  return <Results title="Popular this season" data={data} />;
}
