import ROA from 'fp-ts/lib/ReadonlyArray';
import { Vec } from 'matrix-fp';

const v: (a: number[]) => Vec = ROA.fromArray;

export default v;
