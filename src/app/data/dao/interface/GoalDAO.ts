import {Category} from '../../../model/Category';
import {CommonDAO} from './CommonDAO';
import {Priority} from '../../../model/Priority';
import {Observable} from 'rxjs';
import {Goal} from "../../../model/Goal";


export interface GoalDAO extends CommonDAO<Goal> {


  search(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Goal[]>;


  getCompletedCountInCategory(category: Category): Observable<number>;


  getUncompletedCountInCategory(category: Category): Observable<number>;


  getTotalCountInCategory(category: Category): Observable<number>;


  getTotalCount(): Observable<number>;

  getTotalCompletedCount(): Observable<Number>;

  getTotalUncompletedCount(): Observable<Number>;
}
