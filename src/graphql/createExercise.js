import gql from "graphql-tag";

const CREATE_EXERCISE_MUTATION = gql`
  mutation createExercise(
    $name: String!,
    $description: String,
    $exerciseType: ExerciseType!
  ) {
    createExercise (
      name: $name,
      description: $description,
      exerciseType: $exerciseType
    ) {
      exercise {
        id
        name
        description
        exerciseType
      }
    }
  }
`;

export default CREATE_EXERCISE_MUTATION;
