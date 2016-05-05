import { pluralize, fromNow } from '../views/helpers';
import { Item } from '../types/hn';
import { create as toggleComment } from '../actions/toggle-comment';

export type State = {
  comment: Item;
  comments: { [id: number]: Item; };
  opens: { [id: number]: boolean; };
};
export type Helpers = any;
export type View = any;

type ViewState = {
  by: string;
  childComments: Item[]; // for views/comment (recursive)
  comments: { [id: number]: Item; }; // for views/comment (recursive)
  hasChildComments: boolean;
  onClickToggleButton: () => void;
  open: boolean;
  opens: { [id: number]: boolean; }; // for views/comment (recursive)
  text: string;
  time: string;
  toggleText: string;
  url: string;
};

const viewState = (state: State, helpers: Helpers): ViewState => {
  if (!state) return null;
  const { comment, comments, opens } = state;
  if (!comment) return null;
  if (comment.type !== 'comment') return null;
  const childComments = comment.kids
    ? comment.kids.map(id => comments[id])
    : [];
  const { e } = helpers;
  const o = opens[comment.id];
  const open = (typeof o === 'undefined' ? true : o);

  return {
    by: comment.by,
    childComments,
    comments,
    hasChildComments: childComments.length > 0,
    onClickToggleButton: () => e(toggleComment(comment.id)),
    open,
    opens,
    text: comment.text,
    time: fromNow(comment.time) + ' ago',
    toggleText: open ? '[-]' : '[+]',
    url: '#/user/' + comment.by
  };
}

const render = (state: ViewState, helpers: Helpers): View => {
  if (!state) return null;
  const { create: h } = helpers;
  return h('li', [
    h('div.comhead', [
      h('a.toggle', { onclick: state.onClickToggleButton }, [state.toggleText]),
      h('a', { href: state.url }, [state.by]),
      ' ',
      state.time
    ]),
    !state.open ? null : h('p.comment-content', { innerHTML: state.text }),
    !state.hasChildComments || !state.open
      ? null
      : h('ul.child-comments', state.childComments.map(comment => {
        return view({
          comment,
          comments: state.comments,
          opens: state.opens
        }, helpers);
      }))
  ]);
};

const view: (state: State, helpers: Helpers) => View = (state, helpers) =>
  render(viewState(state, helpers), helpers);

export { view };
