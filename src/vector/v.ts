import * as ROA from 'fp-ts/lib/ReadonlyArray';
import { Vec } from 'matrix-fp';

const v = (...a: number[]): Vec => ROA.fromArray(a);

export default v;
