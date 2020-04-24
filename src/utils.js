export const TYPE_NAME = '__typename';

/**
 * Remove all the '__typename' properties from the 'obj' object recursively
 * @param {object} obj 
 */
export function dropTypename(obj) {
  if (Array.isArray(obj)) {
    return obj
      .filter(item => item !== TYPE_NAME)
      .map(item => dropTypename(item))
  }
  
  if (typeof obj !== 'object') {
    // obj is not an array or a dictionary
    return obj;
  }

  // obj is a dictionary
  const result = {};
  Object.getOwnPropertyNames(obj)
    .filter(key => key !== TYPE_NAME)
    .forEach(key => {
      result[key] = dropTypename(obj[key])
    })
  return result;
}
