import { Action, ProgressAction, ActionType } from '../../actions';
import { Progress } from '../../data-types';

type State = Readonly<{ progress: Progress }>;

export const INITIAL_STATE: State = {
  progress: Progress.createNil(),
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.REQUEST_SIGNOUT:
      return { ...state, progress: (action as ProgressAction).progress };
    default:
      return state;
  }
};
