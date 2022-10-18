import { Composition } from 'remotion';
import {
	COMPOSITION_FPS,
	COMPOSITION_HEIGHT,
	COMPOSITION_WIDTH,
} from './constants';
import { LogoAnimation } from './logo-animation';

export const RemotionVideo = () => {
	return (
		<>
			<Composition
				id="LogoAnimation"
				component={LogoAnimation}
				durationInFrames={COMPOSITION_FPS * 7}
				fps={COMPOSITION_FPS}
				width={COMPOSITION_WIDTH}
				height={COMPOSITION_HEIGHT}
			/>
		</>
	);
};
