import { Action, NetworkAction, ActionType } from '../../actions';
import { Progress } from '../../data-types';

export interface ReduxAuthSignup {
  progress: Progress;
}

export const signup = (state: ReduxAuthSignup, action: Action): ReduxAuthSignup => {
  switch (action.type) {
    case ActionType.REQUEST_SIGNUP:
      return { ...state, progress: (action as NetworkAction).progress };
    case ActionType.REQUEST_SIGNIN:
      return { ...state, progress: Progress.createNil() };
    default:
      return state;
  }
};
