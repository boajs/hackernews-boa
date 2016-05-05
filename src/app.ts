import { A, O, Handler } from './boa';
import { handler as localStoreHandler } from './handlers/local-store-handler';
import { handler as remoteStoreHandler } from './handlers/remote-store-handler';
import { handler as renderHandler } from './handlers/render-handler';

const app: Handler = (action$: O<A<any>>, options?: any): O<A<any>> => {
  return O.merge(
    localStoreHandler(action$, options),
    remoteStoreHandler(action$, options),
    renderHandler(action$, options)
  );
};

export { app };
