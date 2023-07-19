import {Category} from "../../../model/Category";
import {EMPTY, Observable, of} from "rxjs";
import {Priority} from "../../../model/Priority";
import {TestData} from "../../TestData";
import {Goal} from "../../../model/Goal";
import {GoalDAO} from "../interface/GoalDAO";

export class GoalDAOArray implements GoalDAO {

  static test(): Observable<Goal[]> {
    return of(TestData.goals);
  }

  getAll(): Observable<Goal[]> {
    return of(TestData.goals);
  }

  get(id: number): Observable<Goal> {
    let goal = TestData.goals.find(x => x.id == id);
    return goal ? of(goal) : EMPTY;
  }


  add(goal: Goal): Observable<Goal> {
    TestData.goals.push(goal);
    return of(goal);
  }

  delete(id: number): Observable<Goal> {
    let goalTmp = TestData.goals.find(t => t.id === id);

    if (goalTmp == null) {
      return EMPTY;
    }

    let index = TestData.goals.indexOf(goalTmp);
    TestData.goals.splice(index, 1);
    return of(goalTmp);
  }


  getTotalCount(): Observable<number> {
    return of(TestData.goals.length);
  }

  getTotalCompletedCount(): Observable<number> {
    return of(TestData.goals.filter(x => x.isCompleted).length);
  }

  getTotalUncompletedCount(): Observable<number> {
    return of(TestData.goals.filter(x => !x.isCompleted).length);
  }


  getTotalCountInCategory(category: Category): Observable<number> {
    return of(TestData.goals.filter(x => x.category && x.category.id == category.id).length);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return of(TestData.goals.filter(x => x.category && x.category.id == category.id && x.isCompleted).length);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return of(TestData.goals.filter(x => x.category && x.category.id == category.id && !x.isCompleted).length);
  }


  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Goal[]> {
    return of(this.searchTodos(category, searchText, status, priority));
  }

  private searchTodos(category: Category, searchText: string, status: boolean, priority: Priority): Goal[] {
    let allGoals = TestData.goals;

    if (category != null) {
      allGoals = allGoals.filter(todo => todo.category === category);
    }

    return allGoals;
  }

  update(goal: Goal): Observable<Goal> {
    let goalTmp = TestData.goals.find(t => t.id === goal.id);
    if (goalTmp == null) {
      return EMPTY;
    }
    let index = TestData.goals.indexOf(goalTmp);
    TestData.goals.splice(index, 1, goal);
    return of(goal);
  }
}
