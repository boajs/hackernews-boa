import { makeSimpleAction } from '../utils/make-simple-action';

const { create, extract } = makeSimpleAction<string>('go-to');

export { create, extract };
