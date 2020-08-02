import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { sequenceT } from 'fp-ts/lib/Apply';
import Matrix from 'matrix/Matrix';
import unwrap from '_utils/unwrap';
import m from 'matrix/m';
import v from 'vector/v';

const seq = sequenceT(E.either);

const a = m(v(1, 2, 3), v(1, 2, 3));
const b = m(v(1, 2, 3), v(4, 5, 6));

describe('Matrix', () => {
  it('computes equality', () => {
    const result = pipe(
      seq(a, a),
      E.map(([a1, a2]) => Matrix([2, 3]).equals(a1, a2))
    );
    expect(unwrap(result)).toBe(true);
  });
  it('orders LT', () => {
    const result = pipe(
      seq(a, b),
      E.map(([a, b]) => Matrix([2, 3]).compare(a, b))
    );
    expect(unwrap(result)).toBe(-1);
  });
  it('orders GT', () => {
    const result = pipe(
      seq(a, b),
      E.map(([a, b]) => Matrix([2, 3]).compare(b, a))
    );
    expect(unwrap(result)).toBe(1);
  });
  it('orders EQ', () => {
    const result = pipe(
      seq(a, b),
      E.map(([a, b]) => Matrix([2, 3]).compare(b, b))
    );
    expect(unwrap(result)).toBe(0);
  });
  it('concats', () => {
    const result = pipe(
      seq(a, b),
      E.map(([a, b]) => Matrix([2, 3]).concat(a, b))
    );
    expect(unwrap(result)).toStrictEqual([
      [2, 4, 6],
      [5, 7, 9]
    ]);
  });
  it('abides monoid empty', () => {
    const result = pipe(
      seq(a, E.right(Matrix([2, 3]).empty)),
      E.map(([a, e]) => Matrix([2, 3]).concat(a, e))
    );
    expect(result).toStrictEqual(a);
  });
  it('abides monoid inverse', () => {
    const result = pipe(
      a,
      E.map(a => [a, Matrix([2, 3]).inverse(a)]),
      E.map(([a, ai]) => Matrix([2, 3]).concat(a, ai))
    );
    expect(unwrap(result)).toStrictEqual(Matrix([2, 3]).empty);
  });
  it('adds', () => {
    const result = pipe(
      seq(a, b),
      E.map(([a, b]) => Matrix([2, 3]).add(a, b))
    );
    expect(unwrap(result)).toStrictEqual([
      [2, 4, 6],
      [5, 7, 9]
    ]);
  });
  it('adds zero', () => {
    const result = pipe(
      a,
      E.map(a => [a, Matrix([2, 3]).zero]),
      E.map(([a, z]) => Matrix([2, 3]).add(a, z))
    );
    expect(result).toStrictEqual(a);
  });
  it('muls', () => {
    const result = pipe(
      seq(a, b),
      E.map(([a, b]) => Matrix([2, 3]).mul(a, b))
    );
    expect(unwrap(result)).toStrictEqual([
      [1, 4, 9],
      [4, 10, 18]
    ]);
  });
  it('muls by one', () => {
    const result = pipe(
      a,
      E.map(a => [a, Matrix([2, 3]).one]),
      E.map(([a, o]) => Matrix([2, 3]).mul(a, o))
    );
    expect(result).toStrictEqual(a);
  });
  it('subs', () => {
    const result = pipe(
      seq(a, b),
      E.map(([a, b]) => Matrix([2, 3]).sub(a, b))
    );
    expect(unwrap(result)).toStrictEqual([
      [0, 0, 0],
      [-3, -3, -3]
    ]);
  });
  it('uses maxNorm for degree', () => {
    const result = pipe(a, E.map(Matrix([2, 3]).degree));
    expect(unwrap(result)).toBe(3);
  });
  it('divs', () => {
    const result = pipe(
      seq(a, b),
      E.map(([a, b]) => Matrix([2, 3]).div(a, b))
    );
    expect(unwrap(result)).toStrictEqual([
      [1, 1, 1],
      [1 / 4, 2 / 5, 1 / 2]
    ]);
  });
  it('mods', () => {
    const result = pipe(
      seq(a, b),
      E.map(([a, b]) => Matrix([2, 3]).mod(a, b))
    );
    expect(unwrap(result)).toStrictEqual([
      [0, 0, 0],
      [1, 2, 3]
    ]);
  });
});
