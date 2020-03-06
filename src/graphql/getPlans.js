import gql from "graphql-tag";

const GET_PLANS_QUERY = gql`
{
  plans {
    id
    name
    description
  }
}
`;

export default GET_PLANS_QUERY;
