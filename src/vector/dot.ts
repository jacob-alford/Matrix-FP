import { Vec } from 'matrix-fp';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/lib/Either';
import * as ROA from 'fp-ts/lib/ReadonlyArray';
import Vector from 'vector/Vector';

const dot = (a: Vec) => (b: Vec): E.Either<Error, number> =>
  pipe(
    a.length === b.length
      ? E.right(Vector(a.length).mul(a, b))
      : E.left(new Error('Vectors are of different lengths!')),
    E.map(ROA.reduce(0, (a, n) => a + n))
  );

export default dot;
