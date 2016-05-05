import { makeSimpleAction } from '../utils/make-simple-action';

const { create, extract } = makeSimpleAction<number>('toggle-comment');

export { create, extract };
