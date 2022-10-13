import type { ActionFunction, LinksFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { Player } from "@remotion/player";
import { LogoAnimation } from "~/remotion/logo-animation";
import stylesHref from "../styles/index.css";
import invariant from "tiny-invariant";
import { renderVideo } from "~/lib/render-video.server";
import { useCallback, useEffect, useState } from "react";
import { usePollRenderStatus } from "~/hooks/use-poll-render-status";
import type { EnhancedErrorInfo } from "@remotion/lambda/dist/functions/helpers/write-lambda-error";

const FPS = 30;

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesHref }];
};

export const action: ActionFunction = async ({ request }) => {
  const serveUrl = process.env.REMOTION_AWS_SERVE_URL;
  invariant(serveUrl, "REMOTION_AWS_SERVE_URL is not set");

  const renderProps = {
    serveUrl,
    compositionId: "LogoAnimation",
    inputProps: { noData: "empty" },
    videoName: `logo-animation-${Date.now()}.mp4`,
  };

  const renderData = await renderVideo(renderProps);

  return json({ ok: true, renderData });
};

export default function Index() {
  const [renderId, setRenderId] = useState<string | undefined>();
  const [renderErrors, setRenderErrors] = useState<EnhancedErrorInfo[]>([]);
  const fetcher = useFetcher();

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      fetcher.submit({}, { method: "post" });
    },
    [fetcher]
  );

  useEffect(() => {
    if (fetcher.data?.renderData?.renderId) {
      setRenderId(fetcher.data?.renderData?.renderId);
    }
  }, [fetcher.data]);

  const resetRenderIds = useCallback(() => {
    setRenderId(undefined);
  }, []);

  const onError = useCallback(
    (e: EnhancedErrorInfo[]) => {
      resetRenderIds();
      setRenderErrors(e);
      console.error(e);
    },
    [resetRenderIds]
  );

  const { renderProgress, isPolling, videoUrls } = usePollRenderStatus({
    renderIds: [renderId],
    shouldStartPolling: !!renderId,
    onComplete: resetRenderIds,
    onError: onError,
  });

  if (renderErrors.length > 0) {
    return (
      <div>
        <h3>Well this is unfortunate but there is an error...</h3>
        <span>{renderErrors.join(", ")}</span>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "Founders Grotesk, sans-serif",
        lineHeight: "1.4",
        fontWeight: 700,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Welcome to Remix + Remotion template !</h1>
        <div>
          {!isPolling && !videoUrls && (
            <div>
              <h3>Do you want to download this video ?</h3>
              <fetcher.Form method="post">
                <button type="submit" onClick={onClick}>
                  Render a video
                </button>
              </fetcher.Form>
            </div>
          )}
          {isPolling && (
            <div>
              <h3>Rendering...</h3>
              {renderProgress && (
                <div>{`${Math.round(renderProgress * 100)}%`}</div>
              )}
            </div>
          )}
          {videoUrls?.map((videoUrl, index) => {
            if (!videoUrl) return null;
            return (
              <a
                key={`file-${index}`}
                href={videoUrl || ""}
                target="_blank"
                rel="noopener noreferrer"
                className="file-download-link"
              >
                {`Download ${index + 1}`}
              </a>
            );
          })}
        </div>
      </div>
      <div
        style={{
          backgroundColor: "black",
          padding: 48,
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
            marginInline: "auto",
            width: "80vw",
            height: "max(600px, 80vh)",
          }}
        />
      </div>
    </div>
  );
}
