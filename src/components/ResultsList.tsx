import { useEffect, ReactNode } from "react";
import { DocumentNode, useQuery } from "@apollo/client";
import { AnimeMediaDefaultFields } from "../types";
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

type SmallResultsListProps = {
  query: DocumentNode;
  variables: {
    perPage: number;
    currentYear?: number;
    currentSeason?: string | undefined;
    nextSeasonYear?: number;
    nextSeason?: string | undefined;
  };
  children?: ReactNode;
};

type IntersectionObserverComponentProps = {
  doSomething: () => void;
  page: number;
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

        {!loading && data && data.Page.media.length == 0 && (
          <strong className="text-2xl font-medium text-zinc-600 place-self-center col-span-3">
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

export function SmallResultsList({
  query,
  variables,
  children,
}: SmallResultsListProps) {
  const { data, loading } = useQuery(query, {
    variables,
  });

  const animes: AnimeMediaDefaultFields[] = data && data.Page.media;

  return (
    <div className="px-2 py-4 max-w-6xl mx-auto">
      {children}
      <div className="grid gap-x-3 md:gap-x-6 gap-y-4 md:gap-y-8 justify-between grid-cols-[repeat(auto-fill,minmax(114px,1fr))] md:grid-cols-[repeat(auto-fill,164px)]">
        {animes?.map((anime) => (
          <CardAnimeResult key={anime.id} anime={anime} />
        ))}

        {loading && <CardSkeleton />}
      </div>
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
