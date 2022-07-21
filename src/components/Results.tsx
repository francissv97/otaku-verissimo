import { GetAnimeInfoQueryResponse } from "../types/handleTypes";
import { Loading } from "./Loading";
import logo from "../assets/header-logo.png";

interface ResultsType {
  title: string;
  data: GetAnimeInfoQueryResponse | undefined;
}

export function Results({ title, data }: ResultsType) {
  const treatTitle = (title: string) => {
    if (title.length >= 40) {
      return title.substring(0, 36) + " ...";
    }

    return title;
  };

  if (!data) {
    return (
      <div className="p-4 max-w-screen-lg mx-auto">
        <Loading />;
      </div>
      
      // <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
      //   <div className="animate-pulse flex space-x-4">
      //     <div className="rounded-full bg-slate-700 h-10 w-10"></div>
      //     <div className="flex-1 space-y-6 py-1">
      //       <div className="h-2 bg-slate-700 rounded"></div>
      //       <div className="space-y-3">
      //         <div className="grid grid-cols-3 gap-4">
      //           <div className="h-2 bg-slate-700 rounded col-span-2"></div>
      //           <div className="h-2 bg-slate-700 rounded col-span-1"></div>
      //         </div>
      //         <div className="h-2 bg-slate-700 rounded"></div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }

  return (
    <div className="px-2 max-w-screen-xl mx-auto shadow-2xl pb-10 rounded-b-3xl mb-10">
      <h2 className="my-4 text-gray-500 text-md font-mainCondensed font-medium uppercase">
        {title}
      </h2>

      <div className="grid gap-x-4 gap-y-5 justify-items-center grid-cols-[repeat(auto-fill,minmax(125px,1fr))] max-w-4xl mx-auto">
        {data?.Page.media.map((a) => {
          return (
            <div key={a.id} className="w-full">
              {!a.coverImage.large ? (
                <button className="p-5 bg-slate-600 w-full h-full">
                  CARREGANDO...
                </button>
              ) : (
                <img
                  src={a.coverImage.large}
                  alt={`${a.title}`}
                  className="rounded-md hover:scale-105 duration-200 h-5/6 w-full object-cover object-center"
                />
              )}

              <p className="text-sm mt-2 text-gray-500">
                {treatTitle(a.title.romaji)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
