import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// TODO: set up Webpack to use '@' instead of long relative paths
import { deleteExercise } from "./../../ducks";

const Container = styled.div({
  borderTop: "1px solid black",
  margin: "0 auto",
});
const Name = styled.h3({
  color: 'blue',
});
const Description = styled.p``;

function ExerciseListItem({
  exercise: { id, name, description, exerciseType }
}) {
  const dispatch = useDispatch();

  return (
    <Container className="exercise-list-item">
      <Name>{name}</Name>
      <Description>{description}</Description>
      <p>type: {exerciseType}</p>
      <button
        className="create-exercise-button"
        onClick={() => dispatch(deleteExercise({ id }))}
      >
        DELETE EXERCISE
      </button>
    </Container>
  );
}

export default ExerciseListItem;
