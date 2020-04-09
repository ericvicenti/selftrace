import { AuthStatusAction } from '../../actions';
import { AuthStatus } from '../../data-types';

type State = AuthStatus;

export const INITIAL_STATE = AuthStatus.Checking;

export const reducer = (action: AuthStatusAction): State => action.payload.status;
