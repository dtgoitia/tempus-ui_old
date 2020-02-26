// Actions
const CREATE_EXERCISE = 'CREATE_EXERCISE';
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
  state = exerciseExplorerInitialState, // TODO: Why am I getting the whole state??
  action = {}
) {
  switch (action.type) {
    case CREATE_EXERCISE:
      return createExerciseReducer(state, action);
    case DELETE_EXERCISE:
      return deleteExerciseReducer(state, action);
    default:
      return state;
  }
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
export function createExercise({ id, name, description, exerciseType }) {
  return { type: CREATE_EXERCISE, id, name, description, exerciseType }
}
export function deleteExercise({ id }) {
  return { type: DELETE_EXERCISE, id }
}

// Selector
export const selectExercises = state => state.exerciseExplorer.exercises;
