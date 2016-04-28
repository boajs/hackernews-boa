import { pluralize, fromNow } from '../views/helpers';

const view = ({ comment }: any, helpers: any): any => {
  const { create: h } = helpers;

  const childComments = [];
  const open = true;

  // store.fetchItems(comment.kids).then(comments => {
  //   childComments = comments;
  // });
  const href = '#/user/' + comment.by;
  if (!comment.text) return null;
  return h('li', [
    h('div.comhead', [
      h('a.toggle', [ // TODO: click
        open ? '[-]' : '[+]'
      ]),
      h('a', { href }, [comment.by]),
      fromNow(comment.time),
      ' ago'
    ]),
    h('p.comment-content', [comment.text]),
    comment.kids ? h('ul.child-comments', childComments.map(comment => {
      return view({ comment }, helpers);
    })) : null
  ]);
};

export { view };
