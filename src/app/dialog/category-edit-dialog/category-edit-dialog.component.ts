import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../model/Category";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-edit-dialog.component.html',
  styleUrls: ['./category-edit-dialog.component.css']
})

// создание/редактирование категории
export class CategoryEditDialogComponent implements OnInit {

  dialogTitle: string; // текст для диалогового окна
  origianlCategory: Category;
  tmpTitle: string;
  tmpColor: string;

  //private priorityTitle: string; // текст для названия приоритета (при реактировании или добавлении)
  //private operType: OperType;

  constructor(
    private dialogRef: MatDialogRef<CategoryEditDialogComponent>, // // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Category, string], // данные, которые передали в диалоговое окно
  ) {
    this.origianlCategory = this.data[0];
    this.tmpTitle = this.origianlCategory.title;
    this.tmpColor = this.origianlCategory.color;
    this.dialogTitle = this.data[1];
  }

  ngOnInit() {

  }

  // нажали ОК
  onConfirm(): void {
    this.origianlCategory.title = this.tmpTitle;
    this.origianlCategory.color = this.tmpColor;
    this.dialogRef.close(this.origianlCategory);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
