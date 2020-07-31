import * as E from 'fp-ts/lib/Either';
import { sequenceT } from 'fp-ts/lib/Apply';
import { pipe } from 'fp-ts/lib/function';
import m from 'matrix/m';
import v from 'vector/v';
import unwrap from '_utils/unwrap';
import add from 'matrix/add';
import sub from 'matrix/sub';
import mul from 'matrix/mul';
import div from 'matrix/div';

const a = m(v(1, 2, 3), v(4, 5, 6), v(7, 8, 9));
const b = m(v(1, 2, 3), v(4, 5, 6), v(7, 8, 9));

describe('matrix arithmetic', () => {
  it('adds', () => {
    const result = pipe(
      sequenceT(E.either)(a, b),
      E.chain(([a, b]) => add(a)(b))
    );
    expect(E.isRight(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual([
      [2, 4, 6],
      [8, 10, 12],
      [14, 16, 18]
    ]);
  });
  it('subtracts', () => {
    const result = pipe(
      sequenceT(E.either)(a, b),
      E.chain(([a, b]) => sub(a)(b))
    );
    expect(E.isRight(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  });
  it('multiplies', () => {
    const result = pipe(
      sequenceT(E.either)(a, b),
      E.chain(([a, b]) => mul(a)(b))
    );
    expect(E.isRight(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual([
      [1, 4, 9],
      [16, 25, 36],
      [49, 64, 81]
    ]);
  });
  it('divides', () => {
    const result = pipe(
      sequenceT(E.either)(a, b),
      E.chain(([a, b]) => div(a)(b))
    );
    expect(E.isRight(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual([
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1]
    ]);
  });
});
