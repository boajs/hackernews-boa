import { view as itemView } from '../views/item';
import { State } from '../types/state';


type ViewState = {
  hasMore: boolean;
  hasNav: boolean;
  hasPrev: boolean;
  items: any[];
  loadingClass: string;
  moreUrl: string;
  page: number;
  prevUrl: string;
};

const viewState = ({ news }: State, helpers: any): ViewState => {
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

const newsNavView = (state: ViewState, helpers: any): any => {
  if (!state.hasNav) return null;
  const { create: h } = helpers;
  return h('div.nav', [
    !state.hasPrev ? null : h('a', { href: state.prevUrl }, ['< prev']),
    !state.hasMore ? null : h('a', { href: state.moreUrl }, ['more...'])
  ]);
};

const render = (state: ViewState, helpers: any): any => {
  if (!state) return null;
  const { create: h } = helpers;
  return h('div.view.news-view' + state.loadingClass,
    state.items.map((item, index) => {
      return itemView({ item, index }, helpers);
    }).concat([newsNavView(state, helpers)])
  );
};

const view = (state: State, helpers: any): any => {
  return render(viewState(state, helpers), helpers);
};

export { view };
