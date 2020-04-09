import { Action, ActionType, AuthStatusAction } from '../../actions';
import * as ResetPassword from './resetPassword';
import * as Signin from './signin';
import * as Signout from './signout';
import * as Signup from './signup';
import * as Status from './status';
import * as UpdatePassword from './updatePassword';
import * as UserInfo from './userInfo';

const INITIAL_STATE = {
  signup: Signup.INITIAL_STATE,
  signin: Signin.INITIAL_STATE,
  signout: Signout.INITIAL_STATE,
  updatePassword: UpdatePassword.INITIAL_STATE,
  resetPassword: ResetPassword.INITIAL_STATE,
  userInfo: UserInfo.INITIAL_STATE,
  status: Status.INITIAL_STATE,
};

export type ReduxAuth = Readonly<typeof INITIAL_STATE>;

export default (state = INITIAL_STATE, action: Action): ReduxAuth => {
  switch (action.type) {
    case ActionType.REQUEST_SIGNUP:
    case ActionType.REQUEST_SIGNIN:
      return {
        ...state,
        signup: Signup.reducer(state.signup, action),
        signin: Signin.reducer(state.signin, action),
      };
    case ActionType.REQUEST_SIGNOUT:
      return {
        ...state,
        signout: Signout.reducer(state.signout, action),
        userInfo: UserInfo.reducer(state.userInfo, action),
      };
    case ActionType.REQUEST_UPDATE_PASSWORD:
      return {
        ...state,
        updatePassword: UpdatePassword.reducer(state.updatePassword, action),
      };
    case ActionType.REQUEST_RESET_PASSWORD:
      return {
        ...state,
        resetPassword: ResetPassword.reducer(state.resetPassword, action),
      };
    case ActionType.REQUEST_UPDATE_USER_INFO:
    case ActionType.REFRESH_STORE_WITH_DB_DATA_SUCCESS:
      return { ...state, userInfo: UserInfo.reducer(state.userInfo, action) };
    case ActionType.SET_AUTH_STATUS: {
      return {
        ...state,
        status: Status.reducer(action as AuthStatusAction),
        userInfo: UserInfo.reducer(state.userInfo, action),
      };
    }
    default:
      return state;
  }
};
