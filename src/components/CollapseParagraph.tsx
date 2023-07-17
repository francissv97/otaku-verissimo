import { ClassAttributes, useState } from "react";
import { Collapse } from "@mui/material";
import { CaretDown, CaretUp } from "phosphor-react";

type CollapseParagraphProps = ClassAttributes<HTMLDivElement> & {
  description: string;
  className?: string;
};

export function CollapseParagraph({ description, className }: CollapseParagraphProps) {
  const [collapse, setCollapse] = useState(false);

  if (description.replaceAll(" ", "").length > 256) {
    return (
      <>
        <Collapse in={collapse} appear collapsedSize={72} sx={{ position: "relative" }}>
          <p
            className={`${className}`}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />

          {!collapse && (
            <span className="absolute bottom-0 right-0 text-[24px] leading-none text-main bg-zinc-800">...</span>
          )}
        </Collapse>

        <button
          onClick={() => setCollapse((prev) => !prev)}
          className="mx-auto mt-2 flex w-fit items-center justify-center outline-main/50"
        >
          {collapse ? (
            <>
              <span className="text-sm font-medium text-zinc-400">SHOW LESS</span>
              <CaretUp size={18} className="text-zinc-400" weight="bold" />
            </>
          ) : (
            <>
              <span className="text-sm font-medium text-zinc-400">SHOW MORE</span>
              <CaretDown size={18} className="text-zinc-400" weight="bold" />
            </>
          )}
        </button>
      </>
    );
  }

  return <p className={className} dangerouslySetInnerHTML={{ __html: description }}></p>;
}
