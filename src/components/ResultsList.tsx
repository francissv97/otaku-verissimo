import { useEffect, ReactNode, ClassAttributes } from "react";
import { DocumentNode, useQuery } from "@apollo/client";
import { AnimeMediaResults, MediaSort } from "../types";
import { CardAnimeResult } from "./CardAnimeResult";
import { CardSkeleton } from "./Loading";

type ResultsListProps = {
  query: DocumentNode;
  variables: {
    perPage: number;
    page: number;
    search?: string;
    currentYear?: number;
    currentSeason?: string | undefined;
    nextSeasonYear?: number;
    nextSeason?: string | undefined;
    isAdult: boolean;
    sort: "POPULARITY_DESC" | "TRENDING_DESC" | "SCORE_DESC";
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
      <div className="grid gap-4 justify-between grid-cols-[repeat(auto-fill,minmax(110px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(118px,1fr))] md:grid-cols-[repeat(auto-fill,170px)]">
        {data &&
          data.Page.media.map((anime: AnimeMediaResults) => (
            <CardAnimeResult key={anime.id} anime={anime} />
          ))}

        {!loading && data && data.Page.media.length == 0 && (
          <strong className="text-xl font-medium text-zinc-500 place-self-center col-">
            No results
          </strong>
        )}

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

type SmallResultsListProps = {
  query: DocumentNode;
  variables: {
    perPage: number;
    seasonYear?: number;
    season?: string | undefined;
    sort?: MediaSort;
  };
  children?: ReactNode;
};

export function SmallResultsList({
  query,
  variables,
  children,
}: SmallResultsListProps) {
  const { data, loading } = useQuery(query, {
    variables,
  });

  const animes: AnimeMediaResults[] = data && data.Page.media;

  return (
    <div className="px-2 pt-4 pb-2 max-w-6xl mx-auto">
      {children}
      <div className="grid gap-4 justify-between grid-cols-[repeat(auto-fill,minmax(118px,1fr))] md:grid-cols-[repeat(auto-fill,170px)]">
        {animes?.map((anime) => (
          <CardAnimeResult key={anime.id} anime={anime} />
        ))}

        {loading && <CardSkeleton />}
      </div>
    </div>
  );
}

type IntersectionObserverComponentProps = {
  doSomething: () => void;
  page: number;
};

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
