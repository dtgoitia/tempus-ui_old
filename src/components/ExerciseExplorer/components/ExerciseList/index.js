import React from "react";

import ExerciseListItem from "./ExerciseListItem";

function ExerciseList({ exercises, loading, error }) {
  return (
    <div className="exercise-list">
      ExerciseList
      {error && <h1>{error}</h1>}
      {loading && <h1>LOADING!</h1>}
      {exercises &&
        exercises.map((exercise, i) => (
          <ExerciseListItem key={`exercise-${i}`} exercise={exercise} />
        ))}
    </div>
  );
}

export default ExerciseList;
