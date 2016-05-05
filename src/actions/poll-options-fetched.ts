import { makeSimpleAction } from '../utils/make-simple-action';
import { Item } from '../types/hn';

const { create, extract } = makeSimpleAction<Item[]>('poll-options-fetched');

export { create, extract };
