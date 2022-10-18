import { useFetcher } from '@remix-run/react';
import type { LambdaErrorInfo } from '@remotion/lambda';
import { useCallback, useEffect, useState } from 'react';
import type { RenderStatusResponse } from '../lib/types';
import { checkRenderProgress } from '../lib/check-render-progress';
import { useInterval } from './use-interval';

export function usePollRenderStatus({
	renderId,
	shouldStartPolling,
	onComplete,
	onError,
}: {
	renderId: string;
	shouldStartPolling: boolean;
	onComplete: () => void;
	onError: (e: LambdaErrorInfo[]) => void;
}) {
	const [renderProgress, setRenderProgress] = useState<number | undefined>(
		undefined
	);

	const renderStatusFetcher = useFetcher<RenderStatusResponse>();

	const [isPolling, setIsPolling] = useState(false);

	const pollingFunction = useCallback(async () => {
		const progress = await checkRenderProgress(renderStatusFetcher, renderId);

		const errors = progress.errors;
		if (errors.length > 0) {
			setIsPolling(false);
			onError(errors);
			return;
		}

		setRenderProgress(progress.overallProgress);
	}, [renderStatusFetcher, renderId, onError]);

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

	const videoUrl = renderStatusFetcher.data
		? renderStatusFetcher.data.outputFile
		: null;

	return {
		renderProgress,
		isPolling,
		videoUrl,
	};
}
