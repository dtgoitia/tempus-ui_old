import client from '../createClient';
import GET_PLAN_QUERY from '../graphql/getPlan';
import { dropTypename } from '../utils';

// Actions
const LOADING_PLAN = 'LOADING_PLAN';
const LOADING_PLAN_SUCCEEDED = 'LOADING_PLAN_SUCCEEDED';
const LOADING_PLAN_FAILED = 'LOADING_PLAN_FAILED';
export function isGetPlanAction(action) {
  return [
    LOADING_PLAN,
    LOADING_PLAN_SUCCEEDED,
    LOADING_PLAN_FAILED,
  ].includes(action.type);
}

// Action creators
export function getPlan(planId) {
  return function(dispatch) {
    // TODO: add logging
    dispatch(loadingPlan());
    client
      .query({
        query: GET_PLAN_QUERY,
        variables: { planId },
      })
      .then(response => {
        if (response.errors) {
          // HTTP OK, GraphQL server returns error
          dispatch(loadingPlanFailed(response.errors)); // TODO: add logging
        } else {
          // OK
          dispatch(loadingPlanSucceeded(response.data)); // TODO: add logging
        }
      })
      .catch(errorResponse => {
        // HTTP failed
        dispatch(loadingPlanFailed(errorResponse)); // TODO: add logging
      })
  }
}
function loadingPlan() {
  return { type: LOADING_PLAN };
}
function loadingPlanSucceeded(response) {
  return {
    type: LOADING_PLAN_SUCCEEDED,
    plan: dropTypename(response.plan),
    error: null,
  };
}
function loadingPlanFailed(errorResponse) {
  return {
    type: LOADING_PLAN_FAILED,
    plan: null,
    // TODO: rename error to errors
    error: errorResponse.map(error => error.message),
  };
}

// Reducers
export function getPlanRootReducer(state, action){
  switch (action.type) {
    case LOADING_PLAN:
      return loadingPlanReducer(state);
    case LOADING_PLAN_SUCCEEDED:
      return loadingPlanSucceededReducer(state, action);
    case LOADING_PLAN_FAILED:
      return loadingPlanFailedReducer(state, action);
    default:
      return state;
  }
}
function loadingPlanReducer(state) {
  return { ...state,
    loadingPlan: true,
    plan: null,
    errorGetPlan: null,
  };
}
function parseGoal({ id, goalIndex, exercise, duration, repetitions, pause }) {
  return {
    id,
    goalIndex, // TODO: cast to number?
    exercise, // TODO: any data transformation needed?
    duration, // TODO: cast to number?
    repetitions, // TODO: cast to number?
    pause, // TODO: cast to bool?
  };
}
function parseLoop({ id, loopIndex, rounds, description, goals }) {
  return {
    id,
    loopIndex, // TODO: cast to number?
    rounds, // TODO: cast to number?
    description,
    goals: goals.map(parseGoal)
  }
}
function parsePlan({ id, name, description, created, lastUpdated, loops }) {
  return {
    id,
    name,
    description,
    created: new Date(created),
    lastUpdated: new Date(lastUpdated),
    loops: loops.map(parseLoop),
  };
}
function loadingPlanSucceededReducer(state, action) {
  return { ...state,
    loadingPlan: false,
    plan: parsePlan(action.plan),
    errorGetPlan: null,
  };
}
function loadingPlanFailedReducer(state, action) {
  return {
    ...state, 
    loadingPlan: false,
    plan: null,
    errorGetPlan: action.error,
  };
}

// Selector
export const selectPlan = state => state.planEditor.plan;
export const selectLoadingPlan = state =>
  state.planEditor.loadingPlan;
export const selectErrorLoadingPlan = state =>
  state.planEditor.errorGetPlan;
  