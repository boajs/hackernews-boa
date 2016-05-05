import { makeSimpleAction } from '../utils/make-simple-action';
import { Item } from '../types/hn';

const { create, extract } = makeSimpleAction<Item[]>('comments-fetched');

export { create, extract };
