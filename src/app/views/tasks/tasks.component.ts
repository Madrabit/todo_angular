import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from 'src/app/model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {EditTaskDialogComponent} from '../../dialog/edit-task-dialog/edit-task-dialog.component';
import {ConfirmDialogComponent} from '../../dialog/confirm-dialog/confirm-dialog.component';
import {Category} from '../../model/Category';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  TASK_COMPLETED = '#F8F9FA';
  NOCOLOR = '#fff';

  /**
   * Поля для таблица. Нужно для material
   */
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category', 'operations', 'select'];
  /**
   * Источник данных для таблицы
   */
  public dataSource: MatTableDataSource<Task>;

  /**
   * ссылки на компоненты в таблице: сортировка и пагинация
   */
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;


  tasks: Task[];

  /**
   * DataSourse не видит поля tasks. И вытягивает данные только через сеттер.
   * @param tasks
   */
  @Input('tasks')
  public set setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.fillTable();
  }

  @Output()
  deleteTask = new EventEmitter<Task>();

  @Output()
  updateTask = new EventEmitter<Task>();

  @Output()
  selectCategory = new EventEmitter<Category>();

  selectedTask: Task;

  selectedCategory: Category;

  constructor(
    private dataHandlerService: DataHandlerService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {

    // Инициализируется переменная. В эту перменную можно подключить любой источник данных
    this.dataSource = new MatTableDataSource();

    this.fillTable();
  }

  /**
   * Вызывается после рендеринга HTML и прикрепляет компоненты сортировки, пагинации.
   * Показывает таски с применением всех условий. (поиск, фильтры, категории)
   *
   */
  private fillTable() {

    if (!this.dataSource) {
      return;
    }
    // Обновляет источник данных
    this.dataSource.data = this.tasks;

    this.addTableObjects();


    // @ts-ignore
    this.dataSource.sortingDataAccessor = (task, colName) => {
      /**
       *       По каким полям выполнять сортировку для каждого солбца
       */
      switch (colName) {
        case 'priority': {
          return task.priority ? task.priority.id : null;
        }
        case 'category': {
          return task.category ? task.category.title : null;
        }
        case 'date': {
          return task.date ? task.date : null;
        }
        case 'title': {
          return task.title ? task.title : null;
        }
      }
    };

  }

  toggleClassComplete(task: Task) {
    task.completed = !task.completed;
  }

  public getPriorityColor(task: Task) {
    if (task.completed) {
      return this.TASK_COMPLETED;
    }

    if (task.priority && task.priority.color) {
      return task.priority.color;
    }
    return this.NOCOLOR;
  }

  private addTableObjects() {
    // компонент для сортировки данных
    this.dataSource.sort = this.sort;
    // обновить компонент пагинации
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Диалоговое окно  - редактирование задачи.
   * @param task
   */
  openEditTaskDialog(task: Task): void {

    const dialogRef = this.dialog.open(EditTaskDialogComponent,
      {
        data: [task, 'Редактирование задачи'],
        autoFocus: false
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'delete') {
        this.deleteTask.emit(task);
        return;
      }
      if (result === 'activate') {
        task.completed = false;
        this.updateTask.emit(task);
        return;
      }
      if (result === 'complete') {
        task.completed = true;
        this.updateTask.emit(task);
        return;
      }
      if (result as Task) {
        this.updateTask.emit(task);
        return;
      }

    });
  }

  openDeleteDialog(task: Task) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent,
      {
        maxWidth: '500px',
        data: {
          dialogTitle: 'Подтвердите действие',
          message: `Вы действительно хотите удалить задачу: "${task.title}"?`
        },
        autoFocus: false
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        dialogRef.close('delete');
        return;
      }
    });
  }

  onToggleStatus(task: Task) {
    task.completed = !task.completed;
    this.updateTask.emit(task);
  }

  onSelectCategory(category: Category) {
    // вызываем внешний обработчик и передаем туда выбранную категорию
    this.selectCategory.emit(category);
  }

}
