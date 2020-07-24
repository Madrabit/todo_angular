import {CategoryDao} from '../interface/CategoryDao';
import {Category} from '../../../model/Category';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';

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
    return of(TestData.categories);
  }

  search(title: string): Observable<Category[]> {
    return undefined;
  }

  update(T): Observable<Category> {
    return undefined;
  }

}
