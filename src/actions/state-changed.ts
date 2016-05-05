import { makeSimpleAction } from '../utils/make-simple-action';

type State = any; // TODO

const { create, extract } = makeSimpleAction<State>('state-changed');

export { create, extract };
