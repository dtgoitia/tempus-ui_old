import React from 'react';
import styled from "styled-components";

const Container = styled.div`
  margin: 2rem;
  background-color: #eee;
`;

export default function Goal({goal: { id, goalIndex, exercise, duration, repetitions, pause }}) {
  return (
    <Container className="goal-editor">
      <h4>{exercise.name} (Exercise ID: {exercise.id})</h4>
      <p>Exercise description: {exercise.description}</p>
      <p>Exercise type: {exercise.exerciseType}</p>
      <p>Repetitions: {repetitions}</p>
      <p>Duration: {duration}</p>
      <p>Pause: {`${pause}`}</p>
    </Container>
  );
}
