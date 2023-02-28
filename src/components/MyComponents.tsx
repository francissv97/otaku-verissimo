import { Fade, Zoom } from "@mui/material";
import { ClassAttributes, useEffect, useState } from "react";

type MyDividerProps = ClassAttributes<HTMLDivElement> & {
  className?: string;
};
type SpaceProps = { pxHeight?: number };
type ProgressiveImageProps = { src: string; alt: string };

export function MyDivider({ className }: MyDividerProps) {
  return <div className={`my-4 bg-zinc-300/80 ${className} h-[1px]`} />;
}

export function Space({ pxHeight }: SpaceProps) {
  return <div style={{ height: pxHeight ? pxHeight : 8 }}></div>;
}

export function MyShadow() {
  return <div className="h-3 w-full shadow-zinc-500 shadow-lg" />;
}

export function MyCoverImage({ src, alt }: ProgressiveImageProps) {
  const [imageSrc, setImageSrc] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImageSrc(src);
      setLoaded(true);
    };
  }, []);

  return loaded ? (
    <Fade in timeout={800}>
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-full rounded object-cover object-center duration-200 group-hover:border-main"
      />
    </Fade>
  ) : (
    <div className="bg-zinc-400 w-full h-full animate-pulse" />
  );
}
