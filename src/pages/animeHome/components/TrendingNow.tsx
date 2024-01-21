import { useQuery } from "@apollo/client";
import { SwiperSlide } from "swiper/react";
import { CircleNotch } from "phosphor-react";
import { PageMediaResultQuery } from "@/types";
import { GET_ANIME_PAGE_QUERY } from "@/lib/queries/AnimePageQuery";
import { SwiperSectionHome } from "@/components/SwiperSectionHome";
import { CoverCard } from "@/components/CoverCard";
import { Subtitle } from "@/components/Subtitle";

export function TrendingNow() {
  const { data, loading } = useQuery(GET_ANIME_PAGE_QUERY, {
    variables: { perPage: 10, sort: "TRENDING_DESC" },
    notifyOnNetworkStatusChange: true,
  });

  const animes: PageMediaResultQuery[] = data?.Page.media;

  return (
    <div className="mx-auto md:max-w-6xl">
      <div className="mx-auto my-2 flex max-w-6xl items-center justify-between px-4">
        {loading ? (
          <div className="h-7 w-36 animate-pulse rounded-lg bg-zinc-600 px-4" />
        ) : (
          <Subtitle text="trending now" />
        )}

        {/* <button
        onClick={() => navigate(`/${/anime/?sort=TRENDING_DESC}`)}
        className="uppercase h-fit text-xs hover:text-zinc-600 font-medium duration-100"
      >
        view all
      </button> */}
      </div>

      {loading ? (
        <div className="px-4">
          <div className="flex h-72 w-full animate-pulse items-center justify-center rounded-lg bg-zinc-600">
            <CircleNotch size={60} className="absolute animate-spin text-main" />
          </div>
        </div>
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
