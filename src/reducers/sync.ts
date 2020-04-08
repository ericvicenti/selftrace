import { Action, ProgressAction, AuthStatusAction, ActionType } from '../actions';
import { AuthStatus, Progress } from '../data-types';

const INITIAL_STATE = {
  progress: Progress.createNil(),
};

export type ReduxSync = Readonly<typeof INITIAL_STATE>;

export default (state = INITIAL_STATE, action: Action): ReduxSync => {
  switch (action.type) {
    case ActionType.REQUEST_SYNC:
      return { ...state, progress: (action as ProgressAction).progress };
    case ActionType.SET_AUTH_STATUS: {
      switch ((action as AuthStatusAction).payload.status) {
        case AuthStatus.SignedOut:
          return { ...state, progress: Progress.createNil() };
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
