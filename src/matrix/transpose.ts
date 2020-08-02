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
              O.fold(() => [], transpose)
            )
          ]
        )
      );

export default transpose;
