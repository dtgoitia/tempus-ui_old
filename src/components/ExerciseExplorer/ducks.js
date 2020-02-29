// TODO: add absolute path to this file
import client from './../../createClient';
import getAllExercisesQuery from './graphql/getAllExercises';

// Actions
const CREATE_EXERCISE = 'CREATE_EXERCISE';
const LOADING_ALL_EXERCISES = 'LOADING_ALL_EXERCISES';
const LOADING_ALL_EXERCISES_SUCCESS = 'LOADING_ALL_EXERCISES_SUCCESS';
const LOADING_ALL_EXERCISES_FAIL = 'LOADING_ALL_EXERCISES_FAIL';
const DELETE_EXERCISE = 'DELETE_EXERCISE';
// const DISCARD_EXERCISE = 'DISCARD_EXERCISE';

// Reducers
export default function exerciseExplorerReducer(
  state = [], // TODO: Why am I getting the whole state??
  action = {}
) {
  switch (action.type) {
    case LOADING_ALL_EXERCISES:
      return loadingAllExercisesReducer(state);
    case LOADING_ALL_EXERCISES_SUCCESS:
      return loadingAllExercisesSuccessReducer(state, action);
    case LOADING_ALL_EXERCISES_FAIL:
      return loadingAllExercisesFailReducer(state, action);
    case CREATE_EXERCISE:
      return createExerciseReducer(state, action);
    case DELETE_EXERCISE:
      return deleteExerciseReducer(state, action);
    default:
      return state;
  }
}

function loadingAllExercisesReducer(state) {
  return { ...state,
    loading: true,
    exercises: [],
    error: null,
  };
}

function loadingAllExercisesSuccessReducer(state, action) {
  return { ...state,
    loading: false,
    exercises: action.exercises,
    error: null,
  };
}

function loadingAllExercisesFailReducer(state, action) {
  const { type , ...actionProps } = action;
  return { ...state, 
    loading: false,
    ...actionProps,
  };
}

function createExerciseReducer(state, action) {
  // TODO: validate exercise type
  const newExercise = {
    id: action.id,
    name: action.name,
    description: action.description,
    exerciseType: action.exerciseType,
  };
  return {
    ...state,
    exercises: [...state.exercises, newExercise],
  };
}

function deleteExerciseReducer(state, action) {
  return {
    ...state,
    exercises: state.exercises.filter(e => e.id !== action.id),
  };
}

// Action creators
export function getAllExercises() {
  return function(dispatch) {
    // TODO: add logging
    dispatch(loadingAllExercises());
    return client
      .query({ query: getAllExercisesQuery })
      .then(result => {
        // TODO: add logging
        dispatch(loadingAllExercisesSuccess(result.data));
      })
      .catch(reason => {
        // TODO: add logging
        dispatch(loadingAllExercisesFail(reason));
      })
  }
}
export function loadingAllExercises() {
  return { type: LOADING_ALL_EXERCISES };
}
export function loadingAllExercisesSuccess(response) {
  return {
    type: LOADING_ALL_EXERCISES_SUCCESS,
    exercises: response.exercises,
    getExercisesError: null,
  };
}
export function loadingAllExercisesFail(errorResponse) {
  return {
    type: LOADING_ALL_EXERCISES_FAIL,
    exercises: null,
    getExercisesError: errorResponse.message,
  };
}
export function createExercise({ id, name, description, exerciseType }) {
  return { type: CREATE_EXERCISE, id, name, description, exerciseType }
}
export function deleteExercise({ id }) {
  return { type: DELETE_EXERCISE, id }
}

// Selector
export const selectExercises = state => state.exerciseExplorer.exercises;
export const selectLoadingExercises = state => state.exerciseExplorer.loading;
export const selectErrorLoadingExercises = state => state.exerciseExplorer.getExercisesError;
// export const selectErrorCreatingExercise = state => state.exerciseExplorer.createExerciseError;
