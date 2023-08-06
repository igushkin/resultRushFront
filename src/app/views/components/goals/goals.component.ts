import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Goal} from "../../../model/Goal";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Category} from "../../../model/Category";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../../service/data-handler.service";
import {GoalEditDialogComponent} from "../../../dialog/edit-dialog/goal-edit-dialog/goal-edit-dialog.component";
import {ConfirmDialogComponent} from "../../../dialog/confirm-dialog/confirm-dialog.component";
import {Priority} from "../../../model/Priority";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})

export class GoalsComponent implements OnInit, AfterViewInit {

  @Output()
  deleteGoal = new EventEmitter<Goal>();
  @Output()
  selectCategory = new EventEmitter<Category>();
  @Output()
  updateGoal = new EventEmitter<Goal>();
  @Output()
  addGoal = new EventEmitter<Goal>();

  dataSource: MatTableDataSource<Goal>;
  displayedColumns: string[] = ['#', 'title', 'category', 'priority', 'deadline', 'progress', 'status', 'edit', 'delete'];

  @ViewChild(MatSort, {static: false}) set content(sort: MatSort) {
    this.dataSource.sort = sort;

    this.dataSource.sortingDataAccessor = (row: Goal, columnName: string): string => {

      switch (columnName) {
        case "title": {
          return row.title;
        }
        case "category": {
          return row.category ? row.category.title : "";
        }
        case "priority": {
          return row.priority ? row.priority.title : "";
        }
        case "deadline": {
          return row.deadline ? row.deadline.toISOString() : "";
        }
        default: {
          return row.id + "";
        }
      }
    }
  }

  private goalsF: Goal[];
  private categories: Category[];
  private priorities: Priority[];

  private editDialogRef?: MatDialogRef<GoalEditDialogComponent>;
  private addDialogRef?: MatDialogRef<GoalEditDialogComponent>;

  @Input('goals')
  set setGoals(goals: Goal[]) {
    this.goalsF = goals;
    this.fillTable();
  }

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Input('priorities')
  set setPriorities(priorities: Priority[]) {
    this.priorities = priorities;
  }

  public get goals(): Goal[] {
    return this.goalsF;
  }

  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.goalsF = [];
    this.categories = [];
    this.priorities = [];
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.fillTable();
  }

  fillTable(): void {
    this.dataSource.data = this.goalsF;
  }

  public openEditGoalDialog(goal: Goal): void {
    this.editDialogRef = this.dialog.open(GoalEditDialogComponent, {
      data: [goal, 'Edit Goal'],
      autoFocus: false,
      width: '600px'
    });

    this.editDialogRef.componentInstance.categories = this.categories;
    this.editDialogRef.componentInstance.priorities = this.priorities;

    this.editDialogRef.afterClosed().subscribe(result => {

      if (result as Goal) {
        this.updateGoal.emit(goal);
        return;
      }
    });
  }

  openAddGoalDialog(): void {
    let goal = new Goal(0, '', '', false, undefined, undefined, undefined);
    this.addDialogRef = this.dialog.open(GoalEditDialogComponent, {
      data: [goal, 'Create New Goal'],
      autoFocus: false,
      width: '600px'
    });

    this.addDialogRef.componentInstance.categories = this.categories;
    this.addDialogRef.componentInstance.priorities = this.priorities;

    this.addDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addGoal.emit(result);
      }
    });
  }

  openDeleteDialog(goal: Goal) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        dialogTitle: 'Are you sure?',
        message: `Do you really want to delete the goal: "${goal.title}"?`
      },
      autoFocus: false,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteGoal.emit(goal);
      }
    });
  }
}
