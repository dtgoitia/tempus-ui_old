import React from 'react';
import { useSelector } from 'react-redux';

import ExerciseList from './components/ExerciseList';
import CreateExercise from './components/CreateExercise';
import { selectExercises } from './ducks';

function ExerciseExplorer() {
  const exercises = useSelector(selectExercises);

  return (
    <div className="exercise-explorer">
      ExerciseExplorer
      <ExerciseList exercises={exercises} />
      <CreateExercise/>
    </div>
  )
}

export default ExerciseExplorer;
