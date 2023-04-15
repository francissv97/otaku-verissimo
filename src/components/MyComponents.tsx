import { Collapse } from "@mui/material";
import { CaretDown, CaretUp } from "phosphor-react";
import { ClassAttributes, HTMLAttributes, useState } from "react";

type MyDividerProps = ClassAttributes<HTMLDivElement> & {
  className?: string;
};

type SpaceProps = { pxHeight?: number };

export function MyDivider({ className }: MyDividerProps) {
  return <div className={`my-4 bg-zinc-300 ${className} h-[1px]`} />;
}

export function MySpace({ pxHeight }: SpaceProps) {
  return <div style={{ height: pxHeight ? pxHeight : 8 }}></div>;
}

export function MyShadow() {
  return <div className="h-4 w-full shadow" />;
}

type ReadMoreReadLessProps = ClassAttributes<HTMLDivElement> & {
  description: string;
  className?: string;
};

export function ReadMoreReadLess({
  description,
  className,
}: ReadMoreReadLessProps) {
  const [collapse, setCollapse] = useState(false);

  return (
    <>
      {description.replaceAll(" ", "").length > 256 ? (
        <>
          <Collapse
            in={collapse}
            appear
            collapsedSize={64}
            sx={
              !collapse
                ? {
                    backgroundImage:
                      "linear-gradient(to bottom, #52525b, transparent)",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }
                : null
            }
          >
            <p
              className={className}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></p>
          </Collapse>

          <button
            onClick={() => setCollapse((prev) => !prev)}
            className="flex justify-center items-center outline-main/50 w-fit mx-auto"
          >
            {collapse ? (
              <>
                <span className="text-zinc-400 text-sm font-medium">
                  SHOW LESS
                </span>
                <CaretUp size={26} className="text-zinc-400" weight="bold" />
              </>
            ) : (
              <>
                <span className="text-zinc-400 text-sm font-medium">
                  SHOW MORE
                </span>
                <CaretDown size={26} className="text-zinc-400" weight="bold" />
              </>
            )}
          </button>
        </>
      ) : (
        <p
          className="text-justify"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      )}
    </>
  );
}
