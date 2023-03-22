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

export function AnimeStaff({
  staff,
  pagingFunction,
  isLoading,
}: AnimeStaffProps) {
  return (
    <div className="max-w-6xl mx-auto">
      <strong>Staff</strong>

      <div className="grid md:grid-cols-2 gap-4 pb-2 mt-2">
        {staff.edges.map((edge) => (
          <Grow in timeout={600} key={edge.id}>
            <div className="flex bg-zinc-50 shadow-lg rounded overflow-hidden">
              <div className="flex-1 flex">
                <img
                  src={edge.node.image.medium}
                  alt={edge.node.name.full}
                  style={{
                    opacity: 0,
                    transitionDuration: "600ms",
                  }}
                  onLoad={(t) => (t.currentTarget.style.opacity = "1")}
                  className="h-32 aspect-[6_/_9] object-cover"
                />

                <div className="flex gap-1 p-2">
                  <div className="flex flex-col gap-1 w-full">
                    <span className="text-sm font-medium ">
                      {edge.node.name.full}
                    </span>

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
