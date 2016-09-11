/**
 * Created by afaren on 9/12/16.
 */
'use strict';

import {isLegalFormatID, isLegalFormatTime, isLegalPosition} from '../src/validation';


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
});

