/**
 * Created by afaren on 9/12/16.
 */
'use strict';

import {isLegalFormatID} from '../src/validation';


describe('validation', ()=> {
  fdescribe('isLegalFormatID', ()=> {
    it('should return false when given id contains space',()=> {
      const idContainingSpace = 'xxxxx-88888-u uuuu';
      expect(isLegalFormatID(idContainingSpace)).toBeFalsy();
    });
    it('should return false when given id is an empty string',()=> {
      const idOfEmptyString = '';
      expect(isLegalFormatID(idOfEmptyString)).toBeFalsy();
    });
    it('should be true when given id is not empty and not containing space',()=> {
      const legalIDs = [
        'xxxxxxxxxxxxxxxxxxx',
        '8888888888888888888',
        'xxxxxxxxxxxxxx88888',
        '888888888888xxxxxxx',
        '1',
        'x'
      ];
      legalIDs.forEach(each =>{
        expect(isLegalFormatID(each)).toBeTruthy();
      })
    })
  })
});