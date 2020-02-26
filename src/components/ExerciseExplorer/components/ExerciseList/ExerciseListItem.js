import React from 'react';
import { useDispatch } from 'react-redux';

// TODO: set up Webpack to use '@' instead of long relative paths
import { deleteExercise } from "./../../ducks";

function ExerciseListItem({ exercise: { id, name, description, exerciseType }}) {
  const dispatch = useDispatch();

  return (
    <div className="exercise-list-item">
      ExerciseListItem 
      <p>name: {name}</p>
      <p>description: {description}</p>
      <p>type: {exerciseType}</p>
      <button
        className="create-exercise-button"
        onClick={() => dispatch(deleteExercise({id}))}
      >
        DELETE EXERCISE
      </button>
    </div>
  )
}

export default ExerciseListItem;
