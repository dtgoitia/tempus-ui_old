import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ExerciseList from "./components/ExerciseList";
import CreateExercise from "./components/CreateExercise";
import {
  getAllExercises,
  selectExercises,
  selectLoadingExercises,
  selectErrorLoadingExercises
} from "./ducks";

function ExerciseExplorer() {
  const dispatch = useDispatch();

  // Fire the callback only:
  // useEffect: fire after the component is mounted and rendered
  // once: the second argument (see docs below)
  // docs: https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect
  useEffect(() => {
    dispatch(getAllExercises());
  }, []);

  const exercises = useSelector(selectExercises);
  const loadingExercises = useSelector(selectLoadingExercises);
  const errorLoadingExercises = useSelector(selectErrorLoadingExercises);

  return (
    <div className="exercise-explorer">
      ExerciseExplorer
      <ExerciseList
        exercises={exercises}
        loading={loadingExercises}
        error={errorLoadingExercises}
      />
      <CreateExercise />
    </div>
  );
}

export default ExerciseExplorer;
