import { Action, ProgressAction, AuthStatusAction, ActionType } from '../../actions';
import { Progress, AuthStatus, Wellbeing } from '../../data-types';

type State = Readonly<{
  uid: string | null;
  email: string | null;
  isEmailVerified: boolean;
  wellbeing: Wellbeing | undefined;
  symptomMap: {
    [symptomID: string]: boolean;
  };
  progress: Progress;
}>;

export const INITIAL_STATE: State = {
  uid: null,
  email: null,
  isEmailVerified: false,
  wellbeing: undefined,
  symptomMap: {},
  progress: Progress.createNil(),
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.REQUEST_UPDATE_USER_INFO: {
      const updatedUserInfo = (action as ProgressAction).progress.isSuccess()
        ? (action.payload as object)
        : {};

      return {
        ...state,
        ...updatedUserInfo,
        progress: (action as ProgressAction).progress,
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
      if ((action as ProgressAction).progress.isSuccess()) {
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
