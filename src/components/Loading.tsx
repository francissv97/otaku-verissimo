import { Grow, Zoom } from "@mui/material";
import { CircleNotch } from "phosphor-react";

export function CircularLoading() {
  return (
    <Zoom in timeout={300}>
      <div className="fixed z-20 top-0 flex justify-center items-center h-full w-full">
        <div className="w-24 h-24 rounded-full bg-zinc-50 shadow-lg">
          <CircleNotch
            weight="light"
            className="w-24 h-24 text-orange-400 animate-spin"
          />
        </div>
      </div>
    </Zoom>
  );
}

export function CardSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }, (v, k) => k).map((item) => (
        <Grow in timeout={400} key={item}>
          <div className="flex flex-col gap-1 animate-pulse">
            <div className="h-52 md:h-60 bg-zinc-400 rounded" />

            <span className="h-[10%] bg-zinc-400 rounded"></span>
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
          <div className="flex flex-col gap-1 animate-pulse">
            <div className="h-32 bg-zinc-400 rounded" />
          </div>
        </Grow>
      ))}
    </>
  );
}

export function StaffCharactersSkeleton() {
  return (
    <Grow in timeout={600}>
      <div className="flex flex-col gap-4 animate-pulse">
        <div className="flex gap-2">
          <div className="bg-zinc-400 rounded-full shadow-lg w-24 h-24 md:w-28 md:h-28" />

          <div className="flex flex-col flex-1 gap-1 justify-center">
            <div className="bg-zinc-400 w-full h-5 rounded" />

            <div className="bg-zinc-400 w-[80%] h-5 rounded " />
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(110px,1fr))] md:grid-cols-[repeat(auto-fill,176px)] gap-y-4 gap-x-4 justify-between">
          {Array.from({ length: 6 }, (v, k) => k).map((item) => (
            <div key={item} className="flex flex-col gap-2">
              <div className="bg-zinc-400 w-full h-full aspect-[6_/_9] rounded" />

              <div className="bg-zinc-400 h-5 rounded" />
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
          <div className="flex flex-col gap-1 animate-pulse">
            <div className="aspect-[6_/_9] bg-zinc-400 rounded" />

            <div className="h-4 bg-zinc-400 rounded" />
            <div className="h-4 bg-zinc-400 rounded" />
            <div className="h-4 bg-zinc-400 rounded" />
          </div>
        </Grow>
      ))}
    </>
  );
}
