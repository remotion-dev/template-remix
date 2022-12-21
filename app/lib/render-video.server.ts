import type { AwsRegion } from '@remotion/lambda';
import { renderMediaOnLambda } from '@remotion/lambda/client';
import { speculateFunctionName } from './get-function-name';
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
	const region = process.env.REMOTION_AWS_REGION as AwsRegion | undefined;
	if (!region) {
		throw new Error('REMOTION_AWS_REGION is not set');
	}

	const { renderId, bucketName } = await renderMediaOnLambda({
		region,
		functionName: speculateFunctionName(),
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
		functionName: speculateFunctionName(),
		region,
	};
};
