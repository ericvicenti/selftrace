import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ExpoLocation from 'expo-location';
import * as API from '../../api';
import { ProgressActionCreator, ErrorActionCreator, Dispatch, ActionType } from '..';
import { Progress } from '../../data-types';
import PromiseUtils from '../../util/PromiseUtils';

class LocationPermissionError extends Error {}

/*
 * Action creators
 */

export const startUpdateUserInfoRequest: ProgressActionCreator = () => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  progress: Progress.createRequesting('Updating...'),
});

export const startRetrievingUserLocation: ProgressActionCreator = () => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  progress: Progress.createRequesting('Trying to retrieve your current location...'),
});

export const receiveUpdateUserInfoResponse: ProgressActionCreator = (updatedInfo: object) => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  payload: updatedInfo,
  progress: Progress.createSuccess('Update successful.'),
});

export const receiveUpdateUserInfoError: ErrorActionCreator = err => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  progress: Progress.createError(err.message || 'An unknown error has occured.'),
});

export const clearUpdateUserInfoProgress: ProgressActionCreator = () => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  progress: Progress.createNil(),
});

const GRACEFUL_EXIT_DURATION = 750;

export const uploadUserInfo = (
  uid: string,
  updatedInfo: Partial<API.FirestoreUserDoc>,
  haveDetailsChanged: boolean
) => async (dispatch: Dispatch) => {
  dispatch(startUpdateUserInfoRequest());
  try {
    const lastUpdatedAtRaw = await AsyncStorage.getItem('lastUpdatedAt');
    const hasNotUpdatedFor30Mins =
      !lastUpdatedAtRaw || Date.now() - Number(lastUpdatedAtRaw) > 1000 * 60 * 30;

    if (haveDetailsChanged || hasNotUpdatedFor30Mins) {
      const updatedInfoFinal: Partial<API.FirestoreUserDoc> = {
        ...updatedInfo,
      };

      if (hasNotUpdatedFor30Mins) {
        dispatch(startRetrievingUserLocation());
        const { latitude, longitude } = await retrieveLastLocationWithPermission();
        updatedInfoFinal.lastLocation = { lat: latitude, lng: longitude };
      }

      await API.requestUpdateUserInfo(uid, updatedInfoFinal);
      await AsyncStorage.setItem('lastUpdatedAt', Date.now().toString());
    } else {
      await PromiseUtils.sleep(750);
    }

    dispatch(receiveUpdateUserInfoResponse(updatedInfo));
    setTimeout(() => {
      dispatch(clearUpdateUserInfoProgress());
    }, GRACEFUL_EXIT_DURATION);
  } catch (err) {
    const error =
      err instanceof LocationPermissionError
        ? new Error('Update failed because you did not agree to share your location.') // TODO: Localize
        : err;
    dispatch(receiveUpdateUserInfoError(error));
  }
};

/*
 * Helpers
 */

async function retrieveLastLocationWithPermission(): Promise<Geo.Location> {
  try {
    const { status, canAskAgain } = await Permissions.getAsync(Permissions.LOCATION);
    if (status === 'granted') {
      return getCurrentPosition();
    }
    if (canAskAgain) {
      const { status: status2 } = await Permissions.askAsync(Permissions.LOCATION);
      if (status2 === 'granted') {
        return getCurrentPosition();
      }
    }

    throw new LocationPermissionError();
  } catch (err) {
    return Promise.reject(err);
  }
}

async function getCurrentPosition(): Promise<Geo.Location> {
  try {
    const {
      coords: { latitude, longitude },
    } = await ExpoLocation.getCurrentPositionAsync({ accuracy: ExpoLocation.Accuracy.High });
    return { latitude, longitude };
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function downloadUserInfoToLocalDB(uid: string): Promise<void> {
  try {
    const userDoc = await API.requestUserInfo(uid);

    if (!userDoc) {
      // The user has just signed up. The server is creating the user document in Firestore.
      return undefined;
    }
    const { wellbeing, symptomMap } = userDoc;

    const storageTasks: Promise<void>[] = [];

    if (wellbeing) {
      storageTasks.push(AsyncStorage.setItem('wellbeing', wellbeing.toString()));
    }

    if (symptomMap) {
      storageTasks.push(AsyncStorage.setItem('symptomMap', JSON.stringify(symptomMap)));
    }

    if (storageTasks.length > 0) {
      await Promise.all(storageTasks);
    }

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}
