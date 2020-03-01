import { combineReducers } from 'redux';

import exerciseExplorerReducer from './ducks';

const rootReducer = combineReducers({
  // counter: counterReducer,
  exerciseExplorer: exerciseExplorerReducer,
});

export default rootReducer;
