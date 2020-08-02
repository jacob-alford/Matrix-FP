import * as E from 'fp-ts/lib/Either';
import { sequenceT } from 'fp-ts/lib/Apply';
import { pipe } from 'fp-ts/lib/function';
import maxNorm from 'matrix/maxNorm';
import m from 'matrix/m';
import v from 'vector/v';
import unwrap from '_utils/unwrap';
import sameShape from '_utils/sameShape';

const seq = sequenceT(E.either);

const a = m(v(1, 2, 3), v(4, 5, 6));
const b = m(v(9, 8, 7), v(6, 5, 4));
const c = m(v(1, 2), v(9, 8));

describe('sameShape()', () => {
  it('validates same shapes', () => {
    const result = pipe(
      seq(a, b),
      E.chain(([a, b]) => sameShape(a)(b))
    );
    expect(E.isRight(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual([2, 3]);
  });
  it('invalides different shapes', () => {
    const result = pipe(
      seq(a, c),
      E.chain(([a, c]) => sameShape(a)(c))
    );
    expect(E.isLeft(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual(new Error(`Matrix shapes are not uniform!`));
  });
});
