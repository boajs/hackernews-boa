import { domain, pluralize, fromNow } from '../views/helpers';

const view = ({ item, index }: any, helpers: any): any => {
  const { create: h } = helpers;
  const href = item.url || ('#/item/' + item.id);
  const showInfo = item.type === 'story';
  const showDomain = item.type === 'story' || item.type === 'poll';
  return h('div.item', [
    h('span.index', [index + '.']),
    h('p', [
      h('a.title', { href, target: '_blank' }, [
        item.title
      ]),
      showDomain ? h('span.domain', [
        '(' + domain(item.url) + ')'
      ]) : null
    ]),
    h('p.subtext', [
      showInfo ? h('span', [
        item.score,
        ' points by ',
        h('a', { href: '#/user/' + item.by }, [
          item.by
        ])
      ]) : null,
      ' ',
      fromNow(item.time) + ' ago',
      showInfo ? h('span.comments-link', [
        '| ',
        h('a', { href: '#/item/' + item.id }, [
          pluralize(item.descendants, ' comment')
        ])
      ]) : null
    ])
  ]);
};

export { view };
