import type { EnhancedErrorInfo } from '@remotion/lambda/dist/functions/helpers/write-lambda-error';

export const checkRenderProgress = async (
	fetcher: any,
	renderIds: string[]
): Promise<
	{
		renderId: string;
		done: boolean;
		overallProgress: number;
		errors: EnhancedErrorInfo[];
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
