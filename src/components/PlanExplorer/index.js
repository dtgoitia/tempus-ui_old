import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getPlans,
  selectPlans,
  selectLoadingPlans,
  selectErrorLoadingPlans,
} from '../../ducks/getPlans';

export default function PlanExplorer() {
  const dispatch = useDispatch();

  const plans = useSelector(selectPlans);
  const loadingPlans = useSelector(selectLoadingPlans);
  const errorLoadingPlans = useSelector(selectErrorLoadingPlans);

  if(!plans && !loadingPlans) {
    dispatch(getPlans());
  }

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
