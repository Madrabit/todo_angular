import {Task} from '../../../model/Task';
import {Priority} from '../../../model/Priority';
import {Observable} from 'rxjs';
import {Category} from '../../../model/Category';
import {CommonDao} from "./CommonDao";

export interface TaskDao extends CommonDao<Task>{

  /**
   * Поиск тасков сразу по группе параметров.
   * @param category
   * @param searchText
   * @param status
   * @param priority
   */
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Task[]>;

  /**
   * Возвращает количество выполненных тасков по заданной категории.
   * Если категория не задана, тогда количество выполненных для всех категорий.
   * @param category
   */
  getCompletedCountInCategory(category: Category): Observable<number>;

  /**
   * Возвращает количество невыполненных тасков.
   * @param category
   */
  getUnсompletedCountInCategory(category: Category): Observable<number>;


  /**
   * Количество всех задач.
   * @param category
   */
  getTotalCountInCategory(category: Category): Observable<number>;

  /**
   * Количество всех задач.
   */
  getTotalCount(): Observable<number>;

}
