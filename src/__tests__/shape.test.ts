import * as E from 'fp-ts/lib/Either';
import { sequenceT } from 'fp-ts/lib/Apply';
import { pipe } from 'fp-ts/lib/function';
import maxNorm from 'matrix/maxNorm';
import m from 'matrix/m';
import v from 'vector/v';
import unwrap from '_utils/unwrap';
import shape from 'matrix/shape';

const a = m(v(1, 2, 3), v(4, 5, 6));
const e = m();

describe('shape()', () => {
  it('returns the shape of a nonempty matrix', () => {
    const result = pipe(a, E.chain(shape));
    expect(E.isRight(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual([2, 3]);
  });
  it('lefts an empty matrix', () => {
    const result = pipe(e, E.chain(shape));
    expect(E.isLeft(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual(new Error(`Provided matrix is empty!`));
  });
});
