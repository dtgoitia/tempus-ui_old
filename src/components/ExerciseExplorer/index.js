import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import ExerciseList from "./components/ExerciseList";
import CreateExercise from "./components/CreateExercise";
import {
  getExercises,
  selectExercises,
  selectLoadingExercises,
  selectErrorLoadingExercises,
} from "../../ducks/getExercises";
// TODO: configure webpack to provide absolute path access to 'ducks'


const Container = styled.div`
  margin: 2rem;
`;

function ExerciseExplorer() {
  const dispatch = useDispatch();

  // Fire the callback only:
  // useEffect: fire after the component is mounted and rendered
  // once: the second argument in useEffect (see docs below)
  // docs: https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect
  useEffect(() => {
    dispatch(getExercises());
  }, []);

  const exercises = useSelector(selectExercises);
  const loadingExercises = useSelector(selectLoadingExercises);
  const errorLoadingExercises = useSelector(selectErrorLoadingExercises);

  return (
    <Container className="exercise-explorer">
      ExerciseExplorer
      <ExerciseList
        exercises={exercises}
        loading={loadingExercises}
        error={errorLoadingExercises}
      />
      <CreateExercise />
    </Container>
  );
}

export default ExerciseExplorer;
