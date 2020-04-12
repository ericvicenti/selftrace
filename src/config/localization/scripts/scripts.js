const fs = require('fs');
const en = require('../en.json');
const { setObjectVals } = require('./util');

/**
 * Generates blank.json template from en.json, for use when translating to another language.
 */
function generateBlankJSON() {
  const blank = en;
  setObjectVals(blank, null);
  fs.writeFileSync('../blank.json', JSON.stringify(blank));
}

module.exports = {
  generateBlankJSON,
};
