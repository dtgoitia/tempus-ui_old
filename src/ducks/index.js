import { createExerciseRootReducer, isCreateExerciseAction } from './createExercise';
import { getExercisesRootReducer, isGetExercisesAction } from './getExercises';
import { isDeleteExerciseAction, deleteExerciseRootReducer } from './deleteExercise';
import { getPlansRootReducer, isGetPlansAction } from './getPlans';

// Reducers
export function exerciseExplorerReducer(state = [], action = {}) {
  switch (true) {
    case isCreateExerciseAction(action):
      return createExerciseRootReducer(state, action);
    case isGetExercisesAction(action):
      return getExercisesRootReducer(state, action);
    case isDeleteExerciseAction(action):
      return deleteExerciseRootReducer(state, action);
    default:
      return state;
  }
}

export function planExplorerReducer(state = [], action = {}) {
  switch (true) {
    case isGetPlansAction(action):
      return getPlansRootReducer(state, action);
    default:
      return state;
  }
}
