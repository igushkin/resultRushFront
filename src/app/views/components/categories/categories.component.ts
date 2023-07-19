import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../../model/Category";
import {DataHandlerService} from "../../../service/data-handler.service";
import {CategoryStat} from "../../../model/CategoryStat";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../dialog/confirm-dialog/confirm-dialog.component";
import {
  CategoryEditDialogComponent
} from "../../../dialog/edit-dialog/category-edit-dialog/category-edit-dialog.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  categories: Category[];
  categoriesStat: CategoryStat;
  mainColor: string = "#4c6ef8";

  @Input('categories')
  set setCategories(categories: Category[]) {
    this.categories = categories;
  }

  @Input('categoriesStat')
  set setCategoriesStat(categoriesStat: CategoryStat) {
    this.categoriesStat = categoriesStat;
  }

  @Output()
  updateCategory = new EventEmitter<Category>();
  @Output()
  deleteCategory = new EventEmitter<Category>();

  constructor(public dataHandler: DataHandlerService, private dialog: MatDialog) {
    this.categories = [];
    this.categoriesStat = new CategoryStat(0, 0, 0);
  }

  ngOnInit(): void {

  }


  public openEditCategoryDialog(category: Category): void {

    const dialogRef = this.dialog.open(CategoryEditDialogComponent, {
      data: [category, 'Редактирование задачи'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);

      if (result as Category) {
        this.updateCategory.emit(category);
        return;
      }
    });
  }


  public openDeleteDialog(category: Category): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${category.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.deleteCategory.emit(category);
        return;
      }
    });
  }
}
