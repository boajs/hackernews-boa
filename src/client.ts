import { A, O, run } from 'boa-core';
import { app } from './app';

const main = (): void => {
  run((action$: O<A<any>>): O<A<any>> => {
    return app(action$);
  });
};

main();
