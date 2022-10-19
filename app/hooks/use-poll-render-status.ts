import { useFetcher } from '@remix-run/react';
import { useCallback, useEffect, useMemo } from 'react';
import type { StatusResponse } from '../lib/types';

export function usePollRenderStatus({
	renderId,
	bucketName,
}: {
	renderId: string;
	bucketName: string;
}) {
	const { submit, data } = useFetcher<StatusResponse>();

	const checkRenderProgress = useCallback(() => {
		submit(
			{ renderId, bucketName },
			{
				method: 'post',
				action: 'progress',
			}
		);
	}, [submit, renderId, bucketName]);

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

	const status = useMemo(() => {
		return {
			progress: data,
		};
	}, [data]);

	return status;
}
