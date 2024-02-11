import { ClassAttributes } from "react";

type TSubtitleProps = ClassAttributes<HTMLSpanElement> & {
  text: string;
  className?: string;
};

export function Subtitle({ text, className }: TSubtitleProps) {
  return (
    <span className={`text-lg font-semibold uppercase text-main ${className}`}>
      {text}
    </span>
  );
}
