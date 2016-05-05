import { makeSimpleAction } from '../utils/make-simple-action';
import { Item } from '../types/hn';

const { create, extract } = makeSimpleAction<Item>('story-item-fetched');

export { create, extract };
