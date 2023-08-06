import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import {Goal} from "../../../model/Goal";
import {Category} from "../../../model/Category";
import {ServiceWrapper} from "../../../service/ServiceWrapper";
import {Priority} from "../../../model/Priority";
import {CategoryStat} from "../../../model/CategoryStat";
import {DeviceDetectorService} from "ngx-device-detector";
import {SessionStorageService} from "../../../service/impl/session-storage.service";
import {PageEvent} from "@angular/material/paginator";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent {
  title = 'ResultRushFrontEnd';
  goals: Goal[] = [];
  categories: Category[] = [];
  priorities: Priority[] = [];
  commonCategoryStat: CategoryStat = new CategoryStat(0, 0, 0);
  events: string[] = [];
  opened: boolean = true;

  //@ts-ignore
  @ViewChildren('barfiller', {static: false}) categoryDivs: QueryList<HTMLDivElement>;

  constructor(private serviceWrapper: ServiceWrapper, private deviceDetector: DeviceDetectorService, private sessionStorageService: SessionStorageService) {
    this.fullReload();

    this.opened = sessionStorageService.sidebarOpened;
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

  }

  private reloadPriorities(): void {
    this.serviceWrapper.priorityService.findAll().subscribe(priorities => {
      this.priorities = priorities;
    });
  }

  private reloadCategories(): void {
    this.serviceWrapper.categoryService.findAll().subscribe(categories => {

      this.serviceWrapper.goalService.getStat().subscribe(stat => {
        this.commonCategoryStat = stat;
        let commonCategoryStat = stat;
        this.categories = [...categories];
      });

    });
  }


  private reloadGoals(): void {
    this.serviceWrapper.goalService.findAll().subscribe(goals => {
      this.goals = [...goals];
    });
  }


  onUpdateSidebarStatus($event: boolean) {
    this.opened = $event;
    this.sessionStorageService.sidebarOpened = this.opened;
  }

}
