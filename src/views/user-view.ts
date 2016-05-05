import { fromNow } from '../views/helpers';
import { State } from '../types/state';

export type Helpers = any;
export type View = any;

type ViewState = {
  id: string;
  created: string;
  karma: string;
  about: string;
  submissionsUrl: string;
  commentsUrl: string;
};

const viewState = ({ user }: State, _: Helpers): ViewState => {
  if (!user) return null;
  return {
    id: user.id,
    created: fromNow(user.created) + ' ago',
    karma: String(user.karma),
    about: user.about,
    submissionsUrl: 'https://news.ycombinator.com/submitted?id=' + user.id,
    commentsUrl: 'https://news.ycombinator.com/threads?id=' + user.id
  };
};

const render = (state: ViewState, helpers: Helpers): View => {
  if (!state) return null;
  const { create: h } = helpers;
  return h('div.view.user-view', [
    h('ul', [
      h('li', [h('span.label', ['user:']), ' ', state.id]),
      h('li', [h('span.label', ['created:']), ' ', state.created]),
      h('li', [h('span.label', ['karma:']), ' ', state.karma]),
      h('li', [
        h('span.label', ['about:']),
        h('div.about', { innerHTML: state.about })
      ])
    ]),
    h('p.links', [
      h('a', { href: state.submissionsUrl }, ['submissions']),
      h('br'),
      h('a', { href: state.commentsUrl }, ['comments'])
    ])
  ]);
};

const view: (state: State, helpers: Helpers) => View = (state, helpers) =>
  render(viewState(state, helpers), helpers);

export { view };
