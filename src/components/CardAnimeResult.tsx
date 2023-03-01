import { Link } from "react-router-dom";
import { CardMedia, Fade, Grow, useMediaQuery } from "@mui/material";
import { AnimeMediaDefaultFields } from "../types";
import * as HoverCard from "@radix-ui/react-hover-card";
import { PopoverResults } from "./PopoverResults";
import { MyCoverImage } from "./MyComponents";

type CardAnimeResultProps = {
  anime: AnimeMediaDefaultFields;
};

export function CardAnimeResult({ anime }: CardAnimeResultProps) {
  const screenSizeMatches = useMediaQuery("(min-width:768px)");

  return (
    <HoverCard.Root key={anime.id} openDelay={0} closeDelay={0}>
      <HoverCard.Trigger asChild>
        <Link to={`/anime/${anime.id}`}>
          <Grow in timeout={800}>
            <div className="group duration-200 cursor-pointer flex flex-col">
              <div className="relative h-52 md:h-60 mb-2">
                <img
                  src={anime.coverImage.large}
                  alt={anime.title.romaji}
                  className="w-full h-full rounded object-cover object-center duration-200 group-hover:border-main"
                  loading="lazy"
                  style={{ opacity: 0, transitionDuration: "400ms" }}
                  onLoad={(t) => {
                    t.currentTarget.style.opacity = "1";
                  }}
                />

                <div className="absolute top-0 bg-gradient-to-br rounded from-main/60 via-transparent to-transparent h-full w-0 group-hover:w-full duration-100"></div>
              </div>

              <span className="block text-sm md:text-base text-zinc-600 truncate group-hover:text-main duration-100">
                {anime.title.romaji}
              </span>
            </div>
          </Grow>
        </Link>
      </HoverCard.Trigger>

      <HoverCard.Portal>
        <HoverCard.Content side="right" align="start" sideOffset={14}>
          {screenSizeMatches && <PopoverResults anime={anime} />}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
