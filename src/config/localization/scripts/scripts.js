const fs = require('fs');
const {
  translations: { en, ...rest },
} = require('../translations');
const { isPlainObject, nestedFieldOf } = require('./util');

/**
 * Generates blank.json template from en.json, for use when translating to another language.
 */
function generateBlankJSON() {
  const blank = en;
  setObjectVals(blank, null);
  fs.writeFileSync('../blank.json', JSON.stringify(blank));

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
}

/**
 *
 */
function findMissingTranslations() {
  const missingTranslations = Object.keys(rest).reduce((tot, cur) => {
    tot[cur] = [];
    return tot;
  }, {});

  recurse(en, []);

  return missingTranslations;

  function recurse(obj, prevPath) {
    if (!isPlainObject(obj)) {
      return;
    }

    Object.keys(obj).forEach(key => {
      const path = [...prevPath, key];
      const pathString = path.join('.');

      // Check which translations are missing this field
      Object.keys(rest).forEach(locale => {
        if (!nestedFieldOf(rest[locale], path)) {
          missingTranslations[locale].push(pathString);
        }
      });

      recurse(obj[key], path);
    });
  }
}

module.exports = {
  generateBlankJSON,
  findMissingTranslations,
};
