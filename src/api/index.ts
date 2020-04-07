import * as firebase from 'firebase';
import { firebaseConfig } from './constants';

export function initialize() {
  if (firebase.apps.length === 0) {
    return firebase.initializeApp(firebaseConfig);
  }
  return undefined;
}

export * from './auth';
export * from './clusters';
export * from './database';
