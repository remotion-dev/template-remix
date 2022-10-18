import type { FetcherWithComponents } from '@remix-run/react';
import type { RenderStatusResponse } from './types';

export const checkRenderProgress = async (
	fetcher: FetcherWithComponents<RenderStatusResponse>,
	renderIds: string[]
): Promise<RenderStatusResponse> => {
	await fetcher.submit(
		{ renderIds: JSON.stringify(renderIds) },
		{
			method: 'post',
			action: 'render-status',
		}
	);
	return fetcher.data as RenderStatusResponse;
};
