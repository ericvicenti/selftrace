// import * as Location from 'expo-location';
// import * as Permissions from 'expo-permissions';
import { UserInfo } from 'firebase';
import { AsyncStorage } from 'react-native';
import * as API from '../../api';
import { ActionCreator, AuthStatusAction, Dispatch, ActionType } from '..';
import { ReduxAuthUserInfo } from '../../reducers/auth/userInfo';
import { AuthStatus } from '../../data-types';
import { pullUserInfoFromLocalDBToRedux } from '../helpers';
import { downloadUserInfoToLocalDB } from './userInfo';

const setAuthStatusToSignedIn: ActionCreator<AuthStatusAction> = (userInfo: ReduxAuthUserInfo) => ({
  type: ActionType.SET_AUTH_STATUS,
  payload: { status: AuthStatus.SignedIn, userInfo },
});

const setAuthStatusToSignedOut: ActionCreator<AuthStatusAction> = () => ({
  type: ActionType.SET_AUTH_STATUS,
  payload: { status: AuthStatus.SignedOut },
});

export const subscribeToAuthStateChange = () => (dispatch: Dispatch) => {
  API.initialize();

  return API.requestAuthStateListener((async (user: UserInfo) => {
    if (!user) {
      // Case 1: Signed out
      await AsyncStorage.removeItem('wellbeing');

      return dispatch(setAuthStatusToSignedOut());
    }

    // Case 2: Signed in
    const userInfo: Partial<ReduxAuthUserInfo> = {
      email: user.email,
      uid: user.uid,
    };

    await downloadUserInfoToLocalDB(user.uid);
    await pullUserInfoFromLocalDBToRedux(dispatch);
    return dispatch(setAuthStatusToSignedIn(userInfo));
  }) as any);
};

// async function handlePermissions() {
//   const { granted, canAskAgain } = await Permissions.getAsync(Permissions.LOCATION);

//   if (!granted && canAskAgain) {
//     await Permissions.askAsync(Permissions.LOCATION);
//   }
// }

// async function startLocationUpdates() {
//   const { status } = await Permissions.getAsync(Permissions.LOCATION);

//   if (status === 'granted' && TaskManager.isTaskDefined('sendLastLocationToBackend')) {
//     return Location.startLocationUpdatesAsync('sendLastLocationToBackend', {
//       accuracy: Location.Accuracy.High,
//       timeInterval: 600000, // 10 min
//       distanceInterval: 50, // in meters
//       showsBackgroundLocationIndicator: false,
//       // foregroundService: {
//       //   notificationTitle: '',
//       //   notificationBody: '',
//       //   notificationColor: '',
//       // },
//       pausesUpdatesAutomatically: true,
//     });
//   }

//   return Promise.resolve();
// }
