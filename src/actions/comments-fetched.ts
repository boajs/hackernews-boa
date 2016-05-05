import { makeSimpleAction } from '../utils/make-simple-action';

type Comment = any; // TODO

const { create, extract } = makeSimpleAction<Comment[]>('comments-fetched');

export { create, extract };
