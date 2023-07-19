import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Category} from "../../../model/Category";
import {ConfirmDialogComponent} from "../../confirm-dialog/confirm-dialog.component";
import {CategoryEditDialogComponent} from "../../edit-dialog/category-edit-dialog/category-edit-dialog.component";

class SettingsDialogComponent {
}

@Component({
  selector: 'app-category-setings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.css']
})


export class CategorySettingsComponent implements OnInit {

  categories: Category[];
  static defaultColor = '#fff';

  @Output()
  deleteCategory = new EventEmitter<Category>();
  @Output()
  updateCategory = new EventEmitter<Category>();
  @Output()
  addCategory = new EventEmitter<Category>();
  dialogTitle: string;

  @Input('categories')
  set setGoals(categories: Category[]) {
    this.categories = categories;
  }

  constructor(
    private dialogRef: MatDialogRef<CategorySettingsComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: [string]
  ) {
    this.categories = [];
    this.dialogTitle = data[0]
  }

  ngOnInit() {

  }

  onClose() {
    this.dialogRef.close(false);
  }

  onAddCategory(): void {
    let newCategory = new Category(0, '', '#999', 0, 0, 0);

    const dialogRef = this.dialog.open(CategoryEditDialogComponent, {
      data: [newCategory, 'Create New Category'],
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCategory.emit(result);
      }
    });
  }


  onDeleteCategory(category: Category): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Are you sure?',
        message: `Do you really want to delete the category: "${category.title}"? (goals will be assigned the value 'Without category')`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCategory.emit(category);
      }
    });
  }

  onUpdateCategory(category: Category): void {
    const dialogRef = this.dialog.open(CategoryEditDialogComponent,
      {data: [category, 'Edit Category']});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateCategory.emit(result);
      }
    });
  }
}
