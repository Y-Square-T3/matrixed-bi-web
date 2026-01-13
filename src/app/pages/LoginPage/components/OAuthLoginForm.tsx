import { Button } from 'antd';
import { AUTH_CLIENT_ICON_MAPPING } from '../constants';
import React from 'react';
import usePrefixI18N from '../../../hooks/useI18NPrefix';
import styled from 'styled-components/macro';
import {
  LINE_HEIGHT_ICON_XXL,
  SPACE_XS,
} from '../../../../styles/StyleConstants';
import { OAuthClient } from '../../../slice/types';

type OAuthLoginFormProps = {
  oauth2Clients: OAuthClient[];
  onOAuthLogin: (oAuthClient: OAuthClient) => void;
};

export const OAuthLoginForm = ({
  oauth2Clients,
  onOAuthLogin,
}: OAuthLoginFormProps) => {
  const t = usePrefixI18N('login');

  return (
    <Wrapper>
      {oauth2Clients.length > 0 && (
        <>
          <AuthTitle>{t('authTitle')}</AuthTitle>
          {oauth2Clients.map(client => (
            <AuthButton
              key={client.clientId}
              size="large"
              icon={AUTH_CLIENT_ICON_MAPPING[client.clientName.toLowerCase()]}
              onClick={() => onOAuthLogin(client)}
              block
            >
              {client.clientName}
            </AuthButton>
          ))}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const AuthTitle = styled.p`
  line-height: ${LINE_HEIGHT_ICON_XXL};
  color: ${p => p.theme.textColorLight};
  text-align: center;
`;

const AuthButton = styled(Button)`
  margin-bottom: ${SPACE_XS};

  &:last-child {
    margin-bottom: 0;
  }
`;
