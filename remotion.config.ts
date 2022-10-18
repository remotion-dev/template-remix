import path from 'path';
import { Config } from 'remotion';

Config.Bundling.overrideWebpackConfig((config) => {
	return {
		...config,
		resolve: {
			...config.resolve,
			alias: {
				...(config.resolve?.alias ?? {}),
				'~': path.join(process.cwd(), 'app'),
			},
		},
	};
});
