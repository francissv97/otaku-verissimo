// import { ReactNode } from "react";
// import { DocumentNode } from "@apollo/client";
// import { Loading } from "./Loading";
// import { ResultsList } from "./ResultsList";
// import { SmallResultsList } from "./SmallResultsList";

// // type QueryComponentProps = {
// //   query: DocumentNode;
// //   perPage: number;
// //   smallList: boolean;
// //   currentYear?: number;
// //   currentSeason?: string | undefined;
// //   nextSeasonYear?: number;
// //   nextSeason?: string | undefined;
// //   children?: ReactNode;
// // };

// export function QueryComponent() {
//   //   {
//   //   query,
//   //   perPage,
//   //   smallList,
//   //   currentSeason,
//   //   currentYear,
//   //   nextSeason,
//   //   nextSeasonYear,
//   //   children,
//   // }: QueryComponentProps
//   return !data ? (
//     <Loading />
//   ) : (
//     <div className="shadow-2xl shadow-zinc-400/60 py-4">
      
//       {smallList ? (
//         <SmallResultsList />
//       ) : (
//         <ResultsList />
//       )}
//     </div>
//   );
// }
