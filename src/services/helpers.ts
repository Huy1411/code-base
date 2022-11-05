import cookie from 'react-cookies';

import env from '@/env';
import { EStorage } from '@/common-defination/utils';

// const MAXIMUM_EXPIRES_TIME = 2147483647;

const cookieSetting = {
  path: '/',
  domain: env.cookie.domain,
  // secure: true,
  // httpOnly: true,
  // expires: MAXIMUM_EXPIRES_TIME,
};

const setCookie = (name: string, value: string): void => cookie.save(name, value, cookieSetting);

const getCookie = (name: string): string => cookie.load(name);

const removeCookie = (name: string): void => cookie.remove(name, cookieSetting);

class AuthHelpers {
  getRefreshToken = (): string => getCookie(EStorage.COOKIE_REFRESH_TOKEN);

  storeRefreshToken = (refreshToken: string): void => setCookie(EStorage.COOKIE_REFRESH_TOKEN, refreshToken);

  getAccessToken = (): string => getCookie(EStorage.COOKIE_ACCESS_TOKEN);

  storeAccessToken = (accessToken: string): void => setCookie(EStorage.COOKIE_ACCESS_TOKEN, accessToken);

  clearTokens = (): void => {
    removeCookie(EStorage.COOKIE_REFRESH_TOKEN);
    removeCookie(EStorage.COOKIE_ACCESS_TOKEN);
  };
}

const instance = new AuthHelpers();
export default instance;
