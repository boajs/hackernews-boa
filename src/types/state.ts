import { Item, User } from '../types/hn';

type State = {
  currentPage: string;
  news: {
    page: number;
    storiesPerPage: number;
    items: Item[];
  };
  item?: Item;
  user?: User;
  comments: { [id: number]: Item };
};

export { State };
