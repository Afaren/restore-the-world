/**
 * Created by afaren on 9/12/16.
 */
'use strict';

import {
  isLegalFormatID,
  isLegalFormatTime,
  isLegalPosition,
  isLegalCoordinateChange,
  isLegalRecords
} from '../src/validation';


fdescribe('validation', ()=> {
  describe('isLegalFormatID', ()=> {
    it('should return false when given id contains space', ()=> {
      const idContainingSpace = 'xxxxx-88888-u uuuu';
      expect(isLegalFormatID(idContainingSpace)).toBeFalsy();
    });
    it('should return false when given id is an empty string', ()=> {
      const idOfEmptyString = '';
      expect(isLegalFormatID(idOfEmptyString)).toBeFalsy();
    });
    it('should be true when given id is not empty and not containing space', ()=> {
      const legalIDs = [
        'xxxxxxxxxxxxxxxxxxx',
        '8888888888888888888',
        'xxxxxxxxxxxxxx88888',
        '888888888888xxxxxxx',
        '1',
        'x'
      ];
      legalIDs.forEach(each => {
        expect(isLegalFormatID(each)).toBeTruthy();
      })
    })
  });

  describe('isLegalFormatTime', ()=> {
    it('should be true if given time has legal format', ()=> {
      const time = '2016/09/02 22:30:46';
      expect(isLegalFormatTime(time)).toBeTruthy();
    });

    it('should be false if given time has illegal format', ()=> {
      const time = '2016/9/2 22:30:46';
      expect(isLegalFormatTime(time)).toBeFalsy();
    });

  });

  describe('isLegalPosition', ()=> {
    it('should be false when given length of position is not 2 or 4', ()=> {
      const illegalPositions = [
        [],
        [1],
        [1, 1, 1],
        [1, 1, 1, 1, 1]
      ];
      illegalPositions.forEach(each=> {
        expect(isLegalPosition(each)).toBeFalsy();
      });
    });

    it('should be true when given length of position is 2 or 4', ()=> {
      const legalPositions = [
        [1, 1],
        [1, 1, 1, 1]
      ];
      legalPositions.forEach(each=> {
        expect(isLegalPosition(each)).toBeTruthy();
      });

    });
  });

  describe('isLegalCoordinateChange', ()=> {
    it('should be false when given coordinateChange has illegal format', ()=> {
      const illegalCoordinateChange = [
        {
          animal: 'cat1',
          position: []
        }, {
          animal: 'cat1',
          position: [10]
        }, {
          animal: 'cat1',
          position: [10, 9, 3]
        }, {
          animal: 'cat1',
          position: [10, 9, 3, 5, 7]
        }
      ];

      expect(isLegalCoordinateChange(illegalCoordinateChange)).toBeFalsy();
    });

    it('should be true when given coordinateChange has legal format', ()=> {
      const legalCoordinateChange = [
        {
          animal: 'cat1',
          position: [10, 9]
        }, {
          animal: 'cat1',
          position: [10, 9, 2, 3]
        }
      ];

      expect(isLegalCoordinateChange(legalCoordinateChange)).toBeTruthy();

    });
  });

  describe('isLegalRecords', ()=> {
    it('should should be false when given records has a illegal format', ()=> {
      const id_1 = 'e4e87cb2-8e9a-4749-abb6-26c59344dfee';
      const id_2 = '351055db-33e6-4f9b-bfe1-16f1ac446ac1';
      const id_3 = 'dcfa0c7a-5855-4ed2-bc8c-4accae8bd155';
      const time_1 = '2016/09/02 22:30:46';
      const time_2 = '2016/09/02 22:30:52';
      const time_3 = '2016/09/02 22:31:02';

      const someIllegalRecords = [
        [{
          time: time_1,
          coordinateChange: [
            {
              animal: 'cat1',
              position: [10, 9]
            }
          ]
        }], [{
          id: id_2,
          coordinateChange: [
            {
              animal: 'cat1',
              position: [10]
            }, {
              animal: 'cat2',
              position: [2, 3]
            }
          ]
        }], [{
          id: id_3,
          time: time_3,
          coordinateChange: [
            {
              position: [12, 8, 3, 4]
            }
          ]
        }]
      ];

      someIllegalRecords.forEach(each=> {
        expect(isLegalRecords(each)).toBeFalsy();
      })


    });

    it('should be true when given records has a legal format', ()=> {
      const id_1 = 'e4e87cb2-8e9a-4749-abb6-26c59344dfee';
      const id_2 = '351055db-33e6-4f9b-bfe1-16f1ac446ac1';
      const id_3 = 'dcfa0c7a-5855-4ed2-bc8c-4accae8bd155';
      const time_1 = '2016/09/02 22:30:46';
      const time_2 = '2016/09/02 22:30:52';
      const time_3 = '2016/09/02 22:31:02';

      const someLegalRecords = [
        [{
          id: id_1,
          time: time_1,
          coordinateChange: [
            {
              animal: 'cat1',
              position: [10, 9]
            }
          ]
        }], [{
          id: id_2,
          time: time_2,
          coordinateChange: [
            {
              animal: 'cat1',
              position: [10, 9, 2, -1]
            }, {
              animal: 'cat2',
              position: [2, 3]
            }
          ]
        }], [{
          id: id_3,
          time: time_3,
          coordinateChange: [
            {
              animal: 'cat1',
              position: [12, 8, 3, 4]
            }]
        }]
      ];

      someLegalRecords.forEach(each=> {
        expect(isLegalRecords(each)).toBeTruthy();
      })


    })

  })

});

