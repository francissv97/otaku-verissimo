import { MagnifyingGlass } from '@phosphor-icons/react'

export function AnimeListHeader() {
  return (
    <div className="fixed left-0 right-0 top-0 z-30 h-14 bg-zinc-950/50 px-4 backdrop-blur sm:block md:ml-14">
      <div className="group mx-auto flex h-full w-full max-w-5xl items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-xl font-medium uppercase text-main">anime list</span>
        </div>

        <div className="flex items-center gap-2 opacity-0">
          <div className="group flex h-14 w-14 cursor-pointer items-center justify-center">
            <MagnifyingGlass
              size={24}
              weight="bold"
              className="group text-zinc-400 group-hover:text-zinc-200"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
