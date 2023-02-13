import { Popover } from "antd";
import { useNavigate } from "react-router-dom";
import { AnimeMediaResults, ViewAllParams } from "../types";
import { Loading } from "./Loading";
import { PopoverResults } from "./PopoverResults";

type SectionResultProps = {
  data: { Page: { media: AnimeMediaResults[] } } | undefined;
  title: string;
  navigateParamViewAll: ViewAllParams;
};

export function SectionResults({
  title,
  navigateParamViewAll,
  data,
}: SectionResultProps) {
  const navigate = useNavigate();
  const animes = data && data.Page.media;

  return !animes ? (
    <Loading />
  ) : (
    <div className="px-2 w-fit mx-auto pb-5 mb-10">
      <div className="flex justify-between">
        <strong className="my-4 text-zinc-600 text-md font-main font-medium uppercase">
          {title}
        </strong>

        <button
          onClick={() => navigate(`/${navigateParamViewAll}`)}
          className="uppercase text-gray-600 px-2 h-fit my-auto rounded text-sm hover:text-main hover:rotate-3 font-medium duration-100"
        >
          view all
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-fit">
        {animes.map((anime) => (
          <Popover
            placement="rightTop"
            key={anime.id}
            mouseEnterDelay={0}
            mouseLeaveDelay={0}
            showArrow={false}
            autoAdjustOverflow
            destroyTooltipOnHide
            overlayStyle={{ padding: "0 12px" }}
            overlayInnerStyle={{ borderRadius: 4, padding: 0 }}
            content={<PopoverResults anime={anime} />}
          >
            <div
              onClick={() => {
                navigate(`/anime/${anime.id}`);
              }}
              className="max-w-[180px] group duration-200 cursor-pointer"
            >
              <img
                src={anime.coverImage.large}
                alt={anime.title.romaji}
                className="h-[90%] w-full rounded-md object-cover object-center mb-2 duration-100 group-hover:rotate-2 group-hover:-translate-y-2"
              />

              <p className="h-[10%] text-sm text-zinc-600 truncate group-hover:text-main duration-100">
                {anime.title.romaji}
              </p>
            </div>
          </Popover>
        ))}
      </div>

      <div className="absolute left-0 h-[2rem] w-[100vw] shadow-xl shadow-[#bbb]"></div>
    </div>
  );
}
