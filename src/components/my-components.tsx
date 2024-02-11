import { ClassAttributes } from "react";

type TMyDividerProps = ClassAttributes<HTMLDivElement> & {
  className?: string;
};

export function MyDivider({ className }: TMyDividerProps) {
  return <div className={`my-4 bg-zinc-300 ${className} h-[1px]`} />;
}

export function MySpace({ pxHeight }: { pxHeight?: number }) {
  return <div style={{ height: pxHeight ? pxHeight : 8 }}></div>;
}

export function MyShadow() {
  return <div className="h-4 w-full shadow" />;
}
