import { Action as ReduxAction, ActionCreator as ReduxActionCreator } from 'redux';
import { Progress, AuthStatus } from '../data-types';

// export { ActionCreator, Dispatch } from 'redux';
// export { ThunkAction, ThunkDispatch } from 'redux-thunk';

export type ActionCreator<A> = ReduxActionCreator<A>;

// FIXME
export type Dispatch<T = any> = any;
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

export interface ProgressAction extends Action {
  progress: Progress;
}

export interface AuthStatusAction extends Action {
  payload: {
    status: AuthStatus;
    userInfo?: object;
  };
}

/*
 * Commonly used action creators
 */

export type AuthStatusActionCreator = (userInfo?: object) => AuthStatusAction;

export type ProgressActionCreator = (...params: any[]) => ProgressAction;

export type ErrorActionCreator = (err: Error) => ProgressAction;
