import { Either, right, left } from 'fp-ts/lib/Either';
import ROA from 'fp-ts/lib/ReadonlyArray';
import { Vec, Mat } from 'matrix-fp';

const uniformShape = (a: Mat): boolean =>
  a.every(rowi => a.every(rowj => rowi.length === rowj.length));

const m = (a: Vec[]): Either<Error, Mat> =>
  uniformShape(a)
    ? right(ROA.fromArray(a))
    : left(new Error('Provided matrix shape not uniform!'));

export default m;
