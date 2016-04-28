import { A, O, run } from './boa';
import { init as dom } from 'boa-handler-dom';
import { app } from './app';
import { view } from './views/app';

const main = (): void => {
  run((action$: O<A<any>>, options?: any): O<A<any>> => {
    return O.merge(
      app(action$),
      dom({
        root: 'div#app',
        render: view,
        renderActionType: 'render'
      }).handler(action$, options)
    );
  });
};

main();
