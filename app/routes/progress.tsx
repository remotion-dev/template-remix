import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import type { AwsRegion } from '@remotion/lambda';
import { getRenderProgress } from '@remotion/lambda/client';
import type { StatusResponse } from '../lib/types';

export const action: ActionFunction = async ({ request }) => {
	const body = await request.formData();
	const renderId = body.get('renderId') as string;
	if (!renderId) {
		throw new Response(JSON.stringify({ error: 'No renderId' }), {
			status: 400,
		});
	}

	const functionName = process.env.REMOTION_AWS_FUNCTION_NAME;
	if (!functionName) {
		throw new Error('REMOTION_AWS_FUNCTION_NAME is not set');
	}

	const region = process.env.REMOTION_AWS_REGION as AwsRegion | undefined;
	if (!region) {
		throw new Error('REMOTION_AWS_REGION is not set');
	}

	const bucketName = process.env.REMOTION_AWS_BUCKET_NAME;
	if (!bucketName) {
		throw new Error('REMOTION_AWS_BUCKET_NAME is not set');
	}

	const { done, overallProgress, errors, outputFile } = await getRenderProgress(
		{
			renderId,
			bucketName,
			functionName,
			region,
		}
	);
	const status: StatusResponse = {
		renderId,
		done,
		overallProgress,
		errors,
		outputFile,
	};

	return json(status);
};
