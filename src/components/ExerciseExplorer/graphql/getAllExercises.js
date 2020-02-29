import gql from "graphql-tag";

const getAllExercisesQuery = gql`
  {
    exercises {
      id
      name
      description
      exerciseType
    }
  }
`;

export default getAllExercisesQuery;
