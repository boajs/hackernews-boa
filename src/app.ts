import { A, O, Handler } from 'boa-core';
import { NewsItem } from './types/news-item';

const app: Handler = (action$: O<A<any>>, options?: any): O<A<any>> => {
  const newsItem: NewsItem = {
    by: 'by',
    descendants: 3,
    id: 'id',
    score: 123,
    time: 'time',
    title: 'title',
    type: 'story',
    url: 'http://example.com'
  };
  const initialState = {
    currentPage: 'news',
    news: {
      page: 1,
      items: [
        newsItem
      ]
    }
  };
  return O.of(initialState).map(data => ({ type: 'render', data }));
};

export { app };
