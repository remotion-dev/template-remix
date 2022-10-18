import { continueRender, delayRender, staticFile } from 'remotion';

export const loadFonts = async () => {
	const waitForGroteskFont = delayRender('groteskFont');
	const groteskFont = new FontFace(
		`Founders Grotesk`,
		`url(${staticFile('fonts/FoundersGrotesk-Bold.woff2')}) format('woff2')`,
		{ weight: '700' }
	);

	groteskFont
		.load()
		.then(() => {
			document.fonts.add(groteskFont);
			continueRender(waitForGroteskFont);
		})
		.catch((err) => console.log('Error loading font', err));

	const waitForGtPlanar = delayRender('gtPlanar');
	const gtPlanarFont = new FontFace(
		`GTPlanar`,
		`url(${staticFile('fonts/gt-planar-black.woff2')}) format('woff2')`,
		{ weight: '700' }
	);

	gtPlanarFont
		.load()
		.then(() => {
			document.fonts.add(gtPlanarFont);
			continueRender(waitForGtPlanar);
		})
		.catch((err) => console.log('Error loading font', err));
};
