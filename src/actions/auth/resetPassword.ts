import { requestResetPassword } from '../../api';
import { ActionCreator, ProgressAction, Dispatch, ActionType } from '..';
import { Progress } from '../../data-types';

const startResetPasswordRequest: ActionCreator<ProgressAction> = () => ({
  type: ActionType.REQUEST_RESET_PASSWORD,
  progress: Progress.createRequesting('Sending password reset request...'),
});

const receiveResetPasswordResponse: ActionCreator<ProgressAction> = () => ({
  type: ActionType.REQUEST_RESET_PASSWORD,
  progress: Progress.createSuccess(
    'Password reset request successful. Please check your email to proceed.'
  ),
});

const receiveResetPasswordError: ActionCreator<ProgressAction> = err => ({
  type: ActionType.REQUEST_RESET_PASSWORD,
  progress: Progress.createError(err.message || 'An unknown error has occured.'),
});

export const clearResetPasswordProgress: ActionCreator<ProgressAction> = () => ({
  type: ActionType.REQUEST_RESET_PASSWORD,
  progress: Progress.createNil(),
});

export const resetUserPassword = (email: string) => async (dispatch: Dispatch) => {
  dispatch(startResetPasswordRequest());

  try {
    const res = await requestResetPassword(email);
    return dispatch(receiveResetPasswordResponse(res));
  } catch (err) {
    return dispatch(receiveResetPasswordError(err));
  }
};
