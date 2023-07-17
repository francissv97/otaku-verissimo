import { Link } from "react-router-dom";

interface RelationsProps {
  edges: {
    relationType: string;
    node: {
      id: number;
      title: {
        romaji: string;
      };
      format: string;
      coverImage: {
        large: string;
      };
      type: string;
    };
  }[];
}

export function Relations({ edges }: RelationsProps) {
  const order = [
    "ADAPTATION",
    "PREQUEL",
    "SEQUEL",
    "PARENT",
    "SIDE_STORY",
    "CHARACTER",
    "SUMMARY",
    "ALTERNATIVE",
    "SPIN_OFF",
    "OTHER",
  ];

  const sortEdges = [...edges].sort((a, b) => {
    if (order.indexOf(a.relationType) > order.indexOf(b.relationType)) return 1;
    if (order.indexOf(a.relationType) < order.indexOf(b.relationType)) return -1;
    return 0;
  });

  return (
    <div className="mt-4 flex flex-col">
      <strong className="mx-4 w-fit border-t-4 border-main/70">Relations</strong>

      <div className="mt-2 flex gap-4 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden">
        {sortEdges.map((edge) =>
          edge.node.type == "ANIME" ? (
            <Link
              to={`/anime/${edge.node.id}`}
              key={edge.node.id}
              className="group flex w-32 cursor-pointer flex-col gap-1 py-1"
            >
              <div className="relative mb-2 h-48 w-32 rounded bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500">
                <img
                  src={edge.node.coverImage.large}
                  alt={edge.node.title.romaji}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  style={{
                    opacity: 0,
                    transitionDuration: "700ms",
                  }}
                  onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                />

                <div className="absolute right-0 top-0 rounded-bl-lg bg-zinc-950/70 p-1">
                  <span className="text-xs font-medium text-zinc-50">
                    {edge.node.format ? edge.node.format.replaceAll("_", " ") : ""}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-zinc-950/70 p-1">
                  <span className="text-sm font-medium text-zinc-50">
                    {edge.relationType.replaceAll("_", " ")}
                  </span>
                </div>
              </div>

              <span className="line-clamp-2 text-center text-[14px] leading-none">
                {edge.node.title.romaji}
              </span>
            </Link>
          ) : (
            <div key={edge.node.id} className="group flex w-32 flex-col gap-1 py-1">
              <div className="relative mb-2 h-48 w-32 overflow-hidden rounded-lg bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 shadow-md">
                <img
                  src={edge.node.coverImage.large}
                  alt={edge.node.title.romaji}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                  style={{
                    opacity: 0,
                    transitionDuration: "700ms",
                  }}
                  onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                />

                <div className="absolute left-0 top-0 rounded-br-lg bg-zinc-950/70 p-1">
                  <span className="text-xs font-medium text-zinc-50">
                    {edge.node.format ? edge.node.format.replaceAll("_", " ") : ""}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-zinc-950/70 p-1">
                  <span className="text-sm font-medium text-zinc-50">
                    {edge.relationType.replaceAll("_", " ")}
                  </span>
                </div>
              </div>

              <span className="line-clamp-2 text-center text-[14px] leading-none">
                {edge.node.title.romaji}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}
