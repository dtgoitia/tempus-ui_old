import gql from "graphql-tag";

const GET_EXERCISES_QUERY = gql`
  {
    exercises {
      id
      name
      description
      exerciseType
    }
  }
`;

export default GET_EXERCISES_QUERY;
