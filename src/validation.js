/**
 * Created by afaren on 9/12/16.
 */
'use strict';

function isLegalFormatID(id) {

  if (isEmptyString() || isContainingSpace())
    return false;
  return true;

  function isContainingSpace() {
    return /\s/.test(id);
  }

  function isEmptyString() {
    return id.length < 1;
  }

}


function isLegalFormatTime(time) {
  // format YYYY/mm/dd hh:MM:ss
  const timeRegex = /^(?:19|20)[0-9][0-9]\/(?:(?:0[1-9])|(?:1[0-2]))\/(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
  return timeRegex.test(time);
}


function isLegalPosition(position) {
  const length = position.length;
  const legalLength_1 = 2;
  const lengthLength_2 = 4;
  if (length === legalLength_1 || length === lengthLength_2)
    return true;
  return false;
}


function isLegalCoordinateChange(coordinateChange) {

  return coordinateChange.every(each => {
    return isNotEmptyString(each.animal) && isLegalPosition(each.position);
  });

  function isNotEmptyString(string) {
    return string.length > 1;
  }
}


module.exports = {
  isLegalFormatID,
  isLegalFormatTime,
  isLegalPosition,
  isLegalCoordinateChange
};