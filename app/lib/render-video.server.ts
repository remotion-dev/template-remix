import type { AwsRegion } from '@remotion/lambda';
import { renderMediaOnLambda } from '@remotion/lambda/client';
import type { RenderResponse } from './types';

export const renderVideo = async ({
	serveUrl,
	composition,
	inputProps,
	outName,
}: {
	serveUrl: string;
	composition: string;
	inputProps: unknown;
	outName: string;
}): Promise<RenderResponse> => {
	const functionName = process.env.REMOTION_AWS_FUNCTION_NAME;
	if (!functionName) {
		throw new Error('REMOTION_AWS_FUNCTION_NAME is not set');
	}

	const region = process.env.REMOTION_AWS_REGION as AwsRegion | undefined;
	if (!region) {
		throw new Error('REMOTION_AWS_REGION is not set');
	}

	const { renderId, bucketName } = await renderMediaOnLambda({
		region,
		functionName,
		serveUrl,
		composition,
		inputProps,
		codec: 'h264',
		downloadBehavior: {
			type: 'download',
			fileName: outName,
		},
	});

	return {
		renderId,
		bucketName,
		functionName,
		region,
	};
};
