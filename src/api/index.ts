import * as firebase from 'firebase';
import config from './config';

export function initialize() {
  if (firebase.apps.length === 0) {
    return firebase.initializeApp(config);
  }
  return undefined;
}

export * from './auth';
export * from './clusters';
export * from './config';
export * from './database';
