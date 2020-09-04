import {Injectable} from '@angular/core';
import {Category} from '../model/Category';
import {TestData} from '../data/TestData';
import {Task} from '../model/Task';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {TaskDaoArray} from '../data/dao/impl/TaskDaoArray';
import {CategoryDaoArray} from '../data/dao/impl/CategoryDaoArray';
import {Priority} from '../model/Priority';
import {PriorityDaoArray} from '../data/dao/impl/PriorityDaoArray';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  tasksSubject = new BehaviorSubject<Task[]>(TestData.tasks);
  categoriesSubject = new BehaviorSubject<Category[]>(TestData.categories);

  private taskDaoArray = new TaskDaoArray();
  private categoryDaoArray = new CategoryDaoArray();
  private priorityDaoArray = new PriorityDaoArray();

  constructor() {
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }

  searchTasks(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]> {
    return this.taskDaoArray.search(category, searchText, status, priority);
  }

  updateTask(task: Task): Observable<Task> {
    return this.taskDaoArray.update(task);
  }

  getAllProperties(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll();
  }

  deleteTask(id: number) {
    return this.taskDaoArray.delete(id);
  }

  updateCategory(category: Category) {
    return this.categoryDaoArray.update(category);
  }

  deleteCategory(id: number) {
    return this.categoryDaoArray.delete(id);
  }
}
