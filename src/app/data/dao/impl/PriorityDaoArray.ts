import {PriorityDao} from '../interface/PriorityDao';
import {Observable} from 'rxjs';
import {Priority} from '../../../model/Priority';

export class PriorityDaoArray implements PriorityDao {
  add(T) {
  }

  delete(id: number): Observable<Priority> {
    return undefined;
  }

  get(id: number): Observable<Priority> {
    return undefined;
  }

  getAll(): Observable<Priority[]> {
    return undefined;
  }

  update(T): Observable<Priority> {
    return undefined;
  }


}
