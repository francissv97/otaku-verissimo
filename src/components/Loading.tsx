import { Fade, Grow, Zoom } from "@mui/material";
import { CircleNotch } from "phosphor-react";

export function CircularLoading() {
  return (
    <Fade in timeout={800}>
      <div className="fixed top-0 z-20 flex h-full w-full items-center justify-center backdrop-blur-sm duration-100">
        <div className="h-24 w-24 rounded-full shadow-lg">
          <CircleNotch weight="light" className="h-24 w-24 animate-spin text-orange-600" />
        </div>
      </div>
    </Fade>
  );
}

export function CardSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }, (v, k) => k).map((item) => (
        <Grow in timeout={400} key={item}>
          <div className="flex animate-pulse flex-col gap-1">
            <div className="h-52 rounded bg-zinc-400 md:h-60" />

            <span className="h-[10%] rounded bg-zinc-400"></span>
          </div>
        </Grow>
      ))}
    </>
  );
}

export function HorizontalCardSkeleton() {
  return (
    <>
      {Array.from({ length: 2 }, (v, k) => k).map((item) => (
        <Grow in timeout={400} key={item}>
          <div className="flex animate-pulse flex-col gap-1">
            <div className="h-32 rounded bg-zinc-400" />
          </div>
        </Grow>
      ))}
    </>
  );
}

export function StaffCharactersSkeleton() {
  return (
    <Grow in timeout={600}>
      <div className="flex animate-pulse flex-col gap-4">
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
              <div className="aspect-[6_/_9] h-full w-full rounded bg-zinc-400" />

              <div className="h-5 rounded bg-zinc-400" />
            </div>
          ))}
        </div>
      </div>
    </Grow>
  );
}

export function StaffAnimeStaffRolesSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }, (v, k) => k).map((item) => (
        <Grow in timeout={400} key={item}>
          <div className="flex animate-pulse flex-col gap-1">
            <div className="aspect-[6_/_9] rounded bg-zinc-400" />

            <div className="h-4 rounded bg-zinc-400" />
            <div className="h-4 rounded bg-zinc-400" />
            <div className="h-4 rounded bg-zinc-400" />
          </div>
        </Grow>
      ))}
    </>
  );
}
