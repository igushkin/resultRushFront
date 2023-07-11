import {CategoryDAO} from "../interface/CategoryDAO";
import {EMPTY, Observable, of} from "rxjs";
import {Category} from "../../../model/Category";
import {TestData} from "../../TestData";

export class CategoryDAOArray implements CategoryDAO {
  get(id: number): Observable<Category> {
    return EMPTY;
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  add(category: Category): Observable<Category> {
    return EMPTY;
  }

  delete(id: number): Observable<Category> {
    return EMPTY;
  }

  update(category: Category): Observable<Category> {
    return EMPTY;
  }

  search(title: string): Observable<Category[]> {
    return EMPTY;
  }
}
