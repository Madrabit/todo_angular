import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from 'src/app/model/Task';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работы с текущим диалоговым окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string], // данные, которые передали в диалоговое окно
    private dataHandlerService: DataHandlerService, // ссылка на сервис для работы с данными
    private dialog: MatDialog // для открытия нового диалогового окна
  ) {
  }

  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.tmpTitle = this.task.title;

    console.log(this.task);
    console.log(this.dialogTitle);
  }

  dialogTitle: string; // заголовок окна
  task: Task; // задача для редактирования
  tmpTitle: string; // временная переменная, на случай если пользователь нажмет "отмена"

  onUpdateTask($event: any) {

  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;

    // передаем задачу в обработчик
    this.dialogRef.close(this.task);
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
