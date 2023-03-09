import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Collapse } from "@mui/material";
import { CaretDown, CaretUp, X } from "phosphor-react";
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

  const { data, loading } = useQuery(GET_ANIME_MEDIA, {
    variables: { id },
    notifyOnNetworkStatusChange: true,
  });

  const anime: AnimeMedia = data && data.Media;

  useEffect(() => scrollTo({ top: 0 }), []);

  if (loading) return <CircularLoading />;

  return (
    <div className="flex flex-col justify-between min-h-screen">
      {anime.bannerImage ? (
        <img
          src={anime.bannerImage}
          className="h-48 md:h-80 w-full object-cover object-center opacity-0"
          alt="anime banner image"
          loading="lazy"
          style={{ opacity: 0, transitionDuration: "900ms" }}
          onLoad={(t) => (t.currentTarget.style.opacity = "1")}
        />
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
          <img
            src={anime.coverImage.large}
            alt={anime.title.romaji}
            className={`ml-4 rounded w-28 md:w-52 z-10 shadow-xl place-self-start ${
              anime.bannerImage && "md:-mt-28"
            }`}
            loading="lazy"
            style={{ opacity: 0, transition: "all 600ms" }}
            onLoad={(t) => (t.currentTarget.style.opacity = "1")}
          />

          <div className="flex flex-1 flex-col gap-1">
            <h1 className="text-xl text-zinc-600 md:self-start md:break-words px-4">
              {anime.title.romaji}
            </h1>

            <div className="flex gap-2 px-4">
              {anime.seasonYear && (
                <>
                  <span className="text-sky-700 font-medium">
                    {anime.seasonYear}
                  </span>
                  {"·"}
                </>
              )}

              <div className="flex gap-1">
                {anime.format && (
                  <>
                    <span>{anime.format}</span>
                  </>
                )}

                {anime.episodes && (
                  <>
                    {"·"}
                    <span>{`${anime.episodes} ${
                      anime.episodes > 1 ? "episodes" : "episode"
                    }`}</span>
                  </>
                )}
              </div>
            </div>

            <ul className="flex gap-2 flex-wrap px-4">
              {anime.genres.map((genre) => (
                <li
                  key={genre}
                  className="bg-emerald-700 font-medium text-zinc-200 text-sm py-1 px-2 rounded"
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
                  <img
                    src={character.image.medium}
                    alt={character.name.full}
                    style={{ opacity: 0, transitionDuration: "900ms" }}
                    onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                    className="min-w-[80px] h-[80px] object-cover rounded-full"
                  />

                  <span className="text-xs text-main font-medium max-w-[80px] text-center mx-auto">
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
              <span className="text-sm min-w-[128px]">Romaji</span>
              <div className="flex-1">
                <span className="text-sm text-main text-justify cursor-pointer">
                  {anime.title.romaji}
                </span>
              </div>
            </div>

            {anime.title.english && (
              <div className="flex flex-wrap gap-y-2 gap-x-4">
                <span className="text-sm min-w-[128px]">English</span>
                <div className="flex-1">
                  <span className="text-sm text-main text-justify cursor-pointer">
                    {anime.title.english}
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-y-2 gap-x-4">
              <span className="text-sm min-w-[128px]">Native</span>
              <div className="flex-1">
                <span className="text-sm text-main text-justify cursor-pointer">
                  {anime.title.native}
                </span>
              </div>
            </div>

            {anime.synonyms.length > 0 && (
              <div className="flex flex-wrap gap-y-2 gap-x-4">
                <span className="text-sm min-w-[128px]">Synonyms</span>
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
              <span className="text-sm min-w-[128px]">Format</span>

              <span className="flex-1 text-sm text-zinc-600">
                {anime.format}
              </span>
            </div>

            <div className="flex flex-wrap gap-y-2 gap-x-4">
              <span className="text-sm min-w-[128px]">Episodes</span>

              <span className="flex-1 text-sm text-zinc-600">
                {anime.episodes ? anime.episodes : "?"}
              </span>
            </div>

            {anime.duration && (
              <div className="flex flex-wrap gap-y-2 gap-x-4">
                <span className="text-sm min-w-[128px]">Episode Duration</span>

                <span className="flex-1 text-sm text-zinc-600">
                  {anime.duration}
                  {anime.duration > 1 ? " mins" : " min"}
                </span>
              </div>
            )}

            <div className="flex flex-wrap gap-y-2 gap-x-4">
              <span className="text-sm leading-none min-w-[128px]">Source</span>

              <span className="text-sm leading-none">
                {anime.source.replace("_", " ")}
              </span>
            </div>

            <div className="flex flex-wrap gap-y-2 gap-x-4">
              <span className="text-sm min-w-[128px]">Status</span>

              <span className="flex-1 text-sm text-zinc-600">
                {anime.status.replaceAll("_", " ")}
              </span>
            </div>

            <div className="flex flex-wrap gap-y-2 gap-x-4">
              <span className="text-sm min-w-[128px]">Start Date</span>

              {anime.startDate.day &&
              anime.startDate.month &&
              anime.startDate.year ? (
                <span className="flex-1 text-sm text-zinc-600">
                  {`${anime.startDate.year} ${
                    monthsShort[anime.startDate.month]
                  } ${anime.startDate.day}`}
                </span>
              ) : (
                "?"
              )}
            </div>

            <div className="flex flex-wrap gap-y-2 gap-x-4">
              <span className="text-sm min-w-[128px]">End Date</span>
              {anime.endDate.day &&
              anime.endDate.month &&
              anime.endDate.year ? (
                <span className="flex-1 text-sm text-zinc-600">
                  {`${anime.endDate.year} ${monthsShort[anime.endDate.month]} ${
                    anime.endDate.day
                  }`}
                </span>
              ) : (
                "?"
              )}
            </div>

            {anime.season && anime.seasonYear && (
              <div className="flex flex-wrap gap-y-2 gap-x-4">
                <span className="text-sm min-w-[128px]">Season</span>

                <span className="flex-1 text-sm text-main cursor-pointer">
                  {`${anime.season} ${anime.seasonYear}`}
                </span>
              </div>
            )}
          </div>

          <MyDivider />

          <StudiosList studios={anime.studios.edges} />

          <MyDivider />

          <TagsList tags={anime.tags} />
        </div>
      </div>

      <Footer />
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
            className={`flex justify-center bg-zinc-100/70 ${
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
  function sortByIsMainStudio(a: { isMain: boolean }, b: { isMain: boolean }) {
    if (a.isMain && !b.isMain) return -1;

    if (!a.isMain && b.isMain) return 1;

    return 0;
  }

  const animationStudios = studios.filter(
    (studio) => studio.node.isAnimationStudio
  );

  animationStudios.sort(sortByIsMainStudio);

  const producers = studios.filter((studio) => !studio.node.isAnimationStudio);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-y-2 gap-x-4">
        <span className="text-sm min-w-[128px]">Studios</span>

        <div className="flex flex-col gap-1">
          {animationStudios.length > 0
            ? animationStudios.map((studio) => (
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
        <span className="text-sm min-w-[128px]">Producers</span>

        <div className="flex flex-col gap-1">
          {producers.length > 1
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
            className="text-rose-600 text-sm md:text-base"
            onClick={() => setShowSpoilerTags(!showSpoilerTags)}
          >
            {showSpoilerTags ? "Hide Spoiler" : "Show Spoiler"}
          </button>
        )}
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        {tags.map((tag) => {
          if (!tag.isMediaSpoiler || showSpoilerTags) {
            return (
              <div key={tag.id} className="flex justify-between">
                <span
                  className={`${
                    tag.isMediaSpoiler ? "text-main" : "text-zinc-600"
                  } text-sm`}
                >
                  {tag.name}
                </span>

                <span
                  className={`${
                    tag.isMediaSpoiler ? "text-main" : "text-zinc-600"
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
