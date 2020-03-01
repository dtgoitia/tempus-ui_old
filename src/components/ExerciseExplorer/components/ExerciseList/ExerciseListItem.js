import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  deleteExercise,
  selectDeletingExercise,
} from "../../../../ducks/deleteExercise";
// TODO: configure webpack to provide absolute path access to 'ducks'

const Container = styled.div({
  borderTop: "1px solid black",
  margin: "0 auto"
});
const Name = styled.h3({
  color: "blue"
});
const Description = styled.p``;

function ExerciseListItem({
  exercise: { id, name, description, exerciseType }
}) {
  const dispatch = useDispatch();
  const deletingExercise = useSelector(selectDeletingExercise);
  let errorDeleting, deletingExerciseId, deleting;
  if (deletingExercise) {
      errorDeleting = deletingExercise.error;
      deletingExerciseId = deletingExercise.exerciseId;
      deleting = deletingExercise.deleting;
  }

  return (
    <Container className="exercise-list-item">
      <Name>{name}</Name>
      <Description>{description}</Description>
      <p>type: {exerciseType}</p>
      {
        deleting && deletingExerciseId === id
          ? <h1>DELETING EXERCISE!</h1>
          : null
      }
      { !deleting && errorDeleting && deletingExerciseId === id
        ? <h1>{errorDeleting}</h1>
        : null
      }
      <button
        className="create-exercise-button"
        onClick={() => dispatch(deleteExercise(id))}
      >
        DELETE EXERCISE
      </button>
    </Container>
  );
}

export default ExerciseListItem;
