import * as AuthLayout from 'app/components/styles/AuthLayout';
import { OAuthClient, SystemInfo, User } from 'app/slice/types';
import { StorageKeys } from 'globalConstants';
import React, { useCallback, useState } from 'react';
import { getToken } from 'utils/auth';
import persistence from 'utils/persistence';
import { AlreadyLoginPanel } from './components/AlreadyLoginPanel';
import { MixedLoginForm } from './components/MixedLoginForm';
import { OAuthLoginForm } from './components/OAuthLoginForm';
import { useListenToWordEffect } from './hooks/useListenToWordEffect';

interface LoginFormProps {
  loading: boolean;
  loggedInUser?: User | null;
  oauth2Clients: OAuthClient[];
  registerEnable?: boolean;
  inShare?: boolean;
  systemInfo: SystemInfo;
  onLogin?: (value) => void;
}

export function LoginForm({
  loading,
  loggedInUser,
  oauth2Clients,
  registerEnable = true,
  inShare = false,
  systemInfo,
  onLogin,
}: LoginFormProps) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [oAuthAuthOnly, setOAuthAuthOnly] = useState(systemInfo.oAuthAuthOnly);

  const logged = !!getToken();

  const handleSwitchToLogin = useCallback(() => {
    setShowLoginForm(true);
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

  const handleBackToMixedLogin = useCallback(() => {
    setOAuthAuthOnly(false);
  }, []);

  useListenToWordEffect(handleBackToMixedLogin, {
    word: systemInfo.wordBackToMixedAuth,
  });

  if (logged && !showLoginForm && !inShare) {
    return (
      <AuthLayout.Form>
        <AlreadyLoginPanel
          onSwitchToLogin={handleSwitchToLogin}
          loggedInUser={loggedInUser}
        />
      </AuthLayout.Form>
    );
  }

  return (
    <AuthLayout.Form>
      {oAuthAuthOnly ? (
        <OAuthLoginForm
          onOAuthLogin={toAuthClient}
          oauth2Clients={oauth2Clients}
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
