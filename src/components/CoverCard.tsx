import { Link } from "react-router-dom";
import { Grow, useMediaQuery } from "@mui/material";
import * as HoverCard from "@radix-ui/react-hover-card";
import { Smiley, SmileyMeh, SmileySad } from "phosphor-react";
import { PageMediaResultQuery } from "@/types";

interface CoverCardProps {
  anime: PageMediaResultQuery;
}

interface CoverCardPopoverProps {
  anime: PageMediaResultQuery;
}

export function CoverCard({ anime }: CoverCardProps) {
  const screenSizeMatches = useMediaQuery("(min-width:768px)");

  return (
    <HoverCard.Root key={anime.id} openDelay={0} closeDelay={0}>
      <HoverCard.Trigger className="relative" asChild>
        <Link to={`/anime/${anime.id}`}>
          <div className="group flex h-full cursor-pointer flex-col">
            <div className="relative mb-3 overflow-hidden rounded-lg shadow-md">
              <img
                src={anime.coverImage.large}
                alt={anime.title.romaji}
                className="aspect-[6/9] h-full w-full object-cover object-center bg-pink-500"
                loading="lazy"
                style={{
                  opacity: 0,
                  transitionDuration: "600ms",
                }}
                onLoad={(t) => (t.currentTarget.style.opacity = "1")}
              />
            </div>

            <span className="line-clamp-2 min-h-[28px] text-[14px] font-medium leading-none duration-100 group-hover:text-main">
              {anime.title.romaji}
            </span>
          </div>
        </Link>
      </HoverCard.Trigger>

      {screenSizeMatches && (
        <HoverCard.Portal>
          <HoverCard.Content
            className="pointer-events-none z-10"
            side="right"
            align="start"
            sideOffset={14}
          >
            <CoverCardPopover anime={anime} />
          </HoverCard.Content>
        </HoverCard.Portal>
      )}
    </HoverCard.Root>
  );
}

function CoverCardPopover({ anime }: CoverCardPopoverProps) {
  const { episodes, studios, averageScore, season, seasonYear, format, startDate } = anime;

  const genres = anime.genres.length > 3 ? anime.genres.slice(0, 3) : anime.genres;

  const { __typename, ...restStartDate } = startDate;

  const isTBA = !Object.values(restStartDate).some((item) => item != null);

  return (
    <Grow in timeout={200}>
      <div className="-mt-1 flex w-72 flex-col gap-1 rounded-lg border-b-4 border-main bg-gradient-to-t from-zinc-950 via-zinc-800 to-zinc-700 p-4 shadow-xl">
        <div className="flex items-center justify-between">
          {!isTBA && (
            <div className="flex items-center justify-center">
              {season && <span className="peer text-sm font-medium">{season}</span>}

              <span className="text-sm font-medium text-sky-400 peer-[]:ml-2">
                {seasonYear || startDate.year}
              </span>
            </div>
          )}

          {averageScore && (
            <div className="flex items-center justify-center">
              {averageScore >= 72 ? (
                <Smiley className="text-[26px] text-green-600" />
              ) : averageScore < 72 && averageScore >= 60 ? (
                <SmileyMeh className="text-[26px] text-amber-500" />
              ) : (
                <SmileySad className="text-[26px] text-red-500" />
              )}

              <span className="font-mono text-sm">{averageScore + "%"}</span>
            </div>
          )}
        </div>

        {isTBA && <span className="text-sm font-medium text-rose-600">TBA</span>}

        {studios.nodes.length > 0 && (
          <div>
            {studios.nodes.map((studio, index, array) => (
              <span key={index} className="text-sm font-medium text-main">
                {studio.name}
                {index != array.length - 1 && ", "}
              </span>
            ))}
          </div>
        )}

        <div>
          {format && <span className="text-sm">{format.replaceAll("_", " ")}</span>}

          {episodes && (
            <>
              <span className="mx-1">·</span>
              <span className="text-sm">{episodes + `${episodes > 1 ? " episodes" : " episode"}`}</span>
            </>
          )}
        </div>

        <div className="flex w-fit flex-wrap items-center justify-center">
          {genres.map((genre) => (
            <span
              key={genre}
              className="peer py-1 text-sm font-medium text-emerald-400 peer-[]:before:mx-1 peer-[]:before:rounded-full peer-[]:before:bg-zinc-500 peer-[]:before:text-transparent peer-[]:before:content-['.']"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </Grow>
  );
}
