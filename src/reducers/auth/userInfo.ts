import { Action, NetworkAction, AuthStatusAction, ActionType } from '../../actions';
import { Progress, AuthStatus, Wellbeing } from '../../data-types';

export interface ReduxAuthUserInfo {
  uid: string | null;
  email: string | null;
  wellbeing: Wellbeing | undefined;
  progress: Progress;
}

const INITIAL_STATE: Readonly<ReduxAuthUserInfo> = {
  uid: null,
  email: null,
  wellbeing: undefined,
  progress: Progress.createNil(),
};

export const userInfo = (state: ReduxAuthUserInfo, action: Action): ReduxAuthUserInfo => {
  switch (action.type) {
    case ActionType.REQUEST_UPDATE_USER_INFO: {
      const updatedUserInfo = (action as NetworkAction).progress.isSuccess()
        ? (action.payload as object)
        : {};

      return {
        ...state,
        ...updatedUserInfo,
        progress: (action as NetworkAction).progress,
      };
    }
    case ActionType.SET_AUTH_STATUS: {
      switch ((action as AuthStatusAction).payload.status) {
        case AuthStatus.SignedOut:
          return INITIAL_STATE;
        case AuthStatus.SignedIn:
          return { ...state, ...(action as AuthStatusAction).payload.userInfo };
        default:
          return state;
      }
    }
    // This is probably not needed but let's try for extra safety.
    case ActionType.REQUEST_SIGNOUT: {
      if ((action as NetworkAction).progress.isSuccess()) {
        return INITIAL_STATE;
      }
      return state;
    }
    case ActionType.REFRESH_STORE_WITH_DB_DATA_SUCCESS:
      return { ...state, ...(action.payload as { userInfo: object }).userInfo };
    default:
      return state;
  }
};
