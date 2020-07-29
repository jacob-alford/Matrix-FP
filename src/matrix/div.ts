import { Mat } from 'matrix-fp';
import { pipe } from 'fp-ts/lib/function';
import E from 'fp-ts/lib/Either';
import Matrix from 'matrix/Matrix';
import sameShape from '_utils/sameShape';

const div = (a: Mat) => (b: Mat): E.Either<Error, Mat> =>
  pipe(
    sameShape(a)(b),
    E.map(shape => Matrix(shape).div(a, b))
  );

export default div;
