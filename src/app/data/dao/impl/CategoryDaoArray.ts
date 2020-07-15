import {CategoryDao} from '../interface/CategoryDao';
import {Category} from '../../../model/Category';
import {Observable} from 'rxjs';

export class CategoryDaoArray implements CategoryDao {
  add(T) {
  }

  delete(id: number): Observable<Category> {
    return undefined;
  }

  get(id: number): Observable<Category> {
    return undefined;
  }

  getAll(): Observable<Category[]> {
    return undefined;
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

  update(T): Observable<Category> {
    return undefined;
  }

}
