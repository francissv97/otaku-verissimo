import shortLogo from '@/assets/logo-short.svg'

export function DefaultLoading() {
  return (
    <div className="flex w-full animate-pulse flex-col items-center justify-center p-4 opacity-40">
      <img src={shortLogo} alt="ov logo" className="w-16" />

      <span className="text-xl font-medium">Loading...</span>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div id="card-skeleton" className="inline">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex animate-pulse flex-col gap-1">
          <div className="h-52 rounded bg-zinc-400 md:h-60" />

          <span className="h-[10%] rounded bg-zinc-400"></span>
        </div>
      ))}
    </div>
  )
}

export function HorizontalCardSkeleton() {
  return (
    <div id="horizontal-card-skeleton">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="flex animate-pulse flex-col gap-1">
          <div className="h-32 rounded bg-zinc-400" />
        </div>
      ))}
    </div>
  )
}

export function StaffCharactersSkeleton() {
  return (
    <div id="staff-characters-skeleton" className="flex animate-pulse flex-col gap-4">
      <div className="flex gap-2">
        <div className="h-24 w-24 rounded-full bg-zinc-400 shadow-lg md:h-28 md:w-28" />

        <div className="flex flex-1 flex-col justify-center gap-1">
          <div className="h-5 w-full rounded bg-zinc-400" />

          <div className="h-5 w-[80%] rounded bg-zinc-400 " />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] justify-between gap-x-4 gap-y-4 md:grid-cols-[repeat(auto-fill,176px)]">
        {Array.from({ length: 6 }, (v, k) => k).map((item) => (
          <div key={item} className="flex flex-col gap-2">
            <div className="aspect-[6/9] h-full w-full rounded bg-zinc-400" />

            <div className="h-5 rounded bg-zinc-400" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function StaffRolesSkeleton() {
  return (
    <div id="staff-roles-skeleton">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex animate-pulse flex-col gap-1">
          <div className="aspect-[6/9] rounded bg-zinc-400" />

          <div className="h-4 rounded bg-zinc-400" />
          <div className="h-4 rounded bg-zinc-400" />
          <div className="h-4 rounded bg-zinc-400" />
        </div>
      ))}
    </div>
  )
}
