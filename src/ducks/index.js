import { createExerciseRootReducer, isCreateExerciseAction } from './createExercise';
import { getExercisesRootReducer, isGetExercisesAction } from './getExercises';
import { isDeleteExerciseAction, deleteExerciseRootReducer } from './deleteExercise';
import { getPlansRootReducer, isGetPlansAction } from './getPlans';

// Reducers
export default function exerciseExplorerReducer(state = [], action = {}) {
  switch (true) {
    case isCreateExerciseAction(action):
      return createExerciseRootReducer(state, action);
    case isGetExercisesAction(action):
      return getExercisesRootReducer(state, action);
    case isDeleteExerciseAction(action):
      return deleteExerciseRootReducer(state, action);
    case isGetPlansAction(action):
      return getPlansRootReducer(state, action);
    default:
      return state;
  }
}
