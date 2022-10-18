import type { FetcherWithComponents } from '@remix-run/react';
import type { RenderStatusResponse } from './types';

export const checkRenderProgress = async (
	fetcher: FetcherWithComponents<RenderStatusResponse>,
	renderId: string
): Promise<RenderStatusResponse> => {
	await fetcher.submit(
		{ renderId: renderId },
		{
			method: 'post',
			action: 'render-status',
		}
	);
	return fetcher.data as RenderStatusResponse;
};
