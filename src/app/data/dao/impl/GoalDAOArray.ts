import {Category} from "../../../model/Category";
import {EMPTY, Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {TestData} from "../../TestData";
import {Goal} from "../../../model/Goal";
import {GoalDAO} from "../interface/GoalDAO";

export class GoalDAOArray implements GoalDAO {

  getAll(): Observable<Goal[]> {
    return of(TestData.goals);
  }

  get(id: number): Observable<Goal> {
    return EMPTY;
  }


  add(goal: Goal): Observable<Goal> {
    return EMPTY;
  }

  delete(id: number): Observable<Goal> {
    let goalTmp = TestData.goals.find(t => t.id === id); // удаляем по id

    if (goalTmp == null) {
      return EMPTY;
    }

    let index = TestData.goals.indexOf(goalTmp);
    TestData.goals.splice(index, 1);
    return of(goalTmp);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return EMPTY;
  }

  getTotalCount(): Observable<number> {
    return EMPTY;
  }

  getTotalCountInCategory(category: Category): Observable<number> {
    return EMPTY;
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return EMPTY;
  }

  // поиск задач по параметрам
  // если значение null - параметр не нужно учитывать при поиске
  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Goal[]> {
    return of(this.searchTodos(category, searchText, status, priority));
  }

  private searchTodos(category: Category, searchText: string, status: boolean, priority: Priority): Goal[] {
    let allGoals = TestData.goals;

    if (category != null) {
      allGoals = allGoals.filter(todo => todo.category === category);
    }

    return allGoals; // отфильтрованный массив
  }

  update(Goal: Goal): Observable<Goal> {
    let goalTmp = TestData.goals.find(t => t.id === Goal.id); // обновляем по id
    if (goalTmp == null) {
      return EMPTY;
    }
    let index = TestData.goals.indexOf(goalTmp);
    TestData.goals.splice(index, 1, Goal);
    return of(Goal);
  }
}
