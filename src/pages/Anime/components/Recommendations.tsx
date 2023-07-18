import { Link } from "react-router-dom";
import { Heart, Star } from "phosphor-react";

interface RecommendationsProps {
  edges: {
    node: {
      mediaRecommendation: {
        id: number;
        title: {
          romaji: string;
        };
        format: string;
        coverImage: {
          large: string;
        };
        averageScore: number;
        favourites: number;
      };
    };
  }[];
}

export function Recommendations({ edges }: RecommendationsProps) {
  return (
    <div className="mt-4 flex flex-col">
      <strong className="mx-4 w-fit border-t-4 border-main/70">Recommendations</strong>

      <div className="mt-2 flex gap-4 overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden">
        {edges.map(
          (edge) =>
            edge.node.mediaRecommendation != null && (
              <Link
                to={`/anime/${edge.node.mediaRecommendation.id}`}
                key={edge.node.mediaRecommendation.id}
                onClick={() => {
                  if (window.scrollY <= document.body.scrollHeight)
                    scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group flex w-32 cursor-pointer flex-col gap-1 pb-3 pt-1"
              >
                <div className="relative mb-2 h-48 w-32 overflow-hidden rounded-lg bg-gradient-to-t from-orange-700 via-orange-600 to-orange-500 shadow-lg">
                  <img
                    src={edge.node.mediaRecommendation.coverImage.large}
                    alt={edge.node.mediaRecommendation.title.romaji}
                    className="h-full w-full object-cover object-center group-hover:border-main"
                    loading="lazy"
                    style={{
                      opacity: 0,
                      transitionDuration: "700ms",
                    }}
                    onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                  />

                  <div className="absolute top-0 flex items-center gap-1 rounded-br-lg bg-zinc-950/60 p-1">
                    <Star size={18} weight="fill" className="text-yellow-400" />
                    <span className="text-sm font-medium text-zinc-50">
                      {edge.node.mediaRecommendation.averageScore > 0
                        ? edge.node.mediaRecommendation.averageScore
                        : 0}
                    </span>
                  </div>

                  <div className="absolute bottom-0 flex items-center gap-1 rounded-tr-lg bg-zinc-950/60 p-1">
                    <Heart size={18} weight="fill" className="text-red-500" />
                    <span className="text-sm font-medium text-zinc-50">
                      {edge.node.mediaRecommendation.favourites > 0
                        ? edge.node.mediaRecommendation.favourites
                        : 0}
                    </span>
                  </div>

                  <div className="absolute right-0 top-0 flex items-center gap-1 rounded-bl-lg bg-zinc-950/60 p-1">
                    <span className="text-xs font-medium text-zinc-50">
                      {edge.node.mediaRecommendation.format.replaceAll("_", " ")}
                    </span>
                  </div>
                </div>

                <span className="line-clamp-2 text-center text-sm leading-none">
                  {edge.node.mediaRecommendation.title.romaji}
                </span>
              </Link>
            )
        )}
      </div>
    </div>
  );
}
