import { Action } from 'redux';

export type TLoadingState = { [id: string]: boolean };

const getLoadingMatches = (actionType: string): RegExpExecArray | null =>
  /(.*)_(REQUEST|SUCCESS|FAILED)/.exec(actionType);

const loadingReducer = (state: TLoadingState = {}, action: Action): TLoadingState => {
  const matches = getLoadingMatches(action.type);

  if (!matches) {
    return state;
  }

  const [, requestName, requestStatus] = matches;
  return {
    ...state,
    [requestName]: requestStatus === 'REQUEST',
  };
};

export default loadingReducer;
