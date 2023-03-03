import { ClassAttributes } from "react";

type MyDividerProps = ClassAttributes<HTMLDivElement> & {
  className?: string;
};

type SpaceProps = { pxHeight?: number };

export function MyDivider({ className }: MyDividerProps) {
  return <div className={`my-4 bg-zinc-400/60 ${className} h-[1px]`} />;
}

export function MySpace({ pxHeight }: SpaceProps) {
  return <div style={{ height: pxHeight ? pxHeight : 8 }}></div>;
}

export function MyShadow() {
  return <div className="h-1 w-full shadow-zinc-300 shadow-sm" />;
}
