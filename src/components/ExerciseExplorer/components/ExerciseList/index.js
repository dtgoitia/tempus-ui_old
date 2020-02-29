import React from "react";
import styled from "styled-components";

import ExerciseListItem from "./ExerciseListItem";

const Container = styled.div({
  marginBottom: "1rem",
});

function ExerciseList({ exercises, loading, error }) {
  return (
    <Container className="exercise-list">
      ExerciseList
      {error && <h1>{error}</h1>}
      {loading && <h1>LOADING!</h1>}
      {exercises &&
        exercises.map((exercise, i) => (
          <ExerciseListItem key={`exercise-${i}`} exercise={exercise} />
        ))}
    </Container>
  );
}

export default ExerciseList;
