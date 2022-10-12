import { continueRender, delayRender, staticFile } from "remotion";

const waitForGroteskFont = delayRender("groteskFont");
const groteskFont = new FontFace(
  `Founders Grotesk`,
  `url(${staticFile("fonts/FoundersGrotesk-Bold.woff2")}) format('woff2')`,
  { weight: "700" }
);

groteskFont
  .load()
  .then(() => {
    document.fonts.add(groteskFont);
    continueRender(waitForGroteskFont);

    console.log("Loaded Grotesk font");
  })
  .catch((err) => console.log("Error loading font", err));

const waitForGtPlanar = delayRender("gtPlanar");
const gtPlanarFont = new FontFace(
  `GTPlanar`,
  `url(${staticFile("fonts/gt-planar-black.woff2")}) format('woff2')`,
  { weight: "700" }
);

gtPlanarFont
  .load()
  .then(() => {
    document.fonts.add(gtPlanarFont);
    continueRender(waitForGtPlanar);
    console.log("Loaded GTPlanar font");
  })
  .catch((err) => console.log("Error loading font", err));
