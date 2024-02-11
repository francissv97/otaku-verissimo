import { ReactNode } from "react";
import { DocumentNode, useQuery } from "@apollo/client";
import { PageMediaResultQuery, MediaSort } from "@/types";
import { CoverCard } from "@/components/cover-card";
import { CardSkeleton } from "@/components/loading";
import { IntersectionObserverComponent } from "@/components/intersection-observer-component";

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
    <div className="mx-auto max-w-5xl p-4">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] justify-between gap-4 min-[375px]:grid-cols-[repeat(auto-fill,minmax(96px,1fr))] md:grid-cols-[repeat(auto-fill,170px)]">
        {data &&
          data.Page.media.map((anime: PageMediaResultQuery) => (
            <CoverCard key={anime.id} anime={anime} />
          ))}

        {!loading && data && data.Page.media.length == 0 && (
          <strong className="col-place-self-center text-xl font-medium">
            No results
          </strong>
        )}

        {loading && <CardSkeleton />}
      </div>

      {!loading && data.Page.pageInfo.hasNextPage && (
        <IntersectionObserverComponent
          page={data.Page.pageInfo.currentPage}
          callback={() =>
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

  const animes: PageMediaResultQuery[] = data && data.Page.media;

  return (
    <div className="mx-auto max-w-5xl p-4">
      {children}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] justify-between gap-4 min-[375px]:grid-cols-[repeat(auto-fill,minmax(96px,1fr))] md:grid-cols-[repeat(auto-fill,170px)]">
        {animes?.map((anime) => <CoverCard key={anime.id} anime={anime} />)}

        {loading && <CardSkeleton />}
      </div>
    </div>
  );
}
