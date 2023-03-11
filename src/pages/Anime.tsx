import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Alert, Collapse, Tooltip } from "@mui/material";
import { CaretDown, CaretUp, Heart, Star, X } from "phosphor-react";
import { GET_ANIME_MEDIA } from "../lib/queries";
import { monthsShort } from "../utils/variablesQueries";
import { AnimeMedia } from "../types";
import { CircularLoading } from "../components/Loading";
import { MyDivider } from "../components/MyComponents";
import { MySpace } from "../components/MyComponents";
import { Footer } from "../components/Footer";
import logo from "../assets/logo.svg";

export function Anime() {
  const { id } = useParams() as { id: string };

  const { data, loading, error } = useQuery(GET_ANIME_MEDIA, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  const anime: AnimeMedia = data && data.Media;

  if (error) console.error(error);

  useEffect(() => {
    const hostname = location.hostname;

    if (hostname != "localhost") scrollTo({ top: 0 });
  }, []);

  return (
    <div className="flex flex-col justify-between min-h-screen">
      {error && (
        <div className="flex flex-col p-4 m-auto bg-zinc-50 shadow-xl">
          <strong>{error.name}</strong>
          <span>{error.message}</span>
        </div>
      )}
      {loading && <CircularLoading />}
      {!loading && anime && (
        <>
          {anime.bannerImage ? (
            <div className="bg-main/80">
              <img
                src={anime.bannerImage}
                className="h-48 md:h-80 w-full object-cover object-center"
                alt="anime banner image"
                loading="lazy"
                style={{
                  opacity: 0,
                  transform: "scale(0.96)",
                  transitionDuration: "900ms",
                }}
                onLoad={(t) => {
                  t.currentTarget.style.opacity = "1";
                  t.currentTarget.style.transform = "initial";
                }}
              />
            </div>
          ) : (
            <MySpace pxHeight={54} />
          )}

          <AnimeHeader />

          <div
            className={`mb-auto pb-4 ${
              anime.bannerImage && "-mt-32 md:-mt-0"
            } shadow-xl`}
          >
            <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 max-w-6xl mx-auto pt-4">
              <div className="flex flex-wrap md:flex-col">
                <div
                  className={`bg-main/80 ml-4 rounded w-fit z-10 place-self-start shadow-zinc-400/70 shadow-lg overflow-hidden ${
                    anime.bannerImage && "md:-mt-28"
                  }`}
                >
                  <img
                    src={anime.coverImage.large}
                    alt={anime.title.romaji}
                    className={`w-28 md:w-52`}
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

                <div className="place-self-end md:place-self-center px-4 my-2 md:mt-4 flex gap-6">
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

              <div className="flex flex-1 flex-col gap-1">
                <h1 className="text-lg text-main px-4 text-justify overflow-hidden">
                  {anime.title.romaji}
                </h1>

                <div className="flex gap-2 px-4">
                  {anime.seasonYear && (
                    <span className="text-second font-medium">
                      {anime.seasonYear}
                    </span>
                  )}

                  {anime.format && (
                    <span className="text-md before:content-['·'] before:pr-2">
                      {anime.format}
                    </span>
                  )}

                  {anime.episodes && (
                    <span className="text-md before:content-['·'] before:pr-2">{`${
                      anime.episodes
                    } ${anime.episodes > 1 ? "episodes" : "episode"}`}</span>
                  )}
                </div>

                <ul className="flex gap-2 flex-wrap px-4">
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
                    <MyDivider className="md:ml-4" />
                    <DescriptionCollapse description={anime.description} />
                  </>
                )}
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-4">
              <MyDivider />

              <div className="flex flex-col">
                <strong className="mb-2">Characters</strong>

                <div className="flex gap-4 overflow-x-auto">
                  {anime.characters.nodes.map((character) => (
                    <div key={character.id} className="flex flex-col gap-1">
                      <div className="bg-zinc-300 rounded-full overflow-hidden">
                        <img
                          src={character.image.medium}
                          alt={character.name.full}
                          style={{ opacity: 0, transitionDuration: "900ms" }}
                          onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                          className="min-w-[80px] h-[80px] object-cover"
                        />
                      </div>

                      <span className="text-sm text-main font-medium max-w-[80px] text-center mx-auto">
                        {character.name.full}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <MyDivider />

              <div className="flex flex-col gap-2">
                <strong>Info</strong>

                <div className="flex flex-wrap gap-y-2 gap-x-4">
                  <span className="text-sm min-w-[110px]">Romaji</span>
                  <div className="flex-1">
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText(anime.title.romaji);
                      }}
                      className="text-sm text-second text-justify cursor-pointer"
                    >
                      {anime.title.romaji}
                    </span>
                  </div>
                </div>

                {anime.title.english && (
                  <div className="flex flex-wrap gap-y-2 gap-x-4">
                    <span className="text-sm min-w-[110px]">English</span>
                    <div className="flex-1">
                      <span
                        onClick={() => {
                          navigator.clipboard.writeText(anime.title.english);
                        }}
                        className="text-sm text-second text-justify cursor-pointer"
                      >
                        {anime.title.english}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-y-2 gap-x-4">
                  <span className="text-sm min-w-[110px]">Native</span>
                  <div className="flex-1">
                    <span
                      onClick={() => {
                        navigator.clipboard.writeText(anime.title.native);
                      }}
                      className="text-sm text-second text-justify cursor-pointer"
                    >
                      {anime.title.native}
                    </span>
                  </div>
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
                      {`${anime.startDate.year ? anime.startDate.year : ""} ${
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

              <MyDivider />

              <TagsList tags={anime.tags} />

              <MyDivider />

              <RelationsList edges={anime.relations.edges} />
            </div>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
}

function AnimeHeader() {
  const navigate = useNavigate();

  return (
    <>
      <div className="sm:block fixed z-30 bg-zinc-800/40 backdrop-blur-sm left-0 right-0 top-0">
        <div className="flex w-full justify-between items-center max-w-6xl mx-auto px-4">
          <div
            className="p-4 cursor-pointer transition hover:bg-main/10"
            onClick={() => navigate(-1)}
          >
            <X size={22} className="text-main" />
          </div>

          <div className="flex flex-1 justify-center">
            <img
              src={logo}
              alt="otakuVERISSIMOlogo"
              className="w-48 md:w-60 my-auto px-2 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

type DescriptionCollapseProps = {
  description: string;
};

function DescriptionCollapse({ description }: DescriptionCollapseProps) {
  const [showAllDescription, setShowAllDescription] = useState(false);

  return (
    <div className="flex flex-col px-4">
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
      <div className="flex justify-between mb-2">
        <strong>Tags</strong>
        {tags.find((item) => item.isMediaSpoiler === true) && (
          <button
            className="text-rose-500 text-sm outline-main/50 md:text-base font-medium"
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
                    tag.isMediaSpoiler ? "text-second" : "text-main"
                  } text-sm`}
                >
                  {tag.name}
                </span>

                <span
                  className={`${
                    tag.isMediaSpoiler ? "text-second" : "text-main"
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

  const sortEdges = [...edges].sort((a, b) => {
    if (order.indexOf(a.relationType) > order.indexOf(b.relationType)) return 1;
    if (order.indexOf(a.relationType) < order.indexOf(b.relationType))
      return -1;
    return 0;
  });

  return (
    <div className="flex flex-col">
      <strong>Relations</strong>

      <div className="flex gap-4 overflow-x-auto mt-4">
        {sortEdges.map((edge) => (
          <Link
            to={edge.node.type == "ANIME" ? `/anime/${edge.node.id}` : ""}
            key={edge.node.id}
            className="group cursor-pointer flex gap-1 flex-col w-32"
          >
            <span className="block text-[14px] text-center leading-none text-zinc-600 font-medium">
              {edge.node.format ? edge.node.format.replaceAll("_", " ") : ""}
            </span>

            <div className="relative w-32 h-48 mb-2 bg-main/80 rounded overflow-hidden shadow-md shadow-zinc-400/70">
              <img
                src={edge.node.coverImage.large}
                alt={edge.node.title.romaji}
                className="w-full h-full object-cover object-center group-hover:border-main"
                loading="lazy"
                style={{
                  opacity: 0,
                  transform: "scale(0.86)",
                  transitionDuration: "600ms",
                }}
                onLoad={(t) => (
                  (t.currentTarget.style.opacity = "1"),
                  (t.currentTarget.style.transform = "initial")
                )}
              />
            </div>

            <span className="block text-sm text-center leading-none md:text-base truncate text-main">
              {edge.node.title.romaji}
            </span>

            <span className="block text-[14px] text-center leading-none text-zinc-600">
              {edge.relationType.replaceAll("_", " ")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
