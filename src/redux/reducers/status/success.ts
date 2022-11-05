import { getType } from 'deox';

import { uiActions } from '@/redux/actions';

export type TSuccessState = { [id: string]: boolean };

interface ISuccessAction {
  type: string;
  payload?: string;
}

interface IResetAction {
  type: string;
  payload: {
    actionName: string;
  };
}

const successReducer = (state: TSuccessState = {}, action: ISuccessAction | IResetAction): TSuccessState => {
  if (action.type === getType(uiActions.resetActionStatus)) {
    const { actionName } = (action as IResetAction).payload;
    const { [actionName]: _, ...newState } = state;
    return newState;
  }

  const matches = /(.*)_(REQUEST|SUCCESS)/.exec(action.type);

  if (!matches) return state;

  const [, requestName, requestStatus] = matches;
  return {
    ...state,
    [requestName]: requestStatus === 'SUCCESS',
  };
};

export default successReducer;
