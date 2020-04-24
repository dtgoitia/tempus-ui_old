import React from 'react';
import styled from "styled-components";

import Loop from './Loop';

const Container = styled.div`
  margin: 2rem;
`;

export const entryType = {
  LOOP: 'loop',
  PREP: 'prep',
  REST: 'rest',
  WORK: 'work',
};

function parseSingleGoal(goal, loopIndex = null) {
  return {
    exerciseId: goal.exercise.id,
    index: loopIndex ? loopIndex : goal.goalIndex,
    duration: goal.duration,
    repetitions: goal.repetitions,
    type: entryType[goal.exercise.exerciseType],
    name: goal.exercise.name,
    description: goal.exercise.description,
    pause: goal.pause,
  };
}

function parseLoopGoals(goals) {
  return goals.map(parseSingleGoal)
}

export function flattenPlan(loops) {
  return loops.map((loop, i) => {
    const isLoop = loop.goals.length > 1;
    return isLoop
      ? {
          index: i,
          rounds: loop.rounds,
          type: entryType.LOOP,
          entries: parseLoopGoals(loop.goals),
        }
      : parseSingleGoal(loop.goals[0], loop.loopIndex);
  });
}

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
