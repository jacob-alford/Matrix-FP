import { Mat } from 'matrix-fp';
import * as ROA from 'fp-ts/lib/ReadonlyArray';
import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';

const seq = ROA.sequence(O.option);

/* This is cleaner in Haskell :-( */
/* (everything is cleaner in Haskell, PepeHands) */

const transpose = (a: Mat): Mat =>
  a.length === 0
    ? []
    : pipe(
        ROA.map(ROA.head)(a),
        seq,
        O.fold(
          () => [],
          col1 => [
            col1,
            ...pipe(
              a,
              ROA.map(ROA.tail),
              seq,
              /* This is causing my coverage to drop below 100%
               * But I think because of line 12, this will *never* be called,
               * But is still necessary for proper types.
               * Is because if it reaches the end of a column,
               * a.length will catch the empty array before
               * ROA.map(ROA.tail) will.
               * It's probably because ROA.tail returns [a] as [a] instead of []
               */
              O.fold(() => [], transpose)
            )
          ]
        )
      );

export default transpose;
