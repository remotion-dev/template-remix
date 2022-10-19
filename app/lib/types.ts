import type { AwsRegion, LambdaErrorInfo } from '@remotion/lambda';

export type StatusResponse = {
	renderId: string;
	done: boolean;
	overallProgress: number;
	outputFile: string | null;
	errors: LambdaErrorInfo[];
};

export type RenderResponse = {
	renderId: string;
	bucketName: string;
	functionName: string;
	region: AwsRegion;
};
