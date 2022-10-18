# Remotion Remix template!

- [Remix Docs](https://remix.run/docs)
- [Remotion Docs](https://remotion.dev/docs)

## This template :

This is a Remix app that using `@remotion/player` and `@remotion/lambda`.
It lets you render a video from a remix app with Amazon Lambda.

Check the online version here : [https://remotion-remix-template.vercel.app/](https://remotion-remix-template.vercel.app/)

Here is the ouput video :

https://user-images.githubusercontent.com/11575645/195991193-f854448a-cdf1-4d61-acb8-ffae44d53b3b.mp4

## Getting started

Copy the `.env.example` file to `.env` and fill in the values. You can get the values needed by following the Remotion lambda setup guide : [Remotion docs](https://www.remotion.dev/docs/lambda/setup).

Change the lambda function name and site name in `package.json` accordingly to allow yourself to use the scripts.

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
