import { combineReducers } from 'redux';

import exerciseExplorerReducer from './components/ExerciseExplorer/ducks';

const rootReducer = combineReducers({
  // counter: counterReducer,
  exerciseExplorer: exerciseExplorerReducer,
});

export default rootReducer;
