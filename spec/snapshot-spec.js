/**
 * Created by afaren on 9/10/16.
 */
import { getSnapshot } from '../src/snapshot';

describe('snapshot', () => {
  it('just test', () => {
    expect(getSnapshot('xxx', '1')).toEqual('1');
  })
});
