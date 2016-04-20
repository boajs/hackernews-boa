import { News } from '../types/news';
import { State } from '../types/state';

type ViewState = News;

const newsNavMoreView = (page: number, helpers: any): any => {
  const { create: h } = helpers;
  const hasMore = page < 4;
  const more = '#/news/' + (page + 1);
  if (!hasMore) return null;
  return h('a', { href: more }, ['more...']);
};

const newsNavPrevView = (page: number, helpers: any): any => {
  const { create: h } = helpers;
  const hasPrev = page > 1;
  const prev = '#/news/' + (page - 1);
  if (!hasPrev) return null;
  return h('a', { href: prev }, ['< prev']);
};

const newsNavView = (state: ViewState, helpers: any): any => {
  const { create: h } = helpers;
  const hasNav = state.items.length > 0;
  if (!hasNav) return null;
  return h('div.nav', [
    newsNavPrevView(state.page, helpers),
    newsNavMoreView(state.page, helpers)
  ]);
};

const view = (state: State, helpers: any): any => {
  const { create: h } = helpers;
  const { news } = state;
  const loadingClass = news.items.length > 0 ? '.loading' : '';
  return h('div.news-view' + loadingClass, [
    // TODO: item view
    // <item
    //   v-for="item in items"
    //   :item="item"
    //   :index="$index | formatItemIndex"
    //   track-by="id">
    // </item>
    null,
    newsNavView(news, helpers)
  ]);
};

export { view };