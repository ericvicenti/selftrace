import { Action, ProgressAction, ActionType } from '../../actions';
import { Progress } from '../../data-types';

type State = Readonly<{ progress: Progress }>;

export const INITIAL_STATE: State = {
  progress: Progress.createNil(),
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.REQUEST_SIGNIN:
      return { ...state, progress: (action as ProgressAction).progress };
    case ActionType.REQUEST_SIGNUP:
      return { ...state, progress: Progress.createNil() };
    default:
      return state;
  }
};
