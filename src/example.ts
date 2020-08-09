import { pipe } from 'fp-ts/lib/function';
import * as IO from 'fp-ts/lib/IOEither';
import * as Console from 'fp-ts/lib/Console';
import * as E from 'fp-ts/lib/Either';
import { sequenceT } from 'fp-ts/lib/Apply';
import * as v from 'vector';
import * as m from 'matrix';

const seq = sequenceT(E.either);

const logAddedValues = pipe(
  seq(
    m.m(v.v(1, 2, 3), v.v(4, 5, 6), v.v(7, 8, 9)),
    m.m(v.v(1, 2, 3), v.v(4, 5, 6), v.v(7, 8, 9))
  ),
  E.chain(([a, b]) => m.add(a)(b)),
  E.fold(Console.error, Console.log)
);

const logAsyncAddedValues = pipe(
  seq(
    m.m(v.v(2, 4, 6), v.v(8, 10, 12), v.v(14, 16, 18)),
    m.m(v.v(2, 4, 6), v.v(8, 10, 12), v.v(14, 16, 18))
  ),
  IO.fromEither,
  IO.chainEitherK(([a, b]) => m.add(a)(b)),
  IO.fold(Console.error, Console.log)
);

logAsyncAddedValues();
logAddedValues();
