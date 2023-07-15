import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from "../../model/Category";
import {Goal} from "../../model/Goal";
import {DataHandlerService} from "../../service/data-handler.service";
import {CategoryStat} from "../../model/CategoryStat";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";
import {CategoryEditDialogComponent} from "../../dialog/category-edit-dialog/category-edit-dialog.component";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})

export class CategoriesComponent implements OnInit {
  categories: Category[];
  categoriesStat: Map<number, CategoryStat>;

  // текущие задачи для отображения на странице
  @Input('categories')
  set setGoals(categories: Category[]) { // напрямую не присваиваем значения в переменную, только через @Input
    this.categories = categories;
  }

  @Input('categoriesStat')
  set setCategoriesStat(categoriesStat: Map<number, CategoryStat>) {
    this.categoriesStat = categoriesStat;
  }

  @Output()
  updateCategory = new EventEmitter<Category>();
  @Output()
  deleteCategory = new EventEmitter<Category>();

  constructor(public dataHandler: DataHandlerService, private dialog: MatDialog) {
    this.categories = [];
    this.categoriesStat = new Map<number, CategoryStat>();
  }

  ngOnInit(): void {

  }

  // диалоговое редактирования для добавления задачи
  public openEditCategoryDialog(category: Category): void {
    // открытие диалогового окна
    const dialogRef = this.dialog.open(CategoryEditDialogComponent, {
      data: [category, 'Редактирование задачи'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // обработка результатов
      if (result as Category) { // если нажали ОК и есть результат
        this.updateCategory.emit(category);
        return;
      }
    });
  }

  // диалоговое редактирования для добавления задачи
  public openDeleteDialog(category: Category): void {
    // открытие диалогового окна
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${category.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      // обработка результатов
      if (result) { // если нажали ОК и есть результат
        this.deleteCategory.emit(category);
        return;
      }
    });
  }
}
