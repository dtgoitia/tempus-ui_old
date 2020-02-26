import React from 'react';

import ExerciseListItem from "./ExerciseListItem";

function ExerciseList({ exercises }) {
  return (
    <div className="exercise-list">
      ExerciseList 
      {
        exercises.map((exercise, i) => (
          <ExerciseListItem key={`exercise-${i}`} exercise={exercise} />
        ))
      }
    </div>
  )
}

export default ExerciseList;
