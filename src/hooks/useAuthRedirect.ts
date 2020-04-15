import { useEffect } from 'react';
import Router from 'next/router';
import { AuthStatus } from '../data-types';

export function useAuthRedirect(authStatus: AuthStatus, isEmailVerified: boolean) {
  useEffect(() => {
    if (authStatus === AuthStatus.SignedIn) {
      Router.push(isEmailVerified ? '/map' : '/verify-email');
    }
  }, [authStatus, isEmailVerified]);
}
