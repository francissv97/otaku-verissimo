import { Circle, CircleDashed, CircleNotch } from "phosphor-react";

export function Loading() {
  return (
    <div className="max-w-screen-lg m-auto py-32 flex justify-center items-center gap-2 w-full h-full rounded-xl">
      <CircleNotch
        className="w-20 h-20 animate-spin text-main"
        weight="light"
      />
    </div>
  );
}
