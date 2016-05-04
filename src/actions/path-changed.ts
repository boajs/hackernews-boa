import { makeSimpleAction } from '../utils/make-simple-action';

type Route = {
  path: string;
  [x: string]: any;
};

type MatchedRoute = {
  route: Route;
  params: {
    [name: string]: string;
  }
};

const { extract } = makeSimpleAction<MatchedRoute>('path-changed');

export { extract };
