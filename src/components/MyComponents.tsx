import { ClassAttributes } from "react";
import { Divider } from "antd";

type MyDividerProps = ClassAttributes<HTMLDivElement> & {
  className?: string;
};

type SpaceProps = { pxHeight?: number };

export function MyDivider({ className }: MyDividerProps) {
  return <Divider className={`my-4 bg-zinc-400/20 ${className}`} />;
}

export function Space({ pxHeight }: SpaceProps) {
  return <div style={{ height: pxHeight ? pxHeight : 8 }}></div>;
}
