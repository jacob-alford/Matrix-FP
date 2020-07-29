import { Mat } from 'matrix-fp';
import { flow } from 'fp-ts/lib/function';
import ROA from 'fp-ts/lib/ReadonlyArray';

const maxNorm: (m: Mat) => number = flow(
  ROA.flatten,
  ROA.reduce(-Infinity, (acc, next) => Math.max(acc, Math.abs(next)))
);

export default maxNorm;
