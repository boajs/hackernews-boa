import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import * as Firebase from 'firebase';

const from = <T>(firebase: Firebase, eventType: string): Observable<T> => {
  return Observable.create((subscriber: Subscriber<T>) => {
    const callback = firebase.on(eventType, snapshot => {
      subscriber.next(snapshot.val());
    }, error => {
      subscriber.error(error);
    });
    return () => firebase.off(eventType, callback);
  });
}

const fetch = <T>(firebase: Firebase, eventType: string): Promise<T> => {
  return new Promise((resolve, reject) => {
    firebase.once(eventType, snapshot => resolve(snapshot.val()), reject);
  });
};

export { fetch, from };
