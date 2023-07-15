import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler.service";
import {Category} from "../../model/Category";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {CategoryEditDialogComponent} from "../category-edit-dialog/category-edit-dialog.component";

class SettingsDialogComponent {
}

@Component({
  selector: 'app-category-setings',
  templateUrl: './category-settings.component.html',
  styleUrls: ['./category-settings.component.css']
})

// создание/редактирование категории

// диалоговое окно настроек приложения
// т.к. настройки не привязаны к другим компонентам (окнам),
// то он самостоятельно может загружать нужные данные с помощью dataHandler (а не получать их с помощью @Input)
export class CategorySettingsComponent implements OnInit {

  categories: Category[];
  static defaultColor = '#fff';

  constructor(
    private dialogRef: MatDialogRef<CategorySettingsComponent>, // для возможности работы с текущим диалог. окном
    private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
    private dialog: MatDialog
  ) {
    this.categories = [];
  }

  ngOnInit() {
    // получаем все значения, чтобы отобразить настроку цветов
    this.dataHandler.getAllCategories().subscribe(categories => this.categories = categories);
  }

  // нажали Закрыть
  onClose() {
    this.dialogRef.close(false);
  }


  // т.к. мы меняем значения в массивах, то изменения сразу отражаются на списке задач (не требуется доп. обновления)
  // добавили приоритет
  onAddCategory(): void {
    let newCategory = new Category(0, '', '#999');

    const dialogRef = this.dialog.open(CategoryEditDialogComponent, {
      data: [newCategory, 'Добавление приоритета'],
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //const newPriority = new Priority(null, result as string, PrioritiesComponent.defaultColor);
        this.dataHandler.addCategory(result).subscribe();
      }
    });
  }

  // удалили приоритет
  onDeleteCategory(category: Category): void {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${category.title}"? (задачам проставится значение 'Без приоритета')`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataHandler.deleteCategory(category).subscribe();
      }
    });
  }

  // обновили приоритет
  onUpdateCategory(category: Category): void {
    const dialogRef = this.dialog.open(CategoryEditDialogComponent,
      {data: [category, 'Редактирование приоритета']});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataHandler.updateCategory(category).subscribe();
      }
    });
  }

  /*  // удалили
    @Output()
    deletePriority = new EventEmitter<Priority>();

    // изменили
    @Output()
    updatePriority = new EventEmitter<Priority>();

    // добавили
    @Output()
    addPriority = new EventEmitter<Priority>();

    // список приоритетов для отображения
    @Input()
    private priorities: [Priority];

    // -------------------------------------------------------------------------
    */

}
