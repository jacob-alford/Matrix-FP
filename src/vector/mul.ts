import { Vec } from 'matrix-fp';
import { left, right, Either } from 'fp-ts/lib/Either';
import Vector from 'vector/Vector';

const mul = (a: Vec) => (b: Vec): Either<Error, Vec> =>
  a.length === b.length
    ? right(Vector(a.length).mul(a, b))
    : left(new Error('Vectors are of different lengths!'));

export default mul;
