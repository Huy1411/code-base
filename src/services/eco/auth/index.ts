import IdentityService from '@/services/eco';

import { EAuthEndPoint } from './endpoints';

class Auth {
  login = async (body: unknown): Promise<unknown> => {
    const response = await IdentityService.post(EAuthEndPoint.LOGIN, body);
    return response.data;
  };

  refreshToken = async (body: unknown): Promise<unknown> => {
    const response = await IdentityService.post(EAuthEndPoint.REFRESH_TOKEN, body);
    return response.data;
  };
}

const AuthInstance = new Auth();
export default AuthInstance;
