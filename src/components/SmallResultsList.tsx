import { ReactNode } from "react";
import { useQuery, DocumentNode } from "@apollo/client";
import { AnimeMediaDefaultFields } from "../types";
import { CardAnimeResult } from "./CardAnimeResult";
import { CardSkeleton } from "./Loading";

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
      <div className="grid gap-x-4 gap-y-6 grid-cols-[repeat(auto-fill,minmax(114px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(136px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(152px,1fr))]">
        {animes?.map((anime) => (
          <CardAnimeResult key={anime.id} anime={anime} />
        ))}

        {loading && <CardSkeleton />}
      </div>
    </div>
  );
}
