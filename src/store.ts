import { O } from './boa';
import * as Firebase from 'firebase';
import { fetch, from } from './utils/firebase';
import { Item, User } from './types/hn';

export interface Store {
  fetchItem: (id: number) => Promise<Item>;
  fetchItems: (ids: number[]) => Promise<Item[]>;
  fetchUser: (id: string) => Promise<User>;
  topStoryIdsUpdated$: O<number[]>;
}

const makeStore = (): Store => {
  const firebase = new Firebase('https://hacker-news.firebaseio.com/v0');
  const cache: { [id: number]: Item } = {};

  const rawFetchItem = (id: number): Promise<Item> =>
    fetch(firebase.child('item/' + id), 'value');
  const fetchItem = (id: number): Promise<Item> => {
    if (cache[id]) return Promise.resolve(cache[id]);
    return rawFetchItem(id).then(item => {
      cache[id] = item;
      return item;
    });
  };
  const fetchItems = (ids: number[]): Promise<Item[]> =>
    Promise.all(<PromiseLike<Item>[]>ids.map(fetchItem));
  const fetchUser = (id: string): Promise<User> =>
    fetch(firebase.child('user/' + id), 'value');
  const topStoryIdsUpdated$ =
    from(firebase.child('topstories'), 'value').share();

  return { fetchItem, fetchItems, fetchUser, topStoryIdsUpdated$ };
};

export { makeStore };
