export function dropTypename(obj) {
  const { __typename, ...result} = obj;
  return result;
}
