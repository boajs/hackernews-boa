import { A, O, run } from './boa';
import { init as dom } from 'boa-handler-dom';
import { init as history } from 'boa-handler-history';
import { app } from './app';
import { view } from './views/app';

const main = (): void => {
  run((action$: O<A<any>>, options?: any): O<A<any>> => {
    const logged$ = action$.do(console.log.bind(console)).share();
    return O.merge(
      app(logged$),
      dom({
        root: 'div#app',
        render: view,
        renderActionType: 'render'
      }).handler(logged$, options),
      history({
        goToActionType: 'go-to',
        historyType: 'hash', // use hashchanged
        routes: [
          { name: 'news', path: '/news/:page' },
          { name: 'user', path: '/user/:id' },
          { name: 'item', path: '/item/:id' },
          { name: 'news', path: '*' }
        ],
        routeActionType: 'path-changed'
      }).handler(logged$, options)
    );
  });
};

main();
