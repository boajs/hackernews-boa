import { pluralize, fromNow } from '../views/helpers';
import { Item } from '../types/hn';

export type State = {
  comment: Item;
  comments: { [id: number]: Item; };
};
export type Helpers = any;
export type View = any;

type ViewState = {
  by: string;
  childComments: any[];
  comments: { [id: number]: any; };
  hasChildComments: boolean;
  text: string;
  time: string;
  url: string;
};

const viewState = (state: State, _: Helpers): ViewState => {
  if (!state) return null;
  const { comment, comments } = state;
  if (!comment) return null;
  if (comment.type !== 'comment') return null;
  const childComments = comment.kids
    ? comment.kids.map(id => comments[id])
    : [];
  const open = true;

  return {
    by: comment.by,
    childComments,
    comments,
    hasChildComments: childComments.length > 0,
    text: comment.text,
    time: fromNow(comment.time) + ' ago',
    url: '#/user/' + comment.by
  };
}

const render = (state: ViewState, helpers: Helpers): View => {
  if (!state) return null;
  const { create: h } = helpers;
  return h('li', [
    h('div.comhead', [
      h('a.toggle', [ // TODO: click
        open ? '[-]' : '[+]'
      ]),
      h('a', { href: state.url }, [state.by]),
      state.time
    ]),
    h('p.comment-content', { innerHTML: state.text }),
    !state.hasChildComments
      ? null
      : h('ul.child-comments', state.childComments.map(comment => {
        return view({ comment, comments: state.comments }, helpers);
      }))
  ]);
};


const view: (state: State, helpers: Helpers) => View = (state, helpers) =>
  render(viewState(state, helpers), helpers);

export { view };
