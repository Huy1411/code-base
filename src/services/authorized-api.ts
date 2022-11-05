import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import { navigate } from '@reach/router';

import { EStatusCode } from '@/common-defination/utils';
import { getQueryParam } from '@/utils/functions';
import { LayoutPaths, Paths } from '@/pages/routers';

import { EAuthEndPoint } from './eco/auth/endpoints';
import authHelpers from './helpers';

type TTokenSubscribers = (error: Error | null, accessToken?: string) => void;

let isRefreshingAccessToken = false;
let tokenSubscribers: TTokenSubscribers[] = [];

const AuthorizedInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
  });

  const refreshTokens = async (): Promise<string> => {
    const existingRefreshToken: string = authHelpers.getRefreshToken();

    if (!existingRefreshToken) {
      navigate(`${LayoutPaths.Auth}${Paths.LogIn}`);
    }

    // const { jwtAccessToken, refreshToken } = await AuthInstance.refreshToken({
    //   refreshToken: existingRefreshToken ?? '',
    // });

    const jwtAccessToken = '';
    const refreshToken = '';

    authHelpers.storeAccessToken(jwtAccessToken);
    authHelpers.storeRefreshToken(refreshToken);

    return authHelpers.getAccessToken();
  };

  const onRequest = (request: AxiosRequestConfig): AxiosRequestConfig => {
    const authBearer: string | unknown = authHelpers.getAccessToken();
    const authBearerVerifyUser = getQueryParam('token');
    if (authBearer) {
      request.headers.Authorization = `Bearer ${authBearer}`;
    }

    if (authBearerVerifyUser) {
      request.headers.Authorization = `Bearer ${authBearerVerifyUser}`;
    }

    return request;
  };

  const onTokenRefreshed = (error: Error | null, newAccessToken?: string): void => {
    tokenSubscribers.map((cb: (error: Error | null, newAccessToken?: string) => void) => cb(error, newAccessToken));
  };

  const onResponseSuccess = (response: AxiosResponse): AxiosResponse => response;

  const onResponseError = async (axiosError: AxiosError): Promise<void | AxiosResponse<any>> => {
    const { response } = axiosError;
    const responseStatus = response?.status;
    const originalRequest = axiosError.config;

    if (responseStatus === EStatusCode.UNAUTHORIZED && originalRequest) {
      if (!isRefreshingAccessToken) {
        isRefreshingAccessToken = true;
        refreshTokens()
          .then((newAccessToken) => {
            onTokenRefreshed(null, newAccessToken);
          })
          .catch((err: AxiosError) => {
            onTokenRefreshed(new Error('Failed to refresh access token'));
            const refreshTokenFailed = err?.response?.config?.url === EAuthEndPoint.REFRESH_TOKEN;
            if (refreshTokenFailed) {
              authHelpers.clearTokens();
              navigate(`${LayoutPaths.Auth}${Paths.LogIn}`);
            }
          })
          .finally(() => {
            isRefreshingAccessToken = false;
            tokenSubscribers = [];
          });
      }

      const storeOriginalRequest: Promise<void | AxiosResponse<any>> = new Promise((resolve, reject) => {
        tokenSubscribers.push((error: Error | null, newAccessToken?: string) => {
          if (error) return reject(error);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return resolve(axios(originalRequest));
        });
      });

      return storeOriginalRequest;
    }

    return Promise.reject(axiosError);
  };

  instance.interceptors.request.use(onRequest);
  instance.interceptors.response.use(onResponseSuccess, onResponseError);

  return instance;
};

export default AuthorizedInstance;
