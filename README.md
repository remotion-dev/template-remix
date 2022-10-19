# Remotion + Remix Starter Kit

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.gif">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

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
3. Fill in the `REMOTION_AWS_REGION` with the region that you would like to use, e.g. `us-east-1`.
4. Fill in the `REMOTION_AWS_ACCESS_KEY_ID` and `REMOTION_AWS_SECRET_ACCESS_KEY` values that you got from the first step.
5. Run the following to generate a [Serve URL](https://www.remotion.dev/docs/terminology#serve-url) and use it to fill in the `REMOTION_AWS_SERVE_URL` value:

```
npm run remotion:deploysite
```

6. Run the following [to deploy a Lambda function](https://www.remotion.dev/docs/lambda/cli/functions#deploy) and fill in the function name as `REMOTION_AWS_FUNCTION_NAME`.

```
npm run remotion:deployfunction
```

7. Restart the Remix server.

## Commands

Start the app in development mode:

```
npm run dev
```

Build the app for production:

```
npm run build
```

Start the app in production mode (after build is done):

```
npm start
```

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

## Upgrading Remotion

When upgrading Remotion to a newer version, you will need to redeploy your function and update your site using the commands above.  
Afterwards, update the environment variables `REMOTION_AWS_SERVE_URL` and `REMOTION_AWS_FUNCTION_NAME`.  
If your functions or sites are already used in production, make sure to not overwrite them - [read here](https://www.remotion.dev/docs/lambda/upgrading) for more details about upgrading.

## Docs

Get started with Remotion by reading the [fundamentals page](https://www.remotion.dev/docs/the-fundamentals).  
See the [Remix Docs](https://remix.run/docs) to read about the framework.

## Help

Join the [Remotion Discord server](https://remotion.dev/discord) to chat with other Remotion builders.

## Issues

Found an issue with Remotion? [File an issue here](https://remotion.dev/issue).

## License

Notice that for some entities a Remotion company license is needed. Read [the terms here](https://remotion.dev/license).
