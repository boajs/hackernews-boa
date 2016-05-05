import { domain, pluralize, fromNow } from '../views/helpers';
import { Item } from '../types/hn';

export type State = {
  item: Item;
  index?: number;
};
export type Helpers = any;
export type View = any;

type ViewState = {
  by: string;
  byUrl: string;
  comments: string;
  commentsUrl: string;
  domain: string;
  hasDomain: boolean;
  hasIndex: boolean;
  index: string;
  score: string;
  showInfo: boolean;
  time: string;
  title: string;
  url: string;
};

const viewState = ({ item, index }: State, _: Helpers): ViewState => {
  if (!item) return null;
  return {
    by: item.by,
    byUrl: '#/user/' + item.by,
    comments: pluralize(item.descendants, ' comment'),
    commentsUrl: '#/item/' + item.id,
    domain: item.type === 'story' && item.url ? domain(item.url) : null,
    hasDomain: item.type === 'story' && !!item.url,
    hasIndex: typeof index !== 'undefined',
    index: index + '.',
    score: item.score + ' points',
    showInfo: item.type === 'story' || item.type === 'poll',
    time: fromNow(item.time) + ' ago',
    title: item.title,
    url: item.url || ('#/item/' + item.id)
  };
};

const render = (state: ViewState, helpers: Helpers): View => {
  if (!state) return null;
  const { create: h } = helpers;
  return h('div.item', [
    !state.hasIndex ? null : h('span.index', [state.index]),
    h('p', [
      h('a.title', { href: state.url, target: '_blank' }, [state.title]), ' ',
      state.hasDomain ? h('span.domain', ['(' + state.domain + ')']) : null
    ]),
    h('p.subtext', [
      !state.showInfo ? null : h('span', [
        state.score, ' by ', h('a', { href: state.byUrl }, [state.by]), ' '
      ]),
      state.time,
      !state.showInfo ? null : h('span.comments-link', [
        ' | ',
        h('a', { href: state.commentsUrl }, [state.comments])
      ])
    ])
  ]);
};

const view: (state: State, helpers: Helpers) => View = (state, helpers) =>
  render(viewState(state, helpers), helpers);

export { view };
