import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getPlans,
  selectPlans,
  selectLoadingPlans,
  selectErrorLoadingPlans,
} from '../../ducks/getPlans';

export default function PlanExplorer() {
  const dispatch = useDispatch();

  // Fire the callback only:
  // useEffect: fire after the component is mounted and rendered
  // once: the second argument in useEffect (see docs below)
  // docs: https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect
  useEffect(() => {
    dispatch(getPlans());
  }, []);

  const plans = useSelector(selectPlans);
  const loadingPlans = useSelector(selectLoadingPlans);
  const errorLoadingPlans = useSelector(selectErrorLoadingPlans);

  return (
    <div>
      Hi! I am a plan explorer. I will show you a list of the existing plans!
      <div>Loading plans: {loadingPlans ? 'true' : 'false'}</div>
      <div>Error loading plans: {errorLoadingPlans ? errorLoadingPlans : 'no'}</div>
      <div>Plans:</div>
      {
        plans && plans.map(plan => (
          <div>
            <h3>PLAN</h3>
            <p>ID: {plan.id}</p>
            <p>name: {plan.name}</p>
            <p>description: {plan.description}</p>
          </div>
        ))
      }
    </div>
  );
}
