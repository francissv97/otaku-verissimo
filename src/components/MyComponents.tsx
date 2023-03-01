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
  return <div className="h-3 w-full shadow-zinc-400 shadow-lg" />;
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
    <img
      src={imageSrc}
      alt={alt}
      className="w-full h-full rounded object-cover object-center duration-200 group-hover:border-main"
      loading="lazy"
      style={{ opacity: 0, transitionDuration: "800ms" }}
      onLoad={(t) => {
        t.currentTarget.style.opacity = "1";
      }}
    />
  ) : (
    <div className="bg-zinc-400 w-full h-full animate-pulse" />
  );
}
