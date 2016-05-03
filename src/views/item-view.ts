import { view as commentView } from '../views/comment';
import { view as itemView } from '../views/item';

const view = ({ item, comments, pollOptions }: any, helpers: any): any => {
  const { create: h } = helpers;
  if (!item) return null;
  const isJob = item.type === 'job';
  const hasText = item.hasOwnProperty('text');
  return h('div.view.item-view', [
    itemView({ item }, helpers),
    hasText ? h('p.itemtext', [item.text]) : null,
    pollOptions ? h('ul.poll-options', pollOptions.map(option => {
      return h('li', [
        h('p', [option.text]),
        h('p.subtext', [option.score, ' points'])
      ]);
    })) : null,
    comments ? h('ul.comments', comments.map(comment => {
      return commentView({ comment }, helpers);
    })) : null,
    comments.length === 0 && !isJob ? h('p', ['No comments yet.']) : null
  ]);
};

export { view };
