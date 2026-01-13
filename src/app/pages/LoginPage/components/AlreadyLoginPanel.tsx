import { Button } from 'antd';
import React, { useCallback } from 'react';
import styled from 'styled-components/macro';
import { BORDER_RADIUS, SPACE_MD } from '../../../../styles/StyleConstants';
import usePrefixI18N from '../../../hooks/useI18NPrefix';
import { useHistory } from 'react-router-dom';
import { User } from '../../../slice/types';

type AlreadyLoginPanelProps = {
  loggedInUser?: User | null;
  onSwitchToLogin: () => void;
};

export const AlreadyLoginPanel = ({
  loggedInUser,
  onSwitchToLogin,
}: AlreadyLoginPanelProps) => {
  const t = usePrefixI18N('login');
  const history = useHistory();

  const toApp = useCallback(() => {
    history.replace('/');
  }, [history]);

  return (
    <>
      <h2>{t('alreadyLoggedIn')}</h2>
      <UserPanel onClick={toApp}>
        <p>{loggedInUser?.username}</p>
        <span>{t('enter')}</span>
      </UserPanel>
      <Button type="link" size="large" block onClick={onSwitchToLogin}>
        {t('switch')}
      </Button>
    </>
  );
};

const UserPanel = styled.div`
  display: flex;
  padding: ${SPACE_MD};
  margin: ${SPACE_MD} 0;
  cursor: pointer;
  background-color: ${p => p.theme.bodyBackground};
  border-radius: ${BORDER_RADIUS};

  &:hover {
    background-color: ${p => p.theme.emphasisBackground};
  }

  p {
    flex: 1;
  }

  span {
    color: ${p => p.theme.textColorLight};
  }
`;
