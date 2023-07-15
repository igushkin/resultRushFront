import {PriorityDAO} from "../interface/PriorityDAO";
import {EMPTY, Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {TestData} from "../../TestData";

export class PriorityDAOArray implements PriorityDAO {
  add(priority: Priority): Observable<Priority> {
    TestData.priorities.push(priority);
    return of(priority);
  }

  delete(id: number): Observable<Priority> {
    let originalPriority = TestData.priorities.find(x => x.id == id);
    if (!originalPriority) {
      return EMPTY;
    }
    let index = TestData.priorities.indexOf(originalPriority);
    TestData.priorities.splice(index, 1);
    return of(originalPriority);
  }

  get(id: number): Observable<Priority> {
    return EMPTY;
  }

  getAll(): Observable<Priority[]> {
    return of(TestData.priorities);
  }

  update(priority: Priority): Observable<Priority> {
    let originalPriority = TestData.priorities.find(x => x.id == priority.id);

    if (!originalPriority) {
      return EMPTY;
    }
    let index = TestData.priorities.indexOf(originalPriority);
    TestData.priorities.splice(index, 1, priority);
    return of(priority);
  }
}
