import { ClassAttributes } from "react";

interface SubtitleProps extends ClassAttributes<HTMLSpanElement> {
  text: string;
  className?: string;
}

export function Subtitle({ text, className }: SubtitleProps) {
  return <span className={`text-xl font-semibold uppercase text-main ${className}`}>{text}</span>;
}
