import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createExercise } from "./../../ducks";

const EMPTY_STRING = '';

function CreateExercise() {
  const dispatch = useDispatch();

  const [name, setName] = useState(EMPTY_STRING);
  const [description, setDescription] = useState(EMPTY_STRING);
  const [exerciseType, setExerciseType] = useState(EMPTY_STRING);

  return (
    <div className="create-exercise">
      CreateExercise
      <input
        type="text"
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <input
        type="text"
        id="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="text"
        id="exercise-type"
        value={exerciseType}
        onChange={e => setExerciseType(e.target.value)}
      />
      <button
        className="create-exercise-button"
        onClick={() => dispatch(createExercise({
          id: Date.now(),
          name, description, exerciseType
        }))}
      >CREATE</button>
      <button>DISCARD</button>
    </div>
  )
}

export default CreateExercise;
