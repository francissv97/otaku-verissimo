import { GetAnimeInfoQueryResponse } from "../types/handleTypes";
import { Loading } from "./Loading";

interface ResultsType {
  title: string;
  data: GetAnimeInfoQueryResponse | undefined;
}

export function Results({ title, data }: ResultsType) {
  const animes = data && data.Page.media;

  return (
    <>
      {!animes ? (
        <Loading />
      ) : (
        <div className="px-2 max-w-screen-lg mx-auto shadow-2xl rounded pb-5 mb-10">
          <div className="flex justify-between">
            <h2 className="my-4 text-zinc-600 text-md font-mainCondensed font-medium uppercase">
              {title}
            </h2>

            <button className="hidden uppercase bg-gray-600 text-gray-200 px-2 h-fit my-auto rounded text-sm font-medium hover:text-main duration-200">
              ver tudo
            </button>
          </div>

          <div className="grid gap-x-4 gap-y-5 justify-items-center grid-cols-[repeat(auto-fill,minmax(160px,1fr))] max-w-4xl mx-auto">
            {animes.map((anime) => {
              return (
                <div key={anime.id} className="w-full group cursor-pointer">
                  <img
                    src={anime.coverImage.large}
                    alt={`${anime.title}`}
                    className="rounded-md group-hover:scale-105 w-full h-5/6 object-cover object-center mb-2 transition-all"
                  />
                  <p className="text-sm text-zinc-600 truncate transition-all group-hover:text-main">
                    {anime.title.romaji}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
