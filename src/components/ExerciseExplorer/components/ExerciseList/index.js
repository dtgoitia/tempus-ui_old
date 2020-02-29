import React from 'react';

import ExerciseListItem from "./ExerciseListItem";

function ExerciseList({ exercises, loading }) {
  return (
    <div className="exercise-list">
      ExerciseList 
      {
        loading &&
          <h1>LOADING!</h1>
      }
      {
        exercises && exercises.map((exercise, i) => (
          <ExerciseListItem key={`exercise-${i}`} exercise={exercise} />
        ))
      }
    </div>
  )
}

export default ExerciseList;
