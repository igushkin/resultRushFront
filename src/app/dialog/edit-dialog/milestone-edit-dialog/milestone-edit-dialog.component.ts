import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../../service/data-handler.service";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {Milestone} from "../../../model/Milestone";

@Component({
  selector: 'app-milestone-edit-dialog',
  templateUrl: './milestone-edit-dialog.component.html',
  styleUrls: ['./milestone-edit-dialog.component.css']
})

export class MilestoneEditDialogComponent implements OnInit {
  dialogTitle: string;
  tmpTitle: string;
  tmpDate?: Date;
  tmpStatus?: boolean;
  originalMilestone: Milestone;

  constructor(
    private dialogRef: MatDialogRef<MilestoneEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Milestone, string],
    private dataHandler: DataHandlerService,
    private dialog: MatDialog
  ) {

    this.originalMilestone = this.data[0];
    this.dialogTitle = this.data[1];


    this.tmpTitle = this.originalMilestone.title;
    this.tmpDate = this.originalMilestone.deadline;
    this.tmpStatus = this.originalMilestone.isCompleted;
  }

  ngOnInit() {
  }


  onConfirm(): void {


    if (this.originalMilestone === null) {
      return;
    }

    this.originalMilestone.title = this.tmpTitle;
    this.originalMilestone.deadline = this.tmpDate;
    this.originalMilestone.isCompleted = this.tmpStatus ? this.tmpStatus : false;


    this.dialogRef.close(this.originalMilestone);
  }


  onCancel(): void {
    this.dialogRef.close(null);
  }


  delete() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить milestone: "${this.originalMilestone.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
      }
    });
  }

  complete() {
    this.dialogRef.close('complete');

  }

  activate() {
    this.dialogRef.close('activate');
  }
}
