import {TaskDao} from '../interface/TaskDao';
import {Observable, of} from 'rxjs';
import {Task} from 'src/app/model/Task';
import {Category} from '../../../model/Category';
import {Priority} from '../../../model/Priority';
import {TestData} from '../../TestData';
import {Test} from 'tslint';

export class TaskDaoArray implements TaskDao {
  add(T) {
    of(TestData.tasks.fill(T));
  }

  delete(id: number): Observable<Task> {
    // of(TestData.tasks.filter(value => value.id !== id));
    return undefined;
  }

  get(id: number): Observable<Task> {
    return of(TestData.tasks.find(value => value.id === id));
  }

  getAll(): Observable<Task[]> {
    return of(TestData.tasks);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getTotalCount(): Observable<number> {
    return undefined;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  getUnсompletedCountInCategory(category: Category): Observable<number> {
    return undefined;
  }

  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {

    return of(this.searchTodo(category, searchText, status, priority));

  }

  update(T): Observable<Task> {
    return undefined;
  }

  private searchTodo(category: Category, searchText: string, status: boolean, priority: Priority): Task[] {

    let allTasks = TestData.tasks;


    if (category != null) {
      allTasks = allTasks.filter(todo => todo.category === category);
    }


    return allTasks; // отфильтрованный массив
  }
}

