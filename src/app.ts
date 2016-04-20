import { A, O, Handler } from 'boa-core';

const app: Handler = (action$: O<A<any>>, options?: any): O<A<any>> => {
  const initialState = {
    currentPage: 'news',
    news: {
      page: 1,
      items: []
    }
  };
  return O.of(initialState).map(data => ({ type: 'render', data }));
};

export { app };
