import { makeSimpleAction } from '../utils/make-simple-action';

type StoryItem = any; // TODO

const { create, extract } = makeSimpleAction<StoryItem>('story-item-fetched');

export { create, extract };
