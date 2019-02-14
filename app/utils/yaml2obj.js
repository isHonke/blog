'use strict';

const yaml = require('js-yaml');
const fs = require('fs');

module.exports = function(path) {
  try {
    const obj = yaml.safeLoad(fs.readFileSync(path, 'utf8'));
    return obj;
  } catch (e) {
    console.log(e);
  }
};
