import {CategoryDAO} from "../interface/CategoryDAO";
import {EMPTY, Observable, of} from "rxjs";
import {Category} from "../../../model/Category";
import {TestData} from "../../TestData";
import {CategoryStat} from "../../../model/CategoryStat";
import {Goal} from "../../../model/Goal";
import {GoalDAOArray} from "./GoalDAOArray";

export class CategoryDAOArray implements CategoryDAO {

  private goals: Goal[] = [];

  constructor() {
    GoalDAOArray.test().subscribe(x => this.goals = x);
  }

  get(id: number): Observable<Category> {
    return EMPTY;
  }

  getCategoryStat(): Observable<Map<number, CategoryStat>> {
    let stat = new Map<number, CategoryStat>();

    for (let category of TestData.categories) {
      let total = this.goals.filter(x => x.category && x.category.id == category.id).length;
      let completed = this.goals.filter(x => x.category && x.category.id == category.id && x.isCompleted).length;
      let uncompleted = this.goals.filter(x => x.category && x.category.id == category.id && !x.isCompleted).length;
      let categoryStat = new CategoryStat(total, completed, uncompleted);

      stat.set(category.id, categoryStat);
    }

    return of(stat);
  }

  getAll(): Observable<Category[]> {
    return of(TestData.categories);
  }

  add(category: Category): Observable<Category> {
    TestData.categories.push(category);
    return of(category);
  }

  delete(id: number): Observable<Category> {
    let categoryTmp = TestData.categories.find(t => t.id === id);
    if (!categoryTmp) {
      return EMPTY;
    }
    let index = TestData.categories.indexOf(categoryTmp);
    TestData.categories.splice(index, 1);
    return of(categoryTmp);
  }

  update(category: Category): Observable<Category> {
    let categoryTmp = TestData.categories.find(t => t.id === category.id);
    if (!categoryTmp) {
      return EMPTY;
    }
    let index = TestData.categories.indexOf(categoryTmp);
    TestData.categories.splice(index, 1, category);
    return of(category);
  }

  search(title: string): Observable<Category[]> {
    return EMPTY;
  }
}
