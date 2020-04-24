import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getPlan,
  selectPlan,
  selectLoadingPlan,
  selectErrorLoadingPlan,
} from '../../ducks/getPlan';
import Plan from './Plan';

export default function PlanEditor({ planId }) {
  const dispatch = useDispatch();

  const plan = useSelector(selectPlan);
  const loadingPlan = useSelector(selectLoadingPlan);
  const errorLoadingPlan = useSelector(selectErrorLoadingPlan);

  if (!plan && !loadingPlan && !errorLoadingPlan) {
    dispatch(getPlan(planId))
  }

  return (
    <div>
      Hi! I am a plan editor. I will show what is inside the selected plan and help you edit it
      <div>{ planId ? planId : 'no ID found'}</div>
      <div>Loading plan: {loadingPlan ? 'true' : 'false'}</div>
      <div>Error loading plan: {errorLoadingPlan ? errorLoadingPlan : 'no'}</div>
      <div>=======================</div>
      {
        plan && <Plan plan={plan} />
      }
    </div>
  );
}
