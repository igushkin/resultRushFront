import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CommonServiceImpl} from './common/CommonServiceImpl';
import {Category} from "../../model/Category";


export const CATEGORY_URL_TOKEN = new InjectionToken<string>('url');


@Injectable({
  providedIn: 'root'
})


export class CategoryServiceImpl extends CommonServiceImpl<Category> {

  constructor(@Inject(CATEGORY_URL_TOKEN) private baseUrl: string,
              private http: HttpClient
  ) {
    super(baseUrl, http);
  }


}
