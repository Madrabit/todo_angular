import {CategoryDao} from '../interface/CategoryDao';
import {Category} from '../../../model/Category';
import {Observable, of} from 'rxjs';
import {TestData} from '../../TestData';

export class CategoryDaoArray implements CategoryDao {
  add(T) {
  }

  delete(id: number): Observable<Category> {
    TestData.tasks.forEach(task => {
      if (task.category && task.category.id === id) {
        task.category = null;
      }
    });

    const categoryTmp = TestData.categories.find(c => c.id === id); // обновляем по id
    TestData.categories.splice(TestData.categories.indexOf(categoryTmp), 1);
    return of(categoryTmp);
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

  update(category: Category): Observable<Category> {

    const tmpCategory = TestData.categories.find(t => t.id === category.id); // обновляем по id
    TestData.categories.splice(TestData.categories.indexOf(tmpCategory), 1, category);

    return of(tmpCategory);
  }

}
