import { Subtitle } from "@/components/Subtitle";
import { useState } from "react";

interface TagsProps {
  tags: {
    id: number;
    name: string;
    description: string;
    category: string;
    rank: number;
    isGeneralSpoiler: boolean;
    isMediaSpoiler: boolean;
    isAdult: boolean;
  }[];
}

export function Tags({ tags }: TagsProps) {
  const [showSpoilerTags, setShowSpoilerTags] = useState(false);

  return (
    <>
      <div className="mb-2 mt-4 flex justify-between px-4">
        <Subtitle text="tags" />

        {tags.find((item) => item.isMediaSpoiler === true) && (
          <button
            className="text-sm font-medium text-yellow-400 outline-main/50 md:text-base"
            onClick={() => setShowSpoilerTags(!showSpoilerTags)}
          >
            {showSpoilerTags ? "Hide Spoiler" : "Show Spoiler"}
          </button>
        )}
      </div>

      <ul className="grid grid-cols-1 gap-x-4 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {tags.map((tag) => {
          if (!tag.isMediaSpoiler || showSpoilerTags) {
            return (
              <div key={tag.id} className="flex justify-between">
                <span className={`${tag.isMediaSpoiler ? "text-yellow-400" : "text-zinc-300"} text-sm`}>
                  {tag.name}
                </span>

                <span
                  className={`${
                    tag.isMediaSpoiler ? "text-yellow-400" : "text-zinc-300"
                  } text-sm md:text-base`}
                >
                  {tag.rank + "%"}
                </span>
              </div>
            );
          }
        })}
      </ul>
    </>
  );
}
