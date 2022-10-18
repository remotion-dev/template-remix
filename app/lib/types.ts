import type { LambdaErrorInfo } from '@remotion/lambda';

export type RenderStatusResponse = {
	renderId: string;
	done: boolean;
	overallProgress: number;
	outputFile: string | null;
	errors: LambdaErrorInfo[];
}[];
