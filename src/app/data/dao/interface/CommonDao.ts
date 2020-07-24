/**
 * CRUD
 */
import {Observable} from 'rxjs';

export interface CommonDao<T> {
  add(T);

  get(id: number): Observable<T>;

  update(T): Observable<T>;

  delete(id: number): Observable<T>;

  getAll(): Observable<T[]>;
}
