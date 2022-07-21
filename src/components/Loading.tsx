import ContentLoader from "react-content-loader";
import { Code, Facebook } from "react-content-loader";

export function Loading() {
  return (
    <ContentLoader
      className="mt-6"
      height={140}
      speed={1}
      backgroundColor="#888"
      foregroundColor="#cccccc"
      viewBox="0 0 480 70"
    >
      <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
      <rect x="80" y="0" rx="5" ry="5" width="70" height="70" />
      <rect x="160" y="0" rx="5" ry="5" width="70" height="70" />
      <rect x="240" y="0" rx="5" ry="5" width="70" height="70" />
      <rect x="320" y="0" rx="5" ry="5" width="70" height="70" />
      <rect x="400" y="0" rx="5" ry="5" width="70" height="70" />
    </ContentLoader>
  );
}
