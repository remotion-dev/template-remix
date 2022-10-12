import { Composition } from "remotion";
import { LogoAnimation } from "./logo-animation";

const FPS = 30;

export const RemotionVideo = () => {
  return (
    <>
      <Composition
        id="LogoAnimation"
        component={LogoAnimation}
        durationInFrames={FPS * 7}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
