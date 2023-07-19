import {Category} from '../../../model/Category';
import {CommonDAO} from './CommonDAO';
import {Observable} from 'rxjs';
import {CategoryStat} from "../../../model/CategoryStat";


export interface CategoryDAO extends CommonDAO<Category> {


  search(title: string): Observable<Category[]>;

  getCategoryStat(): Observable<Map<number, CategoryStat>>;
}
