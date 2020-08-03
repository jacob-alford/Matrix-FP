import { Mat, Vec } from 'matrix-fp';
import * as ROA from 'fp-ts/lib/ReadonlyArray';
import { sequenceT } from 'fp-ts/lib/Apply';
import { pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/lib/Either';
import dot from 'vector/dot';
import shape from 'matrix/shape';
import transpose from 'matrix/transpose';

const seq = ROA.sequence(E.either);
const seqT = sequenceT(E.either);

const matMul = (a: Mat) => (b: Mat): E.Either<Error, Mat> =>
  pipe(
    seqT(shape(a), shape(b)),
    E.chain(([[ai, aj], [bi, bj]]) =>
      aj === bi
        ? E.right([a, transpose(b)])
        : E.left(
            new Error(
              `Matricies don't match in inner dimensions!  Recieved, a: [${ai},${aj}]; b: [${bi},${bj}]`
            )
          )
    ),
    E.map(([a, bt]) => ROA.map((ra: Vec) => ROA.map((cb: Vec) => dot(ra)(cb))(bt))(a)),
    E.map(ROA.map(seq)),
    E.chain(seq)
  );

export default matMul;
