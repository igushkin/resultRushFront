import {Injectable} from '@angular/core';
import {Goal} from '../model/Goal';
import {Observable} from "rxjs";
import {GoalDAOArray} from "../data/dao/impl/GoalDAOArray";
import {Category} from "../model/Category";
import {CategoryDAOArray} from "../data/dao/impl/CategoryDAOArray";
import {Priority} from "../model/Priority";
import {PriorityDAOArray} from "../data/dao/impl/PriorityDAOArray";


// класс реализовывает методы, которые нужны frontend'у, т.е. для удобной работы представлений
// напоминает паттер Фасад (Facade) - выдает только то, что нужно для функционала
// сервис не реализовывает напрямую интерфейсы DAO, а использует их реализации (в данном случае массивы)
// может использовать не все методы DAO, а только нужные

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  // релизации работы с данными с помощью массива
  // (можно подставлять любые релизации, в том числе с БД. Главное - соблюдать интерфейсы)
  private goalDaoArray = new GoalDAOArray();
  private categoryDaoArray = new CategoryDAOArray();
  private priorityDaoArray = new PriorityDAOArray();


  constructor() {
  }

  getAllGoals(): Observable<Goal[]> {
    return this.goalDaoArray.getAll();
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


  // поиск задач по параметрам
  searchGoals(category: Category, searchText: string, status: boolean, priority: Priority): Observable<Goal[]> {
    return this.goalDaoArray.search(category, searchText, status, priority);
  }

  deleteGoal(id: number): Observable<Goal> {
    return this.goalDaoArray.delete(id);
  }
}
