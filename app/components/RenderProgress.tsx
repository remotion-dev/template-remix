import type { LambdaErrorInfo } from '@remotion/lambda';
import { useCallback, useState } from 'react';
import { usePollRenderStatus } from '~/hooks/use-poll-render-status';

interface Props {
	renderId: string;
	reset: () => void;
}

export const RenderProgress = ({ renderId, reset }: Props) => {
	const [renderErrors, setRenderErrors] = useState<LambdaErrorInfo[]>([]);

	const onError = useCallback(
		(e: LambdaErrorInfo[]) => {
			reset();
			setRenderErrors(e);
			console.error(e);
		},
		[reset]
	);

	const { renderProgress, videoUrl } = usePollRenderStatus({
		renderId,
		shouldStartPolling: !!renderId,
		onComplete: reset,
		onError,
	});

	if (renderErrors.length > 0) {
		return (
			<div>
				<h3>Well this is unfortunate but there is an error...</h3>
				<span>{renderErrors.join(', ')}</span>
			</div>
		);
	}

	if (videoUrl) {
		return (
			<div>
				<a
					key={`file-${videoUrl}`}
					href={videoUrl}
					target="_blank"
					rel="noopener noreferrer"
					className="file-download-link"
				>
					Download Video
				</a>
			</div>
		);
	}

	return (
		<div>
			<h3>Rendering...</h3>
			{renderProgress && <div>{`${Math.round(renderProgress * 100)}%`}</div>}
		</div>
	);
};
