import { Action, NetworkAction, ActionType } from '../../actions';
import { Progress } from '../../data-types';

export interface ReduxAuthSignin {
  progress: Progress;
}

export const signin = (state: ReduxAuthSignin, action: Action): ReduxAuthSignin => {
  switch (action.type) {
    case ActionType.REQUEST_SIGNIN:
      return { ...state, progress: (action as NetworkAction).progress };
    case ActionType.REQUEST_SIGNUP:
      return { ...state, progress: Progress.createNil() };
    default:
      return state;
  }
};
