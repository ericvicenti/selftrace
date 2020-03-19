import { Action as ReduxAction } from 'redux';
import { ReduxAuthStatus, ReduxAuthUserInfo } from '../reducers';
import { Progress } from '../data-types';

// export { ActionCreator, Dispatch } from 'redux';
// export { ThunkAction, ThunkDispatch } from 'redux-thunk';

// FIXME
export type ActionCreator = any;
export type Dispatch = any;
export type ThunkAction = any;
export type ThunkDispatch = any;

export enum ActionType {
  // Auth
  SET_AUTH_STATUS,
  REQUEST_SIGNUP,
  REQUEST_SIGNIN,
  REQUEST_SIGNOUT,
  REQUEST_UPDATE_PASSWORD,
  REQUEST_RESET_PASSWORD,
  REQUEST_UPDATE_USER_INFO,
  REFRESH_STORE_WITH_DB_DATA_SUCCESS,
  REQUEST_SYNC,
}

/*
 * Commonly used actions
 */

export interface Action extends ReduxAction<ActionType> {
  payload?: object | string | boolean | number;
}

export interface NetworkAction extends Action {
  progress: Progress;
}

export interface AuthStatusAction extends Action {
  payload: {
    status: ReduxAuthStatus;
    userInfo?: ReduxAuthUserInfo;
  };
}
