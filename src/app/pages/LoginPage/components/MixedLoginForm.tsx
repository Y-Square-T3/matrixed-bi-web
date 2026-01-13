import { Button, Form, Input } from 'antd';
import { AUTH_CLIENT_ICON_MAPPING } from '../constants';
import React from 'react';
import usePrefixI18N from '../../../hooks/useI18NPrefix';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';
import {
  LINE_HEIGHT_ICON_LG,
  LINE_HEIGHT_ICON_XXL,
  SPACE_XS,
} from '../../../../styles/StyleConstants';
import { OAuthClient } from '../../../slice/types';

type MixedLoginFormProps = {
  loading?: boolean;
  inShare?: boolean;
  registerEnable?: boolean;
  oauth2Clients: OAuthClient[];
  onLogin?: (values) => void;
  onOAuthLogin: (oAuthClient: OAuthClient) => void;
};

export const MixedLoginForm = ({
  loading,
  inShare = false,
  registerEnable = true,
  oauth2Clients,
  onLogin,
  onOAuthLogin,
}: MixedLoginFormProps) => {
  const t = usePrefixI18N('login');
  const tg = usePrefixI18N('global');

  const [form] = Form.useForm();

  return (
    <Form form={form} onFinish={onLogin}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: `${t('username')}${tg('validation.required')}`,
          },
        ]}
      >
        <Input placeholder={t('username')} size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: `${t('password')}${tg('validation.required')}`,
          },
        ]}
      >
        <Input placeholder={t('password')} type="password" size="large" />
      </Form.Item>
      <Form.Item className="last" shouldUpdate>
        {() => (
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            disabled={
              loading ||
              // !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
            block
          >
            {t('login')}
          </Button>
        )}
      </Form.Item>
      {!inShare && (
        <Links>
          <LinkButton to="/forgetPassword">{t('forgotPassword')}</LinkButton>
          {registerEnable && (
            <LinkButton to="/register">{t('register')}</LinkButton>
          )}
        </Links>
      )}
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
    </Form>
  );
};

const Links = styled.div`
  display: flex;
`;

const LinkButton = styled(Link)`
  flex: 1;
  line-height: ${LINE_HEIGHT_ICON_LG};

  &:nth-child(2) {
    text-align: right;
  }
`;

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
