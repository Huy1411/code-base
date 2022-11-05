import { getType } from 'deox';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { uiActions } from '@/redux/actions';

export type TErrorState = { [id: string]: { error: null | Error | string; code?: number } | null };

interface IErrorPayload {
  error: Error | string;
}

interface IErrorAction {
  type: string;
  payload?: IErrorPayload;
}

interface IResetAction {
  type: string;
  payload: {
    actionName: string;
  };
}

const getErrorMatches = (actionType: string): RegExpExecArray | null => /(.*)_(REQUEST|FAILED)/.exec(actionType);

const errorReducer = (state: TErrorState = {}, action: IErrorAction | IResetAction): TErrorState => {
  if (action.type === getType(uiActions.resetActionStatus)) {
    const { actionName } = (action as IResetAction).payload;
    const { [actionName]: _, ...newState } = state;
    return newState;
  }

  const matches = getErrorMatches(action.type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestState] = matches;

  let error = (action as IErrorAction).payload?.error;
  let code;

  if (error instanceof Error) {
    const axiosErrorData = (error as AxiosError)?.response;
    error = axiosErrorData?.data?.msg;
    code = axiosErrorData?.status;
  }

  error && toast.error(error);

  return {
    ...state,
    [requestName]: requestState === 'FAILED' && error ? { error, code } : null,
  };
};

export default errorReducer;
