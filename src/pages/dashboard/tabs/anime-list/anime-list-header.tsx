import { MagnifyingGlass } from "@phosphor-icons/react";

export function AnimeListHeader() {
  return (
    <div className="md:ml-14 fixed left-0 right-0 top-0 z-30 h-14 bg-zinc-950/50 backdrop-blur sm:block"
    >
      <div className="group mx-auto flex h-full w-full max-w-5xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <span className="font-sans text-2xl text-main">Anime List</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-14 w-14 cursor-pointer items-center justify-center hover:bg-white/5">
            <MagnifyingGlass
              size={24}
              weight="bold"
              className="text-zinc-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
