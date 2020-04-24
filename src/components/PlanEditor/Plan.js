import React from 'react';
import styled from "styled-components";

import Loop from './Loop';

const Container = styled.div`
  margin: 2rem;
`;

export default function Plan({plan: { id, name, description, created, lastUpdated, loops }}) {
  return (
    <Container className="plan-editor">
      <h3>{name}</h3>
      <p>Last updated: {lastUpdated.toISOString()}</p>
      <p>Description: {description}</p>
      {
        loops && loops.map(loop => (
          <Loop key={`loop-${loop.loopIndex}`} loop={loop} />
        ))
      }
    </Container>
  );
}
