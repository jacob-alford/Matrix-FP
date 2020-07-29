import { Vec } from 'matrix-fp';
import { Ord } from 'fp-ts/lib/Ord';
import { Group } from 'fp-ts/lib/Group';
import { Field } from 'fp-ts/lib/Field';
import * as ROA from 'fp-ts/lib/ReadonlyArray';
import { pipe } from 'fp-ts/lib/pipeable';
import { flip } from 'fp-ts/lib/function';
import curry2 from '_utils/curry2';

const add = (a: number, b: number) => a + b;
const mul = (a: number, b: number) => a * b;
const sub = (a: number, b: number) => a - b;
const div = (a: number, b: number) => a / b;
const mod = (a: number, b: number) => a % b;

const binOp = (f: (a: number, b: number) => number) => (v1: Vec, v2: Vec) =>
  ROA.mapWithIndex<number, number>((i, v) => f(v, v2[i]))(v1);

const vecLn = (v: Vec): number =>
  pipe(
    v,
    ROA.reduce<number, number>(0, (acc, next) => acc + next ** 2),
    pipe(Math.pow, flip, curry2)(1 / v.length)
  );

const Vector = (n: number): Ord<Vec> & Group<Vec> & Field<Vec> => ({
  /* Eq, Ord */
  equals: (x, y) => x.length === y.length && x.every((v, i) => v === y[i]),
  compare: (x, y) => ((a, b) => (a < b ? -1 : a > b ? 1 : 0))(vecLn(x), vecLn(y)),

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
  degree: x => x.length,
  div: binOp(div),
  mod: binOp(mod)
});

export default Vector;
