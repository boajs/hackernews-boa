import { makeSimpleAction } from '../utils/make-simple-action';

type User = any; // TODO

const { create, extract } = makeSimpleAction<User[]>('user-fetched');

export { create, extract };
