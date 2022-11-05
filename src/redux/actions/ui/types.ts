import { EUIAction } from './constants';

export type TSetDevice = { type: EUIAction.SET_DEVICE; payload: { deviceWidth: number } };
export type TResetActionStatus = { type: EUIAction.RESET_ACTION_STATUS };
