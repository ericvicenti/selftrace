/**
 * Recursively sets all nested values of a plain object to a specified value. Does
 * not touch the value if it's an object, mutates all its nested children instead.
 */
function setObjectVals(obj, newVal) {
  Object.keys(obj).forEach(key => {
    if (isPlainObject(obj[key])) {
      setObjectVals(obj[key], newVal);
    } else {
      obj[key] = newVal;
    }
  });
}

function isPlainObject(o) {
  return !!o && typeof o === 'object' && o.constructor === Object;
}

module.exports = {
  setObjectVals,
};
