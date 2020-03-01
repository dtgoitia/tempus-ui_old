import client from '../../../createClient';
import GET_EXERCISES_QUERY from '../graphql/getExercises';
import { dropTypename } from '../../../utils';

// Actions
const LOADING_EXERCISES = 'LOADING_EXERCISES';
const LOADING_EXERCISES_SUCCEEDED = 'LOADING_EXERCISES_SUCCEEDED';
const LOADING_EXERCISES_FAILED = 'LOADING_EXERCISES_FAILED';
export function isGetExercisesAction(action) {
  return [
    LOADING_EXERCISES,
    LOADING_EXERCISES_SUCCEEDED,
    LOADING_EXERCISES_FAILED,
  ].includes(action.type);
}

// Action creators
export function getExercises() {
  return function(dispatch) {
    // TODO: add logging
    dispatch(loadingAllExercises());
    client
      .query({ query: GET_EXERCISES_QUERY })
      .then(response => {
        // TODO: add logging
        dispatch(loadingExercisesSucceeded(response.data));
      })
      .catch(errorResponse => {
        // TODO: add logging
        dispatch(loadingExercisesFailed(errorResponse));
      })
  }
}
function loadingAllExercises() {
  return { type: LOADING_EXERCISES };
}
function loadingExercisesSucceeded(response) {
  return {
    type: LOADING_EXERCISES_SUCCEEDED,
    exercises: response.exercises.map(exercise => dropTypename(exercise)),
    error: null,
  };
}
function loadingExercisesFailed(errorResponse) {
  return {
    type: LOADING_EXERCISES_FAILED,
    exercises: null,
    error: errorResponse.message,
  };
}

// Reducers
export function getExercisesRootReducer(state, action){
  switch (action.type) {
    case LOADING_EXERCISES:
      return loadingExercisesReducer(state);
    case LOADING_EXERCISES_SUCCEEDED:
      return loadingExercisesSucceededReducer(state, action);
    case LOADING_EXERCISES_FAILED:
      return loadingExercisesFailedReducer(state, action);
    default:
      return state;
  }
}
function loadingExercisesReducer(state) {
  return { ...state,
    loadingExercises: true,
    exercises: [],
    errorGetExercises: null,
  };
}
function loadingExercisesSucceededReducer(state, action) {
  return { ...state,
    loadingExercises: false,
    exercises: action.exercises,
    errorGetExercises: null,
  };
}
function loadingExercisesFailedReducer(state, action) {
  return {
    ...state, 
    loadingExercises: false,
    exercises: null,
    errorGetExercises: action.error,
  };
}

// Selector
export const selectExercises = state => state.exerciseExplorer.exercises;
export const selectLoadingExercises = state =>
  state.exerciseExplorer.loadingExercises;
export const selectErrorLoadingExercises = state =>
  state.exerciseExplorer.errorGetExercises;
  