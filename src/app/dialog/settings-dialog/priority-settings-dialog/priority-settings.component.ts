import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Priority} from "../../../model/Priority";
import {PriorityEditDialogComponent} from "../../edit-dialog/priority-edit-dialog/priority-edit-dialog.component";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-priority-settings',
  templateUrl: './priority-settings.component.html',
  styleUrls: ['./priority-settings.component.css']
})
export class PrioritySettingsComponent implements OnInit {
  priorities: Priority[];

  @Output()
  deletePriority = new EventEmitter<Priority>();
  @Output()
  updatePriority = new EventEmitter<Priority>();
  @Output()
  addPriority = new EventEmitter<Priority>();
  dialogTitle: string;

  @Input('priorities')
  set setGoals(priorities: Priority[]) {
    this.priorities = priorities;
  }

  constructor(
    private dialogRef: MatDialogRef<PrioritySettingsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: [string]
  ) {
    this.priorities = [];
    this.dialogTitle = data[0];
  }

  ngOnInit() {

  }

  onClose() {
    this.dialogRef.close(false);
  }


  onAddPriority(): void {
    let newPriority = new Priority(0, '');

    const dialogRef = this.dialog.open(PriorityEditDialogComponent, {
      data: [newPriority, 'Create New Priority'],
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addPriority.emit(result);
      }
    });
  }


  onDeletePriority(priority: Priority): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${priority.title}"? (задачам проставится значение 'Без приоритета')`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deletePriority.emit(priority);
      }
    });
  }


  onUpdatePriority(priority: Priority): void {
    const dialogRef = this.dialog.open(PriorityEditDialogComponent,
      {data: [priority, 'Редактирование приоритета']});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updatePriority.emit(priority);
      }
    });
  }
}
