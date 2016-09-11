/**
 * Created by afaren on 9/12/16.
 */
'use strict';

function isLegalFormatID(id) {
  if (id.length < 1)
    return false;
  const SPACE = ' ';
  return id.indexOf(SPACE) < -1;
}

module.exports = {
  isLegalFormatID
};