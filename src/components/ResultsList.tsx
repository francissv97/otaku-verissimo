import { useEffect, ReactNode } from "react";
import { DocumentNode, useQuery } from "@apollo/client";
import { AnimeMediaDefaultFields } from "../types";
import { CardAnimeResult } from "./CardAnimeResult";
import { CardSkeleton, CircularLoading } from "./Loading";
import { Grow } from "@mui/material";

type IntersectionObserverComponentProps = {
  doSomething: () => void;
  page: number;
};

type ResultsListProps = {
  query: DocumentNode;
  variables: {
    perPage: number;
    page: number;
    currentYear?: number;
    currentSeason?: string | undefined;
    nextSeasonYear?: number;
    nextSeason?: string | undefined;
  };
  children?: ReactNode;
};

export function ResultsList({ query, variables }: ResultsListProps) {
  const { data, loading, fetchMore } = useQuery(query, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  return (
    <div className="px-2 py-4 max-w-6xl mx-auto">
      <div className="grid gap-x-4 gap-y-6 justify-between grid-cols-[repeat(auto-fill,minmax(114px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(136px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(152px,1fr))]">
        {data &&
          data.Page.media.map((anime: AnimeMediaDefaultFields) => (
            <CardAnimeResult key={anime.id} anime={anime} />
          ))}

        {loading && <CardSkeleton />}
      </div>

      {!loading && data && data.Page.pageInfo.hasNextPage && (
        <IntersectionObserverComponent
          page={data.Page.pageInfo.currentPage}
          doSomething={() =>
            fetchMore({
              variables: { page: data.Page.pageInfo.currentPage + 1 },
              updateQuery(pv, { fetchMoreResult }) {
                if (!fetchMoreResult) return pv;

                fetchMoreResult.Page.media = [
                  ...pv.Page.media,
                  ...fetchMoreResult.Page.media,
                ];

                return fetchMoreResult;
              },
            })
          }
        />
      )}
    </div>
  );
}

function IntersectionObserverComponent({
  doSomething,
  page,
}: IntersectionObserverComponentProps) {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) =>
      entries.some((entry) => {
        if (entry.isIntersecting) {
          doSomething();
        }
      })
    );

    intersectionObserver.observe(document.getElementById("sentry") as Element);

    return () => intersectionObserver.disconnect();
  }, [page]);

  return <div id="sentry" className="h-[1px]" />;
}
