import { requestSignin, loginWithGoogle } from '../../api';
import { ActionCreator, NetworkAction, Dispatch, ActionType } from '..';
import { Progress } from '../../data-types';

// TODO: Localize
const startSigninRequest: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNIN,
  progress: Progress.createRequesting('Requesting signin...'),
});

const receiveSigninResponse: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNIN,
  progress: Progress.createSuccess('Signin successful.'),
});

const receiveSigninError: ActionCreator<NetworkAction> = err => ({
  type: ActionType.REQUEST_SIGNIN,
  progress: Progress.createError(err.message || 'An unknown error has occured.'),
});

export const clearSigninProgress: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNIN,
  progress: Progress.createNil(),
});

export const signinUser = (email: string, password: string) => async (dispatch: Dispatch) => {
  dispatch(startSigninRequest({ email, password }));

  try {
    const res = await requestSignin(email, password);
    return dispatch(receiveSigninResponse(res));
  } catch (err) {
    return dispatch(receiveSigninError(err));
  }
};

export const googleOAuthUser = () => async (dispatch: Dispatch) => {
  dispatch(startSigninRequest());

  try {
    await loginWithGoogle();
    return dispatch(receiveSigninResponse());
  } catch (err) {
    return dispatch(receiveSigninError(err));
  }
};
