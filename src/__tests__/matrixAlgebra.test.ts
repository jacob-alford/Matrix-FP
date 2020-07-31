import * as E from 'fp-ts/lib/Either';
import { sequenceT } from 'fp-ts/lib/Apply';
import { pipe } from 'fp-ts/lib/function';
import maxNorm from 'matrix/maxNorm';
import m from 'matrix/m';
import v from 'vector/v';
import unwrap from '_utils/unwrap';

const a = m(v(1, 2, 3), v(4, 5, 6), v(7, 8, 9));

test('maxNorm()', () => {
  const result = pipe(a, E.map(maxNorm));
  expect(E.isRight(result)).toBe(true);
  expect(unwrap(result)).toStrictEqual(9);
});
