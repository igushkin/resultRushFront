import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Goal} from "../../model/Goal";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Category} from "../../model/Category";
import {MatDialog} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler.service";
import {EditGoalDialogComponent} from "../../dialog/edit-goal-dialog/edit-goal-dialog.component";
import {ConfirmDialogComponent} from "../../dialog/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.css']
})

export class GoalsComponent implements OnInit {

  @Output()
  deleteGoal = new EventEmitter<Goal>();
  @Output()
  selectCategory = new EventEmitter<Category>(); // нажали на категорию из списка задач
  @Output()
  updateGoal = new EventEmitter<Goal>();
  dataSource: MatTableDataSource<Goal>; // контейнер - источник данных для таблицы
  // поля для таблицы (те, что отображают данные из задачи - должны совпадать с названиями переменных класса)
  // #	Title	Category	Priority	Deadline	Progress	Status
  displayedColumns: string[] = ['#', 'title', 'category', 'priority', 'deadline', 'progress', 'status'];
  // ссылки на компоненты таблицы
  @ViewChild(MatPaginator, {static: false}) paginator?: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort?: MatSort;

  goals: Goal[];

  // текущие задачи для отображения на странице
  @Input('goals')
  set setGoals(goals: Goal[]) { // напрямую не присваиваем значения в переменную, только через @Input
    this.goals = goals;
    console.log("hi");
    this.fillTable();
  }

  // доступ к данным
  // работа с диалоговым окном
  constructor(private dataHandler: DataHandlerService, private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
    this.goals = [];
  }

  ngOnInit() {
    // датасорс обязательно нужно создавать для таблицы, в него присваивается любой источник (БД, массивы, JSON и пр.)
    this.fillTable(); // заполняем таблицы данными (задачи) и всеми метаданными
  }


  // в зависимости от статуса задачи - вернуть цвет названия
  /*   getPriorityColor(goal: Goal): string {

      // цвет завершенной задачи
      if (goal.completed) {
        return '#F8F9FA'; // TODO вынести цвета в константы (magic strings, magic numbers)
      }

      if (goal.priority && goal.priority.color) {
        return goal.priority.color;
      }

      return '#fff'; // TODO вынести цвета в константы (magic strings, magic numbers)

    }*/

  // показывает задачи с применением всех текущий условий (категория, поиск, фильтры и пр.)
  fillTable(): void {

    if (!this.dataSource) {
      return;
    }

    this.dataSource.data = this.goals; // обновить источник данных (т.к. данные массива goals обновились)
    this.dataSource.sort = this.sort == null ? null : this.sort; // компонент для сортировки данных (если необходимо)
    this.dataSource.paginator = this.paginator == null ? null : this.paginator; // обновить компонент постраничности (кол-во записей, страниц)

    // когда получаем новые данные..
    // чтобы можно было сортировать по столбцам "категория" и "приоритет", т.к. там не примитивные типы, а объекты
    // @ts-ignore - показывает ошибку для типа даты, но так работает, т.к. можно возвращать любой тип
    this.dataSource.sortingDataAccessor = (goal, colName) => {

      // по каким полям выполнять сортировку для каждого столбца
      switch (colName) {
        case 'priority': {
          return goal.priority ? goal.priority.title : null;
        }
        case 'category': {
          return goal.category ? goal.category.title : null;
        }
        case 'date': {
          return goal.deadline ? goal.deadline : null;
        }
        case 'title': {
          return goal.title;
        }
        default: {
          return goal.title;
        }
      }
    };
  }

  // диалоговое редактирования для добавления задачи
  public openEditGoalDialog(goal: Goal): void {

    // открытие диалогового окна
    const dialogRef = this.dialog.open(EditGoalDialogComponent, {
      data: [goal, 'Редактирование задачи'],
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      // обработка результатов

      if (result === 'complete') {
        goal.isCompleted = true; // ставим статус задачи как выполненная
        this.updateGoal.emit(goal);
      }


      if (result === 'activate') {
        goal.isCompleted = false; // возвращаем статус задачи как невыполненная
        this.updateGoal.emit(goal);
        return;
      }

      if (result === 'delete') {
        this.deleteGoal.emit(goal);
        return;
      }

      if (result as Goal) { // если нажали ОК и есть результат
        this.updateGoal.emit(goal);
        return;
      }
    });
  }


  // диалоговое окно подтверждения удаления
  openDeleteDialog(goal: Goal) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить задачу: "${goal.title}"?`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // если нажали ОК
        this.deleteGoal.emit(goal);
      }
    });
  }

  onToggleStatus(goal: Goal) {
    goal.isCompleted = !goal.isCompleted;
    this.updateGoal.emit(goal);
  }


  onSelectCategory(category: Category) {
    this.selectCategory.emit(category);
  }
}
