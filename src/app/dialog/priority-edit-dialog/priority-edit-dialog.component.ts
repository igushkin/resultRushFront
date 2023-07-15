import {Component, Inject, OnInit} from '@angular/core';
import {Category} from "../../model/Category";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Priority} from "../../model/Priority";

@Component({
  selector: 'app-priority-edit-dialog',
  templateUrl: './priority-edit-dialog.component.html',
  styleUrls: ['./priority-edit-dialog.component.css']
})

export class PriorityEditDialogComponent implements OnInit {
  dialogTitle: string; // текст для диалогового окна
  origianlPriority: Priority;
  tmpTitle: string;

  constructor(
    private dialogRef: MatDialogRef<PriorityEditDialogComponent>, // // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Priority, string], // данные, которые передали в диалоговое окно
  ) {
    this.origianlPriority = this.data[0];
    this.tmpTitle = this.origianlPriority.title;
    this.dialogTitle = this.data[1];
  }

  ngOnInit() {

  }

  // нажали ОК
  onConfirm(): void {
    this.origianlPriority.title = this.tmpTitle;
    this.dialogRef.close(this.origianlPriority);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
