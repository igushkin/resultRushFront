import {Component, Inject, Input, OnInit} from '@angular/core';

import {Goal} from '../../../model/Goal';
import {Priority} from '../../../model/Priority';
import {Category} from '../../../model/Category';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-goal-dialog',
  templateUrl: './goal-edit-dialog.component.html',
  styleUrls: ['./goal-edit-dialog.component.css']
})


export class GoalEditDialogComponent implements OnInit {
  @Input()
  categories: Category[];
  @Input()
  priorities: Priority[];
  dialogTitle: string;
  originalGoal: Goal;


  tmpTitle: string;
  private tmpDescription: string;
  tmpPriority?: Priority;
  tmpCategory?: Category;
  tmpDate?: Date;

  setTmpCategory(tmpCategoryId: number) {
    this.tmpCategory = this.categories.find(x => x.id == tmpCategoryId);
  }

  getTmpCategoryId() {
    return this.tmpCategory?.id;
  }

  setTmpPriority(tmpPriorityId: number) {
    this.tmpPriority = this.priorities.find(x => x.id == tmpPriorityId);
  }

  getTmpPriorityId() {
    return this.tmpPriority?.id;
  }

  constructor(
    private dialogRef: MatDialogRef<GoalEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Goal, string],
    private dialog: MatDialog
  ) {
    this.categories = [];
    this.priorities = [];

    this.originalGoal = this.data[0];
    this.dialogTitle = this.data[1];


    this.tmpTitle = this.originalGoal.title;
    this.tmpDescription = this.originalGoal.description;
    this.tmpPriority = this.originalGoal.priority;
    this.tmpCategory = this.originalGoal.category;
    this.tmpDate = this.originalGoal.deadline;
  }

  ngOnInit() {

  }


  onConfirm(): void {


    if (this.originalGoal === null) {
      return;
    }

    this.originalGoal.title = this.tmpTitle;
    this.originalGoal.description = this.tmpDescription;
    this.originalGoal.priority = this.tmpPriority;
    this.originalGoal.category = this.tmpCategory;
    this.originalGoal.deadline = this.tmpDate;
    this.dialogRef.close(this.originalGoal);
  }


  onCancel(): void {
    this.dialogRef.close(null);
  }


  /*delete() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        dialogTitle: 'Are you sure?',
        message: `Вы действительно хотите удалить задачу: "${this.originalGoal.title}"?`
      },
      autoFocus: false,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }*/


  complete() {
    this.dialogRef.close('complete');

  }


  activate() {
    this.dialogRef.close('activate');
  }
}
