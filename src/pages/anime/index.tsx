import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Slide } from "@mui/material";
import { SwiperSlide } from "swiper/react";
import { Heart, Star } from "phosphor-react";
import {
  GET_ANIME_CHARACTERS_PAGINATION,
  GET_ANIME_MEDIA_QUERY,
  GET_ANIME_STAFF_PAGINATION,
} from "@/lib/queries/AnimeMediaQuery";
import { formatDateToString } from "@/utils";
import { AnimeMedia } from "@/types";
import { NotFound } from "@/components/NotFound";
import { Footer } from "@/components/Footer";
import { CollapseParagraph } from "@/components/CollapseParagraph";
import { CircularLoading } from "@/components/Loading";
import { Subtitle } from "@/components/Subtitle";
import { Recommendations } from "./components/Recommendations";
import { Relations } from "./components/Relations";
import { Tags } from "./components/Tags";
import { CharactersContent } from "./components/CharactersContent";
import { StaffContent } from "./components/StaffContent";
import { SwiperHorizontal } from "@/components/SwiperHorizontal";
import { TitleCopyToClipboard } from "./components/TitleCopyToClipboard";
import { isContrastColorWithSiteBackgroundAppropriate } from "@/utils/isContrastColorWithSiteBackgroundAppropriate";
import { CaretLeft } from "@phosphor-icons/react";

