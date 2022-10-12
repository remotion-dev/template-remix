import { useCallback, useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import { checkProgress } from "../lib/check-progress";
import { useInterval } from "./use-interval";

export function usePollRenderStatus({
  renderIds,
  shouldStartPolling,
  onFinishedPolling,
}: {
  renderIds: Array<string | undefined>;
  shouldStartPolling: boolean;
  onFinishedPolling?: () => void;
}) {
  const filteredRenderIds = renderIds.filter(
    (e) => typeof e === "string" && e
  ) as Array<string>;

  const [renderProgress, setRenderProgress] = useState<number | undefined>(
    undefined
  );
  const [error, setError] = useState<{ (key: string): string }[] | undefined>(
    undefined
  );

  const renderFetcher = useFetcher<
    {
      renderId: string;
      done: boolean;
      overallProgress: number;
      outputFile: string | null;
    }[]
  >();

  const [isPolling, setIsPolling] = useState(false);

  const pollingFunction = useCallback(async () => {
    if (isPolling) {
      const progress = await checkProgress(renderFetcher, filteredRenderIds);
      const withErrorStatus = progress.find(
        (e) => e.errors && e.errors.length > 0
      );

      if (withErrorStatus) {
        setIsPolling(false);
        setError(withErrorStatus.errors);
      }
      if (progress.map((status) => status.errors)) {
        setIsPolling(false);
      }
      setRenderProgress(
        progress.reduce((acc, curr) => acc + curr.overallProgress, 0) /
          progress.length
      );
    }
  }, [isPolling, renderFetcher, filteredRenderIds]);

  useInterval(pollingFunction, 1000);

  useEffect(() => {
    if (!isPolling && shouldStartPolling) {
      console.log("will start polling");
      setIsPolling(true);
    }
    if (renderProgress === 1 && isPolling) {
      setIsPolling(false);
      console.log("will stop polling");
      onFinishedPolling && onFinishedPolling();
      return;
    }
  }, [isPolling, renderProgress, shouldStartPolling, onFinishedPolling]);

  const videoUrls = renderFetcher.data?.map((render) => render.outputFile);

  return {
    renderProgress,
    isPolling,
    videoUrls,
    error,
  };
}
