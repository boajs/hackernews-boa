import { User } from '../types/user';
import { fromNow } from '../views/helpers';

const view = ({ user }: { user: User }, helpers: any): any => {
  const { create: h } = helpers;
  if (!user) return null;
  return h('div.view.user-view', [
    h('ul', [
      h('li', [
        h('span.label', ['user:']),
        ' ',
        user.id
      ]),
      h('li', [
        h('span.label', ['created:']),
        ' ',
        fromNow(user.created),
        ' ago'
      ]),
      h('li', [
        h('span.label', ['karma:']),
        ' ',
        user.karma
      ]),
      h('li', [
        h('span.label', ['about:']),
        h('div.about', { innerHTML: user.about })
      ])
    ]),
    h('p.links', [
      h('a', { href: 'https://news.ycombinator.com/submitted?id=' + user.id }, [
        'submissions'
      ]),
      h('br'),
      h('a', { href: 'https://news.ycombinator.com/threads?id=' + user.id }, [
        'comments'
      ])
    ])
  ]);
};

export { view };
