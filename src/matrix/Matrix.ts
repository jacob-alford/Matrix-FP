import { Vec, Mat, Shape } from 'matrix-fp';
import Vector from 'vector/Vector';
import * as O from 'fp-ts/lib/Ord';
import { Group } from 'fp-ts/lib/Group';
import { Field } from 'fp-ts/lib/Field';
import * as ROA from 'fp-ts/lib/ReadonlyArray';
import maxNorm from 'matrix/maxNorm';

const lift = (f: (a: Vec, b: Vec) => Vec) => (a: Mat, b: Mat): Mat =>
  ROA.mapWithIndex<Vec, Vec>((i, v) => f(v, b[i]))(a);

const Matrix = ([rows, columns]: Shape): O.Ord<Mat> & Group<Mat> & Field<Mat> => ({
  /* Eq, Ord */
  equals: (a, b) =>
    a.length === b.length && a.every((v, i) => Vector(columns).equals(v, b[i])),
  compare: (a, b) => ((a, b) => (a < b ? -1 : a > b ? 0 : 1))(maxNorm(a), maxNorm(b)),

  /* Magma, Semigroup, Monoid, Group */
  concat: lift(Vector(columns).concat),
  empty: ROA.replicate(rows, Vector(columns).empty),
  inverse: ROA.map(Vector(columns).inverse),

  /* Semiring, Ring, Field */
  add: lift(Vector(columns).add),
  zero: ROA.replicate(rows, Vector(columns).zero),
  mul: lift(Vector(columns).mul),
  one: ROA.replicate(rows, Vector(columns).one),
  sub: lift(Vector(columns).sub),
  degree: maxNorm,
  div: lift(Vector(columns).div),
  mod: lift(Vector(columns).mod)
});

export default Matrix;
