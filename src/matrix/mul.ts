import { Mat } from 'matrix-fp';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/lib/Either';
import Matrix from 'matrix/Matrix';
import sameShape from '_utils/sameShape';

const mul = (a: Mat) => (b: Mat): E.Either<Error, Mat> =>
  pipe(
    sameShape(a)(b),
    E.map(shape => Matrix(shape).mul(a, b))
  );

export default mul;
