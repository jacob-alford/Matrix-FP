import * as E from 'fp-ts/lib/Either';
import { sequenceT } from 'fp-ts/lib/Apply';
import { pipe } from 'fp-ts/lib/function';
import maxNorm from 'matrix/maxNorm';
import m from 'matrix/m';
import v from 'vector/v';
import unwrap from '_utils/unwrap';
import transpose from 'matrix/transpose';

const a = m(v(1, 2, 3), v(4, 5, 6), v(7, 8, 9));

test('maxNorm()', () => {
  const result = pipe(a, E.map(maxNorm));
  expect(E.isRight(result)).toBe(true);
  expect(unwrap(result)).toStrictEqual(9);
});

describe('transpose()', () => {
  it('transposes 3x3', () => {
    const result = pipe(a, E.map(transpose));
    expect(unwrap(result)).toStrictEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ]);
  });
  it('transposes 1x4', () => {
    const result = pipe(m(v(1, 2, 3, 4)), E.map(transpose));
    expect(unwrap(result)).toStrictEqual([[1], [2], [3], [4]]);
  });
  it('transposes 4x1', () => {
    const result = pipe(m(v(1), v(2), v(3), v(4)), E.map(transpose));
    expect(unwrap(result)).toStrictEqual([[1, 2, 3, 4]]);
  });
  it('transposes 1x1', () => {
    const result = pipe(m(v(1)), E.map(transpose));
    expect(unwrap(result)).toStrictEqual([[1]]);
  });
  it('transposes 1x0', () => {
    const result = pipe(m(v()), E.map(transpose));
    expect(unwrap(result)).toStrictEqual([]);
  });
  it('transposes 0x0', () => {
    expect(transpose([])).toStrictEqual([]);
  });
});
