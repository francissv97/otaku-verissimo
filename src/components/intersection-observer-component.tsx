import { useEffect } from "react";

type TIntersectionObserverComponentProps = {
  callback: () => void;
  page: number;
};

export function IntersectionObserverComponent({
  callback,
  page,
}: TIntersectionObserverComponentProps) {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver((entries) =>
      entries.some((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      })
    );

    intersectionObserver.observe(document.getElementById("sentry") as HTMLDivElement);

    return () => intersectionObserver.disconnect();
  }, [page]);

  return <div id="sentry" className="h-[1px]" />;
}
