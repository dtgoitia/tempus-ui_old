// Actions
const CREATE_EXERCISE = 'CREATE_EXERCISE';
const GET_ALL_EXERCISES = 'GET_ALL_EXERCISES';
const DELETE_EXERCISE = 'DELETE_EXERCISE';
// const DISCARD_EXERCISE = 'DISCARD_EXERCISE';

// Initial states
export const exerciseExplorerInitialState = {
  exercises: [
    { id: 0, name: 'blah0', description: 'description 0', exerciseType: 'WORK' },
    { id: 1, name: 'blah1', description: 'description 1', exerciseType: 'WORK' },
  ]
};

// Reducers
export default function exerciseExplorerReducer(
  state = [], // TODO: Why am I getting the whole state??
  action = {}
) {
  switch (action.type) {
    case GET_ALL_EXERCISES:
      return getAllExercisesReducer(state);
    case CREATE_EXERCISE:
      return createExerciseReducer(state, action);
    case DELETE_EXERCISE:
      return deleteExerciseReducer(state, action);
    default:
      return state;
  }
}

function getAllExercisesReducer(state) {
  // TODO: dispatch LOADING action
  // TODO: dispatch COMPLETE/ERROR action
  const exercises = [
    { id: 0, name: 'Exercise 1', description: 'description 1', exerciseType: 'PREP' },
    { id: 1, name: 'Exercise 2', description: 'description 2', exerciseType: 'WORK' },
  ];
  // TODO: validate received data
  return {
    ...state,
    loading: true,
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
  return { type: GET_ALL_EXERCISES };
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
