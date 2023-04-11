import { useEffect, useState } from "react";
import {
  Link,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Collapse, Grow } from "@mui/material";
import { CaretDown, CaretUp, CopySimple, Heart, Star } from "phosphor-react";
import {
  GET_ANIME_MEDIA,
  GET_MORE_CHARACTERS,
  GET_MORE_STAFF,
} from "../lib/queries";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { handleNavLocationStateFrom, monthsShort } from "../utils";
import { AnimeMedia } from "../types";
import { CircularLoading } from "../components/Loading";
import { MyDivider } from "../components/MyComponents";
import { Footer } from "../components/Footer";
import { AnimeCharacters } from "../components/AnimeCharacters";
import { AnimeStaff } from "../components/AnimeStaff";
import { SimpleHeader } from "../components/Header";

export function Anime() {
  const { id, sub } = useParams() as { id: string; sub: string };
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const { data, error, fetchMore } = useQuery(GET_ANIME_MEDIA, {
    variables: { id: id },
    notifyOnNetworkStatusChange: true,
    onError: (error) => {
      setIsLoading(false);
      console.error(error);
    },
    onCompleted: (data) => {
      setIsLoading(false);
      document.title = `${data.Media.title.romaji} ${
        data.Media.title.english != null &&
        data.Media.title.english != data.Media.title.romaji
          ? ` (${data.Media.title.english})`
          : ""
      } · otakuVERISSIMO`;
    },
  });

  const anime: AnimeMedia = data && data.Media;

  useEffect(() => {
    scrollTo({ top: 0 });

    if (![undefined, "staff", "characters"].includes(sub)) {
      navigate(`/anime/${id}`);
    }
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      {error && (
        <div className="flex flex-col p-4 m-auto bg-zinc-50 shadow-xl">
          <strong>{error.name}</strong>
          <span>{error.message}</span>
        </div>
      )}
      {!anime && <CircularLoading />}
      {anime && (
        <>
          {anime.bannerImage ? (
            <div className="bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500">
              <img
                src={anime.bannerImage}
                className="h-52 md:h-72 w-full object-cover object-center"
                alt="anime banner image"
                loading="lazy"
                style={{
                  opacity: 0,
                  transform: "scale(0.86)",
                  transitionDuration: "900ms",
                }}
                onLoad={(t) => {
                  t.currentTarget.style.opacity = "1";
                  t.currentTarget.style.transform = "initial";
                }}
              />
            </div>
          ) : (
            <div className="h-48 w-full bg-gradient-to-t from-zinc-800 via-zinc-700 to-zinc-600"></div>
          )}

          <SimpleHeader />

          <div className="mb-auto pb-4 px-4">
            <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 max-w-6xl mx-auto py-4">
              <div className="flex flex-wrap md:flex-col gap-2">
                <div className="bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 rounded w-fit z-10 place-self-start shadow-black/40 shadow-md overflow-hidden -mt-32 md:-mt-36">
                  <img
                    src={anime.coverImage.large}
                    alt={anime.title.romaji}
                    className={`w-28 md:w-44`}
                    loading="lazy"
                    style={{
                      opacity: 0,
                      transform: "scale(0.84)",
                      transitionDuration: "200ms",
                    }}
                    onLoad={(t) => {
                      t.currentTarget.style.opacity = "1";
                      t.currentTarget.style.transform = "initial";
                    }}
                  />
                </div>

                <div className="flex gap-6 place-self-end md:place-self-center">
                  <div className="flex gap-1 items-center">
                    <Star size={22} weight="fill" className="text-yellow-500" />
                    <span className="text-zinc-600 text-sm">
                      {anime.averageScore > 0 ? anime.averageScore : 0}
                    </span>
                  </div>

                  <div className="flex gap-1 items-center">
                    <Heart size={22} weight="fill" className="text-red-600" />
                    <span className="text-zinc-600 text-sm">
                      {anime.favourites > 0 ? anime.favourites : 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                <h1 className="text-lg text-main line-clamp-2">
                  {anime.title.romaji}
                </h1>

                {anime.startDate.day == null &&
                  anime.startDate.month == null &&
                  anime.startDate.year == null && (
                    <span className="peer">To Be Announced</span>
                  )}

                {(anime.format ?? anime.episodes) && (
                  <div className="flex gap-2">
                    {anime.seasonYear && (
                      <span className="peer text-second font-medium">
                        {anime.seasonYear}
                      </span>
                    )}

                    {anime.format && (
                      <span className="peer peer-[]:before:content-['·'] peer-[]:before:pr-2 text-md">
                        {anime.format}
                      </span>
                    )}

                    {anime.episodes && (
                      <span className="peer text-md peer-[]:before:content-['·'] peer-[]:before:pr-2">{`${
                        anime.episodes
                      } ${anime.episodes > 1 ? "episodes" : "episode"}`}</span>
                    )}
                  </div>
                )}

                <div className="flex justify-center mt-auto w-full px-2 gap-2 md:gap-8 max-w-6xl bg-zinc-100 mx-auto rounded shadow-lg font-medium">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "uppercase py-2 text-[14px] md:text-[16px] text-main border-b-2 border-main duration-200 pointer-events-none"
                        : "uppercase py-2 text-[14px] md:text-[16px] text-zinc-400 hover:text-zinc-500 border-b-2 border-transparent duration-200"
                    }
                    to={`/anime/${anime.id}`}
                    end
                  >
                    Overview
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "uppercase py-2 text-[14px] md:text-[16px] text-main border-b-2 border-main duration-200 pointer-events-none"
                        : "uppercase py-2 text-[14px] md:text-[16px] text-zinc-400 hover:text-zinc-500 border-b-2 border-transparent duration-200"
                    }
                    to={`/anime/${anime.id}/characters`}
                    end
                  >
                    Characters
                  </NavLink>

                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "uppercase py-2 text-[14px] md:text-[16px] text-main border-b-2 border-main duration-200 pointer-events-none"
                        : "uppercase py-2 text-[14px] md:text-[16px] text-zinc-400 hover:text-zinc-500 border-b-2 border-transparent duration-200"
                    }
                    to={`/anime/${anime.id}/staff`}
                    end
                  >
                    Staff
                  </NavLink>
                </div>
              </div>
            </div>

            {!sub && (
              <Grow in timeout={600}>
                <div className="max-w-6xl mx-auto">
                  <ul className="flex gap-2 flex-wrap">
                    {anime.genres.map((genre) => (
                      <li
                        key={genre}
                        className="bg-gradient-to-t from-emerald-800 via-emerald-700 to-emerald-400 font-medium text-zinc-50 text-sm py-1 px-2 rounded"
                      >
                        {genre}
                      </li>
                    ))}
                  </ul>

                  {anime.description && (
                    <>
                      <MyDivider />
                      <DescriptionCollapse description={anime.description} />
                    </>
                  )}
                  <MyDivider />

                  <div className="flex flex-col">
                    <strong className="mb-2">Characters</strong>

                    <ScrollArea.Root>
                      <ScrollArea.Viewport>
                        <div className="flex gap-4 pb-2">
                          {anime.characters.edges
                            .filter((character) => character.role == "MAIN")
                            .map((character) => (
                              <Link
                                key={character.node.id}
                                className="flex flex-col gap-1 w-24"
                                to={`/character/${character.node.id}`}
                                state={{
                                  from: handleNavLocationStateFrom(location),
                                }}
                              >
                                <div className="bg-zinc-300 h-24 rounded-full overflow-hidden">
                                  <img
                                    src={character.node.image.medium}
                                    alt={character.node.name.full}
                                    style={{
                                      opacity: 0,
                                      transitionDuration: "900ms",
                                    }}
                                    onLoad={(t) =>
                                      (t.currentTarget.style.opacity = "1")
                                    }
                                    className="w-full h-full object-cover"
                                  />
                                </div>

                                <span className="text-sm text-main w-full text-center mx-auto">
                                  {character.node.name.full}
                                </span>
                              </Link>
                            ))}
                        </div>
                      </ScrollArea.Viewport>

                      <ScrollArea.Scrollbar
                        className="hidden md:flex select-none touch-none rounded bg-zinc-300 transition-colors duration-200 flex-col h-2"
                        orientation="horizontal"
                      >
                        <ScrollArea.Thumb className="flex-1 bg-main/60 rounded relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                      </ScrollArea.Scrollbar>
                    </ScrollArea.Root>
                  </div>

                  <MyDivider />

                  <div className="flex flex-col gap-2">
                    <strong>Info</strong>

                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                      <span className="text-sm min-w-[110px]">Romaji</span>
                      <TitleCopyToClipboard title={anime.title.romaji} />
                    </div>

                    {anime.title.english && (
                      <div className="flex flex-wrap gap-y-2 gap-x-4">
                        <span className="text-sm min-w-[110px]">English</span>
                        <TitleCopyToClipboard title={anime.title.english} />
                      </div>
                    )}

                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                      <span className="text-sm min-w-[110px]">Native</span>
                      <TitleCopyToClipboard title={anime.title.native} />
                    </div>

                    {anime.synonyms.length > 0 && (
                      <div className="flex flex-wrap gap-y-2 gap-x-4">
                        <span className="text-sm min-w-[110px]">Synonyms</span>
                        <div className="flex-1 flex flex-col">
                          {anime.synonyms.map((synonym, index) => (
                            <span
                              key={index}
                              className="text-sm text-zinc-600 text-justify"
                            >
                              {synonym}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <MyDivider />

                  <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                      <span className="text-sm min-w-[110px]">Format</span>

                      <span className="flex-1 text-sm text-zinc-600">
                        {anime.format ? anime.format : "-"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                      <span className="text-sm min-w-[110px]">Episodes</span>

                      <span className="flex-1 text-sm text-zinc-600">
                        {anime.episodes ? anime.episodes : "?"}
                      </span>
                    </div>

                    {anime.duration && (
                      <div className="flex flex-wrap gap-y-2 gap-x-4">
                        <span className="text-sm min-w-[110px]">
                          Episode Duration
                        </span>

                        <span className="flex-1 text-sm text-zinc-600">
                          {anime.duration}
                          {anime.duration > 1 ? " mins" : " min"}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                      <span className="text-sm leading-none min-w-[110px]">
                        Source
                      </span>

                      <span className="text-sm leading-none">
                        {anime.source ? anime.source.replace("_", " ") : "-"}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                      <span className="text-sm min-w-[110px]">Status</span>

                      <span className="flex-1 text-sm text-zinc-600">
                        {anime.status.replaceAll("_", " ")}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                      <span className="text-sm min-w-[110px]">Start Date</span>

                      {anime.startDate.day ||
                      anime.startDate.month ||
                      anime.startDate.year ? (
                        <span className="flex-1 text-sm text-zinc-600">
                          {`${
                            anime.startDate.year ? anime.startDate.year : ""
                          } ${
                            anime.startDate.month
                              ? monthsShort[anime.startDate.month]
                              : ""
                          } ${anime.startDate.day ? anime.startDate.day : ""}`}
                        </span>
                      ) : (
                        "?"
                      )}
                    </div>

                    <div className="flex flex-wrap gap-y-2 gap-x-4">
                      <span className="text-sm min-w-[110px]">End Date</span>

                      {anime.endDate.day ||
                      anime.endDate.month ||
                      anime.endDate.year ? (
                        <span className="flex-1 text-sm text-zinc-600">
                          {`${anime.endDate.year ? anime.endDate.year : ""} ${
                            anime.endDate.month
                              ? monthsShort[anime.endDate.month]
                              : ""
                          } ${anime.endDate.day ? anime.endDate.day : ""}`}
                        </span>
                      ) : (
                        "?"
                      )}
                    </div>

                    {anime.season && anime.seasonYear && (
                      <div className="flex flex-wrap gap-y-2 gap-x-4">
                        <span className="text-sm min-w-[110px]">Season</span>

                        <span className="flex-1 text-sm text-main cursor-pointer">
                          {`${anime.season} ${anime.seasonYear}`}
                        </span>
                      </div>
                    )}
                  </div>

                  <MyDivider />

                  <StudiosList studios={anime.studios.edges} />

                  <MyDivider />

                  <div className="flex gap-4 md:gap-8 justify-center">
                    <div className="flex flex-col gap-y-2 justify-center items-center">
                      <span className="text-xl font-medium text-zinc-600 leading-none">
                        {anime.averageScore ? anime.averageScore : 0}%
                      </span>
                      <span className="text-zinc-600 text-sm leading-none">
                        Average
                      </span>
                    </div>

                    <div className="flex flex-col gap-y-2 justify-center items-center">
                      <span className="text-xl font-medium text-zinc-600 leading-none">
                        {anime.meanScore ? anime.meanScore : 0}%
                      </span>
                      <span className="text-zinc-600 text-sm leading-none">
                        Mean
                      </span>
                    </div>

                    <div className="flex flex-col gap-y-2 justify-center items-center">
                      <span className="text-xl font-medium text-zinc-600 leading-none">
                        {anime.popularity}
                      </span>
                      <span className="text-zinc-600 text-sm leading-none">
                        Popularity
                      </span>
                    </div>

                    <div className="flex flex-col gap-y-2 justify-center items-center">
                      <span className="text-xl font-medium text-zinc-600 leading-none">
                        {anime.favourites}
                      </span>
                      <span className="text-zinc-600 text-sm leading-none">
                        Favourites
                      </span>
                    </div>
                  </div>

                  {anime.tags.length > 0 && <TagsList tags={anime.tags} />}

                  <RelationsList edges={anime.relations.edges} />

                  {anime.recommendations.edges.length > 0 && (
                    <>
                      <MyDivider />
                      <RecommendationsList
                        edges={anime.recommendations.edges}
                      />
                    </>
                  )}

                  <MyDivider />

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <strong className="text-md leading-none">Links</strong>
                      <span className="text-sm leading-none font-medium text-zinc-500">
                        Click to copy link
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {anime.externalLinks.map((link) => (
                        <div
                          key={link.id}
                          className="flex gap-1 p-2 rounded items-center h-fit my-auto cursor-pointer hover:scale-[102%]"
                          onClick={() =>
                            navigator.clipboard.writeText(link.url)
                          }
                          style={{
                            backgroundColor: link.color
                              ? link.color
                              : "#52525b",
                          }}
                        >
                          {link.icon && (
                            <img
                              src={link.icon}
                              alt={link.site}
                              className="w-6"
                            />
                          )}
                          <strong className="text-white text-sm">
                            {link.site}
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Grow>
            )}

            {sub == "characters" && (
              <AnimeCharacters
                characters={anime.characters}
                pagingFunction={() => {
                  setIsLoading(true);

                  fetchMore({
                    query: GET_MORE_CHARACTERS,
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

            {sub == "staff" && (
              <AnimeStaff
                staff={anime.staff}
                pagingFunction={() => {
                  setIsLoading(true);
                  fetchMore({
                    query: GET_MORE_STAFF,
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
                            edges: [
                              ...pv.Media.staff.edges,
                              ...fetchMoreResult.Media.staff.edges,
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
          </div>

          <MyDivider />

          <Footer />
        </>
      )}
    </div>
  );
}

type DescriptionCollapseProps = {
  description: string;
};

function DescriptionCollapse({ description }: DescriptionCollapseProps) {
  const [showAllDescription, setShowAllDescription] = useState(false);

  return (
    <div className="flex flex-col">
      <strong className="mb-2">Description</strong>

      {description.length > 112 ? (
        <>
          <div className="relative">
            <Collapse in={showAllDescription} collapsedSize={80}>
              <p
                className="text-justify"
                dangerouslySetInnerHTML={{ __html: description }}
              ></p>
            </Collapse>
          </div>

          <button
            onClick={() => setShowAllDescription(!showAllDescription)}
            className={`flex justify-center outline-main/50 bg-zinc-100/70 ${
              showAllDescription ? "mt-0" : "-mt-8 py-2"
            } z-10`}
          >
            {showAllDescription ? (
              <CaretUp size={26} className="text-zinc-400" weight="bold" />
            ) : (
              <CaretDown size={26} className="text-zinc-400" weight="bold" />
            )}
          </button>
        </>
      ) : (
        <p
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
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
    <div className=" flex-1 flex items-center gap-1">
      <span
        onClick={handleClick}
        className="relative text-sm text-second text-justify cursor-pointer pr-4"
        title="click to copy"
      >
        {title}

        {showCopyMessage ? (
          <span className="absolute -top-5 -right-5 whitespace-nowrap pointer-events-none bg-emerald-600 text-zinc-50 text-sm px-2 py-1 rounded duration-500">
            copied text
          </span>
        ) : (
          <CopySimple className="absolute -top-1 -right-3 cursor-pointer rounded-full bg-second/80 text-zinc-50 text-[20px] p-1 h-6 w-6 duration-500" />
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
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-y-2 gap-x-4">
        <span className="text-sm min-w-[110px]">Studios</span>

        <div className="flex flex-col gap-1">
          {animationStudio && animationStudio.length > 0
            ? animationStudio.map((studio) => (
                <span
                  key={studio.node.id}
                  className="flex-1 text-sm text-main cursor-pointer"
                >
                  {studio.node.name}
                </span>
              ))
            : "?"}
        </div>
      </div>

      <div className="flex flex-wrap gap-y-2 gap-x-4">
        <span className="text-sm min-w-[110px]">Producers</span>

        <div className="flex flex-col gap-1">
          {producers && producers.length > 0
            ? producers.map((producer) => (
                <span
                  key={producer.node.id}
                  className="flex-1 text-sm text-main cursor-pointer"
                >
                  {producer.node.name}
                </span>
              ))
            : "?"}
        </div>
      </div>
    </div>
  );
}

type TagsListProps = {
  tags: {
    id: number;
    name: string;
    description: string;
    category: string;
    rank: number;
    isGeneralSpoiler: boolean;
    isMediaSpoiler: boolean;
    isAdult: boolean;
  }[];
};

function TagsList({ tags }: TagsListProps) {
  const [showSpoilerTags, setShowSpoilerTags] = useState(false);

  return (
    <>
      <MyDivider />

      <div className="flex justify-between mb-2">
        <strong>Tags</strong>
        {tags.find((item) => item.isMediaSpoiler === true) && (
          <button
            className="text-rose-600 text-sm outline-main/50 md:text-base font-medium"
            onClick={() => setShowSpoilerTags(!showSpoilerTags)}
          >
            {showSpoilerTags ? "Hide Spoiler" : "Show Spoiler"}
          </button>
        )}
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
        {tags.map((tag) => {
          if (!tag.isMediaSpoiler || showSpoilerTags) {
            return (
              <div key={tag.id} className="flex justify-between">
                <span
                  className={`${
                    tag.isMediaSpoiler ? "text-rose-600" : "text-second"
                  } text-sm`}
                >
                  {tag.name}
                </span>

                <span
                  className={`${
                    tag.isMediaSpoiler ? "text-rose-600" : "text-second"
                  } text-sm md:text-base`}
                >
                  {tag.rank + "%"}
                </span>
              </div>
            );
          }
        })}
      </ul>
    </>
  );
}

type RelationsListProps = {
  edges: {
    relationType: string;
    node: {
      id: number;
      title: {
        romaji: string;
      };
      format: string;
      coverImage: {
        large: string;
      };
      type: string;
    };
  }[];
};

function RelationsList({ edges }: RelationsListProps) {
  const order = [
    "ADAPTATION",
    "PREQUEL",
    "SEQUEL",
    "PARENT",
    "SIDE_STORY",
    "CHARACTER",
    "SUMMARY",
    "ALTERNATIVE",
    "SPIN_OFF",
    "OTHER",
  ];

  const location = useLocation();

  const sortEdges = [...edges].sort((a, b) => {
    if (order.indexOf(a.relationType) > order.indexOf(b.relationType)) return 1;
    if (order.indexOf(a.relationType) < order.indexOf(b.relationType))
      return -1;
    return 0;
  });

  return (
    <div className="flex flex-col">
      <MyDivider />

      <strong>Relations</strong>

      <ScrollArea.Root>
        <ScrollArea.Viewport>
          <div className="flex gap-4 overflow-x-auto mt-2 pb-2">
            {sortEdges.map((edge) =>
              edge.node.type == "ANIME" ? (
                <Link
                  to={`/anime/${edge.node.id}`}
                  key={edge.node.id}
                  className="group cursor-pointer flex gap-1 flex-col w-32 py-1"
                  state={{ from: handleNavLocationStateFrom(location) }}
                >
                  <div className="relative w-32 h-48 mb-2 bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 rounded overflow-hidden shadow-md shadow-zinc-400/70">
                    <img
                      src={edge.node.coverImage.large}
                      alt={edge.node.title.romaji}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      style={{
                        opacity: 0,
                        transform: "scale(0.86)",
                        transitionDuration: "700ms",
                      }}
                      onLoad={(t) => (
                        (t.currentTarget.style.opacity = "1"),
                        (t.currentTarget.style.transform = "initial")
                      )}
                    />

                    <div className="absolute top-0 left-0 right-0 flex justify-center gap-1 items-center bg-zinc-700/80 py-[2px]">
                      <span className="text-zinc-50 text-xs font-medium">
                        {edge.node.format
                          ? edge.node.format.replaceAll("_", " ")
                          : ""}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 items-center bg-zinc-700/80 py-[2px]">
                      <span className="text-zinc-50 text-xs font-medium">
                        {edge.relationType.replaceAll("_", " ")}
                      </span>
                    </div>
                  </div>

                  <span className="text-[14px] text-center leading-none text-main line-clamp-2">
                    {edge.node.title.romaji}
                  </span>
                </Link>
              ) : (
                <div
                  key={edge.node.id}
                  className="group cursor-pointer flex gap-1 flex-col w-32 py-1"
                >
                  <div className="relative w-32 h-48 mb-2 bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 rounded overflow-hidden shadow-md shadow-zinc-400/70">
                    <img
                      src={edge.node.coverImage.large}
                      alt={edge.node.title.romaji}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                      style={{
                        opacity: 0,
                        transform: "scale(0.86)",
                        transitionDuration: "700ms",
                      }}
                      onLoad={(t) => (
                        (t.currentTarget.style.opacity = "1"),
                        (t.currentTarget.style.transform = "initial")
                      )}
                    />

                    <div className="absolute top-0 left-0 right-0 flex justify-center gap-1 items-center bg-zinc-700/80 py-[2px]">
                      <span className="text-zinc-50 text-xs font-medium">
                        {edge.node.format
                          ? edge.node.format.replaceAll("_", " ")
                          : ""}
                      </span>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 items-center bg-zinc-700/80 py-[2px]">
                      <span className="text-zinc-50 text-xs font-medium">
                        {edge.relationType.replaceAll("_", " ")}
                      </span>
                    </div>
                  </div>

                  <span className="text-[14px] text-center leading-none text-main line-clamp-2">
                    {edge.node.title.romaji}
                  </span>
                </div>
              )
            )}
          </div>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          className="hidden md:flex select-none touch-none rounded bg-zinc-300 transition-colors duration-200 flex-col h-2"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="flex-1 bg-main/60 rounded relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}

type RecommendationsListProps = {
  edges: {
    node: {
      mediaRecommendation: {
        id: number;
        title: {
          romaji: string;
        };
        format: string;
        coverImage: {
          large: string;
        };
        averageScore: number;
        favourites: number;
      };
    };
  }[];
};

function RecommendationsList({ edges }: RecommendationsListProps) {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      <strong>Recommendations</strong>
      <ScrollArea.Root>
        <ScrollArea.Viewport>
          <div className="flex gap-4 overflow-x-auto mt-2">
            {edges.map(
              (edge) =>
                edge.node.mediaRecommendation != null && (
                  <Link
                    to={`/anime/${edge.node.mediaRecommendation.id}`}
                    key={edge.node.mediaRecommendation.id}
                    state={{ from: handleNavLocationStateFrom(location) }}
                    className="group cursor-pointer flex gap-1 flex-col w-32 pt-1 pb-3"
                  >
                    <div className="relative w-32 h-48 mb-2 bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 rounded overflow-hidden shadow-md shadow-zinc-400/70">
                      <img
                        src={edge.node.mediaRecommendation.coverImage.large}
                        alt={edge.node.mediaRecommendation.title.romaji}
                        className="w-full h-full object-cover object-center group-hover:border-main"
                        loading="lazy"
                        style={{
                          opacity: 0,
                          transform: "scale(0.86)",
                          transitionDuration: "700ms",
                        }}
                        onLoad={(t) => (
                          (t.currentTarget.style.opacity = "1"),
                          (t.currentTarget.style.transform = "initial")
                        )}
                      />

                      <div className="absolute top-0 flex gap-1 items-center bg-zinc-700/70 p-1 rounded">
                        <Star
                          size={18}
                          weight="fill"
                          className="text-yellow-400"
                        />
                        <span className="text-zinc-50 text-sm font-medium">
                          {edge.node.mediaRecommendation.averageScore > 0
                            ? edge.node.mediaRecommendation.averageScore
                            : 0}
                        </span>
                      </div>

                      <div className="absolute bottom-0 flex gap-1 items-center bg-zinc-700/70 p-1 rounded">
                        <Heart
                          size={18}
                          weight="fill"
                          className="text-red-500"
                        />
                        <span className="text-zinc-50 text-sm font-medium">
                          {edge.node.mediaRecommendation.favourites > 0
                            ? edge.node.mediaRecommendation.favourites
                            : 0}
                        </span>
                      </div>

                      <div className="absolute top-0 right-0 flex gap-1 items-center bg-zinc-700/70 p-1 rounded">
                        <span className="text-zinc-50 text-xs font-medium">
                          {edge.node.mediaRecommendation.format.replaceAll(
                            "_",
                            " "
                          )}
                        </span>
                      </div>
                    </div>

                    <span className="text-sm text-center leading-none text-main line-clamp-2">
                      {edge.node.mediaRecommendation.title.romaji}
                    </span>
                  </Link>
                )
            )}
          </div>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          className="hidden md:flex select-none touch-none rounded bg-zinc-300 transition-colors duration-200 flex-col h-2"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="flex-1 bg-main/60 rounded relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}
