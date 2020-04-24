import gql from "graphql-tag";

const GET_PLAN_QUERY = gql`
  query GetPlan($planId: String!) {
    plan(planId: $planId) {
      id
      name
      description
      created
      lastUpdated
      loops {
        id
        loopIndex
        rounds
        description
        goals {
          id
          goalIndex
          exercise {
            id
            name
            description
            exerciseType
          }
          duration
          repetitions
          pause
        }
      }
    }
  }
`;

export default GET_PLAN_QUERY;
