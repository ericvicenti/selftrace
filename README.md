# CoronaMap

 |                 Form                 |                 Map                  |               Cluster                |
 | :----------------------------------: | :----------------------------------: | :----------------------------------: |
 | ![](https://i.imgur.com/ToSa9q8.png) | ![](https://i.imgur.com/ADvAbav.png) | ![](https://i.imgur.com/PpXVGYx.png) |

CoronaMap is an open-source effort to create a live map that anonymously shows all users who self-reportedly have coronavirus (COVID-19) or show some of its symptoms. We are aiming to build a tool that
1. will help people track the spread in real-time and self-distance accordingly
2. give us an idea on how fast the virus is spreading according to unofficial user data.

We have already built the IOS/Android apps but the App Store is blocking our submission due to their recent decision to crack down on all COVID-19 related apps from non-governmental organisations. We are now building the web app and connecting it to the backend. This repo contains the work for the web-app.

## Contributing
Volunteers from all backgrounds are welcome as we will be needing help with frontend, backend, translations, content, etc. Our current stack is TypeScript, React Native, Expo, Next.js for the frontend and Firebase + Cloud Functions (TypeScript/Node.js) for the backend. You can also check our [listing](https://helpwithcovid.com/projects/81) on the new Help With COVID site and sign up to voluteer.

## Instructions

Prerequisites

- Node LTS

Commands

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
