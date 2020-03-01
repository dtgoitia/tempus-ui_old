import gql from "graphql-tag";

const DELETE_EXERCISE_MUTATION = gql`
  mutation deleteExercise($id: String!) {
    deleteExercise(id: $id) {
      success
    }
  }
`;

export default DELETE_EXERCISE_MUTATION;
