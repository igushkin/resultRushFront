import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../../model/Category";

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-edit-dialog.component.html',
  styleUrls: ['./category-edit-dialog.component.css']
})


export class CategoryEditDialogComponent implements OnInit {

  dialogTitle: string;
  origianlCategory: Category;
  tmpTitle: string;
  tmpColor: string;


  constructor(
    private dialogRef: MatDialogRef<CategoryEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: [Category, string],
  ) {
    this.origianlCategory = this.data[0];
    this.tmpTitle = this.origianlCategory.title;
    this.tmpColor = this.origianlCategory.color;
    this.dialogTitle = this.data[1];
  }

  ngOnInit() {

  }


  onConfirm(): void {
    this.origianlCategory.title = this.tmpTitle;
    this.origianlCategory.color = this.tmpColor;
    this.dialogRef.close(this.origianlCategory);
  }


  onCancel(): void {
    this.dialogRef.close(false);
  }
}
