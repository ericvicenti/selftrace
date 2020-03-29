import { AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import * as API from '../../api';
import { ReduxAuthUserInfo } from '../../reducers/auth/userInfo';
import { ActionCreator, NetworkAction, Dispatch, ActionType } from '..';
import { ProgressStatus, Location as LocationDT } from '../../data-types';
import PromiseUtils from '../../util/PromiseUtils';

class LocationPermissionError extends Error {}

/*
 * Action creators
 */

export const startUpdateUserInfoRequest: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  progress: {
    message: 'Updating...',
    status: ProgressStatus.REQUEST,
  },
});

export const startRetrievingUserLocation: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  progress: {
    message: 'Trying to retrieve your current location...',
    status: ProgressStatus.REQUEST,
  },
});

export const receiveUpdateUserInfoResponse: ActionCreator<NetworkAction> = (
  updatedInfo: Partial<ReduxAuthUserInfo>
) => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  payload: updatedInfo,
  progress: {
    message: 'Update successful.',
    status: ProgressStatus.SUCCESS,
  },
});

export const receiveUpdateUserInfoError: ActionCreator<NetworkAction> = err => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  progress: {
    message: err.message || 'An unknown error has occured.',
    status: ProgressStatus.ERROR,
  },
});

export const clearUpdateUserInfoProgress: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_UPDATE_USER_INFO,
  progress: {
    message: null,
    status: ProgressStatus.NIL,
  },
});

const GRACEFUL_EXIT_DURATION = 750;

export const uploadUserInfo = (uid: string, updatedInfo: Partial<API.FirestoreUserDoc>) => async (
  dispatch: Dispatch
) => {
  dispatch(startUpdateUserInfoRequest());
  try {
    const lastUpdatedAtRaw = await AsyncStorage.getItem('lastUpdatedAt');
    if (!lastUpdatedAtRaw || Date.now() - Number(lastUpdatedAtRaw) > 1800000) {
      // Have not updated from this device for at least 30 mins
      dispatch(startRetrievingUserLocation());
      const { latitude, longitude } = await retrieveLastLocationWithPermission();
      const updatedInfoWithLastLocation: Partial<API.FirestoreUserDoc> = {
        ...updatedInfo,
        lastLocation: { lat: latitude, lng: longitude },
      };
      await API.requestUpdateUserInfo(uid, updatedInfoWithLastLocation);
      const updatedAt = Date.now();
      await AsyncStorage.setItem('lastUpdatedAt', updatedAt.toString());
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

async function retrieveLastLocationWithPermission(): Promise<LocationDT> {
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

async function getCurrentPosition(): Promise<LocationDT> {
  try {
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    return { latitude, longitude };
  } catch (err) {
    return Promise.reject(err);
  }
}

export async function downloadUserInfoToLocalDB(uid: string) {
  try {
    const userDoc = await API.requestUserInfo(uid);

    if (!userDoc) {
      // The user has just signed up. The server is creating the user document in Firestore.
      return undefined;
    }
    const { wellbeing } = userDoc;
    if (wellbeing) {
      await AsyncStorage.setItem('wellbeing', wellbeing.toString());
    }

    return Promise.resolve();
  } catch (err) {
    return Promise.reject(err);
  }
}
