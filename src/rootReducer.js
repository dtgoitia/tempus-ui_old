import { combineReducers } from 'redux';

import { exerciseExplorerReducer } from './ducks';
import { planExplorerReducer } from './ducks';
import { planEditorReducer } from './ducks';

const rootReducer = combineReducers({
  exerciseExplorer: exerciseExplorerReducer,
  planExplorer: planExplorerReducer,
  planEditor: planEditorReducer,
});

export default rootReducer;
