import { useQuery } from "@apollo/client";
import { SwiperSlide } from "swiper/react";
import { PageMediaResultQuery } from "@/types";
import { GET_ANIME_PAGE_QUERY } from "@/lib/queries/AnimePageQuery";
import { nextSeason, nextSeasonYear } from "@/utils";
import { SwiperSectionHome } from "@/components/SwiperSectionHome";
import { CoverCard } from "@/components/CoverCard";
import { Subtitle } from "@/components/Subtitle";

export function AllTimePopular() {
  const { data, loading } = useQuery(GET_ANIME_PAGE_QUERY, {
    variables: {
      perPage: 10,
      sort: "POPULARITY_DESC",
    },
    notifyOnNetworkStatusChange: true,
  });

  const animes: PageMediaResultQuery[] = data?.Page.media;

  return (
    <div className="mx-auto md:max-w-6xl">
      <div className="mx-auto my-2 flex max-w-6xl items-center justify-between px-4">
        {loading ? (
          <div className="h-6 w-36 animate-pulse rounded-lg bg-zinc-400 px-4" />
        ) : (
          <Subtitle text="all time popular" />
        )}

        {/* <button
        onClick={() => navigate(`/${/anime/?sort=TRENDING_DESC}`)}
        className="uppercase h-fit text-xs hover:text-zinc-600 font-medium duration-100"
      >
        view all
      </button> */}
      </div>

      {loading ? (
        <div className="mx-4 h-72 w-full animate-pulse rounded-lg bg-zinc-400" />
      ) : (
        <SwiperSectionHome>
          {animes?.map((media, index) => (
            <SwiperSlide key={index}>
              <CoverCard anime={media} />
            </SwiperSlide>
          ))}
        </SwiperSectionHome>
      )}
    </div>
  );
}
