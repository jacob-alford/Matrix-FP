import { Ord } from 'fp-ts/lib/Ord';
import { Group } from 'fp-ts/lib/Group';
import { Field } from 'fp-ts/lib/Field';
import * as ROA from 'fp-ts/lib/ReadonlyArray';
import { pipe } from 'fp-ts/lib/pipeable';
import { flip } from 'fp-ts/lib/function';
import { curry2 } from 'utils/curry';
import { add, sub, mul, div, mod } from 'utils/binOps';

type Vec = readonly number[];

export const v: (a: number[]) => Vec = ROA.fromArray;
const binOp = (f: (a: number, b: number) => number) => (v1: Vec, v2: Vec) =>
  ROA.mapWithIndex<number, number>((i, v) => f(v, v2[i]))(v1);

const vecLn = (v: Vec): number =>
  pipe(
    v,
    ROA.reduce<number, number>(0, (acc, next) => acc + next ** 2),
    pipe(Math.pow, flip, curry2)(1 / v.length)
  );

export const Vector = (n: number): Ord<Vec> & Group<Vec> & Field<Vec> => ({
  /* Eq, Ord */
  equals: (v1, v2) => v1.length === v2.length && v1.every((v, i) => v === v2[i]),
  compare: (v1, v2) => ((a, b) => (a < b ? -1 : a > b ? 1 : 0))(vecLn(v1), vecLn(v2)),

  /* Magma, Semigroup, Monoid, Group */
  concat: binOp(add),
  empty: ROA.replicate(n, 0),
  inverse: ROA.map(vi => -1 * vi),

  /* Semiring, Ring, Field */
  add: binOp(add),
  zero: ROA.replicate(n, 0),
  mul: binOp(mul),
  one: ROA.replicate(n, 1),
  sub: binOp(sub),
  degree: vecLn,
  div: binOp(div),
  mod: binOp(mod)
});
