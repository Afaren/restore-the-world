/**
 * Created by afaren on 9/10/16.
 */
'use strict';
import {isLegalRecords} from './validation';

function getSnapshot(historyData, id) {
  const records = splitHistoryToRecords(historyData);
  if (!isLegalRecords(records)) {
    return 'Invalid format';
  }
  const recordBase = buildRecordBase(records);
  if(recordBase.conflict) {
    return 'Conflict fount at ' + recordBase.id;
  }
  return buildSnapshotOfSelectedID(recordBase, id);
}

function splitHistoryToRecords(historyData) {

  const delimiterOfRecord = '\n\n';
  const delimiterOfLine = '\n';
  const delimiterOfChunk = ' ';

  const rawRecords = historyData.split(delimiterOfRecord);

  const records = rawRecords.map(rawRecord => {
    const lines = rawRecord.split(delimiterOfLine);

    const coordinateChange = lines.slice(2).map(line => {
      const chunk = line.split(delimiterOfChunk);
      const position = chunk.slice(1).map(v => Number.parseInt(v));
      return {
        animal: chunk[0],
        position
      }
    });

    return {
      id: lines[0],
      time: lines[1],
      coordinateChange: coordinateChange
    };
  });

  return records;

}

function buildRecordBase(records) {
  const base = [];
  base.push(records[0]);

  let previous, current, assembly;
  for (let i = 1, length = records.length; i < length; i++) {
    previous = getLastCoordinateInBase();
    current = getCurrentCoordinateInRecords();
    assembly = assembleCoordinateChange(previous, current);
    if (assembly.conflict) {
      return {conflict: assembly.conflict, id: records[i].id};
    }
    base.push(Object.assign({}, records[i], {coordinateChange: assembly}));
  }
  return base;

  function getCurrentCoordinateInRecords() {
    return records[base.length].coordinateChange;
  }

  function getLastCoordinateInBase() {
    return base[base.length - 1].coordinateChange;
  }
}

function assembleCoordinateChange(previous, current) {
  let previousClone = deepClone(previous);

  let previousChangeAssembly = [];
  for (let each of previousClone) {
    let exist = current.find(v => v.animal === each.animal);
    if (exist) {
      let p = exist.position;
      if (hasConflict(each, exist)) {
        return {conflict: true};
      } else {
        exist.position = [p[0] + p[2], p[1] + p[3]];
        previousChangeAssembly.push(exist);
      }
    }
    else {
      previousChangeAssembly.push(each);
    }
  }

  const assembly = current.reduce((acc, cur) => {
    let found = previousChangeAssembly.find(v => v.animal === cur.animal);
    if (!found) {
      previousChangeAssembly.push(cur)
    }
    return previousChangeAssembly;
  }, []);

  return assembly;

  function hasConflict(current, previous) {
    const cp = current.position, pp = previous.position;
    return cp[0] !== pp[0] || cp[1] !== cp[1];
  }

  function deepClone(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

}

function buildSnapshotOfSelectedID(recordBase, id) {
  let selectedRecord = recordBase.find(record => record.id === id);
  if (!selectedRecord) {
    const ERROR_MSG = 'id not found';
    return ERROR_MSG;
  }
  return selectedRecord.coordinateChange
    .sort((a, b) => a.animal > b.animal)
    .map(item => {
      return `${item.animal} ${item.position[0]} ${item.position[1]}`;
    })
    .join('\n');
}

module.exports = {
  getSnapshot,
  splitHistoryToRecords,
  buildRecordBase,
  assembleCoordinateChange,
  buildSnapshotOfSelectedID
};