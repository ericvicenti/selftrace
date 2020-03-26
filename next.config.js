require('dotenv').config();

const { withExpo } = require('@expo/next-adapter');
const withImages = require('next-images');
const withFonts = require('next-fonts');
const withSourceMaps = require('@zeit/next-source-maps');

module.exports = withExpo(
  withImages(
    withFonts(
      withSourceMaps({
        projectRoot: __dirname,
        webpack: (config, options) => {
          if (!options.isServer) {
            config.resolve.alias['@sentry/node'] = '@sentry/browser';
          }
          return config;
        },
        env: {
          googleMapsAPIKey: process.env.GOOGLE_MAPS_API_KEY,
        },
      })
    )
  )
);
