import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {
  CategorySettingsComponent
} from "../../../dialog/settings-dialog/category-settings-dialog/category-settings.component";
import {
  PrioritySettingsComponent
} from "../../../dialog/settings-dialog/priority-settings-dialog/priority-settings.component";
import {Category} from "../../../model/Category";
import {Priority} from "../../../model/Priority";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  categories: Category[];
  priorities: Priority[];
  private categoryDialog?: CategorySettingsComponent;
  private priorityDialog?: PrioritySettingsComponent;

  @Output()
  deleteCategory = new EventEmitter<Category>();
  @Output()
  updateCategory = new EventEmitter<Category>();
  @Output()
  addCategory = new EventEmitter<Category>();

  @Output()
  deletePriority = new EventEmitter<Priority>();
  @Output()
  updatePriority = new EventEmitter<Priority>();
  @Output()
  addPriority = new EventEmitter<Priority>();

  @Input('categories')
  set setGoals(categories: Category[]) {
    this.categories = categories;

    if (this.categoryDialog) {
      this.categoryDialog.categories = categories;
    }
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;

    if (this.priorityDialog) {
      this.priorityDialog.priorities = priorities;
    }
  }

  constructor(private dialog: MatDialog) {
    this.categories = [];
    this.priorities = [];
  }

  public showCategorySettings() {
    const dialogRef = this.dialog.open(CategorySettingsComponent,
      {
        data: ['Category settings'],
        autoFocus: false,
        width: '600px'
      });

    this.categoryDialog = dialogRef.componentInstance;

    this.categoryDialog.addCategory.subscribe(category => this.addCategory.emit(category));
    this.categoryDialog.updateCategory.subscribe(category => this.updateCategory.emit(category));
    this.categoryDialog.deleteCategory.subscribe(category => this.deleteCategory.emit(category));
    this.categoryDialog.categories = this.categories;
  }

  public showPrioritySettings() {
    const dialogRef = this.dialog.open(PrioritySettingsComponent,
      {
        data: ['Priority settings'],
        autoFocus: false,
        width: '600px'
      });

    this.priorityDialog = dialogRef.componentInstance;

    this.priorityDialog.addPriority.subscribe(priority => this.addPriority.emit(priority));
    this.priorityDialog.updatePriority.subscribe(priority => this.updatePriority.emit(priority));
    this.priorityDialog.deletePriority.subscribe(priority => this.deletePriority.emit(priority));
    this.priorityDialog.priorities = this.priorities;
  }
}
