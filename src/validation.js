/**
 * Created by afaren on 9/12/16.
 */
'use strict';

function isLegalFormatID(id) {
  if (id.length < 1)
    return false;

  if (/\s/.test(id))
    return false;

  return true;
}

module.exports = {
  isLegalFormatID
};