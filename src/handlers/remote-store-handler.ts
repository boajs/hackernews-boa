import { A, O, Handler } from '../boa';
import { extract as pathChanged$ } from '../actions/path-changed';
import { create as state, extract as state$ } from '../actions/state-changed';
import {
  create as commentsFetched
} from '../actions/comments-fetched';
import {
  create as pollOptionsFetched
} from '../actions/poll-options-fetched';
import {
  create as storyItemFetched,
  extract as storyItemFetched$
} from '../actions/story-item-fetched';
import {
  create as topStoriesFetched
} from '../actions/top-stories-fetched';
import {
  create as userFetched
} from '../actions/user-fetched';

import { Item } from '../types/hn';
import { State } from '../types/state';
import { makeStore } from '../store';

const initCommentsFetched: Handler = (
  action$: O<A<any>>, options?: any
): O<A<any>> => {
  const { fetchItems } = options;
  const fetchKids = (item$: O<Item>): O<Item[]> => {
    return item$
      .filter(item => item.kids && item.kids.length > 0)
      .mergeMap(item => {
        const promise: Promise<Item[]> = fetchItems(item.kids);
        return O.fromPromise(promise);
      })
      .share();
  };
  const storyCommentsFetched$ = fetchKids(storyItemFetched$(action$));
  return O
    .merge(
    storyCommentsFetched$,
    fetchKids(storyCommentsFetched$.mergeMap(comments => O.from(comments)))
    )
    .map(commentsFetched)
    .share();
};

const initPollOptionsFetched: Handler = (
  action$: O<A<any>>, options?: any
): O<A<any>> => {
  const { fetchItems } = options;
  return storyItemFetched$(action$)
    .filter(item => !!item.parts && item.parts.length > 0)
    .mergeMap(item => {
      const promise: Promise<Item[]> = fetchItems(item.parts);
      return O.fromPromise(promise);
    })
    .map(pollOptionsFetched)
    .share();
};

const initStoryItemFetched: Handler = (
  action$: O<A<any>>, options?: any
): O<A<any>> => {
  const { fetchItem } = options;
  return pathChanged$(action$)
    .filter(({ route: { name } }) => name === 'item')
    .mergeMap(({ params }) => {
      const promise: Promise<Item> = fetchItem(parseInt(params['id'], 10));
      return O.fromPromise(promise);
    })
    .map(storyItemFetched)
    .share();
};

const initTopStoriesFetched: Handler = (
  action$: O<A<any>>, options?: any
): O<A<any>> => {
  const {
    topStoryIdsUpdated$,
    fetchItems
  }: {
      topStoryIdsUpdated$: O<number[]>;
      fetchItems: (ids: number[]) => Promise<Item[]>;
    } = options;
  return O.merge(
    topStoryIdsUpdated$
      .withLatestFrom(state$(action$), (
        topStoryIds: number[], state: State
      ) => {
        if (state.currentPage !== 'news') return null;
        const { news: { page, storiesPerPage } } = state;
        return { page, storiesPerPage, topStoryIds };
      }),
    pathChanged$(action$)
      .filter(({ route: { name } }) => name === 'news')
      .withLatestFrom(state$(action$), (
        { params: { page } }, state: State
      ) => {
        const { news: { storiesPerPage } } = state;
        return { page, storiesPerPage };
      })
      .withLatestFrom(topStoryIdsUpdated$, (
        { page, storiesPerPage }, topStoryIds: number[]
      ) => {
        return { page, storiesPerPage, topStoryIds };
      })
  )
    .filter(i => !!i)
    .mergeMap(({ page, storiesPerPage, topStoryIds }) => {
      // fetchItemsByPage
      const start = (page - 1) * storiesPerPage;
      const end = page * storiesPerPage;
      const ids = topStoryIds.slice(start, end);
      return O.fromPromise(fetchItems(ids));
    })
    .map(topStoriesFetched)
    .share();
};

const initUserFetched: Handler = (
  action$: O<A<any>>, options?: any
): O<A<any>> => {
  const { fetchUser } = options;
  return pathChanged$(action$)
    .filter(({ route: { name } }) => name === 'user')
    .mergeMap(({ params }) => {
      const userId = params['id'];
      const promise = fetchUser(userId);
      return O.fromPromise(promise);
    })
    .map(userFetched)
    .share();
};

const handler: Handler = (action$: O<A<any>>, options?: any): O<A<any>> => {
  const opts = Object.assign({}, options, makeStore());
  return O.merge(
    initCommentsFetched(action$, opts),
    initPollOptionsFetched(action$, opts),
    initStoryItemFetched(action$, opts),
    initTopStoriesFetched(action$, opts),
    initUserFetched(action$, opts)
  );
};

export { handler };
