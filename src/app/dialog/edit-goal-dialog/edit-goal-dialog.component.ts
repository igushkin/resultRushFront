import {Component, Inject, OnInit} from '@angular/core';

import {Goal} from '../../model/Goal';
import {Priority} from '../../model/Priority';
import {Category} from '../../model/Category';
import {DataHandlerService} from '../../service/data-handler.service';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-goal-dialog',
  templateUrl: './edit-goal-dialog.component.html',
  styleUrls: ['./edit-goal-dialog.component.css']
})

// редактирование/создание задачи
export class EditGoalDialogComponent implements OnInit {
  categories: Category[];
  priorities: Priority[];
  dialogTitle: string; // заголовок окна
  originalGoal: Goal; // задача для редактирования/создания

  // сохраняем все значения в отдельные переменные
  // чтобы изменения не сказывались на самой задаче и можно было отменить изменения
  tmpTitle: string;
  tmpDescription: string;
  tmpPriority: Priority;
  tmpCategory: Category;
  tmpDate: Date;

  constructor(
    private dialogRef: MatDialogRef<EditGoalDialogComponent>, // // для возможности работы с текущим диалог. окном
    @Inject(MAT_DIALOG_DATA) private data: [Goal, string], // данные, которые передали в диалоговое окно
    private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
    private dialog: MatDialog // для открытия нового диалогового окна (из текущего) - например для подтверждения удаления
  ) {
    this.categories = [];
    this.priorities = [];

    this.originalGoal = this.data[0]; // задача для редактирования/создания
    this.dialogTitle = this.data[1]; // текст для диалогового окна

    // инициализация начальных значений (записывам в отдельные переменные
    // чтобы можно было отменить изменения, а то будут сразу записываться в задачу)
    this.tmpTitle = this.originalGoal.title;
    this.tmpDescription = this.originalGoal.description;
    this.tmpPriority = this.originalGoal.priority;
    this.tmpCategory = this.originalGoal.category;
    this.tmpDate = this.originalGoal.deadline;
  }

  ngOnInit() {
    this.dataHandler.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandler.getAllPriorities().subscribe(items => this.priorities = items);
  }

  // нажали ОК
  onConfirm(): void {

    // считываем все значения для сохранения в поля задачи
    if (this.originalGoal === null) {
      return;
    }

    this.originalGoal.title = this.tmpTitle;
    this.originalGoal.description = this.tmpDescription;
    this.originalGoal.priority = this.tmpPriority;
    this.originalGoal.category = this.tmpCategory;
    this.originalGoal.deadline = this.tmpDate;

    // передаем добавленную/измененную задачу в обработчик
    // что с ним будут делать - уже на задача этого компонента
    this.dialogRef.close(this.originalGoal);
  }

  // нажали отмену (ничего не сохраняем и закрываем окно)
  onCancel(): void {
    this.dialogRef.close(null);
  }

  // нажали Удалить
  delete() {

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${this.originalGoal.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete'); // нажали удалить
      }
    });
  }

  // нажали Выполнить (завершить) задачу
  complete() {
    this.dialogRef.close('complete');

  }

  // делаем статус задачи "незавершенным" (активируем)
  activate() {
    this.dialogRef.close('activate');
  }
}
