import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { createExercise } from "./../../ducks";

const EMPTY_STRING = "";
const NAME = 'name';
const DESCRIPTION = 'description';
const EXERCISE_TYPE = 'exercise-type';

const Container = styled.div`
  margin: 2rem;
`;

const BlockInput = styled.input`
  display: block;
  width: 100%;
`;

function CreateExercise() {
  const dispatch = useDispatch();

  const [name, setName] = useState(EMPTY_STRING);
  const [description, setDescription] = useState(EMPTY_STRING);
  const [exerciseType, setExerciseType] = useState(EMPTY_STRING);

  return (
    <Container className="create-exercise">
      <div>CreateExercise</div>
      <label for={NAME}>Exercise name:*</label>
      <BlockInput
        type="text"
        id={NAME}
        value={name}
        placeholder="One leg squat"
        onChange={e => setName(e.target.value)}
      />
      <label for={DESCRIPTION}>Exercise description:</label>
      <BlockInput
        type="text"
        id={DESCRIPTION}
        value={description}
        placeholder="Keep the legs open to the width of your shoulders..."
        onChange={e => setDescription(e.target.value)}
      />
      <BlockInput
        type="text"
        id="exercise-type"
        value={exerciseType}
        onChange={e => setExerciseType(e.target.value)}
      />
      <button
        className="create-exercise-button"
        onClick={() =>
          dispatch(
            createExercise({
              id: Date.now(),
              name,
              description,
              exerciseType
            })
          )
        }
      >
        CREATE
      </button>
      <button>DISCARD</button>
    </Container>
  );
}

export default CreateExercise;
