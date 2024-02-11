import { useAuth } from "@/hooks/use-auth";
import { BottomNavigation } from "@/components/bottom-navigation";
import { TMediaListCollection } from "@/types/t-media-list-collection";
import { AnimeListHeader } from "./anime-list-header";

export function AnimeList() {
  const { user } = useAuth();

  const userMediaListCollection = JSON.parse(
    localStorage.getItem("USER_MEDIA_LIST_COLLECTION_MOCK")!,
  ).MediaListCollection as TMediaListCollection;

  // const { data, loading, error } = useQuery(
  //   GET_USER_MEDIA_LIST_COLLECTION_QUERY,
  //   {
  //     variables: { userId: user?.id },
  //     onCompleted(data) {
  //       localStorage.setItem("USER_MEDIA_LIST_COLLECTION_MOCK", JSON.stringify(data.MediaListCollection))
  //     },
  //   },
  // );

  // if (data) console.log(data);

  return (
    <div className="flex flex-col pb-14">
      <AnimeListHeader />

      <div className="mx-auto mt-14 flex w-full max-w-5xl flex-col gap-4 px-4">
        {/* <select className="bg-transparent">
          {userMediaListCollection.lists.map((listName) => (
            <option key={listName.name} value={listName.name}>
              {listName.name}
            </option>
          ))}
        </select> */}

        {userMediaListCollection.lists.map((list) => (
          <div key={list.name} className="">
            <span className="text-2xl leading-10">{list.name}</span>

            <div className="flex flex-col gap-4">
              {list.entries.map(
                (entry) =>
                  !entry.media.isAdult && (
                    <div
                      key={entry.media.id}
                      className="flex overflow-hidden rounded bg-zinc-700"
                    >
                      <img
                        src={entry.media.coverImage.large}
                        alt={entry.media.title.userPreferred}
                        className="w-24"
                      />

                      <div className="flex w-full flex-col">
                        <div className="flex flex-1 flex-col gap-y-1 pl-2 pt-2">
                          <span className="line-clamp-2 text-sm font-medium text-main invert">
                            {entry.media.title.userPreferred}
                          </span>

                          <span className="text-sm">
                            {entry.media.format.replaceAll("_", " ")}
                          </span>

                          <div className="flex w-full flex-1 items-end justify-end gap-2 self-end text-sm">
                            <span className="p-2">
                              {`${entry.progress} / ${entry.media.episodes}`}
                            </span>

                            <button className=" rounded-ss-lg bg-zinc-300 px-3 py-2 text-zinc-800">
                              +1 EP
                            </button>
                          </div>
                        </div>

                        <div
                          className="h-[0.35rem] bg-main"
                          style={{
                            width: `${(entry.progress / entry.media.episodes) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        ))}
      </div>

      <BottomNavigation active="animeList" />

      {/* {loading && <span className="text-xl">Loading...</span>} */}
    </div>
  );
}
