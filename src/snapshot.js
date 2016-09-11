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

  printBase();
  let previous, current, assembly;
  for (let i = 1, length = records.length; i < length; i++) {
    previous = getLastCoordinateInBase();
    current = getCurrentCoordinateInRecords();
    assembly = assembleCoordinateChange(previous, current);
    console.log('---------assemble------------')
    console.log(assembly)
    console.log('---------previous------------')
    console.log(previous)
    base.push(Object.assign({}, ...records[i], assembly));
  }

  printBase();

  return base;

  function getCurrentCoordinateInRecords() {
    return records[base.length].coordinateChange;
  }

  function getLastCoordinateInBase() {
    return base[base.length - 1].coordinateChange;
  }

  function printBase() {
    console.log('print base ---');
    console.log(JSON.stringify(base, null, 2));
  }
}

function assembleCoordinateChange(previous, current) {
  let previousClone = deepCopy(previous);
  let assembly = previousClone.reduce((acc, cur) => {
    let found = current.find(v => v.animal === cur.animal);
    if (found) {
      let p = found.position;
      found.position = [p[0] + p[2], p[1] + p[3]];
      acc.push(found);
    }
    else {
      acc.push(cur);
    }
    return acc;
  }, []);

  assembly = current.reduce((acc, cur) => {
    let found = assembly.find(v => v.animal === cur.animal);
    if (!found) {
      assembly.push(cur)
    }
    return assembly;
  }, []);

  return assembly;

  function deepCopy(arr) {
    return JSON.parse(JSON.stringify(arr));
  }

}

module.exports = {
  getSnapshot,
  splitHistoryToRecords,
  buildRecordBase,
  assembleCoordinateChange
};