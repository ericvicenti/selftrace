const config = {
  apiKey: process.env.firebaseAppAPIKey,
  authDomain: 'corona-688fb.firebaseapp.com',
  databaseURL: 'https://corona-688fb.firebaseio.com',
  projectId: 'corona-688fb',
  storageBucket: 'corona-688fb.appspot.com',
  messagingSenderId: '716029004059',
  appId: process.env.firebaseAppID,
  measurementId: process.env.firebaseMeasurementID,
};

export const BASE_URL = `https://us-central1-${config.projectId}.cloudfunctions.net`;

export const CLUSTERS_ENDPOINT = BASE_URL + '/processClusterRequest';
export const CLUSTERS_ENDPOINT_DEV =
  'http://localhost:5000/corona-688fb/us-central1/processClusterRequest';

export default config;
