
import { makeSimpleAction } from '../utils/make-simple-action';
import { State } from '../types/state';

const { create } = makeSimpleAction<State>('render');

export { create };
