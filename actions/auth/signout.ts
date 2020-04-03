import { requestSignout } from '../../api';
import { ActionCreator, NetworkAction, Dispatch, ActionType } from '..';
import { Progress } from '../../data-types';

// TODO: Localize
const startSignoutRequest: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNOUT,
  progress: Progress.createRequesting('Requesting signout...'),
});

const receiveSignoutResponse: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNOUT,
  progress: Progress.createSuccess('Signout success.'),
});

const receiveSignoutError: ActionCreator<NetworkAction> = err => ({
  type: ActionType.REQUEST_SIGNOUT,
  progress: Progress.createError(err.message || 'An unknown error has occured.'),
});

export const clearSignoutProgress: ActionCreator<NetworkAction> = () => ({
  type: ActionType.REQUEST_SIGNOUT,
  progress: Progress.createNil(),
});

export const signoutUser = () => async (dispatch: Dispatch) => {
  dispatch(startSignoutRequest());

  try {
    const res = await requestSignout();
    return dispatch(receiveSignoutResponse(res));
  } catch (err) {
    return dispatch(receiveSignoutError(err));
  }
};
