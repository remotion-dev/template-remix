import { useFetcher } from '@remix-run/react';
import type { LambdaErrorInfo } from '@remotion/lambda';
import { useCallback, useEffect, useState } from 'react';
import { checkRenderProgress } from '../lib/check-render-progress';
import { useInterval } from './use-interval';

export function usePollRenderStatus({
	renderIds,
	shouldStartPolling,
	onComplete,
	onError,
}: {
	renderIds: Array<string | undefined>;
	shouldStartPolling: boolean;
	onComplete: () => void;
	onError: (e: LambdaErrorInfo[]) => void;
}) {
	const filteredRenderIds = renderIds.filter(
		(e) => !!e && typeof e === 'string'
	) as Array<string>;

	const [renderProgress, setRenderProgress] = useState<number | undefined>(
		undefined
	);

	const renderStatusFetcher = useFetcher<
		{
			renderId: string;
			done: boolean;
			overallProgress: number;
			outputFile: string | null;
		}[]
	>();

	const [isPolling, setIsPolling] = useState(false);

	const pollingFunction = useCallback(async () => {
		const progress = await checkRenderProgress(
			renderStatusFetcher,
			filteredRenderIds
		);

		const errors = [...progress.map((e) => e.errors)].flat();
		if (errors.length > 0) {
			setIsPolling(false);
			onError(errors);
			return;
		}

		setRenderProgress(
			progress.reduce((acc, curr) => acc + curr.overallProgress, 0) /
				progress.length
		);
	}, [renderStatusFetcher, filteredRenderIds, onError]);

	useInterval({
		callback: pollingFunction,
		intervalTime: 1000,
		isOn: isPolling,
	});

	useEffect(() => {
		if (!isPolling && shouldStartPolling) {
			setIsPolling(true);
			return;
		}

		if (renderProgress === 1 && isPolling) {
			setIsPolling(false);
			onComplete();
			return;
		}
	}, [isPolling, renderProgress, shouldStartPolling, onComplete]);

	const videoUrls = renderStatusFetcher.data?.map(
		(render) => render.outputFile
	);

	return {
		renderProgress,
		isPolling,
		videoUrls,
	};
}
