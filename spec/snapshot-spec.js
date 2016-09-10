/**
 * Created by afaren on 9/10/16.
 */
import {getSnapshot} from '../src/snapshot';

describe('snapshot', () => {
  describe('getSnapshot', ()=> {
    const id_1 = 'e4e87cb2-8e9a-4749-abb6-26c59344dfee';
    const id_2 = '351055db-33e6-4f9b-bfe1-16f1ac446ac1';
    const id_3 = 'dcfa0c7a-5855-4ed2-bc8c-4accae8bd155';

    const historyData = `${id_1}
2016/09/02 22:30:46
cat1 10 9

${id_2}
2016/09/02 22:30:52
cat1 10 9 2 -1
cat2 2 3

${id_3}
2016/09/02 22:31:02
cat1 12 8 3 4`;

    const snapshotOfId_1 = 'cat1 10 9';
    const snapshotOfId_2 = 'cat1 15 12\ncat2 2 3';
    const snapshotOfId_3 = 'cat1 12 8\ncat2 2 3';

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
          id:id_3,
          snapshot: snapshotOfId_3
        }
      ];

      testInput.forEach(input => {
        expect(getSnapshot(historyData, input.id)).toEqual(input.snapshot);
      });
    });
  });

});
