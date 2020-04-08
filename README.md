# Selftrace

 |                 Form                 |                 Map                  |               Cluster                |
 | :----------------------------------: | :----------------------------------: | :----------------------------------: |
 | ![](https://i.imgur.com/ToSa9q8.png) | ![](https://i.imgur.com/ADvAbav.png) | ![](https://i.imgur.com/PpXVGYx.png) |

[Selftrace](https://selftrace.org) is an open-source effort to map self-reported COVID-19 cases in real-time. We require that users self-report and, as a reward, show them a live map with anonymous clusters of users who are symptomatic or have tested positive.

Our aim is to build a tool that will
1. allow people to track the spread in real-time and take pre-emptive measures to avoid contact with high risk individuals
2. show people how fast the virus is spreading according to unofficial user data
3. allow us to collect meaningful data on a daily basis which we may share with scientists to further their research.

## Contributing
This repo contains the code for the web-app. Our current stack is TypeScript, React Native Web, Expo, Next.js for the frontend and Firebase + Cloud Functions (TypeScript/Node.js) for the backend. We have 2 other repos that you may want check:
- [React Native/Expo app](https://github.com/kafkas/selftrace)
- [Firebase Cloud Functions](https://github.com/kafkas/selftrace-cloud)

To contribute, please have a look at the issues, pick one that you want to work on and ask to be assigned. Also, there are many TODOs and FIXMEs throughout the codebase, so feel free to work on them as well. Please PR into the `dev` branch. If you want to join our Slack workspace please visit our [listing](https://helpwithcovid.com/projects/81) on Help With COVID and sign up to volunteer. You will receive an invite afterwards.

## Instructions

### Prerequisites

- Node LTS

Make sure to create a `.env` file at the root level with the following environment variables:
```
GOOGLE_MAPS_API_KEY=YOUR_API_KEY
FIREBASE_APP_API_KEY=YOUR_API_KEY
FIREBASE_APP_ID=YOUR_APP_ID
FIREBASE_MEASUREMENT_ID=YOUR_MEASUREMENT_ID
```

### Commands

##### With npm

```sh
npm install
npm start
```

##### With yarn

```sh
yarn
yarn start
```

You should be able to visit `localhost:3000` in your browser.

### How do I deploy my own version of this?

- Site is hosted on Now, and this is the easiest way to do it.
- You can deploy your own with your own Now account

```sh
npm i -g now
# log in if you need to
now
```

### How do I deploy to production?

Get a commit on master and it will be automatically deployed.
