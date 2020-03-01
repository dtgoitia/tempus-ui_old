import client from "../createClient";
import DELETE_EXERCISE_MUTATION from "../graphql/deleteExercise";

// Actions
const DELETING_EXERCISE = "DELETING_EXERCISE";
const DELETING_EXERCISE_SUCCEEDED = "DELETING_EXERCISE_SUCCEEDED";
const DELETING_EXERCISE_FAILED = "DELETING_EXERCISE_FAILED";
export function isDeleteExerciseAction(action) {
  return [
    DELETING_EXERCISE,
    DELETING_EXERCISE_SUCCEEDED,
    DELETING_EXERCISE_FAILED,
  ].includes(action.type);
}

// Action creators
export function deleteExercise(id) {
  return function(dispatch) {
    // TODO: add logging
    dispatch(deletingExercise(id));
    client
      .query({
        query: DELETE_EXERCISE_MUTATION,
        variables: { id },
      })
      .then(response => {
        // TODO: add logging
        dispatch(deleteExerciseSucceeded(id, response.data));
      })
      .catch(errorResponse => {
        // TODO: add logging
        dispatch(deleteExerciseFailed(errorResponse));
      });
  };
}
function deletingExercise(id) {
  return { type: DELETING_EXERCISE, id };
}
function deleteExerciseSucceeded(id, response) {
  return {
    type: DELETING_EXERCISE_SUCCEEDED,
    id,
  };
}
function deleteExerciseFailed(errorResponse) {
  return {
    type: DELETING_EXERCISE_FAILED,
    error: errorResponse.message,
  };
}

// Reducers
export function deleteExerciseRootReducer(state, action) {
  switch (action.type) {
    case DELETING_EXERCISE:
      return deletingExerciseReducer(state, action);
    case DELETING_EXERCISE_SUCCEEDED:
      return deletingExerciseSucceededReducer(state, action);
    case DELETING_EXERCISE_FAILED:
      return deletingExerciseFailedReducer(state, action);
    default:
      return state;
  }
}
function deletingExerciseReducer(state, action) {
  return {
    ...state,
    deleteExercise: {
      error: null,
      exerciseId: action.id,
      deleting: true,
    },
  };
}
function deletingExerciseSucceededReducer(state, action) {
  return {
    ...state,
    exercises: state.exercises.filter(e => e.id !== action.id),
    deleteExercise: {
      ...state.deleteExercise,
      error: null,
      deleting: false,
    },
  };
}
function deletingExerciseFailedReducer(state, action) {
  return {
    ...state,
    deleteExercise: {
      ...state.deleteExercise,
      error: action.error,
      deleting: false,
    },
  };
}

// Selectors
export const selectDeletingExercise = state =>
  state.exerciseExplorer.deleteExercise;
