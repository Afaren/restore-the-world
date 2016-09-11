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


function isLegalFormatTime(time) {
  // format YYYY/mm/dd hh:MM:ss
  const timeRegex = /^(?:19|20)[0-9][0-9]\/(?:(?:0[1-9])|(?:1[0-2]))\/(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
  return timeRegex.test(time);
}

module.exports = {
  isLegalFormatID,
  isLegalFormatTime
};