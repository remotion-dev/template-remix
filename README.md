# Remotion Remix template!

- [Remix Docs](https://remix.run/docs)
- [Remotion Docs](https://remotion.dev/docs)

## This template:

This is a [Remix starter kit](https://remix.run/docs) with [Remotion](https://remotion.dev), [`@remotion/player`](https://remotion.dev/player) and [`@remotion/lambda`](https://remotion.dev/lambda) built in.  
It lets you render a video from a remix app with Amazon Lambda.

Check the online version here: [https://remotion-remix-template.vercel.app/](https://remotion-remix-template.vercel.app/)

Here is the output video:

https://user-images.githubusercontent.com/11575645/195991193-f854448a-cdf1-4d61-acb8-ffae44d53b3b.mp4

## Getting started

Clone the repository and install dependencies using `npm i`.

> If you prefer to use Yarn, run `yarn`.  
> If you prefer to use pnpm, run `pnpm i`.

Run the example app using `npm run dev`.

## Set up rendering via AWS Lambda

1. Follow the [Remotion Lambda setup guide](https://www.remotion.dev/docs/lambda/setup).
2. Rename the `.env.example` file to `.env`.
3. Fill in the `REMOTION_AWS_ACCESS_KEY_ID` and `REMOTION_AWS_SECRET_ACCESS_KEY` values that you got from the first step.
4. Run

```
npm run remotion:lambda:site:update
```

to generate a [Serve URL](https://www.remotion.dev/docs/terminology#serve-url) and use it to fill in the `REMOTION_AWS_SERVE_URL` value.

5. Run

```
remotion:lambda:function:deploy
```

6. Restart the Remix server.

to deploy a Lambda function and fill in the function name as `REMOTION_AWS_FUNCTION_NAME`.

## Scripts

### Remix

- `yarn build` - build the app
- `yarn dev` - start the app in development mode
- `yarn start` - start the app in production mode

### Remotion

- `yarn remotion:start`: start the remotion preview
- `yarn remotion:build`: render the example video
- `yarn remotion:upgrade`: upgrade all Remotion packages
- `yarn remotion:lambda:build`: render the video with lambda
- `yarn remotion:lambda:function:deploy`: deploy the AWS lambda function
- `yarn remotion:lambda:site:update`: update the AWS lambda site
