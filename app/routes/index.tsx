import type { ActionFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useFetcher } from '@remix-run/react';
import { Player } from '@remotion/player';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import invariant from 'tiny-invariant';
import { RenderProgress } from '../components/RenderProgress';
import { renderVideo } from '../lib/render-video.server';
import type { LogoAnimationProps } from '../remotion/constants';
import {
	COMPOSITION_DURATION_IN_FRAMES,
	COMPOSITION_FPS,
	COMPOSITION_HEIGHT,
	COMPOSITION_ID,
	COMPOSITION_WIDTH,
} from '../remotion/constants';
import { LogoAnimation } from '../remotion/logo-animation';

const container: React.CSSProperties = {
	fontFamily: 'Founders Grotesk, sans-serif',
	lineHeight: '1.4',
	fontWeight: 700,
};

const content: React.CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-between',
	alignItems: 'center',
};

const playerContainer: React.CSSProperties = {
	padding: 48,
};

const playerStyle: React.CSSProperties = {
	marginInline: 'auto',
	width: '80vw',
	height: 'max(600px, 80vh)',
};

export const action: ActionFunction = async ({ request }) => {
	const formData = await request.formData();
	const personalizedName = formData.get('personalizedName') as string;
	invariant(personalizedName, 'personalizedName is not set');

	const serveUrl = process.env.REMOTION_AWS_SERVE_URL;
	invariant(serveUrl, 'REMOTION_AWS_SERVE_URL is not set');

	const inputProps: LogoAnimationProps = {
		personalizedName,
	};

	const renderData = await renderVideo({
		serveUrl,
		compositionId: COMPOSITION_ID,
		inputProps,
		outName: `logo-animation-${Date.now()}.mp4`,
	});

	return json({ ok: true, renderData });
};

export default function Index() {
	const [renderId, setRenderId] = useState<string | undefined>();
	const [personalizedName, setPersonalizedName] = useState('you');
	const fetcher = useFetcher();

	const onNameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) =>
			setPersonalizedName(e.target.value),
		[]
	);

	const onClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			e.preventDefault();
			const data = new FormData();
			data.append('personalizedName', personalizedName);
			fetcher.submit(data, { method: 'post' });
		},
		[fetcher, personalizedName]
	);

	useEffect(() => {
		if (fetcher.data?.renderData?.renderId) {
			setRenderId(fetcher.data?.renderData?.renderId);
		}
	}, [fetcher.data]);

	const resetRenderIds = useCallback(() => {
		setRenderId(undefined);
	}, []);

	const inputProps: LogoAnimationProps = useMemo(() => {
		return { personalizedName };
	}, [personalizedName]);

	return (
		<div style={container}>
			<div style={content}>
				<h1>Welcome to Remix + Remotion template!</h1>
				<div>
					{renderId ? (
						<RenderProgress renderId={renderId} reset={resetRenderIds} />
					) : (
						<div>
							<h3>Enter your name for a custom video</h3>
							<fetcher.Form method="post">
								<input
									type="text"
									onChange={onNameChange}
									value={personalizedName}
								/>
								<button type="submit" onClick={onClick}>
									Render a video
								</button>
							</fetcher.Form>
						</div>
					)}
				</div>
			</div>
			<div style={playerContainer}>
				<Player
					component={LogoAnimation}
					inputProps={inputProps}
					durationInFrames={COMPOSITION_DURATION_IN_FRAMES}
					fps={COMPOSITION_FPS}
					compositionWidth={COMPOSITION_WIDTH}
					compositionHeight={COMPOSITION_HEIGHT}
					controls
					style={playerStyle}
				/>
			</div>
		</div>
	);
}
