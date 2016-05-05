import { A, O, Handler } from '../boa';
import { extract as pathChanged$ } from '../actions/path-changed';
import { extract as commentsFetched$ } from '../actions/comments-fetched';
import {
  extract as pollOptionsFetched$
} from '../actions/poll-options-fetched';
import { extract as storyItemFetched$ } from '../actions/story-item-fetched';
import { extract as topStoriesFetched$ } from '../actions/top-stories-fetched';
import { extract as userFetched$ } from '../actions/user-fetched';
import { create as state } from '../actions/state-changed';
import { Item } from '../types/hn';
import { State } from '../types/state';

const handler: Handler = (
  action$: O<A<any>>,
  options?: any
): O<A<State>> => {
  const initialState: State = {
    currentPage: 'news',
    news: {
      page: 1,
      storiesPerPage: 30,
      items: []
    },
    comments: {},
    pollOptions: {}
  };
  const currentPageUpdate$ = pathChanged$(action$)
    .map(({ route: { name }, params }) => (state: State): State => {
      return Object.assign({}, state, { currentPage: name });
    });
  const commentsUpdate$ = commentsFetched$(action$)
    .map(fetchedComments => (state: State): State => {
      const { comments } = state;
      const fetchedCommentsObj = fetchedComments.reduce((comments, comment) => {
        comments[comment.id] = comment;
        return comments;
      }, <{ [id: number]: Item; }>{});
      const newComments = Object.assign({}, comments, fetchedCommentsObj);
      return Object.assign({}, state, { comments: newComments });
    });
  const itemUpdate$ = storyItemFetched$(action$)
    .map(item => (state: State): State => {
      return Object.assign({}, state, { item });
    });
  const newsUpdate$ = topStoriesFetched$(action$)
    .map(items => (state: State): State => {
      const { news } = state;
      const newNews = Object.assign({}, news, { items });
      return Object.assign({}, state, { news: newNews });
    });
  const newsPageUpdate$ = pathChanged$(action$)
    .map(({ params: { page } }) => (state: State): State => {
      const { news } = state;
      const pageString = typeof page === 'undefined' ? '1' : page;
      const pageNumber = parseInt(pageString, 10);
      const newNews = Object.assign({}, news, { page: pageNumber });
      return Object.assign({}, state, { news: newNews });
    });
  const pollOptionsUpdate$ = pollOptionsFetched$(action$)
    .map(fetched => (state: State): State => {
      const { pollOptions } = state;
      const fetchedObj = fetched.reduce((polls, poll) => {
        polls[poll.id] = poll;
        return polls;
      }, <{ [id: number]: Item; }>{});
      const newPollOptions = Object.assign({}, pollOptions, fetchedObj);
      return Object.assign({}, state, { pollOptions: newPollOptions });
    });
  const userUpdate$ = userFetched$(action$)
    .map(user => (state: State): State => {
      return Object.assign({}, state, { user });
    });
  return O
    .of(initialState)
    .merge(
    commentsUpdate$,
    currentPageUpdate$,
    itemUpdate$,
    newsPageUpdate$,
    newsUpdate$,
    pollOptionsUpdate$,
    userUpdate$
    )
    .scan((state: State, update: (state: State) => State) => update(state))
    .map(state)
    .share();
};

export { handler };
