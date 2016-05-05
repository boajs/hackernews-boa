import { view as itemView } from '../views/item-view';
import { view as newsView } from '../views/news-view';
import { view as userView } from '../views/user-view';
import { State } from '../types/state';


type ViewState = {
  currentPage: string;
  state: State;
};

const viewState = (state: State, helpers: any): ViewState => {
  if (!state) return null;
  return {
    currentPage: state.currentPage,
    state
  };
};

const headerView = (_: ViewState, helpers: any): any => {
  const { create: h } = helpers;
  return h('div#header', [
    h('a#yc', { href: 'http://www.ycombinator.com' }, [
      h('img', { src: 'https://news.ycombinator.com/y18.gif' })
    ]),
    ' ',
    h('h1', [
      h('a', { href: '#/' }, ['Hacker News'])
    ]),
    h('span.source', [
      'Built with ',
      h('a', { href: 'https://github.com/bouzuya/b-o-a' }, [
        'b-o-a'
      ]),
      ' | ',
      h('a', {
        href: 'https://github.com/boajs/hackernews-boa',
        target: '_blank'
      }, [
          'Source'
        ])
    ])
  ]);
};

const mainView = (state: ViewState, helpers: any): any => {
  const views = {
    item: itemView,
    news: newsView,
    user: userView
  };
  const view = views[state.currentPage];
  if (!view) return null;
  return view(state.state, helpers);
  // TODO
  // <router-view
  //   class="view"
  //   keep-alive
  //   transition
  //   transition-mode="out-in">
  // </router-view>
};

const render = (state: ViewState, helpers: any): any => {
  if (!state) return null;
  const { create: h } = helpers;
  return h('div#app', [
    h('div#wrapper', [
      headerView(state, helpers),
      mainView(state, helpers)
    ])
  ]);
};

const view = (state: any, helpers: any): any => {
  return render(viewState(state, helpers), helpers);
};

export { view };
