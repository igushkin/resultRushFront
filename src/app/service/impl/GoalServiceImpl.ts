import {Observable} from 'rxjs';
import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {CommonServiceImpl} from './common/CommonServiceImpl';
import {Goal} from "../../model/Goal";
import {CategoryStat} from "../../model/CategoryStat";


export const GOAL_URL_TOKEN = new InjectionToken<string>('url');


@Injectable({
  providedIn: 'root'
})


export class GoalServiceImpl extends CommonServiceImpl<Goal> {


  constructor(@Inject(GOAL_URL_TOKEN) private baseUrl: string,
              private http: HttpClient
  ) {
    super(baseUrl, http);
  }

  public getStat(): Observable<CategoryStat> {
    return this.http.get<CategoryStat>(this.baseUrl + '/stat');
  }

  override add(obj: Goal): Observable<Goal> {
    obj.categoryId = obj.category?.id;
    obj.priorityId = obj.priority?.id;
    return super.add(obj);
  }

  override update(obj: Goal): Observable<Goal> {
    obj.categoryId = obj.category?.id;
    obj.priorityId = obj.priority?.id;
    return super.update(obj);
  }

  override findAll(): Observable<Goal[]> {
    return super.findAll();
  }
}
