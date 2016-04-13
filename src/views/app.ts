import { State } from '../types/state';

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
  // TODO
  // <router-view
  //   class="view"
  //   keep-alive
  //   transition
  //   transition-mode="out-in">
  // </router-view>
  return null;
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
