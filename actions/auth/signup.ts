import { requestSignup } from '../../api';
import { ActionCreator, NetworkAction, Dispatch, ActionType } from '..';
import { Progress } from '../../data-types';

// TODO: Localize

const startSignupRequest: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNUP,
  progress: Progress.createRequesting('Requesting signup...'),
});

const receiveSignupResponse: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNUP,
  progress: Progress.createSuccess('Signup successful.'),
});

const receiveSignupError: ActionCreator<NetworkAction> = err => ({
  type: ActionType.REQUEST_SIGNUP,
  progress: Progress.createError(err.message || 'An unknown error has occured.'),
});

export const clearSignupProgress: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNUP,
  progress: Progress.createNil(),
});

export const signupUser = (email: string, password: string) => async (dispatch: Dispatch) => {
  dispatch(startSignupRequest({ email, password }));

  try {
    const { user } = await requestSignup(email, password);
    return dispatch(receiveSignupResponse(user));
  } catch (err) {
    return dispatch(receiveSignupError(err));
  }
};
