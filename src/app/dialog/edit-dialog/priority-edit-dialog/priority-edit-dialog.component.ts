import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Priority} from "../../../model/Priority";

@Component({
  selector: 'app-priority-edit-dialog',
  templateUrl: './priority-edit-dialog.component.html',
  styleUrls: ['./priority-edit-dialog.component.css']
})

export class PriorityEditDialogComponent implements OnInit {
  dialogTitle: string;
  originalPriority: Priority;
  tmpTitle: string;

  constructor(
    private dialogRef: MatDialogRef<PriorityEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Priority, string],
  ) {
    this.originalPriority = this.data[0];
    this.tmpTitle = this.originalPriority.title;
    this.dialogTitle = this.data[1];
  }

  ngOnInit() {

  }

  onConfirm(): void {
    this.originalPriority.title = this.tmpTitle;
    this.dialogRef.close(this.originalPriority);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
