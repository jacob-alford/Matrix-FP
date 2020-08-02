import * as E from 'fp-ts/lib/Either';
import v from 'vector/v';
import unwrap from '_utils/unwrap';
import add from 'vector/add';
import sub from 'vector/sub';
import mul from 'vector/mul';
import div from 'vector/div';
import dot from 'vector/dot';

const a = v(1, 2, 3);
const b = v(2, 4, 6);
const c = v(8, 9, 10, 12);

describe('vector arithmetic', () => {
  it('adds right', () => {
    const result = add(a)(b);
    expect(E.isRight(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual([3, 6, 9]);
  });
  it('adds left', () => {
    const result = add(a)(c);
    expect(E.isLeft(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual(new Error('Vectors are of different lengths!'));
  });
  it('subs right', () => {
    const result = sub(a)(b);
    expect(E.isRight(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual([-1, -2, -3]);
  });
  it('subs left', () => {
    const result = sub(a)(c);
    expect(E.isLeft(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual(new Error('Vectors are of different lengths!'));
  });
  it('muls right', () => {
    const result = mul(a)(b);
    expect(E.isRight(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual([2, 8, 18]);
  });
  it('muls left', () => {
    const result = mul(a)(c);
    expect(E.isLeft(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual(new Error('Vectors are of different lengths!'));
  });
  it('divs right', () => {
    const result = div(a)(b);
    expect(E.isRight(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual([1 / 2, 1 / 2, 1 / 2]);
  });
  it('divs left', () => {
    const result = div(a)(c);
    expect(E.isLeft(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual(new Error('Vectors are of different lengths!'));
  });
  it('dots right', () => {
    const result = dot(a)(b);
    expect(E.isRight(result)).toBe(true);
    expect(unwrap(result)).toBe(28);
  });
  it('dots left', () => {
    const result = dot(a)(c);
    expect(E.isLeft(result)).toBe(true);
    expect(unwrap(result)).toStrictEqual(new Error('Vectors are of different lengths!'));
  });
});
