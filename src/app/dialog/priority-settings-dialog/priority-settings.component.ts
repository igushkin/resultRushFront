import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DataHandlerService} from "../../service/data-handler.service";
import {Priority} from "../../model/Priority";
import {PriorityEditDialogComponent} from "../priority-edit-dialog/priority-edit-dialog.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-priority-settings',
  templateUrl: './priority-settings.component.html',
  styleUrls: ['./priority-settings.component.css']
})
export class PrioritySettingsComponent implements OnInit {
  priorities: Priority[];

  constructor(
    private dialogRef: MatDialogRef<PrioritySettingsComponent>, // для возможности работы с текущим диалог. окном
    private dataHandler: DataHandlerService, // ссылка на сервис для работы с данными
    private dialog: MatDialog
  ) {
    this.priorities = [];
  }

  ngOnInit() {
    // получаем все значения, чтобы отобразить настроку цветов
    this.dataHandler.getAllPriorities().subscribe(priorities => this.priorities = priorities);
  }

  // нажали Закрыть
  onClose() {
    this.dialogRef.close(false);
  }


  // т.к. мы меняем значения в массивах, то изменения сразу отражаются на списке задач (не требуется доп. обновления)
  // добавили приоритет
  onAddPriority(): void {
    let newPriority = new Priority(0, '');

    const dialogRef = this.dialog.open(PriorityEditDialogComponent, {
      data: [newPriority, 'Добавление приоритета'],
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //const newPriority = new Priority(null, result as string, PrioritiesComponent.defaultColor);
        this.dataHandler.addPriority(result).subscribe();
      }
    });
  }

  // удалили приоритет
  onDeletePriority(priority: Priority): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '500px',
      data: {
        dialogTitle: 'Подтвердите действие',
        message: `Вы действительно хотите удалить категорию: "${priority.title}"? (задачам проставится значение 'Без приоритета')`
      },
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataHandler.deletePriority(priority).subscribe();
      }
    });
  }

  // обновили приоритет
  onUpdatePriority(priority: Priority): void {
    const dialogRef = this.dialog.open(PriorityEditDialogComponent,
      {data: [priority, 'Редактирование приоритета']});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataHandler.updatePriority(priority).subscribe();
      }
    });
  }
}
