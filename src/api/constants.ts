class Endpoint {
  static BASE = 'https://us-central1-corona-688fb.cloudfunctions.net/';
  static BASE_DEV = 'http://localhost:5000/corona-688fb/us-central1/';
  private slug: string;

  constructor(slug: string) {
    this.slug = slug;
  }

  getURL(): string {
    return Endpoint.BASE + this.slug;
  }

  getDevURL(): string {
    return Endpoint.BASE_DEV + this.slug;
  }
}

export const Endpoints = {
  Cluster: new Endpoint('processClusterRequest'),
};

export const firebaseConfig = {
  apiKey: process.env.firebaseAppAPIKey,
  authDomain: 'corona-688fb.firebaseapp.com',
  databaseURL: 'https://corona-688fb.firebaseio.com',
  projectId: 'corona-688fb',
  storageBucket: 'corona-688fb.appspot.com',
  messagingSenderId: '716029004059',
  appId: process.env.firebaseAppID,
  measurementId: process.env.firebaseMeasurementID,
};
