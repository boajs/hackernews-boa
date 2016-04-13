import { A, O, Handler } from 'boa-core';

const app: Handler = (action$: O<A<any>>, options?: any): O<A<any>> => {
  return O.of({}).map(data => ({ type: 'render', data }));
};

export { app };
