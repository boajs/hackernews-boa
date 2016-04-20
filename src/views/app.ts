import { State } from '../types/state';
import { view as newsView } from '../views/news-view';

const headerView = (_: State, helpers: any): any => {
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

const mainView = (state: State, helpers: any): any => {
  const views = {
    news: newsView
  };
  const view = views[state.currentPage];
  if (!view) return null;
  return view(state, helpers);
  // TODO
  // <router-view
  //   class="view"
  //   keep-alive
  //   transition
  //   transition-mode="out-in">
  // </router-view>
};

const view = (state: State, helpers: any): any => {
  const { create: h } = helpers;
  return h('div#app', [
    h('div#wrapper', [
      headerView(state, helpers),
      mainView(state, helpers)
    ])
  ]);
};

export { view };
