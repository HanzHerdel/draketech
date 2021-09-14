/**extract and split values in object from the keys sendend and an object
 * @param keys Array of strings
 * @param obj object with the values
 */
export const extractValuesFromObj = (keys = [], obj = {}) => {
  let values = {};
  let rest = {};
  Object.keys(obj).forEach((key) => {
    if (keys.includes(key)) values[key] = obj[key];
    rest[key] = obj[key];
  });
  return [values, rest];
};
