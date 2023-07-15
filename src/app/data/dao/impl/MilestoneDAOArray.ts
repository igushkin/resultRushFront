import {GoalDAO} from "../interface/GoalDAO";
import {CommonDAO} from "../interface/CommonDAO";
import {Milestone} from "../../../model/Milestone";
import {EMPTY, Observable, of} from "rxjs";
import {TestData} from "../../TestData";
import {getMatIconFailedToSanitizeLiteralError} from "@angular/material/icon";

export class MilestoneDAOArray implements CommonDAO<Milestone> {
  constructor() {
  }

  add(obj: Milestone): Observable<Milestone> {
    TestData.milestones.push(obj);
    return of(obj);
  }

  delete(id: number): Observable<Milestone> {
    let milestone = TestData.milestones.find(milestone => milestone.id == id);
    if (!milestone) {
      return EMPTY;
    }

    let index = TestData.milestones.indexOf(milestone);
    TestData.milestones.splice(index, 1);
    return of(milestone);
  }

  get(id: number): Observable<Milestone> {
    return EMPTY;
  }

  getAll(): Observable<Milestone[]> {
    return EMPTY;
  }

  update(obj: Milestone): Observable<Milestone> {
    let milestone = TestData.milestones.find(milestone => milestone.id == obj.id);
    if (!milestone) {
      return EMPTY;
    }

    let index = TestData.milestones.indexOf(milestone);
    TestData.milestones.splice(index, 1, obj);
    return of(milestone);
  }

  getByGoalId(goalId: number): Observable<Milestone[]> {
    return of(TestData.milestones.filter(milestone => milestone.goal.id == goalId));
  }
}
