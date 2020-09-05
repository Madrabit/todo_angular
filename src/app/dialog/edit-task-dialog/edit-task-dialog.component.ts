import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from 'src/app/model/Task';
import {Category} from '../../model/Category';
import {Priority} from '../../model/Priority';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';
import {OperType} from '../OperType';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.css']
})
export class EditTaskDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditTaskDialogComponent>, // для возможности работы с текущим диалоговым окном
    @Inject(MAT_DIALOG_DATA) private data: [Task, string, OperType], // данные, которые передали в диалоговое окно
    private dataHandlerService: DataHandlerService, // ссылка на сервис для работы с данными
    private dialog: MatDialog // для открытия нового диалогового окна
  ) {
  }

  dialogTitle: string; // заголовок окна
  task: Task; // задача для редактирования
  tmpTitle: string; // временная переменная, на случай если пользователь нажмет "отмена"
  categories: Category[];
  tmpCategory: Category;
  tmpPriority: Priority;
  priorities: Priority[];
  tmpCompleted: boolean;
  tmpDate: Date;
  operType: OperType;


  ngOnInit(): void {
    this.task = this.data[0];
    this.dialogTitle = this.data[1];
    this.operType =  this.data[2];
    this.tmpTitle = this.task.title;
    this.tmpCategory = this.task.category;
    this.tmpPriority = this.task.priority;
    this.tmpCompleted = this.task.completed;
    this.tmpDate = this.task.date;


    this.dataHandlerService.getAllCategories().subscribe(items => this.categories = items);
    this.dataHandlerService.getAllProperties().subscribe(items => this.priorities = items);

  }


  onUpdateTask($event: any) {

  }

  onConfirm(): void {
    this.task.title = this.tmpTitle;
    this.task.category = this.tmpCategory;
    this.task.priority = this.tmpPriority;
    this.task.date = this.tmpDate;

    // передаем задачу в обработчик
    this.dialogRef.close(this.task);
  }

  onCancel() {
    this.dialogRef.close(null);
  }

   delete() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        maxWidth: '500px',
        data: {
          dialogTitle: 'Подтвердите действие',
          message: `Вы действительно хотите удалить задачу: "${this.task.title}"?`
        },
        autoFocus: false
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close('delete');
        return;
      }
    });
  }

  activate() {
    this.dialogRef.close('activate');
  }

  complete() {
    this.dialogRef.close('complete');
  }

  canDelete(): boolean {
    return this.operType === OperType.EDIT;
  }

  canActivateDesactivate(): boolean {
    return this.operType === OperType.EDIT;
  }
}
