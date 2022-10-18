import type { LambdaErrorInfo } from '@remotion/lambda';

export const checkRenderProgress = async (
	fetcher: any,
	renderIds: string[]
): Promise<
	{
		renderId: string;
		done: boolean;
		overallProgress: number;
		errors: LambdaErrorInfo[];
	}[]
> => {
	await fetcher.submit(
		{ renderIds: JSON.stringify(renderIds) },
		{
			method: 'post',
			action: 'render-status',
		}
	);
	return fetcher.data;
};
