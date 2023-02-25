import { DocumentNode, useQuery } from "@apollo/client";
import { Pagination } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { GET_NEXT_SEASON_POPULAR_QUERY } from "../lib/queries";
import { UpcomingNextSeasonType } from "../types";
import { Loading } from "./Loading";
import { Results } from "./Results";

type QueryComponentProps = {
  query: DocumentNode;
  perPage: number;
  currentYear?: number;
  currentSeason?: string | undefined;
  nextSeasonYear?: number;
  nextSeason?: string | undefined;
  children?: ReactNode;
};

export function QueryComponent({
  query,
  perPage,
  currentSeason,
  currentYear,
  nextSeason,
  nextSeasonYear,
  children,
}: QueryComponentProps) {
  const [openingAnimation, setOpeningAnimation] = useState(true);
  const { data } = useQuery(query, {
    variables: {
      nextSeason,
      nextSeasonYear,
      perPage,
      currentSeason,
      currentYear,
    },
  });

  useEffect(() => {
    setTimeout(() => setOpeningAnimation(false), 100);
  }, []);

  return data ? (
    <div
      className={`shadow-2xl shadow-zinc-400/60 py-4 ${
        openingAnimation ? "opacity-30" : "opacity-100"
      } duration-500`}
    >
      {children}
      <Results data={data.Page.media} />
      {/* <Pagination
        defaultCurrent={data.Page.pageInfo.currentPage}
        total={data.Page.pageInfo.lastPage}
        pageSize={data.Page.pageInfo.perPage}
      /> */}
    </div>
  ) : (
    <Loading />
  );
}
