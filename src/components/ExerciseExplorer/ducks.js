// Actions
const CREATE_EXERCISE = 'CREATE_EXERCISE';
const GET_ALL_EXERCISES = 'GET_ALL_EXERCISES';
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
    case CREATE_EXERCISE:
      return createExerciseReducer(state, action);
    case DELETE_EXERCISE:
      return deleteExerciseReducer(state, action);
    default:
      return state;
  }
}

function loadingAllExercisesReducer(state) {
  return {
    ...state,
    loading: true,
    exercises: []
  };
}
function loadingAllExercisesSuccessReducer(state, action) {
  // TODO: the 'exercises' variable should get its value from action
  const exercises = [
    { id: 0, name: 'Exercise 1', description: 'description 1', exerciseType: 'PREP' },
    { id: 1, name: 'Exercise 2', description: 'description 2', exerciseType: 'WORK' },
  ];
  return {
    ...state,
    loading: false,
    exercises,
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
  // return { type: GET_ALL_EXERCISES };
  return function(dispatch) {
    dispatch(loadingAllExercises());
    // TODO: replace timeout for network request
    return setTimeout(() => {
      dispatch(loadingAllExercisesSuccess())
    }, 1000); ;
  }
}
export function loadingAllExercises() {
  return { type: LOADING_ALL_EXERCISES };
}
export function loadingAllExercisesSuccess() {
  return { type: LOADING_ALL_EXERCISES_SUCCESS };
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
