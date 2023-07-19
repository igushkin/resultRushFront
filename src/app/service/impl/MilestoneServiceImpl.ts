import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonServiceImpl} from "./common/CommonServiceImpl";
import {Milestone} from "../../model/Milestone";
import {Observable} from "rxjs";


export const MILESTONE_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})


export class MilestoneServiceImpl extends CommonServiceImpl<Milestone> {

  constructor(@Inject(MILESTONE_URL_TOKEN) private baseUrl: string,
              private http: HttpClient
  ) {
    super(baseUrl, http);
  }

  getMilestonesByGoalId(goalId: number): Observable<Milestone[]> {
    return this.http.get<Milestone[]>(this.baseUrl + "/goal/" + goalId);
  }
}
