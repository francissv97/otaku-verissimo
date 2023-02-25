import { useNavigate } from "react-router-dom";
import { Popover } from "antd";
import { AnimeMediaDefaultFields } from "../types";
import { Loading } from "./Loading";
import { PopoverResults } from "./PopoverResults";
import { useEffect, useState } from "react";

type SectionResultProps = {
  data: AnimeMediaDefaultFields[] | undefined;
};

export function Results({ data }: SectionResultProps) {
  const [screenSize, getDimension] = useState(window.innerWidth);
  const navigate = useNavigate();
  const animes = data && data;

  function setDimension() {
    getDimension(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  return (
    <div className="p-2 max-w-5xl mx-auto">
      <div className="grid gap-x-4 gap-y-6 grid-cols-[repeat(auto-fill,minmax(114px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(132px,1fr))]">
        {animes?.map((anime) => (
          <Popover
            placement="rightTop"
            key={anime.id}
            mouseEnterDelay={0}
            mouseLeaveDelay={0}
            showArrow={false}
            overlayInnerStyle={{
              borderRadius: 4,
              padding: 0,
              marginInline: -1
            }}
            content={screenSize > 770 && <PopoverResults anime={anime} />}
          >
            <div
              onClick={() => {
                navigate(`/anime/${anime.id}`);
              }}
              className="group  duration-200 cursor-pointer flex flex-col gap-1"
            >
              <div className="relative h-48 md:h-52 lg:h-56">
                <img
                  src={anime.coverImage.large}
                  alt={anime.title.romaji}
                  className="w-full h-full rounded object-cover object-center duration-200 group-hover:border-main mx-auto"
                />
                <div className="absolute top-0 bg-gradient-to-br rounded from-main/60 via-transparent to-transparent h-full w-0 group-hover:w-full duration-100"></div>
              </div>

              <span className="block h-[10%] text-sm md:text-base text-zinc-600 truncate group-hover:text-main duration-100">
                {anime.title.romaji}
              </span>
            </div>
          </Popover>
        ))}
      </div>
    </div>
  );
}
