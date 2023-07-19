import {Injectable} from '@angular/core';
import {Goal} from '../model/Goal';
import {Observable} from "rxjs";
import {GoalDAOArray} from "../data/dao/impl/GoalDAOArray";
import {Category} from "../model/Category";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";
import {Priority} from "../model/Priority";
import {PriorityDAOArray} from "../data/dao/impl/PriorityDAOArray";
import {MilestoneDAOArray} from "../data/dao/impl/MilestoneDAOArray";
import {Milestone} from "../model/Milestone";


@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {


  private goalDaoArray = new GoalDAOArray();
  private categoryDaoArray = new CategoryDAOArray();
  private priorityDaoArray = new PriorityDAOArray();
  private milestoneDaoArray = new MilestoneDAOArray();

  constructor() {
  }

  getCategoriesStat() {
    return this.categoryDaoArray.getCategoryStat();
  }

  getAllGoals(): Observable<Goal[]> {
    return this.goalDaoArray.getAll();
  }

  getGoalById(id: number): Observable<Goal> {
    return this.goalDaoArray.get(id);
  }

  getAllCategories(): Observable<Category[]> {
    return this.categoryDaoArray.getAll();
  }

  getAllPriorities(): Observable<Priority[]> {
    return this.priorityDaoArray.getAll();
  }

  updateGoal(goal: Goal): Observable<Goal> {
    return this.goalDaoArray.update(goal);
  }

  addGoal(goal: Goal): Observable<Goal> {
    return this.goalDaoArray.add(goal);
  }


  searchGoals(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Goal[]> {
    return this.goalDaoArray.search(category, searchText, status, priority);
  }

  deleteGoal(id: number): Observable<Goal> {
    return this.goalDaoArray.delete(id);
  }

  addCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.add(category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.update(category);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.categoryDaoArray.delete(category.id);
  }


  getTotalCount(): Observable<number> {
    return this.goalDaoArray.getTotalCount();
  }

  getTotalCompletedCount(): Observable<number> {
    return this.goalDaoArray.getTotalCompletedCount();
  }

  getTotalUncompletedCount(): Observable<number> {
    return this.goalDaoArray.getTotalUncompletedCount();
  }


  getTotalCountInCategory(category: Category): Observable<number> {
    return this.goalDaoArray.getTotalCountInCategory(category);
  }

  getCompletedCountInCategory(category: Category): Observable<number> {
    return this.goalDaoArray.getCompletedCountInCategory(category);
  }

  getUncompletedCountInCategory(category: Category): Observable<number> {
    return this.goalDaoArray.getUncompletedCountInCategory(category);
  }

  addPriority(priority: Priority): Observable<Priority> {
    return this.priorityDaoArray.add(priority);
  }

  updatePriority(priority: Priority): Observable<Priority> {
    return this.priorityDaoArray.update(priority);
  }

  deletePriority(priority: Priority): Observable<Priority> {
    return this.priorityDaoArray.delete(priority.id);
  }

  getMilestonesByGoalId(goalId: number) {
    return this.milestoneDaoArray.getByGoalId(goalId);
  }

  updateMilestone(milestone: Milestone) {
    return this.milestoneDaoArray.update(milestone);
  }

  addMilestone(milestone: Milestone) {
    return this.milestoneDaoArray.add(milestone);
  }

  deleteMilestone(milestone: Milestone) {
    return this.milestoneDaoArray.delete(milestone.id);
  }
}
