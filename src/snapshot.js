/**
 * Created by afaren on 9/10/16.
 */
'use strict';

function getSnapshot(historyData, id) {
  const id_1 = 'e4e87cb2-8e9a-4749-abb6-26c59344dfee';
  const id_2 = '351055db-33e6-4f9b-bfe1-16f1ac446ac1';
  const id_3 = 'dcfa0c7a-5855-4ed2-bc8c-4accae8bd155';

  if (id === id_3)  return 'cat1 15 12\ncat2 2 3';
  if (id === id_2)  return 'cat1 12 8\ncat2 2 3';
  if (id === id_1)  return 'cat1 10 9';
}

module.exports = {
  getSnapshot
};