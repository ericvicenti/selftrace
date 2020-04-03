import { Action, ActionType, AuthStatusAction } from '../../actions';
import { resetPassword, ReduxAuthResetPassword } from './resetPassword';
import { signin, ReduxAuthSignin } from './signin';
import { signout, ReduxAuthSignout } from './signout';
import { signup, ReduxAuthSignup } from './signup';
import { status, ReduxAuthStatus } from './status';
import { updatePassword, ReduxAuthUpdatePassword } from './updatePassword';
import { userInfo, ReduxAuthUserInfo } from './userInfo';
import { AuthStatus, Progress } from '../../data-types';

export interface ReduxAuth {
  signup: ReduxAuthSignup;
  signin: ReduxAuthSignin;
  signout: ReduxAuthSignout;
  updatePassword: ReduxAuthUpdatePassword;
  resetPassword: ReduxAuthResetPassword;
  userInfo: ReduxAuthUserInfo;
  status: ReduxAuthStatus;
}

const INITIAL_STATE: ReduxAuth = {
  signup: { progress: Progress.createNil() },
  signin: { progress: Progress.createNil() },
  signout: { progress: Progress.createNil() },
  updatePassword: { progress: Progress.createNil() },
  resetPassword: { progress: Progress.createNil() },
  userInfo: {
    uid: null,
    email: null,
    progress: Progress.createNil(),
    wellbeing: undefined,
  },
  status: AuthStatus.Checking,
};

export default (state = INITIAL_STATE, action: Action): ReduxAuth => {
  switch (action.type) {
    case ActionType.REQUEST_SIGNUP:
    case ActionType.REQUEST_SIGNIN:
      return {
        ...state,
        signup: signup(state.signup, action),
        signin: signin(state.signin, action),
      };
    case ActionType.REQUEST_SIGNOUT:
      return {
        ...state,
        signout: signout(state.signout, action),
        userInfo: userInfo(state.userInfo, action),
      };
    case ActionType.REQUEST_UPDATE_PASSWORD:
      return {
        ...state,
        updatePassword: updatePassword(state.updatePassword, action),
      };
    case ActionType.REQUEST_RESET_PASSWORD:
      return {
        ...state,
        resetPassword: resetPassword(state.resetPassword, action),
      };
    case ActionType.REQUEST_UPDATE_USER_INFO:
    case ActionType.REFRESH_STORE_WITH_DB_DATA_SUCCESS:
      return { ...state, userInfo: userInfo(state.userInfo, action) };
    case ActionType.SET_AUTH_STATUS: {
      return {
        ...state,
        status: status(action as AuthStatusAction),
        userInfo: userInfo(state.userInfo, action),
      };
    }
    default:
      return state;
  }
};

/*
 * Selectors
 */

/**
 * A selector that derives whether auth (i.e. signin and signup)
 * is disabled from Redux state.
 */
export function isAuthDisabled(state: ReduxAuth) {
  return (
    state.signin.progress.isRequesting() ||
    state.signout.progress.isRequesting() ||
    state.status === AuthStatus.Checking ||
    state.status === AuthStatus.SignedIn
  );
}

export * from './resetPassword';
export * from './signin';
export * from './signout';
export * from './signup';
export * from './status';
export * from './updatePassword';
export * from './userInfo';
