/**
 * Created by afaren on 9/12/16.
 */
'use strict';

function isLegalFormatID(id) {
  const SPACE = ' ';
  return id.indexOf(SPACE) < -1;
}

module.exports = {
  isLegalFormatID
};