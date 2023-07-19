import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {CommonServiceImpl} from './common/CommonServiceImpl';
import {Priority} from "../../model/Priority";


export const PRIORITY_URL_TOKEN = new InjectionToken<string>('url');


@Injectable({
  providedIn: 'root'
})


export class PriorityServiceImpl extends CommonServiceImpl<Priority> {

  constructor(@Inject(PRIORITY_URL_TOKEN) private baseUrl: string,
              private http: HttpClient
  ) {
    super(baseUrl, http);
  }


}
