import { domain, pluralize, fromNow } from '../views/helpers';

const domainView = (item: any, helpers: any): any => {
  const { create: h } = helpers;
  if (item.type !== 'story') return null; // type !== 'story' -> no url
  return h('span.domain', ['(' + domain(item.url) + ')']);
};

const view = ({ item, index }: any, helpers: any): any => {
  const { create: h } = helpers;
  const href = item.url || ('#/item/' + item.id);
  const showInfo = item.type === 'story' || item.type === 'poll';
  return h('div.item', [
    h('span.index', [index + '.']),
    h('p', [
      h('a.title', { href, target: '_blank' }, [
        item.title
      ]),
      ' ',
      domainView(item, helpers)
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
        ' | ',
        h('a', { href: '#/item/' + item.id }, [
          pluralize(item.descendants, ' comment')
        ])
      ]) : null
    ])
  ]);
};

export { view };
