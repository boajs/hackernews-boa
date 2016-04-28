import { News } from '../types/news';
import { NewsItem } from '../types/news-item';

type State = {
  currentPage: string;
  news: News;
  item?: NewsItem;
  // store.fetchItems(item.kids)
  comments: any[];
  // store.fetchItems(item.parts)
  pollOptions: { text: string; score: number; }[];
};

export { State };
