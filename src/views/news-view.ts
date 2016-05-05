import { view as itemView } from '../views/item';
import { Item } from '../types/hn';
import { State } from '../types/state';

export type Helpers = any;
export type View = any;

type ViewState = {
  hasMore: boolean;
  hasNav: boolean;
  hasPrev: boolean;
  items: Item[]; // for views/item
  loadingClass: string;
  moreUrl: string;
  page: number;
  prevUrl: string;
};

const viewState = ({ news }: State, helpers: Helpers): ViewState => {
  if (!news) return null;
  return {
    hasMore: news.page < 4,
    hasNav: news.items.length > 0,
    hasPrev: news.page > 1,
    items: news.items,
    loadingClass: (news.items.length === 0 ? '.loading' : ''),
    moreUrl: '#/news/' + (news.page + 1),
    page: news.page,
    prevUrl: '#/news/' + (news.page - 1)
  };
};

const newsNavView = (state: ViewState, helpers: Helpers): View => {
  if (!state.hasNav) return null;
  const { create: h } = helpers;
  return h('div.nav', [
    !state.hasPrev ? null : h('a', { href: state.prevUrl }, ['< prev']),
    !state.hasMore ? null : h('a', { href: state.moreUrl }, ['more...'])
  ]);
};

const render = (state: ViewState, helpers: Helpers): View => {
  if (!state) return null;
  const { create: h } = helpers;
  return h('div.view.news-view' + state.loadingClass,
    state.items.map((item, index) => {
      return itemView({ item, index }, helpers);
    }).concat([newsNavView(state, helpers)])
  );
};

const view: (state: State, helpers: Helpers) => View = (state, helpers) =>
  render(viewState(state, helpers), helpers);

export { view };
