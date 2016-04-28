import { makeSimpleAction } from '../make-simple-action';

const { create, extract } = makeSimpleAction<string>('go-to');

export { create, extract };
