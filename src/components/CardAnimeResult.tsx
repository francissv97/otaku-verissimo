import { Link } from "react-router-dom";
import { Grow, useMediaQuery } from "@mui/material";
import { AnimeMediaResults } from "../types";
import * as HoverCard from "@radix-ui/react-hover-card";
import { Smiley, SmileyMeh, SmileySad } from "phosphor-react";

type CardAnimeResultProps = {
  anime: AnimeMediaResults;
};

type CardAnimeResultPopoverProps = {
  anime: AnimeMediaResults;
};

export function CardAnimeResult({ anime }: CardAnimeResultProps) {
  const screenSizeMatches = useMediaQuery("(min-width:768px)");

  return (
    <HoverCard.Root key={anime.id} openDelay={0} closeDelay={0}>
      <HoverCard.Trigger className="relative" asChild>
        <Link to={`/anime/${anime.id}`}>
          <div className="group cursor-pointer flex flex-col">
            <div className="relative h-48 md:h-60 mb-2 bg-main/80 rounded overflow-hidden shadow-md shadow-zinc-400/70">
              <img
                src={anime.coverImage.large}
                alt={anime.title.romaji}
                className="w-full h-full object-cover object-center group-hover:border-main"
                loading="lazy"
                style={{
                  opacity: 0,
                  transform: "scale(0.86)",
                  transitionDuration: "200ms",
                }}
                onLoad={(t) => (
                  (t.currentTarget.style.opacity = "1"),
                  (t.currentTarget.style.transform = "initial")
                )}
              />

              <div className="absolute top-0 bg-gradient-to-br rounded from-main/60 via-transparent to-transparent h-full w-0 group-hover:w-full duration-100"></div>
            </div>

            <span className="block text-md leading-none text-zinc-600 line-clamp-2 group-hover:text-main duration-100">
              {anime.title.romaji}
            </span>
          </div>
        </Link>
      </HoverCard.Trigger>

      {screenSizeMatches && (
        <HoverCard.Portal>
          <HoverCard.Content
            className="pointer-events-none"
            side="right"
            align="start"
            sideOffset={14}
          >
            <CardAnimeResultPopover anime={anime} />
          </HoverCard.Content>
        </HoverCard.Portal>
      )}
    </HoverCard.Root>
  );
}

function CardAnimeResultPopover({ anime }: CardAnimeResultPopoverProps) {
  const { episodes, studios, averageScore, season, seasonYear, format } = anime;

  const studio = studios.nodes.length > 0 ? studios.nodes[0].name : null;
  const genres =
    anime.genres.length > 3 ? anime.genres.slice(0, 3) : anime.genres;

  return (
    <Grow in>
      <div className="flex flex-col gap-1 w-72 p-4 bg-gradient-to-t from-[#bbb] via-zinc-50 to-zinc-100 rounded shadow-xl -mt-1">
        <div className="flex justify-between items-center">
          {!(!season || !seasonYear) && (
            <div className="flex gap-1 justify-center items-center">
              <span className="font-medium text-zinc-500 text-sm">
                {season}
              </span>

              <span className="font-medium text-second text-sm">
                {seasonYear}
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

              <span className="text-zinc-600 font-mono text-sm">
                {averageScore + "%"}
              </span>
            </div>
          )}
        </div>

        {studio && (
          <span className="font-medium text-main text-sm">{studio}</span>
        )}

        <div>
          <span className="text-zinc-600 text-sm">{format}</span>

          {episodes && (
            <>
              <span className="mx-1">·</span>
              <span className="text-sm text-zinc-700">
                {episodes + `${episodes > 1 ? " episodes" : " episode"}`}
              </span>
            </>
          )}
        </div>

        <div className="flex justify-center items-center gap-2 w-fit flex-wrap">
          {genres.map((genre) => (
            <span
              key={genre}
              className="bg-gradient-to-t from-emerald-800 via-emerald-700 to-emerald-400 py-1 px-2 font-medium text-zinc-100 text-xs rounded"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </Grow>
  );
}
