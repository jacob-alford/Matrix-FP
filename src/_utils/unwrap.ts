import { fold } from 'fp-ts/lib/Either';
import { identity } from 'fp-ts/lib/function';

const unwrap = fold(identity, identity);

export default unwrap;
