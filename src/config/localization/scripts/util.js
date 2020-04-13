function isPlainObject(o) {
  return !!o && typeof o === 'object' && o.constructor === Object;
}

function nestedFieldOf(obj, path) {
  let cur = obj;
  for (const key of path) {
    if (!isPlainObject(cur)) {
      break;
    }
    cur = cur[key];
  }

  return cur;
}

module.exports = {
  isPlainObject,
  nestedFieldOf,
};
