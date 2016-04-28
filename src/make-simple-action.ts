import { A, O } from './boa';

export interface Create<T> {
  (data: T): A<T>;
}

export interface Extract<T> {
  (action$: O<A<any>>): O<T>;
}

const makeSimpleAction = <T>(type: string): {
  create: Create<T>;
  extract: Extract<T>;
} => {
  const create = (data: T): A<T> => ({ data, type });

  const extract = (action$: O<A<any>>): O<T> => {
    return action$
      .filter(action => action.type === type)
      .map(({ data }) => data);
  };

  return { create, extract };
};

export { makeSimpleAction };
