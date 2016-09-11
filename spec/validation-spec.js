/**
 * Created by afaren on 9/12/16.
 */
'use strict';

import {isLegalFormatID} from '../src/validation';


describe('validation', ()=> {
  fdescribe('isLegalFormatID', ()=> {
    it('should return false when given id contains space',()=> {
      var idContainingSpace = 'xxxxx-88888-u uuuu';
      expect(isLegalFormatID(idContainingSpace)).toBeFalsy();
    });
    it('should return false when given id is en empty string',()=> {
      var idOfEmptyString = '';
      expect(isLegalFormatID(idOfEmptyString)).toBeFalsy();
    });
  })
});