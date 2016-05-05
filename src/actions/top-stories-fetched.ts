import { makeSimpleAction } from '../utils/make-simple-action';

type TopStory = any; // TODO

const { create, extract } = makeSimpleAction<TopStory[]>('top-stories-fetched');

export { create, extract };
