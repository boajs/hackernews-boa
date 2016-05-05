import { view as commentView } from '../views/comment';
import { view as itemView } from '../views/item';
import { Item } from '../types/hn';
import { State } from '../types/state';

export type Helpers = any;
export type View = any;

type ViewState = {
  allComments: { [id: number]: Item; }; // for views/comment
  comments: Item[]; // for views/comment
  hasComments: boolean;
  hasNoComments: boolean;
  hasPollOptions: boolean;
  hasText: boolean;
  item: Item; // for views/item
  pollOptions: { text: string; score: string; }[];
  text: string;
};

const viewState = ({
  item, comments // , pollOptions // TODO
}: State, _: Helpers): ViewState => {
  if (!item) return null;
  const pollOptions = [];
  const hasComments = item.kids && item.kids.length > 0;
  const hasPollOptions = !!pollOptions;
  return {
    allComments: comments,
    comments: hasComments ? item.kids.map(id => comments[id]) : [],
    hasComments,
    hasNoComments: !hasComments && item.type !== 'job',
    hasPollOptions,
    hasText: item.hasOwnProperty('text'),
    item,
    text: item.hasOwnProperty('text') ? item.text : null,
    pollOptions: hasPollOptions ? pollOptions.map(i => {
      return {
        text: i.text,
        score: i.score + ' points'
      };
    }) : []
  };
};

const render = (state: ViewState, helpers: Helpers): View => {
  if (!state) return null;
  const { create: h } = helpers;
  return h('div.view.item-view', [
    itemView({ item: state.item }, helpers),
    !state.hasText
      ? null
      : h('p.itemtext', { innerHTML: state.text }),
    !state.hasPollOptions
      ? null
      : h('ul.poll-options', state.pollOptions.map(option => {
        return h('li', [
          h('p', { innerHTML: option.text }),
          h('p.subtext', [option.score])
        ]);
      })),
    !state.hasComments
      ? null
      : h('ul.comments', state.comments.map(comment => {
        return commentView({ comment, comments: state.allComments }, helpers);
      })),
    !state.hasNoComments
      ? null
      : h('p', ['No comments yet.'])
  ]);
};

const view: (state: State, helpers: Helpers) => View = (state, helpers) =>
  render(viewState(state, helpers), helpers);

export { view };
