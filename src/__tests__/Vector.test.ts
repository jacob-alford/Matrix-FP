import * as E from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { sequenceT } from 'fp-ts/lib/Apply';
import Vector from 'vector/Vector';
import unwrap from '_utils/unwrap';
import v from 'vector/v';

const seq = sequenceT(E.either);

const a = v(1, 2, 3);
const b = v(5, 6, 7);

describe('Matrix', () => {
  it('computes equality', () => {
    expect(Vector(3).equals(a, a)).toBe(true);
  });
  it('orders LT', () => {
    expect(Vector(3).compare(a, b)).toBe(-1);
  });
  it('orders GT', () => {
    expect(Vector(3).compare(b, a)).toBe(1);
  });
  it('orders EQ', () => {
    expect(Vector(3).compare(a, a)).toBe(0);
  });
  it('concats', () => {
    expect(Vector(3).concat(a, b)).toStrictEqual(v(6, 8, 10));
  });
  it('abides monoid empty', () => {
    expect(Vector(3).concat(a, Vector(3).empty)).toStrictEqual(a);
  });
  it('abides monoid inverse', () => {
    expect(Vector(3).concat(a, Vector(3).inverse(a))).toStrictEqual(Vector(3).empty);
  });
  it('adds', () => {
    expect(Vector(3).add(a, b)).toStrictEqual(v(6, 8, 10));
  });
  it('adds zero', () => {
    expect(Vector(3).add(a, Vector(3).zero)).toStrictEqual(a);
  });
  it('muls', () => {
    expect(Vector(3).mul(a, b)).toStrictEqual(v(5, 12, 21));
  });
  it('muls by one', () => {
    expect(Vector(3).mul(a, Vector(3).one)).toStrictEqual(a);
  });
  it('subs', () => {
    expect(Vector(3).sub(a, b)).toStrictEqual(v(-4, -4, -4));
  });
  it('uses length for degree', () => {
    expect(Vector(3).degree(a)).toBe(3);
  });
  it('divs', () => {
    expect(Vector(3).div(a, b)).toStrictEqual(v(1 / 5, 1 / 3, 3 / 7));
  });
  it('mods', () => {
    expect(Vector(3).mod(a, b)).toStrictEqual(v(1, 2, 3));
  });
});
