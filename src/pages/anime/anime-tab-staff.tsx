import { Link } from "react-router-dom";
import { Slide } from "@mui/material";
import { HorizontalCardSkeleton } from "@/components/loading";
import { IntersectionObserverComponent } from "@/components/intersection-observer-component";

type TAnimeTabStaffProps = {
  staff: {
    edges: {
      id: number;
      node: {
        id: number;
        name: { full: string };
        image: { medium: string };
      };
      role: string;
    }[];
    pageInfo: {
      currentPage: number;
      hasNextPage: boolean;
    };
  };
  pagingFunction: () => void;
  isLoading: boolean;
};

export function AnimeTabStaff({
  staff,
  pagingFunction,
  isLoading,
}: TAnimeTabStaffProps) {
  return (
    <Slide in direction="up" timeout={500}>
      <div className="mx-auto max-w-5xl px-4">
        <div className="mt-2 grid gap-4 pb-2 md:grid-cols-2">
          {staff.edges.map((edge) => (
            <div
              key={edge.id}
              className="flex overflow-hidden rounded-lg bg-zinc-700 shadow-lg"
            >
              <div className="flex flex-1">
                <Link to={`/staff/${edge.node.id}`}>
                  <div className="h-32 overflow-hidden bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-300">
                    <img
                      src={edge.node.image.medium}
                      alt={edge.node.name.full}
                      style={{
                        opacity: 0,
                        transitionDuration: "700ms",
                      }}
                      onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                      className="aspect-[6/9] h-full object-cover"
                    />
                  </div>
                </Link>

                <div className="flex gap-1 p-2">
                  <div className="flex w-full flex-col gap-1">
                    <Link to={`/staff/${edge.node.id}`}>
                      <span className="text-sm font-medium">
                        {edge.node.name.full}
                      </span>
                    </Link>

                    <span className="text-xs">{edge.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && <HorizontalCardSkeleton />}
        </div>

        {!isLoading && staff.pageInfo.hasNextPage && (
          <IntersectionObserverComponent
            page={staff.pageInfo.currentPage}
            callback={() => pagingFunction()}
          />
        )}
      </div>
    </Slide>
  );
}
