import React from "react";
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

  const exercises = useSelector(selectExercises);
  const loadingExercises = useSelector(selectLoadingExercises);
  const errorLoadingExercises = useSelector(selectErrorLoadingExercises);

  if (!exercises && !loadingExercises) {
    dispatch(getExercises());
  }

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
