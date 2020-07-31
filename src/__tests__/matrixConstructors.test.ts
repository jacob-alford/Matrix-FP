import * as E from 'fp-ts/lib/Either';
import m from 'matrix/m';
import v from 'vector/v';
import unwrap from '_utils/unwrap';

describe('m()', () => {
  it(`'rights' a valid matrix`, () => {
    const a = m(v(1, 2, 3), v(4, 5, 6));
    expect(E.isRight(a)).toBe(true);
    expect(unwrap(a)).toStrictEqual([
      [1, 2, 3],
      [4, 5, 6]
    ]);
  });
  it(`'lefts' an invalid matrix`, () => {
    const a = m(v(1, 2), v(3, 4, 5));
    expect(E.isLeft(a)).toBe(true);
    expect(unwrap(a)).toStrictEqual(new Error('Provided matrix shape not uniform!'));
  });
});
