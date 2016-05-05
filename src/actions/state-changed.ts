import { makeSimpleAction } from '../utils/make-simple-action';
import { State } from '../types/state';

const { create, extract } = makeSimpleAction<State>('state-changed');

export { create, extract };
