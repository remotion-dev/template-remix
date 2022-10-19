# Remotion Remix template!

- [Remix Docs](https://remix.run/docs)
- [Remotion Docs](https://remotion.dev/docs)

This is a [Remix starter kit](https://remix.run/docs) with [Remotion](https://remotion.dev), [`@remotion/player`](https://remotion.dev/player) and [`@remotion/lambda`](https://remotion.dev/lambda) built in.  
It lets you render a video from a Remix app with AWS Lambda.

Check the online version here: [https://remotion-remix-template.vercel.app/](https://remotion-remix-template.vercel.app/)

Here is the output video:

https://user-images.githubusercontent.com/11575645/195991193-f854448a-cdf1-4d61-acb8-ffae44d53b3b.mp4

## Getting started

Install dependencies using

<!-- create-video will replace this with the package manager specific command -->

```
npm install
```

## Run the Remix app

Run the example app using:

```
npm run dev
```

## Edit the video

Start the Remotion Preview (the editor interface) using:

```
npm run remotion:preview
```

## Render videos with AWS Lambda

Follow these steps to set up video rendering:

1. Follow the steps in [Remotion Lambda setup guide](https://www.remotion.dev/docs/lambda/setup).
2. Rename the `.env.example` file to `.env`.
3. Fill in the `REMOTION_AWS_ACCESS_KEY_ID` and `REMOTION_AWS_SECRET_ACCESS_KEY` values that you got from the first step.
4. Run the following to generate a [Serve URL](https://www.remotion.dev/docs/terminology#serve-url) and use it to fill in the `REMOTION_AWS_SERVE_URL` value:

```
npm run remotion:deploysite
```

5. Run the following [to deploy a Lambda function](https://www.remotion.dev/docs/lambda/cli/functions#deploy) and fill in the function name as `REMOTION_AWS_FUNCTION_NAME`.

```
npm run remotion:deployfunction
```

6. Restart the Remix server.

## Commands

### Remix

Start the app in development mode:

```
npm run dev
```

Build the app:

```
npm run build
```

Start the app in production mode (after build is done):

```
npm start
```

### Remotion

Start the Remotion preview:

```
npm run remotion:preview
```

Render the example video localle:

```
npm run remotion:render
```

Upgrade all Remotion packages:

```
npm run remotion:upgrade
```

Render the example video on AWS Lambda:

```
npm run remotion:renderlambda
```

(Re-)Deploy the AWS lambda function:

```
npm run remotion:deployfunction
```

Deploy/Update the Remotion video on S3:

```
npm run remotion:deploysite
```
