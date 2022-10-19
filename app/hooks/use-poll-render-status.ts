import { useFetcher } from '@remix-run/react';
import { useCallback, useEffect, useMemo } from 'react';
import type { StatusResponse } from '../lib/types';

export function usePollRenderStatus({ renderId }: { renderId: string }) {
	const { submit, data } = useFetcher<StatusResponse>();

	const checkRenderProgress = useCallback(() => {
		submit(
			{ renderId: renderId },
			{
				method: 'post',
				action: 'render-status',
			}
		);
	}, [submit, renderId]);

	useEffect(() => {
		checkRenderProgress();
	}, [checkRenderProgress]);

	useEffect(() => {
		const interval = setInterval(() => {
			checkRenderProgress();
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	}, [checkRenderProgress, renderId]);

	const videoUrl = data ? data.outputFile : null;

	const status = useMemo(() => {
		return {
			videoUrl,
			progress: data,
		};
	}, [data, videoUrl]);

	return status;
}
