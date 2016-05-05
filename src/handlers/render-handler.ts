import { A, O, Handler } from '../boa';
import { extract as state$ } from '../actions/state-changed';
import { create as render } from '../actions/render';

const handler: Handler = (action$: O<A<any>>, options?: any): O<A<any>> => {
  return state$(action$).map(render);
};

export { handler };
