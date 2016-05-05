import { makeSimpleAction } from '../utils/make-simple-action';
import { User } from '../types/hn';

const { create, extract } = makeSimpleAction<User>('user-fetched');

export { create, extract };
