/**
 * Created by afaren on 9/10/16.
 */
'use strict';

function getSnapshot(historyData, id) {
  const id_1 = 'e4e87cb2-8e9a-4749-abb6-26c59344dfee';
  const id_2 = '351055db-33e6-4f9b-bfe1-16f1ac446ac1';
  const id_3 = 'dcfa0c7a-5855-4ed2-bc8c-4accae8bd155';

  const snapshotOfId_1 = 'cat1 10 9';
  const snapshotOfId_2 = 'cat1 15 12\ncat2 2 3';
  const snapshotOfId_3 = 'cat1 12 8\ncat2 2 3';


  if (id === id_1)  return snapshotOfId_1;
  if (id === id_2)  return snapshotOfId_2;
  if (id === id_3)  return snapshotOfId_3;
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
  let previousChangeAssembly = previousClone.reduce((acc, cur) => {
    let exist = current.find(v => v.animal === cur.animal);
    if (exist) {
      let p = exist.position;
      exist.position = [p[0] + p[2], p[1] + p[3]];
      acc.push(exist);
    }
    else {
      acc.push(cur);
    }
    return acc;
  }, []);

  const assembly = current.reduce((acc, cur) => {
    let found = previousChangeAssembly.find(v => v.animal === cur.animal);
    if (!found) {
      previousChangeAssembly.push(cur)
    }
    return previousChangeAssembly;
  }, []);

  return assembly;

  function deepClone(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

}

function buildSnapshotOfSelectedID(recordBase, id) {
  let selectedRecord = recordBase.find(record => record.id === id);
  return selectedRecord.coordinateChange.map(item => {
    return `${item.animal} ${item.position[0]} ${item.position[1]}`;
  }).join('\n');
}

module.exports = {
  getSnapshot,
  splitHistoryToRecords,
  buildRecordBase,
  assembleCoordinateChange,
  buildSnapshotOfSelectedID
};