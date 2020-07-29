import { Either, either, map, chain, left, right } from 'fp-ts/lib/Either';
import { eqNumber } from 'fp-ts/lib/Eq';
import { getEq } from 'fp-ts/lib/Array';
import { Mat, Shape } from 'matrix-fp';
import { sequenceT } from 'fp-ts/lib/Apply';
import { pipe } from 'fp-ts/lib/function';
import shape from 'matrix/shape';

const arrayEq = getEq(eqNumber);

const sameShape = (a: Mat) => (b: Mat): Either<Error, Shape> =>
  pipe(
    sequenceT(either)(shape(a), shape(b)),
    map(([shA, shB]) => arrayEq.equals(shA, shB) && shA),
    chain(shape =>
      shape ? right(shape) : left(new Error('Matrix shapes are not uniform!'))
    )
  );

export default sameShape;
