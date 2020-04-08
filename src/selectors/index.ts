import { AuthStatus } from '../data-types';
import { ReduxRoot } from '../reducers';

/**
 * Derives whether auth (i.e. signin and signup) is disabled from Redux state.
 */
export function isAuthDisabled(state: ReduxRoot) {
  return (
    state.auth.signin.progress.isRequesting() ||
    state.auth.signout.progress.isRequesting() ||
    state.auth.status === AuthStatus.Checking ||
    state.auth.status === AuthStatus.SignedIn
  );
}
