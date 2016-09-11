/**
 * Created by afaren on 9/10/16.
 */
import { getSnapshot, splitHistoryToRecords } from '../src/snapshot';

describe('snapshot', () => {
  const id_1 = 'e4e87cb2-8e9a-4749-abb6-26c59344dfee';
  const id_2 = '351055db-33e6-4f9b-bfe1-16f1ac446ac1';
  const id_3 = 'dcfa0c7a-5855-4ed2-bc8c-4accae8bd155';
  const time_1 = '2016/09/02 22:30:46';
  const time_2 = '2016/09/02 22:30:52';
  const time_3 = '2016/09/02 22:31:02';
  const coordinate_1 = 'cat1 10 9';
  const coordinate_2 = 'cat1 10 9 2 -1\ncat2 2 3';
  const coordinate_3 = 'cat1 12 8 3 4';

  const historyData = `${id_1}
${time_1}
${coordinate_1}

${id_2}
${time_2}
${coordinate_2}

${id_3}
${time_3}
${coordinate_3}`;

  const snapshotOfId_1 = 'cat1 10 9';
  const snapshotOfId_2 = 'cat1 15 12\ncat2 2 3';
  const snapshotOfId_3 = 'cat1 12 8\ncat2 2 3';


  describe('getSnapshot', ()=> {
    it('should return snapshots of animals when given a selectedId', () => {
      const testInput = [
        {
          id: id_1,
          snapshot: snapshotOfId_1
        },
        {
          id: id_2,
          snapshot: snapshotOfId_2
        },
        {
          id: id_3,
          snapshot: snapshotOfId_3
        }
      ];

      testInput.forEach(input => {
        expect(getSnapshot(historyData, input.id)).toEqual(input.snapshot);
      });
    });
  });

  describe('splitHistoryToRecords', ()=> {
    it('should return one record when given historyData contains only single history', ()=> {

      const singleHistoryData = `${id_1}
${time_1}
${coordinate_1}`;
      const expectedRecord = [{
        id: id_1,
        time: time_1,
        coordinateChange: [
          {
            animal: 'cat1',
            position: [10, 9]
          }
        ]
      }];
      expect(splitHistoryToRecords(singleHistoryData)).toEqual(expectedRecord);

    });
  });
});
