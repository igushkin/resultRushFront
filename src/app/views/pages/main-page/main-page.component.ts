import {AfterViewChecked, AfterViewInit, Component} from '@angular/core';
import {Goal} from "../../../model/Goal";
import {Category} from "../../../model/Category";
import {CategoryStat} from "../../../model/CategoryStat";
import {ServiceWrapper} from "../../../service/ServiceWrapper";
import {Priority} from "../../../model/Priority";

declare function myFunc(): void;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements AfterViewChecked, AfterViewInit {
  title = 'ResultRushFrontEnd';
  goals: Goal[] = [];
  categories: Category[] = [];
  priorities: Priority[] = [];
  stat: CategoryStat;

  constructor(private serviceWrapper: ServiceWrapper) {
    this.stat = new CategoryStat(0, 0, 0);
    this.serviceWrapper.goalService.findAll().subscribe(goals => this.goals = goals);
    this.serviceWrapper.categoryService.findAll().subscribe(categories => this.categories = categories);
    this.serviceWrapper.priorityService.findAll().subscribe(priorities => {
      this.priorities = priorities;
    });

    this.serviceWrapper.goalService.getStat().subscribe(stat => this.stat = stat);
  }


  onAddGoal(goal: Goal) {
    this.serviceWrapper.goalService.add(goal).subscribe(goal => this.fullReload());
  }


  onUpdateGoal(goal: Goal) {
    this.serviceWrapper.goalService.update(goal).subscribe(goal => this.fullReload());
  }

  onDeleteGoal(goal: Goal) {
    this.serviceWrapper.goalService.delete(goal.id).subscribe(goal => this.fullReload());
  }

  onAddCategory(category: Category) {
    this.serviceWrapper.categoryService.add(category).subscribe(category => {
      this.fullReload();
    })
  }

  onUpdateCategory(category: Category) {
    this.serviceWrapper.categoryService.update(category).subscribe(category => {
      this.fullReload();
    });
  }

  onDeleteCategory(category: Category) {
    this.serviceWrapper.categoryService.delete(category.id).subscribe(category => {
      this.fullReload();
    });
  }


  onAddPriority(priority: Priority) {
    this.serviceWrapper.priorityService.add(priority).subscribe(priority => {
      this.fullReload();
    })
  }

  onUpdatePriority(priority: Priority) {
    this.serviceWrapper.priorityService.update(priority).subscribe(priority => {
      this.fullReload();
    });
  }

  onDeletePriority(priority: Priority) {
    this.serviceWrapper.priorityService.delete(priority.id).subscribe(priority => {
      this.fullReload();
    });
  }

  private fullReload() {
    this.reloadPriorities();
    this.reloadGoals();
    this.reloadCategories();
    this.reloadStat()
  }

  private reloadPriorities(): void {
    this.serviceWrapper.priorityService.findAll().subscribe(priorities => {
      this.priorities = priorities;
    });
  }

  private reloadCategories(): void {
    this.serviceWrapper.categoryService.findAll().subscribe(categories => {
      this.categories = [...categories];
    });
  }

  /*  private reloadGoalsAndStat(): void {
      this.reloadGoals();
      this.reloadStat();
    }*/

  private reloadGoals(): void {
    this.serviceWrapper.goalService.findAll().subscribe(goals => {
      this.goals = [...goals];
    });
  }

  private reloadStat(): void {
    this.serviceWrapper.goalService.getStat().subscribe(stat => {
      this.stat = stat;
      setTimeout(() => {
        myFunc();
      }, 250)

    });
  }

  ngAfterViewInit(): void {
    this.reloadStat();
  }

  ngAfterViewChecked() {
    /*        myFunc();*/
  }
}
