import { Grow } from "@mui/material";
import { CircleNotch } from "phosphor-react";

export function CircularLoading() {
  return (
    <div className="fixed top-0 flex justify-center items-center h-full w-full">
      <CircleNotch
        className="w-20 h-20 animate-spin text-main"
        weight="light"
      />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }, (v, k) => k).map((item) => (
        <div
          key={item}
          className="cursor-pointer flex flex-col gap-1 animate-pulse"
        >
          <div className="h-48 md:h-52 lg:h-56 bg-zinc-400 rounded" />

          <span className="h-[10%] bg-zinc-400 rounded"></span>
        </div>
      ))}
    </>
  );
}
