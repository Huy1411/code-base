import { combineReducers } from 'redux';

import loading from '@/redux/reducers/status/loading';
import success from '@/redux/reducers/status/success';
import error from '@/redux/reducers/status/error';
import ui from '@/redux/reducers/ui';

const rootReducer = combineReducers({
  loading,
  success,
  error,
  ui,
});

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
