import * as AuthLayout from 'app/components/styles/AuthLayout';
import { OAuthClient, User } from 'app/slice/types';
import { StorageKeys } from 'globalConstants';
import React, { useCallback, useState } from 'react';
import { getToken } from 'utils/auth';
import persistence from 'utils/persistence';
import { AlreadyLoginPanel } from './components/AlreadyLoginPanel';
import { MixedLoginForm } from './components/MixedLoginForm';

interface LoginFormProps {
  loading: boolean;
  loggedInUser?: User | null;
  oauth2Clients: OAuthClient[];
  registerEnable?: boolean;
  inShare?: boolean;
  onLogin?: (value) => void;
}

export function LoginForm({
  loading,
  loggedInUser,
  oauth2Clients,
  registerEnable = true,
  inShare = false,
  onLogin,
}: LoginFormProps) {
  const [switchUser, setSwitchUser] = useState(false);
  const logged = !!getToken();

  const onSwitch = useCallback(() => {
    setSwitchUser(true);
  }, []);

  const toAuthClient = useCallback(
    (oAuthClient: OAuthClient) => () => {
      if (inShare) {
        persistence.session.save(
          StorageKeys.AuthRedirectUrl,
          window.location.href,
        );
      }
      window.location.href = oAuthClient.authorizationUrl;
    },
    [inShare],
  );

  return (
    <AuthLayout.Form>
      {logged && !switchUser && !inShare ? (
        <AlreadyLoginPanel
          onSwitchToLogin={onSwitch}
          loggedInUser={loggedInUser}
        />
      ) : (
        <MixedLoginForm
          loading={loading}
          inShare={inShare}
          registerEnable={registerEnable}
          oauth2Clients={oauth2Clients}
          onLogin={onLogin}
          onOAuthLogin={toAuthClient}
        />
      )}
    </AuthLayout.Form>
  );
}