export function Anime() {
  /**
   * Trabalharemos nisso em breve:
   * o estado "isLoading" está sendo usando apenas para mostrar um
   * loading durante a páginação, fetchMore do graphql, dos conteúdos de staff
   * e character. Seria interessante alcançar este efeito sem utilizar um estado
   * no componente pai.
   *  */
  const [isLoading, setIsLoading] = useState(false);
  const [anime, setAnime] = useState<AnimeMedia>();
  const [pageContent, setPageContent] = useState<"overview" | "characters" | "staff">("overview");
  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const { error, fetchMore, loading } = useQuery(GET_ANIME_MEDIA_QUERY, {
    variables: { id: id },
    notifyOnNetworkStatusChange: true,
    onError: () => {
      setIsLoading(false);
    },
    onCompleted: (data) => {
      setAnime(data.Media);
      setIsLoading(false);

      document.title = `${data.Media.title.romaji} ${
        data.Media.title.english != null && data.Media.title.english != data.Media.title.romaji
          ? ` (${data.Media.title.english})`
          : ""
      } · otakuVERISSIMO`;
    },
  });

  useEffect(() => {
    if (location.hostname != "localhost" && window.scrollY <= document.body.scrollHeight)
      scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (error && error.graphQLErrors.some((g) => g.message == "Not Found.")) {
    return <NotFound />;
  }

  return (
    <div className="flex min-h-screen flex-col justify-between">
      {loading && <CircularLoading />}

      {error && (
        <div className="m-auto flex flex-col p-4 shadow-xl">
          <strong>{error.name}</strong>
          <span>{error.message}</span>
        </div>
      )}

      {anime && (
        <>
          <div className="fixed top-0 left-0 right-0 z-20 w-full">
            <div className="max-w-6xl w-full mx-auto">
              <div
                className="w-16 cursor-pointer h-16 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full"
                onClick={() => navigate(-1)}
              >
                <CaretLeft size={24} className="text-white" />
              </div>
            </div>
          </div>

          {anime.bannerImage ? (
            <div className="bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500">
              {loading ? (
                <div className="h-80 w-full bg-main md:h-96" />
              ) : (
                <div className="relative">
                  <img
                    src={anime.bannerImage}
                    className="h-80 w-full object-cover object-center md:h-96"
                    alt="anime banner image"
                    loading="lazy"
                    style={{
                      opacity: 0,
                      transitionDuration: "1000ms",
                    }}
                    onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                  />

                  <div className="absolute bottom-0 h-full w-full bg-gradient-to-r from-zinc-800 via-zinc-800/20 to-transparent md:w-[60%] md:via-zinc-800/70" />
                </div>
              )}
            </div>
          ) : (
            <div className="h-20 w-full bg-gradient-to-t from-zinc-800 via-zinc-700 to-zinc-600 md:h-20" />
          )}

          <div className="mb-auto">
            <div className="mx-auto flex max-w-6xl flex-col gap-y-2 py-4 md:flex-row">
              <div className="flex flex-col gap-2 px-4">
                <div
                  id="anime_cover"
                  className={`z-10 w-fit place-self-center overflow-hidden rounded-lg bg-gradient-to-t from-orange-700 via-orange-600 to-orange-600 shadow-lg ${
                    anime.bannerImage && "-mt-40 md:-mt-36"
                  }`}
                >
                  {loading ? (
                    <div className="h-full w-full bg-main" />
                  ) : (
                    <img
                      src={anime.coverImage.large}
                      alt={anime.title.romaji}
                      className="h-full w-full"
                      loading="lazy"
                      style={{
                        opacity: 0,
                        transitionDuration: "800ms",
                      }}
                      onLoad={(t) => {
                        t.currentTarget.style.opacity = "1";
                        // if (t.currentTarget.width >= t.currentTarget.height) {
                        //   const animeCoverEl = document.querySelector("#anime_cover");
                        //   // animeCoverEl?.classList.add("max-w-[320px]");
                        //   // animeCoverEl?.classList.add("w-full");
                        // }
                      }}
                    />
                  )}
                </div>

                <div className="flex gap-2 place-self-center">
                  <div className="flex items-center gap-1">
                    <Star size={24} weight="fill" className="text-yellow-400" />
                    <span className="text-sm">{anime.averageScore > 0 ? anime.averageScore : 0}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Heart size={24} weight="fill" className="text-red-600" />
                    <span className="text-sm">{anime.favourites > 0 ? anime.favourites : 0}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 px-4 md:items-start">
                <h1
                  className="line-clamp-2 text-center text-2xl md:text-left"
                  style={{
                    color: isContrastColorWithSiteBackgroundAppropriate(anime.coverImage.color)
                      ? anime.coverImage.color
                      : "#FF5F00",
                  }}
                >
                  {anime.title.romaji}
                </h1>

                {anime.startDate.day == null &&
                  anime.startDate.month == null &&
                  anime.startDate.year == null && <span className="peer">To Be Announced</span>}

                {(anime.format ?? anime.episodes) && (
                  <div className="flex items-center gap-2">
                    {anime.seasonYear && (
                      <span className="font-medium text-second">{anime.seasonYear}</span>
                    )}

                    <div className="mx-2 h-2 w-2 rounded-full bg-white/80" />

                    {anime.format && <span className="text-md">{anime.format}</span>}

                    <div className="mx-2 h-2 w-2 rounded-full bg-white/80" />

                    {anime.episodes && (
                      <span className="text-md">{`${anime.episodes} ${
                        anime.episodes > 1 ? "episodes" : "episode"
                      }`}</span>
                    )}
                  </div>
                )}

                <div className="mx-auto mt-auto grid max-w-6xl grid-flow-col justify-center gap-2 font-medium md:gap-8">
                  <button
                    className={
                      pageContent === "overview"
                        ? "pointer-events-none truncate rounded-lg bg-zinc-50 px-2 py-1 text-lg uppercase text-main duration-200"
                        : "truncate rounded-lg bg-main/20 px-2 text-lg uppercase text-zinc-200 duration-200 hover:bg-main/40"
                    }
                    onClick={() => setPageContent("overview")}
                  >
                    Overview
                  </button>

                  <button
                    className={
                      pageContent === "characters"
                        ? "pointer-events-none truncate rounded-lg bg-zinc-50 px-2 py-1 text-lg uppercase text-main duration-200"
                        : "truncate rounded-lg bg-main/20 px-2 text-lg uppercase text-zinc-200 duration-200 hover:bg-main/40"
                    }
                    onClick={() => setPageContent("characters")}
                  >
                    Characters
                  </button>

                  <button
                    className={
                      pageContent === "staff"
                        ? "pointer-events-none truncate rounded-lg bg-zinc-50 px-2 py-1 text-lg uppercase text-main duration-200"
                        : "truncate rounded-lg bg-main/20 px-2 text-lg uppercase text-zinc-200 duration-200 hover:bg-main/40"
                    }
                    onClick={() => setPageContent("staff")}
                  >
                    Staff
                  </button>
                </div>
              </div>
            </div>

            {pageContent == "overview" && (
              <Slide in direction="up" timeout={500}>
                <div className="mx-auto max-w-6xl">
                  <ul className="mb-4 flex flex-wrap justify-center px-4">
                    {anime.genres.map((genre, index, array) => (
                      <div key={index} className="flex items-center">
                        <li
                          key={index}
                          className="pointer-events-none text-lg font-medium"
                          style={{
                            color: isContrastColorWithSiteBackgroundAppropriate(anime.coverImage.color)
                              ? anime.coverImage.color
                              : "#FF5F00",
                          }}
                        >
                          {genre}
                        </li>

                        {index != array.length - 1 && (
                          <div className="mx-2 h-2 w-2 rounded-full bg-white/80" />
                        )}
                      </div>
                    ))}
                  </ul>

                  {anime.description && (
                    <div className="flex flex-col px-4">
                      <Subtitle text="description" />

                      <CollapseParagraph description={anime.description} />
                    </div>
                  )}

                  <div className="mt-4 flex flex-col">
                    <Subtitle text="characters" className="px-4" />

                    <div className="flex gap-4 pt-4">
                      <SwiperHorizontal>
                        {anime.characters.edges
                          .filter((character) => character.role == "MAIN")
                          .map((character) => (
                            <SwiperSlide key={character.node.id}>
                              <Link
                                className="flex flex-col gap-4"
                                to={`/character/${character.node.id}`}
                              >
                                <div className="aspect-square overflow-hidden rounded-full bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-300">
                                  <img
                                    src={character.node.image.medium}
                                    alt={character.node.name.full}
                                    style={{
                                      opacity: 0,
                                      transitionDuration: "900ms",
                                    }}
                                    onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                                    className="h-full w-full object-cover"
                                  />
                                </div>

                                <span className="mx-auto line-clamp-2 w-full text-center text-base">
                                  {character.node.name.full}
                                </span>
                              </Link>
                            </SwiperSlide>
                          ))}
                      </SwiperHorizontal>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 px-4">
                    <Subtitle text="Info" />

                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <span className="min-w-[110px] text-sm">Romaji</span>
                      <TitleCopyToClipboard title={anime.title.romaji} />
                    </div>

                    {anime.title.english && (
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <span className="min-w-[110px] text-sm">English</span>
                        <TitleCopyToClipboard title={anime.title.english} />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <span className="min-w-[110px] text-sm">Native</span>
                      <TitleCopyToClipboard title={anime.title.native} />
                    </div>

                    {anime.synonyms.length > 0 && (
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <span className="min-w-[110px] text-sm">Synonyms</span>
                        <div className="flex flex-1 flex-col">
                          {anime.synonyms.map((synonym, index) => (
                            <span key={index} className="text-justify text-sm">
                              {synonym}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 px-4">
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <span className="min-w-[110px] text-sm">Format</span>

                      <span className="flex-1 text-sm">{anime.format ? anime.format : "-"}</span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <span className="min-w-[110px] text-sm">Episodes</span>

                      <span className="flex-1 text-sm">{anime.episodes ? anime.episodes : "?"}</span>
                    </div>

                    {anime.duration && (
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <span className="min-w-[110px] text-sm">Episode Duration</span>

                        <span className="flex-1 text-sm">
                          {anime.duration}
                          {anime.duration > 1 ? " mins" : " min"}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <span className="min-w-[110px] text-sm">Source</span>

                      <span className="text-sm">
                        {anime.source ? anime.source.replace("_", " ") : "-"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <span className="min-w-[110px] text-sm">Status</span>

                      <span className="flex-1 text-sm">{anime.status.replaceAll("_", " ")}</span>
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <span className="min-w-[110px] text-sm">Start Date</span>

                      {anime.startDate.day || anime.startDate.month || anime.startDate.year ? (
                        <span className="flex-1 text-sm">
                          {formatDateToString(
                            anime.startDate.year,
                            anime.startDate.month,
                            anime.startDate.day
                          )}
                        </span>
                      ) : (
                        "?"
                      )}
                    </div>

                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      <span className="min-w-[110px] text-sm">End Date</span>

                      {anime.endDate.day || anime.endDate.month || anime.endDate.year ? (
                        <span className="flex-1 text-sm">
                          {formatDateToString(
                            anime.endDate.year,
                            anime.endDate.month,
                            anime.endDate.day
                          )}
                        </span>
                      ) : (
                        "?"
                      )}
                    </div>

                    {anime.season && anime.seasonYear && (
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        <span className="min-w-[110px] text-sm">Season</span>

                        <span className="flex-1 text-sm text-main">
                          {`${anime.season} ${anime.seasonYear}`}
                        </span>
                      </div>
                    )}
                  </div>

                  <StudiosList studios={anime.studios.edges} />

                  <div className="mt-4 flex justify-center gap-4 px-4 md:gap-8">
                    <div className="flex flex-col items-center justify-center gap-y-2">
                      <span className="text-xl font-medium">
                        {anime.averageScore ? anime.averageScore : 0}%
                      </span>
                      <span className="text-sm text-main">Average</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-y-2">
                      <span className="text-xl font-medium">
                        {anime.meanScore ? anime.meanScore : 0}%
                      </span>
                      <span className="text-sm text-main">Mean</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-y-2">
                      <span className="text-xl font-medium">{anime.popularity}</span>
                      <span className="text-sm text-main">Popularity</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-y-2">
                      <span className="text-xl font-medium">{anime.favourites}</span>
                      <span className="text-sm text-main">Favourites</span>
                    </div>
                  </div>

                  {anime.tags.length > 0 && <Tags tags={anime.tags} />}

                  <Relations edges={anime.relations.edges} />

                  {anime.recommendations.edges.length > 0 && (
                    <Recommendations edges={anime.recommendations.edges} />
                  )}

                  {anime.externalLinks.length > 0 && (
                    <div className="mt-4 flex flex-col gap-3 px-4">
                      <div className="flex justify-between">
                        <Subtitle text="Links" />
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {anime.externalLinks.map((link) => (
                          <Link
                            key={link.id}
                            to={link.url}
                            target="_blank"
                            className="my-auto flex h-fit cursor-pointer items-center gap-1 rounded p-2 hover:scale-[102%]"
                            style={{
                              backgroundColor: link.color ? link.color : "#52525b",
                            }}
                          >
                            {link.icon && <img src={link.icon} alt={link.site} className="w-6" />}
                            <strong className="text-sm text-white">{link.site}</strong>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Slide>
            )}

            {pageContent == "characters" && (
              <CharactersContent
                characters={anime.characters}
                pagingFunction={() => {
                  setIsLoading(true);

                  fetchMore({
                    query: GET_ANIME_CHARACTERS_PAGINATION,
                    variables: {
                      charactersPage: anime.characters.pageInfo.currentPage + 1,
                      id: anime.id,
                    },
                    updateQuery(pv, { fetchMoreResult }) {
                      if (!fetchMoreResult) return pv;

                      return {
                        Media: {
                          ...pv.Media,
                          characters: {
                            ...fetchMoreResult.Media.characters,
                            edges: [
                              ...pv.Media.characters.edges,
                              ...fetchMoreResult.Media.characters.edges,
                            ],
                          },
                        },
                      };
                    },
                  });
                }}
                isLoading={isLoading}
              />
            )}

            {pageContent == "staff" && (
              <StaffContent
                staff={anime.staff}
                pagingFunction={() => {
                  setIsLoading(true);
                  fetchMore({
                    query: GET_ANIME_STAFF_PAGINATION,
                    variables: {
                      staffPage: anime.staff.pageInfo.currentPage + 1,
                      id: anime.id,
                    },
                    updateQuery(pv, { fetchMoreResult }) {
                      if (!fetchMoreResult) return pv;

                      return {
                        Media: {
                          ...pv.Media,
                          staff: {
                            ...fetchMoreResult.Media.staff,
                            edges: [...pv.Media.staff.edges, ...fetchMoreResult.Media.staff.edges],
                          },
                        },
                      };
                    },
                  });
                }}
                isLoading={isLoading}
              />
            )}
          </div>

          <Footer />
        </>
      )}
    </div>
  );
}

type StudiosListProps = {
  studios: {
    isMain: boolean;
    node: {
      id: number;
      name: string;
      isAnimationStudio: boolean;
    };
  }[];
};

function StudiosList({ studios }: StudiosListProps) {
  const animationStudio = studios.filter((studio) => studio.isMain);
  const producers = studios.filter((studio) => !studio.isMain);

  return (
    <div className="flex flex-col gap-2 px-4">
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <span className="min-w-[110px] text-sm">Studios</span>

        <div className="flex flex-col gap-1">
          {animationStudio && animationStudio.length > 0
            ? animationStudio.map((studio) => (
                <span key={studio.node.id} className="flex-1 text-sm text-main">
                  {studio.node.name}
                </span>
              ))
            : "?"}
        </div>
      </div>

      <div className="flex flex-wrap gap-x-4 gap-y-2">
        <span className="min-w-[110px] text-sm">Producers</span>

        <div className="flex flex-col gap-1">
          {producers && producers.length > 0
            ? producers.map((producer) => (
                <span key={producer.node.id} className="flex-1 text-sm text-main">
                  {producer.node.name}
                </span>
              ))
            : "?"}
        </div>
      </div>
    </div>
  );
}
