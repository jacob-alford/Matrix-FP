import { Mat, Shape } from 'matrix-fp';
import { pipe } from 'fp-ts/lib/pipeable';
import { Either, fromOption, map } from 'fp-ts/lib/Either';
import { head } from 'fp-ts/lib/ReadonlyArray';

const shape = (a: Mat): Either<Error, Shape> =>
  pipe(
    head(a),
    fromOption(() => new Error('Provided matrix is empty!')),
    map(vec => [a.length, vec.length])
  );

export default shape;
