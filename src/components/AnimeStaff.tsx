import { Link } from "react-router-dom";
import { Grow } from "@mui/material";
import { IntersectionObserverComponent } from "./IntersectionObserverComponent";
import { HorizontalCardSkeleton } from "./Loading";

type AnimeStaffProps = {
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

export function AnimeStaff({ staff, pagingFunction, isLoading }: AnimeStaffProps) {
  return (
    <div className="mx-auto max-w-6xl px-4">
      <strong>Staff</strong>

      <div className="mt-2 grid gap-4 pb-2 md:grid-cols-2">
        {staff.edges.map((edge) => (
          <Grow in timeout={600} key={edge.id}>
            <div className="flex">
              <div className="flex flex-1">
                <Link to={`/staff/${edge.node.id}`}>
                  <div className="h-32 overflow-hidden rounded-lg bg-gradient-to-t from-zinc-600 via-zinc-400 to-zinc-300">
                    <img
                      src={edge.node.image.medium}
                      alt={edge.node.name.full}
                      style={{
                        opacity: 0,
                        transitionDuration: "700ms",
                      }}
                      onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                      className="aspect-[6_/_9] h-full object-cover"
                    />
                  </div>
                </Link>

                <div className="flex gap-1 p-2">
                  <div className="flex w-full flex-col gap-1">
                    <Link to={`/staff/${edge.node.id}`}>
                      <span className="text-sm font-medium">{edge.node.name.full}</span>
                    </Link>

                    <span className="text-xs">{edge.role}</span>
                  </div>
                </div>
              </div>
            </div>
          </Grow>
        ))}

        {isLoading && <HorizontalCardSkeleton />}
      </div>

      {!isLoading && staff.pageInfo.hasNextPage && (
        <IntersectionObserverComponent
          page={staff.pageInfo.currentPage}
          doSomething={() => pagingFunction()}
        />
      )}
    </div>
  );
}
