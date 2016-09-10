/**
 * Created by afaren on 9/10/16.
 */
'use strict';

function getSnapshot(historyData, id) {
  if (id === 'e4e87cb2-8e9a-4749-abb6-26c59344dfee')
    return 'cat1 10 9';
  return 'cat1 15 12\ncat2 2 3';
}

module.exports = {
  getSnapshot
};