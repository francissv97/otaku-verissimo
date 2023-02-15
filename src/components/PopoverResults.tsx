import { Smiley, SmileyMeh, SmileySad } from "phosphor-react";
import { AnimeMediaDefaultFields } from "../types";
import { Space } from "./Space";

type PopoverResultsProps = {
  anime: AnimeMediaDefaultFields;
};

export function PopoverResults({ anime }: PopoverResultsProps) {
  const { episodes, studios, averageScore, season, seasonYear } = anime;

  const studio = studios.nodes[0].name;
  const format = anime.format == "TV" ? "TV SHOW" : anime.format;
  const genres =
    anime.genres.length > 3 ? anime.genres.slice(0, 3) : anime.genres;

  return (
    <div className="flex flex-col w-64 p-4">
      <div className="flex justify-between">
        <span className="text-zinc-600 text-sm">
          {season + " " + seasonYear}
        </span>

        {averageScore && (
          <div className="flex gap-1 items-center">
            {averageScore >= 72 ? (
              <Smiley size={22} className="text-green-600" />
            ) : averageScore < 72 && averageScore >= 60 ? (
              <SmileyMeh size={22} className="text-amber-500" />
            ) : (
              <SmileySad size={22} className="text-rose-500" />
            )}

            <span className="text-zinc-600 text-sm">{averageScore + "%"}</span>
          </div>
        )}
      </div>

      <Space />

      <span className="text-sky-700 text-sm">{studio}</span>

      <Space />

      <div>
        <span className="text-zinc-600 text-xs">{format}</span>

        {episodes && (
          <>
            <span className="mx-1">·</span>
            <span className="text-zinc-700">
              {episodes + `${episodes > 1 ? " episodes" : " episode"}`}
            </span>
          </>
        )}
      </div>

      <Space />

      <div className="flex gap-2 w-fit flex-wrap">
        {genres.map((genre) => (
          <span
            key={genre}
            className="bg-orange-700 p-1 text-zinc-100 text-xs rounded"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>
  );
}
