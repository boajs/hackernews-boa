import * as url from 'url';

const domain = (urlString: string): string => {
  if (!urlString) throw new Error('urlString is not defined');
  return url.parse(urlString).hostname;
};

const pluralize = (time: number, label: string): string => {
  return time + label + (time === 1 ? '' : 's');
};

const fromNow = (time: string | number): string => {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
};

export { domain, pluralize, fromNow };
