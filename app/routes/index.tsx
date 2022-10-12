import type { LinksFunction } from "@remix-run/node";
import { Player } from "@remotion/player";
import { LogoAnimation } from "~/remotion/logo-animation";
import stylesHref from "./index.css";

const FPS = 30;

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesHref }];
};

export default function Index() {
  return (
    <div
      style={{
        fontFamily: "Founders Grotesk, sans-serif",
        lineHeight: "1.4",
        fontWeight: 700,
      }}
    >
      <h1>Welcome to Remix + Remotion template !</h1>
      <div
        style={{
          backgroundColor: "black",
          padding: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Player
          component={LogoAnimation}
          durationInFrames={FPS * 7}
          fps={FPS}
          compositionWidth={1920}
          compositionHeight={1080}
          controls
          style={{
            width: "80%",
          }}
        />
      </div>
    </div>
  );
}
