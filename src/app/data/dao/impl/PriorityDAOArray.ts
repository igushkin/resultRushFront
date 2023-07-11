import {PriorityDAO} from "../interface/PriorityDAO";
import {EMPTY, Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {TestData} from "../../TestData";

export class PriorityDAOArray implements PriorityDAO {
  add(priority: Priority): Observable<Priority> {
    return EMPTY;
  }

  delete(id: number): Observable<Priority> {
    return EMPTY;
  }

  get(id: number): Observable<Priority> {
    return EMPTY;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(priority: Priority): Observable<Priority> {
    return EMPTY;
  }
}
