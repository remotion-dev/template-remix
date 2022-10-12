import type { AwsRegion } from "@remotion/lambda";
import { renderMediaOnLambda } from "@remotion/lambda";
import invariant from "tiny-invariant";

export const renderVideo = async ({
  serveUrl,
  compositionId,
  inputProps,
  videoName,
}: {
  serveUrl: string;
  compositionId: string;
  inputProps: any;
  videoName: string;
}) => {
  console.log("in renderVideo");
  const functionName = process.env.REMOTION_AWS_FUNCTION_NAME;
  invariant(functionName, "REMOTION_AWS_FUNCTION_NAME is not set");

  const awsRegion = (process.env.REMOTION_AWS_REGION ||
    "us-east-1") as AwsRegion;

  const { renderId, bucketName } = await renderMediaOnLambda({
    region: awsRegion,
    functionName,
    serveUrl,
    composition: compositionId,
    inputProps,
    codec: "h264",
    imageFormat: "jpeg",
    maxRetries: 1,
    privacy: "public",
    outName: videoName,
  });

  return {
    renderId,
    bucketName,
    functionName,
    region: awsRegion,
  };
};
