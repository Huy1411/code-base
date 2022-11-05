import { createReducer } from 'deox';
import { uiActions } from '@/redux/actions';
import { EDevice } from '@/common-defination/ui-ux';

export interface IUIState {
  device: {
    type: string;
    width: number;
  };
}

const initialState: IUIState = {
  device: {
    type: window.innerWidth >= 768 ? EDevice.DESKTOP : EDevice.MOBILE,
    width: window.innerWidth,
  },
};

const uiReducer = createReducer(initialState, (handleAction) => [
  handleAction(uiActions.setDevice, (state, { payload }) => ({
    ...state,
    device: {
      type: payload.deviceWidth >= 768 ? EDevice.DESKTOP : EDevice.MOBILE,
      width: payload.deviceWidth,
    },
  })),
]);

export default uiReducer;
