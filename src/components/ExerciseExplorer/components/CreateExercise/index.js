import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  createExercise,
  selectCreatingExercise,
  selectErrorCreatingExercise,
} from "../../ducks/createExercise";

const EMPTY_STRING = "";
const EMPTY_FORM = {
  name: EMPTY_STRING,
  description: EMPTY_STRING,
  exerciseType: EMPTY_STRING
};
const NAME = "name";
const DESCRIPTION = "description";
const EXERCISE_TYPE = "exercise-type";

const Container = styled.div`
  margin: 2rem;
`;

const BlockInput = styled.input`
  display: block;
  font-size: 1rem;
  margin-top: 0.5rem;
  padding: .7rem;
  width: 100%;
`;

const Field = styled.div`
  margin: 1rem;
`;

function CreateExercise() {
  const dispatch = useDispatch();
  const inflightRequest = useSelector(selectCreatingExercise);
  const error = useSelector(selectErrorCreatingExercise);

  const [formValues, setFormValues] = useState(EMPTY_FORM);

  return (
    <Container className="create-exercise">
      <div>Add a new exercise to the catalogue:</div>
      {inflightRequest && <h1>CREATING EXERCISE!</h1>}
      {error && <h1>{error}</h1>}
      <Field>
        <label htmlFor={NAME}>Exercise name:*</label>
        <BlockInput
          type="text"
          id={NAME}
          value={formValues.name}
          placeholder="One leg squat"
          onChange={e => setFormValues({ ...formValues, name: e.target.value })}
        />
      </Field>
      <Field>
        <label htmlFor={DESCRIPTION}>Exercise description:</label>
        <BlockInput
          type="text"
          id={DESCRIPTION}
          value={formValues.description}
          placeholder="Keep the legs open to the width of your shoulders..."
          onChange={e =>
            setFormValues({ ...formValues, description: e.target.value })
          }
        />
      </Field>
      <Field>
        <label htmlFor={EXERCISE_TYPE}>Exercise type:</label>
        <BlockInput
          type="text"
          id={EXERCISE_TYPE}
          value={formValues.exerciseType}
          onChange={e =>
            setFormValues({ ...formValues, exerciseType: e.target.value })
          }
        />
      </Field>
      <button
        className="create-exercise-button"
        onClick={() => {
          dispatch(createExercise(formValues));
          setFormValues(EMPTY_FORM);
        }}
      >
        CREATE
      </button>
      <button
        className="discard-exercise-button"
        onClick={() => setFormValues(EMPTY_FORM)}
      >
        DISCARD
      </button>
    </Container>
  );
}

export default CreateExercise;
