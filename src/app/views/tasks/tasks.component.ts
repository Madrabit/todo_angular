import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataHandlerService} from '../../service/data-handler.service';
import {Task} from 'src/app/model/Task';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {

  TASK_COMPLETED = '#F8F9FA';
  NOCOLOR = '#fff';

  /**
   * Поля для таблица. Нужно для material
   */
  public displayedColumns: string[] = ['color', 'id', 'title', 'date', 'priority', 'category'];
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

  constructor(private dataHandlerService: DataHandlerService) {
  }

  ngOnInit(): void {
    this.dataHandlerService.tasksSubject.subscribe(tasks => this.tasks = tasks);

    // Инициализируется переменная. В эту перменную можно подключить любой источник данных
    this.dataSource = new MatTableDataSource();

    this.refreshTable();
  }

  /**
   * Вызывается после рендеринга HTML и прикрепляет компоненты сортировки, пагинации.
   */
  ngAfterViewInit(): void {
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

  /**
   * Показывает таски с применением всех условий. (поиск, фильтры, категории)
   */
  private refreshTable() {
    // Обновляет источник данных
    this.dataSource.data = this.tasks;
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
}
