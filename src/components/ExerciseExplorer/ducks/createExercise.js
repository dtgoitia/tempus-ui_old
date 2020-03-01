import client from '../../../createClient';
import { dropTypename } from '../../../utils';
import CREATE_EXERCISE_MUTATION from '../graphql/createExercise'

// Actions
const CREATING_EXERCISE = 'CREATING_EXERCISE';
const CREATING_EXERCISE_SUCCEEDED = 'CREATING_EXERCISE_SUCCEEDED';
const CREATING_EXERCISE_FAILED = 'CREATING_EXERCISE_FAILED';
const CLEARING_CREATE_EXERCISE_FORM = 'CLEARING_CREATE_EXERCISE_FORM';
const STOP_CLEARING_CREATE_EXERCISE_FORM = 'STOP_CLEARING_CREATE_EXERCISE_FORM';
export function isCreateExerciseAction(action) {
  return [
    CREATING_EXERCISE,
    CREATING_EXERCISE_SUCCEEDED,
    CREATING_EXERCISE_FAILED,
    CLEARING_CREATE_EXERCISE_FORM,
    STOP_CLEARING_CREATE_EXERCISE_FORM,
  ].includes(action.type);
}

// Action creators
export function createExercise({ name, description, exerciseType }) {
  return function(dispatch) {
    dispatch(creatingExercise())
    client
      .query({
        query: CREATE_EXERCISE_MUTATION,
        variables: { name, description, exerciseType }
      })
      .then(response => {
        // TODO: add logging
        response.data.createExercise
          ? dispatch(creatingExerciseSucceeded(response.data))
          : dispatch(creatingExerciseFailed(response.errors[0]));
      })
      .catch(errorResponse => {
        // TODO: add logging
        dispatch(creatingExerciseFailed(errorResponse));
      })
    }
}
function creatingExercise() {
  return { type: CREATING_EXERCISE };
}
function creatingExerciseSucceeded(response) {
  return {
    type: CREATING_EXERCISE_SUCCEEDED,
    createdExercise: dropTypename(response.createExercise.exercise),
  }
}
function creatingExerciseFailed(errorResponse) {
  return {
    type: CREATING_EXERCISE_FAILED,
    createdExercise: null,
    error: errorResponse.message,
  }
}

// Reducers
export function createExerciseRootReducer(state = [], action = {}) {
  switch (action.type) {
    case CREATING_EXERCISE:
      return creatingExerciseReducer(state, action);
    case CREATING_EXERCISE_SUCCEEDED:
      return creatingExerciseSucceededReducer(state, action);
    case CREATING_EXERCISE_FAILED:
      return creatingExerciseFailedReducer(state, action);
    case CLEARING_CREATE_EXERCISE_FORM:
      return clearingCreateExerciseFormReducer(state, action);
    case STOP_CLEARING_CREATE_EXERCISE_FORM:
      return stopClearingCreateExerciseFormReducer(state, action);
    default:
      return state;
  }
}
function creatingExerciseReducer(state, action) {
  return {
    ...state,
    creatingExercise: true, // TODO: display spinner during in-flight request
    errorCreateExercise: null, 
  };
}
function creatingExerciseSucceededReducer(state, action) {
  // TODO: validate exercise type
  return {
    ...state,
    creatingExercise: false,
    exercises: [ ...state.exercises, action.createdExercise ],
    errorCreateExercise: null, 
  }
}
function creatingExerciseFailedReducer(state, action) {
  return {
    ...state,
    creatingExercise: false,
    errorCreateExercise: action.error
  }
}
function stopClearingCreateExerciseFormReducer(state, action) {
  return {
    ...state,
    createExerciseFormToBeCleared: false,
  };
}
function clearingCreateExerciseFormReducer(state, action) {
  return {
    ...state,
    createExerciseFormToBeCleared: true,
  };
}

// Selectors
export const selectCreatingExercise = state => (
  state.exerciseExplorer.creatingExercise
);
export const selectErrorCreatingExercise = state => (
  state.exerciseExplorer.errorCreateExercise
);
