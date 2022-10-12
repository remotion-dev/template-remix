import { AbsoluteFill, interpolate, Series, useVideoConfig } from "remotion";
import { spring, useCurrentFrame } from "remotion";
import { Sequence } from "remotion";
import { PlusSymbol } from "./components/plus-symbol";
import { RemixLineToPerson } from "./components/remix-logo/remix-line-to-person";
import { RemixNotAnimated } from "./components/remix-logo/remix-not-animated";
import { RemixPersonToFusion } from "./components/remix-logo/remix-person-to-fusion";
import { RemotionLineToPerson } from "./components/remotion-logo/remotion-line-to-person";
import { RemotionNotAnimated } from "./components/remotion-logo/remotion-not-animated";
import { RemotionPersonToFusion } from "./components/remotion-logo/remotion-person-to-fusion";
import { LogoAnimationSequence } from "./components/logo-apparition-sequence";
import { loadFonts } from "./load-fonts";
loadFonts();

export const LogoAnimation = () => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const progress = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
  });

  const remixXOffset = interpolate(progress, [0, 1], [-900, 180]);
  const remotionXOffset = interpolate(progress, [0, 1], [900, 0]);
  const plusYOffset = interpolate(progress, [0, 1], [900, 0]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
      }}
    >
      <Series>
        <Series.Sequence durationInFrames={fps * 1.5}>
          <RemixNotAnimated horizontalOffset={remixXOffset} />
          <RemotionNotAnimated horizontalOffset={remotionXOffset} />
          <PlusSymbol verticalOffset={plusYOffset} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={fps * 1.5}>
          <RemixLineToPerson horizontalOffset={remixXOffset} />
          <RemotionLineToPerson horizontalOffset={remotionXOffset} />
          <PlusSymbol />
        </Series.Sequence>
        <Series.Sequence durationInFrames={fps * 1.5}>
          <RemixPersonToFusion horizontalOffset={remixXOffset} />
          <RemotionPersonToFusion horizontalOffset={remotionXOffset} />
          <PlusSymbol />
        </Series.Sequence>
      </Series>
      <Sequence from={fps * 3.5} durationInFrames={fps * 3}>
        <LogoAnimationSequence />
      </Sequence>
    </AbsoluteFill>
  );
};
