import client from '../createClient';
import GET_PLANS_QUERY from '../graphql/getPlans';
import { dropTypename } from '../utils';

// Actions
const LOADING_PLANS = 'LOADING_PLANS';
const LOADING_PLANS_SUCCEEDED = 'LOADING_PLANS_SUCCEEDED';
const LOADING_PLANS_FAILED = 'LOADING_PLANS_FAILED';
export function isGetPlansAction(action) {
  return [
    LOADING_PLANS,
    LOADING_PLANS_SUCCEEDED,
    LOADING_PLANS_FAILED,
  ].includes(action.type);
}

// Action creators
export function getPlans() {
  return function(dispatch) {
    // TODO: add logging
    dispatch(loadingAllPlans());
    client
      .query({ query: GET_PLANS_QUERY })
      .then(response => {
        // TODO: add logging
        dispatch(loadingPlansSucceeded(response.data));
      })
      .catch(errorResponse => {
        // TODO: add logging
        dispatch(loadingPlansFailed(errorResponse));
      })
  }
}
function loadingAllPlans() {
  return { type: LOADING_PLANS };
}
function loadingPlansSucceeded(response) {
  return {
    type: LOADING_PLANS_SUCCEEDED,
    plans: response.plans.map(plan => dropTypename(plan)),
    error: null,
  };
}
function loadingPlansFailed(errorResponse) {
  return {
    type: LOADING_PLANS_FAILED,
    plans: null,
    error: errorResponse.message,
  };
}

// Reducers
export function getPlansRootReducer(state, action){
  switch (action.type) {
    case LOADING_PLANS:
      return loadingPlansReducer(state);
    case LOADING_PLANS_SUCCEEDED:
      return loadingPlansSucceededReducer(state, action);
    case LOADING_PLANS_FAILED:
      return loadingPlansFailedReducer(state, action);
    default:
      return state;
  }
}
function loadingPlansReducer(state) {
  return { ...state,
    loadingPlans: true,
    plans: [],
    errorGetPlans: null,
  };
}
function loadingPlansSucceededReducer(state, action) {
  return { ...state,
    loadingPlans: false,
    plans: action.plans,
    errorGetPlans: null,
  };
}
function loadingPlansFailedReducer(state, action) {
  return {
    ...state, 
    loadingPlans: false,
    plans: null,
    errorGetPlans: action.error,
  };
}

// Selector
export const selectPlans = state => state.planExplorer.plans;
export const selectLoadingPlans = state =>
  state.planExplorer.loadingPlans;
export const selectErrorLoadingPlans = state =>
  state.planExplorer.errorGetPlans;
  