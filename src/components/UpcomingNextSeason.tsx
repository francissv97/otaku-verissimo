import { gql, useQuery } from "@apollo/client";
import { UpcomingNextSeasonType } from "../types/handleTypes";
import { Results } from "./Results";
// import { perPage } from "../utils/handleVariablesQueries";

const GET_NEXT_SEASON_POPULAR_QUERY = gql`
  query ($nextSeason: MediaSeason, $nextSeasonYear: Int, $perPage: Int) {
    Page(page: 1, perPage: $perPage) {
      media(
        type: ANIME
        season: $nextSeason
        seasonYear: $nextSeasonYear
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
      <Results title="Populares da próxima temporada" data={data} />
    </div>
  );
}
