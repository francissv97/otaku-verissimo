import { Fade, Grow, Zoom } from "@mui/material";
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
