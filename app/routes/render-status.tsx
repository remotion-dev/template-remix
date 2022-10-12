import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { AwsRegion } from "@remotion/lambda";
import { getRenderProgress } from "@remotion/lambda";
import invariant from "tiny-invariant";

export const action: ActionFunction = async ({ request }) => {
  const body = await request.formData();
  //@ts-ignore
  const renderIds = JSON.parse(body.get("renderIds")) as
    | Array<string>
    | undefined;
  invariant(renderIds, "renderIds are not defined");
  console.log("renderIds", JSON.stringify(renderIds, null, 2));

  const functionName = process.env.REMOTION_AWS_FUNCTION_NAME;
  invariant(functionName, "REMOTION_AWS_FUNCTION_NAME is not set");
  console.log("functionName", JSON.stringify(functionName, null, 2));

  const region = (process.env.REMOTION_AWS_REGION || "us-east-1") as AwsRegion;
  console.log("region", JSON.stringify(region, null, 2));

  const bucketName = process.env.REMOTION_AWS_BUCKET_NAME;
  invariant(bucketName, "REMOTION_AWS_BUCKET_NAME is not defined");
  console.log("bucketName", JSON.stringify(bucketName, null, 2));

  const status = await Promise.all(
    renderIds.map(async (renderId) => {
      const renderProgress = await getRenderProgress({
        renderId: renderId,
        bucketName,
        functionName,
        region: region,
      });
      const { done, overallProgress, errors, outputFile } = renderProgress;
      return { renderId, done, overallProgress, errors, outputFile };
    })
  );

  return json(status);
};
