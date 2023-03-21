import { useEffect } from "react";

type IntersectionObserverComponentProps = {
  doSomething: () => void;
  page: number;
};

export function IntersectionObserverComponent({
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
