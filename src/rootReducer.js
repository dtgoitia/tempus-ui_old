import { combineReducers } from 'redux';

import exerciseExplorerReducer from './ducks';
import planExplorerReducer from './ducks';

const rootReducer = combineReducers({
  // counter: counterReducer,
  exerciseExplorer: exerciseExplorerReducer,
  planExplorer: planExplorerReducer,
});

export default rootReducer;
