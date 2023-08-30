import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Slide } from "@mui/material";
import {
  GET_ANIME_CHARACTERS_PAGINATION,
  GET_ANIME_MEDIA_QUERY,
  GET_ANIME_STAFF_PAGINATION,
} from "@/lib/queries/AnimeMediaQuery";
import { CopySimple, Heart, Star } from "phosphor-react";
import { formatDateToString } from "@/utils";
import { AnimeMedia } from "@/types";
import { NotFound } from "@/components/NotFound";
import { Footer } from "@/components/Footer";
import { SimpleHeader } from "@/components/Header";
import { Recommendations } from "./components/Recommendations";
import { Relations } from "./components/Relations";
import { Tags } from "./components/Tags";
import { CharactersContent } from "./components/CharactersContent";
import { StaffContent } from "./components/StaffContent";
import { CollapseParagraph } from "@/components/CollapseParagraph";
import { CircularLoading } from "@/components/Loading";

export function Anime() {
  const [isLoading, setIsLoading] = useState(false);
  const [anime, setAnime] = useState<AnimeMedia>();
  const [pageContent, setPageContent] = useState<"overview" | "characters" | "staff">("overview");
  const { id } = useParams() as { id: string };

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
    if (window.scrollY <= document.body.scrollHeight) scrollTo({ top: 0, behavior: "smooth" });
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
          {anime.bannerImage ? (
            <div className="bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500">
              {loading ? (
                <div className="h-52 w-full bg-main md:h-72 " />
              ) : (
                <img
                  src={anime.bannerImage}
                  className="h-52 w-full object-cover object-center md:h-72"
                  alt="anime banner image"
                  loading="lazy"
                  style={{
                    opacity: 0,
                    transitionDuration: "1000ms",
                  }}
                  onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                />
              )}
            </div>
          ) : (
            <div className="h-10 w-full bg-gradient-to-t from-zinc-800 via-zinc-700 to-zinc-600 md:h-11" />
          )}

          <SimpleHeader />

          <div className="mb-auto">
            <div className="mx-auto flex max-w-6xl flex-col gap-y-2 py-4 md:flex-row">
              <div className="flex flex-wrap gap-2 pl-4 md:flex-col">
                <div
                  className={`z-10 w-fit place-self-start overflow-hidden rounded-lg bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 shadow-lg ${
                    anime.bannerImage ? "-mt-32 md:-mt-36" : ""
                  }`}
                >
                  {loading ? (
                    <div className="w-28 bg-main md:w-44" />
                  ) : (
                    <img
                      src={anime.coverImage.large}
                      alt={anime.title.romaji}
                      className="w-28 md:w-44"
                      loading="lazy"
                      style={{
                        opacity: 0,
                        transitionDuration: "800ms",
                      }}
                      onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                    />
                  )}
                </div>

                <div className="flex gap-6 place-self-end md:place-self-center">
                  <div className="flex items-center gap-1">
                    <Star size={22} weight="fill" className="text-yellow-500" />
                    <span className="text-sm">{anime.averageScore > 0 ? anime.averageScore : 0}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Heart size={22} weight="fill" className="text-red-600" />
                    <span className="text-sm">{anime.favourites > 0 ? anime.favourites : 0}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2 px-4">
                <h1 className="line-clamp-2 text-lg text-main">{anime.title.romaji}</h1>

                {anime.startDate.day == null &&
                  anime.startDate.month == null &&
                  anime.startDate.year == null && <span className="peer">To Be Announced</span>}

                {(anime.format ?? anime.episodes) && (
                  <div className="flex gap-2">
                    {anime.seasonYear && (
                      <span className="peer font-medium text-second">{anime.seasonYear}</span>
                    )}

                    {anime.format && (
                      <span className="text-md peer peer-[]:before:pr-2 peer-[]:before:content-['·']">
                        {anime.format}
                      </span>
                    )}

                    {anime.episodes && (
                      <span className="text-md peer peer-[]:before:pr-2 peer-[]:before:content-['·']">{`${
                        anime.episodes
                      } ${anime.episodes > 1 ? "episodes" : "episode"}`}</span>
                    )}
                  </div>
                )}

                <div className="mx-auto mt-auto flex w-full max-w-6xl justify-center gap-2 rounded-lg font-medium md:gap-8">
                  <button
                    className={
                      pageContent === "overview"
                        ? "pointer-events-none rounded-lg bg-main p-2 text-[14px] uppercase text-white duration-200 md:text-[16px]"
                        : "border-b-2 border-transparent p-2 text-[14px] uppercase text-zinc-200 duration-200 hover:text-zinc-500 md:text-[16px]"
                    }
                    onClick={() => setPageContent("overview")}
                  >
                    Overview
                  </button>

                  <button
                    className={
                      pageContent === "characters"
                        ? "pointer-events-none rounded-lg bg-main p-2 text-[14px] uppercase text-white duration-200 md:text-[16px]"
                        : "border-b-2 border-transparent p-2 text-[14px] uppercase text-zinc-200 duration-200 hover:text-zinc-500 md:text-[16px]"
                    }
                    onClick={() => setPageContent("characters")}
                  >
                    Characters
                  </button>

                  <button
                    className={
                      pageContent === "staff"
                        ? "pointer-events-none rounded-lg bg-main p-2 text-[14px] uppercase text-white duration-200 md:text-[16px]"
                        : "border-b-2 border-transparent p-2 text-[14px] uppercase text-zinc-200 duration-200 hover:text-zinc-500 md:text-[16px]"
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
                  <ul className="mb-4 flex flex-wrap px-4">
                    {anime.genres.map((genre, index, array) => (
                      <div key={index} className="flex items-center">
                        <li
                          key={index}
                          className="peer pointer-events-none rounded-lg font-medium text-emerald-500"
                        >
                          {genre}
                        </li>

                        {index != array.length - 1 && (
                          <div className="mx-2 h-2 w-2 rounded-full bg-white/30" />
                        )}
                      </div>
                    ))}
                  </ul>

                  {anime.description && (
                    <div className="flex flex-col px-4">
                      <strong className="mb-2">Description</strong>
                      <CollapseParagraph description={anime.description} />
                    </div>
                  )}

                  <div className="mt-4 flex flex-col">
                    <strong className="mb-2 px-4">Characters</strong>

                    <div className="flex gap-4">
                      {anime.characters.edges
                        .filter((character) => character.role == "MAIN")
                        .map((character) => (
                          <Link
                            key={character.node.id}
                            className="flex w-24 flex-col gap-1"
                            to={`/character/${character.node.id}`}
                          >
                            <div className="h-24 overflow-hidden rounded-full bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-300">
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

                            <span className="mx-auto line-clamp-2 w-full text-center text-sm text-main">
                              {character.node.name.full}
                            </span>
                          </Link>
                        ))}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-2 px-4">
                    <strong>Info</strong>

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
                      <span className="min-w-[110px] text-sm leading-none">Source</span>

                      <span className="text-sm leading-none">
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
                      <span className="text-xl font-medium leading-none">
                        {anime.averageScore ? anime.averageScore : 0}%
                      </span>
                      <span className="text-sm leading-none text-main">Average</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-y-2">
                      <span className="text-xl font-medium leading-none">
                        {anime.meanScore ? anime.meanScore : 0}%
                      </span>
                      <span className="text-sm leading-none text-main">Mean</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-y-2">
                      <span className="text-xl font-medium leading-none">{anime.popularity}</span>
                      <span className="text-sm leading-none text-main">Popularity</span>
                    </div>

                    <div className="flex flex-col items-center justify-center gap-y-2">
                      <span className="text-xl font-medium leading-none">{anime.favourites}</span>
                      <span className="text-sm leading-none text-main">Favourites</span>
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
                        <strong className="text-md w-fit border-t-4 border-main/70 leading-none">
                          Links
                        </strong>
                        <span className="pointer-events-none text-sm font-medium leading-none text-zinc-400">
                          Click to copy link
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {anime.externalLinks.map((link) => (
                          <div
                            key={link.id}
                            className="my-auto flex h-fit cursor-pointer items-center gap-1 rounded p-2 hover:scale-[102%]"
                            onClick={() => navigator.clipboard.writeText(link.url)}
                            style={{
                              backgroundColor: link.color ? link.color : "#52525b",
                            }}
                          >
                            {link.icon && <img src={link.icon} alt={link.site} className="w-6" />}
                            <strong className="text-sm text-white">{link.site}</strong>
                          </div>
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

type TitleCopyToClipboardProps = {
  title: string;
};

function TitleCopyToClipboard({ title }: TitleCopyToClipboardProps) {
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  function handleClick() {
    setShowCopyMessage(true);
    navigator.clipboard.writeText(title);
    setTimeout(() => setShowCopyMessage(false), 1000);
  }

  return (
    <div className=" flex flex-1 items-center gap-1">
      <span
        onClick={handleClick}
        className="relative cursor-pointer pr-4 text-justify text-sm text-sky-500"
        title="click to copy"
      >
        {title}

        {showCopyMessage ? (
          <span className="pointer-events-none absolute -right-5 -top-5 whitespace-nowrap rounded bg-emerald-600 px-2 py-1 text-sm text-zinc-50 duration-500">
            copied text
          </span>
        ) : (
          <CopySimple className="absolute -right-3 -top-1 h-6 w-6 cursor-pointer rounded-full bg-sky-500/80 p-1 text-[20px] text-zinc-50 duration-500" />
        )}
      </span>
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
