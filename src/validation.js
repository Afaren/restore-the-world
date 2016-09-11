/**
 * Created by afaren on 9/12/16.
 */
'use strict';

function isLegalFormatID(id) {
  return isNotEmptyString(id) && isNotContainingSpace();

  function isNotContainingSpace() {
    return !/\s/.test(id);
  }
}


function isLegalFormatTime(time) {
  // format YYYY/mm/dd hh:MM:ss
  const timeRegex = /^(?:19|20)[0-9][0-9]\/(?:(?:0[1-9])|(?:1[0-2]))\/(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
  return timeRegex.test(time);
}


function isLegalPosition(position) {
  const length = position.length;
  const legalLength_2 = 2;
  const legalLength_4 = 4;

  return length === legalLength_2 || length === legalLength_4;
}


function isLegalCoordinateChange(coordinateChange) {

  return coordinateChange.every(each => {
    return isNotEmptyString(each.animal) && isLegalPosition(each.position);
  });

}

function isNotEmptyString(string) {
  return string !== undefined && string.length > 0;
}

function isLegalRecords(records) {
  return records.every(each=> {
    return isLegalFormatID(each.id)
      && isLegalFormatTime(each.time)
      && isLegalCoordinateChange(each.coordinateChange);
  })
}

module.exports = {
  isLegalFormatID,
  isLegalFormatTime,
  isLegalPosition,
  isLegalCoordinateChange,
  isLegalRecords
};