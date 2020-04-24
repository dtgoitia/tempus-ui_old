import React from 'react';
import styled from "styled-components";

import Goal from './Goal';

const Container = styled.div`
  margin: 2rem;
`;

export default function Loop({loop: { id, rounds, description, goals }}) {
  return (
    <Container className="loops-editor">
      <p>LOOP #{id}</p>
      <p>Rounds: {rounds}</p>
      <p>Description: {description}</p>
      {
        goals && goals.map(goal => (
          <Goal key={`goal-${goal.id}`} goal={goal} />
        ))
      }
    </Container>
  );
}
