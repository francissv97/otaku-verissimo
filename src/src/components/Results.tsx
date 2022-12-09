import { GetAnimeInfoQueryResponse } from "../types/handleTypes";
import { Loading } from "./Loading";

interface Props {
  title: string;
  data: GetAnimeInfoQueryResponse | undefined;
}

export function Results({ title, data }: Props) {
  const animes = data && data.Page.media;

  return (
    <>
      {!animes ? (
        <Loading />
      ) : (
        <div className="px-2 max-w-screen-xl mx-auto shadow-2xl rounded pb-5 mb-10">
          <div className="flex justify-between">
            <h2 className="my-4 text-zinc-600 text-md font-mainCondensed font-medium uppercase">
              {title}
            </h2>

            <button className="uppercase bg-gray-600 text-gray-200 px-2 h-fit my-auto rounded text-sm font-medium hover:text-main duration-300">
              {"view all"}
            </button>
          </div>

          <div className="grid gap-x-3 gap-y-5 justify-items-center grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(190px,1fr))] max-w-5xl mx-auto">
            {animes.map(({ id, title, coverImage }) => (
              <div key={id} className="w-full group duration-200">
                <img
                  src={coverImage.large}
                  alt={`${title}`}
                  className="rounded-md group-hover:scale-105 w-full h-[90%] object-cover object-center mb-2 duration-300"
                />
                <p className="text-sm text-zinc-600 truncate group-hover:text-main duration-300">
                  {title.romaji}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
